import Header from "../components/Header";

import ChatCard from "../components/ChatCard";

import TopMusicCard from "../components/TopMusicCard";
import LiveFootballCard from "../components/LiveFootballCard";
import LatestNewsCard from "../components/LatestNewsCard";

import ToolsCard from "../components/ToolsCard";
import CommunityCard from "../components/CommunityCard";

import TvAoVivoCard from "../components/tv/TvAoVivoCard";

import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      {/* CHAT + TV */}
      <div className="max-w-7xl mx-auto px-6 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-6">
            <ChatCard />
          </div>

          <div className="lg:col-span-6">
            <TvAoVivoCard />
          </div>
        </div>
      </div>

      {/* TOP MUSICAS + FUTEBOL + NOTICIAS */}
      <div className="max-w-7xl mx-auto px-6 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-4">
            <TopMusicCard />
          </div>

          <div className="lg:col-span-4">
            <LiveFootballCard />
          </div>

          <div className="lg:col-span-4">
            <LatestNewsCard />
          </div>
        </div>
      </div>

      {/* FERRAMENTAS + COMUNIDADE */}
      <div className="max-w-7xl mx-auto px-6 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-6">
            <ToolsCard />
          </div>

          <div className="lg:col-span-6">
            <CommunityCard />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}