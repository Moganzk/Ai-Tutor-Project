from flask import Flask, jsonify, render_template_string
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
    """Root endpoint - show a dark themed health page"""
    html = '''
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>AI Tutor Backend Health</title>
        <style>
            html, body {
                height: 100%;
                margin: 0;
                padding: 0;
            }
            body {
                min-height: 100vh;
                background: #181c24;
                color: #fff;
                display: flex;
                align-items: center;
                justify-content: center;
                font-family: 'Segoe UI', 'Roboto', 'Arial', sans-serif;
            }
            .center-box {
                background: #23283a;
                border-radius: 18px;
                box-shadow: 0 8px 32px rgba(0,0,0,0.25);
                padding: 3rem 2.5rem;
                text-align: center;
                max-width: 90vw;
            }
            .center-box h1 {
                font-size: 2.2rem;
                margin-bottom: 1rem;
                font-weight: 700;
                letter-spacing: 1px;
            }
            .center-box p {
                font-size: 1.1rem;
                color: #b0b8d1;
                margin-bottom: 0;
            }
            .status-dot {
                display: inline-block;
                width: 16px;
                height: 16px;
                border-radius: 50%;
                background: #28d17c;
                margin-right: 0.5rem;
                box-shadow: 0 0 8px #28d17c88;
                vertical-align: middle;
            }
            @media (max-width: 600px) {
                .center-box {
                    padding: 2rem 1rem;
                }
                .center-box h1 {
                    font-size: 1.3rem;
                }
            }
        </style>
    </head>
    <body>
        <div class="center-box">
            <span class="status-dot"></span>
            <h1>API is healthy and running in backend</h1>
            <p>Welcome to the AI Tutor Backend.<br>All systems operational.</p>
        </div>
    </body>
    </html>
    '''
    return render_template_string(html)

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
