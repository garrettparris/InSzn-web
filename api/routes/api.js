var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/inszndb', { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('connected to database'))
var Schema = mongoose.Schema;

var schema = new Schema(
    {
        name: String,
        months: [Number],
    },
    {
        collection: 'fruit'
    }
)
var Produce = mongoose.model('Produce', schema);


router.get('/:id', async (req, res) =>
{


    try {
        console.log(req.params.id)

        const produce = await Produce.find({'months': req.params.id})
        res.send(produce)
        console.log(produce)
      } catch (err) {
        res.status(500).json({ message: err.message })
    }
});

module.exports = router;