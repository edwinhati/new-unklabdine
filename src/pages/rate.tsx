import { useUser } from "@/context";
import Link from "next/link";
import { useState, useEffect } from "react";
import RatingForm from "@/components/RatingForm";

export default function Rate() {
  const { mealtime } = useUser();
  const [timeRemaining, setTimeRemaining] = useState(5);

  useEffect(() => {
    if (mealtime === null && timeRemaining > 0) {
      const timer = setTimeout(() => {
        setTimeRemaining(timeRemaining - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [mealtime, timeRemaining]);

  if (mealtime === null) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold mt-4">
          You are not allowed to access this page.
        </h1>
        <p className="text-sm mt-2">
          Returning to <Link href="/">home</Link> in {timeRemaining} seconds.
        </p>
      </div>
    );
  }

  return <RatingForm mealtime={mealtime} />;
}
