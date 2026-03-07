const jwt = require('jsonwebtoken')
const AuthMw = async (ctx, next) => {
	try {
		const authHeader = ctx.header.authorization
		if (!authHeader || !authHeader.startsWith('Bearer')) {
			ctx.status = 401
			ctx.body = { message: "Token bulunamadı!" }
			return
		}
		const token = authHeader.split(' ')[1]

		const decoded = jwt.verify(token, process.env.SECRET_KEY)
		ctx.state.user = decoded
		if (!decoded) {
			ctx.status = 401
			ctx.body = { message: "Token Geçersiz!" }
			return
		}
		await next()
	}
	catch (error) {
		ctx.status = 401
		ctx.body = { message: "Token Doğrulanamadı!" }
		console.log(error)
	}
}
module.exports = { AuthMw }