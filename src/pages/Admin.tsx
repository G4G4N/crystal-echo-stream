import { useState } from "react";
import { Upload, Music, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const Admin = () => {
  const [s3Bucket, setS3Bucket] = useState("");
  const [s3Key, setS3Key] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleImport = async () => {
    if (!s3Bucket || !s3Key) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    // Simulate import process
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Song imported successfully!");
      setS3Bucket("");
      setS3Key("");
    }, 2000);
  };

  const recentImports = [
    { id: 1, title: "Neon Dreams", artist: "Cyber Waves", status: "success", date: "2 hours ago" },
    { id: 2, title: "Digital Horizon", artist: "Future Sound", status: "success", date: "5 hours ago" },
    { id: 3, title: "Crystal Pulse", artist: "Synth Master", status: "success", date: "1 day ago" },
  ];

  return (
    <div className="min-h-screen bg-background p-6 font-inter">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 animate-slide-up">
          <h1 className="text-5xl font-bold font-orbitron mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Admin Panel
          </h1>
          <p className="text-muted-foreground text-lg">Import and manage your Hi-Res music library</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Import Form */}
          <Card className="bg-card border-border backdrop-blur-lg p-8 animate-slide-up">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Upload className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold font-orbitron">Import from AWS S3</h2>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="bucket" className="text-sm font-semibold">S3 Bucket Name</Label>
                <Input
                  id="bucket"
                  placeholder="my-music-bucket"
                  value={s3Bucket}
                  onChange={(e) => setS3Bucket(e.target.value)}
                  className="bg-background border-border focus:border-primary transition-colors"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="key" className="text-sm font-semibold">S3 Object Key</Label>
                <Input
                  id="key"
                  placeholder="songs/track-name.flac"
                  value={s3Key}
                  onChange={(e) => setS3Key(e.target.value)}
                  className="bg-background border-border focus:border-primary transition-colors"
                />
              </div>

              <Button
                onClick={handleImport}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-primary to-secondary hover:shadow-[var(--glow-primary)] transition-all font-semibold"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-t-transparent border-current rounded-full animate-spin"></div>
                    Importing...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Upload className="w-4 h-4" />
                    Import Song
                  </span>
                )}
              </Button>

              <div className="pt-6 border-t border-border">
                <h3 className="text-sm font-semibold mb-3 text-muted-foreground">Supported Formats</h3>
                <div className="flex flex-wrap gap-2">
                  {["FLAC", "WAV", "ALAC", "DSD"].map((format) => (
                    <span
                      key={format}
                      className="px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-xs font-semibold text-primary"
                    >
                      {format}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Recent Imports */}
          <Card className="bg-card border-border backdrop-blur-lg p-8 animate-slide-up">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-secondary to-accent flex items-center justify-center">
                <Music className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold font-orbitron">Recent Imports</h2>
            </div>

            <div className="space-y-4">
              {recentImports.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-lg bg-muted/30 border border-border hover:border-primary/30 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <p className="font-semibold">{item.title}</p>
                      <p className="text-sm text-muted-foreground">{item.artist}</p>
                    </div>
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-xs text-muted-foreground">{item.date}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 rounded-lg bg-primary/5 border border-primary/20">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                <p className="text-sm font-semibold text-primary">Total Library</p>
              </div>
              <p className="text-3xl font-bold font-orbitron">247</p>
              <p className="text-sm text-muted-foreground">Hi-Res tracks available</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Admin;
