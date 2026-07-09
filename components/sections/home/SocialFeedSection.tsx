"use client";

import { useEffect, useRef, useState } from "react";
import { Heart, MessageCircle, Play, Volume2, VolumeX } from "lucide-react";

const HANDLE = "@checkstardbn";

type BasePost = {
  id: number;
  caption: string;
  likes: number;
  comments: number;
  timeAgo: string;
};

type ImagePost = BasePost & { type: "image"; src: string };
type VideoPost = BasePost & { type: "video"; src: string; poster: string };
type Post = ImagePost | VideoPost;

const posts: Post[] = [
  {
    id: 1,
    type: "video",
    src: "/socials/1.mp4",
    poster: "/socials/1.jfif",
    caption: "Fresh produce every morning. Come grab yours before it's gone. #Checkstar",
    likes: 284,
    comments: 18,
    timeAgo: "2h",
  },
  {
    id: 2,
    type: "video",
    src: "/socials/2.mp4",
    poster: "/socials/2.jfif",
    caption: "Freshness you can see and taste. Our produce section is fully stocked. #FreshDaily",
    likes: 156,
    comments: 9,
    timeAgo: "5h",
  },
  {
    id: 3,
    type: "video",
    src: "/socials/3.mp4",
    poster: "/socials/3.jfif",
    caption: "Our bakers arrive at 4am so you don't have to. Fresh bread every single day.",
    likes: 527,
    comments: 42,
    timeAgo: "1d",
  },
  {
    id: 5,
    type: "image",
    src: "/socials/5.jfif",
    caption: "Weekend specials on now. Don't miss out on our butchery deals. #CheckstarDeals",
    likes: 892,
    comments: 64,
    timeAgo: "2d",
  },
  {
    id: 4,
    type: "video",
    src: "/socials/4.mp4",
    poster: "/socials/4.jfif",
    caption: "Wide aisles, friendly staff, unbeatable prices. This is your store. #Community",
    likes: 341,
    comments: 27,
    timeAgo: "1d",
  },
  {
    id: 6,
    type: "image",
    src: "/socials/6.jfif",
    caption: "From KZN farms straight to your kitchen. Supporting local growers every day.",
    likes: 673,
    comments: 55,
    timeAgo: "3d",
  },
  {
    id: 7,
    type: "image",
    src: "/socials/7.jfif",
    caption: "Market Day is live. Unbeatable deals for 24 hours only — don't miss out. #MarketDay",
    likes: 1204,
    comments: 98,
    timeAgo: "3d",
  },
  {
    id: 9,
    type: "video",
    src: "/socials/WhatsApp%20Video%202026-07-09%20at%2020.02.11.mp4",
    poster: "/socials/5.jfif",
    caption: "A glimpse into our store. Come see us in Durban CBD, Overport or Phoenix. #Checkstar",
    likes: 312,
    comments: 21,
    timeAgo: "4d",
  },
  {
    id: 8,
    type: "image",
    src: "/socials/8.jfif",
    caption: "Good food, good vibes. Try our new recipe this weekend. #CheckstarRecipes",
    likes: 449,
    comments: 33,
    timeAgo: "4d",
  },
];

/* ── Video card ──────────────────────────────────────────────────────────── */

function VideoCard({ src, poster }: { src: string; poster: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(false);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.play().catch(() => setPaused(true));
  }, []);

  const handleClick = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { v.play(); setPaused(false); }
    else { v.pause(); setPaused(true); }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  return (
    <div
      className="relative aspect-[9/16] rounded-lg overflow-hidden bg-ink cursor-pointer"
      onClick={handleClick}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {paused && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-14 h-14 rounded-full bg-black/55 flex items-center justify-center backdrop-blur-sm">
            <Play className="w-6 h-6 text-white fill-white ml-0.5" />
          </div>
        </div>
      )}

      <button
        onClick={toggleMute}
        aria-label={muted ? "Unmute video" : "Mute video"}
        className="absolute bottom-3 right-3 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors duration-200 backdrop-blur-sm"
      >
        {muted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
      </button>
    </div>
  );
}

/* ── Image card ──────────────────────────────────────────────────────────── */

function ImageCard({ src, likes, comments }: { src: string; likes: number; comments: number }) {
  return (
    <div className="group relative aspect-[4/5] rounded-lg overflow-hidden bg-ink-100">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-6">
        <span className="flex items-center gap-1.5 text-white font-bold text-sm">
          <Heart className="w-5 h-5 fill-white" aria-hidden="true" />
          {likes.toLocaleString()}
        </span>
        <span className="flex items-center gap-1.5 text-white font-bold text-sm">
          <MessageCircle className="w-5 h-5 fill-white" aria-hidden="true" />
          {comments}
        </span>
      </div>
    </div>
  );
}

/* ── Slide ───────────────────────────────────────────────────────────────── */

function Slide({ post }: { post: Post }) {
  return (
    <div className="flex-none w-48 sm:w-56 lg:w-60 shrink-0">
      {post.type === "video" ? (
        <VideoCard src={post.src} poster={post.poster} />
      ) : (
        <ImageCard src={post.src} likes={post.likes} comments={post.comments} />
      )}
      <div className="mt-2.5 px-0.5">
        <p className="text-[11px] font-bold text-orange">{HANDLE}</p>
        <p className="text-xs text-ink-500 font-light line-clamp-2 leading-relaxed mt-0.5">
          {post.caption}
        </p>
        <p className="text-[10px] text-ink-400 mt-1">{post.timeAgo} ago</p>
      </div>
    </div>
  );
}

/* ── Main section ────────────────────────────────────────────────────────── */

export function SocialFeedSection() {
  const [tickerPaused, setTickerPaused] = useState(false);

  return (
    <section aria-label="Social media feed" className="py-16 lg:py-20 bg-cream overflow-hidden">

      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <p className="text-xs font-bold tracking-widest uppercase text-orange mb-2">
          {HANDLE}
        </p>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tighter text-ink leading-tight">
          Follow along on{" "}
          <span className="text-orange">Instagram.</span>
        </h2>
      </div>

      {/* Ticker — two identical copies, translate by -50% to loop seamlessly */}
      <div
        className="overflow-hidden"
        onMouseEnter={() => setTickerPaused(true)}
        onMouseLeave={() => setTickerPaused(false)}
      >
        <div
          className={`flex gap-4 items-end w-max social-ticker${tickerPaused ? " social-ticker-paused" : ""}`}
          aria-hidden="true"
        >
          {/* First copy */}
          {posts.map((post) => (
            <Slide key={`a-${post.id}`} post={post} />
          ))}
          {/* Second copy — makes the loop seamless */}
          {posts.map((post) => (
            <Slide key={`b-${post.id}`} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
