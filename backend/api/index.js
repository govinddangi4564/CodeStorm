export default async function handler(req, res) {
  try {
    const { default: app } = await import('../server.js');
    return app(req, res);
  } catch (error) {
    console.error("Critical server initialization error:", error);
    res.status(500).json({ 
      error: 'Server crashed during initialization', 
      message: error.message, 
      stack: error.stack 
    });
  }
}
