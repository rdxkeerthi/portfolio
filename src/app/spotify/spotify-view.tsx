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
  Disc3,
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
} from "lucide-react";
import { SiSpotify } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  "Special Collection",
  "Classics & Vibes",
  "Retro & Vintage",
  "Relax & Peace",
  "Midnight Vibes",
  "Throwback",
];

// Lightweight CSS Equalizer Bars
const EqualizerWave = memo(({ count = 10 }: { count?: number }) => {
  const classes = ["animate-eq-1", "animate-eq-2", "animate-eq-3", "animate-eq-4"];
  return (
    <div className="flex items-end gap-1.5 h-8 px-1">
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className={`w-1.5 rounded-full bg-gradient-to-t from-[#1DB954] to-emerald-300 shadow-[0_0_8px_rgba(29,185,84,0.5)] ${classes[i % classes.length]}`}
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
    <div className="min-h-screen font-sans bg-background text-foreground relative overflow-hidden spotify-custom-cursor selection:bg-[#1DB954]/30 selection:text-white">
      {/* ========================================================================= */}
      {/* CUSTOM MOUSE CURSOR (28x28 Standard OS Cursor)                             */}
      {/* ========================================================================= */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .spotify-custom-cursor,
            .spotify-custom-cursor * {
              cursor: url('/assets/mouse/cursor-32.png') 0 0, auto !important;
            }
            .spotify-custom-cursor a,
            .spotify-custom-cursor a *,
            .spotify-custom-cursor button,
            .spotify-custom-cursor button *,
            .spotify-custom-cursor [role="button"],
            .spotify-custom-cursor [role="button"] *,
            .spotify-custom-cursor input,
            .spotify-custom-cursor select,
            .spotify-custom-cursor textarea,
            .spotify-custom-cursor .cursor-pointer,
            .spotify-custom-cursor [onclick] {
              cursor: url('/assets/mouse/pointer-32.png') 4 0, pointer !important;
            }
          `,
        }}
      />

      {/* ========================================================================= */}
      {/* HIGH-PERFORMANCE FROSTED GLASS BACKDROP                                    */}
      {/* ========================================================================= */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none transform-gpu will-change-transform">
        <div className="absolute top-10 left-1/4 w-[550px] h-[550px] rounded-full bg-[#1DB954]/18 blur-3xl opacity-70" />
        <div className="absolute top-1/3 -right-20 w-[450px] h-[450px] rounded-full bg-purple-600/12 blur-3xl opacity-50" />
        <div className="absolute bottom-10 left-10 w-[400px] h-[400px] rounded-full bg-cyan-500/12 blur-3xl opacity-45" />
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:24px_24px] opacity-30" />
      </div>

      <div className="container mx-auto px-4 pt-32 md:pt-36 pb-36 max-w-6xl">
        {/* Top Floating Glass Bar */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/"
            className="apple-glass-pill px-4 py-2 rounded-full inline-flex items-center gap-2.5 text-xs font-semibold text-foreground/85 hover:text-white transition-all hover:scale-[1.03] group shadow-lg"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1 text-[#1DB954]" />
            Back to Portfolio
          </Link>

          <div className="flex items-center gap-2.5">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => copyText(SPOTIFY_USER.profileUrl, "profile")}
              className="apple-glass-pill rounded-full text-xs gap-1.5 hover:text-white border-white/10"
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
                className="rounded-full bg-gradient-to-r from-[#1DB954] to-[#1ed760] hover:brightness-110 text-black font-bold text-xs gap-1.5 shadow-[0_10px_25px_rgba(29,185,84,0.35)] transition-all hover:scale-[1.03]"
              >
                <SiSpotify className="h-4 w-4" />
                Follow @{SPOTIFY_USER.name}
                <ExternalLink className="h-3 w-3" />
              </Button>
            </a>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* APPLE VISION FROSTED HERO BANNER                                          */}
        {/* ========================================================================= */}
        <div className="apple-glass apple-specular mb-10 rounded-3xl p-6 md:p-9 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-white/[0.1] via-transparent to-transparent pointer-events-none rounded-tr-3xl" />

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 md:gap-8 relative z-10">
            {/* Avatar Frame */}
            <div className="relative group shrink-0">
              <div className="absolute -inset-1.5 rounded-full bg-gradient-to-tr from-[#1DB954] via-emerald-400 to-teal-300 opacity-80 blur-md group-hover:opacity-100 transition-opacity" />
              <div className="relative h-24 w-24 md:h-28 md:w-28 overflow-hidden rounded-full border-2 border-white/50 shadow-2xl">
                <Image
                  src={SPOTIFY_USER.avatar}
                  alt={SPOTIFY_USER.name}
                  fill
                  sizes="112px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  unoptimized
                  priority
                />
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center sm:text-left">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5 mb-2.5">
                <span className="apple-glass-pill px-3 py-1 rounded-full text-[11px] font-semibold text-[#1DB954] flex items-center gap-1.5 border-[#1DB954]/30 shadow-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1DB954] opacity-80" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#1DB954]" />
                  </span>
                  Spotify Live Stream Deck
                </span>
                <span className="apple-glass-pill px-3 py-1 rounded-full text-[11px] text-muted-foreground border-white/10">
                  {SPOTIFY_USER.playlistCount} Curated Playlists
                </span>
              </div>

              <h1 className="font-display text-2xl md:text-4xl font-extrabold tracking-tight text-foreground flex items-center justify-center sm:justify-start gap-2.5">
                <span>{SPOTIFY_USER.name}</span>
 
              </h1>

              {/* Quote */}
              <p className="mt-3 text-sm md:text-base text-foreground/90 max-w-2xl leading-relaxed italic font-medium">
                &ldquo;When something is truly yours, the universe conspires in silence to make it happen ✨️ &rdquo;
              </p>
            </div>

            {/* Equalizer Widget */}
            <div className="hidden lg:flex flex-col items-center justify-center p-4 rounded-2xl apple-glass border-white/15 shadow-xl min-w-[150px]">
              <EqualizerWave count={10} />
              <span className="text-[10px] font-mono mt-2.5 flex items-center gap-1.5 font-bold tracking-wider uppercase text-[#1DB954]">
                <Volume2 className="h-3.5 w-3.5" />
                Live Audio
              </span>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* OFFICIAL SPOTIFY EMBED PLAYER (CLEAN & SEAMLESS)                          */}
        {/* ========================================================================= */}
        <div ref={playerRef} className="scroll-mt-32">
          <div className="mb-14">
            <div className="apple-glass apple-specular rounded-3xl p-5 md:p-8 relative overflow-hidden shadow-[0_35px_80px_rgba(0,0,0,0.6)] border-white/20">
              {/* Header Controls Bar */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-white/10 mb-6">
                <div className="flex items-center gap-3.5">
                  <div className="p-3.5 rounded-2xl apple-glass text-[#1DB954] border-white/20 shadow-lg shadow-[#1DB954]/20">
                    <Music2 className="h-6 w-6" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[11px] uppercase tracking-widest text-[#1DB954] font-bold">
                        Now Loaded:
                      </span>
                      <h2 className="font-display font-bold text-lg md:text-2xl text-foreground">
                        {selectedPlaylist.title}
                      </h2>
                      {selectedPlaylist.badge && (
                        <span className="apple-glass-pill px-2.5 py-0.5 rounded-full text-[10px] font-semibold text-[#1DB954] border-[#1DB954]/40">
                          {selectedPlaylist.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {selectedPlaylist.description} •{" "}
                      <span className="text-[#1DB954] font-medium">{selectedPlaylist.vibe}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end md:self-auto flex-wrap">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsCompact(!isCompact)}
                    className="apple-glass-pill rounded-full text-xs text-foreground/80 hover:text-white gap-1.5 border-white/10"
                    title={isCompact ? "Expand to view full song list" : "Switch to compact mini player"}
                  >
                    {isCompact ? (
                      <>
                        <Maximize2 className="h-3.5 w-3.5 text-[#1DB954]" />
                        Full Player (352px)
                      </>
                    ) : (
                      <>
                        <Minimize2 className="h-3.5 w-3.5 text-[#1DB954]" />
                        Compact Bar (152px)
                      </>
                    )}
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setModalPlaylist(selectedPlaylist)}
                    className="apple-glass-pill rounded-full text-xs gap-1.5 border-white/15 hover:border-[#1DB954]/50"
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
                      className="rounded-full bg-[#1DB954] hover:bg-[#1ed760] text-black font-semibold text-xs gap-1.5 shadow-md shadow-[#1DB954]/25"
                    >
                      <SiSpotify className="h-3.5 w-3.5" />
                      Open App
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </a>
                </div>
              </div>

              {/* Streaming Tip */}
              <div className="mb-4 flex items-center justify-between gap-2.5 rounded-2xl apple-glass-pill px-4 py-2.5 text-xs text-muted-foreground border-white/10">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-[#1DB954] shrink-0" />
                  <span>
                    <strong>Spotify Live Stream:</strong> Click the white circle <strong className="text-white">Play</strong> button inside the player below to start streaming.
                  </span>
                </div>
                <div className="hidden sm:flex items-center gap-2 text-[#1DB954] font-mono text-[11px]">
                  <span className="h-2 w-2 rounded-full bg-[#1DB954] animate-pulse" />
                  <span>Spotify Online</span>
                </div>
              </div>

              {/* Clean Dark Spotify Embed Frame (Zero White Background Box) */}
              <div className="relative overflow-hidden rounded-2xl bg-[#121212] border border-white/15 shadow-2xl">
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

              {/* Footer Details */}
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-foreground">Mood Genre:</span>
                  <span className="apple-glass-pill px-3 py-0.5 rounded-full text-foreground/90 text-[11px] border-white/10">
                    {selectedPlaylist.category}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => copyText(selectedPlaylist.url, selectedPlaylist.id)}
                    className="apple-glass-pill px-3 py-1 rounded-full hover:text-[#1DB954] transition-colors flex items-center gap-1.5 text-[11px]"
                  >
                    {copiedId === selectedPlaylist.id ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-[#1DB954]" /> Copied URL!
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
        </div>

        {/* ========================================================================= */}
        {/* CATEGORY PILLS & SEARCH BAR                                               */}
        {/* ========================================================================= */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Disc3 className="h-5 w-5 text-[#1DB954]" />
                <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight">
                  Playlists Collection
                </h2>
              </div>
              <p className="text-muted-foreground text-sm">
                Explore all {USER_PLAYLISTS.length} public playlists curated by {SPOTIFY_USER.name}
              </p>
            </div>

            <div className="relative w-full md:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search songs, vibes or titles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full apple-glass pl-10 pr-4 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:border-[#1DB954] focus:outline-none transition-all shadow-lg"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory.toLowerCase() === cat.toLowerCase();
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-[#1DB954] to-[#1ed760] text-black shadow-[0_4px_15px_rgba(29,185,84,0.35)] scale-[1.03]"
                      : "apple-glass-pill text-foreground/80 hover:text-white hover:border-white/30"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* PLAYLIST CARDS GRID WITH VINYL SLIDE-OUT                                  */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredPlaylists.map((playlist) => {
            const isCurrent = selectedPlaylist.id === playlist.id;
            const isLiked = !!likedMap[playlist.id];

            return (
              <div
                key={playlist.id}
                className={`apple-glass-card apple-specular group relative flex flex-col justify-between rounded-3xl p-5 md:p-6 overflow-hidden ${
                  isCurrent ? "!border-[#1DB954] ring-2 ring-[#1DB954]/40 shadow-[0_25px_50px_rgba(29,185,84,0.2)]" : ""
                }`}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/[0.1] to-transparent pointer-events-none rounded-tr-3xl" />

                <div>
                  <div className="flex items-start gap-4 mb-4 relative">
                    <div className="relative h-20 w-20 shrink-0">
                      {/* Vinyl Record Disc behind album */}
                      <div
                        className={`absolute top-0 left-0 h-20 w-20 rounded-full bg-gradient-to-r from-black via-zinc-900 to-black border border-white/20 shadow-md transition-transform duration-500 flex items-center justify-center ${
                          isCurrent
                            ? "translate-x-6 rotate-180 animate-spin [animation-duration:6s]"
                            : "group-hover:translate-x-6 group-hover:rotate-45"
                        }`}
                      >
                        <div className="h-7 w-7 rounded-full border border-white/30 bg-[#1DB954]/30 flex items-center justify-center">
                          <div className="h-2 w-2 rounded-full bg-black border border-white/40" />
                        </div>
                      </div>

                      {/* Album Cover Art */}
                      <div className="relative h-20 w-20 overflow-hidden rounded-2xl border border-white/20 shadow-xl group-hover:shadow-[0_10px_25px_rgba(29,185,84,0.3)] transition-all bg-black z-10">
                        <Image
                          src={playlist.image}
                          alt={playlist.title}
                          fill
                          sizes="80px"
                          className="object-cover group-hover:scale-108 transition-transform duration-500"
                          unoptimized
                        />
                        {isCurrent && (
                          <div className="absolute inset-0 bg-[#1DB954]/25 backdrop-blur-[1px] flex items-center justify-center">
                            <span className="h-4 w-4 rounded-full bg-[#1DB954] animate-ping" />
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex-1 min-w-0 z-10 pl-2">
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="text-[10px] font-bold text-[#1DB954] uppercase tracking-wider truncate">
                          {playlist.category}
                        </span>
                        <button
                          onClick={(e) => toggleLike(playlist.id, e)}
                          className="text-muted-foreground hover:text-rose-400 transition-colors p-1"
                          title="Like playlist"
                        >
                          <Heart
                            className={`h-4 w-4 transition-transform group-hover:scale-110 ${
                              isLiked ? "fill-rose-500 text-rose-500" : ""
                            }`}
                          />
                        </button>
                      </div>

                      <h3 className="font-display font-bold text-base text-foreground leading-snug line-clamp-1 group-hover:text-[#1DB954] transition-colors">
                        {playlist.title}
                      </h3>

                      <span className="inline-block mt-1 text-[11px] text-muted-foreground line-clamp-1 font-mono">
                        {playlist.vibe}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed mb-6">
                    {playlist.description}
                  </p>
                </div>

                {/* Card Actions */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-2 relative z-10">
                  <Button
                    size="sm"
                    onClick={() => handleSelectPlaylist(playlist)}
                    className={`rounded-full text-xs gap-1.5 flex-1 font-semibold transition-all ${
                      isCurrent
                        ? "bg-[#1DB954] text-black shadow-lg shadow-[#1DB954]/30"
                        : "apple-glass-pill hover:bg-[#1DB954] hover:text-black text-foreground border-white/15"
                    }`}
                  >
                    <Play className="h-3.5 w-3.5 fill-current" />
                    <span>{isCurrent ? "Now Loaded" : "Play in Website"}</span>
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setModalPlaylist(playlist)}
                    className="apple-glass-pill rounded-full text-xs px-3 border-white/15 hover:border-[#1DB954]/50"
                    title="View & Copy Embed Code"
                  >
                    <Code2 className="h-3.5 w-3.5 text-[#1DB954]" />
                  </Button>

                  <a
                    href={playlist.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Open on Spotify"
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      className="apple-glass-pill rounded-full text-muted-foreground hover:text-[#1DB954] px-2.5 border-white/10"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                    </Button>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {filteredPlaylists.length === 0 && (
          <div className="text-center py-16 apple-glass rounded-3xl border-dashed border-white/20 mb-16">
            <Disc3 className="h-10 w-10 text-muted-foreground mx-auto mb-3 opacity-50" />
            <p className="text-muted-foreground text-sm">
              No playlists found matching &ldquo;{searchQuery}&rdquo;.
            </p>
          </div>
        )}

        {/* ========================================================================= */}
        {/* WORKFLOW ACOUSTICS & STATS                                                */}
        {/* ========================================================================= */}
        <div className="mb-14">
          <div className="apple-glass apple-specular rounded-3xl p-6 md:p-8 relative overflow-hidden">
            <h2 className="font-display text-lg md:text-xl font-bold mb-6 flex items-center gap-2.5">
              <Headphones className="h-5 w-5 text-[#1DB954]" />
              Acoustic Profile & Listening Habits
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl apple-glass-pill border-white/15">
                <span className="text-xs font-bold text-[#1DB954] uppercase tracking-wider block mb-1">
                  Daily Flow Time
                </span>
                <span className="font-display font-bold text-lg text-foreground">4 – 6 Hours</span>
                <p className="text-[11px] text-muted-foreground mt-1">Deep focus noise cancellation</p>
              </div>

              <div className="p-4 rounded-2xl apple-glass-pill border-white/15">
                <span className="text-xs font-bold text-[#1DB954] uppercase tracking-wider block mb-1">
                  Vibe Cadence
                </span>
                <span className="font-display font-bold text-lg text-foreground">80 – 140 BPM</span>
                <p className="text-[11px] text-muted-foreground mt-1">Acoustic serenity to 80s synths</p>
              </div>

              <div className="p-4 rounded-2xl apple-glass-pill border-white/15">
                <span className="text-xs font-bold text-[#1DB954] uppercase tracking-wider block mb-1">
                  Top Genres
                </span>
                <span className="font-display font-bold text-lg text-foreground">Melodic & Retro</span>
                <p className="text-[11px] text-muted-foreground mt-1">80s Nostalgia, Pop & Ballads</p>
              </div>

              <div className="p-4 rounded-2xl apple-glass-pill border-white/15">
                <span className="text-xs font-bold text-[#1DB954] uppercase tracking-wider block mb-1">
                  Environment
                </span>
                <span className="font-display font-bold text-lg text-foreground">Cyber Defense Lab</span>
                <p className="text-[11px] text-muted-foreground mt-1">Forensics, SIEM & coding flow</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Connect Card */}
        <div className="text-center p-8 md:p-10 rounded-3xl apple-glass apple-specular relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-[#1DB954]/15 via-transparent to-transparent pointer-events-none" />
          <SiSpotify className="h-12 w-12 text-[#1DB954] mx-auto mb-4 drop-shadow-[0_0_20px_rgba(29,185,84,0.5)]" />
          <h3 className="font-display text-2xl font-bold mb-2">Want to Exchange Music or Collaborate?</h3>
          <p className="text-muted-foreground text-sm max-w-md mx-auto mb-6 leading-relaxed">
            Always open to playlist suggestions, retro jams, and soundtrack recommendations.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 relative z-10">
            <a href={SPOTIFY_USER.profileUrl} target="_blank" rel="noopener noreferrer">
              <Button className="rounded-full bg-[#1DB954] hover:bg-[#1ed760] text-black font-semibold text-xs px-6 shadow-xl shadow-[#1DB954]/30">
                <SiSpotify className="h-4 w-4 mr-2" />
                Open Spotify Profile
              </Button>
            </a>
            <Link href="/#contact">
              <Button variant="outline" className="apple-glass-pill rounded-full text-xs px-6 border-white/20 hover:border-[#1DB954]">
                Send a Recommendation
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* APPLE DYNAMIC ISLAND MINI FLOATING DOCK                                   */}
      {/* ========================================================================= */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 max-w-xl w-[94%] sm:w-auto">
        <div className="apple-glass rounded-full px-4 py-2.5 flex items-center justify-between gap-3 shadow-[0_25px_60px_rgba(0,0,0,0.7)] border-white/30 backdrop-blur-3xl">
          {/* Spinning Album Art */}
          <div
            className="flex items-center gap-3 min-w-0 cursor-pointer"
            onClick={() => playerRef.current?.scrollIntoView({ behavior: "smooth" })}
          >
            <div className="relative h-10 w-10 rounded-full overflow-hidden shrink-0 border-2 border-[#1DB954] shadow-md group">
              <Image
                src={selectedPlaylist.image}
                alt={selectedPlaylist.title}
                fill
                sizes="40px"
                className="object-cover"
                unoptimized
              />
            </div>

            <div className="min-w-0 max-w-[130px] sm:max-w-[180px] truncate">
              <p className="text-xs font-extrabold text-foreground truncate flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#1DB954] animate-ping shrink-0" />
                {selectedPlaylist.title}
              </p>
              <p className="text-[10px] text-muted-foreground truncate">{selectedPlaylist.vibe}</p>
            </div>
          </div>

          {/* Mini CSS Equalizer Waves */}
          <div className="hidden sm:flex items-end gap-1 h-5 px-1.5">
            <span className="w-1 rounded-full bg-[#1DB954] animate-eq-1" />
            <span className="w-1 rounded-full bg-[#1DB954] animate-eq-2" />
            <span className="w-1 rounded-full bg-[#1DB954] animate-eq-3" />
            <span className="w-1 rounded-full bg-[#1DB954] animate-eq-4" />
          </div>

          {/* Playback Controls */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={handlePrevPlaylist}
              className="p-1.5 rounded-full text-muted-foreground hover:text-white hover:bg-white/10 transition-colors"
              title="Previous Playlist"
            >
              <SkipBack className="h-4 w-4" />
            </button>

            <Button
              size="sm"
              onClick={() => playerRef.current?.scrollIntoView({ behavior: "smooth" })}
              className="rounded-full bg-gradient-to-r from-[#1DB954] to-[#1ed760] hover:scale-105 text-black text-xs font-bold h-8 px-4 gap-1.5 shadow-[0_0_15px_rgba(29,185,84,0.5)] transition-transform"
              title="Play Spotify"
            >
              <Play className="h-4 w-4 fill-current ml-0.5" />
              <span>Play</span>
            </Button>

            <button
              type="button"
              onClick={handleNextPlaylist}
              className="p-1.5 rounded-full text-muted-foreground hover:text-white hover:bg-white/10 transition-colors"
              title="Next Playlist"
            >
              <SkipForward className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* ULTRA-FROSTED EMBED MODAL                                                 */}
      {/* ========================================================================= */}
      <Dialog open={!!modalPlaylist} onOpenChange={(open) => !open && setModalPlaylist(null)}>
        {modalPlaylist && (
          <DialogContent className="max-w-xl apple-glass border-white/25 backdrop-blur-3xl rounded-3xl p-6 shadow-2xl text-foreground">
            <DialogHeader>
              <DialogTitle className="font-display text-lg flex items-center gap-2">
                <Code2 className="h-5 w-5 text-[#1DB954]" />
                Embed Code & Links: {modalPlaylist.title}
              </DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground">
                Copy the iframe code or direct Spotify links to use anywhere.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 pt-3">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-foreground">HTML Embed Code (IFrame)</label>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyText(modalPlaylist.embedCode, "embedCode")}
                    className="apple-glass-pill rounded-full h-7 text-xs text-[#1DB954] hover:text-[#1ed760] gap-1 px-3"
                  >
                    {copiedId === "embedCode" ? (
                      <>
                        <Check className="h-3 w-3" /> Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3" /> Copy Code
                      </>
                    )}
                  </Button>
                </div>
                <div className="relative rounded-2xl bg-black/80 p-3.5 font-mono text-[11px] text-emerald-400 overflow-x-auto border border-white/10 shadow-inner">
                  <code>{modalPlaylist.embedCode}</code>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-foreground">Spotify Web URL</label>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyText(modalPlaylist.url, "modalUrl")}
                    className="apple-glass-pill rounded-full h-7 text-xs text-[#1DB954] hover:text-[#1ed760] gap-1 px-3"
                  >
                    {copiedId === "modalUrl" ? (
                      <>
                        <Check className="h-3 w-3" /> Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3" /> Copy URL
                      </>
                    )}
                  </Button>
                </div>
                <div className="rounded-2xl bg-black/80 p-3 font-mono text-[11px] text-muted-foreground border border-white/10 truncate">
                  {modalPlaylist.url}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-foreground">Spotify URI</label>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyText(modalPlaylist.uri, "modalUri")}
                    className="apple-glass-pill rounded-full h-7 text-xs text-[#1DB954] hover:text-[#1ed760] gap-1 px-3"
                  >
                    {copiedId === "modalUri" ? (
                      <>
                        <Check className="h-3 w-3" /> Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3" /> Copy URI
                      </>
                    )}
                  </Button>
                </div>
                <div className="rounded-2xl bg-black/80 p-3 font-mono text-[11px] text-muted-foreground border border-white/10 truncate">
                  {modalPlaylist.uri}
                </div>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
