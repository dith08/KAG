import { Icon } from "@iconify/react";

interface ButtonProps {
    type?: "button" | "submit";
    text: string;
    icon?: string;
    onClick?: () => void;
    className?: string;
  }
  
  const Button: React.FC<ButtonProps> = ({
    type = "button",
    text,
    icon,
    onClick,
    className,
  }) => {
    return (
      <button
        type={type}
        onClick={onClick}
        className={`w-full p-3 rounded-[15px] cursor-pointer ${className}`}
      >
        {icon && <Icon icon={icon} className="mr-2 text-xl inline-block" />}
        {text}
      </button>
    );
  };
  
  export default Button;
  