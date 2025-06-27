# 🧠 AI Tutor & Homework Helper

An intelligent learning assistant built with **React**, **Flask**, and **Supabase** — designed to help students understand difficult concepts, get help with homework, and study smarter via chat-based interaction.

---

## ✨ Features

- **🤖 AI-Powered Chat**: Get instant, educational responses to any question
- **📝 Interactive Quizzes**: Generate custom quizzes on any topic with AI
- **🎯 Personalized Learning**: AI adapts to your learning style and level
- **📱 Modern UI**: Beautiful, responsive design that works on all devices
- **🔐 User Authentication**: Secure sign-up and login system
- **📊 Progress Tracking**: Monitor your learning progress over time
- **🌙 Dark Mode**: Comfortable viewing in any lighting condition
- **💾 Database Integration**: Save chat history and quiz results

---

## ⚡ Quick Start

### Option 1: Automated Setup (Recommended)

**Windows:**
```bash
start.bat
```

**macOS/Linux:**
```bash
chmod +x start.sh
./start.sh
```

### Option 2: Manual Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/ai-tutor-project.git
   cd ai-tutor-project
   ```

2. **Set up environment variables**
   ```bash
   # Backend
   cd backend
   cp env.example .env
   # Edit .env with your API keys
   
   # Frontend
   cd ../frontend
   echo "REACT_APP_API_URL=http://localhost:5000/api" > .env
   ```

3. **Start the backend**
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   python app.py
   ```

4. **Start the frontend**
   ```bash
   cd frontend
   npm install
   npm start
   ```

5. **Visit the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

---

## ⚙️ Tech Stack

- **Frontend:** React 18, React Router, Axios, Lucide React Icons
- **Backend:** Python Flask, OpenAI GPT API, Flask-CORS
- **Database & Auth:** Supabase (PostgreSQL)
- **Hosting:** Vercel (frontend), Render (backend)
- **Styling:** Custom CSS with modern design patterns

---

## 📁 Project Structure

```
ai-tutor-project/
├── backend/               # Flask backend
│   ├── app.py            # Main Flask application
│   ├── chatbot_engine.py # AI integration with OpenAI
│   ├── routes.py         # API endpoints
│   ├── database.py       # Supabase database service
│   ├── config.py         # Configuration management
│   ├── requirements.txt  # Python dependencies
│   ├── env.example       # Environment variables template
│   └── utils/
│       └── preprocessor.py
│
├── frontend/              # React frontend
│   ├── public/
│   ├── src/
│   │   ├── App.js        # Main app component with routing
│   │   ├── index.js      # React entry point
│   │   ├── api.js        # API service layer
│   │   ├── App.css       # Global styles
│   │   ├── context/      # React context
│   │   │   └── AuthContext.js
│   │   ├── Components/   # Reusable components
│   │   │   ├── Header.js
│   │   │   ├── Footer.js
│   │   │   ├── Chat.js
│   │   │   └── Quiz.js
│   │   └── Pages/        # Page components
│   │       ├── Home.js
│   │       ├── About.js
│   │       ├── SignIn.js
│   │       ├── SignUp.js
│   │       ├── Profile.js
│   │       └── Settings.js
│   └── package.json
│
├── supabase/              # Database schema
│   └── schema.sql
│
├── start.sh              # Linux/macOS startup script
├── start.bat             # Windows startup script
├── DEPLOYMENT.md         # Deployment guide
└── README.md
```

---

## 🔧 Configuration

### Required API Keys

1. **OpenAI API Key**: Get from [OpenAI Platform](https://platform.openai.com/)
2. **Supabase**: Get from your Supabase project settings

### Environment Variables

**Backend (.env):**
```env
FLASK_ENV=development
SECRET_KEY=your-secret-key-here
OPENAI_API_KEY=your-openai-api-key-here
SUPABASE_URL=your-supabase-project-url
SUPABASE_KEY=your-supabase-anon-key
CORS_ORIGINS=http://localhost:3000
```

**Frontend (.env):**
```env
REACT_APP_API_URL=http://localhost:5000/api
```

---

## 🌐 Deployment

For detailed deployment instructions, see [DEPLOYMENT.md](DEPLOYMENT.md).

### Quick Deployment Steps:

1. **Database Setup**: Run `supabase/schema.sql` in Supabase
2. **Backend**: Deploy to Render with environment variables
3. **Frontend**: Deploy to Vercel with environment variables
4. **Update CORS**: Add your frontend domain to backend CORS settings

---

## 📚 API Endpoints

### Chat
- `POST /api/ask` - Send a question to the AI tutor
- `GET /api/topics` - Get available study topics
- `GET /api/chat/history` - Get user's chat history

### Quiz
- `POST /api/quiz/generate` - Generate a custom quiz
- `GET /api/quiz/history` - Get user's quiz history

### Health
- `GET /api/health` - Health check endpoint

---

## 🎨 Features in Detail

### AI Chat Interface
- Real-time conversation with AI tutor
- Message history with timestamps
- Loading states and error handling
- Responsive design for all devices
- Database persistence

### Quiz Generator
- Custom topic selection
- Difficulty levels (Easy, Medium, Hard)
- Multiple choice questions with explanations
- Score tracking and review
- Database persistence

### User Management
- Secure authentication system
- Profile management
- Settings customization
- Progress tracking

### Modern UI/UX
- Clean, professional design
- Smooth animations and transitions
- Mobile-first responsive design
- Accessibility features

---

## 🔮 Future Enhancements

- [ ] WhatsApp Bot integration (Twilio)
- [ ] Voice-to-text capabilities
- [ ] Advanced analytics dashboard
- [ ] Multi-language support
- [ ] Collaborative learning features
- [ ] Integration with LMS platforms
- [ ] Advanced quiz types (essay, matching)
- [ ] Real-time collaboration tools
- [ ] Email notifications
- [ ] Study reminders

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Samuel Mogaka Nyamwange**  
📧 sammokogoti77@gmail.com  
🌍 [LinkedIn](https://www.linkedin.com/in/samwel-nyamwange-4a4744334)  
💻 [GitHub](https://github.com/Moganzk)

---

## 🙏 Acknowledgments

- OpenAI for providing the GPT API
- Supabase for the excellent backend-as-a-service
- The React and Flask communities for amazing tools
- All contributors and users of this project

---

> "Education is the most powerful weapon which you can use to change the world." - Nelson Mandela

**Ready to transform your learning experience? Start using AI Tutor today! 🚀**
"# Ai-Tutor-Project" 
