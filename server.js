const express=require('express')
const mongoose=require('mongoose')
const Shorturl=require('./models/Shorturl')

mongoose.connect("mongodb+srv://rkavipriyan11:3OAMSwaTtxlLeSes@heucomundo.zub7a.mongodb.net/?retryWrites=true&w=majority&appName=HeucoMundo",
    {useNewUrlParser:true,useUnifiedTopology:true}
)
 
const app=express()

app.set('view engine','ejs')
app.use(express.urlencoded({extended:false}))

app.get("/",async function(req,res){
    const ShortUrls= await Shorturl.find();
    res.render('index',{ShortUrls:ShortUrls})

    
})


 app.post('/shorturls', async (req, res) => {
    try {
        await Shorturl.create({ full: req.body.fullUrl });
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send("Error occurred while creating the short URL.");
    }
});

app.get("/:shortUrl",async function(req,res){
    const shortUrl = await Shorturl.findOne({ short: req.params.shortUrl })
  if (shortUrl == null) return res.sendStatus(404)

  shortUrl.clicks++
  shortUrl.save()

  res.redirect(shortUrl.full)
    
})




app.listen(process.env.PORT || 5000)