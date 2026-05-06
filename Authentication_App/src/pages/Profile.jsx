import { useEffect, useState } from "react";
import LogoutButton from "../components/Logout";

function Profile() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

  const url = "https://api.freeapi.app/api/v1/users/current-user";

  const accessToken = localStorage.getItem("AccessToken");
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  useEffect(() => {
    async function getUser() {
      try {
        setLoading(true);
        const res = await fetch(url, options);
        const data = await res.json();

        console.log(data);
        if (!res.ok) {
          throw data.message || "Something went wrong";
        }
        setUser(data.data);
      } catch (error) {
        console.error(error);
        alert("Network error");
      } finally {
        setLoading(false);
      }
    }

    getUser();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-white text-sm">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white flex justify-center items-center p-6">
      <div className="w-full max-w-3xl bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl p-6">
        {/* Header */}
        <div className="flex items-center gap-6">
          <img
            src={user?.avatar?.url}
            alt="avatar"
            className="w-24 h-24 rounded-full border-2 border-blue-400 shadow-md"
          />

          <div>
            <h2 className="text-2xl font-semibold">{user.username}</h2>
            <p className="text-gray-400">{user.email}</p>

            <span className="inline-block mt-2 px-3 py-1 text-xs rounded-full bg-blue-500/20 text-blue-400 border border-blue-400/30">
              {user.role}
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="my-6 border-t border-white/20"></div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="bg-white/5 p-4 rounded-xl border border-white/10">
            <p className="text-gray-400">User ID</p>
            <p className="mt-1 break-all">{user._id}</p>
          </div>

          <div className="bg-white/5 p-4 rounded-xl border border-white/10">
            <p className="text-gray-400">Login Type</p>
            <p className="mt-1">{user.loginType}</p>
          </div>

          <div className="bg-white/5 p-4 rounded-xl border border-white/10">
            <p className="text-gray-400">Email Verified</p>
            <p
              className={`mt-1 ${
                user.isEmailVerified ? "text-green-400" : "text-red-400"
              }`}
            >
              {user.isEmailVerified ? "Verified ✅" : "Not Verified ❌"}
            </p>
          </div>

          <div className="bg-white/5 p-4 rounded-xl border border-white/10">
            <p className="text-gray-400">Account Created</p>
            <p className="mt-1">{new Date(user.createdAt).toLocaleString()}</p>
          </div>

          <div className="bg-white/5 p-4 rounded-xl border border-white/10">
            <p className="text-gray-400">Last Updated</p>
            <p className="mt-1">{new Date(user.updatedAt).toLocaleString()}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex justify-end gap-3">
          <button className="px-4 py-2 rounded-lg bg-yellow-500 hover:bg-yellow-600 transition text-black font-medium">
            Edit Profile
          </button>

          <LogoutButton />
        </div>
      </div>
    </div>
  );
}

export default Profile;
