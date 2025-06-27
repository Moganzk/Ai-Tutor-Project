from supabase import create_client, Client
from config import Config
import os
from datetime import datetime

class DatabaseService:
    def __init__(self):
        self.supabase: Client = None
        if Config.SUPABASE_URL and Config.SUPABASE_KEY:
            self.supabase = create_client(Config.SUPABASE_URL, Config.SUPABASE_KEY)
    
    def save_chat(self, user_id: str, question: str, answer: str, context: str = ""):
        """Save chat interaction to database"""
        if not self.supabase:
            return None
            
        try:
            data = {
                "user_id": user_id,
                "question": question,
                "answer": answer,
                "context": context,
                "created_at": datetime.now().isoformat()
            }
            
            result = self.supabase.table("chats").insert(data).execute()
            return result.data[0] if result.data else None
        except Exception as e:
            print(f"Error saving chat: {e}")
            return None
    
    def save_quiz(self, user_id: str, topic: str, difficulty: str, questions):
        """Save generated quiz to database"""
        if not self.supabase:
            return None
            
        try:
            data = {
                "user_id": user_id,
                "topic": topic,
                "difficulty": difficulty,
                "questions": questions,
                "created_at": datetime.now().isoformat()
            }
            
            result = self.supabase.table("quizzes").insert(data).execute()
            return result.data[0] if result.data else None
        except Exception as e:
            print(f"Error saving quiz: {e}")
            return None
    
    def get_user_chats(self, user_id: str, limit: int = 50):
        """Get user's chat history"""
        if not self.supabase:
            return []
            
        try:
            result = self.supabase.table("chats")\
                .select("*")\
                .eq("user_id", user_id)\
                .order("created_at", desc=True)\
                .limit(limit)\
                .execute()
            return result.data
        except Exception as e:
            print(f"Error getting user chats: {e}")
            return []
    
    def get_user_quizzes(self, user_id: str, limit: int = 20):
        """Get user's quiz history"""
        if not self.supabase:
            return []
            
        try:
            result = self.supabase.table("quizzes")\
                .select("*")\
                .eq("user_id", user_id)\
                .order("created_at", desc=True)\
                .limit(limit)\
                .execute()
            return result.data
        except Exception as e:
            print(f"Error getting user quizzes: {e}")
            return []

# Global database service instance
db_service = DatabaseService() 