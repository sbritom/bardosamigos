import { supabase } from "./supabase";

async function executarAdminUsers(body) {
  const { data, error } = await supabase.functions.invoke("admin-users", {
    body,
  });

  if (error) {
    throw new Error("Não foi possível executar esta ação administrativa.");
  }

  if (!data?.ok) {
    throw new Error(data?.error || "Ação administrativa não concluída.");
  }

  return data;
}

export async function listarAdministradores() {
  const data = await executarAdminUsers({ action: "list" });
  return data.users || [];
}

export async function criarAdministrador(usuario, senha) {
  return executarAdminUsers({
    action: "create",
    username: usuario,
    password: senha,
  });
}

export async function redefinirSenhaAdministrador(userId, novaSenha) {
  return executarAdminUsers({
    action: "reset_password",
    userId,
    password: novaSenha,
  });
}
