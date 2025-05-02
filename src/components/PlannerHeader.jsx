function PlannerHeader({ currentTab, setCurrentTab }) {
  const tabList = ["여행만들기", "찜", "상세설명"];

  return (
    <div className="flex justify-around mb-4 border-b pb-2">
      {tabList.map((tab, idx) => (
        <button
          key={idx}
          onClick={() => setCurrentTab(tab)}
          className={`px-4 py-2 font-semibold rounded ${
            currentTab === tab ? "bg-blue-500 text-white" : "bg-gray-100"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

export default PlannerHeader;
