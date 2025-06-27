# 🚀 AI Tutor Deployment Guide

This guide will help you deploy the AI Tutor application to production.

## Prerequisites

- GitHub account
- OpenAI API key
- Supabase account
- Vercel account (for frontend)
- Render account (for backend)

## Step 1: Environment Setup

### Backend Environment Variables

Create a `.env` file in the `backend/` directory:

```env
# Flask Configuration
FLASK_ENV=production
SECRET_KEY=your-super-secret-key-here

# OpenAI Configuration
OPENAI_API_KEY=your-openai-api-key-here

# Supabase Configuration
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-supabase-anon-key

# CORS Configuration
CORS_ORIGINS=https://your-frontend-domain.vercel.app
```

### Frontend Environment Variables

Create a `.env` file in the `frontend/` directory:

```env
REACT_APP_API_URL=https://your-backend-domain.onrender.com/api
```

## Step 2: Database Setup

1. Go to [Supabase](https://supabase.com/) and create a new project
2. Navigate to the SQL Editor
3. Run the SQL commands from `supabase/schema.sql`
4. Copy your project URL and anon key for the backend environment variables

## Step 3: Backend Deployment (Render)

1. Push your code to GitHub
2. Go to [Render](https://render.com/) and create an account
3. Click "New +" and select "Web Service"
4. Connect your GitHub repository
5. Configure the service:
   - **Name**: `ai-tutor-backend`
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn app:app`
   - **Root Directory**: `backend`

6. Add environment variables:
   - `FLASK_ENV`: `production`
   - `SECRET_KEY`: Your secret key
   - `OPENAI_API_KEY`: Your OpenAI API key
   - `SUPABASE_URL`: Your Supabase project URL
   - `SUPABASE_KEY`: Your Supabase anon key
   - `CORS_ORIGINS`: Your frontend domain

7. Click "Create Web Service"
8. Copy the generated URL (e.g., `https://ai-tutor-backend.onrender.com`)

## Step 4: Frontend Deployment (Vercel)

1. Go to [Vercel](https://vercel.com/) and create an account
2. Click "New Project"
3. Import your GitHub repository
4. Configure the project:
   - **Framework Preset**: `Create React App`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`

5. Add environment variables:
   - `REACT_APP_API_URL`: Your backend URL + `/api`

6. Click "Deploy"
7. Copy the generated domain (e.g., `https://ai-tutor-frontend.vercel.app`)

## Step 5: Update CORS Settings

1. Go back to your Render backend service
2. Update the `CORS_ORIGINS` environment variable with your Vercel domain
3. Redeploy the backend service

## Step 6: Test Your Deployment

1. Visit your frontend URL
2. Test the chat functionality
3. Test the quiz generation
4. Verify all features are working correctly

## Troubleshooting

### Common Issues

1. **CORS Errors**: Make sure your backend CORS_ORIGINS includes your frontend domain
2. **API Connection Issues**: Verify your frontend REACT_APP_API_URL is correct
3. **Database Connection**: Check your Supabase credentials
4. **OpenAI API Errors**: Verify your OpenAI API key is valid and has credits

### Environment Variable Checklist

Backend (Render):
- [ ] FLASK_ENV=production
- [ ] SECRET_KEY (random string)
- [ ] OPENAI_API_KEY (from OpenAI)
- [ ] SUPABASE_URL (from Supabase)
- [ ] SUPABASE_KEY (from Supabase)
- [ ] CORS_ORIGINS (your frontend domain)

Frontend (Vercel):
- [ ] REACT_APP_API_URL (your backend URL + /api)

## Monitoring and Maintenance

### Backend Monitoring
- Monitor your Render service logs
- Check OpenAI API usage and costs
- Monitor Supabase database usage

### Frontend Monitoring
- Monitor Vercel deployment status
- Check for any build errors
- Monitor user analytics (if implemented)

## Security Considerations

1. **API Keys**: Never commit API keys to version control
2. **CORS**: Only allow necessary domains in CORS_ORIGINS
3. **Rate Limiting**: Consider implementing rate limiting for the API
4. **HTTPS**: Both Vercel and Render provide HTTPS by default

## Cost Optimization

1. **OpenAI API**: Monitor usage and set up billing alerts
2. **Supabase**: Free tier includes 500MB database and 50,000 monthly active users
3. **Vercel**: Free tier includes unlimited deployments
4. **Render**: Free tier includes 750 hours/month

## Support

If you encounter issues:
1. Check the logs in your deployment platforms
2. Verify all environment variables are set correctly
3. Test the API endpoints directly
4. Check the browser console for frontend errors

---

**Your AI Tutor application is now live! 🎉**

Visit your frontend URL to start using the application. 