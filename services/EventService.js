const eventRepo = require('../repository/EventRepository'); // Etkinlik var mı diye kontrol etmek için lazım

const EtkinlikleriGetir = async () => {
    return await eventRepo.GetAllEvents();
};

const EtkinlikOlustur =async(bilgiler)=>{
if(bilgiler.Capasity<1){
   throw new Error("kapasite en az 1 kişi olmalidir"); 
}
if (new Date(bilgiler.Date) < new Date()) {   //tarih kontrolü
        throw new Error("Geçmiş bir tarihe etkinlik oluşturulamaz");
    }
if (bilgiler.location)
return await eventRepo.CreateEvent(bilgiler);

};

module.exports = { EtkinlikleriGetir, EtkinlikOlustur };