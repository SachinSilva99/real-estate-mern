import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

import { useDispatch } from "react-redux";

import { app } from "../Firebase";
import {
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
  deleteUserFailure,
  deleteUserSuccess,
  deleteUserStart,
  signoutUserStart,
  signoutUserFailure,
  signoutUserSuccess,
} from "../redux/user/UserSlice";
import { Link } from "react-router-dom";
import Listing from "../../../api/models/Listing.model";

const Profile = () => {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [fileUploadEr, setFileUploadEr] = useState(false);
  const [filePercentage, setFilePercantage] = useState(0);
  const [formData, setFormData] = useState({});
  const [userListings, setUserListings] = useState([]);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListingsError, setShowListingsError] = useState(false);
  const dispatch = useDispatch();
  console.log(formData);
  const handleUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePercantage(Math.round(progress));
      },
      (error) => {
        setFileUploadEr(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          console.log(downloadUrl);
          setFileUploadEr(false);
          setFormData({ ...formData, avatar: downloadUrl });
        });
      }
    );
  };

  useEffect(() => {
    if (file) {
      handleUpload(file);
    }
  }, [file]);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/v1/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));

      setUpdateSuccess(true);
    } catch (err) {
      dispatch(updateUserFailure(err.message));
    }
  };
  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/v1/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (err) {
      dispatch(deleteUserFailure(err.message));
    }
  };
  const handleSignOut = async () => {
    try {
      dispatch(signoutUserStart());
      const res = await fetch(`/api/v1/auth/signout`);
      const data = await res.json();
      if (data.success === false) {
        dispatch(signoutUserFailure(data.message));
        return;
      }
      dispatch(signoutUserSuccess(data));
    } catch (err) {}
  };
  const handleShowListings = async () => {
    try {
      setShowListingsError(false);
      const res = await fetch(`/api/v1/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowListingsError(true);
        return;
      }
      setUserListings(data);
    } catch (err) {
      setShowListingsError(true);
    }
  };
  const handleLisitngDelete = async (listingId) => {
    try {
      const res = await fetch(`/api/v1/listing/${listingId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.success);
        return;
      }
      setUserListings((listing) => listing._id !== listing);
    } catch (er) {}
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-2xl font-semibold text-center my-6">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          className="hidden"
          type="file"
          accept="image/*"
          ref={fileRef}
        />
        <img
          onClick={() => fileRef.current.click()}
          className="rounded-full object-cover cursor-pointer self-center m-2"
          src={formData.avatar || currentUser.avatar}
          alt="profile"
        />
        <p className="text-sm self-center">
          {fileUploadEr ? (
            <span className="text-red-700">
              Error Image upload (image must be less than 2 mb)
            </span>
          ) : filePercentage > 0 && filePercentage < 100 ? (
            <span className="text-slate-700">{`Uploading ${filePercentage}%`}</span>
          ) : filePercentage === 100 ? (
            <span className="text-green-700">Image successfully uploaded!</span>
          ) : (
            ""
          )}
        </p>
        <input
          type="text"
          placeholder="username"
          id="username"
          className="border p-3 active:outline-none"
          defaultValue={currentUser.username}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="email"
          id="email"
          className="border p-3"
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="password"
          id="password"
          className="border p-3"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="rounded-lg bg-slate-500 text-slate-100 disabled:opacity-80 py-3 hover:bg-slate-400"
        >
          {loading ? "Loading..." : "Update"}
        </button>
        <Link
          className="bg-green-700 py-3 text-slate-100 text-center hover:bg-green-600"
          to="/create-listing"
        >
          Create Listing
        </Link>
      </form>
      <div className="flex justify-between mt-4">
        <span
          onClick={handleDeleteUser}
          className="text-red-700 cursor-pointer"
        >
          Delete Account
        </span>
        <span onClick={handleSignOut} className="text-green-700 cursor-pointer">
          Sign out
        </span>
      </div>
      <p className="text-red-700">{error ? error : ""}</p>
      <p className="text-green-700">
        {updateSuccess ? "User updated successfully!!!" : ""}
      </p>
      <button onClick={handleShowListings} className="text-green-600 w-full">
        Show Listings
      </button>
      <p className="text-red-500 mt-5 cursor-pointer">
        {showListingsError ? "Error showing lisiting" : ""}
      </p>
      {userListings && userListings.length > 0 && (
        <div className="flex gap-4 flex-col">
          <h1 className="text-center my-7 text-3xl ">Your listings</h1>
          {userListings.map((listing) => (
            <div
              key={listing._id}
              className="flex border-4 p-3 rounded-xl justify-between items-center gap-4"
            >
              <Link to={`/listing/${listing._id}`}>
                <img
                  className="h-16 w-20 object-contain rounded-lg"
                  src={listing.imageUrls[0]}
                  alt=""
                />
              </Link>
              <Link
                className="font-semibold hover:underline truncate flex-1"
                to={`/listing/${listing._id}`}
              >
                <p>{listing.name}</p>
              </Link>
              <div className="flex gap-2">
                <button
                  onClick={() => handleLisitngDelete(listing._id)}
                  className="bg bg-red-500 text-white rounded-xl py-3 px-6"
                >
                  delete
                </button>
                <button className="bg bg-yellow-500 text-white rounded-xl py-3 px-6">
                  edit
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;
