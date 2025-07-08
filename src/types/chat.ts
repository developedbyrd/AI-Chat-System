export interface Message {
  id: string;
  message: string;
  timestamp: string;
  sender: 'user' | 'ai';
  status: 'sending' | 'sent' | 'failed';
}

export interface ChatConversation {
  id: string;
  title: string;
  timestamp: string;
  messages: Message[];
}