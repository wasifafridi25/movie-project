import { baseUrl } from "@/constants/movie";
import { Movie } from "@/typings";
import { InformationCircleIcon } from "@heroicons/react/solid";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { FaPlay } from 'react-icons/fa'

interface Props {
  netflixOriginals: Movie[];
}

export default function Banner({ netflixOriginals }: Props) {
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    setMovie(
      netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)]
    );
  }, [netflixOriginals]);

  return (
    <div className="flex flex-col pt-60 space-y-2 md:space-y-4 lg:h-[65vh] justify-end">
      <div className="absolute top-0 left-0 h-[95vh] w-full -z-10">
        <Image
          alt="Banner cover"
          src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`}
          layout="fill"
          // when use layout="fill" need to give parent relative or absolute
          objectFit="cover"
        />
      </div>
      <h1 className="text-2xl lg:text-7xl md:text-4xl font-bold">
        {movie?.title || movie?.name || movie?.original_name}
      </h1>
      <p className="max-w-xs text-xs md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl">
        {movie?.overview}
      </p>
      <div className="flex items-center space-x-3">
        <button className="bannerButton bg-white text-black"><FaPlay className="h-4 w-4 text-black md:h-7 md:w-7"/> Play</button>
        <button className="bannerButton bg-[gray]/70"><InformationCircleIcon className="h-5 w-5 md:h-8 md:h-8"/> More Info</button>
      </div>
    </div>
  );
}
