const express = require('express');
const app = express();
const {PORT, MONGODB_URI} = require('./config/constants')
const cors = require('cors');
const mongoose = require('mongoose');

if(process.env.NODE_ENV !== 'production'){
	require('dotenv').config();
}

mongoose.connect(MONGODB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err));

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
