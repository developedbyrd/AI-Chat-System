// import { useState, useCallback } from 'react';
// import { Message, ChatConversation } from '@/types/chat';

// const mockChatService = {
//   async sendMessage(message: string, _conversationId: string): Promise<Message> {
//     await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    
//     const aiResponses = [
//       "That's an interesting question! Let me think about it...",
//       "I understand what you're asking. Here's my perspective:",
//       "Based on what you've shared, I would suggest:",
//       "That's a great point. Here are some thoughts:",
//       "I'd be happy to help you with that. Consider this:",
//       "Excellent question! From my analysis:",
//       "Let me break this down for you:",
//       "I appreciate you sharing that. My recommendation would be:",
//       "That's something I can definitely assist with:",
//       "Interesting perspective! Here's what I think:"
//     ];
    
//     const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
//     const contextualResponse = `${randomResponse} (Replying to: "${message.slice(0, 50)}${message.length > 50 ? '...' : ''}")`;
    
//     return {
//       id: crypto.randomUUID(),
//       message: contextualResponse,
//       timestamp: new Date().toISOString(),
//       sender: 'ai',
//       status: 'sent'
//     };
//   },

//   async getChatHistory(): Promise<{ messages: Message[]; conversationId: string }> {
//     await new Promise(resolve => setTimeout(resolve, 500));
    
//     const welcomeMessage: Message = {
//       id: "welcome-1",
//       message: "Hello! I'm your AI assistant. I'm here to help you with questions, provide information, or just have a friendly conversation. What would you like to talk about today?",
//       timestamp: new Date(Date.now() - 60000).toISOString(),
//       sender: 'ai',
//       status: 'sent'
//     };
    
//     return {
//       messages: [welcomeMessage],
//       conversationId: crypto.randomUUID()
//     };
//   }
// };

// export const useChat = () => {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isTyping, setIsTyping] = useState(false);
//   const [currentChatId, setCurrentChatId] = useState('');
//   const [chatHistory, setChatHistory] = useState<ChatConversation[]>([]);

//   const loadChatHistory = useCallback(async () => {
//     try {
//       const data = await mockChatService.getChatHistory();
//       setMessages(data.messages);
//       const newChatId = data.conversationId;
//       setCurrentChatId(newChatId);
      
//       const initialConversation: ChatConversation = {
//         id: newChatId,
//         title: "New Chat",
//         timestamp: new Date().toISOString(),
//         messages: data.messages
//       };
      
//       setChatHistory([initialConversation]);
//     } catch (error) {
//       console.error('Failed to load chat history:', error);
//       throw error;
//     }
//   }, []);

//   const updateChatHistory = useCallback((chatId: string, newMessages: Message[]) => {
//     setChatHistory(prev => prev.map(chat => 
//       chat.id === chatId 
//         ? { ...chat, messages: newMessages, timestamp: new Date().toISOString() }
//         : chat
//     ));
//   }, []);

//   const sendMessage = useCallback(async (messageText: string) => {
//     if (!messageText.trim() || isLoading) return;

//     const userMessage: Message = {
//       id: crypto.randomUUID(),
//       message: messageText.trim(),
//       timestamp: new Date().toISOString(),
//       sender: 'user',
//       status: 'sending'
//     };

//     const newMessages = [...messages, userMessage];
//     setMessages(newMessages);
//     setIsLoading(true);
//     setIsTyping(true);

//     updateChatHistory(currentChatId, newMessages);

//     try {
//       const updatedMessages = newMessages.map(msg => 
//         msg.id === userMessage.id ? { ...msg, status: 'sent' as const } : msg
//       );
//       setMessages(updatedMessages);

//       const aiMessage = await mockChatService.sendMessage(messageText, currentChatId);
      
//       setTimeout(() => {
//         setIsTyping(false);
//         const finalMessages = [...updatedMessages, aiMessage];
//         setMessages(finalMessages);
//         updateChatHistory(currentChatId, finalMessages);
//       }, 1500);

//     } catch (error) {
//       const failedMessages = newMessages.map(msg => 
//         msg.id === userMessage.id ? { ...msg, status: 'failed' as const } : msg
//       );
//       setMessages(failedMessages);
//       updateChatHistory(currentChatId, failedMessages);
//       setIsTyping(false);
//       throw error;
//     } finally {
//       setIsLoading(false);
//     }
//   }, [messages, isLoading, currentChatId, updateChatHistory]);

//   const retryMessage = useCallback(async (messageId: string) => {
//     const failedMessage = messages.find(msg => msg.id === messageId);
//     if (!failedMessage) return;

//     setMessages(prev => prev.map(msg => 
//       msg.id === messageId ? { ...msg, status: 'sending' as const } : msg
//     ));

//     await sendMessage(failedMessage.message);
//   }, [messages, sendMessage]);

//   const clearChat = useCallback(() => {
//     setMessages([]);
//     loadChatHistory();
//   }, [loadChatHistory]);

//   const handleNewChat = useCallback(() => {
//     const newChatId = crypto.randomUUID();
//     setCurrentChatId(newChatId);
//     setMessages([]);
    
//     const newConversation: ChatConversation = {
//       id: newChatId,
//       title: "New Chat",
//       timestamp: new Date().toISOString(),
//       messages: []
//     };
    
//     setChatHistory(prev => [newConversation, ...prev]);
//   }, []);

//   const handleSelectChat = useCallback((chatId: string) => {
//     const selectedChat = chatHistory.find(chat => chat.id === chatId);
//     if (selectedChat) {
//       setCurrentChatId(chatId);
//       setMessages(selectedChat.messages);
//     }
//   }, [chatHistory]);

//   return {
//     messages,
//     isLoading,
//     isTyping,
//     currentChatId,
//     chatHistory,
//     loadChatHistory,
//     sendMessage,
//     retryMessage,
//     clearChat,
//     handleNewChat,
//     handleSelectChat
//   };
// };





import { useState, useCallback } from 'react';
import { Message, ChatConversation } from '@/types/chat';
import axios from 'axios';

const chatService = {
  async sendMessage(message: string, _conversationId: string): Promise<Message> {
    try {
      const response = await axios.post(
        'https://openrouter.ai/api/v1/chat/completions',
        {
          model: 'openai/gpt-4o',
          messages: [
            {
              role: 'system',
              content: 'You are a helpful AI assistant. Respond directly to the user\'s messages without modifying or enhancing them. Answer questions, provide information, or engage in conversation as requested.'
            },
            {
              role: 'user',
              content: message,
            },
          ],
          temperature: 0.7,
          max_tokens: 1000,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENROUTER_API_KEY}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': window.location.href,
            'X-Title': 'AI Assistant',
          },
        }
      );

      return {
        id: crypto.randomUUID(),
        message: response.data.choices[0].message.content,
        timestamp: new Date().toISOString(),
        sender: 'ai',
        status: 'sent'
      };
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  },

  async getChatHistory(): Promise<{ messages: Message[]; conversationId: string }> {
    const welcomeMessage: Message = {
      id: "welcome-1",
      message: "Hello! I'm your AI assistant. How can I help you today?",
      timestamp: new Date().toISOString(),
      sender: 'ai',
      status: 'sent'
    };
    
    return {
      messages: [welcomeMessage],
      conversationId: crypto.randomUUID()
    };
  }
};

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [currentChatId, setCurrentChatId] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatConversation[]>([]);

  const loadChatHistory = useCallback(async () => {
    try {
      const data = await chatService.getChatHistory();
      setMessages(data.messages);
      const newChatId = data.conversationId;
      setCurrentChatId(newChatId);
      
      const initialConversation: ChatConversation = {
        id: newChatId,
        title: "New Chat",
        timestamp: new Date().toISOString(),
        messages: data.messages
      };
      
      setChatHistory([initialConversation]);
    } catch (error) {
      console.error('Failed to load chat history:', error);
      throw error;
    }
  }, []);

  const updateChatHistory = useCallback((chatId: string, newMessages: Message[]) => {
    setChatHistory(prev => prev.map(chat => 
      chat.id === chatId 
        ? { ...chat, messages: newMessages, timestamp: new Date().toISOString() }
        : chat
    ));
  }, []);

  const sendMessage = useCallback(async (messageText: string) => {
    if (!messageText.trim() || isLoading) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      message: messageText.trim(),
      timestamp: new Date().toISOString(),
      sender: 'user',
      status: 'sending'
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setIsLoading(true);
    setIsTyping(true);

    updateChatHistory(currentChatId, newMessages);

    try {
      const updatedMessages = newMessages.map(msg => 
        msg.id === userMessage.id ? { ...msg, status: 'sent' as const } : msg
      );
      setMessages(updatedMessages);

      const aiMessage = await chatService.sendMessage(messageText, currentChatId);
      
      const finalMessages = [...updatedMessages, aiMessage];
      setMessages(finalMessages);
      updateChatHistory(currentChatId, finalMessages);
      
    } catch (error) {
      const failedMessages = newMessages.map(msg => 
        msg.id === userMessage.id ? { ...msg, status: 'failed' as const } : msg
      );
      setMessages(failedMessages);
      updateChatHistory(currentChatId, failedMessages);
      throw error;
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  }, [messages, isLoading, currentChatId, updateChatHistory]);

  // ... rest of the hooks remain the same ...
  const retryMessage = useCallback(async (messageId: string) => {
    const failedMessage = messages.find(msg => msg.id === messageId);
    if (!failedMessage) return;

    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, status: 'sending' as const } : msg
    ));

    await sendMessage(failedMessage.message);
  }, [messages, sendMessage]);

  const clearChat = useCallback(() => {
    setMessages([]);
    loadChatHistory();
  }, [loadChatHistory]);

  const handleNewChat = useCallback(() => {
    const newChatId = crypto.randomUUID();
    setCurrentChatId(newChatId);
    setMessages([]);
    
    const newConversation: ChatConversation = {
      id: newChatId,
      title: "New Chat",
      timestamp: new Date().toISOString(),
      messages: []
    };
    
    setChatHistory(prev => [newConversation, ...prev]);
  }, []);

  const handleSelectChat = useCallback((chatId: string) => {
    const selectedChat = chatHistory.find(chat => chat.id === chatId);
    if (selectedChat) {
      setCurrentChatId(chatId);
      setMessages(selectedChat.messages);
    }
  }, [chatHistory]);

  return {
    messages,
    isLoading,
    isTyping,
    currentChatId,
    chatHistory,
    loadChatHistory,
    sendMessage,
    retryMessage,
    clearChat,
    handleNewChat,
    handleSelectChat
  };
};