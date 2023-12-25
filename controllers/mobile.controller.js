const mongoose = require('mongoose');
const Mobile = require('../models/mobile.model');

exports.getAllMobiles = async (req, res) => {
    try {
        let { brands, types, memoryOptions, processors, operatingSystems } = req.query;
        
        brands = brands?.split(',');
        console.log("brands", brands);
        types = types?.split(',');
        memoryOptions = memoryOptions?.split(',');
        processors = processors?.split(',');
        operatingSystems = operatingSystems?.split(',');

        const filter = {};

        if (brands && brands.length > 0) {
            filter.brand = { $in: brands };
        }

        if (types && types.length > 0) {
            filter.type = { $in: types };
        }

        if (memoryOptions && memoryOptions.length > 0) {
            filter.memory = { $in: memoryOptions };
        }

        if (processors && processors.length > 0) {
            filter.processor = { $in: processors };
        }

        if (operatingSystems && operatingSystems.length > 0) {
            filter.os = { $in: operatingSystems };
        }

        // Use the filter object to query the database
        const mobiles = await Mobile.find(filter);
        res.status(200).json({ success: true, message: 'Mobiles retrieved successfully', data: mobiles });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
};

exports.getMobileById = async (req, res) => {
    const mobileId = req.params.id;
  
    try {
        const mobile = await Mobile.findById(mobileId);
    
        if (!mobile) {
            return res.status(404).json({ success: false, message: 'Mobile not found' });
        }
    
        res.status(200).json({ success: true, message: 'Mobile retrieved successfully', data: mobile });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
};

exports.addMobiles = async (req, res) => {
    try {
        // Dummy mobile data
        const dummyMobiles = [
            {
                name: "iPhone 13",
                brand: "Apple",
                price: 1099.99,
                type: "Smartphone",
                memory: "128GB",
                processor: "A15 Bionic",
                os: "iOS 15",
                availableStocks: 50,
            },
            {
                name: "Samsung Galaxy S21",
                brand: "Samsung",
                price: 899.99,
                type: "Smartphone",
                memory: "256GB",
                processor: "Exynos 2100",
                os: "Android 11",
                availableStocks: 30,
            },
            {
                name: "Google Pixel 6",
                brand: "Google",
                price: 799.99,
                type: "Smartphone",
                memory: "128GB",
                processor: "Google Tensor",
                os: "Android 12",
                availableStocks: 20,
            },
            {
                name: "OnePlus 9",
                brand: "OnePlus",
                price: 749.99,
                type: "Smartphone",
                memory: "256GB",
                processor: "Snapdragon 888",
                os: "OxygenOS 11",
                availableStocks: 40,
            },
            {
                name: "Xiaomi Redmi Note 10",
                brand: "Xiaomi",
                price: 299.99,
                type: "Budget Smartphone",
                memory: "64GB",
                processor: "Snapdragon 678",
                os: "MIUI 12",
                availableStocks: 60,
            },
            {
                name: "Sony Xperia 5 III",
                brand: "Sony",
                price: 999.99,
                type: "Smartphone",
                memory: "256GB",
                processor: "Snapdragon 888",
                os: "Android 11",
                availableStocks: 25,
            },
            {
                name: "LG Velvet",
                brand: "LG",
                price: 699.99,
                type: "Smartphone",
                memory: "128GB",
                processor: "Snapdragon 765",
                os: "Android 10",
                availableStocks: 15,
            },
            {
                name: "Motorola Moto G Power",
                brand: "Motorola",
                price: 249.99,
                type: "Budget Smartphone",
                memory: "64GB",
                processor: "Snapdragon 662",
                os: "Android 10",
                availableStocks: 35,
            },
            {
                name: "Nokia 8.3",
                brand: "Nokia",
                price: 599.99,
                type: "Smartphone",
                memory: "128GB",
                processor: "Snapdragon 765G",
                os: "Android 10",
                availableStocks: 18,
            },
            {
                name: "Asus ROG Phone 5",
                brand: "Asus",
                price: 1299.99,
                type: "Gaming Smartphone",
                memory: "256GB",
                processor: "Snapdragon 888",
                os: "ROG UI (Android 11)",
                availableStocks: 10,
            },
            {
                name: "BlackBerry Key2",
                brand: "BlackBerry",
                price: 599.99,
                type: "QWERTY Smartphone",
                memory: "64GB",
                processor: "Snapdragon 660",
                os: "Android 8.1",
                availableStocks: 12,
            },
            {
                name: "Huawei P40 Pro",
                brand: "Huawei",
                price: 899.99,
                type: "Smartphone",
                memory: "256GB",
                processor: "Kirin 990 5G",
                os: "EMUI 10.1",
                availableStocks: 22,
            },
            {
                name: "Oppo Find X3 Pro",
                brand: "Oppo",
                price: 1199.99,
                type: "Smartphone",
                memory: "256GB",
                processor: "Snapdragon 888",
                os: "ColorOS 11.2",
                availableStocks: 28,
            },
            {
                name: "Vivo X60 Pro",
                brand: "Vivo",
                price: 799.99,
                type: "Smartphone",
                memory: "256GB",
                processor: "Exynos 1080",
                os: "Funtouch OS 11.1",
                availableStocks: 25,
            },
            {
                name: "Realme GT",
                brand: "Realme",
                price: 499.99,
                type: "Smartphone",
                memory: "128GB",
                processor: "Snapdragon 870",
                os: "Realme UI 2.0",
                availableStocks: 30,
            },
            {
                name: "ZTE Axon 30 Ultra",
                brand: "ZTE",
                price: 899.99,
                type: "Smartphone",
                memory: "256GB",
                processor: "Snapdragon 888",
                os: "MyOS (Android 11)",
                availableStocks: 15,
            },
            {
                name: "Lenovo Legion Phone Duel 2",
                brand: "Lenovo",
                price: 1099.99,
                type: "Gaming Smartphone",
                memory: "512GB",
                processor: "Snapdragon 888",
                os: "Legion OS (Android 11)",
                availableStocks: 8,
            },
            {
                name: "Alcatel 3L (2021)",
                brand: "Alcatel",
                price: 149.99,
                type: "Budget Smartphone",
                memory: "64GB",
                processor: "Mediatek MT6762",
                os: "Android 11",
                availableStocks: 45,
            },
            {
                name: "CAT S62 Pro",
                brand: "CAT",
                price: 599.99,
                type: "Rugged Smartphone",
                memory: "128GB",
                processor: "Snapdragon 660",
                os: "Android 10",
                availableStocks: 20,
            },
            {
                name: "Fairphone 4",
                brand: "Fairphone",
                price: 549.99,
                type: "Sustainable Smartphone",
                memory: "128GB",
                processor: "Snapdragon 662",
                os: "Fairphone OS (Android 11)",
                availableStocks: 15,
            },
        ];        
    
        // Insert dummy mobiles into the database
        await Mobile.insertMany(dummyMobiles);
    
        console.log('Dummy mobiles added to the database');
        res.status(201).json('Dummy mobiles added to the database')
    
        // Close the MongoDB connection
        mongoose.connection.close();
    } catch (error) {
        console.error('Error adding dummy mobiles:', error.message);
        res.status(201).json(error.message)
    }
}

exports.getAllOptions = async (req, res) => {
    try {
        const brands = await Mobile.distinct('brand');
        const types = await Mobile.distinct('type');
        const memoryOptions = await Mobile.distinct('memory');
        const processors = await Mobile.distinct('processor');
        const operatingSystems = await Mobile.distinct('os');
    
        res.status(200).json({
            success: true,
            data: {
                brands,
                types,
                memory_options: memoryOptions,
                processors,
                operating_systems: operatingSystems,
            },
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
};

exports.searchMobiles = async (req, res) => {
    try {
        const keyword = req.query.keyword;
    
        if (!keyword) {
            return res.status(400).json({ success: false, message: 'Keyword is required for search.' });
        }
    
        const regex = new RegExp(keyword, 'i');
    
        const searchResults = await Mobile.find({
            $or: [
                { name: regex },
                { brand: regex },
                { type: regex },
                { memory: regex },
                { processor: regex },
                { os: regex },
            ],
        });
    
        res.status(200).json({ success: true, message: 'Search results retrieved successfully', data: searchResults });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
};