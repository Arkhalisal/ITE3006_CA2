// Mock Data for cities and forum posts
export const cityData = [
  {
    name: "Paris",
    country: "France",
    description: "The city of lights and love, known for its art, fashion, and iconic landmarks.",
    image: "../public/images/city-paris.jpg",
    tours: 24,
  },
  {
    name: "Tokyo",
    country: "Japan",
    description:
      "A bustling metropolis that seamlessly blends tradition and modernity, offering a unique cultural experience.",
    image: "../public/images/city-tokyo.jpg",
    tours: 30,
  },
  {
    name: "New York",
    country: "USA",
    description:
      "The city that never sleeps, famous for its skyline, diverse culture, and vibrant arts scene.",
    image: "../public/images/city-newYork.jpg",
    tours: 18,
  },
  {
    name: "Rome",
    country: "Italy",
    description:
      "A historic city filled with ancient ruins, Renaissance art, and world-renowned cuisine.",
    image: "../public/images/city-rome.jpg",
    tours: 22,
  },
  {
    name: "Sydney",
    country: "Australia",
    description:
      "A stunning harbor city known for its iconic Opera House, beautiful beaches, and vibrant culture.",
    image: "../public/images/city-sydney.jpg",
    tours: 15,
  },
  {
    name: "Cape Town",
    country: "South Africa",
    description:
      "A coastal city with breathtaking landscapes, rich history, and diverse wildlife experiences.",
    image: "../public/images/city-capeTown.jpg",
    tours: 12,
  },
];

const generateMockData = () => {
  const postAuthors = [
    "Sarah Chen",
    "Mike Johnson",
    "Emma Rodriguez",
    "John Smith",
    "Emily Davis",
    "David Wilson",
    "Laura Martinez",
    "Sophia Lee",
    "Olivia Brown",
    "James Taylor",
    "Mia Anderson",
    "William Thomas",
    "Isabella Jackson",
    "Ethan White",
    "Ava Harris",
    "Noah Martin",
    "Charlotte Thompson",
    "Liam Garcia",
    "Amelia Martinez",
    "Lucas Robinson",
  ];

  const locations = [
    "Paris, France",
    "Tokyo, Japan",
    "Cusco, Peru",
    "New York, USA",
    "Sydney, Australia",
    "Kruger National Park, South Africa",
    "Rome, Italy",
    "Bali, Indonesia",
    "Barcelona, Spain",
    "Kyoto, Japan",
    "Santorini, Greece",
    "Banff, Canada",
    "Marrakech, Morocco",
    "Dubai, UAE",
    "Rio de Janeiro, Brazil",
    "Prague, Czech Republic",
    "Hanoi, Vietnam",
    "Lisbon, Portugal",
    "Vancouver, Canada",
    "Queenstown, New Zealand",
    "Petra, Jordan",
    "Amsterdam, Netherlands",
    "Seoul, South Korea",
    "Singapore",
    "Hong Kong",
    "Taipei, Taiwan",
    "Bangkok, Thailand",
  ];

  const titleTemplates = [
    "Hidden Gems in {city}: Beyond the Tourist Spots",
    "Best Street Food in {city}: A Local's Guide",
    "Top 5 Hiking Trails in {city}",
    "Budget Travel Tips for {city}",
    "Must-Visit Museums in {city}",
    "Nightlife Guide: Best Bars in {city}",
    "Day Trips from {city} You Can't Miss",
    "Cultural Experiences in {city}",
    "Beach Hopping in {city}: My Favorites",
    "Solo Travel in {city}: Tips and Tricks",
  ];

  const contentTemplates = [
    "Just returned from {city}! Here are my top recommendations that most tourists miss...",
    "Spent {n} weeks exploring {city}'s food scene. My top {m} picks include...",
    "Completed the {activity} in {city}! Book early, bring {item}, and don't forget...",
    "{city} can be pricey, but here are ways to enjoy it on a budget: free {attraction}, walking tours...",
    "As a local in {city}, my favorite spots: {p1} for atmosphere, {p2} for views...",
  ];

  const commentAuthors = [
    "Alex K.",
    "Jenny L.",
    "Marco P.",
    "Li Wei",
    "Sophie M.",
    "Raj S.",
    "Elena R.",
    "Tom H.",
    "Yuki N.",
    "Carlos G.",
    "Anna B.",
    "Kim J.",
    "Luis F.",
    "Mei L.",
    "Omar A.",
  ];

  const commentTemplates = [
    "Great tips! I’m going next month.",
    "Which hotel did you stay at?",
    "I was there last year — totally agree!",
    "Thanks for sharing! Saved this post.",
    "Do you have a map or itinerary?",
    "Is it safe to travel solo there?",
    "The food looks amazing!",
    "How much did the trip cost roughly?",
    "Any must-try dishes?",
    "Beautiful photos! Where was this taken?",
    "I’d love to visit — any budget tips?",
    "How long did you stay?",
    "Did you need a visa?",
    "This is now on my bucket list!",
    "Any off-the-beaten-path spots?",
    "What’s the best time of year to go?",
    "I’m local — happy to give more tips!",
    "Loved the sunset spot!",
    "How crowded was it?",
    "Thanks! This helped a lot.",
    "Do you recommend renting a car?",
    "Any language barriers?",
    "Amazing write-up!",
    "Can you share your packing list?",
    "Is public transport reliable?",
    "I’m vegetarian — any good options?",
    "This post deserves more likes!",
    "Any day trips you recommend?",
    "How was the weather?",
    "I’m planning a similar trip — DM me!",
  ];

  const posts = [];
  const now = Date.now();

  for (let i = 1; i <= 100; i++) {
    const author = postAuthors[i % postAuthors.length];
    const location = locations[i % locations.length];
    const city = location.split(",")[0].trim();

    // Generate title & content
    const title = titleTemplates[i % titleTemplates.length].replace("{city}", city);
    const content = contentTemplates[i % contentTemplates.length]
      .replace("{city}", city)
      .replace("{n}", (Math.floor(Math.random() * 6) + 1).toString())
      .replace("{m}", (Math.floor(Math.random() * 4) + 3).toString())
      .replace(
        "{activity}",
        ["hike", "trek", "climb", "walk", "journey"][Math.floor(Math.random() * 5)]
      )
      .replace(
        "{item}",
        ["water", "snacks", "sunscreen", "rain jacket", "good shoes"][Math.floor(Math.random() * 5)]
      )
      .replace(
        "{attraction}",
        ["museums", "parks", "galleries", "markets", "landmarks"][Math.floor(Math.random() * 5)]
      )
      .replace(
        "{p1}",
        city + " " + ["Plaza", "Market", "Beach", "Temple", "Park"][Math.floor(Math.random() * 5)]
      )
      .replace(
        "{p2}",
        city + " " + ["Hill", "Tower", "Bridge", "Garden", "Lake"][Math.floor(Math.random() * 5)]
      );

    const daysAgo = Math.floor(Math.random() * 60) + 1;
    const baseDate = now - daysAgo * 24 * 60 * 60 * 1000;

    // Generate 5–15 mock comments
    const commentCount = Math.floor(Math.random() * 11) + 5;
    const comments = [];

    for (let c = 0; c < commentCount; c++) {
      const commentAuthor = commentAuthors[Math.floor(Math.random() * commentAuthors.length)];
      const commentText = commentTemplates[Math.floor(Math.random() * commentTemplates.length)];
      const commentDaysAgo = Math.floor(Math.random() * daysAgo);
      const commentDate = new Date(baseDate - commentDaysAgo * 24 * 60 * 60 * 1000).toISOString();

      comments.push({
        id: `${i}-c${c}`,
        author: commentAuthor,
        content: commentText,
        created_at: commentDate,
      });
    }

    posts.push({
      id: i.toString(),
      title,
      content: content.length > 500 ? content.substring(0, 497) + "..." : content,
      location,
      created_at: new Date(baseDate).toISOString(),
      author,
      commentCount: comments.length,
      likes: Math.floor(Math.random() * 50),
      liked: false,
      comments,
    });
  }

  return posts;
};

export const forumPosts = generateMockData();
