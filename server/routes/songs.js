const router = require('express').Router();

// Song model
const song = require("../models/song");

// Add New
router.post('/save', async(req, res) => {
    const newSong = song(
        {
            name: req.body.name,
            imageURL: req.body.imageURL,
            songURL: req.body.songURL,
            album: req.body.album,
            artist: req.body.artist,
            language: req.body.language,
            genre: req.body.genre,
        }
    );

    try {
        const savedSong = await newSong.save();
        return res.status(200).send({ success: true, song: savedSong });
    } catch (error) {
        return res.status(400).send({ success: false, msg: error });
    }
});

// Search
router.get('/getOne/:id', async (req, res) => {
    const filter = { _id: req.params.id };

    const data = await song.findOne(filter);

    if (data){
        return res.status(200).send({success: true, song: data});
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

    const data = await song.find().sort(options.sort);

    if (data){
        return res.status(200).send({success: true, song: data});
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
        const result = await song.findOneAndUpdate(
            filter, 
            {
                name: req.body.name,
                imageURL: req.body.imageURL,
                songURL: req.body.songURL,
                album: req.body.album,
                artist: req.body.artist,
                language: req.body.language,
                genre: req.body.genre,
            },
            options
        );

        return res.status(200).send({ success: true, song: result });
    } catch (error) {
        return res.status(400).send({ success: false, msg: error }); 
    }
});

// Delete
router.delete('/delete/:id', async (req, res) => {
    const filter = { _id: req.params.id };

    const result = await song.deleteOne(filter);

    if (result){
        return res.status(200).send({success: true, msg: "Data deleted successfully"});
    }else{
        return res.status(400).send({success: false, msg: "Data not found", data: result});
    }
});

module.exports = router;