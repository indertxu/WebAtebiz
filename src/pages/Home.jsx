import React from "react";
import Hero from "@/components/atebiz/Hero";
import StoryFlow from "@/components/atebiz/StoryFlow";
import FamilySwitcher from "@/components/atebiz/FamilySwitcher";
import { Connectors, FinalCall, Manifesto, SpeedBand } from "@/components/atebiz/HomeSections";
import ProgressDock from "@/components/atebiz/ProgressDock";

const SECTION_IDS = ["inicio", "historia", "familia", "conectores", "velocidad-home", "manifiesto", "hablemos"];

export default function Home() {
  return (
    <>
      <Hero />
      <StoryFlow />
      <FamilySwitcher />
      <Connectors />
      <SpeedBand />
      <Manifesto />
      <FinalCall />
      <ProgressDock ids={SECTION_IDS} />
    </>
  );
}
