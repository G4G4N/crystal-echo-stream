import { useState } from "react";
import { Play, Pause, SkipForward, SkipBack, Volume2, Heart, Repeat, Shuffle } from "lucide-react";
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
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="flex flex-col h-screen pt-20">
        {/* Main Content */}
        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Album Art & Info */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="bg-card border-border overflow-hidden">
                  <div className="aspect-square relative bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 flex items-center justify-center">
                    <div className="w-80 h-80 rounded-2xl bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center">
                      <div className="text-8xl">🎵</div>
                    </div>
                  </div>
                </Card>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-medium mb-1">Neon Dreams</h2>
                    <p className="text-muted-foreground">Cyber Waves</p>
                  </div>
                  <Button variant="ghost" size="icon">
                    <Heart className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              {/* Queue */}
              <Card className="bg-card border-border p-6">
                <h3 className="text-lg font-medium mb-4">Queue</h3>
                <div className="space-y-2">
                  {songs.map((song, index) => (
                    <div
                      key={song.id}
                      className={`p-3 rounded-lg transition-all cursor-pointer ${
                        index === 0
                          ? "bg-primary/10"
                          : "hover:bg-muted/50"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-medium text-sm">{song.title}</p>
                        {song.hiRes && (
                          <span className="text-xs px-1.5 py-0.5 rounded bg-primary/20 text-primary">
                            Hi-Res
                          </span>
                        )}
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
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

        {/* Player Controls - Bottom Fixed */}
        <div className="border-t border-border bg-card/95 backdrop-blur-lg">
          <div className="max-w-7xl mx-auto p-6">
            {/* Progress Bar */}
            <div className="mb-4">
              <Slider
                value={progress}
                onValueChange={setProgress}
                max={100}
                step={1}
                className="cursor-pointer"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>1:23</span>
                <span>3:45</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              {/* Left: Track Info */}
              <div className="flex items-center gap-3 flex-1">
                <div className="w-12 h-12 rounded bg-primary/20 flex items-center justify-center text-xl">
                  🎵
                </div>
                <div>
                  <p className="font-medium text-sm">Neon Dreams</p>
                  <p className="text-xs text-muted-foreground">Cyber Waves</p>
                </div>
              </div>

              {/* Center: Controls */}
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Shuffle className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <SkipBack className="w-5 h-5" />
                </Button>
                <Button 
                  size="icon"
                  className="w-10 h-10 rounded-full bg-primary hover:bg-primary/90"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <SkipForward className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Repeat className="w-4 h-4" />
                </Button>
              </div>

              {/* Right: Volume */}
              <div className="flex items-center gap-3 flex-1 justify-end">
                <Volume2 className="w-4 h-4 text-muted-foreground" />
                <Slider
                  value={volume}
                  onValueChange={setVolume}
                  max={100}
                  step={1}
                  className="w-24"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;
