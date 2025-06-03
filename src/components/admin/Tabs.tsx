interface TabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  tabs: { id: string; label: string }[];
}

export const Tabs: React.FC<TabsProps> = ({ activeTab, setActiveTab, tabs }) => (
  <div className="flex border-b border-gray-200">
    {tabs.map((tab) => (
      <button
        key={tab.id}
        className={`px-4 py-2 text-sm font-medium text-gray-600 hover:text-green-700 transition-colors duration-200 ${
          activeTab === tab.id
            ? "border-b-2 border-green-700 text-green-700"
            : ""
        }`}
        onClick={() => setActiveTab(tab.id)}
      >
        {tab.label}
      </button>
    ))}
  </div>
);