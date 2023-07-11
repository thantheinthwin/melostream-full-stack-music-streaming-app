const router = require('express').Router();

const user = require("../models/user");
const admin = require('../config/firebase.config');

router.get("/loginWithGoogle", async (req, res) => {
    if(!req.headers.authorization){
        return res.status(500).send({message : "Invalid Token"});
    }

    const token = req.headers.authorization.split(" ")[1];
    try{
        // Decoding the token
        const decodeValue = await admin.auth().verifyIdToken(token);

        if(!decodeValue){
            return res.status(505).json({message: "Unauthorized"});
        }
        else{
            // Checking user exists or not
            const userExists = await user.findOne({"user_id" : decodeValue.user_id});

            if(!userExists){
                newUserData(decodeValue, req, res);
            }else{
                updateUserData(decodeValue, req, res);
            }
        }
    }catch(error){
        return res.status(505).json({message: error});
    }
})

router.get("/login", async (req, res) => {
    if(!req.headers.authorization){
        return res.status(500).send({message : "Invalid Token"});
    }

    const token = req.headers.authorization.split(" ")[1];
    try {
        // Decoding the token
        const decodeValue = await admin.auth().verifyIdToken(token);

        if(!decodeValue){
            return res.status(505).json({message: "Unauthorized"});
        } else {
            // return res.status(200).json({decodeValue});
            updateUserData(decodeValue, req, res);
        }
    } catch (error) {
        return res.status(505).json({message: error});
    }
})

router.post('/signup', async (req, res) => {
    if(!req.headers.authorization){
        return res.status(500).send({message : "Invalid Token"});
    }

    const token = req.headers.authorization.split(" ")[1];

    try {
        const decodeValue = await admin.auth().verifyIdToken(token);

        if(!decodeValue){
            return res.status(505).json({message: "Unauthorized"})
        }else{
            const userExists = await user.findOne({"email": req.body.email});

            if(!userExists){
                decodeValue.name = req.body.username;
                newUserData(decodeValue, req, res);
            
            }else{
                return res.status(400).send({success: false, message: "User already exists"})
            }
        }
        
    } catch (error) {
        return res.status(500).send({message: error})
    }
})

// Creating new User
const newUserData = async (decodeValue, req, res) => {
    const newUser = new user({
        name: decodeValue.name,
        email: decodeValue.email,
        imageURL: decodeValue.picture || null,
        user_id: decodeValue.user_id,
        password: decodeValue.password || "",
        ph_number: null,
        likedSongs: [],
        email_verified: decodeValue.email_verified,
        role: "member",
        subscription: false,
        auth_time: decodeValue.auth_time
    })

    try {
        const savedUser = await newUser.save();
        res.status(200).send({user: savedUser})
    }catch(error){
        res.status(400).send({success: false, message: error});
    }
}

// Updating the existing user
const updateUserData = async (decodeValue, req, res) => {
    const filter = {user_id: decodeValue.user_id};

    const options = {
        upsert: true,
        new: true
    };

    try {
        const result = await user.findOneAndUpdate(
            filter, 
            {
                auth_time : decodeValue.auth_time,
                email_verified : decodeValue.email_verified, 
            },
            options
        );
        res.status(200).send({user: result});
    } catch (error) {
        res.status(400).send({success: false, message: error});
    }
}

router.get("/getUsers", async (req, res) => {
    const options = {
        sort: {
            createdAt: 1,
        }
    };

    const data = await user.find().sort(options.sort);

    if (data) {
        res.status(200).send({success: true, data: data});
    }
    else {
        res.status(400).send({success: failed, msg: "No data found"})
    }
})

// Deleting a user
router.delete('/deleteUser/:id', async (req, res) => {
    const filter = { user_id: req.params.id };
    const result = await user.deleteOne(filter);

    admin.auth().deleteUser(req.params.id).then(() => {
        if (result.deletedCount === 1){
            return res.status(200).send({success: true, msg: "User deleted"});
        } else {
            return res.status(500).send({success: false, msg: "User not found"});
        }
    }).catch((error) => {
        return res.status(400).send({message: error})
    })
})

// Updating phone number
router.post('/updatePhoneNumber/:id/:ph_number', async (req, res) => {
    const uid = req.params.id;
    const ph_number = req.params.ph_number;

    const options = {
        upsert: true,
        new: true,
    }

    if(!uid || !ph_number){
        return res.status(500).send({message: "Input invalid"})
    }
    else {
        try {
            const result = await user.findOneAndUpdate(
                {user_id: uid},
                {
                    ph_number: ph_number
                },
                options
            );
            res.status(200).send({user: result});
        } catch (error) {
            res.status(400).send({success: false, message: error});
        }
    }
})

// Updating profile image
router.post('/updateProfileImage', async (req, res) => {
    const uid = req.body.user_id;
    const imageURL = req.body.imageURL;

    const options = {
        upsert: true,
        new: true
    }

    if(!uid || !imageURL){
        return res.status(500).send({message: 'Input invalid'})
    }
    else{
        try {
            const result = await user.findOneAndUpdate(
                {user_id: uid},
                {
                    imageURL: imageURL
                },
                options
            );
            res.status(200).send({user: result})
        } catch (error) {
            res.status(400).send({success: false, message: error})
        }
    }
})

router.get('/changeAccountType/:id', async (req, res) => {
    const options = {
        upsert: true,
        new: true,
    }

    try {
        const result = await user.findOneAndUpdate(
            {user_id: req.params.id},
            {
                role: "artist"
            },
            options
        )
        res.status(200).send({user: result});
    } catch (error) {
        res.status(400).send({success: false, message: error});
    }
})

module.exports = router;