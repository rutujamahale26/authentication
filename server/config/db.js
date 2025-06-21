import mongoose from "mongoose"

export const connectDB = async() =>{
    try{
        await mongoose.connect('mongodb+srv://rutujamahale39:CR8IfsjAwOmBFIvA@cluster0.xsl6cum.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
        console.log('Databse connected successfully')
    }catch(error){
        console.log('Error in connecting database', error)
    }
}




// CR8IfsjAwOmBFIvA
// mongodb+srv://rutujamahale39:CR8IfsjAwOmBFIvA@cluster0.xsl6cum.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0