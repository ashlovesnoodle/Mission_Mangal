import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Trophy } from 'lucide-react';

export default function EndScreen({ onCredits }) {
  const [rocketY, setRocketY] = useState(100);

  useEffect(() => {
    const interval = setInterval(() => {
      setRocketY(prev => prev - 2);
    }, 20);

    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className="w-full h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=1920&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/70" />

      {/* Animated Rocket */}
      <div 
        className="absolute left-1/2 transform -translate-x-1/2"
        style={{ 
          bottom: `${rocketY}%`,
          transition: 'bottom 0.02s linear'
        }}
      >
        <div className="relative">
          <div className="text-6xl">🚀</div>
          <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-2 h-20 bg-gradient-to-b from-orange-500 via-red-500 to-transparent blur-sm" />
        </div>
      </div>

      <div className="relative z-10 text-center space-y-8 px-4">
        <div className="space-y-4 animate-fade-in">
          <Trophy className="w-24 h-24 mx-auto text-yellow-400" style={{ filter: 'drop-shadow(0 0 20px rgba(250, 204, 21, 0.8))' }} />
          
          <h1 className="text-6xl md:text-8xl font-bold text-white tracking-wider" 
              style={{ 
                textShadow: '0 0 30px rgba(34, 197, 94, 0.8), 0 0 60px rgba(34, 197, 94, 0.4)',
                fontFamily: 'system-ui, -apple-system, sans-serif'
              }}>
            MISSION
          </h1>
          <h1 className="text-6xl md:text-8xl font-bold text-green-400 tracking-wider" 
              style={{ 
                textShadow: '0 0 30px rgba(34, 197, 94, 0.8), 0 0 60px rgba(34, 197, 94, 0.4)',
                fontFamily: 'system-ui, -apple-system, sans-serif'
              }}>
            COMPLETE!
          </h1>
        </div>

        <p className="text-2xl md:text-3xl text-gray-300 font-light tracking-wide max-w-2xl mx-auto animate-fade-in" 
           style={{ animationDelay: '0.3s' }}>
          All resources collected successfully!
          <br />
          Returning to Earth...
        </p>

        <div className="pt-8 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <Button 
            onClick={onCredits}
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white text-xl px-12 py-6 rounded-full shadow-2xl transition-all duration-300 hover:scale-105"
            style={{ boxShadow: '0 0 40px rgba(34, 197, 94, 0.6)' }}
          >
            View Credits
          </Button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}