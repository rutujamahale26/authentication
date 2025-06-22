import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      'mongodb+srv://rutujamahale39:CR8IfsjAwOmBFIvA@cluster0.xsl6cum.mongodb.net/your_database_name?retryWrites=true&w=majority&appName=Cluster0'
    );
    console.log(`✅ Database connected successfully: ${conn.connection.host}`);
  } catch (error) {
    console.error('❌ Error connecting to database:', error);
    process.exit(1); // 
  }
};





// CR8IfsjAwOmBFIvA
// mongodb+srv://rutujamahale39:CR8IfsjAwOmBFIvA@cluster0.xsl6cum.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0