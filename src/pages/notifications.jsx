import { useState } from "react";
import useDocumentTitle from "../customHooks/documentTitle";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

const staticNotifications = [
  { id: 1, title: "New message from John", time: "2 mins ago" },
  { id: 2, title: "Your report is ready", time: "10 mins ago" },
  { id: 3, title: "System update completed", time: "30 mins ago" },
  { id: 4, title: "Reminder: Meeting at 3PM", time: "1 hour ago" },
  { id: 5, title: "New follower: Jane Doe", time: "2 hours ago" },
  { id: 6, title: "Weekly summary available", time: "Yesterday" },
  { id: 7, title: "Security alert: Login from new device", time: "2 days ago" },
  { id: 8, title: "New message from John", time: "2 mins ago" },
  { id: 9, title: "Your report is ready", time: "10 mins ago" },
  { id: 10, title: "System update completed", time: "30 mins ago" },
  { id: 11, title: "Reminder: Meeting at 3PM", time: "1 hour ago" },
  { id: 12, title: "New follower: Jane Doe", time: "2 hours ago" },
  { id: 13, title: "Weekly summary available", time: "Yesterday" },
  { id: 14, title: "Security alert: Login from new device", time: "2 days ago" },
  // Add more as needed
];

const ITEMS_PER_PAGE = 8;

export default function NotificationsPage() {
  useDocumentTitle("Notifications");

  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLast = currentPage * ITEMS_PER_PAGE;
  const indexOfFirst = indexOfLast - ITEMS_PER_PAGE;
  const currentItems = staticNotifications.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(staticNotifications.length / ITEMS_PER_PAGE);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  return (
    <div className="flex flex-col dark:text-white p-6">
      <h1 className="font-bold text-4xl mb-10"> <FontAwesomeIcon icon={faBell} /> Notifications</h1>

      <div className="space-y-4">
        {currentItems.map(notification => (
          <div
            key={notification.id}
            className="flex gap-2 border border-gray-300 dark:border-gray-600 rounded-lg p-4 shadow hover:shadow-md transition"
          ><div className="w-[80%]">
            <h2 className="font-semibold">{notification.title}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">{notification.time}</p>
            </div>
            <div className="flex gap-3 w-[20%]">
            <button className="text-xs bg-black  text-white dark:text-black dark:bg-white px-2 py-1 mt-3">Mark read</button>
                <span className="text-red-700 text-2xl mt-3"><i className="fas fa-trash" onClick={""} ></i></span>
               
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
    </div>
  );
}
