import React, { useEffect, useRef, useState } from 'react';
import GameUI from './GameUI';

export default function GameCanvas({ onGameEnd }) {
  const canvasRef = useRef(null);
  const gameLoopRef = useRef(null);
  const [gameStats, setGameStats] = useState({
    fuel: 100,
    maxFuel: 100,
    lives: 3,
    oreCount: 0,
    waterCount: 0,
    oresInInventory: 0,
    waterInInventory: 0,
    refuelsRemaining: 3,
    stunCooldown: 0
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Game state
    const game = {
      rover: {
        x: 100,
        y: 100,
        width: 40,
        height: 40,
        speed: 3,
        angle: 0,
        fuel: 100,
        maxFuel: 100,
        lives: 3,
        oresInInventory: 0,
        waterInInventory: 0,
        invulnerable: false,
        stunned: false
      },
      base: {
        x: 100,
        y: 100,
        width: 80,
        height: 80,
        oreCount: 0,
        waterCount: 0,
        refuelsRemaining: 3
      },
      ores: [],
      puddles: [],
      creatures: [],
      stunGun: {
        cooldown: 0,
        maxCooldown: 7000,
        stunDuration: 15000
      },
      keys: {},
      camera: { x: 0, y: 0 },
      mapSize: 3000
    };

    // Initialize ores (9 total in 3 colors)
    const oreColors = ['#FFD700', '#C0C0C0', '#CD7F32'];
    for (let i = 0; i < 9; i++) {
      game.ores.push({
        x: Math.random() * (game.mapSize - 200) + 100,
        y: Math.random() * (game.mapSize - 200) + 100,
        width: 30,
        height: 30,
        color: oreColors[i % 3],
        collected: false
      });
    }

    // Initialize puddles (6 puddles with 2 samples each = 12 total, but we need 9)
    for (let i = 0; i < 6; i++) {
      game.puddles.push({
        x: Math.random() * (game.mapSize - 200) + 100,
        y: Math.random() * (game.mapSize - 200) + 100,
        width: 60,
        height: 60,
        samples: 2,
        totalSamples: 2
      });
    }

    // Initialize creatures
    for (let i = 0; i < 3; i++) {
      game.creatures.push({
        x: Math.random() * (game.mapSize - 400) + 200,
        y: Math.random() * (game.mapSize - 400) + 200,
        width: 35,
        height: 35,
        speed: 1.5,
        angle: Math.random() * Math.PI * 2,
        stunned: false,
        stunTimer: 0
      });
    }

    // Keyboard controls
    const handleKeyDown = (e) => {
      game.keys[e.key.toLowerCase()] = true;
      if (e.key === ' ' && game.stunGun.cooldown <= 0 && !game.rover.stunned) {
        fireStunGun();
      }
    };

    const handleKeyUp = (e) => {
      game.keys[e.key.toLowerCase()] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // Fire stun gun
    const fireStunGun = () => {
      game.stunGun.cooldown = game.stunGun.maxCooldown;
      
      // Find nearest creature
      let nearestCreature = null;
      let minDist = 200; // Max range
      
      game.creatures.forEach(creature => {
        if (!creature.stunned) {
          const dist = Math.hypot(
            creature.x - game.rover.x,
            creature.y - game.rover.y
          );
          if (dist < minDist) {
            minDist = dist;
            nearestCreature = creature;
          }
        }
      });

      if (nearestCreature) {
        nearestCreature.stunned = true;
        nearestCreature.stunTimer = game.stunGun.stunDuration;
      }
    };

    // Check collision
    const checkCollision = (obj1, obj2) => {
      return obj1.x < obj2.x + obj2.width &&
             obj1.x + obj1.width > obj2.x &&
             obj1.y < obj2.y + obj2.height &&
             obj1.y + obj1.height > obj2.y;
    };

    // Game loop
    const lastPos = { x: game.rover.x, y: game.rover.y };
    
    const gameLoop = (timestamp) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update camera
      game.camera.x = game.rover.x - canvas.width / 2;
      game.camera.y = game.rover.y - canvas.height / 2;

      // Draw Mars terrain
      ctx.fillStyle = '#8B4513';
      ctx.fillRect(-game.camera.x, -game.camera.y, game.mapSize, game.mapSize);
      
      // Draw terrain texture
      ctx.fillStyle = 'rgba(139, 69, 19, 0.3)';
      for (let i = 0; i < 100; i++) {
        const x = (i * 234) % game.mapSize;
        const y = (i * 567) % game.mapSize;
        ctx.fillRect(x - game.camera.x, y - game.camera.y, 50, 50);
      }

      // Move rover if not stunned
      if (!game.rover.stunned) {
        let moved = false;
        const oldX = game.rover.x;
        const oldY = game.rover.y;

        if ((game.keys['w'] || game.keys['arrowup']) && game.rover.fuel > 0) {
          game.rover.y -= game.rover.speed;
          game.rover.angle = -Math.PI / 2;
          moved = true;
        }
        if ((game.keys['s'] || game.keys['arrowdown']) && game.rover.fuel > 0) {
          game.rover.y += game.rover.speed;
          game.rover.angle = Math.PI / 2;
          moved = true;
        }
        if ((game.keys['a'] || game.keys['arrowleft']) && game.rover.fuel > 0) {
          game.rover.x -= game.rover.speed;
          game.rover.angle = Math.PI;
          moved = true;
        }
        if ((game.keys['d'] || game.keys['arrowright']) && game.rover.fuel > 0) {
          game.rover.x += game.rover.speed;
          game.rover.angle = 0;
          moved = true;
        }

        // Decrease fuel based on distance moved
        if (moved) {
          const distance = Math.hypot(game.rover.x - oldX, game.rover.y - oldY);
          game.rover.fuel -= distance * 0.02;
          if (game.rover.fuel < 0) game.rover.fuel = 0;
        }

        // Keep rover in bounds
        game.rover.x = Math.max(0, Math.min(game.mapSize - game.rover.width, game.rover.x));
        game.rover.y = Math.max(0, Math.min(game.mapSize - game.rover.height, game.rover.y));
      }

      // Update creatures
      game.creatures.forEach(creature => {
        if (creature.stunned) {
          creature.stunTimer -= 16;
          if (creature.stunTimer <= 0) {
            creature.stunned = false;
          }
        } else {
          // Move towards rover
          const dx = game.rover.x - creature.x;
          const dy = game.rover.y - creature.y;
          const dist = Math.hypot(dx, dy);
          
          if (dist > 0) {
            creature.x += (dx / dist) * creature.speed;
            creature.y += (dy / dist) * creature.speed;
            creature.angle = Math.atan2(dy, dx);
          }

          // Check collision with rover
          if (checkCollision(creature, game.rover) && !game.rover.invulnerable && !game.rover.stunned) {
            game.rover.lives--;
            game.rover.stunned = true;
            if (game.rover.lives <= 0) {
              alert('Mission Failed! All lives lost.');
              window.location.reload();
            } else {
              setTimeout(() => {
                game.rover.stunned = false;
                game.rover.invulnerable = true;
                setTimeout(() => {
                  game.rover.invulnerable = false;
                }, 2000);
              }, 100);
            }
          }
        }
      });

      // Check base collision
      if (checkCollision(game.rover, game.base)) {
        // Deposit resources
        if (game.rover.oresInInventory > 0) {
          game.base.oreCount += game.rover.oresInInventory;
          game.rover.oresInInventory = 0;
        }
        if (game.rover.waterInInventory > 0) {
          game.base.waterCount += game.rover.waterInInventory;
          game.rover.waterInInventory = 0;
        }
        
        // Refuel
        if (game.base.refuelsRemaining > 0 && game.rover.fuel < game.rover.maxFuel * 0.9) {
          game.rover.fuel = game.rover.maxFuel;
          game.base.refuelsRemaining--;
        }

        // Check win condition
        if (game.base.oreCount >= 9 && game.base.waterCount >= 9) {
          onGameEnd();
        }
      }

      // Check ore collection
      game.ores.forEach(ore => {
        if (!ore.collected && checkCollision(game.rover, ore) && game.rover.oresInInventory < 2) {
          ore.collected = true;
          game.rover.oresInInventory++;
        }
      });

      // Check water collection
      game.puddles.forEach(puddle => {
        if (puddle.samples > 0 && checkCollision(game.rover, puddle) && game.rover.waterInInventory < 2) {
          puddle.samples--;
          game.rover.waterInInventory++;
        }
      });

      // Update cooldowns
      if (game.stunGun.cooldown > 0) {
        game.stunGun.cooldown -= 16;
      }

      // Draw base
      ctx.save();
      ctx.translate(game.base.x - game.camera.x + game.base.width / 2, game.base.y - game.camera.y + game.base.height / 2);
      
      ctx.fillStyle = '#2C3E50';
      ctx.fillRect(-game.base.width / 2, -game.base.height / 2, game.base.width, game.base.height);
      ctx.fillStyle = '#3498DB';
      ctx.fillRect(-game.base.width / 2 + 5, -game.base.height / 2 + 5, game.base.width - 10, game.base.height - 10);
      
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 12px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('BASE', 0, -5);
      ctx.font = '10px Arial';
      ctx.fillText(`O:${game.base.oreCount}/9`, 0, 8);
      ctx.fillText(`W:${game.base.waterCount}/9`, 0, 20);
      
      ctx.restore();

      // Draw ores
      game.ores.forEach(ore => {
        if (!ore.collected) {
          ctx.fillStyle = ore.color;
          ctx.beginPath();
          ctx.arc(ore.x - game.camera.x + ore.width / 2, ore.y - game.camera.y + ore.height / 2, ore.width / 2, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = '#000';
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      });

      // Draw puddles
      game.puddles.forEach(puddle => {
        if (puddle.samples > 0) {
          ctx.fillStyle = 'rgba(100, 150, 255, 0.6)';
          ctx.beginPath();
          ctx.ellipse(
            puddle.x - game.camera.x + puddle.width / 2,
            puddle.y - game.camera.y + puddle.height / 2,
            puddle.width / 2,
            puddle.height / 3,
            0, 0, Math.PI * 2
          );
          ctx.fill();
          
          ctx.fillStyle = '#fff';
          ctx.font = 'bold 12px Arial';
          ctx.textAlign = 'center';
          ctx.fillText(puddle.samples, puddle.x - game.camera.x + puddle.width / 2, puddle.y - game.camera.y + puddle.height / 2 + 5);
        }
      });

      // Draw creatures
      game.creatures.forEach(creature => {
        ctx.save();
        ctx.translate(creature.x - game.camera.x + creature.width / 2, creature.y - game.camera.y + creature.height / 2);
        ctx.rotate(creature.angle);
        
        if (creature.stunned) {
          ctx.fillStyle = '#666';
          ctx.globalAlpha = 0.5;
        } else {
          ctx.fillStyle = '#8B0000';
        }
        
        // Creature body
        ctx.fillRect(-creature.width / 2, -creature.height / 2, creature.width, creature.height);
        
        // Eyes
        ctx.fillStyle = creature.stunned ? '#fff' : '#FFFF00';
        ctx.fillRect(-10, -5, 8, 8);
        ctx.fillRect(2, -5, 8, 8);
        
        ctx.restore();
      });

      // Draw rover
      ctx.save();
      ctx.translate(game.rover.x - game.camera.x + game.rover.width / 2, game.rover.y - game.camera.y + game.rover.height / 2);
      ctx.rotate(game.rover.angle);
      
      if (game.rover.invulnerable) {
        ctx.globalAlpha = 0.5 + Math.sin(timestamp / 100) * 0.3;
      }
      
      ctx.fillStyle = game.rover.stunned ? '#666' : '#E74C3C';
      ctx.fillRect(-game.rover.width / 2, -game.rover.height / 2, game.rover.width, game.rover.height);
      
      ctx.fillStyle = '#34495E';
      ctx.fillRect(-game.rover.width / 2 - 5, -game.rover.height / 2 + 5, 5, 8);
      ctx.fillRect(-game.rover.width / 2 - 5, game.rover.height / 2 - 13, 5, 8);
      ctx.fillRect(game.rover.width / 2, -game.rover.height / 2 + 5, 5, 8);
      ctx.fillRect(game.rover.width / 2, game.rover.height / 2 - 13, 5, 8);
      
      ctx.restore();

      // Update React state
      setGameStats({
        fuel: game.rover.fuel,
        maxFuel: game.rover.maxFuel,
        lives: game.rover.lives,
        oreCount: game.base.oreCount,
        waterCount: game.base.waterCount,
        oresInInventory: game.rover.oresInInventory,
        waterInInventory: game.rover.waterInInventory,
        refuelsRemaining: game.base.refuelsRemaining,
        stunCooldown: Math.max(0, game.stunGun.cooldown / 1000)
      });

      gameLoopRef.current = requestAnimationFrame(gameLoop);
    };

    gameLoopRef.current = requestAnimationFrame(gameLoop);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [onGameEnd]);

  return (
    <div className="relative w-full h-screen bg-black">
      <canvas ref={canvasRef} className="w-full h-full" />
      <GameUI stats={gameStats} />
    </div>
  );
}