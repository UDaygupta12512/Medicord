# 🏥 Medicord - Intelligent Medicine Information & Recommendation App

> Your AI-powered medicine companion for smarter healthcare decisions

![Medicord Banner](https://via.placeholder.com/1200x400/0EA5E9/ffffff?text=Medicord+-+AI+Medicine+Companion)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## 🌟 Overview

**Medicord** is a comprehensive, full-stack healthcare application designed to help users find detailed, verified information about medicines and their substitutes. The system provides dosage guidelines, potential side effects, usage precautions, and interaction warnings — all powered by reliable medical data and AI-driven insights.

### Key Highlights

- 🔍 **Smart Medicine Search** - Find any medicine with autocomplete and filters
- 💊 **Substitute Finder** - Discover cheaper alternatives with similar efficacy
- 🤖 **AI Health Advisor** - Get instant answers from our medical chatbot
- ⚠️ **Interaction Checker** - Detect potential drug interactions
- 👤 **Personalized Dashboard** - Track prescriptions and set reminders
- 🌙 **Premium Dark Mode** - Beautiful glassmorphism UI with smooth animations

## ✨ Features

### Core Features

1. **Medicine Information Engine**
   - Search medicines by name or composition
   - Verified details: brand, manufacturer, composition, price, availability
   - Integration with OpenFDA and RxNorm APIs

2. **Substitute Finder**
   - AI-powered alternative suggestions
   - Ranked by composition similarity, ratings, and price
   - Savings calculator

3. **AI Health Advisor**
   - OpenAI-powered medical chatbot
   - Natural language explanations
   - Dosage recommendations (educational)
   - Side effects information

4. **Drug Interaction Checker**
   - Multi-medicine interaction detection
   - Contraindication warnings
   - Layman's term explanations

5. **Personalized Dashboard**
   - Secure user profiles (JWT authentication)
   - Favorite medicines
   - Prescription tracking
   - Dosage reminders
   - Search history

6. **Community Reviews**
   - User ratings and reviews
   - Experience sharing
   - Helpful votes system

## 🛠 Tech Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **UI Components**: Custom components with glassmorphism
- **Icons**: Lucide React
- **Fonts**: Inter (Google Fonts)

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: JWT (jsonwebtoken)
- **AI**: OpenAI API
- **Security**: Helmet, CORS, Rate Limiting

### DevOps & Tools
- **Version Control**: Git
- **Package Manager**: npm
- **Code Quality**: ESLint, TypeScript
- **API Testing**: Thunder Client / Postman

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- MongoDB (local or MongoDB Atlas)
- OpenAI API key (for AI features)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/medicord.git
   cd medicord
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd server
   npm install
   ```

4. **Set up environment variables**

   **Frontend** - Create `.env.local` in root:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000
   ```

   **Backend** - Copy `.env.example` to `.env` in server folder:
   ```bash
   cd server
   cp .env.example .env
   ```

   Then edit `.env` with your credentials:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/medicord
   JWT_SECRET=your_super_secret_jwt_key
   OPENAI_API_KEY=your_openai_api_key
   ```

5. **Start MongoDB** (if running locally)
   ```bash
   mongod
   ```

6. **Run the development servers**

   **Backend** (in server folder):
   ```bash
   npm run dev
   ```

   **Frontend** (in root folder):
   ```bash
   npm run dev
   ```

7. **Open your browser**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 📁 Project Structure

```
medicord/
├── src/                        # Frontend source
│   ├── app/                    # Next.js app directory
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Landing page
│   │   └── globals.css         # Global styles
│   └── components/             # React components
├── server/                     # Backend source
│   ├── src/
│   │   ├── config/             # Configuration files
│   │   │   └── database.ts     # MongoDB connection
│   │   ├── controllers/        # Route controllers
│   │   │   ├── auth.controller.ts
│   │   │   ├── medicine.controller.ts
│   │   │   ├── substitute.controller.ts
│   │   │   ├── interaction.controller.ts
│   │   │   ├── chat.controller.ts
│   │   │   └── user.controller.ts
│   │   ├── models/             # Mongoose models
│   │   │   ├── Medicine.model.ts
│   │   │   ├── User.model.ts
│   │   │   └── Review.model.ts
│   │   ├── routes/             # API routes
│   │   │   ├── auth.routes.ts
│   │   │   ├── medicine.routes.ts
│   │   │   ├── substitute.routes.ts
│   │   │   ├── interaction.routes.ts
│   │   │   ├── chat.routes.ts
│   │   │   └── user.routes.ts
│   │   ├── middleware/         # Custom middleware
│   │   │   └── auth.middleware.ts
│   │   └── server.ts           # Express app entry
│   ├── .env.example            # Environment template
│   ├── package.json
│   └── tsconfig.json
├── .agent/                     # AI agent workflows
│   └── workflows/
│       └── implementation-plan.md
├── public/                     # Static assets
├── .gitignore
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.ts
└── README.md
```

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Medicine Endpoints

#### Get All Medicines
```http
GET /api/medicines?page=1&limit=20
```

#### Search Medicines
```http
GET /api/medicines/search?q=paracetamol
```

#### Get Medicine by ID
```http
GET /api/medicines/:id
```

#### Create Medicine (Admin)
```http
POST /api/medicines
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Paracetamol 500mg",
  "genericName": "Paracetamol",
  "manufacturer": "XYZ Pharma",
  "composition": ["Paracetamol"],
  "dosageForm": "Tablet",
  "strength": "500mg",
  "price": { "mrp": 50, "currency": "INR" },
  "category": "Painkiller",
  "description": "Used for pain relief and fever reduction"
}
```

### Substitute Endpoints

#### Get Substitutes
```http
GET /api/substitutes/:medicineId
```

#### Compare Medicines
```http
POST /api/substitutes/compare
Content-Type: application/json

{
  "medicineIds": ["id1", "id2", "id3"]
}
```

### Interaction Endpoints

#### Check Drug Interactions
```http
POST /api/interactions/check
Content-Type: application/json

{
  "medicineIds": ["id1", "id2"]
}
```

### AI Chat Endpoints

#### Chat with AI
```http
POST /api/chat
Content-Type: application/json

{
  "message": "What are the side effects of Ibuprofen?",
  "conversationHistory": []
}
```

### User Endpoints (Protected)

#### Get Favorites
```http
GET /api/users/favorites
Authorization: Bearer <token>
```

#### Add to Favorites
```http
POST /api/users/favorites/:medicineId
Authorization: Bearer <token>
```

#### Get Prescriptions
```http
GET /api/users/prescriptions
Authorization: Bearer <token>
```

## 🔐 Environment Variables

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### Backend (.env)
```env
# Server
NODE_ENV=development
PORT=5000

# Database
MONGODB_URI=mongodb://localhost:27017/medicord

# JWT
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRE=7d

# OpenAI
OPENAI_API_KEY=your_openai_api_key

# CORS
CORS_ORIGIN=http://localhost:3000

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

## 🚢 Deployment

### Frontend (Vercel)
1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Backend (Render/Railway)
1. Create new Web Service
2. Connect GitHub repository
3. Set build command: `cd server && npm install && npm run build`
4. Set start command: `cd server && npm start`
5. Add environment variables
6. Deploy

### Database (MongoDB Atlas)
1. Create cluster on MongoDB Atlas
2. Get connection string
3. Update `MONGODB_URI` in environment variables

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## ⚠️ Disclaimer

**Important**: Medicord is an educational tool and should not be used as a substitute for professional medical advice, diagnosis, or treatment. Always consult with qualified healthcare professionals for medical decisions.

## 👨‍💻 Author

**Medicord Team**

## 🙏 Acknowledgments

- OpenAI for AI capabilities
- OpenFDA for medicine data
- RxNorm for drug information
- All open-source contributors

---

Made with ❤️ for better healthcare decisions
