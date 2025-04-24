import React, { useState } from 'react';
import Card from '../components/Card';
import { 
  Save, 
  Shield, 
  Database, 
  Server, 
  Mail, 
  Globe, 
  Smartphone,
  AlertTriangle,
  CheckCircle,
  Trash2,
  Download,
  RefreshCw
} from 'lucide-react';
import toast from 'react-hot-toast';

const Settings: React.FC = () => {
  // Estado para controlar as configurações do sistema
  const [generalSettings, setGeneralSettings] = useState({
    siteName: 'Voonzave',
    siteDescription: 'Plataforma futurística para o seu negócio',
    contactEmail: 'contato@voonzave.com',
    supportEmail: 'suporte@voonzave.com',
    allowRegistrations: true,
    maintenanceMode: false,
    debugMode: false
  });
  
  // Configurações de email
  const [emailSettings, setEmailSettings] = useState({
    smtpHost: 'smtp.voonzave.com',
    smtpPort: '587',
    smtpUser: 'notificacoes@voonzave.com',
    smtpPassword: '••••••••',
    smtpEncryption: 'tls',
    senderName: 'Voonzave Notifications',
    senderEmail: 'notificacoes@voonzave.com'
  });
  
  // Configurações de aparência
  const [appearanceSettings, setAppearanceSettings] = useState({
    theme: 'dark',
    accentColor: '#6C00FF',
    secondaryColor: '#00EEFF',
    logoUrl: '/logo.svg',
    faviconUrl: '/favicon.ico',
    customCss: ''
  });
  
  // Configurações de segurança
  const [securitySettings, setSecuritySettings] = useState({
    forceHttps: true,
    sessionTimeout: '120',
    maxLoginAttempts: '5',
    passwordMinLength: '8',
    requireStrongPasswords: true,
    twoFactorAuth: true,
    allowedIpAddresses: ''
  });
  
  // Salvar configurações gerais
  const handleSaveGeneralSettings = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Configurações gerais salvas com sucesso!');
  };
  
  // Salvar configurações de email
  const handleSaveEmailSettings = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Configurações de email salvas com sucesso!');
  };
  
  // Salvar configurações de aparência
  const handleSaveAppearanceSettings = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Configurações de aparência salvas com sucesso!');
  };
  
  // Salvar configurações de segurança
  const handleSaveSecuritySettings = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Configurações de segurança salvas com sucesso!');
  };
  
  // Limpar o cache do sistema
  const handleClearCache = () => {
    toast.success('Cache do sistema limpo com sucesso!');
  };
  
  // Fazer backup do banco de dados
  const handleDatabaseBackup = () => {
    toast.success('Backup do banco de dados iniciado!');
  };
  
  // Testar SMTP
  const handleTestSmtp = () => {
    toast.success('Email de teste enviado com sucesso!');
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Configurações do Sistema</h1>
        <p className="text-gray-400 mt-1">
          Gerencie todas as configurações da plataforma Voonzave
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Configurações Gerais */}
          <Card
            title="Configurações Gerais"
            subtitle="Informações básicas da plataforma"
            icon={<Globe size={20} />}
          >
            <form onSubmit={handleSaveGeneralSettings} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Nome do Site
                  </label>
                  <input
                    type="text"
                    value={generalSettings.siteName}
                    onChange={(e) => setGeneralSettings(prev => ({ ...prev, siteName: e.target.value }))}
                    className="w-full p-2 bg-[#15152A] border border-[#21213A] rounded-lg text-gray-200 focus:outline-none focus:ring-1 focus:ring-[#6C00FF] focus:border-[#6C00FF]"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Descrição do Site
                  </label>
                  <input
                    type="text"
                    value={generalSettings.siteDescription}
                    onChange={(e) => setGeneralSettings(prev => ({ ...prev, siteDescription: e.target.value }))}
                    className="w-full p-2 bg-[#15152A] border border-[#21213A] rounded-lg text-gray-200 focus:outline-none focus:ring-1 focus:ring-[#6C00FF] focus:border-[#6C00FF]"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Email de Contato
                  </label>
                  <input
                    type="email"
                    value={generalSettings.contactEmail}
                    onChange={(e) => setGeneralSettings(prev => ({ ...prev, contactEmail: e.target.value }))}
                    className="w-full p-2 bg-[#15152A] border border-[#21213A] rounded-lg text-gray-200 focus:outline-none focus:ring-1 focus:ring-[#6C00FF] focus:border-[#6C00FF]"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Email de Suporte
                  </label>
                  <input
                    type="email"
                    value={generalSettings.supportEmail}
                    onChange={(e) => setGeneralSettings(prev => ({ ...prev, supportEmail: e.target.value }))}
                    className="w-full p-2 bg-[#15152A] border border-[#21213A] rounded-lg text-gray-200 focus:outline-none focus:ring-1 focus:ring-[#6C00FF] focus:border-[#6C00FF]"
                  />
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="allowRegistrations"
                    checked={generalSettings.allowRegistrations}
                    onChange={(e) => setGeneralSettings(prev => ({ ...prev, allowRegistrations: e.target.checked }))}
                    className="h-4 w-4 border-[#21213A] rounded bg-[#15152A] text-[#6C00FF] focus:ring-[#6C00FF]"
                  />
                  <label htmlFor="allowRegistrations" className="ml-2 text-sm text-gray-300">
                    Permitir novos registros
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="maintenanceMode"
                    checked={generalSettings.maintenanceMode}
                    onChange={(e) => setGeneralSettings(prev => ({ ...prev, maintenanceMode: e.target.checked }))}
                    className="h-4 w-4 border-[#21213A] rounded bg-[#15152A] text-[#6C00FF] focus:ring-[#6C00FF]"
                  />
                  <label htmlFor="maintenanceMode" className="ml-2 text-sm text-gray-300">
                    Modo de manutenção
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="debugMode"
                    checked={generalSettings.debugMode}
                    onChange={(e) => setGeneralSettings(prev => ({ ...prev, debugMode: e.target.checked }))}
                    className="h-4 w-4 border-[#21213A] rounded bg-[#15152A] text-[#6C00FF] focus:ring-[#6C00FF]"
                  />
                  <label htmlFor="debugMode" className="ml-2 text-sm text-gray-300">
                    Modo de depuração
                  </label>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#6C00FF] hover:bg-[#6C00FF]/90 text-white rounded-lg flex items-center"
                >
                  <Save size={16} className="mr-2" />
                  Salvar Alterações
                </button>
              </div>
            </form>
          </Card>
          
          {/* Configurações de Email */}
          <Card
            title="Configurações de Email"
            subtitle="SMTP e notificações"
            icon={<Mail size={20} />}
          >
            <form onSubmit={handleSaveEmailSettings} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Servidor SMTP
                  </label>
                  <input
                    type="text"
                    value={emailSettings.smtpHost}
                    onChange={(e) => setEmailSettings(prev => ({ ...prev, smtpHost: e.target.value }))}
                    className="w-full p-2 bg-[#15152A] border border-[#21213A] rounded-lg text-gray-200 focus:outline-none focus:ring-1 focus:ring-[#6C00FF] focus:border-[#6C00FF]"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Porta SMTP
                  </label>
                  <input
                    type="text"
                    value={emailSettings.smtpPort}
                    onChange={(e) => setEmailSettings(prev => ({ ...prev, smtpPort: e.target.value }))}
                    className="w-full p-2 bg-[#15152A] border border-[#21213A] rounded-lg text-gray-200 focus:outline-none focus:ring-1 focus:ring-[#6C00FF] focus:border-[#6C00FF]"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Usuário SMTP
                  </label>
                  <input
                    type="text"
                    value={emailSettings.smtpUser}
                    onChange={(e) => setEmailSettings(prev => ({ ...prev, smtpUser: e.target.value }))}
                    className="w-full p-2 bg-[#15152A] border border-[#21213A] rounded-lg text-gray-200 focus:outline-none focus:ring-1 focus:ring-[#6C00FF] focus:border-[#6C00FF]"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Senha SMTP
                  </label>
                  <input
                    type="password"
                    value={emailSettings.smtpPassword}
                    onChange={(e) => setEmailSettings(prev => ({ ...prev, smtpPassword: e.target.value }))}
                    className="w-full p-2 bg-[#15152A] border border-[#21213A] rounded-lg text-gray-200 focus:outline-none focus:ring-1 focus:ring-[#6C00FF] focus:border-[#6C00FF]"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Criptografia
                  </label>
                  <select
                    value={emailSettings.smtpEncryption}
                    onChange={(e) => setEmailSettings(prev => ({ ...prev, smtpEncryption: e.target.value }))}
                    className="w-full p-2 bg-[#15152A] border border-[#21213A] rounded-lg text-gray-200 focus:outline-none focus:ring-1 focus:ring-[#6C00FF] focus:border-[#6C00FF]"
                  >
                    <option value="none">Nenhuma</option>
                    <option value="ssl">SSL</option>
                    <option value="tls">TLS</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Nome do Remetente
                  </label>
                  <input
                    type="text"
                    value={emailSettings.senderName}
                    onChange={(e) => setEmailSettings(prev => ({ ...prev, senderName: e.target.value }))}
                    className="w-full p-2 bg-[#15152A] border border-[#21213A] rounded-lg text-gray-200 focus:outline-none focus:ring-1 focus:ring-[#6C00FF] focus:border-[#6C00FF]"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Email do Remetente
                  </label>
                  <input
                    type="email"
                    value={emailSettings.senderEmail}
                    onChange={(e) => setEmailSettings(prev => ({ ...prev, senderEmail: e.target.value }))}
                    className="w-full p-2 bg-[#15152A] border border-[#21213A] rounded-lg text-gray-200 focus:outline-none focus:ring-1 focus:ring-[#6C00FF] focus:border-[#6C00FF]"
                  />
                </div>
              </div>
              
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={handleTestSmtp}
                  className="px-4 py-2 bg-[#21213A] hover:bg-[#21213A]/80 text-gray-300 rounded-lg flex items-center"
                >
                  <Mail size={16} className="mr-2" />
                  Testar SMTP
                </button>
                
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#6C00FF] hover:bg-[#6C00FF]/90 text-white rounded-lg flex items-center"
                >
                  <Save size={16} className="mr-2" />
                  Salvar Alterações
                </button>
              </div>
            </form>
          </Card>
          
          {/* Configurações de Segurança */}
          <Card
            title="Configurações de Segurança"
            subtitle="Proteção e autenticação"
            icon={<Shield size={20} />}
          >
            <form onSubmit={handleSaveSecuritySettings} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Tempo de sessão (minutos)
                  </label>
                  <input
                    type="number"
                    value={securitySettings.sessionTimeout}
                    onChange={(e) => setSecuritySettings(prev => ({ ...prev, sessionTimeout: e.target.value }))}
                    className="w-full p-2 bg-[#15152A] border border-[#21213A] rounded-lg text-gray-200 focus:outline-none focus:ring-1 focus:ring-[#6C00FF] focus:border-[#6C00FF]"
                    min="5"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Tentativas máximas de login
                  </label>
                  <input
                    type="number"
                    value={securitySettings.maxLoginAttempts}
                    onChange={(e) => setSecuritySettings(prev => ({ ...prev, maxLoginAttempts: e.target.value }))}
                    className="w-full p-2 bg-[#15152A] border border-[#21213A] rounded-lg text-gray-200 focus:outline-none focus:ring-1 focus:ring-[#6C00FF] focus:border-[#6C00FF]"
                    min="1"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Tamanho mínimo de senha
                  </label>
                  <input
                    type="number"
                    value={securitySettings.passwordMinLength}
                    onChange={(e) => setSecuritySettings(prev => ({ ...prev, passwordMinLength: e.target.value }))}
                    className="w-full p-2 bg-[#15152A] border border-[#21213A] rounded-lg text-gray-200 focus:outline-none focus:ring-1 focus:ring-[#6C00FF] focus:border-[#6C00FF]"
                    min="6"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    IPs permitidos (separados por vírgula)
                  </label>
                  <input
                    type="text"
                    value={securitySettings.allowedIpAddresses}
                    onChange={(e) => setSecuritySettings(prev => ({ ...prev, allowedIpAddresses: e.target.value }))}
                    className="w-full p-2 bg-[#15152A] border border-[#21213A] rounded-lg text-gray-200 focus:outline-none focus:ring-1 focus:ring-[#6C00FF] focus:border-[#6C00FF]"
                    placeholder="Deixe em branco para permitir todos"
                  />
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="forceHttps"
                    checked={securitySettings.forceHttps}
                    onChange={(e) => setSecuritySettings(prev => ({ ...prev, forceHttps: e.target.checked }))}
                    className="h-4 w-4 border-[#21213A] rounded bg-[#15152A] text-[#6C00FF] focus:ring-[#6C00FF]"
                  />
                  <label htmlFor="forceHttps" className="ml-2 text-sm text-gray-300">
                    Forçar HTTPS
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="requireStrongPasswords"
                    checked={securitySettings.requireStrongPasswords}
                    onChange={(e) => setSecuritySettings(prev => ({ ...prev, requireStrongPasswords: e.target.checked }))}
                    className="h-4 w-4 border-[#21213A] rounded bg-[#15152A] text-[#6C00FF] focus:ring-[#6C00FF]"
                  />
                  <label htmlFor="requireStrongPasswords" className="ml-2 text-sm text-gray-300">
                    Exigir senhas fortes
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="twoFactorAuth"
                    checked={securitySettings.twoFactorAuth}
                    onChange={(e) => setSecuritySettings(prev => ({ ...prev, twoFactorAuth: e.target.checked }))}
                    className="h-4 w-4 border-[#21213A] rounded bg-[#15152A] text-[#6C00FF] focus:ring-[#6C00FF]"
                  />
                  <label htmlFor="twoFactorAuth" className="ml-2 text-sm text-gray-300">
                    Autenticação em duas etapas
                  </label>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#6C00FF] hover:bg-[#6C00FF]/90 text-white rounded-lg flex items-center"
                >
                  <Save size={16} className="mr-2" />
                  Salvar Alterações
                </button>
              </div>
            </form>
          </Card>
          
          {/* Configurações de Aparência */}
          <Card
            title="Configurações de Aparência"
            subtitle="Tema e personalização"
            icon={<Smartphone size={20} />}
          >
            <form onSubmit={handleSaveAppearanceSettings} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Tema
                  </label>
                  <select
                    value={appearanceSettings.theme}
                    onChange={(e) => setAppearanceSettings(prev => ({ ...prev, theme: e.target.value }))}
                    className="w-full p-2 bg-[#15152A] border border-[#21213A] rounded-lg text-gray-200 focus:outline-none focus:ring-1 focus:ring-[#6C00FF] focus:border-[#6C00FF]"
                  >
                    <option value="dark">Escuro</option>
                    <option value="light">Claro</option>
                    <option value="system">Sistema</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Cor Primária
                  </label>
                  <div className="flex">
                    <input
                      type="color"
                      value={appearanceSettings.accentColor}
                      onChange={(e) => setAppearanceSettings(prev => ({ ...prev, accentColor: e.target.value }))}
                      className="w-10 h-10 p-0 border-0 rounded-lg cursor-pointer"
                    />
                    <input
                      type="text"
                      value={appearanceSettings.accentColor}
                      onChange={(e) => setAppearanceSettings(prev => ({ ...prev, accentColor: e.target.value }))}
                      className="flex-grow ml-2 p-2 bg-[#15152A] border border-[#21213A] rounded-lg text-gray-200 focus:outline-none focus:ring-1 focus:ring-[#6C00FF] focus:border-[#6C00FF]"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Cor Secundária
                  </label>
                  <div className="flex">
                    <input
                      type="color"
                      value={appearanceSettings.secondaryColor}
                      onChange={(e) => setAppearanceSettings(prev => ({ ...prev, secondaryColor: e.target.value }))}
                      className="w-10 h-10 p-0 border-0 rounded-lg cursor-pointer"
                    />
                    <input
                      type="text"
                      value={appearanceSettings.secondaryColor}
                      onChange={(e) => setAppearanceSettings(prev => ({ ...prev, secondaryColor: e.target.value }))}
                      className="flex-grow ml-2 p-2 bg-[#15152A] border border-[#21213A] rounded-lg text-gray-200 focus:outline-none focus:ring-1 focus:ring-[#6C00FF] focus:border-[#6C00FF]"
                    />
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    URL do Logo
                  </label>
                  <input
                    type="text"
                    value={appearanceSettings.logoUrl}
                    onChange={(e) => setAppearanceSettings(prev => ({ ...prev, logoUrl: e.target.value }))}
                    className="w-full p-2 bg-[#15152A] border border-[#21213A] rounded-lg text-gray-200 focus:outline-none focus:ring-1 focus:ring-[#6C00FF] focus:border-[#6C00FF]"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    URL do Favicon
                  </label>
                  <input
                    type="text"
                    value={appearanceSettings.faviconUrl}
                    onChange={(e) => setAppearanceSettings(prev => ({ ...prev, faviconUrl: e.target.value }))}
                    className="w-full p-2 bg-[#15152A] border border-[#21213A] rounded-lg text-gray-200 focus:outline-none focus:ring-1 focus:ring-[#6C00FF] focus:border-[#6C00FF]"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  CSS Personalizado
                </label>
                <textarea
                  value={appearanceSettings.customCss}
                  onChange={(e) => setAppearanceSettings(prev => ({ ...prev, customCss: e.target.value }))}
                  className="w-full p-2 bg-[#15152A] border border-[#21213A] rounded-lg text-gray-200 focus:outline-none focus:ring-1 focus:ring-[#6C00FF] focus:border-[#6C00FF] font-mono"
                  rows={5}
                  placeholder="/* CSS personalizado aqui */"
                />
              </div>
              
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#6C00FF] hover:bg-[#6C00FF]/90 text-white rounded-lg flex items-center"
                >
                  <Save size={16} className="mr-2" />
                  Salvar Alterações
                </button>
              </div>
            </form>
          </Card>
        </div>
        
        <div className="space-y-6">
          {/* Status do Sistema */}
          <Card
            title="Status do Sistema"
            subtitle="Informações em tempo real"
            icon={<Server size={20} />}
          >
            <div className="space-y-4">
              <div className="p-3 bg-[#15152A] rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-400">Versão do Sistema:</span>
                  <span className="text-sm text-white">v3.2.1</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-400">Último Backup:</span>
                  <span className="text-sm text-white">19/04/2025 08:30</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-400">Estado do Banco:</span>
                  <span className="text-sm text-green-400 flex items-center">
                    <CheckCircle size={14} className="mr-1" />
                    Saudável
                  </span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-400">Uso da CPU:</span>
                  <span className="text-sm text-white">12%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Uso de Memória:</span>
                  <span className="text-sm text-white">1.2 GB / 8 GB</span>
                </div>
              </div>
              
              <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                <div className="flex items-center text-green-400">
                  <CheckCircle size={18} className="mr-2" />
                  <span className="font-medium">Todos os serviços estão operacionais</span>
                </div>
              </div>
              
              <div className="flex flex-col space-y-2">
                <button
                  onClick={handleClearCache}
                  className="py-2 px-3 bg-[#21213A] hover:bg-[#21213A]/80 text-gray-300 rounded-lg flex items-center justify-center"
                >
                  <RefreshCw size={16} className="mr-2" />
                  Limpar Cache do Sistema
                </button>
                
                <button
                  onClick={handleDatabaseBackup}
                  className="py-2 px-3 bg-[#21213A] hover:bg-[#21213A]/80 text-gray-300 rounded-lg flex items-center justify-center"
                >
                  <Download size={16} className="mr-2" />
                  Backup do Banco de Dados
                </button>
              </div>
            </div>
          </Card>
          
          {/* Logs do Sistema */}
          <Card
            title="Logs do Sistema"
            subtitle="Últimos eventos"
            icon={<AlertTriangle size={20} />}
          >
            <div className="space-y-2 max-h-96 overflow-y-auto text-xs text-gray-400 font-mono">
              <div className="p-2 border-l-2 border-green-500">
                <span className="text-green-400">[19/04/2025 12:30:45] [INFO]</span> Usuário 'admin' autenticado com sucesso
              </div>
              <div className="p-2 border-l-2 border-blue-500">
                <span className="text-blue-400">[19/04/2025 12:28:12] [INFO]</span> Backup automático iniciado
              </div>
              <div className="p-2 border-l-2 border-yellow-500">
                <span className="text-yellow-400">[19/04/2025 12:15:33] [WARN]</span> Alto uso de memória detectado
              </div>
              <div className="p-2 border-l-2 border-red-500">
                <span className="text-red-400">[19/04/2025 11:42:17] [ERROR]</span> Falha na conexão com servidor SMTP
              </div>
              <div className="p-2 border-l-2 border-green-500">
                <span className="text-green-400">[19/04/2025 11:30:05] [INFO]</span> Serviços reiniciados com sucesso
              </div>
              <div className="p-2 border-l-2 border-blue-500">
                <span className="text-blue-400">[19/04/2025 10:45:22] [INFO]</span> Atualização de sistema concluída
              </div>
              <div className="p-2 border-l-2 border-purple-500">
                <span className="text-purple-400">[19/04/2025 10:30:40] [DEBUG]</span> Verificação de integridade do banco concluída
              </div>
              <div className="p-2 border-l-2 border-yellow-500">
                <span className="text-yellow-400">[19/04/2025 09:15:18] [WARN]</span> Múltiplas tentativas de login detectadas
              </div>
            </div>
            <div className="mt-4 flex justify-center">
              <button className="text-sm text-[#00EEFF] hover:text-[#00EEFF]/80">
                Ver todos os logs
              </button>
            </div>
          </Card>
          
          {/* Suporte e Ajuda */}
          <Card
            title="Suporte e Ajuda"
            subtitle="Recursos e contato"
          >
            <div className="space-y-3">
              <a href="#" className="block p-3 bg-[#15152A] hover:bg-[#21213A] rounded-lg transition-colors">
                <h4 className="text-white font-medium">Documentação Completa</h4>
                <p className="text-sm text-gray-400 mt-1">
                  Acesse nossa documentação detalhada para administradores
                </p>
              </a>
              
              <a href="#" className="block p-3 bg-[#15152A] hover:bg-[#21213A] rounded-lg transition-colors">
                <h4 className="text-white font-medium">Video Tutoriais</h4>
                <p className="text-sm text-gray-400 mt-1">
                  Instruções passo a passo em formato de vídeo
                </p>
              </a>
              
              <a href="#" className="block p-3 bg-[#15152A] hover:bg-[#21213A] rounded-lg transition-colors">
                <h4 className="text-white font-medium">Suporte Técnico</h4>
                <p className="text-sm text-gray-400 mt-1">
                  Entre em contato com nossa equipe de suporte
                </p>
              </a>
              
              <div className="p-3 bg-[#6C00FF]/10 border border-[#6C00FF]/20 rounded-lg">
                <h4 className="text-[#00EEFF] font-medium">Precisa de ajuda?</h4>
                <p className="text-sm text-gray-400 mt-1">
                  Nossa equipe está disponível 24/7 para ajudar com quaisquer problemas ou dúvidas
                </p>
                <button className="mt-3 px-3 py-1.5 bg-[#6C00FF] hover:bg-[#6C00FF]/90 text-white rounded-lg text-sm">
                  Contatar Suporte
                </button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;