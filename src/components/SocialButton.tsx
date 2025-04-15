import { Icon } from "@iconify/react";

interface SocialButtonProps {
  icon: string;
  text: string;
  onClick: () => void;
  className?: string;
  iconClassName?: string;
}

const SocialButton: React.FC<SocialButtonProps> = ({
  icon,
  text,
  onClick,
  className,
  iconClassName,
}) => {
  return (
    <button
      onClick={onClick}
      className={`text-sm md:text-base flex items-center justify-center w-full px-4 py-2 border border-black/50 rounded-[15px] hover:bg-gray-100 cursor-pointer ${className}`}
    >
      <Icon icon={icon} className={`mr-2 text-xl ${iconClassName}`} />
      {text}
    </button>
  );
};

export default SocialButton;
