import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import RatingCard from "@/components/RatingCard";

export default function RatingPage() {
  return (
    <>
      <Header label="Rating" hasBack={false} />
      <div className="flex flex-col gap-2 h-full w-full bg-[#f0f0f0] pt-16 pb-20 px-2">
        <div className="flex flex-col items-center justify-center bg-white rounded border">
          <p className="text-black text-[10px] text-center mt-1 mb-1">today</p>
        </div>
        <RatingCard title="Breakfast" subtitle="" value={5} />
        <RatingCard title="Lunch" subtitle="" value={5} />
        <RatingCard title="Dinner" subtitle="" value={5} />
        <div className="flex justify-center items-center w-full bg-white rounded pb-3">
          <span className="text-[12px] mt-3">
            {/* {length > 1
              ? `based on ${length} student ratings`
              : `based on ${length} student rating`} */}
            based on 1 student rating
          </span>
        </div>
      </div>
      <Navigation />
    </>
  );
}
