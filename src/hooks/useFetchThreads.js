import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAllThreadsState, setNextPageToken } from "../redux/threadSlice";
import emailApi from "../services/emailApi";

const useFetchThreads = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchThreads = async () => {
      try {
        const response = await emailApi.getThreads();
        dispatch(setAllThreadsState(response.data.threads || []));
        dispatch(setNextPageToken(response.data.nextPageToken || ""));
      } catch (error) {
        console.error("Error fetching threads:", error);
      }
    };

    fetchThreads();
  }, [dispatch]);
};

export default useFetchThreads;
