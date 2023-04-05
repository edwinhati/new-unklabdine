import RatingForm from "@/components/RatingForm";
import { useUser } from "@/context";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Rate() {
  const { mealtime } = useUser();
  const [timeRemaining, setTimeRemaining] = useState(5);

  useEffect(() => {
    if (timeRemaining === 0) {
      window.location.href = "/";
    } else {
      const timer = setTimeout(() => {
        setTimeRemaining(timeRemaining - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [timeRemaining]);

  return (
    <>
      {mealtime === null ? (
        <div className="text-center">
          <h1 className="text-2xl font-bold mt-4">
            You are not allowed to access this page.
          </h1>
          <p className="text-sm mt-2">
            returning to <Link href="/">home</Link> in {timeRemaining} seconds
          </p>
        </div>
      ) : (
        <RatingForm mealtime={mealtime} />
      )}
    </>
  );
}
