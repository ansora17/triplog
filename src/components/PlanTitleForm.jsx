import React, { useState } from "react";

function PlanTitleForm() {
  const [date, setDate] = useState("");
  const [title, setTitle] = useState("");
  return (
    <>
      <div className="p-2 border-b">
        <label>일정</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border px-2 py-1 rounded w-full mb-2"
        />
        <label>제목</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목을 입력하세요..."
          className="border px-2 py-1 rounded w-full"
        />
      </div>
    </>
  );
}

export default PlanTitleForm;
