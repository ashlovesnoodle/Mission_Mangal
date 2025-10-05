import React from 'react';
import { Button } from '@/components/ui/button';
import { Rocket } from 'lucide-react';

export default function StartScreen({ onStart }) {
  return (
    <div 
      className="w-full h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=1920&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-red-900/40 to-black/80" />
      
      <div className="relative z-10 text-center space-y-8 px-4">
        <div className="space-y-4">
          <h1 className="text-7xl md:text-9xl font-bold text-white tracking-wider animate-fade-in" 
              style={{ 
                textShadow: '0 0 30px rgba(239, 68, 68, 0.8), 0 0 60px rgba(239, 68, 68, 0.4)',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                letterSpacing: '0.1em'
              }}>
            MISSION
          </h1>
          <h1 className="text-7xl md:text-9xl font-bold text-orange-500 tracking-wider animate-fade-in" 
              style={{ 
                textShadow: '0 0 30px rgba(249, 115, 22, 0.8), 0 0 60px rgba(249, 115, 22, 0.4)',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                letterSpacing: '0.1em',
                animationDelay: '0.2s'
              }}>
            MANGAL
          </h1>
        </div>

        <p className="text-xl md:text-2xl text-gray-300 font-light tracking-wide max-w-2xl mx-auto animate-fade-in" 
           style={{ animationDelay: '0.4s' }}>
          Navigate the harsh Martian terrain, collect precious resources,
          <br />and survive the hostile environment
        </p>

        <div className="pt-8 space-y-4 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <Button 
            onClick={onStart}
            className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white text-xl px-12 py-6 rounded-full shadow-2xl transition-all duration-300 hover:scale-105"
            style={{ boxShadow: '0 0 40px rgba(239, 68, 68, 0.6)' }}
          >
            <Rocket className="w-6 h-6 mr-3" />
            Start Mission
          </Button>
          
          <div className="text-gray-400 text-sm space-y-1">
            <p>Use WASD or Arrow Keys to move</p>
            <p>Press SPACE to fire stun gun</p>
          </div>
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