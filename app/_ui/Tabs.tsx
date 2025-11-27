export default function Tabs({ tabs, activeTab, onChange }) {
  return (
    <div>
      <div className="flex justify-between items-center gap-8 bg-neutral-100 px-5 h-[68px] w-full rounded-lg">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={`text-lg leading-[-0.33px] w-full py-[9px] text-[#626262] font-semibold ease-in-out duration-300 transition-all cursor-pointer ${
              activeTab === tab.key
                ? "bg-white font-medium text-neutral-black rounded-[10px]"
                : ""
            }`}
            onClick={() => onChange(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="mt-4">
        {tabs.find((tab) => tab.key === activeTab)?.content}
      </div>
    </div>
  );
}
