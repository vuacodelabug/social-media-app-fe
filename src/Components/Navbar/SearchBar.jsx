import React, { useState } from "react";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    try {
      const response = await fetch("/api/search-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) throw new Error("Lỗi gọi API");

      const data = await response.json();
      setResults(data.results); // giả định API trả về mảng kết quả
    } catch (err) {
      console.error("Lỗi tìm kiếm:", err.message);
    }
  };



  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit} className="relative">
        <button
          type="submit"
          className="absolute inset-y-0 left-3 flex items-center text-gray-400 hover:text-gray-600"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z"
            />
          </svg>
        </button>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Tìm kiếm bạn bè, bài viết..."
          className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
        />
      </form>

      {/* Kết quả tìm kiếm */}
       {/* Hiển thị kết quả */}
      {results.length > 0 ? (
        <ul className="absolute left-0 right-0 mt-1 bg-white border rounded shadow z-10">
          {results.map((item, idx) => (
            <li key={idx} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              {item}
            </li>
          ))}
        </ul>
      ) : query.trim() !== "" ? (
        <div className="absolute left-0 right-0 mt-1 bg-white border rounded shadow px-4 py-2 text-gray-500 text-sm z-10">
          Không tìm thấy kết quả nào phù hợp.
        </div>
      ) : null}
    </div>
  );
};

export default SearchBar;
