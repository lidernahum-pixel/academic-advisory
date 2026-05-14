import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import FeatureFigure from "@/components/sections/FeatureFigure";
import SectionHead from "@/components/sections/SectionHead";
import ServicesDetail from "@/components/sections/ServicesDetail";
import QuoteBanner from "@/components/sections/QuoteBanner";
import CtaBlock from "@/components/sections/CtaBlock";

export const metadata: Metadata = {
  title: "Educational Consulting — The Academic Advisory",
  description:
    "Strategic guidance, neurodivergent learning support, and bespoke advisement for students, families, and institutions.",
};

const ITEMS = [
  {
    n: "01",
    title: "High School & College Admissions",
    body: "Personalized planning, application guidance, and essay development tailored to each student's strengths and goals.",
  },
  {
    n: "02",
    title: "Neurodivergent Learning Support",
    body: "Customized coaching and academic mentorship that honors diverse learning styles and cognitive profiles.",
  },
  {
    n: "03",
    title: "Writing & Vocational Coaching",
    body: "Support for students navigating personal narratives, professional goals, and academic writing.",
  },
  {
    n: "04",
    title: "Parent Advising",
    body: "Helping families understand and support their children's educational journeys with insight, structure, and compassion.",
  },
  {
    n: "05",
    title: "Brain-Based Learning Approaches",
    body: "Integrating cognitive development strategies and alternative therapies to unlock new pathways for growth.",
  },
  {
    n: "06",
    title: "Bespoke & Private Consulting",
    body: "Every consulting relationship is fully customized and conducted with discretion — offering clarity in complexity, support through transition, and long-term tools for success.",
  },
];

export default function ConsultingPage() {
  return (
    <>
      <PageHero
        metaLeft="Educational Consulting"
        metaRight="For Students, Families & Institutions"
        title={
          <>
            Strategic guidance, <em>rooted</em> in care.
          </>
        }
        subLeftLabel="For"
        subLeft={<>Students, families, institutions, organizations</>}
        subRight={
          <p className="m-0">
            The Academic Advisory provides strategic educational consulting to
            those seeking expert support beyond the classroom. Our work spans
            admissions strategy, academic mentorship, and personalized support
            for neurodivergent learners — including writing and vocational
            coaching, parent advising, and brain-based approaches to educational
            transformation.
          </p>
        }
      />

      <FeatureFigure
        src="/images/reading-hall.jpg"
        alt="A student reading by lamplight"
        caption="Every engagement is tailored, intentional, and private."
        ratio="21/9"
      />

      <section className="container-x" style={{ padding: "120px 0" }}>
        <SectionHead
          index="02 /"
          kicker="Areas of Practice"
          title="Tailored services for lasting impact."
        />
        <ServicesDetail items={ITEMS} />
      </section>

      <QuoteBanner
        image="/images/study-warm-light.jpg"
        quote="Education is the kindling of a flame, not the filling of a vessel."
        cite="Socrates"
      />

      <CtaBlock
        heading="For a student, a family, or a school."
        body="Each engagement begins with a private consultation. We respond personally within two business days."
        ctaLabel="Request a Consultation"
        ctaHref="/contact"
      />
    </>
  );
}
