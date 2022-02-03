const mongoose = require('mongoose');

const _URL = `mongodb+srv://gyankit:gyankit@freecluster.ruqzn.mongodb.net/parking?retryWrites=true&w=majority`;

module.exports = {
    connect: async () => {
        try {
            await mongoose.connect(_URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
            console.log('MongoDB connnection successfull')
        } catch (error) {
            console.error(error);
        }
    }
};