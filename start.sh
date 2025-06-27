#!/bin/bash

echo "🚀 Starting AI Tutor Project..."

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.8 or higher."
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 16 or higher."
    exit 1
fi

echo "✅ Python and Node.js are installed"

# Backend setup
echo "📦 Setting up backend..."
cd backend

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
echo "Activating virtual environment..."
source venv/bin/activate

# Install dependencies
echo "Installing Python dependencies..."
pip install -r requirements.txt

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "⚠️  No .env file found in backend directory."
    echo "Please create a .env file with your configuration:"
    echo "cp env.example .env"
    echo "Then edit .env with your API keys"
fi

# Start backend in background
echo "🚀 Starting backend server..."
python app.py &
BACKEND_PID=$!

cd ..

# Frontend setup
echo "📦 Setting up frontend..."
cd frontend

# Install dependencies
echo "Installing Node.js dependencies..."
npm install

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "⚠️  No .env file found in frontend directory."
    echo "Please create a .env file with your backend URL:"
    echo "REACT_APP_API_URL=http://localhost:5000/api"
fi

# Start frontend
echo "🚀 Starting frontend server..."
npm start &
FRONTEND_PID=$!

cd ..

echo ""
echo "🎉 AI Tutor is starting up!"
echo ""
echo "📱 Frontend: http://localhost:3000"
echo "🔧 Backend:  http://localhost:5000"
echo ""
echo "Press Ctrl+C to stop both servers"

# Wait for user to stop
trap "echo ''; echo '🛑 Stopping servers...'; kill $BACKEND_PID $FRONTEND_PID; exit" INT
wait 