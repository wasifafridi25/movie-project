import Head from "next/head";
import Image from "next/image";

export default function login() {
  return (
    <div className="relative h-screen w-full flex flex-col bg-black md:items-center md:justify-center md:bg-transparent">
      <Head>
        <title>Home - Netflix</title>
      </Head>
      <Image
        alt="netflix banner"
        src="https://rb.gy/p2hphi"
        layout="fill"
        className="-z-10 !hidden opacity-60 sm:!inline"
        objectFit="cover"
      />
    </div>
  );
}
