/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Search, Gamepad2, X, Play, Info, Trophy, LayoutGrid, Zap } from 'lucide-react';
import { GAMES, CATEGORIES } from './data/games';

export default function App() {
  const [selectedGame, setSelectedGame] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredGames = useMemo(() => {
    return GAMES.filter(game => {
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          game.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'All' || game.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  return (
    <div className="min-h-screen bg-black text-white font-sans arcade-grid pb-20 selection:bg-green-500 selection:text-black">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-black/80 backdrop-blur-md border-b-2 border-white">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-500 flex items-center justify-center border-2 border-black">
              <Zap className="text-black fill-black" size={24} />
            </div>
            <h1 className="font-bold text-2xl tracking-tighter hidden sm:block">
              CLOUD ARCADE
            </h1>
          </div>

          <div className="flex-1 max-w-md relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input
              type="text"
              placeholder="SEARCH GAMES..."
              className="w-full bg-zinc-900 border-2 border-white py-2 pl-10 pr-4 font-mono text-sm focus:outline-none focus:border-green-500 transition-colors"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-4 text-xs font-mono font-bold">
            <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-green-500 text-black border-2 border-black">
              <Trophy size={14} /> 2.4k PLAYING
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-10 overflow-x-auto pb-2 -mx-1 px-1 no-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 border-2 text-xs font-mono font-bold transition-all ${
                activeCategory === cat
                  ? 'bg-green-500 text-black border-black shadow-[4px_4px_0px_white]'
                  : 'bg-zinc-900 text-white border-white hover:border-green-500'
              }`}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Game Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredGames.length > 0 ? (
            filteredGames.map((game) => (
              <div
                key={game.id}
                className="bg-zinc-900 border-2 border-white p-1 transition-all duration-200 hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[8px_8px_0px_#22c55e] hover:border-green-500 group cursor-pointer flex flex-col"
                onClick={() => setSelectedGame(game)}
              >
                <div className="relative aspect-video overflow-hidden border-b-2 border-white">
                  <img
                    src={game.thumbnail}
                    alt={game.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/0 transition-colors" />
                  <div className="absolute top-2 left-2 px-2 py-0.5 bg-green-500 text-black text-[10px] font-mono font-bold border border-black">
                    {game.category}
                  </div>
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-lg mb-1 group-hover:text-green-500 transition-colors">
                      {game.title}
                    </h3>
                    <p className="text-gray-400 text-xs line-clamp-2 font-sans mb-4">
                      {game.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-auto pt-2 border-t border-white/10">
                    <span className="flex items-center gap-1 text-[10px] font-mono text-gray-400 uppercase">
                      <Gamepad2 size={12} /> Unblocked
                    </span>
                    <div className="w-8 h-8 flex items-center justify-center border-2 border-white group-hover:bg-green-500 group-hover:border-black group-hover:text-black transition-all">
                      <Play size={14} fill="currentColor" />
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center border-2 border-dashed border-white/20">
              <p className="font-mono text-gray-500 tracking-widest">NO GAMES FOUND IN THIS SECTOR</p>
            </div>
          )}
        </div>
      </main>

      {/* Game Overlay */}
      {selectedGame && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col p-4 md:p-8 animate-in fade-in duration-300">
          <div className="max-w-6xl w-full mx-auto flex flex-col h-full bg-zinc-900 border-4 border-white shadow-[12px_12px_0px_#22c55e]">
            <div className="h-14 border-b-4 border-white flex items-center justify-between px-6 bg-black">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-green-500 border-2 border-black flex items-center justify-center">
                  <Play className="text-black fill-black" size={12} />
                </div>
                <span className="font-bold text-sm tracking-widest uppercase">
                  {selectedGame.title}
                </span>
              </div>
              <button
                onClick={() => setSelectedGame(null)}
                className="w-10 h-10 hover:bg-red-500 flex items-center justify-center border-2 border-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="flex-1 bg-black relative">
              <iframe
                src={selectedGame.iframeUrl}
                className="w-full h-full border-none"
                title={selectedGame.title}
                allow="autoplay; fullscreen; keyboard"
              />
            </div>

            <div className="p-4 md:px-8 md:py-4 bg-black border-t-4 border-white flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex flex-col gap-1">
                 <div className="flex gap-2">
                  <span className="px-2 py-0.5 bg-white text-black text-[10px] font-mono font-bold">
                    {selectedGame.category}
                  </span>
                  <span className="px-2 py-0.5 border border-white/30 text-gray-400 text-[10px] font-mono">
                    v1.0.4-STABLE
                  </span>
                 </div>
              </div>
              <div className="flex items-center gap-4">
                 <button className="flex items-center gap-2 font-mono text-[11px] font-bold hover:text-green-500 transition-colors">
                  <Info size={14} /> DETAILS
                 </button>
                 <button className="flex items-center gap-2 font-mono text-[11px] font-bold hover:text-green-500 transition-colors">
                  <LayoutGrid size={14} /> MORE GAMES
                 </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="mt-20 border-t-2 border-white/20 py-10 overflow-hidden">
        <div className="flex whitespace-nowrap animate-[marquee_20s_linear_infinite] opacity-30">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="font-mono text-xs tracking-[0.4em] mx-10">
              CLOUD ARCADE SYSTEM // v0.9.1 // 2026 // UNBLOCKED SECTOR 7 // NO COINS REQUIRED // INSERT BRAIN TO CONTINUE //
            </span>
          ))}
        </div>
      </footer>
    </div>
  );
}

