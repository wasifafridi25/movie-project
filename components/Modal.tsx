import { modalState, movieState } from "@/atom/modalAtom";
import { PlusIcon, ThumbUpIcon, VolumeOffIcon, VolumeUpIcon, XIcon } from "@heroicons/react/solid";
import MuiModal from "@mui/material/Modal";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { useState } from "react";
import { Element, Genre } from "@/typings";
import ReactPlayer from "react-player/lazy";
import { FaPlay } from "react-icons/fa";

export default function Modal() {
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [movie, setMovie] = useRecoilState(movieState);
  const [trailer, setTrailer] = useState("");
  const [genre, setGenre] = useState<Genre[]>([]);
  const [muted, setMuted] = useState(false)

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
    <MuiModal open={showModal} onClose={handleClose} className="fixed !top-7 left-0 right-0 z-50 mx-auto max-w-5xl
    w-full overflow-hidden overflow-y-scroll scrollbar-hide rounded-md">
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
          <div className="absolute bottom-10 px-8 flex items-center justify-between w-full">
            <div className="flex space-x-2">
              <button className="flex items-center gap-x-2 rounded bg-white
              text-xl px-8 text-black font-bold transition hover:bg-[#e6e6e6]">
                <FaPlay className="h-7 w-7 text-black"/>
                Play
              </button>

              <button className="modalButton">
                <PlusIcon className="h-7 w-7"/>
              </button>
              <button className="modalButton">
                <ThumbUpIcon className="h-7 w-7"/>
              </button>
            </div>
            <button onClick={() => setMuted(!muted)} className="modalButton">
              {muted ? <VolumeOffIcon className="h-6 w-6" /> : <VolumeUpIcon  className="h-6 w-6"/>}
            </button>
          </div>
        </div>

        <div>
          <div>
            <div className="flex items-center space-x-2 text-sm">
              <p className="text-green-400 font-semibold">{movie?.vote_average * 10}% Match</p>
              <p className="font-light">{movie?.release_date || movie?.first_air_date}</p>
              <div className="flex items-center justify-center rounded border border-white/40 px-1.5 text-xs">
                HD
              </div>
            </div>
          </div>
        </div>
      </>
    </MuiModal>
  );
}
