// useDocumentTitle.js
import { useEffect } from "react";

function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title;
  }, [title]); // Update only when title changes
}

export default useDocumentTitle;
