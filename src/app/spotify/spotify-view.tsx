"use client";

import React, { useState, useRef, useMemo, useCallback, memo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Music2,
  Headphones,
  ExternalLink,
  Copy,
  Check,
  Play,
  Code2,
  Volume2,
  Sparkles,
  Maximize2,
  Minimize2,
  Search,
  Share2,
  Heart,
  SkipBack,
  SkipForward,
  Radio,
  SlidersHorizontal,
  Disc,
} from "lucide-react";
import { SiSpotify } from "react-icons/si";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  SPOTIFY_USER,
  USER_PLAYLISTS,
  type SpotifyPlaylist,
} from "@/data/spotify-playlists";

const CATEGORIES = [
  "All",
  "Classics & Vibes",
  "Relax & Peace",
  "Retro & Vintage",
  "Favorites",
  "Midnight Vibes",
  "Throwback",
  "Soul & Memories",
  "Special",
];

// Lightweight CSS Equalizer Bars
const EqualizerWave = memo(({ count = 10 }: { count?: number }) => {
  const classes = ["animate-eq-1", "animate-eq-2", "animate-eq-3", "animate-eq-4"];
  return (
    <div className="flex items-end gap-1.5 h-6 px-1">
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className={`w-1 rounded-full bg-gradient-to-t from-[#1DB954] to-emerald-300 shadow-[0_0_8px_rgba(29,185,84,0.6)] ${classes[i % classes.length]}`}
        />
      ))}
    </div>
  );
});
EqualizerWave.displayName = "EqualizerWave";

export default function SpotifyView() {
  const [selectedPlaylist, setSelectedPlaylist] = useState<SpotifyPlaylist>(USER_PLAYLISTS[0]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [isCompact, setIsCompact] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [modalPlaylist, setModalPlaylist] = useState<SpotifyPlaylist | null>(null);
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});

  const playerRef = useRef<HTMLDivElement>(null);

  const handleSelectPlaylist = useCallback((playlist: SpotifyPlaylist) => {
    setSelectedPlaylist(playlist);
    playerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const currentIndex = useMemo(() => {
    return USER_PLAYLISTS.findIndex((p) => p.id === selectedPlaylist.id);
  }, [selectedPlaylist]);

  const handleNextPlaylist = () => {
    const nextIdx = (currentIndex + 1) % USER_PLAYLISTS.length;
    handleSelectPlaylist(USER_PLAYLISTS[nextIdx]);
  };

  const handlePrevPlaylist = () => {
    const prevIdx = (currentIndex - 1 + USER_PLAYLISTS.length) % USER_PLAYLISTS.length;
    handleSelectPlaylist(USER_PLAYLISTS[prevIdx]);
  };

  const toggleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredPlaylists = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return USER_PLAYLISTS.filter((p) => {
      const matchesCategory =
        activeCategory === "All" || p.category.toLowerCase() === activeCategory.toLowerCase();
      const matchesSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.vibe.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const copyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="min-h-screen font-sans bg-[#090a0f] text-zinc-100 relative overflow-hidden selection:bg-[#1DB954]/30 selection:text-white">
      {/* Background Ambient Glows */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none transform-gpu will-change-transform">
        <div className="absolute top-0 left-1/3 w-[650px] h-[650px] rounded-full bg-[#1DB954]/12 blur-[140px] opacity-60" />
        <div className="absolute bottom-1/4 right-10 w-[500px] h-[500px] rounded-full bg-emerald-700/10 blur-[150px] opacity-40" />
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] [background-size:28px_28px] opacity-40" />
      </div>

      <div className="container mx-auto px-4 pt-28 md:pt-36 pb-36 max-w-6xl">
        {/* Navigation Bar */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/"
            className="px-4 py-2 rounded-full inline-flex items-center gap-2 text-xs font-semibold text-zinc-300 hover:text-white bg-zinc-900/90 hover:bg-zinc-800 border border-white/10 backdrop-blur-md transition-all group"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1 text-[#1DB954]" />
            Back to Portfolio
          </Link>

          <div className="flex items-center gap-2.5">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => copyText(SPOTIFY_USER.profileUrl, "profile")}
              className="rounded-full text-xs gap-1.5 text-zinc-300 hover:text-white bg-zinc-900/70 hover:bg-zinc-800 border border-white/10"
            >
              {copiedId === "profile" ? (
                <>
                  <Check className="h-3.5 w-3.5 text-[#1DB954]" />
                  Copied!
                </>
              ) : (
                <>
                  <Share2 className="h-3.5 w-3.5" />
                  Share Profile
                </>
              )}
            </Button>

            <a
              href={SPOTIFY_USER.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center"
            >
              <Button
                size="sm"
                className="rounded-full bg-[#1DB954] hover:bg-[#1ed760] text-black font-bold text-xs gap-1.5 shadow-[0_4px_16px_rgba(29,185,84,0.3)] transition-all hover:scale-[1.02]"
              >
                <SiSpotify className="h-4 w-4" />
                Spotify Profile
                <ExternalLink className="h-3 w-3" />
              </Button>
            </a>
          </div>
        </div>

        {/* Clean Studio Header */}
        <div className="mb-10 p-6 md:p-8 rounded-3xl bg-zinc-900/40 border border-white/10 backdrop-blur-xl relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 relative z-10">
            {/* Avatar Frame */}
            <div className="relative shrink-0">
              <div className="h-20 w-20 md:h-24 md:w-24 rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-black">
                <Image
                  src={SPOTIFY_USER.avatar}
                  alt={SPOTIFY_USER.name}
                  fill
                  sizes="96px"
                  className="object-cover"
                  unoptimized
                  priority
                />
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center sm:text-left">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-2">
                <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider text-[#1DB954] bg-[#1DB954]/10 border border-[#1DB954]/25">
                  AUDIO VAULT
                </span>
                <span className="px-3 py-1 rounded-full text-[11px] text-zinc-400 bg-white/5 border border-white/10 font-mono">
                  {USER_PLAYLISTS.length} Soundtracks
                </span>
                <span className="px-3 py-1 rounded-full text-[11px] text-zinc-400 bg-white/5 border border-white/10 hidden sm:inline-flex items-center gap-1 font-mono">
                  <Radio className="h-3 w-3 text-[#1DB954]" />
                  Curated Flow
                </span>
              </div>

              <h1 className="font-display text-2xl md:text-3xl font-extrabold tracking-tight text-white">
                Soundtracks &amp; Research Flow
              </h1>

              <p className="mt-2 text-xs md:text-sm text-zinc-400 max-w-xl leading-relaxed">
                Handpicked audio frequencies and albums powering deep focus, incident response, reverse engineering, and creative coding.
              </p>
            </div>

            {/* Studio Equalizer Widget */}
            <div className="hidden lg:flex flex-col items-center justify-center p-4 rounded-2xl bg-zinc-950/80 border border-white/10 min-w-[140px]">
              <EqualizerWave count={10} />
              <span className="text-[10px] font-mono mt-2 flex items-center gap-1 font-semibold uppercase tracking-wider text-[#1DB954]">
                <Volume2 className="h-3 w-3" />
                Live Deck
              </span>
            </div>
          </div>
        </div>

        {/* Master Studio Player Deck */}
        <div ref={playerRef} className="scroll-mt-32 mb-12">
          <div className="rounded-3xl p-5 md:p-7 bg-zinc-950/80 border border-white/15 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
            {/* Specular Accent Line */}
            <div className="absolute top-0 left-12 right-12 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

            {/* Deck Header Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10 mb-5">
              <div className="flex items-center gap-3.5">
                <div className="p-3 rounded-2xl bg-[#1DB954]/10 text-[#1DB954] border border-[#1DB954]/25">
                  <Music2 className="h-5 w-5" />
                </div>

                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-[#1DB954]">
                      ACTIVE DECK:
                    </span>
                    <h2 className="font-display font-bold text-lg md:text-xl text-white">
                      {selectedPlaylist.title}
                    </h2>
                    {selectedPlaylist.badge && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold text-[#1DB954] bg-[#1DB954]/10 border border-[#1DB954]/20">
                        {selectedPlaylist.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    {selectedPlaylist.category} • <span className="text-[#1DB954]">{selectedPlaylist.vibe}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end md:self-auto flex-wrap">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsCompact(!isCompact)}
                  className="rounded-full text-xs text-zinc-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 gap-1.5"
                  title={isCompact ? "Expand to view tracklist" : "Switch to compact mini player"}
                >
                  {isCompact ? (
                    <>
                      <Maximize2 className="h-3.5 w-3.5 text-[#1DB954]" />
                      Full Deck (352px)
                    </>
                  ) : (
                    <>
                      <Minimize2 className="h-3.5 w-3.5 text-[#1DB954]" />
                      Compact Deck (152px)
                    </>
                  )}
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setModalPlaylist(selectedPlaylist)}
                  className="rounded-full text-xs gap-1.5 border-white/15 bg-white/5 hover:bg-white/10 text-zinc-200"
                >
                  <Code2 className="h-3.5 w-3.5 text-[#1DB954]" />
                  Embed
                </Button>

                <a
                  href={selectedPlaylist.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    size="sm"
                    className="rounded-full bg-[#1DB954] hover:bg-[#1ed760] text-black font-semibold text-xs gap-1.5 shadow-md shadow-[#1DB954]/20"
                  >
                    <SiSpotify className="h-3.5 w-3.5" />
                    Open App
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                </a>
              </div>
            </div>

            {/* Seamless Embed Container */}
            <div className="relative overflow-hidden rounded-2xl bg-[#121212] border border-white/10 shadow-xl">
              <iframe
                key={selectedPlaylist.id + (isCompact ? "-cmp" : "-full")}
                data-testid="embed-iframe"
                style={{ borderRadius: "12px", border: "none", display: "block" }}
                src={selectedPlaylist.embedSrc}
                width="100%"
                height={isCompact ? "152" : "352"}
                frameBorder="0"
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                title={selectedPlaylist.title}
                className="w-full bg-[#121212]"
              />
            </div>

            {/* Deck Bottom Bar */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-zinc-400">
              <div className="flex items-center gap-2">
                <span className="text-zinc-500 font-mono text-[11px]">ABOUT PLAYLIST:</span>
                <span className="text-zinc-300 text-[11px]">
                  {selectedPlaylist.description}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => copyText(selectedPlaylist.url, selectedPlaylist.id)}
                  className="px-3 py-1 rounded-full text-zinc-400 hover:text-[#1DB954] transition-colors flex items-center gap-1.5 text-[11px] bg-white/5 hover:bg-white/10 border border-white/10"
                >
                  {copiedId === selectedPlaylist.id ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-[#1DB954]" /> Link Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" /> Copy Link
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Collection Browser */}
        <div className="mb-6 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Disc className="h-5 w-5 text-[#1DB954]" />
                <h2 className="font-display text-xl md:text-2xl font-bold tracking-tight text-white">
                  Curated Catalog
                </h2>
              </div>
              <p className="text-zinc-400 text-xs">
                Select any playlist below to load it into the master audio deck.
              </p>
            </div>

            <div className="relative w-full md:w-72">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
              <input
                type="text"
                placeholder="Search tracks, vibes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full bg-zinc-900/80 border border-white/10 pl-10 pr-4 py-2 text-xs text-white placeholder:text-zinc-500 focus:border-[#1DB954] focus:outline-none transition-all shadow-md"
              />
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory.toLowerCase() === cat.toLowerCase();
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 ${
                    isActive
                      ? "bg-[#1DB954] text-black font-semibold shadow-[0_2px_12px_rgba(29,185,84,0.3)]"
                      : "bg-zinc-900/70 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-white/5"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Playlist Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {filteredPlaylists.map((playlist, idx) => {
            const isCurrent = selectedPlaylist.id === playlist.id;
            const isLiked = !!likedMap[playlist.id];

            return (
              <div
                key={playlist.id}
                onClick={() => handleSelectPlaylist(playlist)}
                className={`group relative flex flex-col justify-between rounded-2xl p-5 cursor-pointer transition-all duration-300 bg-zinc-900/40 border backdrop-blur-md ${
                  isCurrent
                    ? "border-[#1DB954] ring-1 ring-[#1DB954]/50 bg-zinc-900/80 shadow-[0_15px_30px_rgba(29,185,84,0.15)]"
                    : "border-white/10 hover:border-white/20 hover:bg-zinc-900/70"
                }`}
              >
                <div>
                  <div className="flex items-start gap-3.5 mb-3.5">
                    {/* Album Thumbnail */}
                    <div className="relative h-16 w-16 shrink-0 rounded-xl overflow-hidden border border-white/15 bg-black shadow-md group-hover:scale-105 transition-transform duration-300">
                      <Image
                        src={playlist.image}
                        alt={playlist.title}
                        fill
                        sizes="64px"
                        className="object-cover"
                        unoptimized
                      />
                      {isCurrent && (
                        <div className="absolute inset-0 bg-[#1DB954]/30 backdrop-blur-[1px] flex items-center justify-center">
                          <span className="h-3 w-3 rounded-full bg-[#1DB954] animate-ping" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-0.5">
                        <span className="text-[10px] font-mono font-bold text-[#1DB954] uppercase tracking-wider truncate">
                          {playlist.category}
                        </span>
                        <button
                          onClick={(e) => toggleLike(playlist.id, e)}
                          className="text-zinc-500 hover:text-rose-400 transition-colors p-1"
                          title="Favorite"
                        >
                          <Heart
                            className={`h-3.5 w-3.5 transition-transform group-hover:scale-110 ${
                              isLiked ? "fill-rose-500 text-rose-500" : ""
                            }`}
                          />
                        </button>
                      </div>

                      <h3 className="font-display font-bold text-sm text-white leading-snug line-clamp-1 group-hover:text-[#1DB954] transition-colors">
                        {playlist.title}
                      </h3>

                      <span className="inline-block mt-0.5 text-[11px] text-zinc-400 line-clamp-1 font-mono">
                        {playlist.vibe}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed mb-4">
                    {playlist.description}
                  </p>
                </div>

                {/* Card Action Controls */}
                <div className="pt-3 border-t border-white/5 flex items-center justify-between gap-2">
                  <Button
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectPlaylist(playlist);
                    }}
                    className={`rounded-full text-xs gap-1.5 flex-1 font-medium transition-all ${
                      isCurrent
                        ? "bg-[#1DB954] text-black font-semibold shadow-md shadow-[#1DB954]/30"
                        : "bg-white/5 hover:bg-[#1DB954] hover:text-black text-zinc-300 border border-white/10"
                    }`}
                  >
                    <Play className="h-3 w-3 fill-current" />
                    <span>{isCurrent ? "Now Loaded" : "Play Deck"}</span>
                  </Button>

                  <a
                    href={playlist.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    title="Open on Spotify"
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      className="rounded-full text-zinc-400 hover:text-[#1DB954] px-2.5 bg-white/5 hover:bg-white/10 border border-white/10"
                    >
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {filteredPlaylists.length === 0 && (
          <div className="text-center py-14 rounded-2xl bg-zinc-950/60 border border-dashed border-white/15 mb-16">
            <Disc className="h-8 w-8 text-zinc-500 mx-auto mb-2 opacity-50" />
            <p className="text-zinc-400 text-xs">
              No playlists found matching &ldquo;{searchQuery}&rdquo;.
            </p>
          </div>
        )}

        {/* Acoustic Flow & Profile Specs */}
        <div className="mb-14">
          <div className="rounded-3xl p-6 md:p-7 bg-zinc-900/30 border border-white/10 backdrop-blur-xl">
            <h2 className="font-display text-base md:text-lg font-bold mb-5 flex items-center gap-2 text-white">
              <Headphones className="h-4 w-4 text-[#1DB954]" />
              Acoustic Profile &amp; Research Specs
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                <span className="text-[10px] font-bold text-[#1DB954] uppercase tracking-wider block mb-1 font-mono">
                  Focus Window
                </span>
                <span className="font-display font-bold text-base text-white">4 – 6 Hours</span>
                <p className="text-[11px] text-zinc-400 mt-0.5">Deep coding &amp; forensics</p>
              </div>

              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                <span className="text-[10px] font-bold text-[#1DB954] uppercase tracking-wider block mb-1 font-mono">
                  Cadence
                </span>
                <span className="font-display font-bold text-base text-white">80 – 140 BPM</span>
                <p className="text-[11px] text-zinc-400 mt-0.5">Acoustic flow to synthwave</p>
              </div>

              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                <span className="text-[10px] font-bold text-[#1DB954] uppercase tracking-wider block mb-1 font-mono">
                  Top Genres
                </span>
                <span className="font-display font-bold text-base text-white">Melodic &amp; Retro</span>
                <p className="text-[11px] text-zinc-400 mt-0.5">Golden era, pop, synth</p>
              </div>

              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                <span className="text-[10px] font-bold text-[#1DB954] uppercase tracking-wider block mb-1 font-mono">
                  Environment
                </span>
                <span className="font-display font-bold text-base text-white">Threat Lab</span>
                <p className="text-[11px] text-zinc-400 mt-0.5">SIEM, reversing &amp; analysis</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Connect Card */}
        <div className="text-center p-7 md:p-8 rounded-3xl bg-zinc-950/80 border border-white/10">
          <SiSpotify className="h-10 w-10 text-[#1DB954] mx-auto mb-3 drop-shadow-[0_0_15px_rgba(29,185,84,0.4)]" />
          <h3 className="font-display text-xl font-bold mb-1.5 text-white">Connect &amp; Exchange Tracks</h3>
          <p className="text-zinc-400 text-xs max-w-sm mx-auto mb-5 leading-relaxed">
            Have a playlist recommendation or coding soundtrack? Let&apos;s exchange music.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a href={SPOTIFY_USER.profileUrl} target="_blank" rel="noopener noreferrer">
              <Button className="rounded-full bg-[#1DB954] hover:bg-[#1ed760] text-black font-semibold text-xs px-5 shadow-lg shadow-[#1DB954]/25">
                <SiSpotify className="h-4 w-4 mr-1.5" />
                Spotify Profile
              </Button>
            </a>
            <Link href="/#contact">
              <Button variant="outline" className="rounded-full text-xs px-5 border-white/15 bg-white/5 text-zinc-300 hover:text-white">
                Send Recommendation
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Floating Dynamic Island Mini Player Dock */}
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 max-w-md w-[92%] sm:w-auto">
        <div className="rounded-full px-3.5 py-2 flex items-center justify-between gap-3 shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-white/20 bg-zinc-950/95 backdrop-blur-2xl">
          <div
            className="flex items-center gap-2.5 min-w-0 cursor-pointer"
            onClick={() => playerRef.current?.scrollIntoView({ behavior: "smooth" })}
          >
            <div className="relative h-8 w-8 rounded-full overflow-hidden shrink-0 border border-[#1DB954] shadow-sm">
              <Image
                src={selectedPlaylist.image}
                alt={selectedPlaylist.title}
                fill
                sizes="32px"
                className="object-cover"
                unoptimized
              />
            </div>

            <div className="min-w-0 max-w-[120px] sm:max-w-[160px] truncate">
              <p className="text-xs font-bold text-white truncate flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#1DB954] animate-ping shrink-0" />
                {selectedPlaylist.title}
              </p>
              <p className="text-[9px] text-zinc-400 truncate">{selectedPlaylist.vibe}</p>
            </div>
          </div>

          {/* Mini Waves */}
          <div className="hidden sm:flex items-end gap-0.5 h-4 px-1">
            <span className="w-0.5 rounded-full bg-[#1DB954] animate-eq-1" />
            <span className="w-0.5 rounded-full bg-[#1DB954] animate-eq-2" />
            <span className="w-0.5 rounded-full bg-[#1DB954] animate-eq-3" />
            <span className="w-0.5 rounded-full bg-[#1DB954] animate-eq-4" />
          </div>

          {/* Controls */}
          <div className="flex items-center gap-1 shrink-0">
            <button
              type="button"
              onClick={handlePrevPlaylist}
              className="p-1 rounded-full text-zinc-400 hover:text-white transition-colors"
              title="Previous"
            >
              <SkipBack className="h-3.5 w-3.5" />
            </button>

            <Button
              size="sm"
              onClick={() => playerRef.current?.scrollIntoView({ behavior: "smooth" })}
              className="rounded-full bg-[#1DB954] hover:bg-[#1ed760] text-black text-xs font-bold h-7 px-3 gap-1 shadow-sm transition-transform"
            >
              <Play className="h-3 w-3 fill-current ml-0.5" />
              <span>Deck</span>
            </Button>

            <button
              type="button"
              onClick={handleNextPlaylist}
              className="p-1 rounded-full text-zinc-400 hover:text-white transition-colors"
              title="Next"
            >
              <SkipForward className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Embed Code Modal */}
      <Dialog open={!!modalPlaylist} onOpenChange={(open) => !open && setModalPlaylist(null)}>
        {modalPlaylist && (
          <DialogContent className="max-w-lg bg-zinc-950/95 border-white/20 backdrop-blur-2xl rounded-2xl p-5 shadow-2xl text-white">
            <DialogHeader>
              <DialogTitle className="font-display text-base flex items-center gap-2 text-white">
                <Code2 className="h-4 w-4 text-[#1DB954]" />
                Embed Code: {modalPlaylist.title}
              </DialogTitle>
              <DialogDescription className="text-xs text-zinc-400">
                Copy the iframe code or direct Spotify links.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-3 pt-2">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[11px] font-semibold text-zinc-300">HTML Embed IFrame</label>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyText(modalPlaylist.embedCode, "embedCode")}
                    className="rounded-full h-6 text-xs text-[#1DB954] hover:text-[#1ed760] bg-white/5 gap-1 px-2.5 border border-white/10"
                  >
                    {copiedId === "embedCode" ? (
                      <>
                        <Check className="h-3 w-3" /> Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3" /> Copy
                      </>
                    )}
                  </Button>
                </div>
                <div className="rounded-xl bg-black/90 p-3 font-mono text-[10px] text-emerald-400 overflow-x-auto border border-white/10">
                  <code>{modalPlaylist.embedCode}</code>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[11px] font-semibold text-zinc-300">Spotify Web URL</label>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyText(modalPlaylist.url, "modalUrl")}
                    className="rounded-full h-6 text-xs text-[#1DB954] hover:text-[#1ed760] bg-white/5 gap-1 px-2.5 border border-white/10"
                  >
                    {copiedId === "modalUrl" ? (
                      <>
                        <Check className="h-3 w-3" /> Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3" /> Copy
                      </>
                    )}
                  </Button>
                </div>
                <div className="rounded-xl bg-black/90 p-2.5 font-mono text-[10px] text-zinc-400 border border-white/10 truncate">
                  {modalPlaylist.url}
                </div>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
