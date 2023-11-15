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
      <img
        src="https://rb.gy/ulxxee"
        width={150}
        height={150}
        className="absolute top-4 left-4 cursor-pointer object-contain md:left-10 md:top-6"
      />

      <form action="" className="relative bg-black/75 mt-24 py-10 px-6 rounded space-y-8 md:mt-0 md:px-14
      md:max-w-md">
        <h1 className="text-4xl font-semibold">Sign In</h1>
        <div className="flex flex-col space-y-4">
          <label className="inline-block w-full">
            <input type="email" placeholder="Email" className="input"/>
          </label>
          <label className="inline-block w-full">
            <input type="password" placeholder="Password" className="input"/>
          </label>
        </div>
        <button type="submit" className="w-full rounded bg-[#e50914] py-3 font-semibold">
          Sign In
        </button>
        <div>
          New to Netflix?
          <button type="submit" className="hover:underline">Sign up now</button>
        </div>
      </form>
    </div>
  );
}
