import { Icon } from "@iconify/react";

interface ButtonProps {
  type?: "button" | "submit";
  text?: string;
  icon?: string;
  onClick?: () => void;
  className?: string;
  loading?: boolean;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  type = "button",
  text,
  icon,
  onClick,
  className,
  loading = false,
  disabled = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full p-3 rounded-[15px] cursor-pointer flex items-center justify-center gap-2 ${
        disabled || loading ? "opacity-60 cursor-not-allowed" : ""
      } ${className}`}
      disabled={disabled || loading}
    >
      {loading && (
        <Icon
          icon="line-md:loading-twotone-loop"
          className="animate-spin text-xl"
        />
      )}
      {icon && !loading && <Icon icon={icon} className="text-xl" />}
      <span>{loading ? "Loading..." : text}</span>
    </button>
  );
};

export default Button;
