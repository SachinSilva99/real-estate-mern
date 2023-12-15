import React from "react";

const Search = () => {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="left border-b-2 md:border-r-2 md:min-h-screen">
        <form className="flex flex-col gap-8">
          <div className="flex items-center gap-2 p-6 ">
            <label className="whitespace-nowrap">Search keyword</label>
            <input
              className="border rounded-lg p-3 w-full"
              type="text"
              id="searchTerm"
              placeholder="search"
            />
          </div>
          <div className="flex gap-2 flex-wrap items-center p-6">
            <label>Type:</label>
            <div className="flex gap-2">
              <input className="w-5" type="checkbox" id="all" />
              <span>Rent & Sale</span>
            </div>
            <div className="flex gap-2">
              <input className="w-5" type="checkbox" id="rent" />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input className="w-5" type="checkbox" id="sale" />
              <span> Sale</span>
            </div>
            <div className="flex gap-2">
              <input className="w-5" type="checkbox" id="offer" />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap items-center p-6">
            <label>Amenities:</label>
            <div className="flex gap-2">
              <input className="w-5" type="checkbox" id="parking" />
              <span>Parking</span>
            </div>
            <div className="flex gap-2">
              <input className="w-5" type="checkbox" id="furnished" />
              <span>Furnished</span>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap items-center p-6">
            <label>Sort:</label>
            <select id="sort_order" className="border rounded-lg p-3">
              <option value="">Price low to high</option>
              <option value="">Price hight to low</option>
              <option value="">Latest</option>
              <option value="">Oldest</option>
            </select>
          </div>
          <button className="bg-slate-500 p-3 m-3 text-white hover:opacity-80 focus:opacity-50 rounded-2xl">
            Search
          </button>
        </form>
      </div>
      <div className="right">
        <h1 className="text-3xl font-semibold border-b-2">
          Listing Results :{" "}
        </h1>
      </div>
    </div>
  );
};

export default Search;
