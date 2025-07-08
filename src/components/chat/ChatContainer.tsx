"use client";

import { useEffect, useState } from 'react';
import { useChat } from '@/hooks/useChat';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { MessageList } from './MessageList';
import { MessageInput } from './MessageInput';

export function ChatContainer() {
  const [darkMode, setDarkMode] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const {
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
  } = useChat();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  useEffect(() => {
    loadChatHistory().catch((error) => {
      console.error("Failed to load chat history:", error);
    });
  }, [loadChatHistory]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const messageText = inputMessage.trim();
    setInputMessage('');

    try {
      await sendMessage(messageText);
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const handleClearChat = () => {
    clearChat();
  };

  const handleNewChatClick = () => {
    handleNewChat();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
    if (e.ctrlKey && e.key === 'k') {
      e.preventDefault();
      handleClearChat();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion);
  };

  return (
    <div className="min-h-screen flex w-full">
      <Sidebar
        isOpen={sidebarOpen}
        onNewChat={handleNewChatClick}
        chatHistory={chatHistory}
        currentChatId={currentChatId}
        onSelectChat={handleSelectChat}
        darkMode={darkMode}
      />

      <div className={`flex-1 flex flex-col ${sidebarOpen ? 'ml-64' : ''} transition-all duration-300`}>
        <Header
          darkMode={darkMode}
          onToggleDarkMode={() => setDarkMode(!darkMode)}
          onClearChat={handleClearChat}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />

        <main className="flex-1">
          <div className={`min-h-screen transition-colors duration-300 ${darkMode
              ? 'bg-zinc-900'
              : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
            }`}>
            <MessageList
              messages={messages}
              isTyping={isTyping}
              onRetryMessage={retryMessage}
              onSuggestionClick={handleSuggestionClick}
              darkMode={darkMode}
            />

            <MessageInput
              inputMessage={inputMessage}
              isLoading={isLoading}
              onInputChange={setInputMessage}
              onSendMessage={handleSendMessage}
              onKeyPress={handleKeyPress}
              sidebarOpen={sidebarOpen}
              darkMode={darkMode}
            />
          </div>
        </main>
      </div>
    </div>
  );
}