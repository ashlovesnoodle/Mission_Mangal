import React, { useState } from 'react';
import StartScreen from '../components/game/StartScreen';
import GameCanvas from '../components/game/GameCanvas';
import EndScreen from '../components/game/EndScreen';
import CreditsScreen from '../components/game/CreditsScreen';
export default function Game() {
  const [gameState, setGameState] = useState('start'); // start, playing, end, credits
  return (
    <div className="w-full h-screen overflow-hidden bg-black">
      {gameState === 'start' && <StartScreen onStart={() => setGameState('playing')} />}
      {gameState === 'playing' && <GameCanvas onGameEnd={() => setGameState('end')} />}
      {gameState === 'end' && <EndScreen onCredits={() => setGameState('credits')} />}
      {gameState === 'credits' && <CreditsScreen onRestart={() => setGameState('start')} />}
    </div>
  );
}