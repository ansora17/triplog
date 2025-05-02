import React from "react";

function PlaceModal({ place, onClose }) {
  if (!place) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-[400px] shadow-lg relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-black"
          onClick={onClose}
        >
          ✕
        </button>
        <h2 className="text-xl font-bold mb-2">{place.title}</h2>
        {place.firstimage && (
          <img
            src={place.firstimage}
            alt={place.title}
            className="w-full h-48 object-cover rounded mb-4"
          />
        )}
        <p className="text-sm text-gray-700 mb-2">{place.addr1}</p>
        <p className="text-xs text-gray-500">콘텐츠 ID: {place.contentid}</p>
      </div>
    </div>
  );
}

export default PlaceModal;
