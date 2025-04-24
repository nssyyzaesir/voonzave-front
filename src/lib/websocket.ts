/**
 * Serviço WebSocket para sincronização em tempo real entre admin e loja
 */

type MessageCallback = (data: any) => void;
type ConnectionCallback = () => void;

class WebSocketService {
  private socket: WebSocket | null = null;
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 3000; // 3 segundos
  
  private messageCallbacks: Map<string, MessageCallback[]> = new Map();
  private connectionCallbacks: ConnectionCallback[] = [];
  private connectionEstablished = false;
  
  constructor() {
    this.connect();
  }
  
  private connect() {
    if (this.socket?.readyState === WebSocket.OPEN) return;
    
    try {
      // Determinando o protocolo correto (ws:// ou wss://)
      const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
      const wsUrl = `${protocol}//${window.location.host}/ws`;
      
      console.log(`Conectando ao WebSocket: ${wsUrl}`);
      this.socket = new WebSocket(wsUrl);
      
      this.socket.onopen = this.handleOpen.bind(this);
      this.socket.onmessage = this.handleMessage.bind(this);
      this.socket.onclose = this.handleClose.bind(this);
      this.socket.onerror = this.handleError.bind(this);
    } catch (error) {
      console.error('Erro ao conectar WebSocket:', error);
      this.scheduleReconnect();
    }
  }
  
  private handleOpen(event: Event) {
    console.log('Conexão WebSocket estabelecida');
    this.reconnectAttempts = 0;
    this.connectionEstablished = true;
    
    // Notificar ouvintes da conexão
    this.connectionCallbacks.forEach(callback => callback());
  }
  
  private handleMessage(event: MessageEvent) {
    try {
      const message = JSON.parse(event.data);
      const { type, data } = message;
      
      console.log(`Mensagem WebSocket recebida - Tipo: ${type}`);
      
      // Notificar callbacks registrados para este tipo de mensagem
      if (this.messageCallbacks.has(type)) {
        const callbacks = this.messageCallbacks.get(type) || [];
        callbacks.forEach(callback => callback(data));
      }
      
    } catch (error) {
      console.error('Erro ao processar mensagem WebSocket:', error);
    }
  }
  
  private handleClose(event: CloseEvent) {
    console.log(`Conexão WebSocket fechada: ${event.code} - ${event.reason}`);
    this.connectionEstablished = false;
    
    if (!event.wasClean) {
      this.scheduleReconnect();
    }
  }
  
  private handleError(event: Event) {
    console.error('Erro na conexão WebSocket:', event);
    this.connectionEstablished = false;
    
    // WebSocket já tentará reconectar automaticamente em caso de erro
    // mas podemos adicionar lógica extra aqui se necessário
  }
  
  private scheduleReconnect() {
    if (this.reconnectTimer !== null) {
      clearTimeout(this.reconnectTimer);
    }
    
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      const delay = this.reconnectDelay * Math.pow(1.5, this.reconnectAttempts - 1);
      
      console.log(`Tentando reconectar em ${delay}ms (tentativa ${this.reconnectAttempts} de ${this.maxReconnectAttempts})`);
      
      this.reconnectTimer = setTimeout(() => {
        this.connect();
      }, delay);
    } else {
      console.error('Número máximo de tentativas de reconexão atingido');
    }
  }
  
  // API Pública
  
  /**
   * Registra um callback para um tipo específico de mensagem
   */
  public subscribe(type: string, callback: MessageCallback): () => void {
    if (!this.messageCallbacks.has(type)) {
      this.messageCallbacks.set(type, []);
    }
    
    const callbacks = this.messageCallbacks.get(type) || [];
    callbacks.push(callback);
    this.messageCallbacks.set(type, callbacks);
    
    // Retornar função para cancelar a inscrição
    return () => {
      if (this.messageCallbacks.has(type)) {
        const callbacks = this.messageCallbacks.get(type) || [];
        const index = callbacks.indexOf(callback);
        if (index !== -1) {
          callbacks.splice(index, 1);
          this.messageCallbacks.set(type, callbacks);
        }
      }
    };
  }
  
  /**
   * Registra um callback para ser chamado quando a conexão for estabelecida
   */
  public onConnect(callback: ConnectionCallback): () => void {
    this.connectionCallbacks.push(callback);
    
    // Se já estiver conectado, chamar o callback imediatamente
    if (this.connectionEstablished) {
      callback();
    }
    
    // Retornar função para cancelar a inscrição
    return () => {
      const index = this.connectionCallbacks.indexOf(callback);
      if (index !== -1) {
        this.connectionCallbacks.splice(index, 1);
      }
    };
  }
  
  /**
   * Envia uma mensagem para o servidor
   */
  public send(type: string, data: any) {
    if (this.socket?.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify({ type, data }));
    } else {
      console.warn('Tentativa de enviar mensagem com WebSocket fechado');
    }
  }
  
  /**
   * Solicita dados específicos do servidor
   */
  public requestData(resource: string) {
    console.log(`Solicitando dados do recurso: ${resource}`);
    this.send('request', { resource });
  }
  
  /**
   * Fecha a conexão WebSocket
   */
  public disconnect() {
    if (this.socket) {
      this.socket.close();
    }
    
    if (this.reconnectTimer !== null) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
  }
  
  /**
   * Verifica se a conexão está estabelecida
   */
  public isConnected(): boolean {
    return this.connectionEstablished;
  }
}

// Exportar uma instância singleton do serviço
export const websocketService = new WebSocketService();