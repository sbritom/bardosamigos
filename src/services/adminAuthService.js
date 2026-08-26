import { supabase } from "./supabase";

const ADMIN_AUTH_DOMAIN = "auth.bardosamigos.local";
const ADMIN_ROLES = new Set(["admin", "super_admin"]);

export function normalizarUsuario(usuario = "") {
  return usuario.trim().toLowerCase();
}

export function usuarioParaEmailTecnico(usuario) {
  const normalizado = normalizarUsuario(usuario);

  if (!/^[a-z0-9._-]{3,32}$/.test(normalizado)) {
    throw new Error(
      "Use de 3 a 32 caracteres: letras, números, ponto, hífen ou sublinhado."
    );
  }

  return `${normalizado}@${ADMIN_AUTH_DOMAIN}`;
}

export function usuarioEhAdmin(user) {
  return Boolean(user && ADMIN_ROLES.has(user.app_metadata?.role));
}

export function obterNomeUsuario(user) {
  if (!user) return "";

  return (
    user.app_metadata?.username ||
    user.user_metadata?.username ||
    user.email?.split("@")[0] ||
    "admin"
  );
}

export async function entrarAdmin(usuario, senha) {
  const email = usuarioParaEmailTecnico(usuario);

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password: senha,
  });

  if (error) {
    throw new Error("Usuário ou senha inválidos.");
  }

  if (!usuarioEhAdmin(data.user)) {
    await supabase.auth.signOut();
    throw new Error("Esta conta não possui acesso administrativo.");
  }

  return {
    session: data.session,
    user: data.user,
    username: obterNomeUsuario(data.user),
  };
}

export async function obterSessaoAdmin() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) return null;

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !usuarioEhAdmin(user)) {
    await supabase.auth.signOut();
    return null;
  }

  return {
    session,
    user,
    username: obterNomeUsuario(user),
  };
}

export function observarAutenticacaoAdmin(callback) {
  const { data } = supabase.auth.onAuthStateChange(async () => {
    const sessao = await obterSessaoAdmin();
    callback(sessao);
  });

  return () => data.subscription.unsubscribe();
}

export async function sairAdmin() {
  await supabase.auth.signOut();
}

export async function alterarMinhaSenha(senhaAtual, novaSenha) {
  const { error } = await supabase.auth.updateUser({
    password: novaSenha,
    currentPassword: senhaAtual,
  });

  if (error) {
    if (error.message?.toLowerCase().includes("password")) {
      throw new Error("Não foi possível alterar a senha. Confira a senha atual.");
    }

    throw new Error("Não foi possível alterar a senha agora.");
  }

  return true;
}

export async function recuperarSenhaAdmin(usuario, codigoRecuperacao, novaSenha) {
  const username = normalizarUsuario(usuario);
  usuarioParaEmailTecnico(username);

  if (novaSenha.length < 8 || novaSenha.length > 128) {
    throw new Error("A nova senha precisa ter entre 8 e 128 caracteres.");
  }

  const { data, error } = await supabase.functions.invoke("admin-recover", {
    body: {
      username,
      recoveryCode: codigoRecuperacao,
      newPassword: novaSenha,
    },
  });

  if (error) {
    throw new Error("Não foi possível processar a recuperação agora.");
  }

  if (!data?.ok) {
    throw new Error(data?.error || "Não foi possível redefinir a senha.");
  }

  return data;
}
