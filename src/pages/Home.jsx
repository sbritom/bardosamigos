import Header from "../components/Header";

import ChatCard from "../components/ChatCard";
import BarCoinsCard from "../components/BarCoinsCard";

import TopMusicCard from "../components/TopMusicCard";
import LiveFootballCard from "../components/LiveFootballCard";
import LatestNewsCard from "../components/LatestNewsCard";

import MusicCard from "../components/MusicCard";
import ToolsCard from "../components/ToolsCard";
import CommunityCard from "../components/CommunityCard";

import TvAoVivoCard from "../components/tv/TvAoVivoCard";

import Footer from "../components/Footer";

export default function Home() {
  const BARCOINS_ATIVO = false;

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

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

      <div className="max-w-7xl mx-auto px-6 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {BARCOINS_ATIVO && (
            <div className="lg:col-span-3">
              <BarCoinsCard />
            </div>
          )}

          <div className={BARCOINS_ATIVO ? "lg:col-span-6" : "lg:col-span-9"}>
            <LatestNewsCard />
          </div>

          <div className="lg:col-span-3">
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-3">
            <MusicCard />
          </div>

          <div className="lg:col-span-6">
            <ToolsCard />
          </div>

          <div className="lg:col-span-3">
            <CommunityCard />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-6">
            <TopMusicCard />
          </div>

          <div className="lg:col-span-6">
            <LiveFootballCard />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}