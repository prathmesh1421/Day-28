import { useEffect, useRef } from "react";

export default function Modal({
  isOpen,
  onClose,
  children,
}) {
  const ref = useRef(null);

  useEffect(() => {
    const handleKey = (e) => {
      // Close modal with ESC
      if (e.key === "Escape") {
        onClose();
      }

      // Keyboard navigation inside modal
      if (e.key === "Tab") {
        const focusableElements =
          ref.current.querySelectorAll(
            "button, input, select, textarea, a[href]"
          );

        const firstElement =
          focusableElements[0];

        const lastElement =
          focusableElements[
            focusableElements.length - 1
          ];

        // Shift + Tab
        if (
          e.shiftKey &&
          document.activeElement === firstElement
        ) {
          e.preventDefault();
          lastElement.focus();
        }

        // Normal Tab
        else if (
          !e.shiftKey &&
          document.activeElement === lastElement
        ) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    if (isOpen) {
      document.addEventListener(
        "keydown",
        handleKey
      );

      // Focus modal automatically
      ref.current?.focus();
    }

    return () => {
      document.removeEventListener(
        "keydown",
        handleKey
      );
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="modal"
        ref={ref}
        tabIndex="-1"
        aria-label="Add Patient Modal"
      >
        {children}

        <button
          onClick={onClose}
          aria-label="Close Modal"
        >
          Close
        </button>
      </div>
    </div>
  );
}
