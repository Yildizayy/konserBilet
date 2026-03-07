const Ticket = require('../models/Ticket')

const CreateATicket = async (userId, eventId) => {//service katmanında kullanıcının idsini yakalayıp buraya verebilirsin hem jwt tokene gömdüm hem login oluncada kullanıcıya gidiyor jwtden alman en sağlıklısı ama
    const newTicket = new Ticket({ TicketOwner: userId, Event: eventId })
    return await newTicket.save()
}
const GetAllTicketForAdmin = async () => {//admine özel bu onu kontrol etmeyi unutma
    return await Ticket.find()
}
const GetUsersTicket = async (userId) => {//buda sadece giriş yapmış kullanıcılara özel kullanıcı sadece kendi idsini vererek arama yapabilir giriş yapsa bile başka kullanıcının idsini sorgulayamamalı
    return await Ticket.find({ TicketOwner: userId })
}
module.exports = { CreateATicket, GetAllTicketForAdmin, GetUsersTicket }