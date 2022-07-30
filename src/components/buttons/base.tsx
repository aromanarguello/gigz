interface BaseButtonProps {
  text: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

const BaseButton = ({ text, onClick, type }: BaseButtonProps) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className="self-center mt-4 w-32 text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-300"
    >
      {text}
    </button>
  );
};

export default BaseButton;
