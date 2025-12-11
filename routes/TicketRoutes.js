const Router = require('@koa/router');
const TicketService = require('../services/TicketServices');
const jwt = require('jsonwebtoken');
const userRepo = require('../repository/UserRepository');

const router = new Router.Router();

//  Token doğrulama
const auth = async (ctx, next) => {
    const token = ctx.headers.authorization?.split(" ")[1];
    if (!token) throw new Error("Token gerekli!");

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        ctx.state.user = decoded; // user bilgisi 
        await next();
    } catch (err) {
        throw new Error("Token hatalı!");
    }
};

// Bilet satın alma
router.post('/bilet-al/:eventId', auth, async (ctx) => {
    const userId = ctx.state.user.id;
    const eventId = ctx.params.eventId;

    const ticket = await TicketService.BiletAl(userId, eventId);

    ctx.body = {
        mesaj: "Bilet başarıyla satın alındı!",
        ticket
    };
});

// Kullanıcının kendi biletlerini görmesi
router.get('/biletlerim', auth, async (ctx) => {
    const userId = ctx.state.user.id;

    const tickets = await TicketService.KullaniciBiletleriniGetir(userId);

    ctx.body = {
        mesaj: "Biletleriniz başarıyla getirildi",
        tickets
    };
});

// Admin tüm biletleri görsün
router.get('/admin/biletler', auth, async (ctx) => {
    const user = await userRepo.KullaniciBul(ctx.state.user.id);

    const tickets = await TicketService.TumBiletleriGetirAdmin(user);

    ctx.body = {
        mesaj: "Tüm biletler",
        tickets
    };
});

module.exports = router;
