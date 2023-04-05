import { useState, useEffect } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import Rating from "./Rating";
import { useUser } from "@/context";
import { useRouter } from "next/router";
import { mealtime } from "@/config";

export default function RatingCard({
  title,
  subtitle,
  value,
  data,
  withCta,
}: any) {
  const [loading, setLoading] = useState(!(data || value));
  const [ignore, setIgnore] = useState(false);
  const { setMealtime } = useUser();
  const router = useRouter();
  useEffect(() => {
    if (data || value) setLoading(false);
  }, [data, value]);
  const averageRating = data ? data.average : value;

  const renderRatingInfo = () => {
    if (!data) return null;
    const ratingCountText =
      data.length > 1
        ? `based on ${data.length} student ratings`
        : `based on ${data.length} student rating`;
    return <span className="text-[9px] mt-1">{ratingCountText}</span>;
  };

  const clickHandler = async () => {
    await setMealtime(title === "Weekly" ? mealtime : title);
    router.push("/rate");
  };
  return (
    <div className="bg-white rounded-xl px-2 pb-4">
      <div className="text-center mt-4">
        <h2 className="font-semibold text-[13px] leading-[0px]">{title}</h2>
        {subtitle ? (
          <span className="text-[11px] leading-[0px]">{subtitle}</span>
        ) : (
          <br />
        )}
      </div>
      <div className="flex gap-2">
        <div className="flex-1 flex flex-col justify-center items-center">
          <span className="text-[60px] font-bold leading-none">
            {loading ? (
              <i className="fa-solid fa-spinner text-3xl text-udine-1 animate-spin mb-3" />
            ) : (
              averageRating
            )}
          </span>
          <Rating value={averageRating} setRating="readonly" />
          {renderRatingInfo()}
        </div>
        <div className="flex-1 flex flex-col justify-center w-full mr-[10px]">
          {[5, 4, 3, 2, 1].map((ratingValue) => (
            <div
              key={ratingValue}
              className="flex justify-center items-center w-full"
            >
              <span className="text-[11px] font-medium mr-2">
                {ratingValue}
              </span>
              <div className="w-full">
                <ProgressBar
                  completed={
                    data
                      ? ((data.food[ratingValue] +
                          data.service[ratingValue] +
                          data.environment[ratingValue]) /
                          data.length) *
                        100
                      : 0
                  }
                  bgColor="#FF9345"
                  height="5px"
                  isLabelVisible={false}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      {!ignore && withCta ? (
        <div className="flex justify-center mt-4">
          <button
            type="button"
            className="bg-white text-udine-5 rounded-full w-[150px] h-[35px] text-[11px] font-semibold border-2 border-udine-5"
            onClick={() => setIgnore(!ignore)}
          >
            Later
          </button>
          <button
            type="button"
            className="bg-udine-5 text-white rounded-full w-[200px] h-[35px] text-[11px] font-semibold ml-4 hover:w-[220px] transition-all ease-in-out duration-300"
            onClick={clickHandler}
          >
            Rate Now
          </button>
        </div>
      ) : null}
    </div>
  );
}
