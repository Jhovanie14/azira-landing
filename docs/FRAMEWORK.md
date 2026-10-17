# Landing Page Framework

Source: `docs/framework.pdf` (Boost My Customers · Landing Page Framework).

A clinic landing page for paid ads has one job: turn a paid click into a qualified enquiry. Each page covers one concern. Every block below earns its place. The framework was built first for Amer Clinic (Skin Laxity and Glowing Skin) and is the starting point for every clinic.

The fields each block needs are listed in [CONTENT-MODEL.md](./CONTENT-MODEL.md).

## Page at a glance

| #   | Block                              | Desktop surface              | Mobile                                     |
| --- | ---------------------------------- | ---------------------------- | ------------------------------------------ |
| 1   | Slim header, no menu               | Dark band                    | Logo and phone                             |
| 2   | Headline matches the ad            | Dark hero over clinic photo  | Headline, single Book button               |
| 3   | Form in the first screen           | Right column of the hero     | Directly under the hero                    |
| 4   | Credentials up front, tracking hidden | Row under the hero buttons | 2 credentials under the Book button        |
| 5   | Trust strip                        | Light, grey logos            | Light strip                                |
| 6   | Educate on the concern             | Light, 4 cards in a row      | 4 cards stacked                            |
| 7   | Options with honest specs and prices | Dark band, 2 cards side by side | 2 dark cards stacked                    |
| 8   | Who it suits, and when we say no   | Light, two columns           | One card                                   |
| 9   | The clinician, by name and face    | Tinted band, portrait left   | Portrait, then text                        |
| 10  | Real results, page only (optional) | Light, 3 before/after pairs  | Swipe carousel                             |
| 11  | What happens next                  | Light, 4 steps in a row      | 4 steps stacked                            |
| 12  | FAQs that answer objections        | Light, accordion             | Accordion                                  |
| 13  | One last ask                       | Dark band, centred           | Dark card                                  |
| 14  | Call and Book stay fixed on screen | Not shown                    | Fixed Call / Book bar                      |

"Dark band or photo" and "content block" are the two surface types in the PDF's legend. Dark bands mark the high-intent moments: the first screen, the prices, and the closing ask.

## The blocks

### 1. Slim header, no menu

**Contains:** the logo on the left and "Call the clinic · [phone]" on the right. Nothing else.

**Why it converts:** a full site menu gives a paid visitor a dozen ways to leave the page we paid to bring them to.

### 2. Headline matches the ad

**Contains:** an eyebrow line (concern · location), the headline, a short supporting paragraph, and two buttons: **Book consultation** and **Call**. The hero sits on a dark band with the clinic's own treatment photo behind it.

**Why it converts:** someone who searched "neck tightening" lands on "neck tightening". The headline changes by ad group, so the visitor knows within a second that they're in the right place.

**Amer example:** "Firmer-looking skin that still looks like you".

### 3. Form in the first screen

**Contains:** an enquiry form titled "Tell us about your concern", with six fields:

1. Name
2. Mobile
3. Email
4. Concern
5. Qualifying question: have you been treated before?
6. Qualifying question: when do you want to start?

Then a **Request consultation** submit button. On desktop the form is the right-hand column of the hero. On mobile it sits directly under the hero, and the hero's Book button jumps to it.

**Why it converts:** the clinic knows who they're calling before they pick up the phone.

### 4. Credentials up front, tracking hidden

**Contains:** four proof points in a row under the hero buttons (two on mobile). The form also carries hidden fields for **GCLID**, **UTM parameters** and **page**.

**Why it converts:** credentials build trust at the moment of decision. The hidden fields record the ad, keyword and page, so every enquiry can be traced to a booking.

### 5. Trust strip

**Contains:** an "As featured in" strip of press logos, awards or reviews, shown in grey.

**Why it converts:** it borrows credibility right after the first screen, before we ask anyone to read.

### 6. Educate on the concern

**Contains:** the eyebrow "What has changed", a headline that explains the cause rather than the treatment, a short intro, and four numbered cause cards (01–04).

**Why it converts:** it positions the clinic as the expert and explains why diagnosis comes before treatment, which is what high-value patients respond to.

**Amer example:** the four causes are bone, fat pads, ligaments and skin.

### 7. Options with honest specs and prices

**Contains:** the eyebrow "Where a plan can lead" and **two treatments at most**. Each card shows sessions, downtime, results, who it's best for, and a "from £" price.

**Why it converts:** prices filter out bargain-hunters before they enquire, so the clinic calls fewer wrong leads.

### 8. Who it suits, and when we say no

**Contains:** the eyebrow "Who it suits", a "You're a good fit if" list, and a separate "When we say no" panel.

**Why it converts:** saying who the treatment isn't for builds more trust than any claim, and it pre-qualifies. Patients rule themselves in or out before they fill in the form.

### 9. The clinician, by name and face

**Contains:** a real portrait, the eyebrow "Your clinician", their name and qualifications, their philosophy in their own words, and three facts: qualification, role and years of experience.

**Why it converts:** people book a person, not a machine. Most clinic pages bury this at the bottom.

### 10. Real results, page only (optional)

**Contains:** the eyebrow "Results", up to three before/after pairs (a swipe carousel on mobile), and a caption on each: treatment · sessions · time between photos · "results vary".

**Rules:** photos must be consented, unretouched and typical, with a caption. They appear on the page only, never in the ads themselves, and never for prescription-only treatments. The block can be hidden for Meta traffic if needed.

**Why it converts:** real, typical results from the clinic's own patients are the strongest proof it can offer.

### 11. What happens next

**Contains:** the eyebrow "What happens when you visit" and four steps from enquiry to decision, ending with "no pressure to book on the day".

**Why it converts:** it takes the fear out of the first appointment.

### 12. FAQs that answer objections

**Contains:** the eyebrow "Questions before you book" and an accordion of the questions the clinic hears on every call: downtime, pain, cost, "will I look different?", "is it right for my skin tone?".

**Why it converts:** the objections are answered before the call.

### 13. One last ask

**Contains:** the address and location, a closing headline, a short line of copy, and the same two buttons as the hero: **Book consultation** and **Call**.

**Why it converts:** it repeats the two actions for people who read everything. Both buttons go back to the form at the top, never to a separate contact page.

### 14. Call and Book stay fixed on screen (mobile)

**Contains:** a bar fixed to the bottom of the screen on mobile, with **Call** and **Book** side by side (Book is the dark, primary button).

**Why it converts:** the two actions are always one tap away, however far down the page someone has scrolled.

## Mobile order

The mobile page keeps the same order in a single column:

1. Header: logo, phone
2. Hero: concern · location, headline, Book consultation, 2 credentials
3. Enquiry form ("tap Book to jump here"), Request consultation
4. Trust strip
5. What has changed: 4 cards stacked
6. Treatment A · from £, Treatment B · from £, stacked
7. Who it suits · when we say no
8. Clinician portrait and bio
9. Results: swipe
10. 4 steps, stacked
11. FAQs
12. Closing ask
13. Fixed Call / Book bar, on screen throughout

## Rules

### Always

- One page per concern.
- The clinic's own photography.
- Loads in under 2 seconds.
- Every enquiry tagged with its ad.

### Never

- A site menu.
- Discounts or countdown timers.
- Stock photos.
- A booking button that leaves the page.

### We measure

- Enquiries per click.
- The share of enquiries that fit.
- Consultations attended.
- Treatment value against ad spend.
