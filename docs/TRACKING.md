# Leads, tracking and the Meta Pixel

How enquiries reach the clinic, what each lead carries, and how to test the Pixel. The environment variables are listed in `.env.example`. Set them in `.env.local` for development and in Vercel for each deployment.

## What a lead carries

Every successful enquiry becomes one flat record with these fields:

- `lead_id`, `received_at`, `clinic`, `concern_page`
- the form fields: `name`, `mobile` (normalised to 07…), `email`, `concern`, `treated_before`, `start_when`
- `ad_group` (from `?h=`), `page`, `landing_page`
- `gclid`, `fbclid`, `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`

Tracking is read from the landing URL and kept for the whole visit in `sessionStorage`, so it survives reloads. A new ad click in the same visit replaces the older values.

The form and the Server Action share one Zod schema (`lib/enquiry-schema.ts`). The browser shows mistakes instantly, and the server checks again before anything is sent.

## Where leads go

Set `LEAD_DESTINATIONS` to `email`, `webhook`, or `email,webhook`. A lead counts as delivered if at least one destination accepts it, and failures are logged by lead ID only, never with personal details.

If nothing is configured in production, the form shows "We couldn't send your enquiry… call the clinic" rather than dropping the lead. In development, an unconfigured form accepts the lead without sending it.

### Email (Resend)

1. Create a Resend account and verify the sending domain (for example `send.clinic-domain.co.uk`).
2. Set `RESEND_API_KEY`, `LEAD_EMAIL_FROM` (on that verified domain) and `LEAD_EMAIL_TO` (comma-separated for several inboxes).
3. Each email has the call-back number in its first line and replies go to the patient's email when they gave one. A per-lead idempotency key means a retry never sends the same lead twice.

To test without emailing anyone real, set `LEAD_EMAIL_TO=delivered@resend.dev`.

### Google Sheet (via the webhook)

1. Create a sheet whose first row is the field names listed above, in any order.
2. Open Extensions → Apps Script and paste:

   ```js
   const SECRET = "same value as LEAD_WEBHOOK_SECRET"

   function doPost(e) {
     const lead = JSON.parse(e.postData.contents)
     // Apps Script can't read request headers, so the secret also travels
     // as ?key= on the web app URL
     if (SECRET && e.parameter.key !== SECRET) {
       return ContentService.createTextOutput("forbidden")
     }
     const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0]
     const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0]
     sheet.appendRow(headers.map((h) => lead[h] ?? ""))
     return ContentService.createTextOutput("ok")
   }
   ```

3. Deploy → New deployment → Web app. Execute as: Me. Who has access: Anyone.
4. Set `LEAD_WEBHOOK_URL` to the web app URL plus `?key=<secret>`, and `LEAD_WEBHOOK_SECRET` to the same secret.

### GoHighLevel

1. In GHL, create a Workflow with the **Inbound Webhook** trigger and copy its URL.
2. Set `LEAD_WEBHOOK_URL` to that URL and submit one test enquiry, so GHL can read the fields.
3. Map the fields to the contact (name, mobile → phone, email) and add the UTM, GCLID and fbclid values to custom fields, then build the follow-up steps (assign a nurse, SMS, pipeline stage).

To send email *and* log to a sheet or GHL, use `LEAD_DESTINATIONS=email,webhook`. For more than one webhook target, point the webhook at Zapier or Make and fan out from there.

## Cookie consent and the Meta Pixel

- The banner (`components/consent.tsx`) offers **Reject** and **Accept** as equal buttons. Nothing that tracks loads before Accept.
- The choice is stored in `localStorage` for about six months.
- **Cookie settings** at the foot of the page reopens the banner. Rejecting after accepting tells the Pixel to revoke consent.
- With `NEXT_PUBLIC_META_PIXEL_ID` set (digits only) and consent given, the Pixel loads and sends **PageView**.
- A successful enquiry sends **Lead** with `content_name` set to the concern and `eventID` set to the lead ID. That ID is also in the lead record, so a later server-side (Conversions API) event can be de-duplicated against it.
- `META_DOMAIN_VERIFICATION` adds the `facebook-domain-verification` meta tag that Business Manager asks for.

The Results block can also be hidden for Meta traffic (any `utm_source` of facebook, fb, instagram, ig or meta, or an `fbclid`) by setting `hideResultsForMeta: true` in the concern's content file. The proxy then serves a prebuilt version without it.

## Testing the Pixel

### Meta Pixel Helper (Chrome extension)

1. Install **Meta Pixel Helper** from the Chrome Web Store.
2. Open the live page, for example `https://<clinic-subdomain>/skin-laxity?h=jawline&utm_source=facebook`.
3. Before choosing in the banner, the helper should find **no pixel**. That proves consent gating works.
4. Click **Accept**. The helper should show your Pixel ID with **PageView**.
5. Submit the form with test details. The helper should add **Lead**, showing the event ID and `content_name`.
6. Click **Cookie settings** then **Reject**, and reload. The helper should find no pixel again.

### Events Manager → Test events

1. In Meta Events Manager, open the Pixel (data source) and go to **Test events**.
2. Under **Confirm your website's events are set up correctly**, enter the page URL and click **Open website**. That opens the page in a tagged session.
3. Accept cookies in the banner. **PageView** should appear in Test events within a few seconds.
4. Submit a test enquiry. **Lead** should appear, with the event ID matching the lead ID in the email, sheet or GHL record.
5. Use obviously fake details and delete the test leads afterwards. Test events don't affect live reporting.

If nothing shows, check the following:

- `NEXT_PUBLIC_META_PIXEL_ID` was set before the build. It is baked in at build time, so redeploy after changing it.
- The ID is digits only.
- An ad blocker isn't blocking `connect.facebook.net`.
- You clicked Accept in this browser.
