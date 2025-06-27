@echo off
echo 🚀 Starting AI Tutor Project...

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Python is not installed. Please install Python 3.8 or higher.
    pause
    exit /b 1
)

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js is not installed. Please install Node.js 16 or higher.
    pause
    exit /b 1
)

echo ✅ Python and Node.js are installed

REM Backend setup
echo 📦 Setting up backend...
cd backend

REM Create virtual environment if it doesn't exist
if not exist "venv" (
    echo Creating virtual environment...
    python -m venv venv
)

REM Activate virtual environment
echo Activating virtual environment...
call venv\Scripts\activate.bat

REM Install dependencies
echo Installing Python dependencies...
pip install -r requirements.txt

REM Check if .env file exists
if not exist ".env" (
    echo ⚠️  No .env file found in backend directory.
    echo Please create a .env file with your configuration:
    echo copy env.example .env
    echo Then edit .env with your API keys
)

REM Start backend in background
echo 🚀 Starting backend server...
start "AI Tutor Backend" python app.py

cd ..

REM Frontend setup
echo 📦 Setting up frontend...
cd frontend

REM Install dependencies
echo Installing Node.js dependencies...
npm install

REM Check if .env file exists
if not exist ".env" (
    echo ⚠️  No .env file found in frontend directory.
    echo Please create a .env file with your backend URL:
    echo REACT_APP_API_URL=http://localhost:5000/api
)

REM Start frontend
echo 🚀 Starting frontend server...
start "AI Tutor Frontend" npm start

cd ..

echo.
echo 🎉 AI Tutor is starting up!
echo.
echo 📱 Frontend: http://localhost:3000
echo 🔧 Backend:  http://localhost:5000
echo.
echo The servers are running in separate windows.
echo Close those windows to stop the servers.
echo.
pause 