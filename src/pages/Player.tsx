import { useState } from "react";
import { Play, Pause, SkipForward, SkipBack, Volume2, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";
import Navigation from "@/components/Navigation";

const Player = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState([80]);
  const [progress, setProgress] = useState([30]);

  const songs = [
    { id: 1, title: "Neon Dreams", artist: "Cyber Waves", duration: "3:45", hiRes: true },
    { id: 2, title: "Digital Horizon", artist: "Future Sound", duration: "4:12", hiRes: true },
    { id: 3, title: "Crystal Pulse", artist: "Synth Master", duration: "3:58", hiRes: true },
    { id: 4, title: "Quantum Echo", artist: "Space Beats", duration: "5:23", hiRes: true },
  ];

  return (
    <div className="min-h-screen bg-background font-inter">
      <Navigation />
      <div className="p-6 pt-24">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold font-orbitron mb-8 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent animate-slide-up">
          Now Playing
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Player */}
          <Card className="lg:col-span-2 bg-card border-border backdrop-blur-lg overflow-hidden animate-slide-up">
            <div className="aspect-square relative bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 flex items-center justify-center">
              <div className="w-64 h-64 rounded-full border-4 border-primary animate-glow-pulse flex items-center justify-center">
                <div className="text-6xl">🎵</div>
              </div>
            </div>
            
            <div className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold font-orbitron mb-2">Neon Dreams</h2>
                  <p className="text-muted-foreground text-lg">Cyber Waves</p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                  <span className="text-xs font-semibold text-primary">Hi-Res</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2 mb-6">
                <Slider
                  value={progress}
                  onValueChange={setProgress}
                  max={100}
                  step={1}
                  className="cursor-pointer"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>1:23</span>
                  <span>3:45</span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center gap-6 mb-6">
                <Button variant="ghost" size="icon" className="hover:text-primary transition-colors">
                  <SkipBack className="w-6 h-6" />
                </Button>
                <Button 
                  size="icon"
                  className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-secondary hover:shadow-[var(--glow-primary)] transition-all"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
                </Button>
                <Button variant="ghost" size="icon" className="hover:text-primary transition-colors">
                  <SkipForward className="w-6 h-6" />
                </Button>
              </div>

              {/* Volume */}
              <div className="flex items-center gap-4">
                <Volume2 className="w-5 h-5 text-muted-foreground" />
                <Slider
                  value={volume}
                  onValueChange={setVolume}
                  max={100}
                  step={1}
                  className="flex-1"
                />
                <span className="text-sm text-muted-foreground w-12 text-right">{volume[0]}%</span>
              </div>
            </div>
          </Card>

          {/* Playlist */}
          <Card className="bg-card border-border backdrop-blur-lg p-6 animate-slide-up">
            <h3 className="text-xl font-bold font-orbitron mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-gradient-to-b from-primary to-secondary rounded-full"></span>
              Queue
            </h3>
            <div className="space-y-3">
              {songs.map((song, index) => (
                <div
                  key={song.id}
                  className={`p-4 rounded-lg transition-all cursor-pointer ${
                    index === 0
                      ? "bg-primary/10 border border-primary/30"
                      : "hover:bg-muted/50"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-semibold">{song.title}</p>
                    {song.hiRes && (
                      <span className="text-xs px-2 py-0.5 rounded bg-primary/20 text-primary border border-primary/30">
                        Hi-Res
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{song.artist}</span>
                    <span>{song.duration}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Player;
