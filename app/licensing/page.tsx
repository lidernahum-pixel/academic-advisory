import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import FeatureFigure from "@/components/sections/FeatureFigure";
import SectionHead from "@/components/sections/SectionHead";
import ServicesDetail from "@/components/sections/ServicesDetail";
import SimpleQuote from "@/components/sections/SimpleQuote";
import CtaBlock from "@/components/sections/CtaBlock";

export const metadata: Metadata = {
  title: "Intellectual Property & Licensing — The Academic Advisory",
  description:
    "Proprietary educational frameworks, licensed with care to trusted partners through structured agreements.",
};

const ITEMS = [
  {
    n: "01",
    title: "Inquiry & Introduction",
    body: "Prospective partners begin with a private conversation. We listen for fit before we discuss frameworks.",
  },
  {
    n: "02",
    title: "Review of Proprietary Materials",
    body: "Under appropriate confidentiality, we walk qualified affiliates through the relevant frameworks and their intended use.",
  },
  {
    n: "03",
    title: "Structured Licensing Agreement",
    body: "Terms are written to protect the integrity of the work and to give partners clear, durable rights to apply it.",
  },
  {
    n: "04",
    title: "Training & Onboarding",
    body: "Licensees are oriented to the philosophy behind the materials — not merely the mechanics of their delivery.",
  },
  {
    n: "05",
    title: "Ongoing Stewardship",
    body: "We remain available to advise affiliates as they put the work into practice and as the frameworks themselves evolve.",
  },
  {
    n: "06",
    title: "Renewal & Refinement",
    body: "Agreements are reviewed periodically so that both the materials and the partnership stay current with the field.",
  },
];

export default function LicensingPage() {
  return (
    <>
      <PageHero
        metaLeft="Intellectual Property & Licensing"
        metaRight="For Trusted Partners"
        title={
          <>
            Proprietary frameworks, <em>licensed</em> with care.
          </>
        }
        subLeftLabel="For"
        subLeft={<>Trusted partners &amp; affiliates</>}
        subRight={
          <p className="m-0">
            The Academic Advisory licenses proprietary intellectual property —
            frameworks refined over years of mentorship and advisement — to
            trusted partners and affiliates, through structured agreements
            designed to protect the integrity of the work.
          </p>
        }
      />

      <FeatureFigure
        src="/images/bound-books.jpg"
        alt="A shelf of bound books"
        caption="Our frameworks are not sold off the shelf — they are entrusted, with intention."
        ratio="21/9"
      />

      <section className="container-x" style={{ padding: "120px 0" }}>
        <SectionHead
          index="02 /"
          kicker="How It Works"
          title="A considered path to licensure."
        />
        <ServicesDetail items={ITEMS} />
      </section>

      <SimpleQuote
        quote="A framework is only as strong as the hands entrusted to carry it."
        cite="The Academic Advisory"
      />

      <CtaBlock
        heading="For organizations that share our standard of care."
        body="Licensing inquiries are reviewed personally. Please share a few words about your organization and your interest."
        ctaLabel="Submit a Licensing Inquiry"
        ctaHref="/contact"
      />
    </>
  );
}
