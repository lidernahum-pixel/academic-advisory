import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import FeatureFigure from "@/components/sections/FeatureFigure";
import SectionHead from "@/components/sections/SectionHead";
import ServicesDetail from "@/components/sections/ServicesDetail";
import SimpleQuote from "@/components/sections/SimpleQuote";
import CtaBlock from "@/components/sections/CtaBlock";

export const metadata: Metadata = {
  title: "Management & Operations — The Academic Advisory",
  description:
    "Steady, discreet operational stewardship for educational firms in Puerto Rico and on the mainland.",
};

const ITEMS = [
  {
    n: "01",
    title: "Scheduling & Calendar Operations",
    body: "Coordinated calendars for tutors, students, and staff — across time zones, institutions, and modalities.",
  },
  {
    n: "02",
    title: "Bookkeeping & Financial Oversight",
    body: "Clear records, dependable reporting, and steady month-end close — handled with discretion and care.",
  },
  {
    n: "03",
    title: "Billing & Client Accounts",
    body: "Invoicing, retainers, payments, and family-facing communications — managed end-to-end on your behalf.",
  },
  {
    n: "04",
    title: "Administrative Oversight",
    body: "Day-to-day operational stewardship: vendors, contracts, document control, and the small details that compound.",
  },
  {
    n: "05",
    title: "Systems & Process Design",
    body: "Practical workflows and tooling tailored to the way educational firms actually work — built to scale with you.",
  },
  {
    n: "06",
    title: "Puerto Rico & Mainland Coordination",
    body: "A bilingual, bi-jurisdictional team comfortable working with firms based in San Juan, the mainland, and beyond.",
  },
];

export default function ManagementPage() {
  return (
    <>
      <PageHero
        metaLeft="Management & Operations"
        metaRight="For Educational Firms"
        title={
          <>
            Seamless <em>administration</em> for educational firms.
          </>
        }
        subLeftLabel="For"
        subLeft={<>Educational firms · Puerto Rico &amp; mainland</>}
        subRight={
          <p className="m-0">
            The Academic Advisory manages the internal operations of educational
            companies in Puerto Rico and on the mainland. Our team supports
            firms with scheduling, bookkeeping, billing, and administrative
            oversight — ensuring that organizations run with clarity and
            precision.
          </p>
        }
      />

      <FeatureFigure
        src="/images/archival-desk.jpg"
        alt="An archival desk with documents"
        caption="When the back-office is in order, teaching can take center stage."
        ratio="21/9"
      />

      <section className="container-x" style={{ padding: "120px 0" }}>
        <SectionHead
          index="02 /"
          kicker="Scope of Work"
          title="Where we steady the ship."
        />
        <ServicesDetail items={ITEMS} />
      </section>

      <SimpleQuote
        quote="Clarity is the precondition for excellence — in classrooms, in companies, in lives."
        cite="The Academic Advisory"
      />

      <CtaBlock
        heading="Bring order to the work behind the work."
        body="We engage a small number of educational firms at a time. Reach out to discuss whether we are the right fit."
        ctaLabel="Inquire About Engagement"
        ctaHref="/contact"
      />
    </>
  );
}
