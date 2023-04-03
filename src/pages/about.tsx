import Header from "@/components/Header";
import { motion } from "framer-motion";
import aboutimg from "@/assets/images/about.png";
import lumen from "@/assets/icons/lumen.svg";
import Image from "next/image";

export default function AboutPage() {
  return (
    <>
      <Header label="About Us" hasBack={true} />
      <motion.div className="transition-all flex flex-col gap-2 h-full w-full bg-[#f0f0f0] pt-10 pb-20">
        <div className="flex flex-row justify-center items-center">
          <Image src={aboutimg} alt={""} width={500} height={500} />
        </div>
        <div className="flex flex-col gap-2 px-4">
          <h1 className="text-[#2D2D2D] text-[40px] leading-none font-bold mb-2">
            What is Unklab Dine?
          </h1>
          <p
            className="text-[#2D2D2D] 
          text-[18px] font-small mb-12 text-justify"
          >
            &emsp;Unklab Dine or Udine, created for a Unklab cafeteria, aims to
            provide a convenient and user-friendly experience for students and
            staff. Udine allows users to check in to the cafeteria and view the
            schedule of meals. In addition, Udine provides a platform for users
            to provide feedback on their experiences, including reviews on the
            quality of the food, the level of service, and the overall
            environment of the cafeteria. This feature will help the cafeteria
            management to understand the needs and preferences of their
            customers and make necessary improvements.
            <br />
            <br /> &emsp; Unklab Dine was originally developed as a project in
            Software Engineering class during the summer semester of 2022. The
            project was led by a team of students including Edwin Hati, Owen
            Ombuh, Griffin Mumu, Pricilia Rumengan, Privan Nabut, Steffano
            Rondonuwu, Radix, under the guidance of lecturer Mr. Stenly Pungus.
            The first version of the app was successfully completed and
            presented in class.
            <br />
            <br /> &emsp; After the successful completion of the class project,
            We decided to further develop and refine Udine with the goal of
            making it available for wider use. We worked on adding new features
            and improving the overall user experience. We has now completed the
            development of Unklab Dine and is planning to release it for use by
            the students and staff of the campus community. Udine is expected to
            make the cafeteria experience more convenient and enjoyable for
            users. The team hopes that the app will be well received and that it
            will help the cafeteria management to better serve the needs of
            Unklab students.
          </p>
        </div>
        <div className="flex flex-col gap-2 px-4 mb-12">
          <h1 className="text-[#2D2D2D] text-[40px] leading-none font-bold mb-2">
            Our Team
          </h1>
          <Image src={lumen} alt="" className="w-60 mx-auto my-3" />
          <Image
            src="https://raw.githubusercontent.com/scientiadev/.github/main/profile/1stgroupphoto.jpg"
            alt=""
            className="rounded-xl w-full"
            width={500}
            height={500}
          />
          <br />
          <p
            className="text-[#2D2D2D] 
          text-[18px] font-small mb-12 text-justify"
          >
            &emsp;Lumen Development Team, established in August 2022, aims to
            foster a dynamic technology ecosystem on campus and beyond, by
            developing cutting-edge software solutions that address real-world
            challenges. The team is dedicated to improving their skills and
            knowledge in a collaborative and inclusive environment while working
            on real-world projects that align with their passion for technology.
            <br />
            <br /> &emsp; Our team is made up of students who are passionate
            about technology and eager to learn and grow together. We are
            committed to creating an inclusive and collaborative environment
            where everyone can share their ideas, skills and knowledge. We
            believe that working together, we can achieve great things and make
            a difference in the world.
          </p>
        </div>
      </motion.div>
    </>
  );
}
