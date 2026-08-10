import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PATHS } from "@/lib/routes";
import { SITE_BASE_URL } from "@/lib/constants";
import { MarketingPageShell } from "@/components/marketing";
import { marketingHeroH1Class } from "@/lib/marketing-typography";
import { cn } from "@/lib/utils";
import { defaultOpenGraphImage } from "@/lib/seo";

const canonicalUrl = `${SITE_BASE_URL}${PATHS.PRIVACY}`;

export const metadata: Metadata = {
  title: "Privacy Policy. How QApilot Protects Your Data",
  description:
    "Read QApilot's Privacy Policy. Learn how we collect, use, and protect personal data when you use our site and services.",
  alternates: { canonical: canonicalUrl },
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: "Privacy Policy | QApilot",
    description:
      "How QApilot processes personal data for clients using our AI-powered testing platform and website.",
    siteName: "QApilot",
    locale: "en_US",
    images: [defaultOpenGraphImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | QApilot",
    description: "QApilot privacy practices and your data rights.",
    images: [
      { url: defaultOpenGraphImage.url, alt: defaultOpenGraphImage.alt },
    ],
  },
};

/** Legal copy is static in-repo; refresh daily if the page is edited. */
export const revalidate = 86400;

const proseSection =
  "prose prose-slate max-w-none dark:prose-invert prose-headings:font-semibold prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-li:my-1";

export default function PrivacyPage() {
  return (
    <>
      <MarketingPageShell background="soft" contentClassName="animate-fade-in">
        <div className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
          <div className="section-full mx-auto max-w-4xl py-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft size={18} />
              Back
            </Link>
          </div>
        </div>
        <div className="section-edge w-full py-12">
          <div className="section-full mx-auto max-w-4xl">
            <div className="mb-12 text-center">
              <h1 className={cn(marketingHeroH1Class, "mb-4")}>
                Privacy Policy
              </h1>
            </div>

            <article
              className={cn(
                "rounded-lg border border-border bg-card p-6 shadow-sm sm:p-8 lg:p-12",
                proseSection,
              )}
            >
              <div className="not-prose mb-8 space-y-1 border-b border-border pb-8 text-sm text-muted-foreground">
                <p>
                  Effective from September 1, 2024 for all Customers and Users
                </p>
                <p>Last updated: May 05, 2026</p>
              </div>
              <div className="space-y-10">
                <section className="space-y-4">
                  <p>
                    This policy (together with our{" "}
                    <Link href={PATHS.TERMS}>terms of use</Link> and any other
                    referenced documents) outlines how we process any personal
                    data collected from you or provided by you to us. It
                    pertains solely to the personal data of our clients and does
                    not extend to any personal data of your customers, which may
                    be processed using our services; in such cases, we act as
                    the data processor operating under your instructions. The
                    terms &apos;QApilot,&apos; &apos;we,&apos; and
                    &apos;us&apos; refer to +91 AI Private Limited and any of
                    our corporate affiliates and subsidiaries.
                  </p>
                  <p>
                    Please carefully review the following to understand our
                    perspectives and regarding your personal data and how we
                    handle it. By visiting{" "}
                    <a
                      href="https://qapilot.io/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      https://qapilot.io/
                    </a>{" "}
                    or using any of our products or services you are accepting
                    and consenting to the practices described in this Privacy
                    Policy. Your continued use of our site{" "}
                    <a
                      href="https://qapilot.io/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      https://qapilot.io/
                    </a>{" "}
                    (our site) and/or our products and services constitute your
                    consent to the contents of this Privacy Policy.
                  </p>
                </section>

                <section className="space-y-4">
                  <h2>Information we may collect from you</h2>
                  <p>
                    We may collect and process the following data about you:
                  </p>
                  <ul>
                    <li>
                      Contact information (such as name, email, address etc.)
                    </li>
                    <li>Billing information</li>
                    <li>
                      Internet activity (such as pages viewed on our website)
                    </li>
                    <li>
                      Computer/device information (such as IP address or
                      geolocation information)
                    </li>
                    <li>
                      Usage data from your use of our products and services (for
                      product/service maintenance and enhancements)
                    </li>
                    <li>Professional or employment related information, and</li>
                    <li>Inferences drawn from the foregoing.</li>
                  </ul>
                </section>

                <section className="space-y-4">
                  <h2>Information you give us</h2>
                  <p>
                    You may provide us information about you by filling in forms
                    on our site or by communicating with us via phone, e-mail or
                    other means. This includes information you provide when
                    registering to use our site, subscribing to our services,
                    searching for a product or service, participating in
                    discussion boards or other social media functions on our
                    site, entering a competition, promotion, or survey,
                    submitting contact details, a job application, or signing up
                    for email newsletters, as well as when reporting a problem
                    with our site. The information you give us may include your
                    name, address, e-mail address and phone number, financial
                    and credit card information, personal description and
                    photograph, and your consent to being tracked.
                  </p>
                  <p>
                    If You fail to provide the personal data necessary for us to
                    provide the service, we may not be able to fulfil our
                    contractual obligations. You are responsible for ensuring
                    that the personal data you provide to us is accurate and up
                    to date.
                  </p>
                </section>

                <section className="space-y-4">
                  <h2>Information we collect about you</h2>
                  <p>
                    With regard to each of your visits to our site or usage of
                    our products and services, we may automatically collect the
                    following information:
                  </p>
                  <ul>
                    <li>
                      Technical information, including the Internet protocol
                      (IP) address used to connect your computer to the
                      Internet, your login information, browser type and
                      version, time zone setting, browser plug-in types and
                      versions, operating system and platform;
                    </li>
                    <li>
                      Information about your visit or usage, including but not
                      limited to the full Uniform Resource Locators (URL)
                      clickstream to, through, and from our site (including date
                      and time); products and services you viewed or searched
                      for; page response times, download errors, length of
                      visits to certain pages, page interaction information
                      (such as scrolling, clicks, and mouse-overs), and methods
                      used to browse away from the page, and any phone number
                      used to call our customer service number.
                    </li>
                  </ul>
                </section>

                <section className="space-y-4">
                  <h2>Information we receive from other sources</h2>
                  <p>
                    We may obtain personal data about you from various third
                    parties and public sources as outlined below. If you use any
                    of our other websites or services, we may receive
                    information about you. When collecting such data, we will
                    have notified you that it may be shared internally and
                    combined with data collected on this site. Additionally, we
                    collaborate closely with third parties such as business
                    partners, sub-contractors providing technical, payment and
                    delivery services, advertising networks, analytics
                    providers, search information providers, credit reference
                    agencies, from whom we may receive information about you.
                  </p>
                </section>

                <section className="space-y-6">
                  <h2>Disclosure of your information</h2>
                  <p>
                    We may disclose your personal information to any member of
                    our group, which includes our subsidiaries.
                  </p>
                  <p>
                    We may share your information with selected third parties
                    including:
                  </p>
                  <ul>
                    <li>
                      Business partners, suppliers and sub-contractors for the
                      performance of any contract we enter into with them or
                      you.
                    </li>
                    <li>
                      Advertisers and advertising networks that require the data
                      to select and serve relevant adverts to you and others.
                    </li>
                    <li>
                      Analytics and search engine providers that assist us in
                      the improvement and optimisation of our site and/or
                      services.
                    </li>
                    <li>
                      Regulatory due diligence check which may involve personal
                      data.
                    </li>
                  </ul>
                  <p>
                    We may disclose your personal information to third parties:
                  </p>
                  <ul>
                    <li>
                      In the event that we sell or buy any business or assets,
                      in which case we may disclose your personal data to the
                      prospective seller or buyer of such business or assets.
                    </li>
                    <li>
                      If we or substantially all of our assets are acquired by a
                      third party, in which case personal data held by us about
                      our customers will be one of the transferred assets.
                    </li>
                    <li>
                      If we are under a duty to disclose or share your personal
                      data in order to comply with any legal obligation, or in
                      order to enforce or apply our terms of use and other
                      agreements; or to protect the rights, property, or safety
                      of our company (including our subsidiaries, our ultimate
                      holding company and its subsidiaries), our customers, or
                      others. This includes exchanging information with other
                      companies and organisations for the purposes of fraud
                      protection and credit risk reduction.
                    </li>
                  </ul>
                </section>

                <section className="space-y-4">
                  <h2>Your rights</h2>
                  <ol className="!list-[lower-alpha] space-y-4 border-0 pl-6 marker:font-medium [&>li]:mt-0">
                    <li>
                      Where we are relying on your consent to process your
                      personal data, you can withdraw it at any time by
                      contacting us at{" "}
                      <a href="mailto:info@qapilot.com">info@qapilot.com</a>.
                      However, there are circumstances where we can process your
                      personal data without your consent, such as when necessary
                      to fulfill a contractual obligation, comply with a legal
                      requirement, or protect vital interests.
                    </li>
                    <li>
                      You can request us to rectify inaccurate or incomplete
                      personal data, which we aim to do promptly and usually
                      within one month unless the request is complex.
                    </li>
                    <li>
                      You have the right to request the erasure of your personal
                      data (&quot;right to be forgotten&quot;) in cases where
                      there&apos;s no compelling reason for continued
                      processing, though exceptions may apply, and we&apos;ll
                      notify you accordingly (unless prevented to do so by law).
                    </li>
                    <li>
                      You can request to restrict processing of your personal
                      data in certain situations, such as when the data is
                      inaccurate, processed unlawfully or where the data is no
                      longer relevant to the intended purpose. In such cases, we
                      will retain the data but refrain from further processing
                      without your consent. Exceptions include situations where
                      processing is necessary for legal claims, protecting
                      rights of individuals, or public interest reasons.
                      We&apos;ll inform you if we intend to lift the restriction
                      on processing your personal data.
                    </li>
                    <li>
                      You may request access to your personal data via a subject
                      access request. To do so, please email us at{" "}
                      <a href="mailto:info@qapilot.com">info@qapilot.com</a>{" "}
                      with your request in writing. We may ask you for proof of
                      your identity before providing the data. Typically, there
                      is no fee for such a request. However, in some cases, we
                      may charge an administrative fee based on the cost of
                      providing the information.
                    </li>
                    <li>
                      You have the right to request that we do not process your
                      personal data for marketing purposes, including profiling.
                      We will typically inform you before collecting your data
                      if we intend to use your data for such purposes or to
                      disclose your information to any third parties. You can
                      exercise your right to prevent such processing by checking
                      certain boxes on the forms we use to collect your data.
                      Additionally, you can also exercise this right at any time
                      by contacting us at{" "}
                      <a href="mailto:info@qapilot.com">info@qapilot.com</a>
                    </li>
                    <li>
                      You have the right to obtain and reuse your personal data
                      for your own purposes across different services (right to
                      data portability). This right applies only to data that
                      you have provided to us, where we are processing the data
                      based on your consent or for the performance of a
                      contract, and when the processing is carried out by
                      automated means. If this right applies, we will provide
                      the data in a structured, commonly used, and
                      machine-readable format.
                    </li>
                  </ol>
                </section>

                <section className="space-y-4">
                  <p>
                    Our site, products and services may occasionally include
                    links to and from the websites of our partner networks,
                    advertisers and affiliates. Please note that these websites
                    have their own privacy policies, and we do not accept any
                    responsibility or liability for them. Before submitting any
                    personal data to these websites, please review their
                    respective privacy policies.
                  </p>
                </section>

                <section className="space-y-4">
                  <h2>Changes to our Privacy Policy</h2>
                  <p>
                    Any future changes to our privacy policy will be posted on
                    this page. We encourage you to check back regularly for
                    updates or revisions to our privacy policy.
                  </p>
                </section>

                <section className="space-y-4">
                  <h2>Contact and complaints</h2>
                  <p>
                    Questions, comments and requests regarding this privacy
                    policy are welcomed and should be addressed to{" "}
                    <a href="mailto:info@qapilot.com">info@qapilot.com</a>
                  </p>
                  <p>
                    If you have any concerns about the processing of your
                    personal data, we encourage you to contact us first at{" "}
                    <a href="mailto:info@qapilot.com">info@qapilot.com</a>
                  </p>
                </section>
              </div>
            </article>
          </div>
        </div>
      </MarketingPageShell>
    </>
  );
}
