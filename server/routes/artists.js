const router = require('express').Router();

// our artist model
const artist = require('../models/artist');

// Add New
router.post('/save', async(req, res) => {
    const newArtist = artist(
        {
            name: req.body.name,
            imageURL: req.body.imageURL,
            soundcloud: req.body.soundcloud,
            youtube: req.body.youtube,
        }
    );

    try {
        const savedArtist = await newArtist.save();
        return res.status(200).send({success: true, artist: savedArtist});
    } catch (error) {
        return res.status(400).send({success: false, msg: error});
    }
});

// Search
router.get('/getOne/:id', async (req, res) => {
    const filter = { _id: req.params.id };

    const data = await artist.findOne(filter);

    if (data){
        return res.status(200).send({success: true, artist: data});
    }else{
        return res.status(400).send({success: false, msg: "Data not found"});
    }
});

// Search All
router.get('/getAll', async (req, res) => {
    const options = {
        sort: {
            createdAt: 1,
        },
    }

    const data = await artist.find().sort(options.sort);

    if (data){
        return res.status(200).send({success: true, artist: data});
    }else{
        return res.status(400).send({success: false, msg: "Data not found"});
    }
});

// Update
router.put('/update/:id', async (req, res) => {
    const filter = {_id: req.params.id};

    const options = {
        upsert: true,
        new: true
    };

    try {
        const result = await artist.findOneAndUpdate(
            filter, 
            {
                name: req.body.name,
                imageURL: req.body.imageURL,
                soundcloud: req.body.soundcloud,
                youtube: req.body.youtube,
            },
            options
        );

        return res.status(200).send({ success: true, data: result });
    } catch (error) {
        return res.status(400).send({ success: false, msg: error }); 
    }
});

// Delete
router.delete('/delete/:id', async (req, res) => {
    const filter = { _id: req.params.id };

    const result = await artist.deleteOne(filter);

    if (result){
        return res.status(200).send({success: true, msg: "Data deleted successfully"});
    }else{
        return res.status(400).send({success: false, msg: "Data not found", data: result});
    }
});

module.exports = router;