const express = require('express')
const mongoose =require('mongoose')
const wishList = require('../model/wishlist.model')
const Profile = require('../model/profile.model');

const router = express.Router();

router.route('/check').get(async(req,res) => {
    try {
        const getWishList = await wishList.findOne({email:req.query.email, profileId:req.query.profileId});
        if (getWishList) {
            res.status(200).json({ exists: true });
        } else {
            res.status(200).json({ exists: false });
        }
    } catch (error) {
        console.log(error);
    }
})

router.route('/').get(async(req,res) => {
    // console.log('uuuu',req.query)
    try {
        const getWishList = await wishList.find({email:req.query.email});
        const data = await Promise.all(getWishList.map(async e => {
            const profile = await Profile.findById(e.profileId);
            return profile;
        }));
        res.json(data)
    } catch (error) {
        console.log(error);
    }
})

router.route('/').post(async(req,res) => {
    const newWishList = new wishList(req.body)
    try {
        const savedWishList = await newWishList.save();
        res.status(201).json(savedWishList)
    } catch (error) {
        console.log(error);
    }

})

router.route('/').delete(async (req,res) => {
    try {
        const DeleteProfileFromWishlist = await wishList.findOne({email:req.query.email, profileId:req.query.profileId})
        await wishList.findByIdAndDelete(DeleteProfileFromWishlist._id);
        res.json('Profile deleted Successfully');
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;