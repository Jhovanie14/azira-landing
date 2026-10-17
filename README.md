# azira-landing

Paid-ads landing pages for clinics, one statically generated page per concern, built to turn a click into a qualified enquiry. The first clinic is Azira Aesthetics.

## Run it

```bash
npm install
cp .env.example .env.local   # then fill in the values you have
npm run dev                  # http://localhost:3000/skin-laxity
```

`npm run build`, `npm run lint` and `npm run typecheck` verify a change. There's no test suite.

## Where things are

- `docs/FRAMEWORK.md`: the 14-block landing page framework every page follows
- `docs/CONTENT-MODEL.md`: the content each concern page needs
- `docs/TRACKING.md`: where leads go, the tracking they carry, consent and the Meta Pixel, and how to test them
- `docs/WORKFLOW.md`: the step-by-step process for each clinic
- `docs/azira-answers.md`: the questions for Azira, pre-filled where known
- `content/<clinic>/`: each clinic's brand, clinic details and concern pages
- `CLAUDE.md`: architecture notes and the hard landing-page rules
