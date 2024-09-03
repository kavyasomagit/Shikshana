const express = require('express');
const mongoose = require('mongoose');
const {v4: uuid} = require('uuid');


const Profile = require("../model/profile.model");
const Filter = require("../model/filter.model");
const profiles = require("../data/profile");

const router = express.Router();
const filterNameList = ['City', 'State', 'Category', 'Class', 'Subject']
var filterOptionsData = {}
router.route("/").post(async (req, res) => {
    try {
        await Profile.deleteMany({});
        const profileInDB = await Profile.insertMany(profiles.data);
        res.json(profileInDB)
        
    } catch (error) {
        console.log(error)
        res.json({message: "Could not add to the DB"})
    }  
}).get(async(req, res) => {
    try {
        const profileInDB = await Profile.find({})
        res.json(profileInDB)
    } catch (error) {
        console.log(error)
        res.json({message: "Could not get the DB profiles"})
    }
})

router.route("/filterOptionsPost").post(async(req,res) => {
    try {
        filterNameList.forEach(val => {
            filterOptionsData[val]=[];
        });

        profiles.data.forEach(item => {
            filterNameList.forEach(val => {
                if (val !== 'Class' && val !== 'Subject') {
                if (!filterOptionsData[val].includes(item[val])) {
                    filterOptionsData[val].push(item[val]);
                } }
                else if (val === 'Class' || val === 'Subject') {
                    item.Course.forEach(course => {
                        if (!filterOptionsData['Class'].includes(course['Class'])) {
                            filterOptionsData['Class'].push(course['Class']);
                        }
                        if (!filterOptionsData['Subject'].includes(course['Subject'])) {
                            filterOptionsData['Subject'].push(course['Subject']);
                        }
                    });
                }
              });            
        });

        const filterData = [{
            id:uuid(),
            domainName: "School",
            filterName: filterNameList,
            filterOptions: filterOptionsData
        }]
        console.log(filterData)
        await Filter.deleteMany({});
        const filterInDB = await Filter.insertMany(filterData);
        res.json(filterInDB)

    } catch (error) {
        console.log('Not able to add the filter Options');
    }
})

module.exports = router;
