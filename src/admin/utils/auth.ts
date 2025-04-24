/**
 * Utilitários para autenticação no painel administrativo
 */

import { apiRequest } from '@/lib/queryClient';

/**
 * Verifica se existe um token de autenticação válido
 */
export async function verifyAdminAuthentication(): Promise<boolean> {
  try {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      return false;
    }

    const response = await apiRequest('GET', '/api/auth/me');
    if (!response.ok) {
      return false;
    }

    const data = await response.json();
    return data.user && data.user.role === 'admin';
  } catch (error) {
    console.error('Erro ao verificar autenticação de admin:', error);
    return false;
  }
}

/**
 * Função para realizar requisições autenticadas específicas do admin
 */
export async function adminRequest(
  method: string, 
  url: string, 
  data?: any
): Promise<Response> {
  try {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      throw new Error('Não autenticado');
    }

    const response = await apiRequest(method, url, data);
    
    if (response.status === 401) {
      // Token expirado ou inválido
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_role');
      window.location.href = '/login';
      throw new Error('Sessão expirada. Por favor, faça login novamente.');
    }
    
    return response;
  } catch (error) {
    console.error(`Erro na requisição admin (${method} ${url}):`, error);
    throw error;
  }
}

/**
 * Verificar se o usuário tem permissão de admin
 */
export function hasAdminRole(): boolean {
  return localStorage.getItem('user_role') === 'admin';
}

/**
 * Fazer logout do sistema
 */
export function adminLogout(): void {
  localStorage.removeItem('auth_token');
  localStorage.removeItem('user_role');
  window.location.href = '/login';
}