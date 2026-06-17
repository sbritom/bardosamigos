export const portalRegistry = [
  {
    id: "tv",
    title: "TV Inteligente",
    icon: "📺",
    route: "/tv?categoria=Futebol",
    active: true,
    order: 1,
  },
  {
    id: "radio",
    title: "Rádio",
    icon: "📻",
    route: "/",
    active: true,
    order: 2,
  },
  {
    id: "football",
    title: "Futebol",
    icon: "⚽",
    route: "/",
    active: true,
    order: 3,
  },
  {
    id: "news",
    title: "Notícias",
    icon: "📰",
    route: "/",
    active: true,
    order: 4,
  },
  {
    id: "tools",
    title: "BarStudio",
    icon: "🛠️",
    route: "/barstudio",
    active: true,
    order: 5,
  },
  {
    id: "games",
    title: "Games",
    icon: "🎮",
    route: "/",
    active: true,
    order: 6,
  },
  {
    id: "community",
    title: "Comunidade",
    icon: "👥",
    route: "/",
    active: true,
    order: 7,
  },
  {
    id: "barcoins",
    title: "BarCoins",
    icon: "💰",
    route: "/barcoins",
    active: true,
    order: 8,
  },
];

export function getActiveModules() {
  return portalRegistry
    .filter((module) => module.active)
    .sort((a, b) => a.order - b.order);
}