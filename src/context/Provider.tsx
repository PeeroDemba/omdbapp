import React, { createContext, useState } from "react";

export const Context = createContext<{
  bookmark?: { poster?: string; title?: string; released?: string }[];
  search: string;
  bookmarked: string;
  setBookmarked: (v: string) => void;
  setSearch?: (v: string) => void;
} | null>(null);

function Provider({ children }: { children: React.ReactNode }) {
  const [search, setSearch] = useState("");
  const [bookmarked, setBookmarked] = useState("");
  const bookmark = JSON.parse(localStorage.getItem("bookmark")!);

  return (
    <Context.Provider
      value={{ search, setSearch, bookmark, bookmarked, setBookmarked }}
    >
      {children}
    </Context.Provider>
  );
}

export default Provider;
