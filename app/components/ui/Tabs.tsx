"use client";

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
  density?: "regular" | "compact";
}

const TabButton = React.memo(
  ({
    tab,
    isActive,
    onClick,
    density,
  }: {
    tab: TabItem;
    isActive: boolean;
    onClick: (key: string) => void;
    density: "regular" | "compact";
  }) => {
    const sizeClass = density === "compact" ? "text-sm py-2" : "text-lg py-[9px]";

    return (
      <button
        onClick={() => onClick(tab.key)}
        className={`${sizeClass} w-full text-[#626262] font-medium cursor-pointer transition-all ease-in-out duration-300 hover:bg-white hover:font-medium hover:text-neutral-black hover:rounded-lg smooth-transition ${
          isActive ? "bg-white font-bold text-neutral-black rounded-[10px]" : ""
        }`}
      >
        {tab.label}
      </button>
    );
  },
);

// for React DevTools & ESLint
TabButton.displayName = "TabButton";

function TabsComponent({
  tabs,
  activeTab,
  onChange,
  density = "regular",
}: TabsProps) {
  const handleChange = useCallback((key: string) => onChange(key), [onChange]);

  const activeContent = useMemo(() => {
    return tabs.find((t) => t.key === activeTab)?.content;
  }, [tabs, activeTab]);

  const containerClass =
    density === "compact"
      ? "flex justify-between items-center gap-4 bg-neutral-100 px-3 h-12 w-full rounded-lg"
      : "flex justify-between items-center gap-8 bg-neutral-100 px-5 h-[68px] w-full rounded-lg";

  return (
    <div>
      <div className={containerClass}>
        {tabs.map((tab) => (
          <TabButton
            key={tab.key}
            tab={tab}
            isActive={activeTab === tab.key}
            onClick={handleChange}
            density={density}
          />
        ))}
      </div>

      <div className={density === "compact" ? "mt-3" : "mt-4"}>{activeContent}</div>
    </div>
  );
}

const Tabs = React.memo(TabsComponent);
Tabs.displayName = "Tabs";

export default Tabs;
