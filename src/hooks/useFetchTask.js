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
        taskApi.getTaskOfStatus("to-do"),
        taskApi.getTaskOfStatus("done"),
      ]);

      dispatch(
        setEmailTasksInbox(inboxData.mailTasks.map((task) => task.thread))
      );
      dispatch(
        setEmailTasksTodo(todoData.mailTasks.map((task) => task.thread))
      );
      dispatch(
        setEmailTasksDone(doneData.mailTasks.map((task) => task.thread))
      );

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
