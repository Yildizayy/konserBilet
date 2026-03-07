const UserRepository= require('../repository/UserRepository')
const AdminMW = async (ctx, next) => {
	try {
		const tempUser = ctx.state.user
        const user = await UserRepository.KullaniciBul(tempUser.id)
        console.log(user);
		if (!user) {
			ctx.status = 401
			ctx.body = { message: "Kullanıcı bulunamadı " }
			return
		}
		if (user.isAdmin == false) {
			ctx.status = 401
			ctx.body = { message: "Admin Yetkisi yok" }
			return
		}
		await next()
	} catch (error) {
		ctx.status = 500
		ctx.body = { message: "Sunucuda admin doğrulama hatası" }
		console.log(error)
	}
}

module.exports = { AdminMW }