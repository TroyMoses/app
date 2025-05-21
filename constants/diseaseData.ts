export type Disease = {
  id: string;
  name: string;
  short: string;
  full: string;
  image: any;
};

export const diseases: Disease[] = [
  {
    id: "early-blight",
    name: "Early Blight",
    short: "Dark target-like spots on older leaves.",
    image: require("@/assets/images/early-blight.jpg"),
    full: `• Symptoms: Dark brown to black lesions with concentric rings on older leaves, often described as a "target spot" appearance. These lesions can coalesce, leading to extensive leaf blight.

• Impact: Premature defoliation reduces photosynthetic capacity, leading to smaller tubers and decreased yields.

• Management: Implement crop rotation, remove plant debris, and apply appropriate fungicides when necessary.`,
  },
  {
    id: "late-blight",
    name: "Late Blight",
    short: "Rapidly spreading brown lesions.",
    image: require("@/assets/images/late-blight.jpg"),
    full: `• Symptoms: Water-soaked lesions on leaves that rapidly expand, turning brown and leading to leaf collapse. White fungal growth may appear under leaves.

• Impact: Can devastate entire fields within days.

• Management: Use resistant varieties, ensure proper field sanitation, and apply fungicides preventatively.`,
  },
  // Add the rest here using the same structure...
];

export const tipsOfTheDay = [
  "Regularly inspect your plants for early signs of disease.",
  "Water plants at the base to prevent leaf moisture.",
  "Use certified disease-free seeds and tubers.",
  "Maintain proper soil pH to enhance plant resistance.",
  "Remove and destroy infected plant debris promptly.",
];
