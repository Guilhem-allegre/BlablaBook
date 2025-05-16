interface IReviewAddProps {
  onWriteClick?: () => void;
}

/**
 * ReviewActions component that provides buttons for review-related actions.
 *
 * @param {Object} param - Component props.
 * @param {Function} param.onWriteClick - Callback function when the write review button is clicked.
 * @returns {JSX.Element} - The rendered review actions component.
 */
const ReviewAdd = ({ onWriteClick }: IReviewAddProps) => {

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-end w-full">
      <button
        className="rounded px-6 py-4 bg-gray-800 font-semibold text-lg text-white text-center shadow-sm transition-all duration-300 hover:bg-gray-600 hover:shadow-gray-400 cursor-pointer"
        onClick={onWriteClick}
      >
        Laissez un avis
      </button>
    </div>
  );
};

export default ReviewAdd;