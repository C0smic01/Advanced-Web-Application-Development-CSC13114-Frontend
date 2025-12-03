import React, { useState } from "react";
import {
  Send,
  FileText,
  Trash2,
  MoreVertical,
  Paperclip,
  X,
  Bold,
  Italic,
  Underline,
  Link2,
  Image,
  Smile,
  Clock,
} from "lucide-react";

const ComposeModal = ({
  isOpen,
  onClose,
  replyTo = null,
  replyAll = false,
  forward = false,
  onSend,
}) => {
  const [to, setTo] = useState(replyTo ? [replyTo.email] : []);
  const [toInput, setToInput] = useState("");
  const [cc, setCc] = useState(replyAll && replyTo ? [replyTo.cc] : []);
  const [ccInput, setCcInput] = useState("");
  const [bcc, setBcc] = useState([]);
  const [bccInput, setBccInput] = useState("");
  const [subject, setSubject] = useState(
    replyTo
      ? forward
        ? `Fwd: ${replyTo.subject}`
        : `Re: ${replyTo.subject}`
      : ""
  );
  const [body, setBody] = useState("");
  const [showCc, setShowCc] = useState(false);
  const [showBcc, setShowBcc] = useState(false);
  const [attachments, setAttachments] = useState([]);

  if (!isOpen) return null;

  const handleAddEmail = (value, list, setList, setInput) => {
    const email = value.trim();
    if (email && email.includes("@") && !list.includes(email)) {
      setList([...list, email]);
      setInput("");
    }
  };

  const handleRemoveEmail = (email, list, setList) => {
    setList(list.filter((e) => e !== email));
  };

  const handleKeyDown = (e, list, setList, input, setInput) => {
    if (e.key === "Enter" || e.key === "," || e.key === " ") {
      e.preventDefault();
      handleAddEmail(input, list, setList, setInput);
    } else if (e.key === "Backspace" && !input && list.length > 0) {
      setList(list.slice(0, -1));
    }
  };

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
    setAttachments([...attachments, ...newAttachments]);
  };

  const handleRemoveAttachment = (index) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  const handleSend = () => {
    // Format attachments for Gmail API
    const gmailAttachments = attachments.map((a) => ({
      filename: a.name,
      content_type: a.mimeType,
      data: a.data,
    }));

    const newEmail = {
      to: to,
      cc: cc,
      bcc: bcc,
      subject,
      body: body,
      attachments: gmailAttachments,
    };

    onSend(newEmail);
    setBody("");
    setAttachments([]);
    setSubject("");
    setBcc([]);
    setTo([]);
    setCc([]);
    onClose();
  };

  const handleSchedule = () => {
    alert("Email scheduled for later! ⏰");
    onClose();
  };

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
            <div className="pb-3 border-b border-gray-200">
              <div className="flex items-start gap-3">
                <label className="text-sm font-medium text-gray-700 w-12 pt-2">
                  To:
                </label>
                <div className="flex-1">
                  <div className="flex flex-wrap gap-2 items-center">
                    {to.map((email, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                      >
                        {email}
                        <button
                          onClick={() => handleRemoveEmail(email, to, setTo)}
                          className="hover:bg-blue-200 rounded-full p-0.5"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                    <input
                      type="email"
                      value={toInput}
                      onChange={(e) => setToInput(e.target.value)}
                      onKeyDown={(e) =>
                        handleKeyDown(e, to, setTo, toInput, setToInput)
                      }
                      onBlur={() =>
                        handleAddEmail(toInput, to, setTo, setToInput)
                      }
                      placeholder={to.length === 0 ? "Recipients" : ""}
                      className="flex-1 min-w-[200px] outline-none text-sm text-gray-900 py-1"
                    />
                  </div>
                </div>
                <div className="flex gap-2 pt-2">
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
            </div>

            {/* Cc Field */}
            {showCc && (
              <div className="pb-3 border-b border-gray-200">
                <div className="flex items-start gap-3">
                  <label className="text-sm font-medium text-gray-700 w-12 pt-2">
                    Cc:
                  </label>
                  <div className="flex-1">
                    <div className="flex flex-wrap gap-2 items-center">
                      {cc.map((email, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm"
                        >
                          {email}
                          <button
                            onClick={() => handleRemoveEmail(email, cc, setCc)}
                            className="hover:bg-green-200 rounded-full p-0.5"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                      <input
                        type="email"
                        value={ccInput}
                        onChange={(e) => setCcInput(e.target.value)}
                        onKeyDown={(e) =>
                          handleKeyDown(e, cc, setCc, ccInput, setCcInput)
                        }
                        onBlur={() =>
                          handleAddEmail(ccInput, cc, setCc, setCcInput)
                        }
                        placeholder={cc.length === 0 ? "Carbon copy" : ""}
                        className="flex-1 min-w-[200px] outline-none text-sm text-gray-900 py-1"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Bcc Field */}
            {showBcc && (
              <div className="pb-3 border-b border-gray-200">
                <div className="flex items-start gap-3">
                  <label className="text-sm font-medium text-gray-700 w-12 pt-2">
                    Bcc:
                  </label>
                  <div className="flex-1">
                    <div className="flex flex-wrap gap-2 items-center">
                      {bcc.map((email, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
                        >
                          {email}
                          <button
                            onClick={() =>
                              handleRemoveEmail(email, bcc, setBcc)
                            }
                            className="hover:bg-purple-200 rounded-full p-0.5"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                      <input
                        type="email"
                        value={bccInput}
                        onChange={(e) => setBccInput(e.target.value)}
                        onKeyDown={(e) =>
                          handleKeyDown(e, bcc, setBcc, bccInput, setBccInput)
                        }
                        onBlur={() =>
                          handleAddEmail(bccInput, bcc, setBcc, setBccInput)
                        }
                        placeholder={
                          bcc.length === 0 ? "Blind carbon copy" : ""
                        }
                        className="flex-1 min-w-[200px] outline-none text-sm text-gray-900 py-1"
                      />
                    </div>
                  </div>
                </div>
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

            {/* Attachments Preview */}
            {attachments.length > 0 && (
              <div className="border-t border-gray-200 pt-4">
                <div className="text-sm font-semibold text-gray-700 mb-2">
                  Attachments ({attachments.length})
                </div>
                <div className="space-y-2">
                  {attachments.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="w-8 h-8 rounded bg-blue-100 flex items-center justify-center flex-shrink-0">
                        {file.type.startsWith("image/") ? (
                          <Image className="w-4 h-4 text-blue-600" />
                        ) : (
                          <FileText className="w-4 h-4 text-blue-600" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-gray-900 truncate">
                          {file.name}
                        </div>
                        <div className="text-xs text-gray-500">{file.size}</div>
                      </div>
                      <button
                        onClick={() => handleRemoveAttachment(index)}
                        className="p-1 hover:bg-gray-200 rounded transition-colors"
                      >
                        <X className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
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
              <label className="p-2 hover:bg-gray-200 rounded-lg transition-colors cursor-pointer">
                <Paperclip className="w-4 h-4 text-gray-600" />
                <input
                  type="file"
                  multiple
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </label>
              <label className="p-2 hover:bg-gray-200 rounded-lg transition-colors cursor-pointer">
                <Image className="w-4 h-4 text-gray-600" />
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </label>
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

export default ComposeModal;
