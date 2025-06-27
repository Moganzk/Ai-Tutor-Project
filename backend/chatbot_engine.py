import openai
import os
from config import Config
import json

# Initialize OpenAI client
if Config.OPENAI_API_KEY:
    openai.api_key = Config.OPENAI_API_KEY

def get_response(question, context=""):
    """
    Get AI response for educational questions
    """
    if not Config.OPENAI_API_KEY:
        return get_fallback_response(question)
    
    try:
        # Create educational context
        system_prompt = """You are an intelligent AI tutor designed to help students learn. 
        Your responses should be:
        - Educational and informative
        - Clear and easy to understand
        - Encouraging and supportive
        - Accurate and well-researched
        - Suitable for students of various ages
        
        If you don't know something, be honest about it and suggest where they might find more information."""
        
        messages = [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": f"Context: {context}\nQuestion: {question}"}
        ]
        
        response = openai.ChatCompletion.create(
            model=Config.AI_MODEL,
            messages=messages,
            max_tokens=Config.MAX_TOKENS,
            temperature=Config.TEMPERATURE
        )
        
        return response.choices[0].message.content.strip()
        
    except Exception as e:
        print(f"Error with OpenAI API: {e}")
        return get_fallback_response(question)

def get_fallback_response(question):
    """
    Fallback responses when AI is not available
    """
    fallback_responses = {
        "math": "I'd be happy to help you with math! Could you provide more specific details about what you're working on?",
        "science": "Science is fascinating! What specific topic or concept would you like to explore?",
        "history": "History is full of amazing stories! What period or event are you studying?",
        "english": "I can help with English, literature, and writing! What would you like to work on?",
        "default": "I'm here to help you learn! Please ask me any question about your studies, and I'll do my best to assist you."
    }
    
    question_lower = question.lower()
    
    if any(word in question_lower for word in ["math", "algebra", "calculus", "equation", "solve"]):
        return fallback_responses["math"]
    elif any(word in question_lower for word in ["science", "physics", "chemistry", "biology", "experiment"]):
        return fallback_responses["science"]
    elif any(word in question_lower for word in ["history", "historical", "war", "ancient", "medieval"]):
        return fallback_responses["history"]
    elif any(word in question_lower for word in ["english", "grammar", "writing", "essay", "literature"]):
        return fallback_responses["english"]
    else:
        return fallback_responses["default"]

def generate_quiz(topic, difficulty="medium", num_questions=5):
    """
    Generate a quiz based on a topic
    """
    if not Config.OPENAI_API_KEY:
        return {"error": "AI service not available"}
    
    try:
        prompt = f"""Generate a {difficulty} level quiz about {topic} with {num_questions} questions.
        Return the response as a JSON object with this structure:
        {{
            "topic": "{topic}",
            "difficulty": "{difficulty}",
            "questions": [
                {{
                    "question": "Question text",
                    "options": ["A", "B", "C", "D"],
                    "correct_answer": "A",
                    "explanation": "Why this is correct"
                }}
            ]
        }}"""
        
        response = openai.ChatCompletion.create(
            model=Config.AI_MODEL,
            messages=[{"role": "user", "content": prompt}],
            max_tokens=1500,
            temperature=0.7
        )
        
        return json.loads(response.choices[0].message.content)
        
    except Exception as e:
        return {"error": f"Failed to generate quiz: {str(e)}"}
