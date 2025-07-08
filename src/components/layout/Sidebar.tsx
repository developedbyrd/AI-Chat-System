// import { MessageSquare, Plus } from 'lucide-react';
// import { Button } from '@/components/ui/Button';
// import { ChatConversation } from '@/types/chat';

// interface SidebarProps {
//   isOpen: boolean;
//   onNewChat: () => void;
//   chatHistory: ChatConversation[];
//   currentChatId?: string;
//   onSelectChat: (chatId: string) => void;
//   darkMode: boolean;
// }

// export function Sidebar({ 
//   isOpen, 
//   onNewChat, 
//   chatHistory, 
//   currentChatId, 
//   onSelectChat,
//   darkMode 
// }: SidebarProps) {
//   if (!isOpen) return null;

//   return (
//     <div className={`fixed left-0 top-0 h-full w-64 ${darkMode ? 'bg-gray-900' : 'bg-white'} border-r ${darkMode ? 'border-gray-700' : 'border-gray-200'} z-20 transition-colors duration-200`}>
//       <div className="p-4">
//         {/* Header */}
//         <div className="flex items-center space-x-3 mb-6">
//           <div className="p-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500">
//             <MessageSquare className="w-5 h-5 text-white" />
//           </div>
//           <div>
//             <h2 className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
//               AI Assistant
//             </h2>
//             <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
//               Chat Interface
//             </p>
//           </div>
//         </div>

//         {/* New Chat Button */}
//         <div className="space-y-2 mb-6">
//           <Button onClick={onNewChat} className="w-full justify-start" variant={darkMode ? 'secondary' : 'outline'}>
//             <Plus className="w-4 h-4 mr-2" />
//             New Chat
//           </Button>
//         </div>

//         {/* Chat History */}
//         {chatHistory.length > 0 && (
//           <div>
//             <h3 className={`text-sm font-medium mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Recent Chats</h3>
//             <div className="space-y-1">
//               {chatHistory.slice(0, 10).map((conversation) => (
//                 <button
//                   key={conversation.id}
//                   onClick={() => onSelectChat(conversation.id)}
//                   className={`w-full text-left p-2 rounded-md transition-colors ${
//                     darkMode 
//                       ? currentChatId === conversation.id 
//                         ? 'bg-gray-800' 
//                         : 'hover:bg-gray-800'
//                       : currentChatId === conversation.id 
//                         ? 'bg-gray-100' 
//                         : 'hover:bg-gray-100'
//                   }`}
//                 >
//                   <div className="flex items-center space-x-2">
//                     <MessageSquare className="w-4 h-4 flex-shrink-0" />
//                     <div className="min-w-0 flex-1">
//                       <p className={`text-sm font-medium truncate ${darkMode ? 'text-white' : 'text-gray-900'}`}>
//                         {conversation.messages[0]?.message.substring(0, 30) || "New Chat"}
//                       </p>
//                       <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
//                         {new Date(conversation.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                       </p>
//                     </div>
//                   </div>
//                 </button>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// import { MessageSquare, Plus } from 'lucide-react';
// import { Button } from '@/components/ui/Button';
// import { ChatConversation } from '@/types/chat';

// interface SidebarProps {
//   isOpen: boolean;
//   onNewChat: () => void;
//   chatHistory: ChatConversation[];
//   currentChatId?: string;
//   onSelectChat: (chatId: string) => void;
//   darkMode: boolean;
// }

// export function Sidebar({
//   isOpen,
//   onNewChat,
//   chatHistory,
//   currentChatId,
//   onSelectChat,
//   darkMode
// }: SidebarProps) {
//   if (!isOpen) return null;

//   return (
//     <div className={`fixed left-0 top-0 h-full w-64 z-20 transition-colors duration-200 ${darkMode ? 'bg-gray-950 text-gray-100 border-gray-800' : 'bg-white text-gray-900 border-gray-200'
//       } border-r`}>
//       <div className="p-4">
//         {/* Header */}
//         <div className="flex items-center space-x-3 mb-6">
//           <div className="p-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500">
//             <MessageSquare className="w-5 h-5 text-white" />
//           </div>
//           <div>
//             <h2 className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
//               AI Assistant
//             </h2>
//             <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
//               Chat Interface
//             </p>
//           </div>
//         </div>

//         {/* New Chat Button */}
//         <div className="space-y-2 mb-6">
//           <Button
//             onClick={onNewChat}
//             className="w-full justify-start"
//             variant={darkMode ? 'secondary' : 'outline'}
//           >
//             <Plus className="w-4 h-4 mr-2" />
//             New Chat
//           </Button>
//         </div>

//         {/* Chat History */}
//         {chatHistory.length > 0 && (
//           <div>
//             <h3 className={`text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
//               Recent Chats
//             </h3>
//             <div className="space-y-1">
//               {chatHistory.slice(0, 10).map((conversation) => (
//                 <button
//                   key={conversation.id}
//                   onClick={() => onSelectChat(conversation.id)}
//                   className={`w-full text-left p-2 rounded-md transition-colors ${darkMode
//                     ? currentChatId === conversation.id
//                       ? 'bg-gray-900'
//                       : 'hover:bg-gray-900'
//                     : currentChatId === conversation.id
//                       ? 'bg-gray-100'
//                       : 'hover:bg-gray-100'
//                     }`}
//                 >
//                   <div className="flex items-center space-x-2">
//                     <MessageSquare className={`w-4 h-4 flex-shrink-0 ${darkMode ? 'text-gray-300' : 'text-gray-500'}`} />
//                     <div className="min-w-0 flex-1">
//                       <p className={`text-sm font-medium truncate ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
//                         {conversation.messages[0]?.message.substring(0, 30) || "New Chat"}
//                       </p>
//                       <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
//                         {new Date(conversation.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                       </p>
//                     </div>
//                   </div>
//                 </button>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }




import { MessageSquare, Plus } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ChatConversation } from '@/types/chat';

interface SidebarProps {
  isOpen: boolean;
  onNewChat: () => void;
  chatHistory: ChatConversation[];
  currentChatId?: string;
  onSelectChat: (chatId: string) => void;
  darkMode: boolean;
}

export function Sidebar({ 
  isOpen, 
  onNewChat, 
  chatHistory, 
  currentChatId, 
  onSelectChat,
  darkMode 
}: SidebarProps) {
  if (!isOpen) return null;

  return (
    <div className={`fixed left-0 top-0 h-full w-64 z-20 transition-colors duration-200 border-r ${
      darkMode
        ? 'bg-[#111010] border-gray-800 text-gray-100'
        : 'bg-white border-gray-200 text-gray-900'
    }`}>
      <div className="p-4">
        {/* Header */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500">
            <MessageSquare className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              AI Assistant
            </h2>
            <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Chat Interface
            </p>
          </div>
        </div>

        {/* New Chat Button */}
        <div className="space-y-2 mb-6">
          <Button 
            onClick={onNewChat} 
            className={`w-full justify-start ${
              darkMode ? 'bg-gray-800 text-white hover:bg-gray-700' : ''
            }`} 
            variant={darkMode ? 'ghost' : 'outline'}
          >
            <Plus className="w-4 h-4 mr-2" />
            New Chat
          </Button>
        </div>

        {/* Chat History */}
        {chatHistory.length > 0 && (
          <div>
            <h3 className={`text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Recent Chats
            </h3>
            <div className="space-y-1">
              {chatHistory.slice(0, 10).map((conversation) => {
                const isActive = currentChatId === conversation.id;
                const baseStyle = 'w-full text-left p-2 rounded-md transition-colors';

                const lightStyles = isActive
                  ? 'bg-gray-100 text-gray-900'
                  : 'hover:bg-gray-100 text-gray-800';

                const darkStyles = isActive
                  ? 'bg-gray-900 text-gray-100'
                  : 'hover:bg-gray-900 text-gray-300';

                return (
                  <button
                    key={conversation.id}
                    onClick={() => onSelectChat(conversation.id)}
                    className={`${baseStyle} ${darkMode ? darkStyles : lightStyles}`}
                  >
                    <div className="flex items-center space-x-2">
                      <MessageSquare className={`w-4 h-4 flex-shrink-0 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium truncate">
                          {conversation.messages[0]?.message.substring(0, 30) || "New Chat"}
                        </p>
                        <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                          {new Date(conversation.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
