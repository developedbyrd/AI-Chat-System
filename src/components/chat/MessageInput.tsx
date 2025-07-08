import { Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

interface MessageInputProps {
  inputMessage: string;
  isLoading: boolean;
  onInputChange: (value: string) => void;
  onSendMessage: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  sidebarOpen: boolean;
  darkMode: boolean
}

export function MessageInput({ 
  inputMessage, 
  isLoading, 
  onInputChange, 
  onSendMessage, 
  onKeyPress,
  sidebarOpen,
  darkMode
}: MessageInputProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 backdrop-blur-md bg-white/10 border-t border-white/20">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <Input
              value={inputMessage}
              onChange={(e) => onInputChange(e.target.value)}
              onKeyPress={onKeyPress}
              placeholder="Type your message here..."
              className={`pr-20 py-6 bg-white/20 backdrop-blur-md border-white/30 rounded-2xl ${darkMode ? 'text-white' : 'text-black'} placeholder-gray-500 text-base transition-all duration-100 ${sidebarOpen ? 'ml-40' : ''} border-2 border-[#6d6d6d]`}
              disabled={isLoading}
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-xs text-gray-400 hidden sm:block">
              Press Enter ↵
            </div>
          </div>
          <Button
            onClick={onSendMessage}
            disabled={!inputMessage.trim() || isLoading}
            className={`rounded-lg ${darkMode ? 'bg-white text-black' : 'bg-zinc-900 text-white'} p-3 shadow-lg hover:shadow-xl transform transition-all duration-200 cursor-pointer`}
            size="md"
          >
            {isLoading ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}