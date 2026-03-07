const Events = require('../models/Event')
const GetAllEvents = async () => {
    return await Events.find()
}
const GetEventsByOwner = async (owner) => {
    return await Events.find({ Owner: owner })
}
const GetEventsByLocation = async (location) => {
    return await Events.find({ Location: location })
}
const GetEventsByDate = async (date) => {//bunu service katmanında kullanırken js Date tipine uygun olduğuna emin ol
    const start = new Date(date)
    const end = new Date(date)
    start.setHours(0, 0, 0, 0)//verilen günün 00:00 oalrak ayarlanmasını sağladık
    end.setHours(23, 59, 59, 999)//verilen günün 23:59 oalrak ayarlanmasını sağladık bu sayede o günün bu saatler aralığındaki tüm etkinliklerini yakalicaz
    return await Events.find({ Date: { $gte: start, $lte: end } })//gte grater than 00:00 , ltede lesser than 23.59 olarak çalışmasını sağlar
}
const CreateEvent = async (EventInfo) => {
    const newEvent = new Events(EventInfo)
    return await newEvent.save()
}
module.exports = { GetAllEvents, GetEventsByOwner, GetEventsByLocation, GetEventsByDate, CreateEvent }