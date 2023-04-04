import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import RatingCard from "@/components/RatingCard";
import { today } from "@/config";
import axios from "axios";
import { useState, useEffect } from "react";
import { useUser } from "@/context";

export default function RatingPage() {
  const [breakfast, setBreakfast] = useState(null);
  const [lunch, setLunch] = useState(null);
  const [dinner, setDinner] = useState(null);
  const { responseStatus } = useUser();
  useEffect(() => {
    axios.get("/api/rating/mealtime?value=breakfast").then((res) => {
      setBreakfast(res.data);
    });
    axios.get("/api/rating/mealtime?value=lunch").then((res) => {
      setLunch(res.data);
    });
    axios.get("/api/rating/mealtime?value=dinner").then((res) => {
      setDinner(res.data);
    });
  }, []);
  return (
    <>
      <Header label="Rating" hasBack={false} />
      <div className="flex flex-col gap-2 h-full w-full bg-[#f0f0f0] pt-16 pb-20 px-2">
        <div className="flex flex-col items-center justify-center bg-white rounded border">
          <p className="text-black text-[10px] text-center mt-1 mb-1">
            {today}
          </p>
        </div>
        <RatingCard
          title="Breakfast"
          subtitle=""
          data={breakfast}
          withCta={responseStatus?.breakfast ? false : true}
        />
        <RatingCard
          title="Lunch"
          subtitle=""
          data={lunch}
          withCta={responseStatus?.lunch ? false : true}
        />
        <RatingCard
          title="Dinner"
          subtitle=""
          data={dinner}
          withCta={responseStatus?.dinner ? false : true}
        />
      </div>
      <Navigation />
    </>
  );
}
