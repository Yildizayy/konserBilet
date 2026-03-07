const ticketRepo = require('../repository/TicketRepository');
const eventRepo = require('../repository/EventRepository'); // Etkinlik var mı diye kontrol etmek için lazım

// 1. Bilet Satın Al
const BiletAl = async (userId, eventId) => {

    // Eğer etkinlik varsa bileti oluştur
    return await ticketRepo.CreateATicket(userId, eventId);
};

// 2. Kullanıcının Kendi Biletlerini Getir
const KullaniciBiletleriniGetir = async (userId) => {
    // Burada ekstra bir kontrole gerek yok, repository zaten filtreliyor
    return await ticketRepo.GetUsersTicket(userId);
};

// 3. Tüm Biletleri Getir (Sadece Admin)
const TumBiletleriGetirAdmin = async () => {
    return await ticketRepo.GetAllTicketForAdmin();
};

module.exports = { BiletAl, KullaniciBiletleriniGetir, TumBiletleriGetirAdmin };