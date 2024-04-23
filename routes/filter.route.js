const express = require('express');
const mongoose = require('mongoose');
const Profile = require('../model/profile.model');

const router = express.Router();

router.route('/').get( async (req,res) => {
    try {
        const qCategory = req.query.Category
        const qCity = req.query.City
        const qState = req.query.State
        const query = {}
        if(qCategory){
            query.Category = qCategory
        }
        if(qCity){
            query.City = qCity
        }
        if(qState){
            query.State = qState
        }
        const qprofile = await Profile.find(query)
        res.json(qprofile)
    } catch (error) {
        console.log(error)        
    }
})

module.exports = router;