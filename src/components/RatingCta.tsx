import { useState } from "react";
import Link from "next/link";

export default function RatingCta() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  return (
    <div className={`bg-white rounded-xl px-2 py-5 ${isOpen ? "hidden" : ""}`}>
      <div className="text-center">
        <h2 className="font-bold text-[16px]">How about the food?</h2>
      </div>
      <div className="flex gap-3 justify-center items-center px-6 mt-3">
        <button
          type="button"
          className="border-2 border-black text-black rounded-full px-4 py-2 font-semibold text-[11px] w-full"
          onClick={handleOpen}
        >
          Later
        </button>

        <Link
          href="#"
          className="bg-udine-5 text-white text-center rounded-full px-4 py-2 font-semibold text-[11px] w-full"
        >
          Rate now
        </Link>
      </div>
    </div>
  );
}
