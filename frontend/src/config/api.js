// Central API configuration
// In production (Vercel), set VITE_API_URL to your Railway backend URL
// Example: https://your-app.up.railway.app
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default API_URL;
