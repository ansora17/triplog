import React, { useState } from "react";

function RecommendList() {
  const [places, setPlaces] = useState([]);

  return (
    <>
      <div>
        <div className="flex space-x-2 my-2">
          <button onClick={() => setSelectedType("12")}>관광지</button>
          <button onClick={() => setSelectedType("39")}>음식점</button>
        </div>
        <ul>
          {places.map((place) => (
            <li
              key={place.contentid}
              className="flex items-center p-2 border mb-2"
            >
              <div
                className={`w-4 h-4 rounded-full mr-2 ${
                  place.contenttypeid === "12" ? "bg-yellow-400" : "bg-red-500"
                }`}
              ></div>
              <div onClick={() => onSelect(place)}>
                <p className="font-bold">{place.title}</p>
                <p className="text-sm">{place.addr1}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default RecommendList;
