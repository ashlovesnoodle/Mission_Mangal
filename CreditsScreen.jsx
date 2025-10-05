import React from 'react';
import { Button } from '@/components/ui/button';
import { RotateCcw, Users } from 'lucide-react';

export default function CreditsScreen({ onRestart }) {
  const teamMembers = [
    'Amogh Srivastava(@amogh_sriv)',
    'Aditya Vikram Singh(@Dekatsoo)',
    'Srishti Singh(@srishti._.stil)',
    'Aishwary Pratap Singh(@ashlovesnoodle)'
  ];

  return (
    <div 
      className="w-full h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=1920&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80" />
      
      <div className="relative z-10 text-center space-y-12 px-4 max-w-4xl mx-auto">
        <div className="space-y-4 animate-fade-in">
          <Users className="w-20 h-20 mx-auto text-orange-400" 
                 style={{ filter: 'drop-shadow(0 0 20px rgba(251, 146, 60, 0.8))' }} />
          
          <h1 className="text-5xl md:text-7xl font-bold text-white tracking-wider" 
              style={{ 
                textShadow: '0 0 30px rgba(251, 146, 60, 0.8), 0 0 60px rgba(251, 146, 60, 0.4)',
                fontFamily: 'system-ui, -apple-system, sans-serif'
              }}>
            CREDITS
          </h1>
        </div>

        <div className="space-y-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="text-2xl text-orange-400 font-semibold tracking-wide mb-4">
            Made By
          </div>
          
          <div className="space-y-3">
            {teamMembers.map((member, index) => (
              <div 
                key={member}
                className="text-xl md:text-2xl text-gray-300 font-light tracking-wide animate-fade-in bg-white/5 backdrop-blur-sm py-3 px-6 rounded-lg border border-white/10"
                style={{ animationDelay: `${0.3 + index * 0.1}s` }}
              >
                {member}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4 pt-8 animate-fade-in" style={{ animationDelay: '0.9s' }}>
          <p className="text-lg text-gray-400 italic">
            "One small step for a rover, one giant leap for resource collection"
          </p>
          
          <Button 
            onClick={onRestart}
            className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white text-lg px-10 py-5 rounded-full shadow-2xl transition-all duration-300 hover:scale-105"
            style={{ boxShadow: '0 0 40px rgba(249, 115, 22, 0.6)' }}
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Play Again
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