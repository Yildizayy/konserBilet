const mongoose = require('mongoose')
const izinVerilenSehirler = ['İstanbul', 'Ankara', 'İzmir', 'Antalya', 'Bursa'];
const EventsScheme = new mongoose.Schema({
    Date: {
        required: true,
        type: Date
    },
    Location:
    {
        required: true,
        type: String,
        enum:{
        values:izinVerilenSehirler,
        message: '{VALUE} geçerli bir şehir değil! Sadece şu şehirlerden birini seçebilirsiniz: ' + izinVerilenSehirler.join(', ')
        }
   
    },
    Capasity: {
        required: true,
        type: Number
    },
    Owner: {
        required: true,
        type: String
    }
},
    { timestamps: true })
module.exports = mongoose.model('Event', EventsScheme)