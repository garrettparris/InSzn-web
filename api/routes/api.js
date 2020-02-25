var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
//really insecure but... i dont care about these creds (try delete my data if you want to put in that effort lol, its only 60 documents)
mongoose.connect('mongodb+srv://garrett:devil@cluster0-kjttj.mongodb.net/inszn?retryWrites=true&w=majority', { useUnifiedTopology: true,useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('connected to database'))
var Schema = mongoose.Schema;

var schema = new Schema(
    {
        name: String,
        months: [Number],
    },
)

router.get('/:month/:type', async (req, res) =>
{


    try {
        var Produce = mongoose.model('Produce', schema,req.params.type);

        console.log(req.params.month)
        schema.collection = req.params.type
        const produce = await Produce.find({'months': req.params.month})
        res.send(produce)
        console.log(produce)
      } catch (err) {
        res.status(500).json({ message: err.message })
    }
});

module.exports = router;