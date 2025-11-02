import type { Express } from "express";
import { createServer, type Server } from "http";
import { Router } from "express";

export async function registerRoutes(app: Express): Promise<Server> {
  const router = Router();

  // Example API route
  router.get("/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  // Proxy route for Google Drive images
  router.get("/proxy-image", async (req, res) => {
    try {
      const imageUrl = req.query.url as string;

      if (!imageUrl || !imageUrl.includes('drive.google.com')) {
        return res.status(400).json({ error: 'Invalid or missing URL' });
      }

      const response = await fetch(imageUrl);

      if (!response.ok) {
        return res.status(response.status).json({ error: 'Failed to fetch image' });
      }

      // Set appropriate headers
      res.set({
        'Content-Type': response.headers.get('content-type') || 'image/jpeg',
        'Cache-Control': 'public, max-age=31536000', // Cache for 1 year
        'Access-Control-Allow-Origin': '*'
      });

      // Pipe the image data
      const buffer = await response.arrayBuffer();
      res.send(Buffer.from(buffer));

    } catch (error) {
      console.error('Proxy error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.use('/', router);

  const httpServer = createServer(app);

  return httpServer;
}