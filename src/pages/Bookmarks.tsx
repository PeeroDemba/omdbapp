import { useContext } from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import { Context } from "../context/Provider";

function Bookmarks() {
  const visibleBookmark: {
    poster?: string;
    title?: string;
    released?: string;
  }[] = JSON.parse(localStorage.getItem("bookmark")!);
  const { setBookmarked } = useContext(Context)!;

  return (
    <div>
      <Header />
      <Navbar />
      <div className="grid grid-cols-[repeat(auto-fill,300px)] justify-center sm:justify-evenly gap-x-2 gap-y-4">
        {visibleBookmark.length > 0 ? (
          visibleBookmark.map((e) => (
            <div className="flex flex-col items-center" key={e.title}>
              <img
                src={e.poster}
                alt={`Film poster of ${e.title}`}
                className="mb-2"
              />
              <div className="flex gap-2">
                <p className="text-blue-700 font-bold">Movie Title: </p>
                <p>{e.title}</p>
              </div>
              <div className="flex gap-2">
                <p className="text-blue-700 font-bold">Year of Release: </p>
                <p>{e.released}</p>
              </div>
              <button
                role="button"
                aria-label={`Unbookmark ${e.title}`}
                onClick={() => {
                  let bookmarkMaker: string = "";
                  const localBookmark: {
                    poster: string;
                    title: string;
                    released: string;
                  }[] = JSON.parse(localStorage.getItem("bookmark")!);
                  const filteredBookmark = localBookmark.filter((ele) => {
                    if (ele.title !== e.title) {
                      return ele;
                    }
                  });
                  bookmarkMaker = JSON.stringify(filteredBookmark);
                  localStorage.setItem("bookmark", bookmarkMaker);
                  setBookmarked(bookmarkMaker);
                }}
                className="border border-blue-700 text-black p-1 rounded-xl px-3 text-sm mt-4"
              >
                Unbookmark
              </button>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full">No Bookmarks</p>
        )}
      </div>
    </div>
  );
}

export default Bookmarks;
