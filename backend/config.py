import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'dev-secret-key-change-in-production'
    OPENAI_API_KEY = os.environ.get('OPENAI_API_KEY')
    SUPABASE_URL = os.environ.get('SUPABASE_URL')
    SUPABASE_KEY = os.environ.get('SUPABASE_KEY')
    
    # Database settings
    DATABASE_URL = os.environ.get('DATABASE_URL')
    
    # CORS settings
    CORS_ORIGINS = [
        "http://localhost:3000",
        "https://your-frontend-domain.vercel.app"
    ]
    
    # AI Model settings
    AI_MODEL = "gpt-3.5-turbo"
    MAX_TOKENS = 1000
    TEMPERATURE = 0.7
