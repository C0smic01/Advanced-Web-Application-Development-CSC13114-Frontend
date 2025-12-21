// import React, { useState } from "react";
// import { X, Edit2, Trash2, Link, Unlink, Plus, Save } from "lucide-react";
// import { useSelector } from "react-redux";
// import taskApi from "../../services/taskApi";
// const LabelManagerModal = ({ isOpen, onClose }) => {
//   const labels = useSelector((state) => state.tasks.listTypes);
//   const googleLabels = useSelector((state) => state.tasks.googleLabel);

//   const [editingId, setEditingId] = useState(null);
//   const [editingName, setEditingName] = useState("");
//   const [linkingId, setLinkingId] = useState(null);
//   const [selectedGmailLabel, setSelectedGmailLabel] = useState("");
//   const [showNewLabelForm, setShowNewLabelForm] = useState(false);
//   const [newLabelName, setNewLabelName] = useState("");

//   if (!isOpen) return null;

//   const isInbox = (id) => id === "0000";

//   const getAvailableGmailLabels = () => {
//     const linkedLabels = labels
//       .filter((label) => label.gmailLabel)
//       .map((label) => label.gmailLabel);
//     return googleLabels.filter((gl) => !linkedLabels.includes(gl));
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] flex flex-col">
//         {/* Header */}
//         <div className="flex items-center justify-between p-6 border-b">
//           <h2 className="text-2xl font-bold text-gray-800">Quản lý Labels</h2>
//           <button
//             onClick={onClose}
//             className="text-gray-400 hover:text-gray-600 transition-colors"
//           >
//             <X size={24} />
//           </button>
//         </div>

//         {/* Content */}
//         <div className="flex-1 overflow-y-auto p-6">
//           <div className="space-y-3">
//             {labels.map((label) => (
//               <div
//                 key={label.id}
//                 className={`border rounded-lg p-4 ${
//                   isInbox(label.id)
//                     ? "bg-gray-50 border-gray-300"
//                     : "bg-white border-gray-200"
//                 }`}
//               >
//                 <div className="flex items-center justify-between">
//                   {/* Label Name */}
//                   <div className="flex-1">
//                     {editingId === label.id ? (
//                       <div className="flex items-center gap-2">
//                         <input
//                           type="text"
//                           value={editingName}
//                           onChange={(e) => setEditingName(e.target.value)}
//                           className="flex-1 px-3 py-2 border border-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                           autoFocus
//                         />
//                         <button
//                           onClick={() => {
//                             setEditingId(null);
//                             setEditingName("");
//                           }}
//                           className="px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
//                         >
//                           <Save size={18} />
//                         </button>
//                         <button
//                           onClick={() => {
//                             setEditingId(null);
//                             setEditingName("");
//                           }}
//                           className="px-3 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
//                         >
//                           <X size={18} />
//                         </button>
//                       </div>
//                     ) : (
//                       <div className="flex items-center gap-3">
//                         <span className="text-lg font-semibold text-gray-800">
//                           {label.status}
//                         </span>
//                         {isInbox(label.id) && (
//                           <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
//                             Mặc định
//                           </span>
//                         )}
//                       </div>
//                     )}

//                     {/* Gmail Label Info */}
//                     {linkingId === label.id ? (
//                       <div className="mt-3 flex items-center gap-2">
//                         <select
//                           value={selectedGmailLabel}
//                           onChange={(e) =>
//                             setSelectedGmailLabel(e.target.value)
//                           }
//                           className="flex-1 px-3 py-2 border border-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         >
//                           <option value="">-- Chọn Gmail Label --</option>
//                           {getAvailableGmailLabels().map((gl) => (
//                             <option key={gl} value={gl}>
//                               {gl}
//                             </option>
//                           ))}
//                         </select>
//                         <button
//                           onClick={() => {
//                             setLinkingId(null);
//                             setSelectedGmailLabel("");
//                           }}
//                           className="px-3 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
//                         >
//                           <Save size={18} />
//                         </button>
//                         <button
//                           onClick={() => {
//                             setLinkingId(null);
//                             setSelectedGmailLabel("");
//                           }}
//                           className="px-3 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
//                         >
//                           <X size={18} />
//                         </button>
//                       </div>
//                     ) : label.gmailLabel ? (
//                       <div className="mt-2 flex items-center gap-2">
//                         <span className="text-sm text-gray-600">
//                           Gmail:{" "}
//                           <span className="font-medium text-green-600">
//                             {label.gmailLabel}
//                           </span>
//                         </span>
//                       </div>
//                     ) : (
//                       <div className="mt-2">
//                         <span className="text-sm text-gray-400">
//                           Chưa liên kết Gmail Label
//                         </span>
//                       </div>
//                     )}
//                   </div>

//                   {/* Actions */}
//                   {!isInbox(label.id) &&
//                     editingId !== label.id &&
//                     linkingId !== label.id && (
//                       <div className="flex items-center gap-2">
//                         <button
//                           onClick={() => {
//                             setEditingId(label.id);
//                             setEditingName(label.status);
//                           }}
//                           className="p-2 text-blue-500 hover:bg-blue-50 rounded-md transition-colors"
//                           title="Sửa tên"
//                         >
//                           <Edit2 size={18} />
//                         </button>

//                         {label.gmailLabel ? (
//                           <button
//                             onClick={() => {}}
//                             className="p-2 text-orange-500 hover:bg-orange-50 rounded-md transition-colors"
//                             title="Hủy liên kết Gmail"
//                           >
//                             <Unlink size={18} />
//                           </button>
//                         ) : (
//                           <button
//                             onClick={() => setLinkingId(label.id)}
//                             className="p-2 text-green-500 hover:bg-green-50 rounded-md transition-colors"
//                             title="Liên kết Gmail Label"
//                           >
//                             <Link size={18} />
//                           </button>
//                         )}

//                         <button
//                           onClick={() => {}}
//                           className="p-2 text-red-500 hover:bg-red-50 rounded-md transition-colors"
//                           title="Xóa label"
//                         >
//                           <Trash2 size={18} />
//                         </button>
//                       </div>
//                     )}
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Add New Label Form */}
//           {showNewLabelForm ? (
//             <div className="mt-4 border border-blue-500 rounded-lg p-4 bg-blue-50">
//               <div className="flex items-center gap-2">
//                 <input
//                   type="text"
//                   value={newLabelName}
//                   onChange={(e) => setNewLabelName(e.target.value)}
//                   placeholder="Tên label mới..."
//                   className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   autoFocus
//                 />
//                 <button
//                   onClick={() => {
//                     setNewLabelName("");
//                     setShowNewLabelForm(false);
//                   }}
//                   className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
//                 >
//                   Thêm
//                 </button>
//                 <button
//                   onClick={() => {
//                     setNewLabelName("");
//                     setShowNewLabelForm(false);
//                   }}
//                   className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
//                 >
//                   Hủy
//                 </button>
//               </div>
//             </div>
//           ) : (
//             <button
//               onClick={() => setShowNewLabelForm(true)}
//               className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-500 transition-colors"
//             >
//               <Plus size={20} />
//               <span className="font-medium">Thêm Label Mới</span>
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };
// export default LabelManagerModal;
import React, { useState } from "react";
import { X, Edit2, Trash2, Link, Unlink, Plus, Save } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import taskApi from "../../services/taskApi";
import { updateListTypes } from "../../redux/taskSlice";

const LabelManagerModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const labels = useSelector((state) => state.tasks.listTypes);
  const googleLabels = useSelector((state) => state.tasks.googleLabel);

  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState("");
  const [linkingId, setLinkingId] = useState(null);
  const [selectedGmailLabel, setSelectedGmailLabel] = useState("");
  const [showNewLabelForm, setShowNewLabelForm] = useState(false);
  const [newLabelName, setNewLabelName] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const isInbox = (id) => id === "0000";

  const getAvailableGmailLabels = () => {
    const linkedLabels = labels
      .filter((label) => label.gmailLabel)
      .map((label) => label.gmailLabel);
    return googleLabels.filter((gl) => !linkedLabels.includes(gl));
  };

  // Xử lý lưu tên label
  const handleSaveEdit = async (labelId) => {
    if (!editingName.trim()) return;

    try {
      setLoading(true);

      // Call API to update label name
      await taskApi.updateType(labelId, editingName.trim());

      // Update local state
      const updatedLabels = labels.map((label) =>
        label.id === labelId ? { ...label, status: editingName.trim() } : label
      );
      dispatch(updateListTypes(updatedLabels));

      setEditingId(null);
      setEditingName("");
    } catch (error) {
      console.error("Error updating label:", error);
      alert("Có lỗi xảy ra khi cập nhật tên label");
    } finally {
      setLoading(false);
    }
  };

  // Xử lý liên kết Gmail Label
  const handleSaveLink = async (labelId) => {
    if (!selectedGmailLabel) return;

    try {
      setLoading(true);

      // Call API to map label
      await taskApi.mapLabelToLabelGoogle(labelId, selectedGmailLabel);

      // Update local state
      const updatedLabels = labels.map((label) =>
        label.id === labelId
          ? { ...label, gmailLabel: selectedGmailLabel }
          : label
      );
      dispatch(updateListTypes(updatedLabels));

      setLinkingId(null);
      setSelectedGmailLabel("");
    } catch (error) {
      console.error("Error linking Gmail label:", error);
      alert("Có lỗi xảy ra khi liên kết Gmail label");
    } finally {
      setLoading(false);
    }
  };

  // Xử lý hủy liên kết Gmail Label
  const handleUnlink = async (label) => {
    if (!window.confirm("Bạn có chắc chắn muốn hủy liên kết với Gmail label?"))
      return;

    try {
      setLoading(true);

      // Call API to delete label mapping
      await taskApi.deleteLabelMapping(label.id);

      // Update local state
      const updatedLabels = labels.map((l) =>
        l.id === label.id ? { ...l, gmailLabel: null } : l
      );
      dispatch(updateListTypes(updatedLabels));
    } catch (error) {
      console.error("Error unlinking Gmail label:", error);
      alert("Có lỗi xảy ra khi hủy liên kết Gmail label");
    } finally {
      setLoading(false);
    }
  };

  // Xử lý xóa label
  const handleDelete = async (labelId) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa label này?")) return;

    try {
      setLoading(true);

      // Call API to delete label
      await taskApi.deleteType(labelId);

      // Update local state
      const updatedLabels = labels.filter((label) => label.id !== labelId);
      dispatch(updateListTypes(updatedLabels));
    } catch (error) {
      console.error("Error deleting label:", error);
      alert("Có lỗi xảy ra khi xóa label");
    } finally {
      setLoading(false);
    }
  };

  // Xử lý thêm label mới
  const handleAddNewLabel = async () => {
    if (!newLabelName.trim()) return;

    try {
      setLoading(true);

      // Call API to add new label
      const response = await taskApi.addType(newLabelName.trim());

      const newLabel = {
        id: response.id || Date.now().toString(),
        status: newLabelName.trim(),
        gmailLabel: null,
      };

      // Update local state
      const updatedLabels = [...labels, newLabel];
      dispatch(updateListTypes(updatedLabels));

      setNewLabelName("");
      setShowNewLabelForm(false);
    } catch (error) {
      console.error("Error adding new label:", error);
      alert("Có lỗi xảy ra khi thêm label mới");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[60]">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500"></div>
            <p className="text-white text-xl mt-4 font-medium">Đang xử lý...</p>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">Quản lý Labels</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            disabled={loading}
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-3">
            {labels.map((label) => (
              <div
                key={label.id}
                className={`border rounded-lg p-4 ${
                  isInbox(label.id)
                    ? "bg-gray-50 border-gray-300"
                    : "bg-white border-gray-200"
                }`}
              >
                <div className="flex items-center justify-between">
                  {/* Label Name */}
                  <div className="flex-1">
                    {editingId === label.id ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={editingName}
                          onChange={(e) => setEditingName(e.target.value)}
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              handleSaveEdit(label.id);
                            }
                          }}
                          className="flex-1 px-3 py-2 border border-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          autoFocus
                          disabled={loading}
                        />
                        <button
                          onClick={() => handleSaveEdit(label.id)}
                          className="px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50"
                          disabled={loading}
                        >
                          <Save size={18} />
                        </button>
                        <button
                          onClick={() => {
                            setEditingId(null);
                            setEditingName("");
                          }}
                          className="px-3 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors disabled:opacity-50"
                          disabled={loading}
                        >
                          <X size={18} />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-semibold text-gray-800">
                          {label.status}
                        </span>
                        {isInbox(label.id) && (
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                            Mặc định
                          </span>
                        )}
                      </div>
                    )}

                    {/* Gmail Label Info */}
                    {linkingId === label.id ? (
                      <div className="mt-3 flex items-center gap-2">
                        <select
                          value={selectedGmailLabel}
                          onChange={(e) =>
                            setSelectedGmailLabel(e.target.value)
                          }
                          className="flex-1 px-3 py-2 border border-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          disabled={loading}
                        >
                          <option value="">-- Chọn Gmail Label --</option>
                          {getAvailableGmailLabels().map((gl) => (
                            <option key={gl} value={gl}>
                              {gl}
                            </option>
                          ))}
                        </select>
                        <button
                          onClick={() => handleSaveLink(label.id)}
                          className="px-3 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors disabled:opacity-50"
                          disabled={loading || !selectedGmailLabel}
                        >
                          <Save size={18} />
                        </button>
                        <button
                          onClick={() => {
                            setLinkingId(null);
                            setSelectedGmailLabel("");
                          }}
                          className="px-3 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors disabled:opacity-50"
                          disabled={loading}
                        >
                          <X size={18} />
                        </button>
                      </div>
                    ) : label.gmailLabel ? (
                      <div className="mt-2 flex items-center gap-2">
                        <span className="text-sm text-gray-600">
                          Gmail:{" "}
                          <span className="font-medium text-green-600">
                            {label.gmailLabel}
                          </span>
                        </span>
                      </div>
                    ) : (
                      <div className="mt-2">
                        <span className="text-sm text-gray-400">
                          Chưa liên kết Gmail Label
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  {!isInbox(label.id) &&
                    editingId !== label.id &&
                    linkingId !== label.id && (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setEditingId(label.id);
                            setEditingName(label.status);
                          }}
                          className="p-2 text-blue-500 hover:bg-blue-50 rounded-md transition-colors disabled:opacity-50"
                          title="Sửa tên"
                          disabled={loading}
                        >
                          <Edit2 size={18} />
                        </button>

                        {label.gmailLabel ? (
                          <button
                            onClick={() => handleUnlink(label)}
                            className="p-2 text-orange-500 hover:bg-orange-50 rounded-md transition-colors disabled:opacity-50"
                            title="Hủy liên kết Gmail"
                            disabled={loading}
                          >
                            <Unlink size={18} />
                          </button>
                        ) : (
                          <button
                            onClick={() => setLinkingId(label.id)}
                            className="p-2 text-green-500 hover:bg-green-50 rounded-md transition-colors disabled:opacity-50"
                            title="Liên kết Gmail Label"
                            disabled={loading}
                          >
                            <Link size={18} />
                          </button>
                        )}

                        <button
                          onClick={() => handleDelete(label.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-md transition-colors disabled:opacity-50"
                          title="Xóa label"
                          disabled={loading}
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    )}
                </div>
              </div>
            ))}
          </div>

          {/* Add New Label Form */}
          {showNewLabelForm ? (
            <div className="mt-4 border border-blue-500 rounded-lg p-4 bg-blue-50">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={newLabelName}
                  onChange={(e) => setNewLabelName(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleAddNewLabel();
                    }
                  }}
                  placeholder="Tên label mới..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  autoFocus
                  disabled={loading}
                />
                <button
                  onClick={handleAddNewLabel}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50"
                  disabled={loading || !newLabelName.trim()}
                >
                  Thêm
                </button>
                <button
                  onClick={() => {
                    setNewLabelName("");
                    setShowNewLabelForm(false);
                  }}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors disabled:opacity-50"
                  disabled={loading}
                >
                  Hủy
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowNewLabelForm(true)}
              className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-500 transition-colors disabled:opacity-50"
              disabled={loading}
            >
              <Plus size={20} />
              <span className="font-medium">Thêm Label Mới</span>
            </button>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t bg-gray-50">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900 transition-colors disabled:opacity-50"
            disabled={loading}
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

export default LabelManagerModal;
