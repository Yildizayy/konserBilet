const Koa = require('koa')
const mongoose = require('mongoose')
const Router = require('@koa/router'); 
const bodyparser = require('@koa/bodyparser') //parse edip alınacak ilerleyen aşamada
require('dotenv').config()//.envden okuma yapılabılsın  diye nodejs ile geliyor 
const UserRoutes = require('./routes/UserRoutes')
const EtkinlikRoutes = require('./routes/EtkinlikRoutes')
const TicketRoutes = require('./routes/TicketRoutes')
const app = new Koa()
const router = new Router.Router()//require ettiğimiz Router obje olarak geliyor fonksiyon olarak değil obje içindeki fonksiyonu çağırdık
app.use(bodyparser.bodyParser())//aynı şekilde obje dönüyor require içindeki bodyparrser fonksiyonunu çağırdık
//eğer gelen pakette json verisi varsa ctx.reques.body içerisine yazar
app.use(async (ctx, next) => {
    try {
        await next()
    } catch (err) {
        ctx.status = err.status || 400
        ctx.body = {
            sonuc: "Basarisiz",
            data: err.message

        }
        console.log(err.message);
    }
})
//router.get('/', (ctx) => {
//    ctx.body = {
//        message: "İlk istek başarıyla alındı!",
//        ad: 'abdulkadir',
//        soyad: 'ivenc',
//        yas: '20',
//    }
//    return ctx
//})

app.use(UserRoutes.routes())
app.use(UserRoutes.allowedMethods())
app.use(EtkinlikRoutes.routes())
app.use(EtkinlikRoutes.allowedMethods())
app.use(TicketRoutes.routes())
app.use(TicketRoutes.allowedMethods())

const dbBaglantısı = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("db bağlantısı başarılı");
    } catch (error) {
        console.log(error);
    }
}
dbBaglantısı()

app.listen(3000, () => {
    console.log("3000 portunda sunucu çalışıyor!");
})