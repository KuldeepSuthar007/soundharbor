const express = require('express');
const router = express.Router();
const Product = require('../models/products');
const CartItem = require('../models/cartitem')
const mongoose = require('mongoose');


router.get('/getproduct', async (req, res) => {

    try {
        let search = req.query.search || "";
        const price = req.query.price || "";
        const colour = req.query.colour || "";
        const company = req.query.company || "";
        let headphonetype = req.query.headphonetype || "";
        const sortBy = req.query.sortBy || "";
        const sortOrder = req.query.sortOrder || "";


        const filter = {};
        const regexOptions = "i";


        if (search && search.length != 0) {

            filter.$or = [
                { company: { $regex: search, $options: regexOptions } },

            ];
        }

        if (company && company.length != 0) {
            filter.company = { $regex: company, $options: regexOptions }
        }

        if (headphonetype && headphonetype.length != 0) {
            filter.headphonetype = { $regex: headphonetype, $options: regexOptions }

        }

        if (colour && colour.length != 0) {
            filter.colour = { $regex: colour, $options: regexOptions }

        }

        if (price && price.length != 0) {
            if (price == "0-1000") filter.price = { $gt: 0, $lt: 1000 }
            else if (price == "1000-10000") filter.price = { $gt: 1000, $lt: 10000 }
            else if (price == "10000-20000") filter.price = { $gt: 10000, $lt: 20000 }
        }

        const filterproducts = await Product.find(filter);
        if (sortBy) {

            const sortproducts = await filterproducts.sort((a, b) => {
                if (sortBy === 'price') {
                    return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
                } else if (sortBy === 'company') {
                    const companyA = a.company.toLowerCase();
                    const companyB = b.company.toLowerCase();
                    return sortOrder === 'asc' ? companyA.localeCompare(companyB) : companyB.localeCompare(companyA);
                } else {
                    // Handle other sorting criteria if needed
                    return 0;
                }
            });

            return res.status(200).json({
                products: sortproducts
            });
        }

        return res.status(200).json({
            products: filterproducts
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            suceess: false,
            errormessage: "Something went wrong"
        })
    }
})

router.get('/detail-product/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        const result = await Product.findById({ _id })
        return res.status(200).json(
            result
        )
    } catch (error) {
        console.log(error)
        res.status(500).json({
            suceess: false,
            errormessage: "Something went wrong"
        })
    }
})

router.get('/details', async (req, res) => {
    try {
        const productIds = req.query.productIds;
        const products = await Product.find({ _id: { $in: productIds } });
        res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching product details:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/add-to-cart', async (req, res) => {

    try {
        const { userId, productId, quantity } = req.body;
        const existingCartItem = await CartItem.findOne({ userId, productId });
        if (existingCartItem) {
            existingCartItem.quantity += quantity;
            await existingCartItem.save();
        }
        else {
            const newCartItem = new CartItem({ userId, productId, quantity });
            await newCartItem.save();
        }
        return res.status(201).json(
            { message: "Item added to cart successfully" }
        );

    } catch (error) {
        console.log(error)
        res.status(500).json({
            suceess: false,
            errormessage: "Internal Server error"
        })
    }

})


router.get("/get-cart", async (req, res) => {

    try {
        const userId = req.params.userId;
        const cartItems = await CartItem.find(userId);
        const cartWithProductDetails = await Promise.all(cartItems.map(async (cartItem) => {

            const product = await Product.findById(cartItem.productId);
            return {
                _id: cartItem._id,
                productId: cartItem.productId,
                quantity: cartItem.quantity,
                product: product,

            };
        }));
        return res.status(200).json(
            cartWithProductDetails
        );
    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            suceess: false,
            errormessage: "Internal Server error"
        })
    }

})


router.put('/cart/update-quantity', async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        const updatedCartItem = await CartItem.findOneAndUpdate(
            { userId, productId },
            { quantity },
            { new: true }
        );

        if (!updatedCartItem) {
            return res.status(404).json({ message: 'Cart item not found' });
        }
        res.status(200).json(updatedCartItem);
    } catch (error) {
        console.error('Error updating cart item quantity:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.delete('/:cartItemId', async (req, res) => {
    try {

        const cartItemIds = req.params.cartItemId.split(',');

        const cartItemObjectIdIds = cartItemIds.map((id) => new mongoose.Types.ObjectId(id));
        const result = await CartItem.deleteMany({ productId: { $in: cartItemObjectIdIds } });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Cart items not found' });
        }

        res.status(200).json({ message: 'Cart items deleted successfully' });
    } catch (error) {
        console.error('Error deleting cart items:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


module.exports = router;