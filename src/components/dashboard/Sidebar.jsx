// import React from 'react';
// import {
//   Inbox,
//   Star,
//   Send,
//   FileText,
//   Archive,
//   Trash2,
//   Briefcase,
//   User,
//   Mail,
//   LogOut,
//   Settings
// } from 'lucide-react';
// import { Avatar } from '../common/Avatar';
// import { Button } from '../common/Button';
// import { useAuth } from '../../contexts/AuthContext';

// const iconMap = {
//   inbox: Inbox,
//   star: Star,
//   starred: Star,
//   send: Send,
//   sent: Send,
//   'file-text': FileText,
//   drafts: FileText,
//   archive: Archive,
//   'trash-2': Trash2,
//   trash: Trash2,
//   briefcase: Briefcase,
//   work: Briefcase,
//   user: User,
//   personal: User,
// };

// export const Sidebar = ({ mailboxes, selectedMailbox, onSelectMailbox }) => {
//   const { user, logout } = useAuth();

//   const handleLogout = async () => {
//     await logout();
//   };

//   return (
//     <aside className="w-64 bg-white border-r border-slate-200 flex flex-col h-full">
//       {/* Header with logo */}
//       <div className="p-6 border-b border-slate-200">
//         <div className="flex items-center gap-3">
//           <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
//             <Mail className="w-6 h-6 text-white" />
//           </div>
//           <div>
//             <h1 className="font-display text-xl font-bold text-slate-900">Mailbox</h1>
//             <p className="text-xs text-slate-500">Your email hub</p>
//           </div>
//         </div>
//       </div>

//       {/* Compose button */}
//       <div className="p-4">
//         <Button
//           variant="primary"
//           size="md"
//           className="w-full"
//         >
//           <span className="text-lg mr-1">✍️</span>
//           Compose
//         </Button>
//       </div>

//       {/* Mailboxes list */}
//       <nav className="flex-1 overflow-y-auto custom-scrollbar px-3 py-2">
//         <div className="space-y-1">
//           {mailboxes.map((mailbox) => {
//             const Icon = iconMap[mailbox.icon] || Inbox;
//             const isSelected = selectedMailbox?.id === mailbox.id;

//             return (
//               <button
//                 key={mailbox.id}
//                 onClick={() => onSelectMailbox(mailbox)}
//                 className={`
//                   w-full flex items-center gap-3 px-3 py-2.5 rounded-xl
//                   transition-all duration-200 group
//                   ${isSelected
//                     ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg shadow-primary-500/30'
//                     : 'text-slate-700 hover:bg-slate-100'
//                   }
//                 `}
//               >
//                 <Icon className={`w-5 h-5 flex-shrink-0 ${
//                   isSelected ? 'text-white' : 'text-slate-500 group-hover:text-primary-600'
//                 }`} />

//                 <span className="flex-1 text-left font-medium truncate">
//                   {mailbox.name}
//                 </span>

//                 {mailbox.unreadCount > 0 && (
//                   <span className={`
//                     px-2 py-0.5 rounded-full text-xs font-semibold
//                     ${isSelected
//                       ? 'bg-white/20 text-white'
//                       : 'bg-primary-100 text-primary-700'
//                     }
//                   `}>
//                     {mailbox.unreadCount}
//                   </span>
//                 )}
//               </button>
//             );
//           })}
//         </div>

//         {/* Divider */}
//         <div className="my-4 border-t border-slate-200" />

//         {/* Settings */}
//         <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-700 hover:bg-slate-100 transition-all duration-200">
//           <Settings className="w-5 h-5 text-slate-500" />
//           <span className="font-medium">Settings</span>
//         </button>
//       </nav>

//       {/* User profile at bottom */}
//       <div className="p-4 border-t border-slate-200">
//         <div className="flex items-center gap-3">
//           <Avatar name={user?.avatar || 'U'} size="md" />
//           <div className="flex-1 min-w-0">
//             <p className="font-medium text-slate-900 truncate">{user?.name}</p>
//             <p className="text-xs text-slate-500 truncate">{user?.email}</p>
//           </div>
//           <button
//             onClick={handleLogout}
//             className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
//             title="Logout"
//           >
//             <LogOut className="w-5 h-5 text-slate-500" />
//           </button>
//         </div>
//       </div>
//     </aside>
//   );
// };

import React, { useState } from "react";
import { ChevronLeft, Image as ImageIcon, LogOut, Smile } from "lucide-react";

// Sidebar Component
const Sidebar = ({
  selectedMailbox,
  onSelectMailbox,
  isMobileSidebarOpen,
  onCloseMobileSidebar,
  onCompose,
  mockMailboxes,
}) => {
  return (
    <div
      className={`${
        isMobileSidebarOpen ? "fixed inset-0 z-50 bg-white" : "hidden lg:block"
      } lg:relative w-full lg:w-64 border-r border-gray-200 bg-gradient-to-b from-gray-50 to-white flex flex-col`}
    >
      <div className="p-4 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="lg:hidden flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">Mailboxes</h2>
          <button
            onClick={onCloseMobileSidebar}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>

        <button
          onClick={onCompose}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 py-3 rounded-xl font-medium flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30 transition-all hover:shadow-xl hover:shadow-blue-500/40 hover:scale-[1.02]"
        >
          <span className="text-lg mr-1">✍️</span>
          Compose
        </button>
      </div>

      <div className="flex-1 overflow-y-auto py-2 px-2">
        {mockMailboxes.map((mailbox) => {
          const Icon = mailbox.icon;
          const isActive = selectedMailbox === mailbox.id;
          return (
            <button
              key={mailbox.id}
              onClick={() => {
                onSelectMailbox(mailbox.id);
                onCloseMobileSidebar();
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-1 transition-all ${
                isActive
                  ? "bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 shadow-sm"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <Icon
                className={`w-5 h-5 ${
                  isActive ? "text-blue-600" : "text-gray-500"
                }`}
              />
              <span
                className={`flex-1 text-left font-medium ${
                  isActive ? "text-blue-700" : ""
                }`}
              >
                {mailbox.name}
              </span>
              {mailbox.unread > 0 && (
                <span
                  className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {mailbox.unread}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="p-4 border-t border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold shadow-md">
            JD
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold text-gray-900 truncate">
              John Doe
            </div>
            <div className="text-xs text-gray-500 truncate">
              john@example.com
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
