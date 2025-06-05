import { Icon } from "@iconify/react";

interface CardProps {
  title: string;
  icon: string;
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ title, icon, children, className }) => (
  <div className={`bg-white border border-gray-200 rounded-xl shadow-md p-6 ${className}`}>
    <div className="flex items-center gap-3 mb-6">
      <Icon icon={icon} className="w-8 h-8 text-green-700" />
      <h2 className="text-xl font-semibold text-green-700">{title}</h2>
    </div>
    {children}
  </div>
);