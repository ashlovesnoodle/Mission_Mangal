import React from 'react';
import { Heart, Droplet, Gem, Zap, Fuel } from 'lucide-react';

export default function GameUI({ stats }) {
  return (
    <>
      {/* Storage Counter - Top Left */}
      <div className="absolute top-6 left-6 space-y-3">
        <div className="bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-sm rounded-2xl p-5 shadow-2xl border-2 border-orange-500/30"
             style={{ boxShadow: '0 0 30px rgba(249, 115, 22, 0.3)' }}>
          <div className="text-orange-500 font-bold text-sm mb-3 tracking-wider uppercase">Inventory</div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <Gem className="w-5 h-5 text-yellow-400" />
              <div className="flex gap-1">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className={`w-8 h-8 rounded-lg border-2 flex items-center justify-center text-xs font-bold ${
                    i < stats.oresInInventory 
                      ? 'bg-yellow-400/20 border-yellow-400 text-yellow-400' 
                      : 'bg-gray-800/50 border-gray-600 text-gray-600'
                  }`}>
                    {i < stats.oresInInventory ? '✓' : ''}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Droplet className="w-5 h-5 text-blue-400" />
              <div className="flex gap-1">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className={`w-8 h-8 rounded-lg border-2 flex items-center justify-center text-xs font-bold ${
                    i < stats.waterInInventory 
                      ? 'bg-blue-400/20 border-blue-400 text-blue-400' 
                      : 'bg-gray-800/50 border-gray-600 text-gray-600'
                  }`}>
                    {i < stats.waterInInventory ? '✓' : ''}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-700">
            <div className="text-xs text-gray-400 mb-2">Base Storage</div>
            <div className="flex gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Gem className="w-4 h-4 text-yellow-400" />
                <span className="text-white font-bold">{stats.oreCount}/9</span>
              </div>
              <div className="flex items-center gap-2">
                <Droplet className="w-4 h-4 text-blue-400" />
                <span className="text-white font-bold">{stats.waterCount}/9</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stun Gun Cooldown */}
        <div className="bg-gradient-to-br from-purple-900/95 to-black/95 backdrop-blur-sm rounded-2xl p-4 shadow-2xl border-2 border-purple-500/30">
          <div className="flex items-center gap-3">
            <Zap className={`w-6 h-6 ${stats.stunCooldown > 0 ? 'text-gray-500' : 'text-yellow-400'}`} />
            <div>
              <div className="text-purple-300 font-bold text-xs uppercase">Stun Gun</div>
              {stats.stunCooldown > 0 ? (
                <div className="text-gray-400 text-sm">{stats.stunCooldown.toFixed(1)}s</div>
              ) : (
                <div className="text-green-400 text-sm font-bold">READY</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Fuel Counter - Top Right */}
      <div className="absolute top-6 right-6">
        <div className="bg-gradient-to-br from-red-900/95 to-black/95 backdrop-blur-sm rounded-2xl p-5 shadow-2xl border-2 border-red-500/30 min-w-[200px]"
             style={{ boxShadow: '0 0 30px rgba(239, 68, 68, 0.3)' }}>
          <div className="flex items-center justify-between mb-3">
            <div className="text-red-400 font-bold text-sm tracking-wider uppercase">Fuel</div>
            <Fuel className="w-5 h-5 text-red-400" />
          </div>

          <div className="relative h-8 bg-gray-800 rounded-full overflow-hidden mb-3">
            <div 
              className="absolute inset-0 bg-gradient-to-r from-red-600 via-orange-500 to-yellow-400 transition-all duration-300"
              style={{ 
                width: `${(stats.fuel / stats.maxFuel) * 100}%`,
                boxShadow: stats.fuel > 30 ? '0 0 20px rgba(249, 115, 22, 0.8)' : 'none'
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white font-bold text-sm drop-shadow-lg">
                {Math.round(stats.fuel)}%
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-400">Refuels Left</span>
              <span className="text-white font-bold">{stats.refuelsRemaining}/3</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-400">Lives</span>
              <div className="flex gap-1">
                {[...Array(3)].map((_, i) => (
                  <Heart 
                    key={i} 
                    className={`w-4 h-4 ${i < stats.lives ? 'text-red-500 fill-red-500' : 'text-gray-600'}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Controls Help */}
      <div className="absolute bottom-6 left-6 bg-black/80 backdrop-blur-sm rounded-xl p-3 text-xs text-gray-400">
        <div>WASD / Arrows - Move</div>
        <div>SPACE - Stun Gun</div>
      </div>
    </>
  );
}