/**
 * Legal documents shown on the site (Privacy Policy, Terms & Conditions).
 * Plain typed data so the same content can render in the footer modal
 * and on the standalone /privacy and /terms routes.
 */

export type LegalBlock =
  | { kind: "p"; text: string }
  | { kind: "ul"; items: string[] }
  | { kind: "ol"; items: string[] };

export type LegalSection = { heading: string; blocks: LegalBlock[] };

export type LegalDocument = {
  slug: "privacy" | "terms";
  title: string;
  company: string;
  effectiveDate: string;
  sections: LegalSection[];
  closing: string[];
};

const p = (text: string): LegalBlock => ({ kind: "p", text });
const ul = (items: string[]): LegalBlock => ({ kind: "ul", items });
const ol = (items: string[]): LegalBlock => ({ kind: "ol", items });

export const PRIVACY_DOC: LegalDocument = {
  slug: "privacy",
  title: "Privacy Policy",
  company: "Hillshome Tours Company LTD",
  effectiveDate: "25 October 2026",
  sections: [
    {
      heading: "1. Introduction",
      blocks: [
        p("Hillshome Tours Company LTD (“Hillshome Tours,” “we,” “our,” or “us”) respects the privacy of our customers, website visitors, business partners, and other individuals who interact with our company."),
        p("This Privacy Policy explains how we collect, use, store, protect, and disclose personal information when you visit our website, contact us, request a quotation, make a booking, or use our services."),
        p("By using our website or services, you acknowledge that you have read this Privacy Policy."),
      ],
    },
    {
      heading: "2. Information We Collect",
      blocks: [
        p("Depending on how you interact with us, we may collect the following information:"),
        ul([
          "Personal information: Your name, telephone number, email address, and other contact details.",
          "Booking information: Tour preferences, destinations, travel dates, number of travellers, pickup locations, and other details necessary to arrange a service.",
          "Business information: Information you provide when requesting our transport, construction, cleaning and maintenance, IT and digital solutions, multimedia and creative, tours and experiences, or related services.",
          "Payment information: Payment status, transaction references, and information required to verify payments. We do not intentionally collect or store your mobile money PINs or banking passwords.",
          "Technical information: Information such as your browser type, device information, approximate location derived from technical data, and website usage information where collected through our hosting provider or website tools.",
          "Communications: Messages, enquiries, feedback, and other information you send to us.",
        ]),
        p("Please provide only information that is necessary for your enquiry or booking."),
      ],
    },
    {
      heading: "3. How We Use Your Information",
      blocks: [
        p("We may use your information to:"),
        ol([
          "Respond to enquiries and customer requests.",
          "Process and manage tour bookings, quotations, and service reservations.",
          "Arrange transportation, accommodation, tours, and other agreed services.",
          "Communicate booking confirmations, schedule changes, and service updates.",
          "Process and verify payments.",
          "Provide customer support and resolve complaints.",
          "Improve our website, services, and customer experience.",
          "Prevent fraud, misuse, and unauthorised access.",
          "Comply with applicable legal, tax, accounting, and regulatory obligations.",
          "Send promotional information where permitted by law and, where required, with your consent.",
        ]),
        p("You may opt out of promotional communications at any time."),
      ],
    },
    {
      heading: "4. Legal Basis for Processing",
      blocks: [
        p("Where applicable, we process personal information on the basis of your consent, the need to provide a service or take steps you request before entering into a contract, our legitimate business interests, and compliance with legal obligations."),
        p("Where we rely on consent, you may withdraw it, subject to any lawful reasons for retaining or processing the information."),
      ],
    },
    {
      heading: "5. Sharing of Information",
      blocks: [
        p("We do not sell your personal information to third parties."),
        p("We may share relevant information when necessary with:"),
        ul([
          "Tour operators, accommodation providers, transport providers, and other suppliers involved in delivering your booking.",
          "Payment providers and mobile money services to process or verify transactions.",
          "Website hosting providers, technical support providers, and other service providers that help operate our business.",
          "Professional advisers or public authorities where disclosure is required or permitted by applicable law.",
          "Other parties where you have authorised the disclosure or where it is necessary to protect legal rights and prevent fraud.",
        ]),
        p("We aim to share only the information necessary for the relevant purpose."),
      ],
    },
    {
      heading: "6. Cookies and Website Technologies",
      blocks: [
        p("Our website or hosting providers may use cookies or similar technologies to maintain website functionality, understand website usage, and improve performance."),
        p("Where required, we will request consent before using non-essential cookies. You can manage cookies through your browser settings, although disabling certain cookies may affect website functionality."),
      ],
    },
    {
      heading: "7. Data Security",
      blocks: [
        p("We take reasonable technical and organisational measures to protect personal information against unauthorised access, loss, misuse, alteration, or disclosure."),
        p("However, no method of internet transmission or electronic storage can be guaranteed to be completely secure. Please avoid sending confidential information through unsecured channels unless necessary."),
      ],
    },
    {
      heading: "8. Data Retention",
      blocks: [
        p("We retain personal information only for as long as reasonably necessary for the purposes described in this Policy, including fulfilling bookings, maintaining business records, resolving disputes, and complying with legal obligations."),
        p("When information is no longer required, we will take reasonable steps to delete it or anonymise it, subject to applicable retention requirements."),
      ],
    },
    {
      heading: "9. International Transfers",
      blocks: [
        p("Where personal information is processed or stored outside Rwanda, we will take appropriate steps to ensure that such processing complies with applicable data protection requirements."),
      ],
    },
    {
      heading: "10. Your Privacy Rights",
      blocks: [
        p("Subject to applicable law, you may have the right to:"),
        ul([
          "Request access to your personal information.",
          "Request correction of inaccurate or incomplete information.",
          "Request deletion of information where legally permitted.",
          "Object to or request restriction of certain processing.",
          "Withdraw consent where processing is based on consent.",
          "Request information about how your personal information is used or shared.",
          "Lodge a complaint with the relevant data protection authority.",
        ]),
        p("To exercise these rights, contact us using the details below. We may need to verify your identity before responding."),
      ],
    },
    {
      heading: "11. Third-Party Websites and Services",
      blocks: [
        p("Our website may contain links to third-party websites or services, including social media platforms and external booking or payment services. These providers have their own privacy policies and practices. Hillshome Tours is not responsible for the privacy practices of third-party websites that we do not control."),
      ],
    },
    {
      heading: "12. Children's Privacy",
      blocks: [
        p("Our website and services are not intended to collect personal information from children unnecessarily. Where a booking involves a child, a parent, guardian, or other authorised adult should provide the required information where appropriate. We handle children's personal information in accordance with applicable law."),
      ],
    },
    {
      heading: "13. Changes to This Policy",
      blocks: [
        p("We may update this Privacy Policy from time to time to reflect changes in our services, technology, or legal obligations. Updated versions will be published on our website with a revised effective date where appropriate."),
      ],
    },
    {
      heading: "14. Contact Us",
      blocks: [
        p("For questions, requests, or complaints concerning this Privacy Policy, contact:"),
        p("Hillshome Tours Company LTD"),
        ul([
          "Telephone: +250 788 423 341",
          "Email: Siboisaie78@gmail.com",
          "Address: Inyarurembo, Rwanda",
        ]),
        p("We will make reasonable efforts to respond to privacy enquiries within the period required by applicable law."),
      ],
    },
  ],
  closing: ["Thank you for trusting Hillshome Tours Company LTD."],
};

export const TERMS_DOC: LegalDocument = {
  slug: "terms",
  title: "Terms & Conditions",
  company: "Hillshome Tours Company LTD",
  effectiveDate: "25 October 2026",
  sections: [
    {
      heading: "1. Introduction",
      blocks: [
        p("Welcome to Hillshome Tours Company LTD (“Hillshome Tours,” “we,” “our,” or “us”)."),
        p("These Terms & Conditions govern your access to our website and your use of our services, including tours and travel experiences, transportation, construction, cleaning and facility maintenance, IT and digital solutions, multimedia and creative services, and other services offered by our company."),
        p("By using our website, requesting a quotation, making a booking, or engaging our services, you agree to the terms applicable to that transaction."),
        p("If you do not agree with these Terms & Conditions, please do not use the relevant services."),
      ],
    },
    {
      heading: "2. Our Services",
      blocks: [
        p("Hillshome Tours Company LTD offers a range of services that may include:"),
        ul([
          "Tours, excursions, and travel experiences.",
          "Transportation and related travel arrangements.",
          "Construction services and projects.",
          "Cleaning and facility maintenance.",
          "IT and digital solutions.",
          "Multimedia and creative services.",
          "Other services agreed upon between the company and the customer.",
        ]),
        p("Service availability depends on the location, schedule, resources, safety requirements, and any agreement reached with the customer."),
        p("Descriptions on our website are provided for general information. The exact scope, price, duration, and conditions of a particular service will be confirmed through a quotation, booking confirmation, or written agreement."),
      ],
    },
    {
      heading: "3. Bookings and Reservations",
      blocks: [
        p("Customers may request a booking or quotation through our website, telephone, email, or another authorised communication channel."),
        p("When making a request, customers should provide accurate contact details and all information reasonably necessary to arrange the service."),
        p("A request or quotation enquiry does not automatically constitute a confirmed booking. A booking is confirmed when Hillshome Tours communicates its acceptance and any applicable confirmation requirements have been satisfied."),
        p("For tours and transportation, customers should confirm the travel date, destination, number of participants, pickup arrangements, and any special requirements before the service begins."),
        p("Some services may require advance notice or availability checks."),
      ],
    },
    {
      heading: "4. Prices and Quotations",
      blocks: [
        p("Prices may be displayed on our website or provided individually through a quotation."),
        p("Unless expressly stated otherwise:"),
        ul([
          "A quotation applies to the service and scope described in it.",
          "Prices may depend on the number of participants, duration, distance, destination, materials, equipment, or other service requirements.",
          "Additional services or changes requested after confirmation may result in additional charges.",
          "Any applicable taxes, fees, deposits, or other charges will be communicated as required by law and the relevant agreement.",
        ]),
        p("A quotation may have an expiry date. Where no expiry date is stated, the price remains subject to confirmation when the booking is accepted."),
      ],
    },
    {
      heading: "5. Payments",
      blocks: [
        p("Payment terms will be communicated during the quotation or booking process."),
        p("Depending on the service, payment may be required in advance, through a deposit, in instalments, or upon completion, as agreed in writing."),
        p("We may accept available payment methods such as mobile money, bank transfer, or other approved payment channels."),
        p("Customers should use only payment instructions officially provided or confirmed by Hillshome Tours. Please retain payment receipts or transaction references."),
        p("A booking or service may be delayed if a required payment has not been received or verified. Any deposit, balance, or payment deadline will be governed by the applicable quotation, booking confirmation, or written agreement."),
      ],
    },
    {
      heading: "6. Cancellations, Changes, and Refunds",
      blocks: [
        p("Customers who need to cancel or change a booking should contact Hillshome Tours as soon as possible."),
        p("Cancellation charges, deposit refunds, rescheduling conditions, and refund timelines depend on the service, the time of cancellation, commitments already made to suppliers, and the applicable booking agreement."),
        p("Where a booking has specific cancellation or refund conditions, those conditions should be communicated before the customer commits to the booking."),
        p("If Hillshome Tours must cancel or materially change a confirmed service, we will inform the customer as soon as reasonably practicable and discuss an appropriate alternative, rescheduling, or refund in accordance with the booking agreement and applicable law."),
        p("Nothing in these Terms & Conditions removes any consumer rights that cannot legally be excluded."),
      ],
    },
    {
      heading: "7. Customer Responsibilities",
      blocks: [
        p("Customers agree to:"),
        ol([
          "Provide accurate and complete booking information.",
          "Arrive at the agreed pickup point or service location on time.",
          "Follow reasonable safety instructions from authorised staff and service providers.",
          "Treat company staff, drivers, guides, other customers, and property respectfully.",
          "Inform us in advance of relevant accessibility needs or special requirements.",
          "Obtain any personal travel documents, permits, or authorisations required for their journey.",
          "Pay agreed charges according to the applicable payment terms.",
          "Avoid unlawful, unsafe, abusive, or disruptive conduct during our services.",
        ]),
        p("Customers may be responsible for additional costs or losses resulting from inaccurate information, failure to attend, or a breach of agreed terms, to the extent permitted by applicable law."),
      ],
    },
    {
      heading: "8. Tours and Travel Services",
      blocks: [
        p("Tour itineraries, destinations, activities, and schedules may be affected by weather, road conditions, park regulations, supplier availability, safety considerations, or other circumstances outside our reasonable control."),
        p("We will make reasonable efforts to deliver the agreed itinerary. Where necessary, we may adjust arrangements for safety, operational, or legal reasons and communicate material changes to affected customers."),
        p("Customers are responsible for following applicable destination rules and the instructions of authorised guides, drivers, park staff, and other relevant personnel."),
        p("Travel documents, entry requirements, vaccinations, and other travel formalities remain the customer's responsibility unless we expressly agree in writing to assist with them."),
      ],
    },
    {
      heading: "9. Transportation Services",
      blocks: [
        p("Customers using transportation services must follow safety instructions, use required seat belts, and behave responsibly."),
        p("Pickup times are estimates where traffic, weather, road conditions, or other unforeseen circumstances may cause delays."),
        p("Customers should communicate any changes to pickup arrangements as early as possible. Additional waiting time, route changes, extra stops, or extended service periods may incur additional charges where agreed."),
        p("No customer may require a driver or operator to engage in unlawful or unsafe conduct."),
      ],
    },
    {
      heading: "10. Construction, Cleaning, Maintenance, and Technical Services",
      blocks: [
        p("The scope, specifications, materials, project milestones, fees, and completion dates for construction, cleaning, maintenance, IT, multimedia, or other contracted work will be set out in the relevant quotation or written agreement."),
        p("Customers should provide reasonable access to the worksite, premises, systems, or equipment where necessary and ensure that they are authorised to request the work."),
        p("Changes to the agreed scope may affect the price, schedule, or completion date and should be approved by the relevant parties."),
        p("Any warranties, maintenance commitments, deliverables, and acceptance criteria will be governed by the applicable written agreement and applicable law."),
      ],
    },
    {
      heading: "11. Website Use",
      blocks: [
        p("You agree to use our website lawfully and responsibly."),
        p("You must not:"),
        ul([
          "Use the website for fraudulent, unlawful, or harmful activities.",
          "Attempt to gain unauthorised access to our systems, accounts, or data.",
          "Introduce malicious software or interfere with website security.",
          "Submit false booking requests or impersonate another person.",
          "Copy, reproduce, or commercially exploit protected website content without permission, except where permitted by law.",
        ]),
        p("We may restrict access to website features where reasonably necessary to protect our systems, users, or business, subject to applicable law."),
      ],
    },
    {
      heading: "12. Intellectual Property",
      blocks: [
        p("Unless otherwise stated, the content on our website, including text, logos, branding, photographs, graphics, designs, and other materials, belongs to Hillshome Tours Company LTD or is used with permission."),
        p("You may view and use this content for personal, informational purposes. You must obtain appropriate permission before reproducing, modifying, distributing, or commercially using protected content, except as permitted by law."),
      ],
    },
    {
      heading: "13. Third-Party Providers",
      blocks: [
        p("Certain services may involve third-party suppliers, including accommodation providers, transport partners, activity operators, payment providers, and other service providers."),
        p("Where third parties are involved, their own terms and conditions may also apply. We will make reasonable efforts to communicate material conditions relevant to your booking."),
        p("Our responsibility for third-party services will be determined by the booking agreement and applicable law. Nothing in these Terms & Conditions excludes liability that the law does not permit us to exclude."),
      ],
    },
    {
      heading: "14. Liability and Limitations",
      blocks: [
        p("Hillshome Tours will use reasonable care in providing services in accordance with the applicable agreement."),
        p("To the extent permitted by law, we are not responsible for delays, interruptions, or failures caused by circumstances beyond our reasonable control, including severe weather, road closures, government restrictions, supplier failures, or emergencies."),
        p("Nothing in these Terms & Conditions excludes or limits liability for fraud, wilful misconduct, negligence where liability cannot legally be excluded, death or personal injury where the law prohibits exclusion, or any other liability that cannot lawfully be limited."),
        p("Customers remain responsible for their own conduct and for complying with applicable safety instructions."),
      ],
    },
    {
      heading: "15. Force Majeure",
      blocks: [
        p("Neither party will be considered in breach solely because it is prevented or materially delayed from performing an obligation by an event beyond its reasonable control, such as natural disasters, severe weather, public emergencies, government restrictions, civil disturbances, or major transport disruptions."),
        p("The affected party should notify the other party as soon as reasonably practicable. The parties will discuss reasonable steps to minimise the effects and, where appropriate, reschedule the service or apply the relevant cancellation and refund terms."),
      ],
    },
    {
      heading: "16. Privacy",
      blocks: [
        p("We handle personal information in accordance with our Privacy Policy and applicable data protection laws."),
        p("By submitting personal information through our website or when requesting our services, you acknowledge that the information may be used for the purposes explained in our Privacy Policy."),
        p("Please read the Privacy Policy available on our website for further details."),
      ],
    },
    {
      heading: "17. Complaints and Dispute Resolution",
      blocks: [
        p("If you have a concern about a booking or service, please contact Hillshome Tours with a description of the issue and any relevant booking or payment reference."),
        p("We will make reasonable efforts to review complaints and resolve them fairly."),
        p("Where a dispute cannot be resolved through direct communication, the parties may pursue the dispute resolution procedures available under applicable law."),
      ],
    },
    {
      heading: "18. Applicable Law",
      blocks: [
        p("These Terms & Conditions are subject to the laws of the Republic of Rwanda, to the extent applicable."),
        p("Any dispute will be handled by a competent court or other authorised dispute resolution body in accordance with applicable law."),
      ],
    },
    {
      heading: "19. Changes to These Terms",
      blocks: [
        p("We may update these Terms & Conditions from time to time to reflect changes in our services, operations, or legal obligations."),
        p("The updated version will be published on our website with a revised effective date where appropriate. Changes will not override any specific written agreement or mandatory legal rights applicable to an existing booking."),
      ],
    },
    {
      heading: "20. Contact Information",
      blocks: [
        p("For bookings, service enquiries, complaints, or questions concerning these Terms & Conditions, contact:"),
        p("Hillshome Tours Company LTD"),
        ul([
          "Telephone: +250 788 423 341",
          "Email: Siboisaie78@gmail.com",
          "Address: Inyarurembo, Rwanda",
        ]),
      ],
    },
  ],
  closing: ["Thank you for choosing Hillshome Tours Company LTD.", "Dream • Explore • Discover"],
};

export const LEGAL_DOCS: Record<LegalDocument["slug"], LegalDocument> = {
  privacy: PRIVACY_DOC,
  terms: TERMS_DOC,
};
