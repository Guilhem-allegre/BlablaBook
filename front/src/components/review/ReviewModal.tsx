import ReactDOM from "react-dom";

interface IReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * ReviewModal component that displays a modal for submitting a new review.
 *
 * @param {Object} param0 - Component props.
 * @param {boolean} param0.isOpen - Whether the modal is open.
 * @param {Function} param0.onClose - Function to call when closing the modal.
 * @returns {JSX.Element|null} - The rendered modal component or null if not open.
 */
const ReviewModal = ({ isOpen, onClose }: IReviewModalProps) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed font-body inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-body rounded-lg p-6 w-full max-w-xl relative shadow-lg">
        {/* Close button */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl"
          onClick={onClose}
        >
          &times;
        </button>

        {/* Form content */}
        <h2 className="text-2xl font-title font-bold mb-4 text-black">
          Laissez votre avis
        </h2>
        <form className="flex flex-col gap-4">
          {/* Placeholder for stars (not working yet) */}
          <div className="text-gray-500">★ ★ ★ ★ ★</div>

          <input
            type="text"
            placeholder="Titre"
            className="px-4 py-2 border border-gray-300 rounded-lg text-lg"
          />
          <textarea
            placeholder="Votre commentaire..."
            className="px-4 py-2 border border-gray-300 rounded-lg text-lg h-32"
          ></textarea>

          <button
            type="submit"
            className="rounded px-6 py-4 bg-gray-800 font-semibold text-lg text-white text-center shadow-sm transition-all duration-300 hover:bg-gray-600 hover:shadow-gray-400 cursor-pointer"
          >
            Postez votre avis
          </button>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default ReviewModal;