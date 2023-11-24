import { modalState, movieState } from "@/atom/modalAtom";
import { Movie } from "@/typings";
import Image from "next/image";
import React from "react";
import { useRecoilState } from "recoil";

interface Props {
  //when using firebase
  // movie: Movie | DocumentData
  movie: Movie;
}

export default function Thumbnail({ movie }: Props) {
  const [modal, setModal] = useRecoilState(modalState);
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState);
  return (
    <div
      className="relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out md:min-w-[260px]
    md:h-36 md:hover:scale-105"
      onClick={() => {
        setModal(true);
        setCurrentMovie(movie);
      }}
    >
      <Image
        src={`https://image.tmdb.org/t/p/w500${
          movie.backdrop_path || movie.poster_path
        }`}
        className="rounded-sm object-cover md:rounded"
        layout="fill"
        alt="Thumbnail"
      />
    </div>
  );
}
