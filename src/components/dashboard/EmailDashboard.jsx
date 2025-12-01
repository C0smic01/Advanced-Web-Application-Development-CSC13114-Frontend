import React, { useEffect, useState } from "react";
import {
  Mail,
  Star,
  Send,
  FileText,
  Archive,
  Trash2,
  Plus,
  MoreVertical,
  Paperclip,
  Inbox,
  ChevronLeft,
  X,
  Bold,
  Italic,
  Underline,
  Link2,
  Image as ImageIcon,
  Smile,
  Clock,
} from "lucide-react";
import ComposeModal from "../modal/ComposeModal";
import EmailDetail from "./EmailDetail";
import EmailList from "./EmailList";
import Sidebar from "./Sidebar";
import apiClient, { tokenManager, userManager } from "../../services/apiClient";
import authApi from "../../services/authApi";
import emailApi from "../../services/emailApi";
import Swal from "sweetalert2";
// Mock Data by Mailbox
const mockMailboxes = [
  { id: "inbox", name: "Inbox", icon: Inbox, unread: 12, color: "blue" },
  { id: "starred", name: "Starred", icon: Star, unread: 3, color: "yellow" },
  { id: "sent", name: "Sent", icon: Send, unread: 0, color: "green" },
  { id: "drafts", name: "Drafts", icon: FileText, unread: 2, color: "gray" },
  { id: "archive", name: "Archive", icon: Archive, unread: 0, color: "purple" },
  { id: "trash", name: "Trash", icon: Trash2, unread: 0, color: "red" },
];

// Compose Modal Component

const handleSchedule = () => {
  alert("Email scheduled for later! ⏰");
  onClose();

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
          <h2 className="text-lg font-semibold text-gray-900">
            {forward ? "Forward Message" : replyTo ? "Reply" : "New Message"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-4">
            {/* To Field */}
            <div className="flex items-center gap-3 pb-3 border-b border-gray-200">
              <label className="text-sm font-medium text-gray-700 w-12">
                To:
              </label>
              <input
                type="email"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                placeholder="Recipients"
                className="flex-1 outline-none text-sm text-gray-900"
              />
              <div className="flex gap-2">
                <button
                  onClick={() => setShowCc(!showCc)}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Cc
                </button>
                <button
                  onClick={() => setShowBcc(!showBcc)}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Bcc
                </button>
              </div>
            </div>

            {/* Cc Field */}
            {showCc && (
              <div className="flex items-center gap-3 pb-3 border-b border-gray-200">
                <label className="text-sm font-medium text-gray-700 w-12">
                  Cc:
                </label>
                <input
                  type="email"
                  value={cc}
                  onChange={(e) => setCc(e.target.value)}
                  placeholder="Carbon copy"
                  className="flex-1 outline-none text-sm text-gray-900"
                />
              </div>
            )}

            {/* Bcc Field */}
            {showBcc && (
              <div className="flex items-center gap-3 pb-3 border-b border-gray-200">
                <label className="text-sm font-medium text-gray-700 w-12">
                  Bcc:
                </label>
                <input
                  type="email"
                  placeholder="Blind carbon copy"
                  className="flex-1 outline-none text-sm text-gray-900"
                />
              </div>
            )}

            {/* Subject Field */}
            <div className="flex items-center gap-3 pb-3 border-b border-gray-200">
              <label className="text-sm font-medium text-gray-700 w-12">
                Subject:
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Subject"
                className="flex-1 outline-none text-sm text-gray-900"
              />
            </div>

            {/* Original Message Quote (for replies/forwards) */}
            {replyTo && (
              <div className="bg-gray-50 border-l-4 border-blue-500 p-4 rounded-lg mb-4">
                <div className="text-xs text-gray-500 mb-2">
                  On {replyTo.date} at {replyTo.timestamp}, {replyTo.from}{" "}
                  wrote:
                </div>
                <div
                  className="text-sm text-gray-700 line-clamp-3"
                  dangerouslySetInnerHTML={{ __html: replyTo.body }}
                />
              </div>
            )}

            {/* Body Field */}
            <div className="min-h-[300px]">
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Compose your message..."
                className="w-full h-full min-h-[300px] outline-none text-sm text-gray-900 resize-none"
              />
            </div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="border-t border-gray-200 px-6 py-3 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                <Bold className="w-4 h-4 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                <Italic className="w-4 h-4 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                <Underline className="w-4 h-4 text-gray-600" />
              </button>
              <div className="w-px h-6 bg-gray-300 mx-1" />
              <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                <Link2 className="w-4 h-4 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                <Paperclip className="w-4 h-4 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                <ImageIcon className="w-4 h-4 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                <Smile className="w-4 h-4 text-gray-600" />
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                <Trash2 className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <button
              onClick={handleSend}
              className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg font-medium flex items-center gap-2 shadow-lg shadow-blue-500/30 transition-all hover:shadow-xl"
            >
              <Send className="w-4 h-4" />
              Send
            </button>
            <button
              onClick={handleSchedule}
              className="px-4 py-2.5 border border-gray-300 hover:bg-gray-50 rounded-lg font-medium flex items-center gap-2 transition-colors"
            >
              <Clock className="w-4 h-4" />
              Schedule
            </button>
          </div>

          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <MoreVertical className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
};

// EmailDashboard.jsx
const EmailDashboard = () => {
  const [selectedMailbox, setSelectedMailbox] = useState("inbox");
  const [selectedThread, setSelectedThread] = useState(null);
  const [selectedThreadId, setSelectedThreadId] = useState("");
  const [reset, setReset] = useState(false);
  const [allThreadsState, setAllThreadsState] = useState([]);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [showEmailList, setShowEmailList] = useState(true);
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [composeMode, setComposeMode] = useState({ type: "new", email: null });
  const [nextPageToken, setNextPageToken] = useState("");

  useEffect(() => {
    const handleAuthTokens = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const accessToken = urlParams.get("access_token");
        const refreshToken = urlParams.get("refresh_token");

        if (accessToken && refreshToken) {
          tokenManager.token = accessToken;
          localStorage.setItem("refresh_token", refreshToken);
          localStorage.setItem("access_token", accessToken);

          const response = await authApi.getProfile();
          userManager.user = response.data;

          const newUrl = window.location.pathname;
          window.history.replaceState({}, document.title, newUrl);
        }
      } catch (error) {
        console.error("Error handling auth tokens:", error);
      }
    };

    handleAuthTokens();
  }, []);

  useEffect(() => {
    const fetchThreads = async () => {
      const response = await emailApi.getThreads();
      setAllThreadsState(response.data.threads || []);
      setNextPageToken(response.data.nextPageToken || "");
    };
    fetchThreads();
  }, [reset]);

  useEffect(() => {
    const getThreadById = async () => {
      const response = await emailApi.getThreadById(selectedThreadId);

      setSelectedThread(response?.data);
    };
    getThreadById();
  }, [selectedThreadId]);
  // Filter threads by mailbox based on labelIds

  const currentThreads = allThreadsState.filter((thread) => {
    const labels = thread.messages[0].labelIds || [];
    switch (selectedMailbox) {
      case "inbox":
        return labels.includes("INBOX");
      case "starred":
        return labels.includes("STARRED");
      case "sent":
        return labels.includes("SENT");
      case "drafts":
        return labels.includes("DRAFT");
      case "archive":
        return !labels.includes("INBOX") && !labels.includes("TRASH");
      case "trash":
        return labels.includes("TRASH");
      default:
        return labels.includes("INBOX");
    }
  });

  const handleToggleStar = (threadId) => {
    setAllThreadsState((prev) =>
      prev.map((thread) =>
        thread.id === threadId
          ? {
              ...thread,
              labelIds: thread.labelIds?.includes("STARRED")
                ? thread.labelIds.filter((l) => l !== "STARRED")
                : [...(thread.labelIds || []), "STARRED"],
            }
          : thread
      )
    );
  };

  const handleCloseDetail = () => {
    setShowEmailList(true);
    setSelectedThread(null);
  };

  const handleDeleteThread = (threadId) => {
    if (confirm("Are you sure you want to delete this email?")) {
      setAllThreadsState((prev) =>
        prev.map((t) =>
          t.id === threadId
            ? { ...t, labelIds: [...(t.labelIds || []), "TRASH"] }
            : t
        )
      );
      if (selectedThread?.id === threadId) {
        setSelectedThread(null);
        setShowEmailList(true);
      }
      alert("Email moved to trash! 🗑️");
    }
  };

  const handleArchiveThread = (threadId) => {
    setAllThreadsState((prev) =>
      prev.map((t) =>
        t.id === threadId
          ? {
              ...t,
              labelIds: (t.labelIds || []).filter((l) => l !== "INBOX"),
            }
          : t
      )
    );
    if (selectedThread?.id === threadId) {
      setSelectedThread(null);
      setShowEmailList(true);
    }
    alert("Email archived! 📦");
  };

  const handleMarkAsRead = async (threadId, read) => {
    setAllThreadsState((prev) =>
      prev.map((t) =>
        t.id === threadId
          ? {
              ...t,
              labelIds: read
                ? (t.labelIds || []).filter((l) => l !== "UNREAD")
                : [...(t.labelIds || []), "UNREAD"],
            }
          : t
      )
    );
  };
  const handleMarkAsRead2 = async (data) => {
    await emailApi.modifyEmail(data);
    setReset(!reset);
  };
  const handleMarkAsUnread = (threadId) => {
    handleMarkAsRead(threadId, false);
    alert("Marked as unread! 📧");
  };

  const handleCompose = () => {
    setComposeMode({ type: "new", email: null });
    setIsComposeOpen(true);
  };

  const handleReply = (message) => {
    setComposeMode({ type: "reply", email: message, replyAll: false });
    setIsComposeOpen(true);
  };

  const handleForward = (message) => {
    setComposeMode({ type: "forward", email: message });
    setIsComposeOpen(true);
  };

  const handleSendEmail = async (newMessage) => {
    const response = await emailApi.sendEmail(newMessage);

    if (response.code == 202) {
      Swal.fire("Thành công !", response.data, "success");
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <header className="bg-white border-b border-gray-200 shadow-sm z-20">
        <div className="px-4 lg:px-6 py-4 flex items-center gap-4">
          <button
            onClick={() => setIsMobileSidebarOpen(true)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
          >
            <Mail className="w-6 h-6 text-gray-700" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                MailBox
              </h1>
              <p className="text-xs text-gray-500">Professional Email Client</p>
            </div>
          </div>

          <button
            onClick={handleCompose}
            className="ml-auto lg:hidden px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium flex items-center gap-2 shadow-lg"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        <Sidebar
          selectedMailbox={selectedMailbox}
          onSelectMailbox={setSelectedMailbox}
          isMobileSidebarOpen={isMobileSidebarOpen}
          onCloseMobileSidebar={() => setIsMobileSidebarOpen(false)}
          onCompose={handleCompose}
          mockMailboxes={mockMailboxes}
        />

        <div
          className={`${
            showEmailList ? "flex" : "hidden lg:flex"
          } flex-col w-full lg:w-96 xl:w-[480px]`}
        >
          <EmailList
            threads={currentThreads}
            selectedThreadId={selectedThreadId}
            setSelectedThreadId={setSelectedThreadId}
            onToggleStar={handleToggleStar}
            onDeleteThread={handleDeleteThread}
            onArchiveThread={handleArchiveThread}
            onMarkAsRead={handleMarkAsRead2}
          />
        </div>

        <div className={`${!showEmailList ? "flex" : "hidden lg:flex"} flex-1`}>
          <EmailDetail
            thread={selectedThread}
            onClose={handleCloseDetail}
            onReply={handleReply}
            onForward={handleForward}
            onDelete={handleDeleteThread}
            onArchive={handleArchiveThread}
            onToggleStar={handleToggleStar}
            onMarkAsUnread={handleMarkAsUnread}
            onSendReply={handleSendEmail}
          />
        </div>
      </div>

      <ComposeModal
        isOpen={isComposeOpen}
        onClose={() => setIsComposeOpen(false)}
        replyTo={composeMode.type !== "new" ? composeMode.email : null}
        replyAll={composeMode.replyAll}
        forward={composeMode.type === "forward"}
        onSend={handleSendEmail}
      />
    </div>
  );
};

export default EmailDashboard;
