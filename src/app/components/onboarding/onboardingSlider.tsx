import Image from "next/image";
import Link from "next/link";
import Button from "@mui/material/Button";
import SlideIndicators from "./slideIndicators";
import { Slide } from "@/app/types/type";

export default function OnboardingSlider({
  slide,
  total,
  current,
  onNext,
}: {
  slide: Slide;
  total: number;
  current: number;
  onNext: () => void;
}) {
  return (
    <div
      className="relative w-full h-screen bg-cover bg-center z-0"
      style={{ backgroundImage: `url(${slide.background})` }}
    >
      <div className="absolute inset-0 bg-black/30 z-1" />

      <div className="absolute bottom-0 w-full z-10 rounded-[20px_20px_0_0] pt-6 pb-10 flex flex-col items-center gap-[15px] bg-white">
        <Image src={slide.icon} alt="" width={30} height={30} />
        <h2 className="text-[#E95322] capitalize font-bold text-xl md:text-2xl">
          {slide.title}
        </h2>
        <p className="text-[#391713] text-sm md:text-[14px] w-[50%]">
          {slide.description}
        </p>
        <SlideIndicators total={total} current={current} />
        <Button
          variant="text"
          onClick={current === total - 1 ? undefined : onNext}
          sx={{
            color: "#fff",
            background: "#E95322",
            fontFamily: "Montserrat",
            fontWeight: "bold",
            borderRadius: "20px",
            padding: "5px 15px",
            width: "10%",
            textTransform: "capitalize",
          }}
        >
          {current === total - 1 ? (
            <Link
              href="/signUp"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              Get Started
            </Link>
          ) : (
            "Next"
          )}
        </Button>
      </div>
    </div>
  );
}
