import { createContext, useState } from "react";

const NotificationContext = createContext({
  notification: null, // {title, message, status}
  showNotification: function (notification) {},
  hideNotification: function () {},
});

export function NotificationContextProvider({ children }) {
  const [activeNotification, setActiveNotification] = useState();

  function showNotificationHandler(notification) {
    setActiveNotification(notification);
  }

  function hideNotificationHandler() {
    setActiveNotification(null);
  }

  const context = {
    notification: activeNotification,
    showNotification: showNotificationHandler,
    hideNotification: hideNotificationHandler,
  };

  return (
    <NotificationContext.Provider value={context}>
      {children}
    </NotificationContext.Provider>
  );
}

export default NotificationContext;
