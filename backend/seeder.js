import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/ProductModel.js';

dotenv.config();

// MongoDB connect karne ki logic
mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://YOUR_CONNECTION_STRING_HERE')
  .then(() => console.log('MongoDB Connected for Seeding...'))
  .catch((err) => console.log('Database connection error:', err));

const products = [
  { name: "Premium Leather Watch", price: 299, category: "Accessories", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500", desc: "Crafted for perfection, this genuine leather timepiece features a sleek stainless steel casing and Japanese quartz movement." },
  { name: "Classic Gold Cufflinks", price: 85, category: "Accessories", image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=500", desc: "Elegant gold-plated cufflinks designed to add a touch of sophisticated luxury to any tailored dress shirt." },
  { name: "Minimalist Leather Wallet", price: 120, category: "Leather Goods", image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=500", desc: "Slim profile bi-fold wallet engineered with top-grain leather and complete RFID blocking security protection." },
  { name: "Luxury Chronograph Watch", price: 450, category: "Accessories", image: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=500", desc: "High-end multi-functional chronograph featuring triple sub-dials, scratch-resistant sapphire glass, and a bold aesthetic." },
  { name: "Premium Onyx Men's Ring", price: 145, category: "Jewelry", image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500", desc: "Handcrafted sterling silver ring set with a deep polished black onyx stone, projecting power and elegance." },
  { name: "Full-Grain Leather Belt", price: 95, category: "Leather Goods", image: "https://images.unsplash.com/photo-1624222247344-550fb8ef5522?w=500", desc: "Indestructible full-grain brown leather belt equipped with a brushed nickel heavy-duty buckle finish." },
  { name: "Classic Aviator Sunglasses", price: 180, category: "Accessories", image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500", desc: "Iconic military-grade teardrop frames fitted with polarized UV400 lenses for maximum optical clarity." },
  { name: "Sleek Carbon Fiber Cardholder", price: 65, category: "Leather Goods", image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500", desc: "A modern aviation-grade carbon fiber wallet built with an elastic tension band to securely hold up to 12 cards." },
  { name: "Sterling Silver Tie Clip", price: 55, category: "Accessories", image: "https://images.unsplash.com/photo-1626784215021-2e39ccf971cd?w=500", desc: "Polished sterling silver tie bar that ensures your neckwear stays flawlessly positioned with elite precision." },
  { name: "Luxury Leather Briefcase", price: 380, category: "Leather Goods", image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500", desc: "Spacious premium leather executive bag outfitted with dedicated compartments for a 15-inch laptop and vital documents." },
  { name: "Minimalist Matte Black Watch", price: 210, category: "Accessories", image: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=500", desc: "Understated luxury featuring a clean matte black stealth profile, flexible mesh strap, and a scratchproof watch face." },
  { name: "Premium Suede Loafers", price: 260, category: "Footwear", image: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=500", desc: "Ultra-comfortable Italian suede slip-on loafers, perfect for smart-casual evening gatherings or business meetings." },
  { name: "Silver Chrono Sport Edition", price: 320, category: "Accessories", image: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=500", desc: "Rugged yet majestic silver sports watch offering water resistance up to 100 meters and glowing luminescent hands." },
  { name: "Leather Passport Holder", price: 75, category: "Leather Goods", image: "https://images.unsplash.com/photo-1566150905458-1bf1fc15a7a0?w=500", desc: "Hand-stitched leather travel wallet explicitly tailored to hold your passport, boarding passes, and currency securely." },
  { name: "Executive Fountain Pen", price: 110, category: "Accessories", image: "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=500", desc: "Precision-weighted luxury fountain pen with a fine gold-plated nib for an extraordinarily smooth ink writing experience." },
  { name: "Designer Silk Pocket Square", price: 40, category: "Accessories", image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500", desc: "100% pure premium mulberry silk pocket square sporting hand-rolled edges to elevate formal blazer outfits." },
  { name: "Premium Leather Chelsea Boots", price: 295, category: "Footwear", image: "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=500", desc: "Timeless ankle-high Chelsea boots crafted from hand-burnished calfskin leather with sturdy elastic side panels." },
  { name: "Gold Plated Mechanical Watch", price: 599, category: "Accessories", image: "https://images.unsplash.com/photo-1539874754764-5a96559165b0?w=500", desc: "An absolute masterpiece. Exhibition skeleton dial showing off intricate automatic self-winding internal mechanics." },
  { name: "Luxury Leather Backpack", price: 340, category: "Leather Goods", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500", desc: "High-grade leather commuter backpack merging classic heritage design aesthetics with modern ergonomic utility." },
  { name: "Classic Velvet Bowtie", price: 45, category: "Accessories", image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=500", desc: "Pre-tied deep black velvet bowtie offering an adjustable strap to lock down formal black-tie attire events perfectly." }
];

const seedData = async () => {
  try {
    await Product.deleteMany(); // Purana saara defective data saaf
    await Product.insertMany(products); // Naya premium data database mein push
    console.log('Database Successfully Seeded with 20 Fixed Products! ✅');
    process.exit();
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();