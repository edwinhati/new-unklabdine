import GreetingCard from "@/components/GreetingCard";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import OverallRatingCard from "@/components/OverallRatingCard";

export default function HomePage() {
  return (
    <>
      <Header label="Home" hasBack={false} />
      <div className="flex flex-col gap-2 h-full w-full bg-[#f0f0f0] pt-16 pb-20 px-2">
        <GreetingCard />
        <OverallRatingCard />
      </div>
      <Navigation />
    </>
  );
}
