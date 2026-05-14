import PageHero from "@/components/sections/PageHero";
import FeatureFigure from "@/components/sections/FeatureFigure";
import SectionHead from "@/components/sections/SectionHead";
import ServicesIndex from "@/components/sections/ServicesIndex";
import Manifesto from "@/components/sections/Manifesto";
import PremiumCards from "@/components/sections/PremiumCards";
import PremiumQuote from "@/components/sections/PremiumQuote";
import CtaBlock from "@/components/sections/CtaBlock";
import Marquee from "@/components/sections/Marquee";
import StatusBand from "@/components/sections/StatusBand";
import Sidenote from "@/components/editorial/Sidenote";

const HERO_IMAGE = "/images/reading-hall.jpg";

const SERVICES = [
  {
    n: "01",
    title: "Educational Consulting",
    body: "Admissions strategy, academic mentorship, neurodivergent learning support, and brain-based approaches to growth — for students, families, and institutions.",
    href: "/consulting",
  },
  {
    n: "02",
    title: "Management & Operations",
    body: "Internal operations for educational firms in Puerto Rico and on the mainland — scheduling, bookkeeping, billing, and the steady stewardship of a practice.",
    href: "/management",
  },
  {
    n: "03",
    title: "Intellectual Property & Licensing",
    body: "Proprietary frameworks, developed over years of mentorship, made available to trusted partners through structured licensing agreements.",
    href: "/licensing",
  },
];

const PREMIUM_CARDS = [
  {
    index: "01",
    title: "Educational<br/>Consulting",
    excerpt:
      "Admissions strategy, neurodivergent support, and parent advising — composed engagement by engagement.",
    href: "/consulting",
    image: "/images/study-warm-light.jpg",
    alt: "A study under warm light",
  },
  {
    index: "02",
    title: "Management<br/>& Operations",
    excerpt:
      "Steady stewardship of educational firms — scheduling, billing, and the small details that compound.",
    href: "/management",
    image: "/images/archival-desk.jpg",
    alt: "An archival desk with documents",
  },
  {
    index: "03",
    title: "Intellectual Property<br/>& Licensing",
    excerpt:
      "Frameworks refined over decades, entrusted to trusted partners under structured licensing agreements.",
    href: "/licensing",
    image: "/images/bound-books.jpg",
    alt: "A shelf of bound books",
  },
];

const MARQUEE_VALUES = [
  "Est. San Juan",
  "Sub rosa",
  "By Appointment",
  "Counsel for Students, Families & Institutions",
  "Two Decades of Practice",
];

export default function Home() {
  return (
    <>
      <PageHero
        metaLeft="Educational Counsel"
        metaRight="Est. Puerto Rico"
        title={
          <>
            Rethinking education at its <em>roots</em>.
          </>
        }
        subLeftLabel="Founded by"
        subLeft={
          <>
            <span className="font-serif text-[20px] tracking-[-0.012em] block">
              Elisabeth Gray
            </span>
            <span className="text-muted text-[13px] mt-1 block tracking-[0.02em]">
              Oxford · two decades of practice
            </span>
          </>
        }
        subRight={
          <p className="m-0">
            The Academic Advisory exists to rethink education at its roots —
            supporting learners, families, and organizations with strategic
            insight, intellectual rigor, and deep compassion. We guide
            individuals and institutions toward meaningful growth through
            mentorship, neurodivergent support, and educational innovation.
          </p>
        }
      />

      <Marquee items={MARQUEE_VALUES} duration={70} />

      <FeatureFigure
        src={HERO_IMAGE}
        alt="A neoclassical reading hall, light through high windows"
        caption="A reading hall — for the long view of an academic life."
        credit="Photography · Kitera Dent"
        ratio="21/9"
      />

      <section className="container-x" style={{ padding: "clamp(80px,11vw,140px) 0" }}>
        <SectionHead
          index="02 /"
          kicker="Practice Areas"
          title="Three considered ways we work."
        />
        <ServicesIndex items={SERVICES} />
      </section>

      <Manifesto
        text={
          <>
            We exist to rethink education at its{" "}
            <em
              className="italic"
              style={{ color: "var(--color-accent)" }}
            >
              roots
            </em>
            .
          </>
        }
        body={[
          "Our work is grounded in the belief that education is not merely about achievement — it is about unlocking potential. We support learners, families, and educational organizations with strategic insight, intellectual rigor, and deep compassion.",
          "Every engagement is private, considered, and built to last beyond a single application, milestone, or year.",
        ]}
        link={{ href: "/about", label: "Read about the firm" }}
        sidenote={
          <Sidenote marker="§ 01" label="On Discretion">
            Every relationship is private. We do not disclose clients, and
            references are shared only with mutual agreement.
          </Sidenote>
        }
      />

      <section className="container-x" style={{ padding: "clamp(64px,8vw,120px) 0" }}>
        <PremiumCards cards={PREMIUM_CARDS} />
      </section>

      <StatusBand
        kicker="Currently"
        status="Accepting families for the 2026–27 cycle."
        body="Inquiries reviewed personally. Two business days, by post or correspondence."
        ctaLabel="Begin Inquiry"
        ctaHref="/contact"
      />

      <PremiumQuote
        image={HERO_IMAGE}
        quote="Education is the kindling of a flame, not the filling of a vessel."
        cite="Socrates"
      />

      <CtaBlock
        marker="Begin"
        heading={
          <>
            A private conversation,
            <br />
            to begin.
          </>
        }
        body="We work with a small number of families, institutions, and partners at any one time. Inquiries are reviewed personally, and we respond within two business days."
        ctaLabel="Request a Consultation"
        ctaHref="/contact"
      />
    </>
  );
}
