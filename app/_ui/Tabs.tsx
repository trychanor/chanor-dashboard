import React, { useCallback, useMemo } from "react";

export interface TabItem {
  key: string;
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (key: string) => void;
}

const TabButton = React.memo(
  ({
    tab,
    isActive,
    onClick,
  }: {
    tab: TabItem;
    isActive: boolean;
    onClick: (key: string) => void;
  }) => {
    return (
      <button
        onClick={() => onClick(tab.key)}
        className={`text-lg w-full py-[9px] text-[#626262] font-medium cursor-pointer transition-all ease-in-out duration-300 hover:bg-white hover:font-medium hover:text-neutral-black hover:rounded-[10px] smooth-transition ${
          isActive ? "bg-white font-bold text-neutral-black rounded-[10px]" : ""
        }`}
      >
        {tab.label}
      </button>
    );
  }
);

// for React DevTools & ESLint
TabButton.displayName = "TabButton";

function TabsComponent({ tabs, activeTab, onChange }: TabsProps) {
  const handleChange = useCallback((key: string) => onChange(key), [onChange]);

  const activeContent = useMemo(() => {
    return tabs.find((t) => t.key === activeTab)?.content;
  }, [tabs, activeTab]);

  return (
    <div>
      <div className="flex justify-between items-center gap-8 bg-neutral-100 px-5 h-[68px] w-full rounded-lg">
        {tabs.map((tab) => (
          <TabButton
            key={tab.key}
            tab={tab}
            isActive={activeTab === tab.key}
            onClick={handleChange}
          />
        ))}
      </div>

      <div className="mt-4">{activeContent}</div>
    </div>
  );
}

const Tabs = React.memo(TabsComponent);
Tabs.displayName = "Tabs";

export default Tabs;
