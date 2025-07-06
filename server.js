const express = require('express')
const app = express() 
const cors = require('cors')

app.use(cors())
app.use(express.json())

const randomHeadlines = [
    "Why {name} is {location}'s Sweetest Spot in 2025",
  "{name} - The Hidden Gem of {location}",
  "Top Reasons {name} is Taking Over {location}",
  "{name}: The Talk of {location} in 2025",
  "{location} Loves {name} – Here's Why!",
  "{name} is {location}'s Best-Kept Secret of 2025",
  "Discover Why {name} is the Heart of {location}",
  "How {name} Became {location}'s Favorite Spot in 2025",
  "{location}'s Buzz is All About {name}",
  "Experience the Magic of {name} in {location} This Year",
  "Why Everyone in {location} is Talking About {name}",
  "{name}: {location}'s Ultimate Destination in 2025",
  "The Rise of {name} in {location} – What You Need to Know",
  "Unveiling {name}, {location}'s Most Loved Place in 2025",
  "What Makes {name} Shine in {location} This Year"
] 

app.post('/business-data',(req,res)=>{

const {name,location} = req.body; 
const randomheadline = randomHeadlines[Math.floor(Math.random()* randomHeadlines.length)]
.replace('{name}',name)
.replace('{location}',location);


res.json({
    rating:(Math.random()*(5-3.5)+3.5).toFixed(1),
    reviews:Math.floor(Math.random()*300+20),
    headline:randomheadline
})
})


app.get('/regenerate-headline', (req, res) => {
  const { name, location } = req.query;

  const randomHeadline = randomHeadlines[Math.floor(Math.random() * randomHeadlines.length)]
    .replace('{name}', name)
    .replace('{location}', location);

  res.json({ headline: randomHeadline });
});


app.listen(5000, () => {
  console.log(`Server running on http://localhost:5000`);
});