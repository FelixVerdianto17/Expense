import pool from './config/db.js';

async function testConnection() {
  console.log("Connecting to Supabase PostgreSQL...");
  try {
    const res = await pool.query('SELECT NOW();');
    console.log("✅ Connection successful!");
    console.log("🕒 Database time:", res.rows[0].now);
  } catch (err) {
    console.error("❌ Connection failed!");
    console.error("🔍 Error details:", err.message);
    console.error("\nTips to fix common errors:");
    console.error("1. Check if DATABASE_URL in backend/.env is correct.");
    console.error("2. Ensure your internet connection is active and Supabase project is not paused.");
    console.error("3. If you get an SSL error, try uncommenting the 'ssl' config in backend/config/db.js.");
  } finally {
    // Close the pool connection so the Node process can exit immediately
    await pool.end();
  }
}

testConnection();
