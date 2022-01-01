if(process.env.NODE_ENV !== 'production'){
	require('dotenv').config();
}
const express = require('express');
const app = express();
const {PORT, MONGODB_URI} = require('./config/constants')
const cors = require('cors');
const mongoose = require('mongoose');
const seed = require('./config/seed').default;
const randomSeed = require('./config/randomSeed').default;


mongoose.connect(MONGODB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err));

app.get("/seed", (req, res) => {
	seed();
	res.send("Seeded")
})

app.get("/random-seed", (req, res) => {
	randomSeed();
	res.send("Randomly seeded")
})

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
