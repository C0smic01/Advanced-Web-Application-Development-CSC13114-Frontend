import { useState } from "react";
import { useDispatch } from "react-redux";
import taskApi from "../services/taskApi";
import {
  setEmailTasksInbox,
  setEmailTasksTodo,
  setEmailTasksDone,
} from "../redux/taskSlice";

const useGetAllTasks = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAllTasks = async () => {
    try {
      setLoading(true);
      setError(null);

      const [inboxData, todoData, doneData] = await Promise.all([
        taskApi.getTaskInbox(),
        taskApi.getTaskOfStatus("TODO"),
        taskApi.getTaskOfStatus("DONE"),
      ]);

      // Helper function to add summary to last message of each thread
      const addSummaryToThreads = (tasks) => {
        return tasks.map((task) => {
          const thread = task.thread;
          if (thread.messages && thread.messages.length > 0) {
            const lastMessageIndex = thread.messages.length - 1;
            thread.messages[lastMessageIndex] = {
              ...thread.messages[lastMessageIndex],
              summary: task.summary || "No summary available",
            };
          }
          return thread;
        });
      };

      dispatch(setEmailTasksInbox(addSummaryToThreads(inboxData.mailTasks)));
      dispatch(setEmailTasksTodo(addSummaryToThreads(todoData.mailTasks)));
      dispatch(setEmailTasksDone(addSummaryToThreads(doneData.mailTasks)));

      return { inbox: inboxData, todo: todoData, done: doneData };
    } catch (err) {
      setError(err.message || "Failed to fetch tasks");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { fetchAllTasks, loading, error };
};
export default useGetAllTasks;
