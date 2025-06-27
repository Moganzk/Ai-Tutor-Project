from flask import Flask, jsonify
from flask_cors import CORS
from routes import api
from config import Config
import os

app = Flask(__name__)
app.config.from_object(Config)

# Enable CORS
CORS(app, origins=Config.CORS_ORIGINS, supports_credentials=True)

# Register blueprints
app.register_blueprint(api, url_prefix='/api')

@app.route('/')
def home():
    """Root endpoint"""
    return jsonify({
        "message": "AI Tutor Backend API",
        "version": "1.0.0",
        "endpoints": {
            "chat": "/api/ask",
            "quiz": "/api/quiz/generate",
            "health": "/api/health",
            "topics": "/api/topics"
        }
    })

@app.errorhandler(404)
def not_found(error):
    return jsonify({"error": "Endpoint not found"}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({"error": "Internal server error"}), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    debug = os.environ.get('FLASK_ENV') == 'development'
    app.run(host='0.0.0.0', port=port, debug=debug)
