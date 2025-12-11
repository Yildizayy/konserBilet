const Router = require('@koa/router')
const UserService = require('../services/UserService')

const router = new Router.Router()//require ettiğimiz Router obje olarak geliyor fonksiyon olarak değil obje içindeki fonksiyonu çağırdık
router.post('/Register', async (ctx) => {
    const sonuc = await UserService.KullaniciKaydi(ctx.request.body)
    ctx.status = 201
    ctx.body = {
        mesaj: "kayit basarili",
        data: sonuc
    }
})
router.post('/Login', async (ctx) => {
    const success = await UserService.KullaniciGiris(ctx.request.body)
    ctx.status=200
    ctx.body = {
        mesaj:"Giris basarili",
        user:success.user,
        token:success.token
    }

})
module.exports = router