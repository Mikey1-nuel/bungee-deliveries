"use client"
import { useState } from "react";
import OnboardingSlider from "@/app/components/onboarding/onboardingSlider";
import { slides } from "@/data/slides";

export default function OnboardingPage() {
  const [current, setCurrent] = useState(0);
  const total = slides.length;

  const handleNext = () => {
    if (current < total - 1) {
      setCurrent(current + 1);
    }
  };

  const handleSkip = () => {
    // Example: jump to last slide
    setCurrent(total - 1);
  };

  return (
    <main className="relative">
      <button
        className="absolute top-10 right-10 z-10 text-[#E95322]"
        onClick={handleSkip}
      >
        Skip &gt;
      </button>

      <OnboardingSlider
        slide={slides[current]}
        total={total}
        current={current}
        onNext={handleNext}
      />
    </main>
  );
}

