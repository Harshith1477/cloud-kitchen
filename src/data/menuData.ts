export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  isVeg: boolean;
  prepTime: number;
}

export const categories = [
  { id: 'all', name: 'All', icon: '🍽️' },
  { id: 'burgers', name: 'Burgers', icon: '🍔' },
  { id: 'wraps', name: 'Wraps', icon: '🌯' },
  { id: 'sides', name: 'Sides', icon: '🍟' },
  { id: 'drinks', name: 'Drinks', icon: '🥤' },
  { id: 'combos', name: 'Combos', icon: '🎁' },
];

export const menuItems: MenuItem[] = [
  { id: '1', name: 'Smash Burger', description: 'Double smashed patty, cheddar, caramelized onions, house sauce', price: 249, category: 'burgers', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop', isVeg: false, prepTime: 12 },
  { id: '2', name: 'Truffle Burger', description: 'Truffle aioli, swiss cheese, mushrooms, arugula', price: 349, category: 'burgers', image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&h=300&fit=crop', isVeg: false, prepTime: 15 },
  { id: '3', name: 'Veggie Supreme', description: 'Crispy paneer patty, lettuce, tomato, mint mayo', price: 199, category: 'burgers', image: 'https://images.unsplash.com/photo-1585238342024-78d387f4a707?w=400&h=300&fit=crop', isVeg: true, prepTime: 10 },
  { id: '4', name: 'Chicken Shawarma', description: 'Grilled chicken, garlic sauce, pickled veggies, pita', price: 179, category: 'wraps', image: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=400&h=300&fit=crop', isVeg: false, prepTime: 8 },
  { id: '5', name: 'Paneer Tikka Wrap', description: 'Smoky paneer tikka, onions, chutney, rumali roti', price: 169, category: 'wraps', image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&h=300&fit=crop', isVeg: true, prepTime: 10 },
  { id: '6', name: 'Loaded Fries', description: 'Crispy fries, cheese sauce, jalapeños, bacon bits', price: 149, category: 'sides', image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=300&fit=crop', isVeg: false, prepTime: 6 },
  { id: '7', name: 'Onion Rings', description: 'Beer-battered crispy onion rings with chipotle dip', price: 129, category: 'sides', image: 'https://images.unsplash.com/photo-1639024471283-03518883512d?w=400&h=300&fit=crop', isVeg: true, prepTime: 5 },
  { id: '8', name: 'Berry Blast Shake', description: 'Mixed berries, vanilla ice cream, whipped cream', price: 159, category: 'drinks', image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=400&h=300&fit=crop', isVeg: true, prepTime: 4 },
  { id: '9', name: 'Cold Brew Coffee', description: 'Slow-steeped cold brew with hazelnut syrup', price: 129, category: 'drinks', image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop', isVeg: true, prepTime: 3 },
  { id: '10', name: 'Burger + Fries Combo', description: 'Smash burger + loaded fries + cold drink', price: 399, category: 'combos', image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=400&h=300&fit=crop', isVeg: false, prepTime: 15 },
  { id: '11', name: 'Wrap Meal Deal', description: 'Any wrap + onion rings + berry shake', price: 349, category: 'combos', image: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400&h=300&fit=crop', isVeg: false, prepTime: 12 },
  { id: '12', name: 'Veggie Feast', description: 'Veggie burger + fries + shake — all veg', price: 379, category: 'combos', image: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=400&h=300&fit=crop', isVeg: true, prepTime: 14 },
];
