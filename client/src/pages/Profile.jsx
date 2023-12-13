import { useSelector } from "react-redux";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-2xl font-semibold text-center my-6">Profile</h1>
      <form className="flex flex-col gap-4 ">
        <img
          className="rounded-full object-cover cursor-pointer self-center m-2"
          src={currentUser.avatar}
          alt="profile"
        />
        <input
          type="text"
          placeholder="username"
          id="username"
          className="border p-3 active:outline-none"
        />
        <input
          type="text"
          placeholder="email"
          id="email"
          className="border p-3"
        />
        <input
          type="text"
          placeholder="password"
          id="email"
          className="border p-3"
        />
        <button className="bg-slate-500 text-white disabled:opacity-80 py-3 hover:bg-slate-400">
          Update
        </button>
      </form>
      <div className="flex justify-between mt-4">
        <span className="text-red-700">Delete Account</span>
        <span className="text-green-700">Sign out</span>
      </div>
    </div>
  );
};

export default Profile;
