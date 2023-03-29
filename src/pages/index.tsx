import GreetingCard from "@/components/GreetingCard";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import RatingCard from "@/components/RatingCard";
import RatingCta from "@/components/RatingCta";
import RatingPost from "@/components/RatingPost";
import SignInCard from "@/components/SignInCard";
import { useState } from "react";

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  setTimeout(() => {
    setLoading(false);
  }, 2000);

  return (
    <>
      <Header label="Home" hasBack={false} />
      <div className="flex flex-col gap-2 h-full w-full bg-[#f0f0f0] pt-16 pb-20 px-2">
        <GreetingCard />
        <RatingCard title="Weekly" subtitle="Overall Rating" details={true} />
        <SignInCard />
        <RatingCta />
        {loading ? (
          <div className="flex justify-center items-start h-full">
            <i className="fa-solid fa-spinner text-3xl text-udine-1 animate-spin" />
          </div>
        ) : (
          <>
            <RatingPost hasImage={false} name="Edwin" comment="Testing" />
            <RatingPost hasImage={true} name="Edwin" comment="Testing 2" />
          </>
        )}
      </div>
      <Navigation />
    </>
  );
}
