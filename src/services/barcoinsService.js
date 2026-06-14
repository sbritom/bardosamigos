import { supabase } from "./supabase";

const PREMIOS = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50];

function hojeISO() {
  return new Date().toISOString().slice(0, 10);
}

function ontemISO() {
  const data = new Date();
  data.setDate(data.getDate() - 1);
  return data.toISOString().slice(0, 10);
}

function sortearPremio() {
  const chance = Math.random();

  if (chance < 0.002) {
    return {
      premio: 500,
      tipo: "mega",
      jackpot: true,
    };
  }

  if (chance < 0.022) {
    return {
      premio: 100,
      tipo: "mini",
      jackpot: true,
    };
  }

  return {
    premio: PREMIOS[Math.floor(Math.random() * PREMIOS.length)],
    tipo: "normal",
    jackpot: false,
  };
}

function atualizarConquistas(usuario, dados) {
  const conquistas = Array.isArray(usuario.conquistas)
    ? usuario.conquistas
    : [];

  const novas = [...conquistas];

  function adicionar(nome) {
    if (!novas.includes(nome)) {
      novas.push(nome);
    }
  }

  if ((dados.total_giros || 0) >= 1) adicionar("🎰 Primeiro Giro");
  if ((dados.dias_consecutivos || 0) >= 7) adicionar("🔥 7 Dias Seguidos");
  if ((dados.saldo || 0) >= 100) adicionar("💰 100 BarCoins");
  if ((dados.saldo || 0) >= 500) adicionar("💰 500 BarCoins");
  if ((dados.saldo || 0) >= 1000) adicionar("💰 1000 BarCoins");
  if ((dados.jackpots || 0) >= 1) adicionar("💎 Primeiro Jackpot");

  return novas;
}

export async function cadastrarUsuario(nome, senha) {
  if (!nome || !senha) {
    throw new Error("Preencha nome e senha.");
  }

  if (senha.length !== 4) {
    throw new Error("A senha precisa ter 4 dígitos.");
  }

  const { data: existente } = await supabase
    .from("usuarios_barcoins")
    .select("*")
    .eq("nome", nome)
    .maybeSingle();

  if (existente) {
    throw new Error("Usuário já existe.");
  }

  const { data, error } = await supabase
    .from("usuarios_barcoins")
    .insert([
      {
        nome,
        senha,
        saldo: 0,
        jackpots: 0,
        total_giros: 0,
        dias_consecutivos: 0,
        maior_sequencia: 0,
        conquistas: [],
        ultimo_login: new Date().toISOString(),
      },
    ])
    .select()
    .single();

  if (error) throw error;

  salvarUsuarioLocal(data);

  return data;
}

export async function loginUsuario(nome, senha) {
  const { data, error } = await supabase
    .from("usuarios_barcoins")
    .select("*")
    .eq("nome", nome)
    .eq("senha", senha)
    .single();

  if (error || !data) {
    throw new Error("Nome ou senha inválidos.");
  }

  await supabase
    .from("usuarios_barcoins")
    .update({
      ultimo_login: new Date().toISOString(),
    })
    .eq("id", data.id);

  salvarUsuarioLocal(data);

  return data;
}

export function salvarUsuarioLocal(usuario) {
  localStorage.setItem("barcoins_user", JSON.stringify(usuario));
}

export function buscarUsuarioLocal() {
  const salvo = localStorage.getItem("barcoins_user");

  if (!salvo) return null;

  try {
    return JSON.parse(salvo);
  } catch {
    return null;
  }
}

export function sairUsuarioLocal() {
  localStorage.removeItem("barcoins_user");
}

export async function atualizarUsuario(usuarioId) {
  const { data, error } = await supabase
    .from("usuarios_barcoins")
    .select("*")
    .eq("id", usuarioId)
    .single();

  if (error) throw error;

  salvarUsuarioLocal(data);

  return data;
}

export async function girarRoleta(usuario) {
  const agora = new Date();

  if (usuario.ultimo_giro) {
    const ultimoGiro = new Date(usuario.ultimo_giro);

    const horas =
      (agora.getTime() - ultimoGiro.getTime()) /
      (1000 * 60 * 60);

    if (horas < 24) {
      throw new Error(
        `Você já girou hoje. Volte em ${Math.ceil(24 - horas)} horas.`
      );
    }
  }

  const resultado = sortearPremio();

  const hoje = hojeISO();
  const ontem = ontemISO();

  let novaSequencia = 1;

  if (usuario.ultimo_dia_giro === ontem) {
    novaSequencia = (usuario.dias_consecutivos || 0) + 1;
  }

  const melhorSequencia = Math.max(
    usuario.maior_sequencia || 0,
    novaSequencia
  );

  const novoSaldo = (usuario.saldo || 0) + resultado.premio;
  const totalGiros = (usuario.total_giros || 0) + 1;
  const totalJackpots =
    (usuario.jackpots || 0) + (resultado.jackpot ? 1 : 0);

  const conquistas = atualizarConquistas(usuario, {
    saldo: novoSaldo,
    total_giros: totalGiros,
    dias_consecutivos: novaSequencia,
    jackpots: totalJackpots,
  });

  const { error: updateError } = await supabase
    .from("usuarios_barcoins")
    .update({
      saldo: novoSaldo,
      ultimo_giro: agora.toISOString(),
      ultimo_dia_giro: hoje,
      jackpots: totalJackpots,
      total_giros: totalGiros,
      dias_consecutivos: novaSequencia,
      maior_sequencia: melhorSequencia,
      conquistas,
    })
    .eq("id", usuario.id);

  if (updateError) throw updateError;

  const { error: logError } = await supabase
    .from("logs_barcoins")
    .insert([
      {
        usuario_id: usuario.id,
        premio: resultado.premio,
      },
    ]);

  if (logError) throw logError;

  const atualizado = {
    ...usuario,
    saldo: novoSaldo,
    ultimo_giro: agora.toISOString(),
    ultimo_dia_giro: hoje,
    jackpots: totalJackpots,
    total_giros: totalGiros,
    dias_consecutivos: novaSequencia,
    maior_sequencia: melhorSequencia,
    conquistas,
  };

  salvarUsuarioLocal(atualizado);

  return {
    ...resultado,
    usuario: atualizado,
  };
}

export async function buscarRanking() {
  const { data, error } = await supabase
    .from("usuarios_barcoins")
    .select("*")
    .order("saldo", { ascending: false })
    .limit(10);

  if (error) throw error;

  return data || [];
}

export async function buscarLogs() {
  const { data, error } = await supabase
    .from("logs_barcoins")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(20);

  if (error) throw error;

  return data || [];
}

export async function buscarHallDaFama() {
  const { data, error } = await supabase
    .from("campeoes_barcoins")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(10);

  if (error) throw error;

  return data || [];
}