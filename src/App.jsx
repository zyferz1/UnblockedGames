/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
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
    <div className="min-h-screen bg-black text-white font-sans arcade-grid pb-20">
      <div className="fixed bottom-4 right-4 bg-green-500 text-black px-4 py-2 font-mono text-xs font-bold z-50">
        REACT_STATUS: OPERATIONAL
      </div>

      <header className="sticky top-0 z-40 bg-zinc-900 border-b-2 border-white">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
             <h1 className="font-bold text-2xl tracking-tighter">CLOUD ARCADE</h1>
          </div>
          <div className="flex-1 max-w-md relative">
            <input
              type="text"
              placeholder="SEARCH..."
              className="w-full bg-zinc-800 border-2 border-white py-2 px-4 font-mono text-sm focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-2 mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 border-2 text-xs font-mono font-bold ${
                activeCategory === cat ? 'bg-green-500 text-black border-black' : 'bg-zinc-800 border-white'
              }`}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredGames.map((game) => (
            <div
              key={game.id}
              className="bg-zinc-900 border-2 border-white p-1 hover:border-green-500 cursor-pointer"
              onClick={() => setSelectedGame(game)}
            >
              <div className="aspect-video bg-zinc-800 relative overflow-hidden">
                <img src={game.thumbnail} alt={game.title} className="w-full h-full object-cover" />
                <div className="absolute top-2 left-2 px-2 py-0.5 bg-green-500 text-black text-[10px] font-bold">
                  {game.category}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-1">{game.title}</h3>
                <p className="text-gray-400 text-xs mb-4 line-clamp-2">{game.description}</p>
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-gray-500 uppercase tracking-widest flex items-center gap-1">
                    [ GAME ]
                  </span>
                  <span className="text-green-500 font-bold">PLAY</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {selectedGame && (
        <div className="fixed inset-0 z-50 bg-black flex flex-col p-4">
          <div className="max-w-6xl w-full mx-auto flex flex-col h-full bg-zinc-900 border-4 border-white">
            <div className="h-14 border-b-4 border-white flex items-center justify-between px-6 bg-black">
              <span className="font-bold tracking-widest">{selectedGame.title.toUpperCase()}</span>
              <button 
                onClick={() => setSelectedGame(null)}
                className="w-10 h-10 border-2 border-white flex items-center justify-center hover:bg-red-500"
              >
                CLOSE
              </button>
            </div>
            <div className="flex-1 bg-black">
              <iframe
                src={selectedGame.iframeUrl}
                className="w-full h-full border-none"
                title={selectedGame.title}
                allow="autoplay; fullscreen; keyboard"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
