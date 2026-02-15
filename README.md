# 🔗 URL Shortener

A modern, minimalist URL shortener with a stunning **neo-brutalism design** featuring bold red and black aesthetics. Built with Node.js, Express, and Redis.

![Neo-Brutalism Design](https://img.shields.io/badge/Design-Neo--Brutalism-ff0000?style=for-the-badge)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)

## ✨ Features

- **⚡ Lightning Fast** - Generate short URLs in milliseconds
- **🎨 Neo-Brutalism UI** - Bold, eye-catching design with red/black theme
- **✨ Glitch Effects** - Authentic RGB color separation animations
- **📱 Responsive** - Works seamlessly on all devices
- **🔒 Reliable** - Redis-backed storage for production use
- **🚀 Serverless Ready** - Optimized for Vercel deployment

## 🛠️ Tech Stack

- **Backend**: Node.js + Express
- **Database**: Redis (ioredis)
- **ID Generation**: Nanoid
- **Frontend**: Vanilla JavaScript + CSS
- **Deployment**: Vercel

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/touseefmangla/url-shortener.git
   cd url-shortener
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   REDIS_URL=redis://your-redis-url:port
   ```

4. **Run the development server**
   ```bash
   npm start
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:3000`

## 🌐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `REDIS_URL` | Redis connection URL | ✅ Yes |

## 🚀 Deployment

This project is optimized for **Vercel** deployment:

1. Push your code to GitHub
2. Import the repository in Vercel
3. Add the `REDIS_URL` environment variable in Vercel project settings
4. Deploy!

## 📁 Project Structure

```
url-shortener/
├── api/
│   └── server.js          # Express server with comprehensive comments
├── public/
│   ├── index.html         # Main HTML file
│   ├── style.css          # Neo-brutalism styles
│   └── script.js          # Client-side JavaScript
├── package.json
├── vercel.json            # Vercel configuration
└── README.md
```

## 🎯 API Endpoints

### Shorten URL
```http
POST /shorten
Content-Type: application/json

{
  "url": "https://example.com/very/long/url"
}
```

**Response:**
```json
{
  "shortUrl": "http://localhost:3000/abc123",
  "shortCode": "abc123"
}
```

### Redirect
```http
GET /:shortCode
```

Redirects to the original URL or returns 404 if not found.

## 🎨 Design Features

- **Bold Borders**: Thick 5px borders for that brutalist aesthetic
- **Dramatic Shadows**: Offset box shadows in red
- **Glitch Animation**: RGB color separation effect on the title
- **Interactive Elements**: Hover effects with depth changes
- **Geometric Accents**: Decorative boxes at angles

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## 📄 License

ISC

## 👤 Author

**Touseef**

---

Made with ❤️ and a lot of ☕
