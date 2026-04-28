/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { GAMES, CATEGORIES } from './data/games';

export default function App() {
  const [selectedGame, setSelectedGame] = useState(null);

  return (
    <div style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh', padding: '20px', fontFamily: 'monospace' }}>
      <div style={{ borderBottom: '2px solid #0f0', paddingBottom: '10px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
        <h1 style={{ color: '#0f0', margin: 0 }}>CLOUD_ARCADE_v1.0</h1>
        <div style={{ background: '#0f0', color: '#000', padding: '0 5px' }}>STATUS: ONLINE</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
        {GAMES.map(game => (
          <div 
            key={game.id} 
            onClick={() => setSelectedGame(game)}
            style={{ border: '2px solid #fff', cursor: 'pointer', padding: '5px' }}
          >
            <img src={game.thumbnail} alt={game.title} style={{ width: '100%', aspectRatio: '16/9', objectCover: 'cover' }} />
            <h3 style={{ margin: '10px 0 5px 0' }}>{game.title}</h3>
            <p style={{ fontSize: '10px', opacity: 0.7 }}>{game.category.toUpperCase()}</p>
          </div>
        ))}
      </div>

      {selectedGame && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.95)', display: 'flex', flexDirection: 'column', zIndex: 100 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', borderBottom: '2px solid #fff' }}>
            <span>PLAYING: {selectedGame.title}</span>
            <button onClick={() => setSelectedGame(null)} style={{ background: 'red', color: 'white', border: 'none', padding: '5px 15px', cursor: 'pointer' }}>CLOSE</button>
          </div>
          <iframe 
            src={selectedGame.iframeUrl} 
            style={{ flex: 1, border: 'none' }} 
            title={selectedGame.title}
          />
        </div>
      )}
    </div>
  );
}

