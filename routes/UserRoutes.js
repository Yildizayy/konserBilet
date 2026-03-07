const Router = require('@koa/router')
const UserService = require('../services/UserService')
const TicketRepository = require('../repository/TicketRepository')
const EventRepository = require('../repository/EventRepository')
const adminMWS = require('../MiddleWares/AdminMiddleWare')
const userMWS = require('../MiddleWares/AuthMiddleWare')
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
	ctx.status = 200
	ctx.body = {
		mesaj: "Giris basarili",
		user: success.user,
		token: success.token
	}

})
router.post('/tickets', userMWS.AuthMw, async (ctx) => {
	const { TicketOwner } = ctx.request.body
	const tickets = await TicketRepository.GetUsersTicket(TicketOwner)
	ctx.status = 200
	ctx.body = {
		tickets
	}
})
router.get('/adminbilet', userMWS.AuthMw, adminMWS.AdminMW, async (ctx) => {
	const AllEvents = await EventRepository.GetAllEvents()
	ctx.status = 200
	ctx.body = {
		AllEvents
	}
})

module.exports = router