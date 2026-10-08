import { Product } from '@/types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'ishka-p-01',
    name: 'Heavy Heavy Heavy Pearl & Zardosi Silk Laddu Gopal Poshak',
    hindiName: 'रेशमी ज़रदोजी व मोती लड्डू गोपाल पोशाक',
    category: 'kanha-poshak',
    categoryName: 'Kanha Ji Poshak',
    description: 'Special designer heavy silk dress with hand-embroidery, zardosi, and lustrous pearls crafted specifically for Laddu Gopal Ji. Ideal for Janmashtami, Festivals, and Daily Shringar.',
    images: [
      'https://images.unsplash.com/photo-1609252925148-b0f1b515e111?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1615486511484-92e172cc4fe0?w=800&auto=format&fit=crop&q=80'
    ],
    featured: true,
    bestseller: true,
    rating: 4.9,
    reviewCount: 142,
    weightGrams: 150,
    lengthCm: 20,
    widthCm: 20,
    heightCm: 5,
    hasSizeVariants: true,
    defaultPrice: 349,
    defaultMrp: 599,
    fabric: 'Pure Silk & Zardosi Handwork',
    careInstructions: 'Dry clean or gentle spot cleaning only',
    variants: [
      { size: '0 No.', price: 249, mrp: 450, stock: 15 },
      { size: '1 No.', price: 299, mrp: 499, stock: 20 },
      { size: '2 No.', price: 349, mrp: 599, stock: 25 },
      { size: '3 No.', price: 399, mrp: 699, stock: 18 },
      { size: '4 No.', price: 449, mrp: 799, stock: 12 },
      { size: '5 No.', price: 499, mrp: 899, stock: 10 },
      { size: '6 No.', price: 599, mrp: 999, stock: 8 }
    ]
  },
  {
    id: 'ishka-p-02',
    name: 'Royal Peacock Feather (Mor Pankh) Crown & Mukut Set',
    hindiName: 'शाही मोर पंख मुकुट एवं शृंगार सेट',
    category: 'kanha-shringar',
    categoryName: 'Kanha Ji Shringar',
    description: 'Exquisite Kundan studded crown featuring real natural mor pankh, matching flute (bansuri), and matching kundals for Kanha Ji.',
    images: [
      'https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?w=800&auto=format&fit=crop&q=80'
    ],
    featured: true,
    bestseller: true,
    rating: 4.8,
    reviewCount: 98,
    weightGrams: 80,
    lengthCm: 15,
    widthCm: 12,
    heightCm: 4,
    hasSizeVariants: true,
    defaultPrice: 199,
    defaultMrp: 399,
    fabric: 'Brass & Kundan Stone',
    variants: [
      { size: '0-2 No.', price: 199, mrp: 399, stock: 30 },
      { size: '3-4 No.', price: 249, mrp: 499, stock: 25 },
      { size: '5-6 No.', price: 299, mrp: 599, stock: 15 }
    ]
  },
  {
    id: 'ishka-p-03',
    name: 'Carved Wooden Brass Jhula for Laddu Gopal Ji',
    hindiName: 'नक्काशीदार पीतल व लकड़ी का झूला',
    category: 'kanha-shringar',
    categoryName: 'Kanha Ji Shringar',
    description: 'Handcrafted solid teakwood swing with ornate brass bells and velvet seat cushion for Kanha Ji. Perfect centerpiece for your home temple.',
    images: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80'
    ],
    featured: true,
    bestseller: false,
    rating: 5.0,
    reviewCount: 54,
    weightGrams: 850,
    lengthCm: 30,
    widthCm: 25,
    heightCm: 35,
    hasSizeVariants: false,
    defaultPrice: 1299,
    defaultMrp: 1999,
    variants: [
      { size: 'Standard (Up to 6 No.)', price: 1299, mrp: 1999, stock: 10 }
    ]
  },
  {
    id: 'ishka-p-04',
    name: 'Diwali Handmade Marigold Flower Garland (Toran)',
    hindiName: 'शुभ दीपावली हस्तनिर्मित गेंदा फूल तोरण',
    category: 'festival-decor',
    categoryName: 'Festival Decor',
    description: 'Vibrant artificial velvet marigold flower door hanging toran with golden bells for Diwali, Janmashtami & Home Entrance Decoration.',
    images: [
      'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800&auto=format&fit=crop&q=80'
    ],
    featured: true,
    bestseller: true,
    rating: 4.7,
    reviewCount: 210,
    weightGrams: 200,
    lengthCm: 40,
    widthCm: 15,
    heightCm: 8,
    hasSizeVariants: true,
    defaultPrice: 299,
    defaultMrp: 599,
    variants: [
      { size: '3 Feet Door', price: 299, mrp: 599, stock: 50 },
      { size: '5 Feet Door', price: 449, mrp: 799, stock: 40 }
    ]
  },
  {
    id: 'ishka-p-05',
    name: 'Pure Brass Akhand Jyot Diya with Glass Cover',
    hindiName: 'कांच कवर के साथ शुद्ध पीतल अखंड जोत दीया',
    category: 'puja-essentials',
    categoryName: 'Puja Essentials',
    description: 'Heavy gauge pure brass Akhand Diya with borosilicate thermal glass cover that stays lit for up to 24 hours without wind disturbance.',
    images: [
      'https://images.unsplash.com/photo-1605371924599-2d0365da1ae0?w=800&auto=format&fit=crop&q=80'
    ],
    featured: false,
    bestseller: true,
    rating: 4.9,
    reviewCount: 175,
    weightGrams: 450,
    lengthCm: 15,
    widthCm: 15,
    heightCm: 18,
    hasSizeVariants: true,
    defaultPrice: 499,
    defaultMrp: 899,
    variants: [
      { size: 'Medium (12 Hours)', price: 499, mrp: 899, stock: 35 },
      { size: 'Large (24 Hours)', price: 699, mrp: 1199, stock: 25 }
    ]
  },
  {
    id: 'ishka-p-06',
    name: 'Complete Janmashtami Puja & Shringar Samagri Kit',
    hindiName: 'संपूर्ण जन्माष्टमी पूजा व शृंगार सामग्री किट',
    category: 'puja-essentials',
    categoryName: 'Puja Essentials',
    description: 'Complete all-in-one hamper containing Organic Chandan, Kumkum, Akshat, Tulsi Mala, Cotton Wicks, Itra (Perfume), and Mini Panchamrut bowl.',
    images: [
      'https://images.unsplash.com/photo-1621847468516-1ed5d0df56fe?w=800&auto=format&fit=crop&q=80'
    ],
    featured: true,
    bestseller: true,
    rating: 4.9,
    reviewCount: 320,
    weightGrams: 600,
    lengthCm: 25,
    widthCm: 20,
    heightCm: 10,
    hasSizeVariants: false,
    defaultPrice: 599,
    defaultMrp: 999,
    variants: [
      { size: 'Complete Kit', price: 599, mrp: 999, stock: 40 }
    ]
  }
];
