import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useState } from "react";
import { app } from "../Firebase";

const CreateListing = () => {
  const [files, setFiles] = useState({});
  const [imageUploadError, setImageUploadError] = useState(false);
  const [formData, setFormData] = useState({
    imageUrls: [],
  });
  const [uploading, setUploading] = useState(false);
  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_change",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(progress);
        },
        (err) => {
          reject(err);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };
  const handleImageSubmit = (e) => {
    e.preventDefault();
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      const promies = [];
      for (let i = 0; i < files.length; i++) {
        setUploading(true);
        setImageUploadError(false);
        promies.push(storeImage(files[i]));
      }
      Promise.all(promies)
        .then((url) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(url),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setUploading(false);
          setImageUploadError("Image upload failed, 10mb max per image");
        });
    } else {
      setUploading(false);

      setImageUploadError("You can only upload 6 images");
    }
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((url, i) => i !== index),
    });
  };

  return (
    <main className="p-3 max-w-6xl mx-auto">
      <h1 className="text-3xl my-7 text-center">Create a Listing</h1>
      <form className="flex  sm:flex-row flex-col">
        <div className="left flex flex-col gap-4 flex-1 p-3">
          <input
            className="bg-slate-50 focus:outline-none p-3"
            type="text"
            id="name"
            placeholder="name"
            maxLength="62"
            minLength="5"
            required
          />
          <textarea
            className="bg-slate-50 focus:outline-none p-3"
            type="text"
            id="description"
            placeholder="description"
            required
          />
          <input
            className="bg-slate-50 focus:outline-none p-3"
            type="text"
            id="address"
            placeholder="address"
            required
          />
          <input
            className="bg-slate-50 focus:outline-none p-3"
            type="text"
            id="ownerContact"
            placeholder="owner contact"
            required
          />
          <div className="tick-sections flex gap-4 md:gap-8 justify-between flex-wrap">
            <div className="flex gap-2">
              <input type="checkbox" id="sale" className="w-5" />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="rent" className="w-5" />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="parking spot" className="w-5" />
              <span>Parking spot</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="furnished" className="w-5" />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="offer" className="w-5" />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex  gap-8 flex-wrap">
            <div className="flex items-center gap-2">
              <input
                className="w-24 rounded-lg p-3 border bg-slate-50 focus:outline-none border-none"
                type="number"
                id="bedrooms"
                min="1"
                required
              />
              <p>Beds</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                className="w-24 rounded-lg p-3 border bg-slate-50 focus:outline-none border-none"
                type="number"
                id="bathrooms"
                min="1"
                required
              />
              <p>Baths</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                className="w-24 rounded-lg p-3 border bg-slate-50 focus:outline-none border-none"
                type="number"
                id="regularPrice"
                min="1"
                required
              />
              <p>Regular Price </p>
              <span className="text-xs">$ / month</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                className="w-24 rounded-lg p-3 border bg-slate-50 focus:outline-none border-none"
                type="number"
                id=""
                min="1"
                required
              />
              <p>Baths</p>
            </div>
          </div>
        </div>
        <div className="right flex flex-col gap-4 p-3">
          <p className="font-semibold">
            Images{" "}
            <span className="font-normal text-slate-500">
              The first image will be the cover, max 6 images
            </span>
          </p>
          <div className="flex gap-4 flex-col">
            <input
              onChange={(e) => setFiles(e.target.files)}
              id="images"
              type="file"
              accept="image/*"
              multiple
            />
            <button
              disabled={uploading}
              onClick={handleImageSubmit}
              className="hover:shadow-lg bg-blue-500 py-3 px-10 text-white w-full"
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>
            <p className="text-red-500">
              {imageUploadError && imageUploadError}
            </p>
            {formData.imageUrls.length > 0 &&
              formData.imageUrls.map((url, index) => (
                <div
                  className="flex justify-between gap-4 items-center"
                  key={url}
                >
                  <img
                    src={url}
                    alt="listing image"
                    className="w-48 h-40 object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="rounded-2xl px-6 h-10 self-center text-white bg-red-500"
                  >
                    Delete
                  </button>
                </div>
              ))}
          </div>
          <button className="p-3 bg-slate-600 text-white">
            Create Listing
          </button>
        </div>
      </form>
    </main>
  );
};

export default CreateListing;
