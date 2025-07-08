// import { User, MessageSquare, Loader2, RotateCcw } from 'lucide-react';
// import { Button } from '@/components/ui/Button';
// import { Message } from '@/types/chat';

// interface MessageBubbleProps {
//   message: Message;
//   onRetry: (messageId: string) => void;
//   darkMode: boolean;
// }

// export function MessageBubble({ message, onRetry, darkMode }: MessageBubbleProps) {
//   return (
//     <div className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
//       <div className={`flex items-start space-x-4 max-w-xs md:max-w-md lg:max-w-2xl ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
//         }`}>
//         {/* Avatar */}
//         <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg ${message.sender === 'user'
//           ? 'bg-[#0e172a]'
//           : 'bg-[#0e172a]'
//           }`}>
//           {message.sender === 'user' ? (
//             <User className="w-5 h-5 text-white" />
//           ) : (
//             <MessageSquare className="w-5 h-5 text-white" />
//           )}
//         </div>

//         {/* Message Content */}
//         <div className={`relative max-w-full`}>
//           <p className={`text-sm leading-relaxed whitespace-pre-wrap px-3 py-3 rounded-2xl shadow-lg transition-colors ${message.sender === 'user'
//             ? 'bg-[#0e172a] text-white'
//             : `${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-800'} border ${darkMode ? 'border-gray-800' : 'border-gray-200'
//             }`
//             } ${message.sender === 'user' ? 'rounded-br-md' : 'rounded-bl-md'
//             }`}>{message.message}</p>

//           {/* Message Footer */}
//           <div className={`flex items-center justify-between gap-2 mt-4 text-xs ${message.sender === 'user'
//             ? 'text-blue-100'
//             : darkMode ? 'text-gray-500' : 'text-gray-400'
//             }`}>
//             {message.sender === 'user' && (
//               <div className="flex items-center space-x-2 relative bottom-3">
//                 {message.status === 'sending' && (
//                   <div className="flex items-center space-x-1">
//                     <Loader2 className="w-3 h-3 animate-spin" />
//                     <span>Sending...</span>
//                   </div>
//                 )}
//                 {message.status === 'failed' && (
//                   <Button
//                     variant="ghost"
//                     size="sm"
//                     onClick={() => onRetry(message.id)}
//                     className="text-red-300 hover:text-red-200 p-0 h-auto text-xs"
//                   >
//                     <RotateCcw /> Retry
//                   </Button>
//                 )}
//                 {message.status === 'sent' && (
//                   <span className="text-green-300">✓</span>
//                 )}
//               </div>
//             )}

//             <span className={`text-[13px] relative bottom-3 ${darkMode ? 'text-gray-200' : 'text-zinc-600'}`}>{new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }




import { User, MessageSquare, Loader2, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Message } from '@/types/chat';

interface MessageBubbleProps {
  message: Message;
  onRetry: (messageId: string) => void;
  darkMode: boolean;
}

export function MessageBubble({ message, onRetry, darkMode }: MessageBubbleProps) {
  return (
    <div className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
      <div className={`flex items-start gap-3 max-w-xs md:max-w-md lg:max-w-2xl ${
        message.sender === 'user' ? 'flex-row-reverse' : ''
      }`}>
        {/* Avatar - Fixed sizing */}
        <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center shadow-lg ${
          message.sender === 'user' 
            ? 'bg-[#0e172a]' 
            : 'bg-[#0e172a]'
        }`}>
          {message.sender === 'user' ? (
            <User className="w-5 h-5 text-white" />
          ) : (
            <MessageSquare className="w-5 h-5 text-white" />
          )}
        </div>

        {/* Message Content */}
        <div className="flex-1 min-w-0">
          <div className={`relative max-w-full break-words ${
            message.sender === 'user'
              ? 'bg-[#0e172a] text-white'
              : `${darkMode ? 'bg-gray-900' : 'bg-white'} ${
                  darkMode ? 'text-gray-100' : 'text-gray-800'
                } border ${
                  darkMode ? 'border-gray-800' : 'border-gray-200'
                }`
          } px-4 py-3 rounded-2xl shadow-lg ${
            message.sender === 'user' ? 'rounded-br-md' : 'rounded-bl-md'
          }`}>
            <p className="whitespace-pre-wrap text-sm leading-relaxed">
              {message.message}
            </p>
          </div>

          {/* Message Footer */}
          <div className={`flex items-center mt-1 ${
            message.sender === 'user' ? 'justify-end' : 'justify-start'
          }`}>
            <div className={`text-xs ${
              message.sender === 'user'
                ? 'text-blue-100'
                : darkMode 
                  ? 'text-gray-500' 
                  : 'text-gray-400'
            }`}>
              {message.sender === 'user' && (
                <div className="flex items-center gap-2">
                  {message.status === 'sending' && (
                    <div className="flex items-center gap-1">
                      <Loader2 className="w-3 h-3 animate-spin" />
                      <span>Sending...</span>
                    </div>
                  )}
                  {message.status === 'failed' && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onRetry(message.id)}
                      className="text-red-300 hover:text-red-200 p-0 h-auto text-xs"
                    >
                      <RotateCcw className="w-3 h-3 mr-1" /> Retry
                    </Button>
                  )}
                  {message.status === 'sent' && (
                    <span className="text-green-300">✓</span>
                  )}
                </div>
              )}
              <span className={`ml-1 ${darkMode ? 'text-gray-200' : 'text-zinc-600'}`}>
                {new Date(message.timestamp).toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}