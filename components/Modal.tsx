import { modalState, movieState } from "@/atom/modalAtom";
import { XIcon } from "@heroicons/react/solid";
import MuiModal from "@mui/material/Modal";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { useState } from "react";
import { Element, Genre } from "@/typings";
import ReactPlayer from "react-player/lazy";

export default function Modal() {
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [movie, setMovie] = useRecoilState(movieState);
  const [trailer, setTrailer] = useState("");
  const [genre, setGenre] = useState<Genre[]>([]);

  useEffect(() => {
    if (!movie) return;

    async function fetchMovie() {
      const data = await fetch(
        `https://api.themoviedb.org/3/${
          movie?.media_type === "tv" ? "tv" : "movie"
        }/${movie?.id}?api_key=${
          process.env.NEXT_PUBLIC_API_KEY
        }&language=en-US&append_to_response=videos`
      ).then((response) => response.json());

      if (data?.videos) {
        const index = data.videos.results.findIndex(
          (element: Element) => element.type === "Trailer"
        );
        setTrailer(data.videos?.results[index]?.key);
      }
      console.log(`https://www.youtube.com/watch?v=${trailer}`)

      if (data?.genres) {
        setGenre(data.genres);
      }
    }

    fetchMovie();
  }, [movie]);

  const handleClose = () => {
    setShowModal(false);
  };
  return (
    <MuiModal open={showModal} onClose={handleClose}>
      <>
        <button
          onClick={handleClose}
          className="modalButton absolute right-5 top-5 !z-40 h-9 w-9 bg-[#181818]
        hover:bg-[#181818] border-none"
        >
          <XIcon className="h-6 w-6" />
        </button>

        <div className="relative pt-[56.25%]">
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${trailer}`}
            width="100%"
            height="100%"
            style={{ position: "absolute", top: "0", left: "0" }}
            playing
            muted={true}
          />
        </div>
      </>
    </MuiModal>
  );
}
