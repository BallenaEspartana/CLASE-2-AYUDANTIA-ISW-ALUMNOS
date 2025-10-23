import { AppDataSource } from "../config/configDB.js";
import { User } from "../entities/user.entity.js";
import bcrypt from "bcrypt";

const userRepository = AppDataSource.getRepository(User);

export async function createUser(data) {
  const hashedPassword = await bcrypt.hash(data.password, 10);

  const newUser = userRepository.create({
    email: data.email,
    password: hashedPassword,
  });

  return await userRepository.save(newUser);
}

export async function findUserByEmail(email) {
  return await userRepository.findOneBy({ email });
}
export async function updateUserProfile(id, data) {
  const user = await userRepository.findOneBy({ id });

  if (!user) throw new Error("Usuario no encontrado");

  if (data.email) user.email = data.email;
  if (data.password) user.password = await bcrypt.hash(data.password, 10);

  return await userRepository.save(user);
}

export async function deleteUserProfile(id) {
  const user = await userRepository.findOneBy({ id });

  if (!user) throw new Error("Usuario no encontrado");

  return await userRepository.remove(user);
}

export async function findUserById(id) {
  return await userRepository.findOneBy({ id });
}
