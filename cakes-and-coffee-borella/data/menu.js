/**
 * Cakes & Coffee Borella - Menu Database
 * Prices in Sri Lankan Rupees (LKR)
 */

const MENU_CATEGORIES = [
  { id: 'all', name: 'All Items', icon: 'sparkles' },
  { id: 'hot-coffee', name: 'Hot Coffee', icon: 'coffee' },
  { id: 'iced-coffee', name: 'Cold & Iced Coffee', icon: 'cup-soda' },
  { id: 'cakes', name: 'Cakes & Gateaux', icon: 'cake' },
  { id: 'pastries', name: 'Pastries & Desserts', icon: 'cookie' },
  { id: 'beverages', name: 'Shakes & Mojitos', icon: 'glass-water' },
  { id: 'savory', name: 'Savory & Bites', icon: 'utensils' }
];

const MENU_ITEMS = [
  // --- HOT COFFEE ---
  {
    id: 'cappuccino',
    name: 'Artisan Cappuccino',
    category: 'hot-coffee',
    price: 950,
    badge: 'Best Seller',
    description: 'Double shot of rich Italian-blend espresso topped with velvety micro-foam and a dusting of cocoa.',
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=700&q=80',
    tags: ['Espresso', 'Italian Roast', 'Milk']
  },
  {
    id: 'caramel-macchiato',
    name: 'Caramel Macchiato',
    category: 'hot-coffee',
    price: 1150,
    badge: 'Popular',
    description: 'Freshly steamed milk with vanilla-flavored syrup marked with espresso and drizzled with caramel sauce.',
    image: 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?auto=format&fit=crop&w=700&q=80',
    tags: ['Sweet', 'Caramel', 'Signature']
  },
  {
    id: 'cafe-latte',
    name: 'Caffe Latte',
    category: 'hot-coffee',
    price: 950,
    badge: null,
    description: 'Balanced espresso with generous steamed milk, finished with handcrafted latte art.',
    image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=700&q=80',
    tags: ['Espresso', 'Smooth', 'Classic']
  },
  {
    id: 'cafe-mocha',
    name: 'Rich Cafe Mocha',
    category: 'hot-coffee',
    price: 1200,
    badge: 'Staff Pick',
    description: 'Espresso combined with rich bittersweet chocolate ganache and steamed milk, topped with whipped cream.',
    image: 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?auto=format&fit=crop&w=700&q=80',
    tags: ['Chocolate', 'Indulgent']
  },
  {
    id: 'americano',
    name: 'Classic Americano',
    category: 'hot-coffee',
    price: 800,
    badge: null,
    description: 'Freshly pulled double shot of intense espresso diluted with hot filtered mineral water.',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=700&q=80',
    tags: ['Bold', 'Zero Sugar', 'Pure Coffee']
  },
  {
    id: 'flat-white',
    name: 'Silky Flat White',
    category: 'hot-coffee',
    price: 1000,
    badge: null,
    description: 'Bold ristretto espresso layered under a delicate thin layer of finely steamed micro-foam.',
    image: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&w=700&q=80',
    tags: ['Strong', 'Silky']
  },

  // --- ICED COFFEE ---
  {
    id: 'iced-caramel-latte',
    name: 'Iced Salted Caramel Latte',
    category: 'iced-coffee',
    price: 1250,
    badge: 'Best Seller',
    description: 'Chilled espresso poured over fresh whole milk, salted caramel drizzle, and ice cubes.',
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=700&q=80',
    tags: ['Iced', 'Sweet', 'Refreshing']
  },
  {
    id: 'iced-mocha-frappe',
    name: 'Iced Mocha Frappe',
    category: 'iced-coffee',
    price: 1350,
    badge: 'Popular',
    description: 'Blended espresso, Belgian chocolate sauce, and milk topped with decadent whipped cream and cocoa.',
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=700&q=80',
    tags: ['Blended', 'Chocolate', 'Dessert Coffee']
  },
  {
    id: 'classic-iced-coffee',
    name: 'Sri Lankan Spiced Iced Coffee',
    category: 'iced-coffee',
    price: 950,
    badge: 'Local Favorite',
    description: 'Traditional Lankan cafe iced coffee infused with sweet condensed milk, cardamom, and a hint of vanilla.',
    image: 'https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=700&q=80',
    tags: ['Cardamom', 'Sweet', 'Traditional']
  },
  {
    id: 'iced-americano',
    name: 'Iced Americano',
    category: 'iced-coffee',
    price: 850,
    badge: null,
    description: 'Double espresso shots poured over crystal clear ice and cold water. Clean and revitalizing.',
    image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=700&q=80',
    tags: ['Crisp', 'Sugar-Free']
  },

  // --- CAKES & GATEAUX ---
  {
    id: 'signature-choc-fudge',
    name: 'Signature Chocolate Fudge Gateau (Slice)',
    category: 'cakes',
    price: 1200,
    badge: 'Crowd Favorite',
    description: 'Rich, moist dark chocolate sponge layered with decadent warm fudge icing and chocolate curls.',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=700&q=80',
    tags: ['Rich', 'Dark Chocolate', 'Slice']
  },
  {
    id: 'classic-red-velvet',
    name: 'Classic Red Velvet Slice',
    category: 'cakes',
    price: 1150,
    badge: 'Signature',
    description: 'Velvety crimson cocoa sponge with smooth cream cheese frosting and fine cake crumbs.',
    image: 'https://images.unsplash.com/photo-1616541823729-00fe0aacd32c?auto=format&fit=crop&w=700&q=80',
    tags: ['Cream Cheese', 'Decadent']
  },
  {
    id: 'blueberry-cheesecake',
    name: 'Blueberry Swirl Baked Cheesecake',
    category: 'cakes',
    price: 1350,
    badge: 'Chef’s Special',
    description: 'Creamy New York style cheesecake with a graham cracker crust and wild blueberry compote.',
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=700&q=80',
    tags: ['Baked', 'Berries', 'Cheese']
  },
  {
    id: 'lankan-ribbon-cake',
    name: 'Traditional Butter Ribbon Cake (Slice)',
    category: 'cakes',
    price: 750,
    badge: 'Nostalgic',
    description: 'A nostalgic Sri Lankan party staple. Tri-color butter cake layered with silky vanilla buttercream.',
    image: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&w=700&q=80',
    tags: ['Butter Cake', 'Traditional']
  },
  {
    id: 'coffee-tiramisu-gateau',
    name: 'Espresso Tiramisu Gateau',
    category: 'cakes',
    price: 1300,
    badge: 'Popular',
    description: 'Sponge cake steeped in freshly extracted espresso and topped with mascarpone cream & cocoa.',
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=700&q=80',
    tags: ['Coffee-Infused', 'Italian']
  },

  // --- PASTRIES & DESSERTS ---
  {
    id: 'almond-croissant',
    name: 'Flaky Almond Croissant',
    category: 'pastries',
    price: 900,
    badge: 'Fresh Daily',
    description: 'French butter croissant filled with almond frangipane cream and topped with toasted almond slices.',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=700&q=80',
    tags: ['Buttery', 'Bakery Fresh']
  },
  {
    id: 'fudge-brownie',
    name: 'Gooey Walnut Fudge Brownie',
    category: 'pastries',
    price: 700,
    badge: null,
    description: 'Intensely chocolatey brownie with cracked glossy top and crunchy roasted walnuts.',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=700&q=80',
    tags: ['Warm', 'Walnuts']
  },
  {
    id: 'chocolate-eclair',
    name: 'Parisian Chocolate Eclair',
    category: 'pastries',
    price: 650,
    badge: null,
    description: 'Golden choux pastry filled with vanilla bean pastry cream and glazed with dark Belgian chocolate.',
    image: 'https://images.unsplash.com/photo-1612203985729-70726954388c?auto=format&fit=crop&w=700&q=80',
    tags: ['Choux', 'Vanilla Cream']
  },

  // --- BEVERAGES ---
  {
    id: 'passion-fruit-mojito',
    name: 'Borella Passion Fruit Mojito',
    category: 'beverages',
    price: 950,
    badge: 'Refreshing',
    description: 'Sparkling soda muddled with fresh Sri Lankan passion fruit pulp, mint leaves, and lime wedges.',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=700&q=80',
    tags: ['Fruity', 'Mocktail', 'Cooler']
  },
  {
    id: 'oreo-cream-shake',
    name: 'Oreo Overload Thickshake',
    category: 'beverages',
    price: 1150,
    badge: 'Best Seller',
    description: 'Creamy vanilla ice cream blended with crushed Oreo cookies, milk, and chocolate drizzle.',
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=700&q=80',
    tags: ['Shake', 'Kids Favorite']
  },
  {
    id: 'iced-peach-tea',
    name: 'Iced Peach & Mint Tea',
    category: 'beverages',
    price: 850,
    badge: null,
    description: 'Ceylon black tea brewed fresh and infused with sweet white peach syrup and fresh mint sprigs.',
    image: 'https://images.unsplash.com/photo-1499638673689-79a0b5115d87?auto=format&fit=crop&w=700&q=80',
    tags: ['Ceylon Tea', 'Crisp']
  },

  // --- SAVORY & BITES ---
  {
    id: 'chicken-mushroom-pie',
    name: 'Golden Chicken & Mushroom Pot Pie',
    category: 'savory',
    price: 850,
    badge: 'Hot Seller',
    description: 'Puff pastry crust stuffed with tender seasoned chicken chunks, button mushrooms, and white cream sauce.',
    image: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&w=700&q=80',
    tags: ['Savory', 'Warm Pastry']
  },
  {
    id: 'spicy-fish-cutlets',
    name: 'Devilled Fish Cutlets (4 Pcs)',
    category: 'savory',
    price: 750,
    badge: 'Sri Lankan Classic',
    description: 'Crispy golden crumb-fried spheres made of spiced tuna, mashed potatoes, green chilies, and black pepper.',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=700&q=80',
    tags: ['Spicy', 'Short Eats']
  },
  {
    id: 'cheesy-chicken-panini',
    name: 'Grilled Cheesy Chicken Panini',
    category: 'savory',
    price: 1350,
    badge: 'Meal Choice',
    description: 'Toasted ciabatta with grilled herb chicken breast, melted mozzarella, caramelized onions, and garlic aioli.',
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=700&q=80',
    tags: ['Melted Cheese', 'Hearty']
  }
];

const CAFE_INFO = {
  name: "Cakes and Coffee Borella",
  tagline: "Artisan Coffee, Heavenly Cakes & Cozy Moments in Colombo",
  address: "89 Dr N. M. Perera Mawatha (Cotta Road), Borella, Colombo 00800",
  googleMapsUrl: "https://maps.google.com/?q=89+Dr+NM+Perera+Mawatha+Rd+Colombo+00800",
  embedMapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.7788414437295!2d79.8785!3d6.917!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2590059ab1e09%3A0xf7144f4b0aaee8bd!2scake%20and%20coffee%20borella!5e0!3m2!1sen!2slk!4v1700000000000",
  phone: "+94 70 422 3300",
  phoneDisplay: "070 422 3300",
  whatsappNumber: "94704223300",
  uberEatsUrl: "https://www.ubereats.com/lk",
  rating: 4.6,
  reviewCount: 98,
  priceRange: "Rs. 1,000 – 2,000",
  openingHour: 7.5, // 7:30 AM
  closingHour: 21.0, // 9:00 PM
  peakHours: "9:00 AM & 5:00 PM"
};

const TESTIMONIALS = [
  {
    name: "Dinithi Jayawardena",
    rating: 5,
    date: "2 weeks ago",
    comment: "The chocolate fudge cake is simply out of this world! Super moist and rich without being overly sweet. Paired it with their caramel macchiato. Will definitely be a regular here.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
  },
  {
    name: "Rohan Perera",
    rating: 5,
    date: "a month ago",
    comment: "Cozy spot tucked in Borella. Perfect place to sit with a laptop or meet up with a friend. Their flat white is prepared with genuine barista skill and great espresso beans.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
  },
  {
    name: "Kavindi Samarasinghe",
    rating: 5,
    date: "3 weeks ago",
    comment: "Ordered a birthday gateau for my sister on short notice via WhatsApp. They delivered on time, perfectly inscribed, and everyone at the party praised how fresh the cream and sponge were!",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80"
  },
  {
    name: "Malik Fernando",
    rating: 4,
    date: "2 months ago",
    comment: "Great iced coffee and the chicken & mushroom pie was hot and super flaky. Clean atmosphere, friendly staff, and easy to locate on Dr N. M. Perera Mawatha.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80"
  }
];
