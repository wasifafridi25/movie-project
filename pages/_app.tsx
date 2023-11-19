import "@/styles/globals.css";
import type { AppProps } from "next/app";
//default export don't need curly braces
import useAuth from "../hooks/useAuth";

export default function App({ Component, pageProps }: AppProps) {
  //if have arrow function can use directly but this function is returning something so need to store in variable 
  const AuthProvider = useAuth;
  return (
    
    //HOC - Higher order component
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
