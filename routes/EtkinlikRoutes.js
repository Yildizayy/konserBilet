const Router = require('@koa/router');
const EventService = require('../services/EventService');
const { AuthMw } = require('../MiddleWares/AuthMiddleWare');
const { AdminMW } = require('../MiddleWares/AdminMiddleWare');
const router = new Router.Router();

// post istegi
router.post('/etkinlik-olustur', AuthMw, AdminMW, async (ctx) => {
    try {
        const gelenVeri = ctx.request.body;

        const sonuc = await EventService.EtkinlikOlustur(gelenVeri);

        ctx.status = 201;
        ctx.body = {
            mesaj: "Tebrikler Etkinlik başarıyla oluşturuldu.",
            kayit: sonuc
        };
    } catch (error) {
        ctx.status = 400; // Bad Request 
        ctx.body = {
            hata: "Bir sorun oluştu",
            detay: error.message
        };
    }
});
router.post('/OwnerEtkinlikAra/:owner', async (ctx) => {
    try {
        const owner = ctx.params.owner

        const Etkinlikler = await EventService.GetEventsByOwner(owner)
        ctx.status = 200;
        ctx.body = {
            kayit: Etkinlikler
        };
    } catch (error) {
        ctx.status = 400; // Bad Request 
        ctx.body = {
            hata: "Bir sorun oluştu",
            detay: error.message
        };
    }
})
router.post('/LocationEtkinlikAra/:location', async (ctx) => {
    try {
        const location = ctx.params.location
        const Etkinlikler = await EventService.GetEventsByLocation(location)
        ctx.status = 200  //Başarılı
        ctx.body = {
            kayit: Etkinlikler
        }
    } catch (error) {
        ctx.status = 400
        ctx.body = {
            hata: "Bir sorun oluştu",
            detay: error.message
        }
    }
})
router.post('/DateEtkinlikAra', async (ctx) => {
    try {
        const { date } = ctx.request.body
        const Etkinlikler = await EventService.GetEventsByDate(date)
        ctx.status = 200
        ctx.body = {
            kayit: Etkinlikler
        }
    } catch (error) {
        ctx.status = 400    // Bad Request 
        ctx.body = {
            hata: "Bir sorun oluştu",
            detay: error.message
        }
    }
})
module.exports = router;