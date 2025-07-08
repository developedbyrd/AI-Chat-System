import { Button } from '@/components/ui/Button';
import { Moon, Sun, Menu, Trash2 } from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onClearChat: () => void;
  onToggleSidebar: () => void;
}

export function Header({ darkMode, onToggleDarkMode, onClearChat, onToggleSidebar }: HeaderProps) {
  return (
    <header className={`sticky top-0 z-10 backdrop-blur-md border-b ${darkMode
        ? 'bg-gray-900/80 border-gray-700'
        : 'bg-white/70 border-gray-200'
      }`}>
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleSidebar}
            className={`rounded-full cursor-pointer ${darkMode ? 'text-white hover:bg-zinc-900' : 'text-black hover:bg-gray-300'}`}
          >
            <Menu className="w-4 h-4" />
          </Button>
          <div className="hidden sm:block">
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              AI Assistant
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Powered by advanced AI • Online
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleDarkMode}
            className={`rounded-full cursor-pointer ${darkMode ? 'text-white hover:bg-zinc-900' : 'text-black hover:bg-gray-300'}`}
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearChat}
            className={`rounded-full cursor-pointer ${darkMode ? 'text-white hover:bg-zinc-900' : 'text-black hover:bg-gray-300'}`}
            title="Clear chat (Ctrl+K)"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}