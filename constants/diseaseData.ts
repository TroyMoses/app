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
  {
    id: "leaf-roll",
    name: "Potato Leaf Roll",
    short: "Upward rolling of leaves with yellowing.",
    image: require("@/assets/images/leaf-roll.jpg"),
    full: `• Symptoms: Upward rolling of leaves, starting with lower leaves and progressing upward. Affected leaves become leathery and may develop a reddish or purplish tint.

• Impact: Reduces tuber size and yield, can cause internal discoloration of tubers.

• Management: Use certified seed potatoes, control aphid vectors, and remove infected plants.`,
  },
  {
    id: "septoria",
    name: "Septoria Leaf Spot",
    short: "Small dark spots with yellow halos.",
    image: require("@/assets/images/septoria.jpg"),
    full: `• Symptoms: Small, circular to angular dark spots with yellow halos on leaves. Spots may coalesce as the disease progresses.

• Impact: Reduces photosynthetic area, leading to decreased tuber development.

• Management: Maintain proper plant spacing for good air circulation, avoid overhead irrigation, and apply fungicides when necessary.`,
  },
  {
    id: "psyllid",
    name: "Psyllid Yellows",
    short: "Yellowing and curling of upper leaves.",
    image: require("@/assets/images/psyllid.jpg"),
    full: `• Symptoms: Yellowing and upward curling of upper leaves, stunted growth, and aerial tubers may form.

• Impact: Severely reduces yield and quality of tubers.

• Management: Monitor for psyllid insects, use insecticides when necessary, and plant resistant varieties when available.`,
  },
  {
    id: "blackdot",
    name: "Black Dot",
    short: "Small black dots on stems and tubers.",
    image: require("@/assets/images/blackdot.jpg"),
    full: `• Symptoms: Small black dots (sclerotia) on stems, stolons, and tubers. May cause premature senescence of plants.

• Impact: Reduces tuber quality and marketability, can lead to storage losses.

• Management: Use crop rotation, plant certified seed potatoes, and ensure proper storage conditions.`,
  },
  {
    id: "blackleg",
    name: "Blackleg",
    short: "Black stem base and wilting.",
    image: require("@/assets/images/blackleg.jpg"),
    full: `• Symptoms: Black, slimy decay at the base of stems, yellowing and wilting of foliage, and stunted growth.

• Impact: Can cause complete plant collapse and tuber rot.

• Management: Use certified seed potatoes, avoid planting in wet conditions, and practice good field sanitation.`,
  },
];

export const tipsOfTheDay = [
  "Regularly inspect your plants for early signs of disease.",
  "Water plants at the base to prevent leaf moisture.",
  "Use certified disease-free seeds and tubers.",
  "Maintain proper soil pH to enhance plant resistance.",
  "Remove and destroy infected plant debris promptly.",
  "Rotate crops to prevent disease buildup in soil.",
  "Ensure adequate spacing between plants for air circulation.",
  "Apply fungicides preventatively during high-risk periods.",
  "Monitor weather conditions for disease-favorable environments.",
  "Store harvested potatoes in cool, dry conditions.",
  "Clean tools and equipment between fields to prevent disease spread.",
  "Consider resistant varieties when available for your region.",
  "Avoid working with plants when they're wet to prevent disease spread.",
  "Implement integrated pest management for sustainable control.",
  "Keep records of disease occurrences to plan future management strategies.",
];
