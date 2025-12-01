import React, { useState } from "react";
import { X, Paperclip, Image, FileText } from "lucide-react";

const ReplyBox = ({
  thread,
  replyingToIndex,
  recipientName,
  recipientEmail,
  onSend,
  onCancel,
}) => {
  const [replyText, setReplyText] = useState("");
  const [replyAttachments, setReplyAttachments] = useState([]);

  const handleFileSelect = async (e) => {
    const files = Array.from(e.target.files);

    const filePromises = files.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const base64Data = event.target.result.split(",")[1]; // Remove data:mime;base64, prefix
          resolve({
            name: file.name,
            size: `${(file.size / 1024).toFixed(0)} KB`,
            type: file.type,
            mimeType: file.type,
            data: base64Data, // Base64 encoded data (Gmail format)
            file: file,
          });
        };
        reader.readAsDataURL(file);
      });
    });

    const newAttachments = await Promise.all(filePromises);
    setReplyAttachments([...replyAttachments, ...newAttachments]);
  };

  const handleRemoveAttachment = (index) => {
    setReplyAttachments(replyAttachments.filter((_, i) => i !== index));
  };

  const handleSend = () => {
    if (!replyText.trim()) {
      alert("Please enter a message");
      return;
    }

    // Format attachments for Gmail API
    const gmailAttachments = replyAttachments.map((a) => ({
      filename: a.name,
      content_type: a.mimeType,
      data: a.data, // Base64 encoded
    }));
    const refs = thread.messages.map((m) => m["message-id"]);
    const references = refs.reverse();
    console.log("test: ", {
      to: recipientEmail,
      thread_id: thread.id,
      message_id: thread.messages[replyingToIndex]["message-id"],
      body: replyText,
      attachments: gmailAttachments,
      references: references,
    });
    const data = {
      to: recipientEmail,
      thread_id: thread.id,
      message_id: thread.messages[replyingToIndex]["message-id"],
      body: replyText,
      attachments: gmailAttachments,
      references: references,
    };
    onSend(data);

    setReplyText("");
    setReplyAttachments([]);
  };

  const handleCancelClick = () => {
    setReplyText("");
    setReplyAttachments([]);
    onCancel();
  };

  return (
    <div className="mt-6 border border-gray-300 rounded-lg shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-300">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-gray-800">
            Reply to {recipientName}
          </span>
          <button
            onClick={handleCancelClick}
            className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <X className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Text Area */}
      <div className="p-6">
        <textarea
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
          placeholder="Type your reply..."
          className="w-full min-h-[150px] outline-none text-[15px] text-gray-900 resize-none leading-relaxed border border-gray-300 rounded-lg p-3"
          autoFocus
        />

        {/* Attachments Display */}
        {replyAttachments.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="text-sm font-semibold text-gray-700 mb-3">
              Attachments ({replyAttachments.length})
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {replyAttachments.map((file, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200"
                >
                  <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                    {file.type.startsWith("image/") ? (
                      <Image className="w-4 h-4 text-blue-600" />
                    ) : (
                      <FileText className="w-4 h-4 text-blue-600" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-gray-900 truncate">
                      {file.name}
                    </div>
                    <div className="text-xs text-gray-500">{file.size}</div>
                  </div>
                  <button
                    onClick={() => handleRemoveAttachment(idx)}
                    className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    <X className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Actions Footer */}
      <div className="px-6 pb-6 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            onClick={handleSend}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm transition-colors"
          >
            Send
          </button>
          <button
            onClick={handleCancelClick}
            className="px-6 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg font-medium text-sm transition-colors"
          >
            Cancel
          </button>
        </div>

        <div className="flex items-center gap-2">
          <label className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer">
            <Paperclip className="w-5 h-5 text-gray-600" />
            <input
              type="file"
              multiple
              onChange={handleFileSelect}
              className="hidden"
            />
          </label>
          <label className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer">
            <Image className="w-5 h-5 text-gray-600" />
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileSelect}
              className="hidden"
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default ReplyBox;
