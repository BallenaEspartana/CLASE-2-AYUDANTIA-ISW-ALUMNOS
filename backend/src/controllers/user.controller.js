import {
  findNotas,
  findNotaById,
  createNota,
  updateNota,
  deleteNota,
} from "../services/notas.services.js";
import { handleSuccess, handleErrorClient, handleErrorServer } from "../Handlers/responseHandlers.js";
import { findUserById } from "../services/user.services.js";
export class NotasController {
  async getAllNotas(req, res) {
    try {
      const notas = await findNotas();
      handleSuccess(res, 200, "Notas obtenidas exitosamente", notas);
    } catch (error) {
      handleErrorServer(res, 500, "Error al obtener las notas", error.message);
    }
  }

  async getNotaById(req, res) {
    try {
      const { id } = req.params;
      
      if (!id || isNaN(id)) {
        return handleErrorClient(res, 400, "ID de nota inválido");
      }
      
      const nota = await findNotaById(id);
      handleSuccess(res, 200, "Nota obtenida exitosamente", nota);
    } catch (error) {
      handleErrorClient(res, 404, error.message);
    }
  }

  async createNota(req, res) {
    try {
      const data = req.body;
      
      if (!data || Object.keys(data).length === 0) {
        return handleErrorClient(res, 400, "Datos de la nota son requeridos");
      }
      
      const nuevaNota = await createNota(data);
      handleSuccess(res, 201, "Nota creada exitosamente", nuevaNota);
    } catch (error) {
      handleErrorServer(res, 500, "Error al crear la nota", error.message);
    }
  }

  async updateNota(req, res) {
    try {
      const { id } = req.params;
      const changes = req.body;
      
      if (!id || isNaN(id)) {
        return handleErrorClient(res, 400, "ID de nota inválido");
      }
      
      if (!changes || Object.keys(changes).length === 0) {
        return handleErrorClient(res, 400, "Datos para actualizar son requeridos");
      }
      
      const notaActualizada = await updateNota(id, changes);
      handleSuccess(res, 200, "Nota actualizada exitosamente", notaActualizada);
    } catch (error) {
      handleErrorClient(res, 404, error.message);
    }
  }

  async deleteNota(req, res) {
    try {
      const { id } = req.params;
      
      if (!id || isNaN(id)) {
        return handleErrorClient(res, 400, "ID de nota inválido");
      }
      
      await deleteNota(id);
      handleSuccess(res, 200, "Nota eliminada exitosamente", { id });
    } catch (error) {
      handleErrorClient(res, 404, error.message);
    }
  }
}
// ...existing code...
export async function getPrivateProfile(req, res) {
  try {
    const userId = req.user?.id; // requiere que el auth.middleware setee req.user.id
    if (!userId) {
      return handleErrorClient(res, 401, "No autenticado");
    }

    const user = await findUserById(userId);
    if (!user) {
      return handleErrorClient(res, 404, "Usuario no encontrado");
    }

    // ADVERTENCIA: la contraseña devuelta es el hash almacenado, NO el texto plano.
    return handleSuccess(res, 200, "Perfil obtenido", {
      email: user.email,
      password: user.password
    });
  } catch (error) {
    return handleErrorServer(res, 500, error.message);
  }
}