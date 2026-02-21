"use client";
import { FiLogOut } from "react-icons/fi";
import { useRouter } from "next/navigation";

export default function AdminNavbar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    router.push("/admin/login");
  };

  return (
    <header className="w-full h-16 bg-white border-b flex items-center justify-between px-6">
      <h1 className="text-xl font-semibold text-gray-800">
        Admin Dashboard
      </h1>

      <button
        onClick={handleLogout}
        className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700"
      >
        <FiLogOut />
        Logout
      </button>
    </header>
  );
}
