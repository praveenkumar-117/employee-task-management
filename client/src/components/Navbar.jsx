

import { useAuthentication } from "../store/auth";
import { useNavigate } from "react-router-dom";

export default function Navbar() {

  const { user, isLoading, LogoutUser } = useAuthentication();
  const navigate = useNavigate();

  const handleLogout = () => {
    LogoutUser();
    navigate("/")
  }

  if (isLoading) {
    return <h1 className="text-white">Loading...</h1>
  }

  const title = user.isAdmin ? "Admin Dashboard" : "Employee Dashboard";
  const username = user.name;

  return (
    <>
      <header className="flex items-center justify-between p-4 rounded-md shadow-md bg-zinc-800">

        <h1 className="text-2xl font-semibold text-white">
          {title}
        </h1>

        <div className="flex items-center space-x-4">

          <span className="font-medium text-gray-300">
            <span className="text-3xl">👋</span>{username}
          </span>

          <button
            className="bg-red-500 rounded-md px-2 py-1"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>
      </header>
    </>
  )
}