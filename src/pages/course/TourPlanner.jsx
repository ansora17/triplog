import React, { useEffect, useState } from "react";
import { fetchTourPlaces } from "../../api/tourApi";
import MapView from "../../components/MapView";
import "../../index.css";
import { fetchDetailIntro } from "../../api/tourApi"; // 상세정보 API 추가

function TourPlanner() {
  const [allPlaces, setAllPlaces] = useState([]);
  const [type, setType] = useState("12");
  const [visibleCount, setVisibleCount] = useState(6);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const visiblePlaces = allPlaces.slice(0, visibleCount);
  const [comment, setComment] = useState("");

  useEffect(() => {
    const load = async () => {
      const data = await fetchTourPlaces(type, 20);
      console.log("✅ 불러온 관광지:", data);
      setAllPlaces(data);
      setVisibleCount(6);
      setSelectedPlace(null); // 초기화
    };
    load();
  }, [type]);

  const handlePlaceClick = async (place) => {
    try {
      const detailData = await fetchDetailIntro(
        place.contentid,
        place.contenttypeid
      );

      const detailPlace = {
        ...place,
        ...(Array.isArray(detailData) ? detailData[0] : detailData),
      };

      setSelectedPlace(detailPlace);
    } catch (error) {
      console.error("❌ 상세정보 병합 실패", error);
      setSelectedPlace(place);
    }
  };

  const handleLoadMore = () => setVisibleCount((prev) => prev + 6);

  const handleAddCourse = () => {
    alert(`📌 [${selectedPlace.title}]가 코스에 추가되었습니다!`);
  };
  const handleCommentSubmit = () => {
    if (comment.trim() !== "") {
      alert(`📝 댓글 작성됨: ${comment}`);
      setComment("");
    }
  };

  return (
    <div className="flex w-full h-screen">
      {/* 왼쪽 패널 */}
      <div className="w-[450px] bg-gray-100 flex flex-col relative z-index-100">
        {/* 버튼 영역 */}
        <div className="p-4 flex gap-2">
          <button
            onClick={() => setType("12")}
            className="px-3 py-1 bg-blue-500 text-white rounded"
          >
            여행지
          </button>
          <button
            onClick={() => setType("39")}
            className="px-3 py-1 bg-green-500 text-white rounded"
          >
            음식점
          </button>
        </div>

        {/* 리스트 영역 */}
        <div className="flex-1 overflow-y-auto px-4 pb-4">
          {visiblePlaces.map((place) => (
            <div
              key={place.contentid}
              onClick={() => handlePlaceClick(place)} // 클릭 시 모달 열기
              className="bg-white p-4 mb-4 rounded-lg shadow-md"
            >
              <div className="flex items-center gap-4">
                <img
                  src={place.firstimage || "/no_img.jpg"}
                  alt={place.title}
                  className="w-24 h-24 object-cover rounded-full"
                />
                <div className="min-w-0">
                  <p className="font-bold text-xl truncate">{place.title}</p>
                  <p className="text-sm text-gray-600 truncate">
                    {place.addr1}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* 더보기 버튼 */}
          {visibleCount < allPlaces.length && (
            <button
              onClick={handleLoadMore}
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              더보기 +
            </button>
          )}
        </div>
      </div>

      {/* 오른쪽 지도 */}
      <div className="flex-1 p-4 bg-white">
        <MapView places={visiblePlaces} />
      </div>

      {/* ✅ 오른쪽에서 지도 위로 슬라이드 */}
      <div
        className={`absolute top-0 left-[460px] w-[400px] h-full bg-white shadow-lg z-50 transition-transform duration-300 ease-in-out
          ${
            selectedPlace
              ? "translate-x-0 pointer-events-auto"
              : "-translate-x-[440px] pointer-events-none opacity-0"
          }`}
      >
        {/* 닫기 버튼 */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-bold">
            {type === "12" ? "주변 추천여행지" : "주변 추천음식점"}
          </h2>
          <button onClick={() => handlePlaceClick(null)} className="text-xl">
            ✕
          </button>
        </div>

        {/* 세부 정보 영역 */}
        {selectedPlace && (
          <div className="p-4 text-sm">
            {/* 대표 이미지 */}
            {selectedPlace.firstimage && (
              <img
                src={selectedPlace.firstimage}
                alt={selectedPlace.title}
                className="w-full h-48 object-cover rounded mb-4"
              />
            )}

            {/* {selectedPlace.firstimage2 && (
              <img
                src={selectedPlace.firstimage2}
                alt="추가 이미지"
                className="w-full h-32 object-cover rounded mb-4"
              />
            )} */}
            <p className=" text-lg font-bold mb-2"> {selectedPlace.title}</p>
            <p className="text-gray-700 mb-2">📍 주소: {selectedPlace.addr1}</p>

            {/* 🍴 음식점인 경우 */}
            {String(selectedPlace.contenttypeid) === "39" ? (
              <>
                <p>
                  운영시간:{" "}
                  <span
                    dangerouslySetInnerHTML={{
                      __html: selectedPlace.opentimefood || "정보 없음",
                    }}
                  />
                </p>
                <p>
                  <strong>휴무일:</strong>{" "}
                  {selectedPlace.restdatefood || "정보 없음"}
                </p>
                <p>
                  <strong>대표 메뉴:</strong>{" "}
                  {selectedPlace.treatmenu || "정보 없음"}
                </p>
                <p>
                  <strong>주차:</strong>{" "}
                  {selectedPlace.parkingfood || "정보 없음"}
                </p>
                <p>
                  <strong>신용카드:</strong>{" "}
                  {selectedPlace.chkcreditcardfood || "정보 없음"}
                </p>
              </>
            ) : (
              // 🏛 여행지인 경우
              <>
                <p>
                  <strong>문의 및 안내:</strong>{" "}
                  {selectedPlace.infocenter || "정보 없음"}
                </p>
                <p>
                  <strong>휴무일:</strong>{" "}
                  {selectedPlace.restdate || "정보 없음"}
                </p>
                <p>
                  <strong>이용시간:</strong>{" "}
                  {selectedPlace.infocenter || "정보 없음"}
                </p>
                <p>
                  <strong>주차:</strong> {selectedPlace.parking || "정보 없음"}
                </p>
              </>
            )}
            {/* 코스 추가 버튼 */}
            <button
              onClick={handleAddCourse}
              className="w-full mt-4 bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              ➕ 코스에 추가
            </button>
            {/* 댓글 입력 */}
            <div className="mt-6">
              <p className="text-sm font-semibold mb-1">💬 트립톡톡</p>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full border rounded p-2 h-24 mb-2 resize-none"
                placeholder="댓글을 입력하세요"
              />
              <button
                onClick={handleCommentSubmit}
                className="w-full bg-gray-800 text-white py-2 rounded hover:bg-black"
              >
                댓글 등록
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TourPlanner;
