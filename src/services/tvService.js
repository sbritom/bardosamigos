import { supabase } from "./supabase";
import {
  buscarLiveDoCanalYoutube,
  youtubeWatchToEmbed,
} from "./youtubeService";

export async function buscarCanalAtivo() {
  const { data, error } = await supabase
    .from("canais_tv")
    .select("*")
    .eq("ativo", true)
    .order("prioridade", { ascending: true })
    .order("id", { ascending: true })
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error("Erro ao buscar canal ativo:", error);
    return null;
  }

  return prepararCanal(data);
}

export async function buscarCanais() {
  const { data, error } = await supabase
    .from("canais_tv")
    .select("*")
    .eq("ativo", true)
    .order("prioridade", { ascending: true })
    .order("id", { ascending: true });

  if (error) {
    console.error("Erro ao buscar canais:", error);
    return [];
  }

  return prepararLista(data || []);
}

export async function buscarCanaisPorCategoria(categoria) {
  const { data, error } = await supabase
    .from("canais_tv")
    .select("*")
    .eq("ativo", true)
    .eq("categoria", categoria)
    .order("prioridade", { ascending: true })
    .order("id", { ascending: true });

  if (error) {
    console.error("Erro ao buscar canais por categoria:", error);
    return [];
  }

  return prepararLista(data || []);
}

export async function buscarDestaqueHome() {
  const { data, error } = await supabase
    .from("canais_tv")
    .select("*")
    .eq("ativo", true)
    .eq("destaque_home", true)
    .order("prioridade", { ascending: true })
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error("Erro ao buscar destaque da Home:", error);
    return null;
  }

  return prepararCanal(data);
}

export async function buscarCanalInteligente(categoria = "Futebol") {
  const canais = await buscarCanaisPorCategoria(categoria);

  if (!canais.length) return null;

  for (const canal of canais) {
    const canalPreparado = await resolverCanalAutomatico(canal);

    if (canalPreparado?.url_embed) {
      return canalPreparado;
    }
  }

  return canais[0] || null;
}

export async function resolverCanalAutomatico(canal) {
  if (!canal) return null;

  if (
    canal.plataforma === "youtube" &&
    canal.auto_live === true &&
    canal.canal_id
  ) {
    const live = await buscarLiveDoCanalYoutube(canal.canal_id);

    if (live?.embedUrl) {
      return {
        ...canal,
        url_embed: live.embedUrl,
        titulo_transmissao: live.titulo,
        descricao: canal.descricao || live.descricao,
        thumbnail: live.thumbnail,
        status: "online",
      };
    }

    return {
      ...canal,
      url_embed:
        youtubeWatchToEmbed(canal.url_fallback) ||
        youtubeWatchToEmbed(canal.url_embed),
      status: "offline",
    };
  }

  return prepararCanal(canal);
}

function prepararLista(lista) {
  return lista.map(prepararCanal);
}

function prepararCanal(canal) {
  if (!canal) return null;

  if (canal.plataforma === "youtube") {
    return {
      ...canal,
      url_embed: youtubeWatchToEmbed(canal.url_embed),
    };
  }

  return canal;
}