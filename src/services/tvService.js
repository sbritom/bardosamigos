import { supabase } from "./supabase";

export function youtubeWatchToEmbed(url) {
  if (!url) return null;

  let videoId = null;

  if (url.includes("youtube.com/watch?v=")) {
    videoId = url.split("v=")[1]?.split("&")[0];
  }

  if (url.includes("youtu.be/")) {
    videoId = url.split("youtu.be/")[1]?.split("?")[0];
  }

  if (!videoId) return url;

  return `https://www.youtube.com/embed/${videoId}`;
}

export async function buscarCanalAtivo() {
  const { data, error } = await supabase
    .from("canais_tv")
    .select("*")
    .eq("ativo", true)
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error("Erro ao buscar canal ativo:", error);
    return null;
  }

  return data;
}

export async function buscarCanais() {
  const { data, error } = await supabase
    .from("canais_tv")
    .select("*")
    .eq("ativo", true)
    .order("id", { ascending: true });

  if (error) {
    console.error("Erro ao buscar canais:", error);
    return [];
  }

  return data || [];
}

export async function buscarCanaisPorCategoria(categoria) {
  const { data, error } = await supabase
    .from("canais_tv")
    .select("*")
    .eq("ativo", true)
    .eq("categoria", categoria)
    .order("id", { ascending: true });

  if (error) {
    console.error("Erro ao buscar canais por categoria:", error);
    return [];
  }

  return data || [];
}

export async function buscarDestaqueHome() {
  const { data, error } = await supabase
    .from("canais_tv")
    .select("*")
    .eq("ativo", true)
    .eq("destaque_home", true)
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error("Erro ao buscar destaque da Home:", error);
    return null;
  }

  return data;
}