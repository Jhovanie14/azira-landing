import type { ClinicInput } from "../schema"

// Shared across every concern page.
// Phone, address, awards and "NMC-registered nurses" are taken from
// azira-aesthetics.co.uk and need confirming with the clinic. Bracketed
// values are placeholders: never replace them with invented facts.
export const clinic = {
  name: "Azira Aesthetics",
  phone: { display: "01633 258 080", dial: "+441633258080" },
  address: "135 Commercial Street, Newport NP20 1LY",
  location: "Newport",
  credentials: [
    { label: "Best Clinic in Wales 2025", award: true },
    { label: "Registered nurses (NMC)" },
    { label: "Nurse-led clinic" },
    { label: "[Fourth credential]" },
  ],
  consultationFee:
    "[Consultation fee: free, or £X redeemable against treatment]",
  callbackPromise: "[We call back within one working day]",
  awards: [
    "Winner, Best Clinic in Wales 2025",
    "Highly Commended, Best Clinic in Wales 2024",
  ],
  trustLogos: [
    {
      id: "trust-award-2025",
      alt: "[Awards body] 2025",
      note: "Award logo: Best Clinic in Wales 2025",
    },
    {
      id: "trust-award-2024",
      alt: "[Awards body] 2024",
      note: "Award logo: Highly Commended 2024",
    },
    {
      id: "trust-press-1",
      alt: "[Publication]",
      note: "Press or review platform logo",
    },
    {
      id: "trust-press-2",
      alt: "[Publication]",
      note: "Press or review platform logo",
    },
  ],
  clinicians: [
    {
      name: "[Clinician name]",
      qualifications: "[Qualifications]",
      portrait: {
        id: "clinician-portrait",
        alt: "[Clinician name] in the treatment room at Azira Aesthetics",
        note: "Real portrait of the lead nurse, in clinic, natural light",
      },
      philosophy:
        "[Their philosophy in their own words, to be supplied by the clinician. Two or three sentences on how they approach skin laxity and why they start with assessment.]",
      qualification: "[Qualification]",
      role: "[Role]",
      years: "[Years]",
    },
  ],
  privacyNotice: [
    "We use the details you send only to reply to your enquiry and arrange a consultation. We don't add you to marketing lists unless you ask us to.",
    "Your enquiry also records which advert and page brought you here, so we can tell which adverts help people find us. It doesn't identify you on other websites.",
    "While you fill in the form, your answers are kept in this browser tab so they survive a reload. They are cleared when you send the form or close the tab.",
    "With your permission, we use cookies (the Meta Pixel) to see which adverts bring people to this page. They stay off unless you accept, and you can change your choice at any time with Cookie settings at the foot of the page.",
    "We keep enquiry details for [retention period] and then delete them. You can ask us to delete them sooner by calling the clinic.",
    "[Link or summary of the clinic's full privacy policy, to be supplied]",
  ],
} satisfies ClinicInput
