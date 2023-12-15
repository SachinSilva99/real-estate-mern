import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Search = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [sidebardata, setSidebardata] = useState({
    searchTerm: "",
    type: "all",
    parking: false,
    furnished: false,
    offer: false,
    sort: "created_at",
    order: "desc",
  });
  console.log(sidebardata);
  console.log(listings);
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const typeFromUrl = urlParams.get("type");
    const parkingFromUrl = urlParams.get("parking");
    const furnishedFromUrl = urlParams.get("furnished");
    const offerFromUrl = urlParams.get("offer");
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order");

    if (
      searchTermFromUrl ||
      typeFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      offerFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSidebardata({
        searchTerm: searchTermFromUrl || "",
        type: typeFromUrl || "all",
        parking: parkingFromUrl === "true" ? true : false,
        furnished: furnishedFromUrl === "true" ? true : false,
        offer: offerFromUrl === "true" ? true : false,
        sort: sortFromUrl || "created_at",
        order: orderFromUrl || "desc",
      });
    }

    const fetchListings = async () => {
      setLoading(true);
      setShowMore(false);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/v1/listing?${searchQuery}`);
      const data = await res.json();
      if (data.length > 8) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
      setListings(data);
      setLoading(false);
    };

    fetchListings();
  }, [location.search]);
  const handleChange = (e) => {
    const { id, value, checked } = e.target;
    let updatedData = { ...sidebardata };

    switch (id) {
      case "all":
      case "rent":
      case "sale":
        updatedData = { ...updatedData, type: id };
        break;

      case "searchTerm":
        updatedData = { ...updatedData, searchTerm: value };
        break;

      case "parking":
      case "furnished":
      case "offer":
        updatedData = {
          ...updatedData,
          [id]: checked || checked === "true" ? true : false,
        };
        break;

      case "sort_order":
        const sort = value.split("_")[0] || "created_at";
        const order = value.split("_")[1] || "desc";
        updatedData = { ...updatedData, sort, order };
        break;

      default:
        break;
    }

    setSidebardata(updatedData);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", sidebardata.searchTerm);
    urlParams.set("type", sidebardata.type);
    urlParams.set("parking", sidebardata.parking);
    urlParams.set("furnished", sidebardata.furnished);
    urlParams.set("offer", sidebardata.offer);
    urlParams.set("sort", sidebardata.sort);
    urlParams.set("order", sidebardata.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="left border-b-2 md:border-r-2 md:min-h-screen">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="flex items-center gap-2 p-6 ">
            <label className="whitespace-nowrap">Search keyword</label>
            <input
              className="border rounded-lg p-3 w-full"
              type="text"
              id="searchTerm"
              placeholder="search"
              value={sidebardata.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className="flex gap-2 flex-wrap items-center p-6">
            <label>Type:</label>
            <div className="flex gap-2">
              <input
                onChange={handleChange}
                checked={sidebardata.type === "all"}
                className="w-5"
                type="checkbox"
                id="all"
              />
              <span>Rent & Sale</span>
            </div>
            <div className="flex gap-2">
              <input
                onChange={handleChange}
                checked={sidebardata.type === "rent"}
                className="w-5"
                type="checkbox"
                id="rent"
              />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input
                onChange={handleChange}
                checked={sidebardata.type === "sale"}
                className="w-5"
                type="checkbox"
                id="sale"
              />
              <span> Sale</span>
            </div>
            <div className="flex gap-2">
              <input
                onChange={handleChange}
                checked={sidebardata.offer}
                className="w-5"
                type="checkbox"
                id="offer"
              />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap items-center p-6">
            <label>Amenities:</label>
            <div className="flex gap-2">
              <input
                onChange={handleChange}
                checked={sidebardata.parking}
                className="w-5"
                type="checkbox"
                id="parking"
              />
              <span>Parking</span>
            </div>
            <div className="flex gap-2">
              <input
                onChange={handleChange}
                checked={sidebardata.furnished}
                className="w-5"
                type="checkbox"
                id="furnished"
              />
              <span>Furnished</span>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap items-center p-6">
            <label>Sort:</label>
            <select
              onChange={handleChange}
              defaultValue={"created_at_desc"}
              id="sort_order"
              className="border rounded-lg p-3"
            >
              <option value="regularPrice_desc">Price high to low</option>
              <option value="regularPrice_asc">Price low to hight</option>
              <option value="createdAt_desc">Latest</option>
              <option value="createdAt_asc">Oldest</option>
            </select>
          </div>
          <button className="bg-slate-500 p-3 m-3 text-white hover:opacity-80 active:opacity-50 rounded-2xl">
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
