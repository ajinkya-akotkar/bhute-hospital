# Bhute Hospital Website Implementation Plan

## 1. Objective

Build a premium, fast, mobile-first hospital website for **Bhute Hospital, Akola, Maharashtra** that immediately communicates:

- Advanced spine care is the hospital's primary clinical focus.
- Orthopaedics, trauma care, and dental care are also available.
- Dr. Abhinav Bhute leads spine care.
- Dr. Trupti Bhute leads dental care.
- Visitors can quickly call, use WhatsApp, find the hospital, or request an appointment.

The result must feel like a specialist medical institution, not a generic clinic template. Do not invent claims, credentials, statistics, affiliations, equipment ownership, testimonials, or contact information.

## 2. Approved Facts

Use only these supplied facts until the client approves more:

- Name: Bhute Hospital
- Location: Akola, Maharashtra, India
- Services: Endoscopic Spine, Orthopaedics, Trauma, Dental
- Dr. Abhinav Bhute: Spine Surgeon
- Qualifications: MBBS, MS Orthopaedics, Fellowship in Spine Surgery
- Stated interests: Endoscopic Spine Surgery, Unilateral Biportal Endoscopy (UBE), Minimally Invasive Spine Surgery, O-arm Navigation, Complex and Revision Spine Surgery
- Dr. Trupti Bhute: Dental Surgeon
- Qualifications: BDS, MBA
- Focus: Comprehensive and modern dental care

Mark all missing business information with obvious placeholders in source data. Never display invented values to website visitors.

## 3. Recommended Technical Approach

Use a static multi-page website with **HTML5, CSS, and small amounts of vanilla JavaScript**. The current project is empty, so a framework would add cost and complexity without a clear benefit.

Benefits:

- Near-zero hosting cost
- Fast loading and strong Core Web Vitals
- Simple deployment to Cloudflare Pages, Netlify, Vercel, or GitHub Pages
- Easy handoff and maintenance
- Independent SEO metadata for each service page
- No build step required

Do not add React, Tailwind, Bootstrap, jQuery, icon libraries, animation libraries, or a CMS in the first version. Use inline SVG icons and CSS transitions.

## 4. Proposed File Structure

```text
hospital/
|-- index.html
|-- about.html
|-- spine.html
|-- orthopaedics.html
|-- trauma.html
|-- dental.html
|-- doctors.html
|-- technology.html
|-- patient-resources.html
|-- contact.html
|-- privacy.html
|-- terms.html
|-- medical-disclaimer.html
|-- 404.html
|-- assets/
|   |-- css/
|   |   `-- styles.css
|   |-- js/
|   |   `-- main.js
|   |-- images/
|   |   |-- hero-dr-abhinav.webp
|   |   |-- dr-abhinav-bhute.webp
|   |   |-- dr-trupti-bhute.webp
|   |   |-- technology-endoscopy.webp
|   |   |-- technology-navigation.webp
|   |   |-- hospital-exterior.webp
|   |   `-- gallery-*.webp
|   `-- icons/
|       `-- favicon.svg
|-- robots.txt
|-- sitemap.xml
|-- site.webmanifest
|-- IMPLEMENTATION_PLAN.md
`-- IMAGE_PROMPTS.md
```

If only a first client preview is needed, implement `index.html`, the shared assets, and the legal pages first. Add specialty pages in the same visual system immediately afterward.

## 5. Central Content Configuration

At the top of `assets/js/main.js`, store unverified operational information in one configuration object:

```js
const hospital = {
  phone: "",
  whatsapp: "",
  email: "",
  address: "Akola, Maharashtra, India",
  mapUrl: "",
  timings: "",
  emergencyPhone: ""
};
```

Hide actions whose values are empty. Do not render `#`, fake phone numbers, dummy email addresses, or misleading map links. Prefer inserting confirmed details directly into HTML before launch so essential links work without JavaScript.

## 6. Visual System

### Color tokens

Define all colors as CSS custom properties:

```css
:root {
  --teal-950: #082f32;
  --teal-900: #0b3d40;
  --teal-700: #17666a;
  --navy-950: #0b1830;
  --gold-500: #b99657;
  --gold-300: #d6bf91;
  --ivory-50: #faf8f2;
  --ivory-100: #f2eee4;
  --white: #ffffff;
  --charcoal: #202628;
  --muted: #667274;
  --line: rgba(11, 61, 64, 0.15);
}
```

Use dark teal and midnight navy as structural colors, ivory as the dominant background, and gold only for small dividers, labels, and focus details. Avoid prominent gradients. A very subtle dark overlay on photography is acceptable for legibility.

### Typography

- Display headings: `Cormorant Garamond`, with Georgia as fallback
- Interface and body: `Manrope`, with system sans-serif fallback
- Use local/system fallbacks immediately; if Google Fonts are loaded, use `preconnect` and avoid excessive font weights.
- Body copy: minimum 16px, line height around 1.65
- Avoid all-uppercase body copy. Uppercase is acceptable for short eyebrow labels.

### Layout

- Content width: 1200-1280px
- Reading width: 680-760px
- Section spacing: 96-140px desktop, 64-88px mobile
- Use restrained square or lightly rounded geometry, not pill-shaped cards everywhere.
- Use asymmetrical editorial compositions, thin rules, large numerals, and intentional negative space.

## 7. Shared Components

Implement these once and reuse their markup and classes consistently:

1. Accessibility skip link
2. Announcement/location strip
3. Sticky desktop navigation
4. Accessible mobile navigation with button, `aria-expanded`, Escape handling, focus management, and body scroll lock
5. Text logo/wordmark until a client-approved logo exists
6. Primary, secondary, and text-link buttons
7. Section eyebrow, heading, and introduction pattern
8. Specialty cards
9. Doctor profile panel
10. Technology media cards
11. Accordion for patient questions
12. Appointment form
13. Footer
14. Mobile fixed action bar for Call and WhatsApp; hide unavailable actions
15. Reduced-motion-compatible reveal animation

Do not add an autoplay carousel. Do not place critical content inside sliders.

## 8. Homepage Story Sequence

### 8.1 Hero

Above the fold must contain:

- Eyebrow: `Endoscopic Spine | Orthopaedics | Trauma | Dental`
- Wordmark: `BHUTE HOSPITAL`
- Heading: `Advanced Spine & Orthopaedic Care. Comprehensive Trauma & Dental Care.`
- Supporting copy supplied by the client
- Primary CTA: `Book an Appointment`
- Secondary CTA: `Explore Our Specialities`
- `Dr. Abhinav Bhute | Spine Surgeon`
- `Dr. Trupti Bhute | Dental Surgeon`
- Location: `Akola, Maharashtra`
- A high-quality approved hero image with a strong dark overlay and useful focal positioning

Use a split editorial layout on desktop and a layered image/content layout on mobile. Keep the primary CTA visible without scrolling on common mobile screens.

### 8.2 Trust introduction

Heading: `Specialised Care. Personalised Attention.`

Write one concise paragraph explaining specialist-led, technology-supported, personalised care. Add a small set of responsible trust statements, not statistics:

- Specialist-led clinical evaluation
- Minimally invasive options for selected patients
- Coordinated orthopaedic, trauma, and dental care

### 8.3 Specialities

Create four numbered editorial cards in this order:

1. Endoscopic Spine
2. Orthopaedics
3. Trauma and Accident Care
4. Dental Care

Use the supplied service lists. Each card links to a dedicated page. Make spine visually dominant through size or layout, not loud color.

### 8.4 Dr. Abhinav Bhute

Use a large approved portrait, credentials, a short factual biography, and six expertise points. Do not describe experience duration, case volume, outcomes, or awards unless supplied and verified.

Suggested biography:

> Dr. Abhinav Bhute is a spine surgeon with training in orthopaedics and fellowship training in spine surgery. His clinical interests include endoscopic and minimally invasive techniques, UBE, navigation-supported procedures, and the assessment of complex and revision spine conditions. Treatment recommendations are based on individual clinical evaluation, imaging, and patient needs.

### 8.5 Technology

Use four large visual cards:

- Endoscopic Spine Surgery
- O-arm Navigation
- Advanced Endoscopic Systems
- Modern Operating Theatre

Use careful wording such as `supports`, `for selected procedures`, and `where clinically appropriate`. Before launch, confirm which technology is actually available at Bhute Hospital. If not confirmed, present these as areas of clinical approach rather than owned equipment.

### 8.6 Dr. Trupti Bhute

Use a separate lighter section with her approved portrait, credentials, and concise factual introduction. Link to dental services.

Suggested introduction:

> Dr. Trupti Bhute is a dental surgeon focused on comprehensive, modern dental care. Her approach emphasises careful assessment, clear communication, preventive care, and treatment planning suited to each patient's needs.

### 8.7 Why Bhute Hospital

Six points with restrained inline SVG line icons:

- Specialist-led Care
- Advanced Technology
- Minimally Invasive Expertise
- Patient-Centred Treatment
- Integrated Orthopaedic and Trauma Care
- Comprehensive Dental Care

### 8.8 Spine centre feature

Heading: `Centre for Advanced Endoscopic Spine Care`

Use the supplied responsible introduction and condition list. Do not claim formal `Centre of Excellence` accreditation. CTA: `Talk to a Spine Specialist`.

### 8.9 Patient journey

Four-step horizontal path on desktop and vertical path on mobile:

1. Consultation
2. Imaging and Assessment
3. Personalised Treatment
4. Recovery and Follow-up

### 8.10 Patient education

Show the seven supplied topics. Link each card to an anchored article in `patient-resources.html` until separate articles are warranted. Articles must say when urgent evaluation may be necessary and must not diagnose readers.

### 8.11 Testimonials

Do not create testimonial text. Render a tasteful holding state only in preview builds:

> Patient experiences will be published only with appropriate consent.

Remove the entire section for production until approved testimonials are supplied.

### 8.12 Gallery

Use an accessible CSS grid that becomes masonry-like through varied spans. Every image needs descriptive alt text. Do not publish generated images as documentary photographs of the actual hospital. Label representative illustrations clearly or wait for authentic photography.

### 8.13 Appointment

Fields:

- Name
- Mobile number
- Speciality
- Preferred date
- Message
- Consent checkbox

Add this notice below the message field:

> Please do not share sensitive medical information through this form. Appointment requests are confirmed only after the hospital team contacts you.

The form must not pretend to submit successfully. Connect it to an approved endpoint before launch. Until then, disable production submission and display a clear contact alternative.

### 8.14 Contact and footer

Show only verified address, phone, WhatsApp, email, hours, emergency contact, map, and social links. Embed Google Maps only after receiving the exact location URL. Add Privacy, Terms, and Medical Disclaimer pages.

## 9. Individual Pages

### `spine.html`

- SEO focus: Endoscopic Spine Surgeon in Akola; Endoscopic Spine Surgery in Akola; Spine Surgeon in Akola
- Explain consultation, diagnosis, conservative options, endoscopy, UBE, minimally invasive approaches, navigation, and complex/revision assessment
- Make clear that suitability depends on clinical assessment
- Include spine warning signs that warrant prompt or urgent medical evaluation, reviewed by the doctor before publishing
- CTA to request a spine consultation

### `orthopaedics.html`

- SEO focus: Orthopaedic Hospital in Akola
- Cover joint, fracture, sports injury, arthritis, shoulder, knee, musculoskeletal, and rehabilitation services
- Avoid implying all listed procedures are always available

### `trauma.html`

- SEO focus: Trauma Hospital in Akola; Orthopaedic Trauma Care in Akola
- Explain fracture and musculoskeletal injury pathways
- Do not imply 24/7 emergency availability unless confirmed
- Clearly separate emergency guidance from appointment requests

### `dental.html`

- SEO focus: Dental Hospital in Akola; Dental Care in Akola
- Cover preventive, restorative, root canal, crowns and bridges, cosmetic, children's, and hygiene care
- Avoid guarantees about pain, permanence, or cosmetic outcomes

### `doctors.html`

- Factual profiles for both doctors
- Use only supplied qualifications and areas of interest
- No unsupported membership, awards, publications, years of experience, or procedure counts

### `technology.html`

- Explain technology in patient-friendly language
- State that the choice of technique depends on diagnosis and clinical assessment
- Confirm availability and ownership before describing a named system as hospital equipment

### `patient-resources.html`

Create accessible educational sections for:

- What causes back pain?
- What is a slipped disc?
- When does sciatica need surgery?
- What is endoscopic spine surgery?
- What is UBE?
- When is spine surgery necessary?
- Recovery after spine surgery

Each section should be concise, non-diagnostic, and medically reviewed before production launch.

## 10. SEO Requirements

For every page:

- Unique `<title>` under approximately 60 characters
- Unique meta description under approximately 160 characters
- One descriptive `<h1>`
- Logical heading hierarchy
- Canonical tag after the final domain is known
- Open Graph and Twitter metadata
- Meaningful internal links
- Descriptive image filenames and alt text
- `lang="en-IN"`
- Visible Akola location context where natural
- No keyword stuffing

Add JSON-LD using the most accurate verified schema type. Start with `Hospital` only if the organization information is verified. Include known name, locality, region, country, and doctors. Do not include ratings, price range, geo coordinates, phone, opening hours, or social URLs until confirmed.

Create `robots.txt` and `sitemap.xml` only after the production domain is known. Do not ship placeholder domains in canonical tags or sitemap URLs.

## 11. Accessibility Requirements

- Target WCAG 2.2 AA
- Semantic landmarks and heading order
- Skip link
- Keyboard-accessible menus, forms, accordions, and dialogs
- Visible focus states using more than color alone
- Minimum 44px touch targets for key mobile actions
- Sufficient color contrast
- Form labels always visible
- Useful validation messages associated with fields
- Decorative images use empty alt text; informative images have concise descriptive alt text
- Honor `prefers-reduced-motion`
- Do not reveal essential content only on hover
- Avoid autoplay video; if video is later added, default muted, include controls, poster, and reduced-motion fallback

## 12. Performance Requirements

- Convert photos to AVIF and WebP, retaining an optimized original only if necessary
- Hero image target: below 250-350KB where quality permits
- Other images target: below 120-180KB each
- Provide explicit width and height attributes
- Use `srcset` and `sizes`
- Preload only the hero image and critical font resource
- Lazy-load below-the-fold images
- Keep JavaScript below 20KB uncompressed where practical
- Avoid render-blocking third-party scripts
- Use a static map preview linked to Google Maps instead of loading an iframe immediately, if possible
- Target Lighthouse scores of at least 90 in Performance, Accessibility, Best Practices, and SEO on a production-like preview

## 13. Motion and Interaction

- Use a 180-300ms transition range
- Use opacity and transform only for reveal effects
- Trigger reveal effects once with `IntersectionObserver`
- Do not animate every card
- Add subtle image scale on hover for pointer devices only
- Add understated underline movement for text links
- Keep navigation and CTA feedback immediate
- Disable nonessential motion when `prefers-reduced-motion: reduce`

## 14. Medical and Legal Guardrails

Never publish:

- `best`, `number one`, `leading`, or similar superiority claims without legal support
- Guaranteed outcomes
- `100% success`, `zero risk`, `scarless`, or `painless`
- Invented patient reviews
- Invented statistics, awards, affiliations, accreditations, publications, or technology
- Before/after imagery without consent and required context
- Patient-identifiable information

Use language such as:

- `may be appropriate for selected patients`
- `depending on clinical assessment`
- `treatment options vary between patients`
- `supports precision`
- `where clinically indicated`

Place a footer disclaimer on clinical pages:

> Website information is for general education and does not replace an individual medical consultation. Treatment recommendations vary according to clinical assessment.

Have all clinical copy reviewed and approved by the relevant doctor before launch.

## 15. Responsive Breakpoints

Build mobile-first. Suggested breakpoints:

- Base: 320px and above
- Small tablet: 600px
- Tablet: 768px
- Desktop navigation/layout: 1024px
- Wide desktop: 1280px

Test at 320px, 375px, 768px, 1024px, 1440px, and 1920px. Ensure no horizontal overflow and that fixed mobile controls do not cover form buttons or footer content.

## 16. Implementation Order for a Low-Reasoning Agent

Follow this order exactly:

1. Create folders and shared files.
2. Implement design tokens, reset, typography, buttons, containers, and accessibility utilities in CSS.
3. Build the shared header, navigation, mobile menu, footer, and mobile action bar.
4. Build the complete homepage in the specified sequence.
5. Add responsive CSS and reduced-motion rules.
6. Implement minimal JavaScript for mobile navigation, accordions, reveal effects, and form validation.
7. Create specialty pages by reusing shared styles and components.
8. Create doctor, technology, patient resources, contact, and legal pages.
9. Add per-page metadata and conservative JSON-LD.
10. Add image placeholders with the exact future filenames listed in `IMAGE_PROMPTS.md`.
11. Validate all internal links and keyboard interactions.
12. Run Lighthouse or equivalent audits and fix major issues.

Do not stop after creating only a hero or homepage mockup. Do not replace supplied facts with generated marketing claims.

## 17. Verification Checklist

### Content

- All qualifications exactly match supplied information
- No fabricated claims or operational details
- `Orthopaedics` spelling is consistent
- UBE is expanded at first mention
- Medical language is conditional and responsible
- Empty client data is hidden, not faked

### Functional

- Every navigation and CTA link works
- Mobile menu works by keyboard and touch
- Escape closes the mobile menu
- Focus returns to the menu button after closing
- Form fields have labels and useful errors
- Form does not claim success without a real backend
- Call and WhatsApp links use verified values
- No JavaScript console errors

### Visual

- Hero communicates specialty, location, doctors, and CTA within five seconds
- Spine care is visually dominant
- Gold is restrained
- Cards do not resemble a generic dashboard grid
- Mobile action bar does not hide content
- Images crop correctly across breakpoints
- Layout remains polished without images loaded

### Technical

- Valid semantic HTML
- No broken asset requests
- No placeholder domain in metadata
- Image dimensions prevent layout shift
- Only necessary scripts and fonts load
- Lighthouse targets are met or deviations documented

## 18. Client Inputs Required Before Production

- Approved logo or confirmation to use a text wordmark
- Professional reference photographs of both doctors
- Authentic hospital and facility photographs
- Confirmation of technology physically available at the hospital
- Exact postal address
- Main phone number
- WhatsApp number and consent to use it
- Appointment email or form endpoint
- Hospital timings
- Emergency service availability and emergency contact, if applicable
- Exact Google Maps location
- Social media URLs
- Approved appointment/privacy wording
- Consent-backed testimonials, if any
- Doctor approval of all clinical content
- Final domain name

## 19. Deployment Plan

1. Push the static files to a dedicated Git repository.
2. Connect the repository to Cloudflare Pages, Netlify, or Vercel.
3. Use the project root as the publish directory; no build command is needed.
4. Deploy to a temporary preview URL.
5. Test forms, links, metadata, mobile layouts, and image loading on the preview.
6. Add the final custom domain and HTTPS.
7. Update canonical URLs, Open Graph URLs, `robots.txt`, and `sitemap.xml` with the production domain.
8. Submit the sitemap to Google Search Console after launch.

## 20. Economical OpenRouter Model Recommendation

Pricing below was checked against the OpenRouter model catalog on **18 October 2026** and may change.

### Primary implementation model

Use `z-ai/glm-5.3-flash` with low reasoning.

- Input: approximately **$0.048 per 1 million tokens**
- Output: approximately **$0.20 per 1 million tokens**
- Best current value for this type of website implementation
- Give it this complete plan and instruct it to work through the implementation order without redesigning the requirements

### Dedicated coding alternative

Use `qwen/qwen3-coder-30b-a3b-instruct`.

- Input: approximately **$0.07 per 1 million tokens**
- Output: approximately **$0.28 per 1 million tokens**
- Appropriate when a coder-specific model is preferred

### More reliable fallback

Use `qwen/qwen3-coder-next` only if the cheapest pass needs structural or JavaScript correction.

- Input: approximately **$0.12 per 1 million tokens**
- Output: approximately **$0.80 per 1 million tokens**

### Suggested workflow

1. Run one implementation pass with `z-ai/glm-5.3-flash`.
2. Test the output before asking for revisions.
3. Send only concrete bugs and visual issues back to the same model.
4. Use `qwen/qwen3-coder-next` for one focused repair pass only if required.
5. Avoid parallel versions and broad `make it better` prompts because they waste budget.

Even a large static-site run should remain comfortably within the stated $5 token budget at these rates, but tool overhead, retries, provider routing, and future pricing are variable.

## 21. Handoff Prompt for the Coding Agent

Use this prompt with the selected coding model:

```text
Implement the complete Bhute Hospital website described in IMPLEMENTATION_PLAN.md.

Work directly in the current project. The folder currently has no website implementation. Use semantic HTML5, one shared CSS file, and minimal vanilla JavaScript. Follow the file structure, page requirements, approved facts, medical guardrails, accessibility requirements, responsive behavior, and implementation order exactly.

Use the filenames from IMAGE_PROMPTS.md for image references, but make every section remain polished if images are missing. Do not invent phone numbers, emails, addresses, timings, emergency availability, testimonials, equipment ownership, awards, statistics, qualifications, accreditations, or outcomes. Hide unavailable actions rather than inserting fake values.

Complete all pages, then test navigation, responsive behavior, accessibility interactions, links, console errors, and static deployment readiness. Keep dependencies at zero unless technically unavoidable. Do not stop after a mockup or partial homepage.
```
