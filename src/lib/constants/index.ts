/**
 * Public origin of the customer site, used for canonical URLs, Open Graph
 * tags, the sitemap and robots.txt. It is the one place those absolute URLs
 * come from, so a domain change is a single edit.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_WEB_URL || "http://localhost:3000"
).replace(/\/$/, "");

export const SITE = {
  company: {
    name: "DENISCO GLOBAL AGRICULTURE LIMITED",
    shortName: "Denisco Global",
    legalShort: "Agriculture Ltd",
    tagline:
      "Growing with Nature. From Seed to Harvest. Creating Value for Life.",
    address:
      "3 Martin Luther King Street, 5th Avenue, Gwarimpa, Abuja, Nigeria",
    phone: "+234 808 627 3838",
    email: "info@deniscoglobalagroltd.com",
    hours: "Mon to Sat: 8:00 AM to 6:00 PM",
    integratedFlow: [
      "Seed",
      "Crop",
      "Forage",
      "Livestock",
      "Poultry",
      "Snails",
      "Processing",
      "Value Addition",
      "Market",
    ],
  },
  media: {
    logo: "https://ik.imagekit.io/a8q3rfdl1/DENISCO%20FARM%20MEDIA/Company%20logo.jpeg",
    ceoPhoto1:
      "https://ik.imagekit.io/a8q3rfdl1/DENISCO%20FARM%20MEDIA/CEO_IMAGE_1.jpeg",
    ceoPhoto2:
      "https://ik.imagekit.io/a8q3rfdl1/DENISCO%20FARM%20MEDIA/CEO_IMAGE_2.jpeg",
    /**
     * Video posters go through ImageKit's own transformations rather than
     * next/image: they are the `poster` attribute of a <video>, which the
     * image pipeline never sees. Unsized, the two of them are 215 KB of PNG
     * below the fold on every home-page view.
     */
    videos: {
      farmIntroduction: {
        title: "Farm Introduction by the CEO",
        label: "Farm Introduction",
        description:
          "A walk-through of our integrated farm divisions, presented by our CEO.",
        src: "https://ik.imagekit.io/a8q3rfdl1/DENISCO%20FARM%20MEDIA/FARM_INTRO.mp4",
        poster:
          "https://ik.imagekit.io/a8q3rfdl1/DENISCO%20FARM%20MEDIA/vid1_tumb.png?tr=w-900,q-70,f-auto",
      },
      agriculturalEducation: {
        title: "Agricultural Education by the CEO",
        label: "Agricultural Education",
        description:
          "Practical agricultural education for farmers and aspiring farm owners.",
        src: "https://ik.imagekit.io/a8q3rfdl1/DENISCO%20FARM%20MEDIA/agricultural_education.mp4",
        poster:
          "https://ik.imagekit.io/a8q3rfdl1/DENISCO%20FARM%20MEDIA/vid2_tumb.png?tr=w-900,q-70,f-auto",
      },
    },
    heroImage: "/images/hero-crop-field.jpg",
    farmland: "/images/rice-paddy.jpg",
    workers: "/images/local-chickens.png",
    productFallback: "/images/hero-crop-field.jpg",
  },
  socials: [
    { label: "Facebook", url: "#", icon: "facebook" },
    { label: "Instagram", url: "#", icon: "instagram" },
    { label: "X (Twitter)", url: "#", icon: "twitter" },
    { label: "WhatsApp", url: "#", icon: "whatsapp" },
  ],
  about: {
    vision:
      "To become a leading and globally respected integrated agricultural enterprise, transforming farming into a modern, sustainable and profitable business while contributing significantly to food security, economic development and improved livelihoods.",
    mission:
      "To produce high-quality crops, livestock, poultry and other agricultural products through modern, efficient and sustainable farming practices, while creating value for consumers, empowering farmers, generating employment and contributing to food security and economic growth.",
    purpose: "Farming for Food. Growing for the Future.",
    promise: "Quality. Integrity. Innovation. Productivity. Sustainability.",
    philosophy:
      "Healthy soil. Healthy animals. Healthy food. Healthy people.",
    values: [
      {
        title: "Quality",
        description:
          "We pursue quality in everything we produce, purchase, process and deliver.",
        icon: "Award",
      },
      {
        title: "Integrity",
        description:
          "We conduct our business honestly, transparently and responsibly.",
        icon: "Shield",
      },
      {
        title: "Sustainability",
        description:
          "We promote farming practices that maintain soil health and support long-term productivity.",
        icon: "Leaf",
      },
      {
        title: "Innovation",
        description:
          "We seek better technologies, genetics, farming methods and practical solutions.",
        icon: "Lightbulb",
      },
      {
        title: "People",
        description:
          "We respect employees, farmers, customers, partners and communities.",
        icon: "Heart",
      },
    ],
  },
  ceo: {
    name: "Uzochukwu, Chukwudi Paulinus Prince",
    title: "Chief Executive Officer",
    hero_quote: "Our commitment is to grow with nature, produce carefully, care for our animals and equip the next generation of farmers.",
    quote:
      "We are committed to a farm where soil remains productive, animals are cared for, food is produced responsibly, people grow in knowledge and communities benefit.",
  },
  deliveryFee: 2500,
  currency: "NGN",
  categories: [
    { slug: "poultry", label: "Poultry" },
    { slug: "livestock", label: "Livestock" },
    { slug: "piggery", label: "Piggery" },
    { slug: "snail", label: "Snail Farming" },
    { slug: "crops", label: "Crop Farming" },
  ],
  services: [
    {
      title: "Seed Production and Development",
      icon: "Sprout",
      description:
        "Quality seed production, multiplication and management that supports reliable crop establishment.",
      items: [
        "Seed multiplication and parent material selection",
        "Field monitoring, rouging and harvesting",
        "Cleaning, grading, drying and storage",
        "Packaging, labelling and distribution",
      ],
    },
    {
      title: "Crop Production",
      icon: "Wheat",
      description:
        "Responsible cultivation of food and commercial crops using improved farm practices.",
      items: [
        "Land preparation and farm establishment",
        "Crop cultivation and maintenance",
        "Pest, disease and weed management",
        "Harvesting and post-harvest handling",
      ],
    },
    {
      title: "Livestock Farming",
      icon: "Beef",
      description:
        "Healthy cattle, goats and sheep produced through responsible husbandry and nutrition.",
      items: [
        "Cattle, goat and sheep production",
        "Breeding and calf rearing",
        "Pasture and forage management",
        "Health records and farm management",
      ],
    },
    {
      title: "Poultry Production",
      icon: "Egg",
      description:
        "Efficient poultry systems focused on healthy birds, biosecurity and quality output.",
      items: [
        "Broiler production and chick management",
        "Feeding programmes and housing",
        "Biosecurity and disease prevention",
        "Production monitoring",
      ],
    },
    {
      title: "Snail Farming",
      icon: "Shell",
      description:
        "Controlled snail production designed for healthy growth, breeding and market readiness.",
      items: [
        "Breeding and hatchery management",
        "Snail housing and feeding",
        "Environmental management",
        "Harvesting and market-oriented production",
      ],
    },
    {
      title: "Plantain and Banana Propagation",
      icon: "TreeDeciduous",
      description:
        "Production of healthy, vigorous planting materials for farmers and orchard development.",
      items: [
        "Nursery establishment",
        "Propagation and seedling production",
        "Hardening and field preparation",
        "Orchard establishment support",
      ],
    },
    {
      title: "Forage and Feed Production",
      icon: "Leaf",
      description:
        "Forage and feed resources that strengthen livestock nutrition and productivity.",
      items: [
        "Forage and pasture establishment",
        "Hay and silage development",
        "Feed ingredient management",
        "Feed formulation and preparation",
      ],
    },
    {
      title: "Integrated Farming",
      icon: "RefreshCcw",
      description:
        "Connected enterprises that make purposeful use of farm resources and reduce waste.",
      items: [
        "Better resource utilization",
        "Multiple income streams",
        "Reduced waste and greater resilience",
        "Value creation across enterprises",
      ],
    },
    {
      title: "Farm Development and Management",
      icon: "Compass",
      description:
        "Practical support for new and improving agricultural enterprises.",
      items: [
        "Farm planning and layout",
        "Enterprise selection",
        "Production planning and monitoring",
        "Record keeping systems",
      ],
    },
    {
      title: "Agricultural Consulting",
      icon: "MessageCircle",
      description:
        "Practical agricultural knowledge for planning, production and farm improvement.",
      items: [
        "Crop, seed and livestock production",
        "Poultry, feed and forage support",
        "Farm establishment and management",
        "Breeding and production improvement",
      ],
    },
    {
      title: "Agricultural Training and Capacity Development",
      icon: "Presentation",
      description:
        "Practical learning for farmers, entrepreneurs and young people.",
      items: [
        "Crop and seed production",
        "Livestock and poultry management",
        "Farm hygiene, biosecurity and records",
        "Farm business management",
      ],
    },
    {
      title: "Agricultural Value Addition",
      icon: "PackageOpen",
      description:
        "Activities that help create greater value from agricultural products and by-products.",
      items: [
        "Sorting and grading",
        "Processing and preservation",
        "Packaging and product development",
        "Market preparation and by-product use",
      ],
    },
  ],
} as const;
