import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import {
  getPublicProfile,
  getPrivateProfile,
  updateProfile,
  deleteProfile,
} from "../controllers/profile.controller.js";

const router = Router();

// Rutas públicas
router.get("/public", getPublicProfile);

// Rutas privadas (requieren JWT)
router.get("/private", authMiddleware, getPrivateProfile);
router.patch("/private", authMiddleware, updateProfile);  // actualizar perfil
router.delete("/private", authMiddleware, deleteProfile); // eliminar perfil

export default router;
