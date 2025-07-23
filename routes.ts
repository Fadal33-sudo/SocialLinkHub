import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Profile routes
  app.get("/api/profile", async (req, res) => {
    try {
      const profile = await storage.getProfile();
      if (!profile) {
        return res.status(404).json({ message: "Profile not found" });
      }
      res.json(profile);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch profile" });
    }
  });

  app.put("/api/profile", async (req, res) => {
    try {
      const profile = await storage.getProfile();
      if (!profile) {
        return res.status(404).json({ message: "Profile not found" });
      }
      
      const updated = await storage.updateProfile(profile.id, req.body);
      if (!updated) {
        return res.status(404).json({ message: "Profile not found" });
      }
      
      res.json(updated);
    } catch (error) {
      res.status(500).json({ message: "Failed to update profile" });
    }
  });

  // Social links routes
  app.get("/api/social-links", async (req, res) => {
    try {
      const links = await storage.getSocialLinks();
      res.json(links);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch social links" });
    }
  });

  app.post("/api/social-links", async (req, res) => {
    try {
      const link = await storage.createSocialLink(req.body);
      res.status(201).json(link);
    } catch (error) {
      res.status(500).json({ message: "Failed to create social link" });
    }
  });

  app.put("/api/social-links/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updated = await storage.updateSocialLink(id, req.body);
      if (!updated) {
        return res.status(404).json({ message: "Social link not found" });
      }
      res.json(updated);
    } catch (error) {
      res.status(500).json({ message: "Failed to update social link" });
    }
  });

  app.delete("/api/social-links/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteSocialLink(id);
      if (!deleted) {
        return res.status(404).json({ message: "Social link not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete social link" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
