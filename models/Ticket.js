const mongoose = require('mongoose')
const TicketSchema = new mongoose.Schema({
    TicketOwner: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true
    },
    Event: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Event',
        required: true
    }
},
    { timestamps: true })

module.exports = mongoose.model('Ticket',TicketSchema)