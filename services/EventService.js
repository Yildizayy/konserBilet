const eventRepo = require('../repository/EventRepository'); // Etkinlik var mı diye kontrol etmek için lazım

const EtkinlikleriGetir = async () => {
    return await eventRepo.GetAllEvents();
};

const EtkinlikOlustur = async (bilgiler) => {

    if (bilgiler.Capasity == null || bilgiler.Capasity < 1) {
        throw new Error("kapasite en az 1 kişi olmalidir");
    }
    if (bilgiler.Date == null || new Date(bilgiler.Date) < new Date()) {   //tarih kontrolü
        throw new Error("Geçmiş bir tarihe etkinlik oluşturulamaz");
    }
    if (bilgiler.Location != null && bilgiler.Location)
        return await eventRepo.CreateEvent(bilgiler);

};
const GetEventsByOwner = async (owner) => {
    if (!owner || owner == null) {
        ctx.status = 400 //bad R
        ctx.body = {
            message: "owner bilgisi eksik yada hatalı"
        }
    }
    return await eventRepo.GetEventsByOwner(owner)

}
const GetEventsByLocation = async (location) => {
    if (!location || location == null) {
        ctx.status = 400 //bad R
        ctx.body = {
            message: "location bilgisi eksik yada hatalı"
        }
    }
    return await eventRepo.GetEventsByLocation(location)

}
const GetEventsByDate = async (date) => {
    if (!date || date == null) {
        ctx.status = 400 //bad R
        ctx.body = {
            message: "date bilgisi eksik yada hatalı"
        }
    }
    const convertDate = new Date(date)
    return await eventRepo.GetEventsByDate(convertDate)

}
module.exports = { EtkinlikleriGetir, EtkinlikOlustur, GetEventsByOwner, GetEventsByLocation, GetEventsByDate };