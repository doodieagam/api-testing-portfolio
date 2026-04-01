# 🚀 API Testing Portfolio – Login Endpoint

Project ini merupakan simulasi pengujian API untuk fitur login menggunakan pendekatan Quality Assurance (QA).  
Fokus utama project ini adalah melakukan pengujian terhadap endpoint login mencakup validasi input, autentikasi user, serta error handling.

---

## 📌 Tech Stack

- Node.js
- Express.js
- SQLite (Basic SQL: SELECT, WHERE)
- Postman (API Testing)

---

## 🔐 Endpoint

### POST /login

Digunakan untuk proses autentikasi user.

#### ✅ Request Body (Valid)
```json
{
  "email": "test@mail.com",
  "password": "123456"
}