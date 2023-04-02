/* eslint-disable react/no-unescaped-entities */
import Google from "../assets/icons/google.svg";
import Image from "next/image";
import { signInWithGoogle } from "@/config";

export default function SignInCard() {
  return (
    <div className="bg-white rounded-xl px-2 pb-4">
      {/* Make "You have not signed in yet" text */}
      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-bold mt-4">Sign In to Continue</h2>
        <p className="text-center text-[10px] mt-3 ml-12 mr-12">
          Click the 'Sign In' button to access all features and content
          available to signed-in users
        </p>
        {/* Google log in button */}
        <div className="mt-4">
          <button
            className="flex justify-center items-center text-black w-[200px] h-[40px] mt-[0px] bg-white text-[12px] font-medium p-0 rounded-[10px] relative hover:w-[220px] transition-all ease-in-out duration-300 border-[1px] border-gray-300"
            type="button"
            onClick={signInWithGoogle}
          >
            <Image src={Google} alt="Google" className="mr-3" />
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
}
