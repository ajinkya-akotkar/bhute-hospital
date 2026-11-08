/* ==========================================================================
   Bhute Hospital — Photo gallery data
   --------------------------------------------------------------------------
   HOW TO ADD A NEW PHOTOGRAPH (no HTML/CSS/JS edits needed):

     1. Save the optimized photo (WebP preferred) into site/assets/images/
     2. Add ONE entry to the array below.
     3. Commit and push.

   The photo then appears automatically in BOTH the homepage showcase
   ("Real People. Real Expertise.") and the About page gallery grid.

   Entry format (only src, category and caption are required):

     {
       src: "./assets/images/my-new-photo.webp",
       category: "Conferences",          // or "Clinical Practice" or "Hospital"
       caption: "Short factual caption",
       alt: "Meaningful description for screen readers",
       featured: true,                   // optional: first photo in showcase
       order: 7                          // optional: display position
     }

   Example — adding a conference photo:

     {
       src: "./assets/images/conference-01.webp",
       category: "Conferences",
       caption: "Professional conference participation",
       alt: "Dr. Abhinav Bhute attending a medical conference",
       order: 7
     }

   Keep captions factual. Do not add unverified conference names,
   procedures, qualifications, collaborations or medical claims.
   ========================================================================== */

window.BHUTE_GALLERY = [
	{
		src: "./assets/images/hero-dr-abhinav.webp",
		category: "Clinical Practice",
		caption: "Surgical expertise",
		alt: "Dr. Abhinav Bhute, spine surgeon, at Bhute Hospital",
		featured: true,
		order: 1,
	},
	{
		src: "./assets/images/endoscopy-spine-tower.webp",
		category: "Hospital",
		caption: "Tech",
		alt: "Endoscopy tower with high-definition surgical monitor and camera system",
		order: 2,
	},
	{
		src: "./assets/images/actual_sur_1.jpeg",
		category: "Clinical Practice",
		caption: "Surgery in progress",
		alt: "Surgical procedure in progress at Bhute Hospital",
		order: 3,
	},
	{
		src: "./assets/images/scrubs.jpeg",
		category: "Clinical Practice",
		caption: "OT Scrubs",
		alt: "Operating theatre scrubs at Bhute Hospital",
		order: 4,
	},
	{
		src: "./assets/images/conference1.jpeg",
		category: "Conferences",
		caption: "Professional conference participation",
		alt: "Dr. Abhinav Bhute at a professional medical conference",
		order: 7,
	},
	{
		src: "./assets/images/conference2.jpeg",
		category: "Conferences",
		caption: "Professional conference participation",
		alt: "Dr. Abhinav Bhute attending a professional medical conference",
		order: 8,
	},
	{
		src: "./assets/images/conference3.jpeg",
		category: "Conferences",
		caption: "Professional conference participation",
		alt: "Participation in a professional medical conference",
		order: 9,
	},
	{
		src: "./assets/images/conference4.jpeg",
		category: "Conferences",
		caption: "Professional conference participation",
		alt: "Participation in a professional medical conference",
		order: 10,
	},
	{
		src: "./assets/images/conference5.jpeg",
		category: "Conferences",
		caption: "Professional conference participation",
		alt: "Attendance at a professional medical conference",
		order: 11,
	},
	{
		src: "./assets/images/conference6.jpeg",
		category: "Conferences",
		caption: "Professional conference participation",
		alt: "Attendance at a professional medical conference",
		order: 12,
	},
];
