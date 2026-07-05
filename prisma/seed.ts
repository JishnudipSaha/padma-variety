import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import bcrypt from "bcryptjs";

async function main() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL!,
    ssl: { rejectUnauthorized: false },
  });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });
  // Create admin user
  const hashedPassword = await bcrypt.hash("PadmaStore@2026", 12);
  await prisma.user.upsert({
    where: { email: "admin@padmastore.com" },
    update: {},
    create: {
      email: "admin@padmastore.com",
      name: "Store Owner",
      password: hashedPassword,
    },
  });

  // Create store settings
  const settings: Record<string, string> = {
    storeName: "Padma Variety Stores",
    storeTagline: "Your Destination for Premium Beauty & Cosmetics",
    address: "PFG8+XM7, Colony more, Kol4, Nabapally, Barasat, West Bengal 700126, India",
    phone: "+91 98308 67228",
    email: "contact@padmastore.com",
    hours: "Mon-Sat: 10:00 AM - 9:00 PM | Sun: 11:00 AM - 7:00 PM",
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    whatsapp: "+919876543210",
    aboutText: "Welcome to Padma Variety Stores, your trusted destination for premium beauty and cosmetic products in the heart of Kolkata. With years of dedicated service, we bring you an curated selection of skincare, makeup, fragrances, and personal care products from trusted brands.",
    aboutMission: "Our mission is to make quality beauty products accessible to everyone while providing personalized recommendations that help you feel confident and beautiful.",
    heroTitle: "Discover Your Natural Beauty",
    heroSubtitle: "Explore our curated collection of premium skincare, makeup, and fragrances",
  };

  for (const [key, value] of Object.entries(settings)) {
    await prisma.storeSetting.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    });
  }

  // Create sample banners
  const banners = [
    { title: "New Arrivals", subtitle: "Discover the latest in beauty trends", image: "/uploads/banner1.jpg", sortOrder: 1 },
    { title: "Skincare Essentials", subtitle: "Nurture your skin with premium products", image: "/uploads/banner2.jpg", sortOrder: 2 },
    { title: "Fragrance Collection", subtitle: "Find your signature scent", image: "/uploads/banner3.jpg", sortOrder: 3 },
  ];

  for (const banner of banners) {
    const existing = await prisma.banner.findFirst({ where: { title: banner.title } });
    if (!existing) {
      await prisma.banner.create({ data: banner });
    }
  }

  // Create sample products
  const products = [
    { name: "Rose Glow Serum", slug: "rose-glow-serum", description: "A luxurious facial serum infused with rose extracts and vitamin C for a radiant, glowing complexion. Perfect for all skin types.", price: 1299, category: "Skincare", images: '["/uploads/product1.jpg"]', featured: true },
    { name: "Velvet Matte Lipstick", slug: "velvet-matte-lipstick", description: "Long-lasting matte lipstick with intense color payoff. Enriched with moisturizing agents for comfortable wear throughout the day.", price: 699, category: "Makeup", images: '["/uploads/product2.jpg"]', featured: true },
    { name: "Jasmine Noir Eau de Parfum", slug: "jasmine-noir-parfum", description: "An enchanting blend of jasmine, sandalwood, and warm amber. A sophisticated fragrance for the modern woman.", price: 2499, category: "Fragrances", images: '["/uploads/product3.jpg"]', featured: true },
    { name: "Hydra Boost Moisturizer", slug: "hydra-boost-moisturizer", description: "Lightweight, deeply hydrating moisturizer with hyaluronic acid. Keeps skin plump and moisturized for up to 72 hours.", price: 899, category: "Skincare", images: '["/uploads/product4.jpg"]', featured: true },
    { name: "Golden Shimmer Eyeshadow Palette", slug: "golden-shimmer-palette", description: "12-shade eyeshadow palette with warm golds, bronzes, and rose tones. Buildable formula with stunning shimmer finish.", price: 1499, category: "Makeup", images: '["/uploads/product5.jpg"]', featured: true },
    { name: "Whisper of Orchid Mist", slug: "whisper-orchid-mist", description: "A delicate body mist with orchid and white tea notes. Perfect for everyday freshness and subtle elegance.", price: 599, category: "Fragrances", images: '["/uploads/product6.jpg"]', featured: true },
    { name: "Vitamin C Brightening Cream", slug: "vitamin-c-brightening", description: "Advanced brightening cream with 15% vitamin C and turmeric extract. Reduces dark spots and evens skin tone.", price: 1099, category: "Skincare", images: '["/uploads/product7.jpg"]', featured: false },
    { name: "Silk Touch Foundation", slug: "silk-touch-foundation", description: "Medium-to-full coverage foundation with a natural silk finish. Infused with skincare benefits for a healthy glow.", price: 1199, category: "Makeup", images: '["/uploads/product8.jpg"]', featured: false },
    { name: "Rose Petal Body Lotion", slug: "rose-petal-body-lotion", description: "Nourishing body lotion with real rose petal extracts. Silky smooth texture that absorbs quickly and leaves skin fragrant.", price: 499, category: "Skincare", images: '["/uploads/product9.jpg"]', featured: false },
    { name: "Midnight Oud Perfume", slug: "midnight-oud-perfume", description: "A bold, woody fragrance with oud, leather, and dark berries. For those who make a statement.", price: 3499, category: "Fragrances", images: '["/uploads/product10.jpg"]', featured: false },
    { name: "Precision Eyeliner Pen", slug: "precision-eyeliner", description: "Waterproof felt-tip eyeliner for precise, dramatic lines. Smudge-proof formula lasts all day.", price: 399, category: "Makeup", images: '["/uploads/product11.jpg"]', featured: false },
    { name: "Charcoal Detox Face Mask", slug: "charcoal-detox-mask", description: "Deep-cleansing face mask with activated charcoal and tea tree oil. Removes impurities and minimizes pores.", price: 599, category: "Skincare", images: '["/uploads/product12.jpg"]', featured: false },
  ];

  for (const product of products) {
    const existing = await prisma.product.findUnique({ where: { slug: product.slug } });
    if (!existing) {
      await prisma.product.create({ data: { ...product, price: product.price } });
    }
  }

  // Create content entries
  const contentEntries: Record<string, string> = {
    home_hero_title: "Discover Your Natural Beauty",
    home_hero_subtitle: "Explore our curated collection of premium skincare, makeup, and fragrances",
    home_featured_title: "Featured Products",
    home_featured_subtitle: "Handpicked favorites our customers love",
    home_why_title: "Why Choose Us",
    home_why_subtitle: "Experience the difference of quality and care",
    home_reviews_title: "What Our Customers Say",
    home_reviews_subtitle: "Real reviews from real people",
    home_cta_title: "Ready to Glow?",
    home_cta_subtitle: "Visit us today and discover your perfect beauty routine",
    about_page_title: "About Padma Variety Stores",
    about_page_content: "Welcome to Padma Variety Stores, your trusted destination for premium beauty and cosmetic products in the heart of Kolkata. With years of dedicated service, we have been bringing our customers a carefully curated selection of skincare, makeup, fragrances, and personal care products from trusted brands around the world.\n\nOur journey began with a simple belief: everyone deserves access to quality beauty products that make them feel confident and beautiful. Today, we continue to honor that belief by offering an extensive range of products carefully selected to meet the diverse needs of our customers.",
    contact_page_title: "Get In Touch",
    contact_page_subtitle: "We'd love to hear from you",
  };

  for (const [key, value] of Object.entries(contentEntries)) {
    await prisma.content.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    });
  }

  // Create sample reviews (mock data)
  const reviews = [
    { authorName: "Priya Sharma", rating: 5, text: "Absolutely love this store! The staff is incredibly helpful and the product selection is amazing. My go-to place for all beauty needs.", time: "2026-06-15" },
    { authorName: "Ananya Das", rating: 5, text: "Best cosmetic store in Kolkata! They have all the premium brands at great prices. The rose glow serum is my absolute favorite.", time: "2026-06-10" },
    { authorName: "Riya Mukherjee", rating: 4, text: "Great variety of products. The staff helped me find the perfect shade of foundation. Will definitely come back!", time: "2026-05-28" },
    { authorName: "Sneha Banerjee", rating: 5, text: "A hidden gem! Found my favorite perfume here that I couldn't find anywhere else. Highly recommended for fragrance lovers.", time: "2026-05-20" },
    { authorName: "Deepika Roy", rating: 5, text: "Beautiful store with an excellent collection. The skincare section is particularly impressive. Love the personalized recommendations!", time: "2026-05-15" },
    { authorName: "Arpita Ghosh", rating: 4, text: "Very nice collection of makeup products. Prices are reasonable compared to online stores. The staff is knowledgeable and friendly.", time: "2026-04-30" },
    { authorName: "Tanushree Sen", rating: 5, text: "This is my regular store for all beauty products. They always have the latest arrivals and the quality is top-notch.", time: "2026-04-22" },
    { authorName: "Moumita Pal", rating: 5, text: "Excellent experience! The store is clean, well-organized, and the product range is fantastic. Must visit for beauty enthusiasts.", time: "2026-04-10" },
  ];

  for (const review of reviews) {
    const existing = await prisma.reviewCache.findFirst({
      where: { authorName: review.authorName },
    });
    if (!existing) {
      await prisma.reviewCache.create({ data: review });
    }
  }

  console.log("Database seeded successfully!");
  await prisma.$disconnect();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
