import React from "react";
import Hero from "@/components/atebiz/Hero";
import StoryFlow from "@/components/atebiz/StoryFlow";
import FamilySwitcher from "@/components/atebiz/FamilySwitcher";
import { Compare, Faq, Quiz } from "@/components/atebiz/HomeExtras";
import { Connectors, FinalCall, Manifesto, SpeedBand } from "@/components/atebiz/HomeSections";
import ProgressDock from "@/components/atebiz/ProgressDock";

const SECTION_IDS = ["inicio", "historia", "familia", "antes-despues", "empezar", "conectores", "velocidad-home", "manifiesto", "preguntas", "hablemos"];

export default function Home() {
  return (
    <>
      <Hero />
      <StoryFlow />
      <FamilySwitcher />
      <Compare />
      <Quiz />
      <Connectors />
      <SpeedBand />
      <Manifesto />
      <Faq />
      <FinalCall />
      <ProgressDock ids={SECTION_IDS} />
    </>
  );
}
