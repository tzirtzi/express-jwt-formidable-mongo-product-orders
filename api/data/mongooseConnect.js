
module.exports = (mongoose) => {
    
    const uri = process.env.MONGO_CONNECTION_URI || 'mongodb://root:secret@localhost:27017'; 

    mongoose.Promise = global.Promise;

    mongoose.connect( 
        uri, 
        { useNewUrlParser: true, useUnifiedTopology: true }
    ).then( () => { 
        console.log('Connected to mongodb!'); 
    }).catch( err => {
        console.log('Error connecting database', err);
    });

}