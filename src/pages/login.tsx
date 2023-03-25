import Image from "next/image";
import udine from "../assets/icons/udine.svg";
import Google from "../assets/icons/google.svg";

export default function LoginPage() {
  return (
    <div className="py-20 px-4">
      <div>
        <Image src={udine} alt="" />
      </div>
      <div className="mt-14 flex">
        <h1 className="flex justify-center items-center text-2xl font-bold">
          Rate
          <Image src={udine} alt="" className="w-4 ml-1" />r Experience
        </h1>
      </div>
      <span className="text-6xl font-black">Now!</span>
      <p className="text-[11px]">
        {/* Please login with your <span className="underline">Student Google account </span>
        before proceeding */}
        To continue, just log in with your{" "}
        <span className="underline">student Google account</span>
      </p>
      <div>
        <div className="flex justify-center items-center mt-20">
          <button
            type="button"
            className="flex justify-center items-center border-2 py-2 w-full rounded-lg text-sm hover:bg-slate-100 bg-white"
          >
            <Image src={Google} alt="Google" className="mr-3" />
            Log in with Unklab Google Account
          </button>
        </div>
      </div>
    </div>
  );
}
