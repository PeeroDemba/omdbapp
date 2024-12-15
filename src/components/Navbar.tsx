import { NavLink } from "react-router";

function Navbar() {
  return (
    <div className="gap-8 flex justify-center items-center mb-8">
      <NavLink
        to="/"
        className={({ isActive }) => {
          return isActive
            ? "text-blue-600 font-bold underline underline-offset-8"
            : "text-black";
        }}
      >
        Movies
      </NavLink>
      <NavLink
        to="/bookmarks"
        className={({ isActive }) => {
          return isActive
            ? "text-blue-600 font-bold underline underline-offset-8"
            : "text-black";
        }}
      >
        Bookmarks
      </NavLink>
    </div>
  );
}

export default Navbar;
