const express = require('express');
const mongoose = require('mongoose');
const Profile = require('../model/profile.model');
const Filter = require('../model/filter.model');

const router = express.Router();

router.route('/').get( async (req,res) => {
    console.log('xyz',req)
    try {
        const qCategory = req.query.Category
        const qCity = req.query.City
        const qState = req.query.State
        const qClass = req.query.Class;
        const qSubject = req.query.Subject;
        const qNameContains = req.query.NameContains;
        console.log('hello',qNameContains,qClass,qSubject)

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

        if (qNameContains) {
            query.Name = { $regex: qNameContains, $options: 'i' };  // Case-insensitive search
        }

        if (qClass && qSubject) {
            query.Course = {
                $elemMatch: { Class: qClass, Subject: qSubject }
            };
        } else if (qClass) {
            query.Course = {
                $elemMatch: { Class: qClass }
            };
        } else if (qSubject) {
            query.Course = {
                $elemMatch: { Subject: qSubject }
            };
        }

        console.log(query);
        const qprofile = await Profile.find(query)
        res.json(qprofile)
    } catch (error) {
        console.log(error)        
    }
})

router.route('/filterOptions').get( async (req,res) => {
    try {
        const query = {domainName: 'School'}
        const qfilter = await Filter.find(query)
        res.json(qfilter)
    } catch (error) {
        console.log(error)        
    }
})

module.exports = router;