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
export async function updateProfile(req, res) {
  const userId = req.params.userId;
  const newData = req.body;

  const updatedUser = await updateProfile(userId, newData);

  handleSuccess(res, 200, "Perfil actualizado exitosamente", { updatedUser });
}  
/*deleteProfile */
export async function deleteProfile(req, res) {
  const userId = req.user.id;

  await deleteProfile(userId);

  handleSuccess(res, 200, "Perfil eliminado exitosamente");
}