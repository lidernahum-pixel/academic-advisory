import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import Portrait from "@/components/sections/Portrait";
import SectionHead from "@/components/sections/SectionHead";
import Tenets from "@/components/sections/Tenets";
import CtaBlock from "@/components/sections/CtaBlock";

export const metadata: Metadata = {
  title: "About — The Academic Advisory",
  description:
    "Founded by Elisabeth Gray, The Academic Advisory brings two decades of practice to mentorship, neurodivergent learning, and educational strategy.",
};

const TENETS = [
  {
    n: "01",
    title: "Each learner is singular.",
    body: "No two minds learn alike. Every engagement begins by understanding the particular shape of a student, family, or institution before we recommend a single step.",
  },
  {
    n: "02",
    title: "Rigor and compassion are inseparable.",
    body: "Real growth asks for honest counsel, careful structure, and a steady hand. We bring all three — without compromise on either.",
  },
  {
    n: "03",
    title: "The long view, always.",
    body: "We measure engagements in decades, not deadlines. Our families and institutions stay with us through transitions because the relationship is built to.",
  },
  {
    n: "04",
    title: "Discretion, as a default.",
    body: "Every relationship is private. We do not disclose clients, and references are shared only with mutual agreement.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        metaLeft="Who We Are"
        metaRight="The Firm"
        title={
          <>
            A consultancy <em>founded</em> on mentorship and mind.
          </>
        }
      />

      <Portrait
        image="/images/elisabeth-gray.webp"
        name="Elisabeth Gray"
        role="Founder & Principal"
        paragraphs={[
          "The Academic Advisory LLC is a premier educational consultancy based in Puerto Rico, providing expert guidance to clients across the mainland United States and internationally. Founded by Elisabeth Gray — a seasoned consultant and Oxford graduate — the firm offers high-level support to students, families, institutions, and educational organizations seeking to reimagine learning with clarity, compassion, and intellectual rigor.",
          "With more than two decades of experience, Elisabeth has worked at the intersection of academic mentorship, neurodivergent learning support, and strategic educational planning. From designing admissions strategies to managing educational firms and licensing proprietary learning frameworks, the firm brings a uniquely holistic and forward-thinking approach to every engagement.",
          "At our core, we believe that education is not just about achievement — it is about unlocking potential. We are committed to helping learners and leaders navigate complexity, build confidence, and grow with purpose.",
        ]}
      />

      <section className="container-x" style={{ padding: "120px 0" }}>
        <SectionHead
          index="03 /"
          kicker="What We Hold To"
          title="A few quiet convictions."
        />
        <Tenets items={TENETS} />
      </section>

      <CtaBlock
        heading="Speak with us."
        body="Each engagement begins with a private conversation. We respond personally within two business days."
        ctaLabel="Request a Consultation"
        ctaHref="/contact"
      />
    </>
  );
}
