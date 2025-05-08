const mongoose = require('mongoose');
const Service = require('../models/Service');
const Product = require('../models/Product');
require('dotenv').config();

const services = [
    {
        name: "Women's Haircut",
        description: "Professional haircut with wash and style",
        price: 45.00,
        duration: 60,
        category: "haircut",
        image: "haircut-women.jpg"
    },
    {
        name: "Hair Coloring",
        description: "Full hair coloring service",
        price: 85.00,
        duration: 120,
        category: "coloring",
        image: "hair-coloring.jpg"
    }
    // Add more services as needed
];

const products = [
    {
        name: "Luxury Shampoo",
        description: "Premium hair cleansing formula",
        price: 24.99,
        category: "haircare",
        stock: 50,
        image: "shampoo.jpg",
        rating: 4.5
    },
    {
        name: "Hair Treatment Oil",
        description: "Nourishing hair oil treatment",
        price: 29.99,
        category: "treatment",
        stock: 30,
        image: "hair-oil.jpg",
        rating: 4.8
    }
    // Add more products as needed
];

const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        
        await Service.deleteMany({});
        await Product.deleteMany({});
        
        await Service.insertMany(services);
        await Product.insertMany(products);
        
        console.log('Database seeded successfully');
        process.exit();
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();