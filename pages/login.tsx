import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface Inputs {
  email: string;
  password: string;
}

export default function login() {
  const [login, setLogin] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    if (login) {
      // await signIn(email, password)
    } else {
      // await signUp(email, password)
    }
  };

  return (
    <div className="relative h-screen w-full flex flex-col bg-black md:items-center md:justify-center md:bg-transparent">
      <Head>
        <title>Netflix</title>
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

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative bg-black/75 mt-24 py-10 px-6 rounded space-y-8 md:mt-0 md:px-14
      md:max-w-md"
      >
        <h1 className="text-4xl font-semibold">Sign In</h1>
        <div className="flex flex-col space-y-4">
          <label className="inline-block w-full">
            <input
              type="email"
              placeholder="Email"
              className="input"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <p className="p-1 text-[13px] font-light text-orange-500">
                Please enter a valid email.
              </p>
            )}
          </label>
          <label className="inline-block w-full">
            <input
              type="password"
              placeholder="Password"
              className="input"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <p className="p-1 text-[13px] font-light text-orange-500">
                Your password must contain between 4 and 60 characters.
              </p>
            )}
          </label>
        </div>
        <button
          onClick={() => setLogin(true)}
          type="submit"
          className="w-full rounded bg-[#e50914] py-3 font-semibold"
        >
          Sign In
        </button>
        <div className="text-[gray]">
          New to Netflix?{" "}
          <button
            onClick={() => setLogin(false)}
            type="submit"
            className="text-white hover:underline"
          >
            Sign up now
          </button>
        </div>
      </form>
    </div>
  );
}
