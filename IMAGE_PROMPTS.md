# Bhute Hospital Image Generation Brief

## 1. Important Authenticity Rules

The website is for a real medical institution. Generated images must not mislead visitors.

- Use approved reference photographs for Dr. Abhinav Bhute and Dr. Trupti Bhute whenever their faces are visible.
- Do not generate an invented face and label it as either doctor.
- Use identity-preserving image editing or compositing, not text-only generation, for named doctor portraits.
- Obtain each doctor's approval before publishing a generated or edited likeness.
- Do not invent hospital architecture, operating rooms, dental clinics, staff, or installed equipment and present them as documentary photographs.
- Use authentic facility photos when available.
- If a generated facility or technology image is used, treat it as representative editorial imagery and label it appropriately where needed.
- Do not show identifiable patients unless model releases and medical consent are documented.
- Avoid graphic surgery, visible blood, exposed tissue, pain expressions, disability stereotypes, and fear-based imagery.
- Never generate fake testimonials, medical documents, certificates, awards, scan results, brand logos, or device interfaces.

## 2. Recommended OpenRouter Image Models

Pricing was checked in the OpenRouter catalog on **18 October 2026** and may change. OpenRouter lists image-output pricing per image-output token, so final cost varies by resolution and token usage.

### Cheapest listed option

`openai/gpt-5-image-mini`

- Listed image-output rate: approximately **$8 per 1 million image-output tokens**
- Recommended for concept generation, backgrounds, supporting technology imagery, and first drafts

### Low-cost Gemini option

`google/gemini-3.1-flash-lite-image`

- Listed image-output rate: approximately **$30 per 1 million image-output tokens**
- Recommended when reference-image editing and composition quality are more important than minimum cost

Do one low-resolution draft per composition first. Approve framing and authenticity before requesting a high-resolution output. Do not generate five or ten variations automatically.

## 3. Shared Art Direction

Append this art direction to all photographic prompts unless a prompt overrides it:

```text
Premium specialist healthcare editorial photography for a modern Indian hospital in Akola, Maharashtra. Sophisticated, credible, calm, warm and clinically precise. Deep teal and midnight navy environment accents, warm ivory surfaces, extremely restrained champagne-gold details, clean modern medical setting, cinematic but natural directional light, realistic Indian context, refined composition, authentic materials, quiet confidence, generous negative space, true-to-life skin texture, subtle filmic contrast, no artificial plastic skin, no exaggerated luxury, no visual clutter. Photorealistic commercial photography, high dynamic range, accurate anatomy, realistic equipment proportions, no readable brand names or logos.
```

### Universal negative prompt

```text
generic stock photo, cartoon, illustration unless requested, smiling at camera with crossed arms, fake team lineup, western-only hospital context, bright cyan hospital blue, neon green, excessive gradient lighting, cheap clinic interior, luxury hotel lobby, science-fiction equipment, holograms, glowing spine, floating UI, fake text, fake logos, watermark, graphic surgery, blood, open wound, exposed tissue, distressed patient, needles close-up, dramatic illness, anatomy errors, extra fingers, distorted hands, duplicated objects, waxy skin, excessive retouching, shallow decorative healthcare symbolism, stethoscope cliche
```

## 4. Identity Reference Instructions

For prompts containing a named doctor, attach 3-6 approved reference photos:

- Clear front-facing neutral portrait
- Three-quarter view
- Side profile if available
- Full or half-body image showing approximate build
- Photos in even daylight without filters

Add this instruction:

```text
Preserve the identity, facial geometry, skin tone, age, hair, and natural distinguishing features of the person in the supplied reference photographs. This is the same real person, not a lookalike. Keep retouching minimal and realistic. Do not alter age, body shape, facial proportions, or ethnicity. Clothing and setting may change as directed, but identity must remain accurate.
```

If reliable identity preservation is unavailable, use an authentic unedited portrait instead. Never publish a plausible stranger as the doctor.

## 5. Image Inventory

| Filename | Use | Ratio | Suggested master size | Source preference |
|---|---|---:|---:|---|
| `hero-dr-abhinav.webp` | Homepage hero | 16:10 | 2400 x 1500 | Reference-based doctor composite |
| `dr-abhinav-bhute.webp` | Doctor profile | 4:5 | 1600 x 2000 | Reference-based portrait |
| `dr-trupti-bhute.webp` | Dental doctor profile | 4:5 | 1600 x 2000 | Reference-based portrait |
| `technology-endoscopy.webp` | Endoscopy card/banner | 3:2 | 1800 x 1200 | Authentic equipment or representative editorial |
| `technology-navigation.webp` | O-arm/navigation card | 3:2 | 1800 x 1200 | Authentic equipment preferred |
| `technology-ot.webp` | Operating theatre | 3:2 | 1800 x 1200 | Authentic facility preferred |
| `dental-care.webp` | Dental page hero | 3:2 | 1800 x 1200 | Reference-based doctor or representative editorial |
| `orthopaedics-care.webp` | Orthopaedics page hero | 3:2 | 1800 x 1200 | Representative editorial |
| `trauma-care.webp` | Trauma page hero | 3:2 | 1800 x 1200 | Representative editorial |
| `spine-consultation.webp` | Spine page consultation section | 3:2 | 1800 x 1200 | Reference-based doctor scene |
| `hospital-exterior.webp` | Contact/gallery | 3:2 | 1800 x 1200 | Authentic photo only |
| `gallery-01.webp` to `gallery-08.webp` | Gallery | mixed | 1600px long edge | Authentic photos only |
| `og-home.jpg` | Social sharing | 1.91:1 | 1200 x 630 | Approved hero crop with text added in design software |

Do not ask the generator to render typography, hospital names, logos, or credentials. Add all text in HTML or design software afterward.

## 6. Hero Image Prompt

**Filename:** `hero-dr-abhinav.webp`

**Requires:** Approved references of Dr. Abhinav Bhute and confirmation of the pictured setting/equipment.

```text
Create a wide cinematic environmental portrait of the real Dr. Abhinav Bhute using the attached identity references. He is a confident, composed Indian spine surgeon in a premium modern clinical or operating-theatre environment, wearing accurate clean surgical scrubs and a simple surgical cap only if appropriate. Show him from approximately mid-thigh or waist up, positioned in the right 40 percent of the frame and looking slightly toward the camera with calm professional focus, not an exaggerated smile. Leave the left 55 percent clean and dark enough for white website headline text. Include only subtle, realistic endoscopic surgery context in soft focus: a high-definition monitor, controlled theatre lighting, and precise medical equipment, with no visible patient and no active procedure. Deep teal and midnight navy tonal environment, warm skin tones, restrained champagne highlights, premium editorial healthcare campaign, realistic Indian hospital context, natural skin texture, sophisticated directional light, quiet authority, high detail, photorealistic. No text or logos.
```

**Alternative without a doctor reference:**

```text
Wide cinematic premium operating theatre still life for an advanced spine care website. A modern endoscopic surgical monitor and precise minimally invasive instruments arranged in a clean, controlled environment, no people, no patient, no active procedure, no blood. Frame the equipment on the right and preserve generous dark teal negative space on the left for website copy. Realistic technology, subtle warm highlights, midnight navy shadows, restrained editorial healthcare photography, calm and credible, no science-fiction elements, no text, no logos.
```

## 7. Dr. Abhinav Bhute Portrait Prompt

**Filename:** `dr-abhinav-bhute.webp`

**Requires:** Approved identity references.

```text
Create a vertical 4:5 professional editorial portrait of the real Dr. Abhinav Bhute using the attached identity references. He is an Indian spine surgeon photographed in a refined modern consultation environment, wearing a well-fitted white doctor's coat over understated professional clothing or accurate surgical scrubs based on the approved wardrobe reference. Relaxed upright posture, hands natural and anatomically correct, calm direct expression conveying expertise and approachability, minimal smile. Background has architectural depth, warm ivory surfaces, a subtle deep teal panel, soft out-of-focus clinical detail, no readable signage. Soft directional window light with gentle fill, true-to-life skin and fabric texture, refined healthcare branding photography, premium but not ostentatious. Compose with modest negative space around the head and shoulders for responsive cropping. No text, logos, stethoscope pose, or crossed arms.
```

## 8. Dr. Trupti Bhute Portrait Prompt

**Filename:** `dr-trupti-bhute.webp`

**Requires:** Approved identity references.

```text
Create a vertical 4:5 professional editorial portrait of the real Dr. Trupti Bhute using the attached identity references. She is an Indian dental surgeon photographed in a bright, refined modern dental consultation setting, wearing a clean white doctor's coat or approved professional clinical attire. Calm, attentive, confident expression with a natural subtle smile, relaxed upright posture, hands natural and anatomically correct. The background suggests modern dentistry through a softly focused dental light and clean cabinetry without showing brands, fake text, or a patient. Warm ivory palette, restrained deep teal accent, very subtle champagne detail, soft natural directional light, realistic skin texture, premium healthcare editorial photography, composed and patient-friendly rather than stock-like. Allow negative space for responsive crops. No text, logos, oversized dental props, crossed arms, or exaggerated white teeth.
```

## 9. Endoscopic Spine Technology Prompt

**Filename:** `technology-endoscopy.webp`

```text
Close editorial detail of a modern endoscopic spine surgery system in a controlled operating-theatre environment. Emphasise a high-definition monitor displaying an abstract, non-graphic clinical visualization with no patient data, paired with precise minimally invasive instruments on a sterile surface. No patient, no active surgery, no blood, no human tissue. Realistic equipment proportions and cabling, deep teal shadows, warm neutral highlights, quiet clinical precision, premium Indian healthcare campaign photography, enough uncluttered space for a short text overlay, no brand names, no logos, no readable interface text, no futuristic holograms.
```

Use only if the client confirms that this type of equipment represents actual services.

## 10. O-arm Navigation Prompt

**Filename:** `technology-navigation.webp`

Authentic equipment photography is strongly preferred. If representative imagery is approved:

```text
Wide premium editorial photograph of an advanced intraoperative imaging and surgical navigation environment for selected spine procedures. Show a realistic ring-shaped mobile imaging system and navigation monitor in a pristine modern operating theatre, with no patient and no active procedure. Accurate medical scale and engineering, organized cables, restrained lighting, midnight navy and deep teal accents with warm ivory surfaces, sophisticated clinical atmosphere, realistic Indian hospital context, subtle depth, no text, no logos, no futuristic holograms, no unsupported accuracy claims visualized.
```

Do not use this image to imply that a specific branded system is owned by the hospital unless confirmed.

## 11. Modern Operating Theatre Prompt

**Filename:** `technology-ot.webp`

Authentic facility photography is preferred.

```text
Immaculate contemporary operating theatre photographed as premium architectural healthcare editorial, empty room with no patient and no procedure underway. Realistic surgical lights, operating table, monitoring equipment, clean organized surfaces, believable Indian hospital standards, controlled deep teal and warm-white lighting, precise and calm rather than dramatic, balanced symmetrical composition with one subtle asymmetrical detail, realistic materials and dimensions, no text, logos, staff, blood, clutter, sci-fi technology, or exaggerated luxury.
```

## 12. Dental Care Scene Prompt

**Filename:** `dental-care.webp`

**Preferred:** Reference-based scene with Dr. Trupti Bhute, or an authentic clinic photo.

```text
Create a wide premium editorial scene of the real Dr. Trupti Bhute using the attached identity references in a modern dental consultation room. She is explaining preventive dental care to an adult Indian patient seated upright, with both people calm and fully clothed, no active invasive procedure. Show respectful communication and attentive body language. Keep the patient anonymous through a rear three-quarter angle and do not show identifiable records. Clean contemporary dental equipment in soft focus, warm ivory and restrained deep teal palette, natural daylight, realistic skin, credible Indian clinical environment, generous negative space for page heading, no text, logos, exaggerated smiles, oversized tooth props, or graphic close-up of a mouth.
```

If patient consent/model release is unavailable, generate an empty dental environment or a clinician-only scene.

## 13. Spine Consultation Prompt

**Filename:** `spine-consultation.webp`

```text
Create a wide documentary-style consultation scene using the attached identity references for the real Dr. Abhinav Bhute. He is seated beside an adult Indian patient in a modern consultation room, explaining a spinal scan on a monitor with calm, clear body language. The monitor image is generic and non-diagnostic with no names or personal data. The patient is seen from behind or in non-identifying profile and appears comfortable, not distressed. Emphasise listening, explanation, and shared treatment planning rather than surgery. Warm natural light, ivory interior, deep teal accents, premium but authentic Indian healthcare editorial photography, realistic anatomy and hands, no text, logos, fear, promises, or dramatic disease imagery.
```

## 14. Orthopaedics Prompt

**Filename:** `orthopaedics-care.webp`

```text
Premium editorial photograph representing modern orthopaedic assessment in India. A clinician's hands perform a gentle, professional knee mobility assessment for a fully clothed adult patient in a clean consultation or rehabilitation setting. Frame from torso to lower body so no invented named doctor identity is implied. Calm interaction, accurate anatomy, respectful patient positioning, warm ivory and deep teal environment, soft directional light, crisp clinical detail, no pain expression, surgery, needles, blood, sports cliches, fake scan text, logos, or promises of recovery.
```

## 15. Trauma Care Prompt

**Filename:** `trauma-care.webp`

```text
Calm, coordinated orthopaedic trauma care scene in a modern Indian hospital, showing two clinicians preparing a clean forearm support or reviewing a non-identifying X-ray with an adult patient. The patient is stable, fully clothed, and reassured; no open injury, blood, distress, ambulance drama, or emergency panic. Emphasise professional teamwork, careful assessment, and controlled clinical process. Premium documentary healthcare photography, realistic anatomy and equipment, deep teal and warm ivory palette, subtle cinematic depth, no text, logos, or implied 24-hour emergency availability.
```

## 16. Patient Education Illustration Set

For patient education cards, prefer a consistent non-photographic medical illustration system. Generate all seven in one art direction and crop them individually.

```text
Create a sophisticated set of seven minimal editorial medical illustrations about spine health: general back pain, lumbar disc prolapse, sciatica nerve pathway, endoscopic spine surgery concept, unilateral biportal endoscopy concept, clinical decision-making for spine surgery, and guided recovery after spine surgery. Accurate simplified anatomy, non-graphic, warm ivory background, deep teal line work, muted navy structural shapes, extremely restrained champagne-gold highlights, elegant specialist medical journal style, generous negative space, no labels, text, arrows with claims, red pain explosions, cartoon characters, glowing anatomy, or frightening imagery. Consistent perspective, line weight, and color across the set.
```

Have Dr. Abhinav Bhute review anatomy and implied clinical meaning before publication.

## 17. Authentic Hospital Gallery Shot List

These should be photographed, not generated:

1. Exterior at early morning or late afternoon, signage legible
2. Reception from a clean diagonal angle
3. Consultation room without patient information visible
4. Operating theatre when not in use
5. Confirmed endoscopic equipment
6. Confirmed navigation equipment
7. Dental clinic wide view
8. Doctors together in a natural professional setting
9. Staff group only with documented permission
10. Waiting/patient area without identifiable visitors

Photography guidance:

- Shoot horizontal and vertical alternatives
- Keep lights consistent and white balance neutral
- Remove clutter, cables, personal documents, and patient data
- Do not over-stage staff or create fake procedures
- Capture negative space for web overlays
- Obtain property and people releases

## 18. Post-Generation Quality Checklist

Reject an image if any answer is no:

- Does a named doctor accurately match approved references?
- Has the doctor approved the likeness?
- Is every hand, limb, instrument, and cable anatomically/technically plausible?
- Does the image avoid fake text, logos, patient data, and device brands?
- Could a visitor mistakenly believe a generated room is the actual hospital?
- Is every depicted technology confirmed or clearly representative?
- Is there no graphic, frightening, or demeaning medical content?
- Does the composition leave room for responsive crops and website text?
- Does the image fit the deep teal, navy, ivory, and restrained gold system?
- Does it remain credible rather than looking like generic stock photography?

## 19. Export Workflow

1. Generate a low-resolution draft.
2. Check identity, anatomy, equipment, and composition.
3. Obtain doctor/client approval.
4. Generate or upscale only the approved draft.
5. Retouch artifacts without changing identity or clinical meaning.
6. Export a color-correct master.
7. Produce AVIF and WebP responsive sizes at approximately 480px, 768px, 1200px, 1600px, and hero-only 2400px widths where useful.
8. Keep the original approved master outside the public website folder.
9. Record whether each image is authentic photography, reference-based composite, or representative generated imagery.
10. Add accurate alt text based on what the final image actually shows.

Do not place generated text inside images. Website headings, doctor names, CTAs, credentials, and disclaimers must remain live HTML.
