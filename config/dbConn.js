const mongoose = require('mongoose');

const connectDB = async () => {
   try {
       await mongoose.connect(process.env.DATABASE,{
         useUnifieldTopology: true,
         useNewUrlParser: true
       });
   } catch (error) {
        console.log(err)
   }
}

module.exports = connectDB;