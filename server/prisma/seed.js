const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const products = [
  { id: 1, name: 'Brookside Fresh Milk', price: 120, category: 'Dairy' },
  { id: 2, name: 'Mala Creamy', price: 80, category: 'Dairy' },
  { id: 3, name: 'KCC Butter', price: 350, category: 'Dairy' },
  { id: 4, name: 'Yogurt Vanilla', price: 150, category: 'Dairy' },
  { id: 5, name: 'Cheddar Cheese', price: 420, category: 'Dairy' },
  { id: 6, name: 'White Bread', price: 65, category: 'Bakery' },
  { id: 7, name: 'Brown Bread', price: 75, category: 'Bakery' },
  { id: 8, name: 'Mandazi Pack', price: 100, category: 'Bakery' },
  { id: 9, name: 'Chocolate Cake', price: 600, category: 'Bakery' },
  { id: 10, name: 'Croissant', price: 90, category: 'Bakery' },
  { id: 11, name: 'Tusker Barley', price: 250, category: 'Beverages' },
  { id: 12, name: 'Ketepa Tea', price: 180, category: 'Beverages' },
  { id: 13, name: 'Ground Coffee', price: 320, category: 'Beverages' },
  { id: 14, name: 'Mango Juice', price: 140, category: 'Beverages' },
  { id: 15, name: 'Mineral Water', price: 50, category: 'Beverages' },
  { id: 16, name: 'Basmati Rice', price: 280, category: 'Pantry' },
  { id: 17, name: 'Maize Flour', price: 160, category: 'Pantry' },
  { id: 18, name: 'Cooking Oil', price: 450, category: 'Pantry' },
  { id: 19, name: 'Brown Sugar', price: 130, category: 'Pantry' },
  { id: 20, name: 'Table Salt', price: 45, category: 'Pantry' },
  { id: 21, name: 'Red Apples', price: 220, category: 'Produce' },
  { id: 22, name: 'Bananas', price: 100, category: 'Produce' },
  { id: 23, name: 'Avocados', price: 160, category: 'Produce' },
  { id: 24, name: 'Tomatoes', price: 120, category: 'Produce' },
  { id: 25, name: 'Spinach', price: 70, category: 'Produce' },
  { id: 26, name: 'Beef Mince', price: 650, category: 'Meat' },
  { id: 27, name: 'Chicken Breast', price: 720, category: 'Meat' },
  { id: 28, name: 'Pork Sausages', price: 390, category: 'Meat' },
  { id: 29, name: 'Tilapia Fillet', price: 580, category: 'Meat' },
  { id: 30, name: 'Smoked Bacon', price: 480, category: 'Meat' },
  { id: 31, name: 'Laundry Detergent', price: 560, category: 'Household' },
  { id: 32, name: 'Dishwashing Liquid', price: 210, category: 'Household' },
  { id: 33, name: 'Toilet Paper', price: 300, category: 'Household' },
  { id: 34, name: 'Kitchen Towels', price: 180, category: 'Household' },
  { id: 35, name: 'Trash Bags', price: 240, category: 'Household' },
  { id: 36, name: 'Shampoo', price: 350, category: 'Personal Care' },
  { id: 37, name: 'Body Lotion', price: 280, category: 'Personal Care' },
  { id: 38, name: 'Toothpaste', price: 150, category: 'Personal Care' },
  { id: 39, name: 'Bar Soap', price: 90, category: 'Personal Care' },
  { id: 40, name: 'Deodorant', price: 260, category: 'Personal Care' },
  { id: 41, name: 'Potato Crisps', price: 130, category: 'Snacks' },
  { id: 42, name: 'Salted Peanuts', price: 110, category: 'Snacks' },
  { id: 43, name: 'Chocolate Bar', price: 100, category: 'Snacks' },
  { id: 44, name: 'Butter Cookies', price: 190, category: 'Snacks' },
  { id: 45, name: 'Popcorn', price: 80, category: 'Snacks' },
  { id: 46, name: 'Notebook', price: 120, category: 'Stationery' },
  { id: 47, name: 'Ballpoint Pens', price: 60, category: 'Stationery' },
  { id: 48, name: 'A4 Printing Paper', price: 700, category: 'Stationery' },
  { id: 49, name: 'Highlighter', price: 90, category: 'Stationery' },
  { id: 50, name: 'Stapler', price: 250, category: 'Stationery' },
];

async function main() {
  await prisma.$transaction(
    products.map((product) =>
      prisma.product.upsert({
        where: { id: product.id },
        update: product,
        create: product,
      }),
    ),
  );

  console.log(`Seeded ${products.length} products.`);
}

main()
  .catch((error) => {
    console.error('Failed to seed products:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
