import React, { useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

function MapView({ places = [] }) {
  const center = {
    lat: 37.566826,
    lng: 126.9786567,
  };

  const [selectedId, setSelectedId] = useState(null); // 클릭된 마커 ID 저장

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <Map center={center} level={3} style={{ width: "100%", height: "100%" }}>
        {places.map((place, index) => {
          const lat = Number(place.mapy) + index * 0.00003;
          const lng = Number(place.mapx) + index * 0.00003;
          const isSelected = selectedId === place.contentid;

          if (isNaN(lat) || isNaN(lng)) return null;

          return (
            <MapMarker
              key={place.contentid}
              position={{ lat, lng }}
              onClick={() =>
                setSelectedId(
                  selectedId === place.contentid ? null : place.contentid
                )
              }
            >
              {/* ✅ 클릭된 마커에만 장소명 말풍선 출력 */}
              {isSelected && (
                <div
                  style={{
                    padding: "5px 10px",
                    background: "#fff",
                    fontSize: "13px",
                    textAlign: "center",
                  }}
                >
                  {place.title}
                </div>
              )}
            </MapMarker>
          );
        })}
      </Map>
    </div>
  );
}

export default MapView;
