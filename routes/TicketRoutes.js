const Router = require('@koa/router');
const TicketService = require('../services/TicketService');
const jwt = require('jsonwebtoken');
const userRepo = require('../repository/UserRepository');
const { AuthMw } = require('../MiddleWares/AuthMiddleWare');
const { AdminMW } = require('../MiddleWares/AdminMiddleWare');

const router = new Router.Router();


// Bilet satın alma
router.post('/bilet-al/:eventId', AuthMw, async (ctx) => {
    const userId = ctx.state.user.id;
    const eventId = ctx.params.eventId;

    const ticket = await TicketService.BiletAl(userId, eventId);

    ctx.body = {
        mesaj: "Bilet başarıyla satın alındı!",
        ticket
    };
});

// Kullanıcının kendi biletlerini görmesi
router.get('/biletlerim', AuthMw, async (ctx) => {
    const userId = ctx.state.user.id;

    const tickets = await TicketService.KullaniciBiletleriniGetir(userId);

    ctx.body = {
        mesaj: "Biletleriniz başarıyla getirildi",
        tickets
    };
});

// Admin tüm biletleri görsün
router.get('/admin/biletler', AuthMw, AdminMW, async (ctx) => {
    const tickets = await TicketService.TumBiletleriGetirAdmin();

    ctx.body = {
        mesaj: "Tüm biletler",
        tickets
    };
});

module.exports = router;