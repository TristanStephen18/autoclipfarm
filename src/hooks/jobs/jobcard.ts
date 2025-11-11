import { useState } from "react";

export function useJobCardHooks() {
      const [isStarting, setIsStarting] = useState(false);
      const [showConfirm, setShowConfirm] = useState(false);
      const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
      const [isDeleting, setIsDeleting] = useState(false);

      return{
        isStarting,
        setIsStarting,
        showConfirm,
        setShowConfirm,
        showDeleteConfirm,
        setShowDeleteConfirm,
        isDeleting,
        setIsDeleting
      }
}