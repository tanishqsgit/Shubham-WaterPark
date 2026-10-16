export const park = {
  name: "Shubham Water Park",
  location: "Nashik, India",
  tagline: "The Best Water Park For Your Family In Nashik",
  banner: "WE ARE NOW OPEN · 10:00 AM – 5:00 PM",
  hours: "10:00 AM – 5:00 PM",
  eyebrow: "A LITTLE ESCAPE. A WHOLE LOT OF HAPPY.",
  hero: ["Less ordinary.", "More", "splash."],
  intro:
    "Trade the everyday for a day of wild slides, happy little moments, and memories that make a splash.",
  explore: "Explore the park",
  book: "Book your happy day",
  visit: "Plan your visit",
  phone: "",
  whatsapp: "",
  email: "",
  address: "",
  mapEmbed: "",
  bookingUrl: "",
  prices: "",
  socials: [
    { name: "Instagram", url: "" },
    { name: "Facebook", url: "" },
    { name: "YouTube", url: "" },
  ],
  todos: [
    "Ticket prices and packages",
    "Phone and WhatsApp",
    "Email",
    "Full street address",
    "Map embed URL",
    "Booking link",
    "Social links",
  ],
  bookingTitle: "Your happy day starts here.",
  bookingNote:
    "Online booking is coming soon. Ticket prices and verified contact details will be added by the park team. You can explore the visit information below.",
  featuresTitle: "Everything you need. Nothing but fun.",
  featuresKicker: "GOOD TIMES, ALL INCLUDED",
  attractionsTitle: "Find your kind of splash.",
  attractionsKicker: "EIGHT WAYS TO MAKE YOUR DAY",
  safetyTitle: "Big fun. A little care.",
  safetyNote:
    "Follow lifeguard instructions, use the lockers for valuables, wear appropriate swimwear, and check each attraction’s posted rules before riding. Operator rules and on-site guidance take precedence.",
  visitTitle: "Your next happy memory is here.",
  visitIntro: "Bring your favourite people. We’ll bring the splash.",
  mapLabel: "NASHIK, MAHARASHTRA",
  mapNote: "Exact location and interactive map coming soon.",
  footer: "Made for sunny days & happy people.",
  concept:
    "Photography from Shubham Water World’s official website. A reimagined local website experience.",
  ui: {
    home: "Home",
    attractions: "Attractions",
    about: "Why Shubham?",
    safety: "Safety",
    visit: "Plan your visit",
    book: "Book now",
    soundOn: "Sound on",
    soundOff: "Sound off",
    low: "Eco quality",
    high: "High quality",
    ride: "Take a virtual ride",
    stopRide: "Stop virtual ride",
    scroll: "SCROLL TO MAKE A SPLASH",
    loading: "Filling up the good times…",
    fallback:
      "The park is best explored with WebGL. All visitor information is available below.",
    close: "Close",
    next: "Next attraction",
    family: "Family time, upgraded.",
    illustrated: "EXPLORE OUR LITTLE WORLD",
    hours: "A full day of happy",
    food: "Food + fun + family",
    safetyLabel: "BEFORE YOU SPLASH",
    placeholder: "Details coming soon",
    bookingStatus: "Booking is not open on this website yet.",
    progress: "Park journey",
    section: "Jump to",
    skip: "Skip to visitor information",
  },
};
export const features = [
  {
    icon: "food",
    title: "Unlimited Food & Ride",
    text: "Enjoy non-stop fun and delicious meals all day long.",
  },
  {
    icon: "ticket",
    title: "Affordable Price",
    text: "Budget-friendly packages, endless fun without breaking the bank.",
  },
  {
    icon: "tube",
    title: "Many Attractions",
    text: "A multitude of attractions for every age.",
  },
  {
    icon: "locker",
    title: "Safety Lockers",
    text: "Keep your belongings safe while you enjoy with friends and family.",
  },
];
const thrillSafety =
  "Minimum height 1.32 m. Not recommended for pregnant women or people with heart conditions or back problems.";
const familySafety =
  "Children under 1.22 m must wear a life jacket and be accompanied by an adult. Not recommended for pregnant women or people with heart conditions or back problems.";
export const attractions = [
  {
    id: "adrenaline",
    name: "Adrenaline Boost",
    tagline: "A little courage. A lot of whoa.",
    label: "FOR THE THRILL SEEKERS",
    color: "#ff755f",
    description:
      "The perfect shot of adrenaline. Slide high up on the walls of the track, reaching maximum speed… and just when you think you can’t take any more – it’s over!",
    safety: thrillSafety,
    kind: "High-speed slide",
    height: "1.32 m minimum",
    position: [-5, 0, -4],
  },
  {
    id: "water-fun",
    name: "Water Fun System",
    tagline: "One big, happy splash party.",
    label: "EVERYONE’S INVITED",
    color: "#00b4d8",
    description:
      "India’s biggest Water Fun System. Welcome to the Magical World… the heart of the water park. The entire family can enjoy it together.",
    safety:
      "Kids must be accompanied by an adult. High slides are not recommended for pregnant women.",
    kind: "Family adventure",
    height: "Adult supervision",
    position: [1, 0, -5],
  },
  {
    id: "fast-track",
    name: "Fast Track",
    tagline: "Ready. Set. Splash!",
    label: "A LITTLE FRIENDLY COMPETITION",
    color: "#ffb800",
    description:
      "The slickest and slipperiest track. Start your engine! Ready, set, GO! Compete head-to-head on mats, accelerating through a series of bumps.",
    safety: thrillSafety,
    kind: "Multi-lane racer",
    height: "1.32 m minimum",
    position: [6, 0, -4],
  },
  {
    id: "turbo-lab",
    name: "Turbo Lab",
    tagline: "A formula for pure fun.",
    label: "CURIOUS MINDS, WILD RIDES",
    color: "#80ed99",
    description:
      "Recommended by mad scientists. Can you take our ACID TEST and not come out green at the other end?",
    safety: familySafety,
    kind: "Twisting tube slide",
    height: "Life jackets under 1.22 m",
    position: [-6, 0, 2],
  },
  {
    id: "black-hole",
    name: "Black Hole",
    tagline: "Lights out. Chills on.",
    label: "INTO THE UNKNOWN",
    color: "#b39cff",
    description:
      "Slide into darkness. Tight turns and steep drops… plunge into this long monster in total darkness. Mega chills guaranteed!",
    safety: familySafety,
    kind: "Enclosed spiral",
    height: "Life jackets under 1.22 m",
    position: [6, 0, 2],
  },
  {
    id: "vertigo",
    name: "Vertigo",
    tagline: "Take a deep breath. Then let go.",
    label: "THE BIG LEAP",
    color: "#ff6b6b",
    description:
      "Looking down from almost 30 metres… a 60-degree drop awaits your trembling body. Not for the weak of heart!",
    safety: thrillSafety,
    kind: "60° drop slide",
    height: "1.32 m minimum",
    position: [-3, 0, -7],
  },
  {
    id: "wave-pool",
    name: "Wave Pool",
    tagline: "Your ocean, closer to home.",
    label: "GO WITH THE FLOW",
    color: "#00b4d8",
    description:
      "Brave the waves. Do you have ocean envy? Linger on the beach on a lazy summer afternoon, or dive into the waves.",
    safety:
      "Not recommended for pregnant women or people with heart conditions or back problems.",
    kind: "Waves & beach days",
    height: "Follow lifeguard guidance",
    position: [0, 0, 3],
  },
  {
    id: "rain-dance",
    name: "Rain Dance",
    tagline: "Forecast: 100% happiness.",
    label: "LITTLE FEET. BIG SMILES.",
    color: "#f7a2d0",
    description:
      "A favourite among kids and adults alike… multiple showers and steps on one side, ideal for the kids’ pool.",
    safety:
      "Children must be supervised by an adult. Follow the instructions of the lifeguards.",
    kind: "Rain & play",
    height: "Adult supervision",
    position: [5, 0, 6],
  },
];
export const rules = [
  {
    number: "1.32 m",
    title: "Height to ride",
    text: "Minimum height for Adrenaline Boost, Fast Track and Vertigo.",
  },
  {
    number: "1.22 m",
    title: "Little adventurers",
    text: "Under this height: life jacket and accompanying adult at Turbo Lab and Black Hole.",
  },
  {
    number: "♡",
    title: "Listen to your body",
    text: "Observe pregnancy, heart and back advisories at each attraction.",
  },
  {
    number: "2 → 1",
    title: "Together is better",
    text: "Children need adult supervision. Keep valuables in the safety lockers.",
  },
];

// Real photographs retrieved from the official site; full URLs are retained in public/images/sources.json.
export const photoStory = {
  galleryNav: "Moments",
  collageCaption: "Life’s better with a little splash.",
  attractionIntro: "Pick your thrill. We’ll bring the splash.",
  sideLabel: "GOOD DAYS LOOK LIKE THIS.",
  photoMotion: "Photo motion",
  motionPaused: "Motion paused",
  choosePhoto: "Choose a park photograph",
  showPhoto: "Show photograph",
  heroTitle: ["Leave ordinary.", "Make a splash."],
  kicker: "SHUBHAM WATER PARK · NASHIK, INDIA",
  heroDescription:
    "Big slides. Carefree afternoons. Your favourite people. A whole day of happy, just outside the everyday.",
  heroCta: "Find your happy place",
  galleryCta: "See the real park",
  chapter: "YOUR DAY, WITH A LITTLE MORE WOW",
  introTitle: "The best days aren’t planned. They’re splashed.",
  introText:
    "From the first heart-racing drop to that one-more-wave feeling. Come for the rides. Stay for the moments in between.",
  photoLabel: "THROUGH OUR LENS",
  photoTitle: "Real splashes. Real smiles.",
  photoText: "A little glimpse of the good times waiting for you.",
  marquee: "LESS SCREEN TIME. MORE SPLASH TIME.",
  photoCredit: "PARK GALLERY",
  viewPhoto: "View photograph",
  closePhoto: "Close photograph",
  previousPhoto: "Previous photograph",
  nextPhoto: "Next photograph",
  pause: "Pause photo motion",
  play: "Resume photo motion",
  view: "Take a closer look",
  next: "Keep exploring",
  heroPhotos: [
    {
      src: "/images/10.webp",
      alt: "A wide view of the colourful slides and pools featured in Shubham Water World’s official gallery",
      label: "The great escape",
    },
    {
      src: "/images/1.webp",
      alt: "A red looping water slide against a vivid blue sky",
      label: "A different kind of rush",
    },
    {
      src: "/images/14.webp",
      alt: "Colourful water slides and inflatable tubes beside the pool",
      label: "Your kind of pool day",
    },
  ],
  attractionPhotos: [
    {
      src: "/images/11.webp",
      alt: "The red and yellow Tornado attraction in the official park gallery",
      label: "Tornado",
    },
    {
      src: "/images/12.webp",
      alt: "Multi-level water play towers with colourful slides above the pool",
      label: "Water play",
    },
    {
      src: "/images/g1-big.webp",
      alt: "Visitors racing down three colourful slide lanes",
      label: "Triple Fast Track",
    },
    {
      src: "/images/2.webp",
      alt: "Blue and yellow enclosed water slides winding around their supports",
      label: "Blue Spin",
    },
    {
      src: "/images/g12-big-2048x1360-1.webp",
      alt: "The red enclosed slide and yellow twisting slide photographed from above",
      label: "Red Hole",
    },
    {
      src: "/images/Untitled-design-12.webp",
      alt: "Steep green, yellow and pink slides at the park",
      label: "Green Vertigo",
    },
    {
      src: "/images/Untitled-design4.webp",
      alt: "Families and friends enjoying waves in the wave pool",
      label: "Wave Pool",
    },
    {
      src: "/images/DSC_0653-scaled.webp",
      alt: "Visitors beneath the rain dance shower structure",
      label: "Rain Dance",
    },
  ],
  gallery: [
    {
      src: "/images/5.webp",
      alt: "A busy blue pool filled with visitors enjoying a sunny day",
      label: "A whole pool of happy",
    },
    {
      src: "/images/7.webp",
      alt: "Visitors in colourful inflatable tubes beside the slide exits",
      label: "Good times, together",
    },
    {
      src: "/images/8.webp",
      alt: "A dramatic splash at the end of a colourful water slide",
      label: "Worth the splash",
    },
    {
      src: "/images/9.webp",
      alt: "Water play towers surrounded by palm trees beneath a blue sky",
      label: "Your everyday escape",
    },
  ],
};
