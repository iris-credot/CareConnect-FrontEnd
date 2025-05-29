import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./loadingPage";
export default function NotificationsPage() {
 

   const [notifications, setNotifications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [hasNoNotifications, setHasNoNotifications] = useState(false);

  const ITEMS_PER_PAGE = 8;
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchNotifications = async () => {
      if (!userId) {
        console.error("User ID not found in localStorage");
        return;
      }

      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Auth token not found in localStorage");
        return;
      }

      setLoading(true);
      setError("");
      try {
        const res = await axios.get(
          `https://careconnect-api-v2kw.onrender.com/api/notify/get/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const fetchedNotifications = res.data.notifications || [];
        setNotifications(fetchedNotifications);
        setHasNoNotifications(fetchedNotifications.length === 0);
      } catch (err) {
        if (err.response?.status === 404) {
          setHasNoNotifications(true);
          setNotifications([]);
        } else {
          setError("Failed to load notifications. Please try again.");
        }
        console.error("Error fetching notifications:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [userId]);

  const indexOfLast = currentPage * ITEMS_PER_PAGE;
  const indexOfFirst = indexOfLast - ITEMS_PER_PAGE;
  const currentItems = notifications.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(notifications.length / ITEMS_PER_PAGE);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  return (
    <div className="flex flex-col dark:text-white p-6">
      <h1 className="font-bold text-4xl mb-10">Notifications</h1>

      {loading &&    <Loading/>}
      {error && <p className="text-red-500">{error}</p>}
      {hasNoNotifications && !loading && <p>No notifications to show.</p>}

      {!loading && !hasNoNotifications && (
        <>
          <div className="space-y-4">
            {currentItems.map(notification => (
              <div
                key={notification._id}
                className="flex gap-2 border border-gray-300 dark:border-gray-600 rounded-lg p-4 shadow hover:shadow-md transition"
              >
                <div className="w-[80%]">
                  <h2 className="font-semibold">{notification.title}</h2>
                  <p className="text-sm text-gray-500 dark:text-white">{notification.time}</p>
                </div>
                <div className="flex gap-3 w-[20%]">
                  <button className="text-xs bg-black text-white dark:text-black dark:bg-white px-2 py-1 mt-3">
                    Mark read
                  </button>
                  <span className="text-red-700 text-2xl mt-3">
                    <i className="fas fa-trash" onClick={() => {}}></i>
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-6">
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
