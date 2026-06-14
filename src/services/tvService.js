import { supabase } from "./supabase";

export async function buscarCanalAtivo() {
  const { data, error } = await supabase
    .from("canais_tv")
    .select("*")
    .eq("ativo", true)
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error(error);
    return null;
  }

  return data;
}

export async function buscarCanais() {
  const { data, error } = await supabase
    .from("canais_tv")
    .select("*")
    .order("id");

  if (error) {
    console.error(error);
    return [];
  }

  return data || [];
}