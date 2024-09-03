const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const profileroute = require('./routes/profile.route');
const profileDataAddedTotheRouter = require('./routes/dataimport.route');
const SingleProfileRouter = require('./routes/Singleprofile.route');
const FilteredProfiles = require('./routes/filter.route');
const userDetail = require('./routes/user.route');
const WishList = require('./routes/wishList.route');


const connectDB = require('./config/dbconfig');

const app = express();
app.use(cors());

app.use(express.json());
connectDB();

const PORT = 3500;

app.get('/', (req,res) => {
    res.send("Hello")
})


app.use('/api/profiledata', profileDataAddedTotheRouter);
app.use('/api/profiles', profileroute);
app.use('/api/SingleProfile', SingleProfileRouter);
app.use('/api/filter',FilteredProfiles );
app.use('/api/auth', userDetail);
app.use('/api/wishList', WishList);


mongoose.connection.once("open", () => {
    console.log("connect to the DB");
    app.listen( process.env.PORT || PORT, () => {
        console.log('server is up and running');
    })   
})