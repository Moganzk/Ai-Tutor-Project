from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
from chatbot_engine import get_response, generate_quiz
from database import db_service
import json
from datetime import datetime

# Create the main API blueprint
api = Blueprint('api', __name__)

@api.route('/ask', methods=['POST'])
@cross_origin()
def ask():
    """Handle chat questions"""
    try:
        data = request.get_json()
        question = data.get("question", "")
        context = data.get("context", "")
        user_id = data.get("user_id", "anonymous")
        
        if not question.strip():
            return jsonify({"error": "Question is required"}), 400
        
        answer = get_response(question, context)
        
        # Save to database
        db_service.save_chat(user_id, question, answer, context)
        
        return jsonify({
            "answer": answer,
            "timestamp": datetime.now().isoformat(),
            "user_id": user_id
        })
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@api.route('/quiz/generate', methods=['POST'])
@cross_origin()
def generate_quiz_endpoint():
    """Generate AI-powered quiz"""
    try:
        data = request.get_json()
        topic = data.get('topic', 'general')
        difficulty = data.get('difficulty', 'medium')
        num_questions = data.get('num_questions', 5)
        user_id = data.get('user_id', 'anonymous')

        # Use AI to generate quiz
        quiz_data = generate_quiz(topic, difficulty, num_questions)
        
        if "error" in quiz_data:
            return jsonify(quiz_data), 500
        
        # Save quiz to database
        if quiz_data.get('questions'):
            questions_list = quiz_data['questions'] if isinstance(quiz_data['questions'], list) else []
            db_service.save_quiz(user_id, topic, difficulty, questions_list)
            
        return jsonify(quiz_data), 200
        
    except Exception as e:
        return jsonify({"error": f"Failed to generate quiz: {str(e)}"}), 500

@api.route('/chat/history', methods=['GET'])
@cross_origin()
def get_chat_history():
    """Get user's chat history"""
    try:
        user_id = request.args.get('user_id', 'anonymous')
        limit = int(request.args.get('limit', 50))
        
        chats = db_service.get_user_chats(user_id, limit)
        return jsonify({"chats": chats}), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@api.route('/quiz/history', methods=['GET'])
@cross_origin()
def get_quiz_history():
    """Get user's quiz history"""
    try:
        user_id = request.args.get('user_id', 'anonymous')
        limit = int(request.args.get('limit', 20))
        
        quizzes = db_service.get_user_quizzes(user_id, limit)
        return jsonify({"quizzes": quizzes}), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@api.route('/health', methods=['GET'])
@cross_origin()
def health_check():
    """Health check endpoint"""
    return jsonify({
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "service": "AI Tutor Backend"
    })

@api.route('/topics', methods=['GET'])
@cross_origin()
def get_topics():
    """Get available study topics"""
    topics = [
        {"id": "math", "name": "Mathematics", "subtopics": ["Algebra", "Calculus", "Geometry", "Statistics"]},
        {"id": "science", "name": "Science", "subtopics": ["Physics", "Chemistry", "Biology", "Earth Science"]},
        {"id": "history", "name": "History", "subtopics": ["World History", "American History", "Ancient Civilizations"]},
        {"id": "english", "name": "English", "subtopics": ["Grammar", "Literature", "Writing", "Vocabulary"]},
        {"id": "computer_science", "name": "Computer Science", "subtopics": ["Programming", "Algorithms", "Data Structures"]}
    ]
    return jsonify({"topics": topics})

def log_interaction(user_id, question, answer):
    """Log chat interactions (placeholder for database integration)"""
    # This would typically save to your database
    print(f"User {user_id} asked: {question}")
    print(f"AI responded: {answer}")
    print("-" * 50)
