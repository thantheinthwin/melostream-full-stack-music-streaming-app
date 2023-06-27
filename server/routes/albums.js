const router = require('express').Router();

// Album model
const album = require('../models/album');

// Add New
router.post('/save', async(req, res) => {
    const newAlbum = album(
        {
            name: req.body.name,
            artist: req.body.artist,
            imageURL: req.body.imageURL,
        }
    );

    try {
        const savedAlbum = await newAlbum.save();
        return res.status(200).send({success: true, album: savedAlbum});
    } catch (error) {
        return res.status(400).send({success: false, msg: error});
    }
});

// Search
router.get('/getOne/:id', async (req, res) => {
    const filter = { _id: req.params.id };

    const data = await album.findOne(filter);

    if (data){
        return res.status(200).send({success: true, album: data});
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

    const data = await album.find().sort(options.sort);

    if (data){
        return res.status(200).send({success: true, album: data});
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
        const result = await album.findOneAndUpdate(
            filter, 
            {
                name: req.body.name,
                imageURL: req.body.imageURL,
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

    const result = await album.deleteOne(filter);

    if (result){
        return res.status(200).send({success: true, msg: "Data deleted successfully"});
    }else{
        return res.status(400).send({success: false, msg: "Data not found", data: result});
    }
});

module.exports = router;