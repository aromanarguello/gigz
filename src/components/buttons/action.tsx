interface ActionButtonProps {
  onClick: () => void;
  text: string;
  className?: string;
}

const ActionButton = (props: ActionButtonProps) => (
  <button
    onClick={props.onClick}
    className="mr-4 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 rounded-3xl shadow-lg h-12"
  >
    {props.text}
  </button>
);

export default ActionButton;
