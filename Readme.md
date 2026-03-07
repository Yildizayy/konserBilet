#  Concert Ticket Management System
Koa.js + MongoDB + JWT tabanlı etkinlik ve bilet yönetim sistemi.
##  Özellikler
* **Kullanıcı Yönetimi**
  * Kayıt, giriş, JWT doğrulama
  * Admin & normal kullanıcı rolleri
* **Etkinlik Yönetimi**
  * Admin etkinlik oluşturabilir
  * Lokasyon, tarih ve organizatör ile arama
  * Kapasite kontrolü
* **Bilet Sistemi**
  * Kullanıcı bilet satın alabilir
  * Kendi biletlerini görebilir
  * Admin tüm biletleri görebilir

##  Kullanılan Paketler

### Backend
* koa (v3.1.1)
* @koa/router (v15.0.0)
* @koa/bodyparser (v6.0.0)
* koa-helmet (v8.0.1)
* @koa/cors (v5.0.0)
### Database
* mongoose (v9.0.1)
### Authentication
* jsonwebtoken (v9.0.3)
* bcryptjs (v3.0.3)
### Tools
* dotenv (v17.2.3)
* nodemon (v3.1.11)

##  Kurulum

### 1. Projeyi klonla
```bash
git clone <repo-link>
cd koaapp
```
### 2. Bağımlılıkları yükle
```bash
npm install
```
### 3. .env dosyası oluştur
```env
MONGO_URI=mongodb://localhost:27017/concert-tickets
SECRET_KEY=your-secret-key
PORT=3000
```
### 4. Sunucuyu başlat
```bash
npm start
```
## Proje Yapısı
```
koaapp/
├── index.js
├── models/
├── repository/
├── services/
├── routes/
└── MiddleWares/
```

## Auth Akışı
* Kullanıcı kayıt olur ve şifre hash edilir.
* Giriş yapan kullanıcıya JWT oluşturulur.
* Korunan endpointlerde token gerekir.
* Admin işlemleri için isAdmin: true şarttır.

##  Önemli API'ler
### Kullanıcı
* POST /Register → Kayıt
* POST /Login → Giriş
* GET /biletlerim → Kullanıcı biletleri
### Etkinlik
* POST /etkinlik-olustur → Admin etkinlik oluşturur
* POST /LocationEtkinlikAra/:location → Lokasyon arama
### Bilet
* POST /bilet-al/:eventId → Bilet satın alma
* GET /admin/biletler → Admin tüm biletleri görür
## 🗂 Modeller
### User
Name, SurName, Yas, Email, Password, isAdmin
### Event
Date, Location, Capasity, Owner
### Ticket
TicketOwner, Event
## Hata Yönetimi
* 400 → Validasyon hatası
* 401 → Token eksik/hatali
* 500 → Sunucu hatası

---
