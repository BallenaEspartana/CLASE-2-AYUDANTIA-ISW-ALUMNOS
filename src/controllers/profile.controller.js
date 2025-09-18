import { handleSuccess } from "../Handlers/responseHandlers.js";

export function getPublicProfile(req, res) {
  handleSuccess(res, 200, "Perfil público obtenido exitosamente", {
    message: "¡Hola! Este es un perfil público. Cualquiera puede verlo.",
  });
}

export function getPrivateProfile(req, res) {
  const user = req.user;

  handleSuccess(res, 200, "Perfil privado obtenido exitosamente", {
    message: `¡Hola, ${user.email}! Este es tu perfil privado. Solo tú puedes verlo.`,
    userData: user,
  });
}
/*updateProfile */
import { handleSuccess } from "../Handlers/responseHandlers.js";
import bcrypt from "bcrypt";
import { AppDataSource } from "../config/configDB.js";
import { User } from "../entities/user.entity.js";

const userRepository = AppDataSource.getRepository(User);

export async function updateProfile(req, res) {
  try {
    const userId = req.user.id;           // ✅ ID del token
    const { email, password } = req.body; // ✅ datos nuevos

    const user = await userRepository.findOneBy({ id: userId });
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

    if (email) user.email = email;
    if (password) user.password = await bcrypt.hash(password, 10);

    await userRepository.save(user);

    handleSuccess(res, 200, "Perfil actualizado exitosamente", { user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar perfil" });
  }
}

/*deleteProfile */
export async function deleteProfile(req, res) {
  try {
    const userId = req.user.id; // ✅ ID del token

    const user = await userRepository.findOneBy({ id: userId });
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

    await userRepository.remove(user);

    handleSuccess(res, 200, "Perfil eliminado exitosamente");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar perfil" });
  }
}
