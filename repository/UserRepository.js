const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const TumKullanicilar = async () => {
    return await User.find()
}
const KullaniciExist = async (email) => {
    return await User.findOne({ Email: email })
}
const KullaniciBul = async (id) => {
    return await User.findById(id)
}
const KullaniciKaydet = async (bilgiler) => {
    const hashliPassword = await bcrypt.hash(bilgiler.Password, 10)
    bilgiler.Password = hashliPassword
    const newUSer = new User(bilgiler)
    return await newUSer.save()
}

module.exports = { TumKullanicilar, KullaniciBul, KullaniciKaydet, KullaniciExist }