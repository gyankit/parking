const mongoose = require('mongoose');

const _URL = '';

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