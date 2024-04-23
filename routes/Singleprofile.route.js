const express = require('express');
const mongoose = require('mongoose');
const Profile = require("../model/profile.model");

const router = express.Router();

router.route('/:id').get(async (req,res) => {
    console.log(req)
    try {
        const profileId = req.params.id
        console.log(profileId);
        const SingleProfile = await Profile.findById(profileId);
        res.json(SingleProfile)
    } catch (error) {
        console.log(error);
        res.json({"message": "Not able to fetch the single profile details"});
    }
})

module.exports = router;