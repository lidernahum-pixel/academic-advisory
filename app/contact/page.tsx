import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import InquiryForm from "@/components/sections/InquiryForm";
import Reveal from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Contact — The Academic Advisory",
  description:
    "Begin a private conversation. Inquiries are reviewed personally; we respond within two business days.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        metaLeft="By Appointment"
        metaRight="San Juan · Puerto Rico"
        title={
          <>
            A private <em>conversation</em>, to begin.
          </>
        }
        subLeftLabel="Hours of counsel"
        subLeft={
          <>
            Monday – Friday
            <br />
            9:00 – 18:00 AST
          </>
        }
        subRight={
          <p className="m-0">
            We work with a small number of families, institutions, and partners
            at any one time. Please share a few words about who you are and what
            you are looking for — we respond personally within two business
            days.
          </p>
        }
      />

      <section className="container-x" style={{ padding: "80px 0" }}>
        <div className="content-max grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-24 items-start">
          <Reveal className="flex flex-col gap-14">
            <div>
              <div className="kicker mb-4">By Correspondence</div>
              <a
                href="mailto:Admin@TheAcademicAdvisory.com"
                className="font-display inline-block border-b border-ink pb-1.5 transition-colors hover:text-[var(--color-accent)] hover:border-[var(--color-accent)]"
                style={{ fontSize: "clamp(24px, 2.4vw, 34px)" }}
              >
                Admin@TheAcademicAdvisory.com
              </a>
            </div>

            <div>
              <div className="kicker mb-3.5">By Post</div>
              <p
                className="m-0"
                style={{ fontSize: 19, lineHeight: 1.5, maxWidth: "32ch" }}
              >
                San Juan,
                <br />
                Puerto Rico 00911
              </p>
            </div>

            <div>
              <div className="kicker mb-3.5">On Discretion</div>
              <p
                className="m-0 text-ink-soft"
                style={{ fontSize: 16, lineHeight: 1.65, maxWidth: "40ch" }}
              >
                All inquiries are handled in absolute confidence. We do not
                disclose client relationships, and references are provided only
                upon mutual agreement.
              </p>
            </div>
          </Reveal>

          <div>
            <div className="kicker mb-4">Inquiry Form</div>
            <InquiryForm />
          </div>
        </div>
      </section>
    </>
  );
}
