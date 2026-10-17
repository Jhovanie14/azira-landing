import type { ConcernPageInput } from "../schema"

// DRAFT COPY for the skin laxity page, written for review by the clinic.
// Treatment specs are typical figures and must be confirmed; prices,
// names and credentials stay bracketed until the clinic supplies them.
export const skinLaxity = {
  slug: "skin-laxity",
  concern: "Skin laxity",
  showResults: true,
  hideResultsForMeta: false,
  meta: {
    title: "Skin laxity treatment in Newport | Azira Aesthetics",
    description:
      "Nurse-led skin tightening in Newport. We start with why your skin has loosened, then show you honest options and prices.",
  },
  hero: {
    defaultHeadline: "Firmer skin starts with knowing why it loosened",
    intro:
      "Our award-winning nurses assess every layer of your face first, then show you honest options and prices.",
    headlines: [
      {
        adGroup: "neck-tightening",
        headline: "Neck tightening that starts with knowing why",
        intro:
          "Our award-winning nurses assess why your neck has loosened before suggesting anything, then show you honest options and prices.",
        concernOption: "Neck",
      },
      {
        adGroup: "jawline",
        headline: "A sharper-looking jawline, without looking done",
        intro:
          "Our award-winning nurses assess what has changed along your jaw first, then show you honest options and prices.",
        concernOption: "Jowls or jawline",
      },
      {
        adGroup: "skin-tightening",
        headline: "Skin tightening that starts with knowing why",
        concernOption: "Skin laxity",
      },
    ],
    image: {
      id: "hero-still",
      alt: "A nurse in black gloves assessing skin along a patient's jawline",
      note: "Clinic's own treatment shot: gloved hands at the jawline, tight crop",
      caption: "Assessment in clinic · Newport",
    },
  },
  form: {
    title: "Tell us about your concern",
    intro: "A nurse will call you back to talk it through, with no obligation.",
    concernOptions: [
      "Skin laxity",
      "Jowls or jawline",
      "Neck",
      "Fine lines and texture",
      "Something else",
    ],
    treatedBeforeOptions: ["No, first time", "Yes, elsewhere", "Yes, at Azira"],
    startWhenOptions: ["Right away", "1–3 months", "Just looking"],
    submitLabel: "Request consultation",
  },
  causes: {
    heading: "Your skin isn't the only thing that's changed",
    intro:
      "Loose skin is the last of four changes, and the visible one. Treating only the surface is why some results disappoint, so we assess every layer first.",
    items: [
      {
        title: "Skin",
        body: "Collagen and elastin production slows, so skin becomes thinner and less springy.",
      },
      {
        title: "Ligaments",
        body: "The ligaments that anchor skin to the deeper structures loosen, so tissue sits lower.",
      },
      {
        title: "Fat pads",
        body: "The deep fat pads of the cheek shrink and slide down, and the face loses its lift.",
      },
      {
        title: "Bone",
        body: "The facial skeleton slowly loses volume, leaving less structure for everything above it.",
      },
    ],
  },
  treatments: {
    heading: "Where a plan can lead",
    intro:
      "Two options we often recommend for laxity. Your plan may use one, both, or neither, and you'll see exact prices before you decide.",
    items: [
      {
        id: "morpheus8",
        name: "Morpheus8",
        kind: "Radiofrequency microneedling",
        image: {
          id: "treatment-morpheus8",
          alt: "A gloved hand holding the Morpheus8 handpiece",
          note: "Gloved hand with the Morpheus8 handpiece, dark background",
          caption: "Morpheus8 handpiece · Treatment room",
        },
        summary:
          "Radiofrequency microneedling that heats the deeper layers of the skin to stimulate new collagen.",
        sessions: "Usually 3, about 4 to 6 weeks apart",
        downtime: "Redness and swelling for 2 to 3 days",
        results: "Build gradually over around 3 months",
        bestFor: "Mild to moderate laxity along the jaw, lower face and neck",
        fromPrice: null,
        prescriptionOnly: false,
      },
      {
        id: "skin-boosters",
        name: "Skin boosters",
        kind: "Injectable hydration",
        image: {
          id: "treatment-skin-boosters",
          alt: "A gloved hand holding a skin booster syringe",
          note: "Gloved hand with a skin booster syringe, dark background",
          caption: "Skin booster · Treatment room",
        },
        summary:
          "Injectable hyaluronic acid that hydrates from within and improves the skin's firmness and quality.",
        sessions: "Usually 2, about 4 weeks apart",
        downtime: "Small raised marks for 24 to 48 hours",
        results: "Skin looks more hydrated within weeks",
        bestFor: "Crepey, dehydrated or thinning skin on the face and neck",
        fromPrice: null,
        prescriptionOnly: false,
      },
    ],
  },
  suitability: {
    goodFit: [
      "You've noticed early to moderate loosening along your jaw, neck or lower face",
      "You want a gradual change that looks like you on a good day",
      "You can commit to a course of treatment and the aftercare",
      "You're in good general health",
    ],
    whenWeSayNo: [
      "You're pregnant or breastfeeding",
      "You have an active skin infection or open wound in the area",
      "Your laxity would be better served by surgery. We'll tell you honestly and can suggest where to go",
      "A medical condition or medication makes treatment unsafe. We check this at your consultation",
    ],
  },
  clinicianId: 0,
  results: {
    heading: "Real results from our clinic",
    items: [
      {
        kind: "placeholder",
        treatmentId: "morpheus8",
        sessions: "[3 sessions]",
        timeBetweenPhotos: "[12 weeks]",
        note: "Consented before/after: jawline. Across the three, show a range of skin tones",
      },
      {
        kind: "placeholder",
        treatmentId: "morpheus8",
        sessions: "[3 sessions]",
        timeBetweenPhotos: "[12 weeks]",
        note: "Consented before/after: neck. Across the three, show a range of skin tones",
      },
      {
        kind: "placeholder",
        treatmentId: "skin-boosters",
        sessions: "[2 sessions]",
        timeBetweenPhotos: "[8 weeks]",
        note: "Consented before/after: lower face. Across the three, show a range of skin tones",
      },
    ],
  },
  steps: {
    heading: "What happens when you get in touch",
    items: [
      {
        title: "We call you back",
        body: "A nurse rings to understand what you've noticed and answer your first questions.",
      },
      {
        title: "Your consultation",
        body: "A face-to-face assessment of all four layers, your medical history and what you'd like to change. [Consultation fee]",
      },
      {
        title: "Your written plan",
        body: "Your options, the number of sessions and the exact price, in writing to take away.",
      },
      {
        title: "You decide",
        body: "Take your time. There's no pressure to book on the day.",
      },
    ],
  },
  faqs: {
    heading: "Questions before you book",
    items: [
      {
        question: "How much downtime will I need?",
        answer:
          "It depends on the treatment. After Morpheus8 most people have redness and swelling for two to three days. After skin boosters you may see small raised marks for a day or two. We'll plan your sessions around your diary.",
      },
      {
        question: "Does it hurt?",
        answer:
          "We apply a numbing cream before treatment, so most people describe it as warm and prickly rather than painful. Your nurse checks in with you throughout and can pause at any time.",
      },
      {
        question: "How much will it cost?",
        answer:
          "Morpheus8 starts from £[price] and skin boosters from £[price]. Your exact price depends on the area and the number of sessions you need, and you'll have it in writing before you decide anything. [Consultation fee]",
      },
      {
        question: "Will I look different?",
        answer:
          "You should look like yourself, rested and firmer. We aim for gradual change that friends notice without being able to say why, and we'll tell you if a treatment can't give you the result you want.",
      },
      {
        question: "Is it right for my skin tone?",
        answer:
          "Morpheus8 and skin boosters can be used on all skin tones. Darker skin can be more prone to pigmentation changes after some treatments, so we assess your skin carefully and adjust the settings for you.",
      },
      {
        question: "When will I see results?",
        answer:
          "Skin boosters improve hydration within a few weeks. Collagen-building treatments like Morpheus8 work gradually, with results developing over around three months. Results vary from person to person.",
      },
    ],
  },
  closing: {
    headline: "Start with a conversation",
    body: "Tell us what you've noticed. A nurse will call you back, and you'll know your options before you commit to anything.",
  },
} satisfies ConcernPageInput
