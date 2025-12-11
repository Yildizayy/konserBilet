const Router = require('@koa/router');
const EventService = require('../services/EventService');
const router = new Router.Router(); 

// post istegi
router.post('/etkinlik-olustur', async (ctx) => {
    try {
        //  Kullanıcının gönderdiği veriyi  alıp servise yolluyoruz
        const gelenVeri = ctx.request.body;
        
        // serviste kontrol edecek
        const sonuc = await EventService.EtkinlikOlustur(gelenVeri);

        // 3. Başarılı ise 201 koduyla cevap dönüyor
        ctx.status = 201;
        ctx.body = {
            mesaj: "Tebrikler Etkinlik başarıyla oluşturuldu.",
            kayit: sonuc
        };
    } catch (error) {
        // 4. Eğer serviste bir hata çıkarsa buraya düşer
        ctx.status = 400; // Bad Request 
        ctx.body = {
            hata: "Bir sorun oluştu",
            detay: error.message
        };
    }
});

module.exports = router;