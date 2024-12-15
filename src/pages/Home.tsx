import { useQuery } from "@tanstack/react-query";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import { useContext } from "react";
import { Context } from "../context/Provider";

function Home() {
  const { search, setSearch, bookmark, setBookmarked } = useContext(Context)!;
  const { isLoading, data } = useQuery({
    queryKey: ["omdb", search],
    queryFn: async () => {
      if (search !== "") {
        const response = await fetch(
          `http://www.omdbapi.com/?apikey=8b33cabf&t=${search}&type=movie`
        );
        const data:
          | { Poster: string; Title: string; Released: string }
          | { Error: string; Response: string } = await response.json();
        return data;
      } else {
        return { Poster: "", Title: "", Released: "" };
      }
    },
  });

  return (
    <div className="flex justify-center flex-col">
      <Header />
      <Navbar />
      <div className="flex justify-center mb-4">
        <input
          type="search"
          name="search"
          role="search"
          aria-placeholder="Search for movie..."
          placeholder="Search for movie..."
          aria-label="Movie Search Input"
          value={search}
          onChange={(e) => {
            setSearch?.(e.target.value);
          }}
          className="border border-black w-[300px] h-10 rounded-md outline-none p-2"
        />
      </div>
      {isLoading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="flex flex-col justify-center items-center">
          {typeof data !== "undefined" ? (
            "Poster" in data ? (
              <>
                <img
                  src={data.Poster}
                  alt={`Film poster of ${data.Title}`}
                  className="mb-2"
                />
                <div className="flex gap-2">
                  <p className="text-blue-700 font-bold">Movie Title: </p>
                  <p>{data.Title}</p>
                </div>
                <div className="flex gap-2">
                  <p className="text-blue-700 font-bold">Year of Release: </p>
                  <p>{data.Released}</p>
                </div>
                <div>
                  {typeof bookmark !== "undefined" &&
                  bookmark?.filter((e) => {
                    if (e.title === data.Title) {
                      return e;
                    }
                  }).length < 1 ? (
                    <button
                      role="button"
                      aria-label={`Bookmark ${data.Title}`}
                      onClick={() => {
                        let bookmarkMaker: string = "";
                        if (localStorage.getItem("bookmark") === null) {
                          bookmarkMaker = JSON.stringify([
                            {
                              title: data.Title,
                              poster: data.Poster,
                              released: data.Released,
                            },
                          ]);
                          localStorage.setItem("bookmark", bookmarkMaker);
                          setBookmarked(bookmarkMaker);
                        } else {
                          const localBookmark: {
                            poster: string;
                            title: string;
                            released: string;
                          }[] = JSON.parse(localStorage.getItem("bookmark")!);
                          localBookmark.push({
                            title: data.Title,
                            poster: data.Poster,
                            released: data.Released,
                          });
                          bookmarkMaker = JSON.stringify(localBookmark);
                          localStorage.setItem("bookmark", bookmarkMaker);
                          setBookmarked(bookmarkMaker);
                        }
                      }}
                      className="border bg-blue-700 text-white p-1 rounded-xl px-3 text-sm mt-4"
                    >
                      Bookmark
                    </button>
                  ) : undefined}
                  {bookmark
                    ?.filter((e) => {
                      if (e.title === data.Title) {
                        return e;
                      }
                    })
                    .map(() => {
                      return (
                        <button
                          role="button"
                          key={data.Title}
                          aria-label={`Unbookmark ${data.Title}`}
                          onClick={() => {
                            let bookmarkMaker: string = "";
                            const localBookmark: {
                              poster: string;
                              title: string;
                              released: string;
                            }[] = JSON.parse(localStorage.getItem("bookmark")!);
                            const filteredBookmark = localBookmark.filter(
                              (e) => {
                                if (e.title !== data.Title) {
                                  return e;
                                }
                              }
                            );
                            bookmarkMaker = JSON.stringify(filteredBookmark);
                            localStorage.setItem("bookmark", bookmarkMaker);
                            setBookmarked(bookmarkMaker);
                          }}
                          className="border border-blue-700 text-black p-1 rounded-xl px-3 text-sm mt-4"
                        >
                          Unbookmark
                        </button>
                      );
                    })}
                </div>
              </>
            ) : (
              <>
                <p>{data.Error}</p>
              </>
            )
          ) : undefined}
        </div>
      )}
    </div>
  );
}

export default Home;
