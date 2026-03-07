const userRepo = require('../repository/UserRepository')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const KullaniciKaydi = async (bilgiler) => {
    const kullaniciExist = await userRepo.KullaniciExist(bilgiler.Email)
    if (kullaniciExist) {
        throw new Error("Kullanici kayitli")
    }
    if (!bilgiler.Name || bilgiler.Name.length < 3) {
        throw new Error("İsim çok kısa yada boş!")

    }
    if (parseInt(bilgiler.Yas) < 18) {
        throw new Error("Yaş 18den küçük olamaz")
    }
    userRepo.KullaniciKaydet(bilgiler)
}
const KullaniciGiris = async (girisBilgisi) => {
    const Email = girisBilgisi.Email
    const user = await userRepo.KullaniciExist(Email)
    if (!user) {
        throw new Error("Giriş bilgileri hatalı!")
    }
    const sifreDogrumu = await bcrypt.compare(girisBilgisi.Password, user.Password)
    if (!sifreDogrumu) {
        throw new Error("Şifre hatali")
    }
    const Token = jwt.sign({
        id: user._id,
        Name: user.Name,
        SurName: user.SurName
    },
        process.env.SECRET_KEY,
        { expiresIn: "1h" })
    return {
        token: Token,
        user: {
            Name: user.Name,
            SurName: user.SurName,
            id: user._id
        }
    }
}
module.exports = { KullaniciKaydi, KullaniciGiris }