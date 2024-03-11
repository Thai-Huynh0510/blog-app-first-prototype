const mongoose = require('mongoose')

mongoose.set('strictQuery', false)
mongoose.connect('mongodb+srv://rafehuynh0510:ht2077@nodeexpree.km5yrbt.mongodb.net/').then(() => console.log("connected mongoose")).catch((err) => console.log(err))