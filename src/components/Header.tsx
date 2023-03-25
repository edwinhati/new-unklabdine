import { useRouter } from "next/router";

interface HeaderProps {
  label: string;
  hasBack: boolean;
}

const Header: React.FC<HeaderProps> = ({ label, hasBack }) => {
  const router = useRouter();

  const backButtonClass = `z-50 flex justify-center items-center w-[40px] h-[40px] rounded-full ${
    hasBack ? "" : "hidden"
  }`;
  const titleClass = `flex justify-center w-full ${
    hasBack ? "-ml-[40px]" : ""
  }`;

  const handleBackClick = () => {
    router.back();
  };

  return (
    <div className="fixed top-0 w-full max-w-[600px] py-[8px] px-[15px] flex justify-between items-center font-sans shadow-sm backdrop-blur-lg z-40">
      <div className={backButtonClass}>
        <button type="button" onClick={handleBackClick}>
          <i className="fa-solid fa-chevron-left" />
        </button>
      </div>
      <div className={titleClass}>
        <h1 className="font-bold text-[20px] text-[#2D2D2D] ">
          {label.toUpperCase()}
        </h1>
      </div>
    </div>
  );
};

export default Header;
