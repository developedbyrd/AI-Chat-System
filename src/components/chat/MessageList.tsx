import { useRef, useEffect } from 'react';
import { Message } from '@/types/chat';
import { MessageBubble } from './MessageBubble';
import { TypingIndicator } from './TypingIndicator';
import { MessageSquare } from 'lucide-react';

interface MessageListProps {
  messages: Message[];
  isTyping: boolean;
  onRetryMessage: (messageId: string) => void;
  onSuggestionClick: (suggestion: string) => void;
  darkMode: boolean;
}

function WelcomeScreen() {


  return (
    <div className="text-center py-16">
      <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center animate-pulse-glow">
        <MessageSquare className="w-12 h-12 text-white" />
      </div>
      <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-3">
        Start a conversation
      </h3>
      <p className="text-gray-500 dark:text-gray-400 text-lg">
        Ask me anything and {"I'll"} be happy to help!
      </p>
    </div>
  );
}

export function MessageList({ messages, isTyping, onRetryMessage, darkMode }: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <div className="max-w-4xl mx-auto p-4 pb-32">
      <div className="h-[calc(100vh-200px)] overflow-y-auto">
        <div className="space-y-6">
          {messages.length === 0 ? (
            <WelcomeScreen />
          ) : (
            messages.map((message) => (
              <MessageBubble
                key={message.id}
                message={message}
                onRetry={onRetryMessage}
                darkMode={darkMode}
              />
            ))
          )}

          {isTyping && <TypingIndicator />}

          <div ref={messagesEndRef} />
        </div>
      </div>
    </div>
  );
}