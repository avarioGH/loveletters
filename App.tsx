
import React, { useState, useEffect, useRef } from 'react';
import { Heart, Instagram, Send, MessageCircle, ArrowRight, Camera, Music, Play, Pause, X, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Constants & Assets ---
const RAW_BASE = "https://raw.githubusercontent.com/avarioGH/loveletters/6032a3fb59ae5ef04da56572cf476080361d7a1d/";
const IMAGES = {
  hero: `${RAW_BASE}Hiccup_and_Astrid_Kissing_Blindsided.webp`,
  gallery1: `${RAW_BASE}gallery-1.jpg`,
  // Updated with the specific commit and file provided by the user
  gallery2: `https://raw.githubusercontent.com/avarioGH/loveletters/7c6b441fb0fe762d3b8c3a5293adfc9163a5cfc8/image.jpg`,
  gallery3: `${RAW_BASE}kcwlnd7tu16e1.jpeg`,
  gallery4: `${RAW_BASE}p19g4e0li9ae1.jpeg`
};

// --- Sub-Components ---

const HeartParticles = () => {
  const [hearts, setHearts] = useState<{ id: number; left: string; size: string; duration: string }[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setHearts(prev => [
        ...prev.slice(-10),
        {
          id: Date.now(),
          left: `${Math.random() * 100}%`,
          size: `${Math.random() * 15 + 10}px`,
          duration: `${Math.random() * 5 + 7}s`
        }
      ]);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {hearts.map(heart => (
        <div
          key={heart.id}
          className="heart-particle"
          style={{
            left: heart.left,
            fontSize: heart.size,
            animationDuration: heart.duration,
            bottom: '-20px'
          }}
        >
          ❤
        </div>
      ))}
    </>
  );
};

const Header = () => (
  <header className="fixed top-0 left-0 right-0 z-[60] glass-card px-6 py-4 flex justify-between items-center border-b border-pink-100/50 shadow-sm">
    <div className="flex items-center gap-2">
      <div className="bg-pink-500 p-1.5 rounded-lg shadow-pink-200 shadow-lg">
        <Heart className="text-white fill-white" size={16} />
      </div>
      <span className="font-dancing text-2xl font-bold bg-gradient-to-r from-pink-600 to-rose-400 bg-clip-text text-transparent">D-Code</span>
    </div>
    <div className="flex gap-4">
      <a href="https://instagram.com/dcodeweb" target="_blank" rel="noopener noreferrer" className="text-pink-400 hover:text-pink-600 transition-colors">
        <Instagram size={22} />
      </a>
      <a href="https://t.me/dcodeweb" target="_blank" rel="noopener noreferrer" className="text-pink-400 hover:text-pink-600 transition-colors">
        <Send size={22} />
      </a>
    </div>
  </header>
);

const PhotoCard: React.FC<{ src: string; title: string; delay?: number }> = ({ src, title, delay = 0 }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, delay }}
    viewport={{ once: true }}
    className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white aspect-[3/4]"
  >
    <img src={src} alt={title} className="w-full h-full object-cover" loading="lazy" />
    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-80" />
    <div className="absolute bottom-0 left-0 right-0 p-4">
      <p className="text-white font-dancing text-xl drop-shadow-md">{title}</p>
    </div>
  </motion.div>
);

const EnvelopeLetter = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="py-12 px-6 flex flex-col items-center">
      <div className="text-center mb-10">
        <h2 className="font-playfair text-3xl font-bold text-gray-800">A Secret Letter</h2>
        <p className="text-pink-400 font-dancing text-xl mt-1 italic">Tapped with love...</p>
      </div>

      <div className="envelope-wrapper relative w-full max-w-[320px] aspect-[4/3] cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        {/* Shadow */}
        <div className="absolute inset-0 bg-pink-100 blur-2xl rounded-2xl opacity-50 -z-10" />
        
        {/* Envelope Body (Back) */}
        <div className="absolute inset-0 bg-rose-400 rounded-xl shadow-inner border border-rose-500 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center opacity-10 pointer-events-none">
                <Heart size={120} className="fill-white" />
            </div>
        </div>

        {/* Letter Paper */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ y: 0, opacity: 0 }}
              animate={{ y: -160, opacity: 1 }}
              exit={{ y: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              className="absolute left-4 right-4 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] bg-white shadow-2xl p-6 rounded-md z-20 min-h-[300px] border border-gray-100"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6 border-b border-pink-100 pb-2">
                <div>
                    <h3 className="font-dancing text-2xl text-rose-500">Dearest,</h3>
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold mt-1">Private & Confidential</p>
                </div>
                <button onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-rose-500 transition-colors">
                    <X size={18} />
                </button>
              </div>
              
              <div className="space-y-4 font-playfair italic text-gray-700 leading-relaxed text-sm">
                <p>
                  "Like the dragons of the Hidden World, my love for you finds its sanctuary in your presence. Every beat of my heart is a whisper of your name."
                </p>
                <p>
                  "I promised to fly with you through every storm, and even if the sky falls, I'll be right here holding your hand. You are my greatest adventure."
                </p>
              </div>

              <div className="mt-10 pt-4 border-t border-pink-50 text-right">
                <p className="font-dancing text-2xl text-rose-500">Always Yours,</p>
                <p className="font-semibold text-gray-500 text-sm mt-1">Hiccup Haddock</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Envelope Flap (Top) */}
        <motion.div 
          animate={{ rotateX: isOpen ? 180 : 0 }}
          transition={{ duration: 0.6 }}
          className="absolute top-0 left-0 w-full h-1/2 bg-rose-500 rounded-t-xl z-30 origin-bottom"
          style={{ clipPath: "polygon(0 0, 50% 100%, 100% 0)" }}
        />

        {/* Front Sides of Envelope */}
        <div className="absolute inset-0 bg-transparent z-40 pointer-events-none">
            <div className="absolute bottom-0 left-0 w-full h-full bg-rose-400/50" style={{ clipPath: "polygon(0 0, 50% 50%, 0 100%)" }} />
            <div className="absolute bottom-0 right-0 w-full h-full bg-rose-400/50" style={{ clipPath: "polygon(100% 0, 50% 50%, 100% 100%)" }} />
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-rose-300" style={{ clipPath: "polygon(0 100%, 50% 0, 100% 100%)" }} />
        </div>

        {/* Click Indicator */}
        {!isOpen && (
            <motion.div 
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none"
            >
                <div className="bg-white/90 backdrop-blur-md p-3 rounded-full shadow-lg border border-rose-200">
                    <Mail className="text-rose-500" />
                </div>
            </motion.div>
        )}
      </div>
    </div>
  );
};

const MusicToggle = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <button 
      onClick={() => setIsPlaying(!isPlaying)}
      className="fixed bottom-28 right-6 z-50 bg-white/90 backdrop-blur-md p-3.5 rounded-full shadow-xl border border-pink-100 text-pink-500 active:scale-90 transition-transform"
    >
      {isPlaying ? <Pause size={24} className="fill-pink-500" /> : <Play size={24} className="fill-pink-500" />}
    </button>
  );
}

const Footer = () => (
  <footer className="bg-white border-t border-pink-100 pt-16 pb-32 px-6 text-center">
    <div className="flex justify-center gap-8 mb-8">
      <a href="https://instagram.com/dcodeweb" className="bg-pink-50 p-3 rounded-2xl text-pink-500 hover:bg-pink-100 transition-all shadow-sm"><Instagram size={24} /></a>
      <a href="https://t.me/dcodeweb" className="bg-blue-50 p-3 rounded-2xl text-blue-500 hover:bg-blue-100 transition-all shadow-sm"><Send size={24} /></a>
    </div>
    <div className="max-w-xs mx-auto">
        <p className="text-gray-400 font-medium text-xs uppercase tracking-widest mb-2">Developed by</p>
        <h4 className="font-dancing text-3xl text-pink-600 font-bold mb-6">D-Code Team</h4>
    </div>
    <div className="flex flex-col gap-3">
        <a 
        href="https://t.me/avariosh" 
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 bg-pink-500 text-white px-8 py-4 rounded-2xl font-bold shadow-xl shadow-pink-200 active:scale-95 transition-all w-full"
        >
        <MessageCircle size={20} />
        Order Your Love Letter
        </a>
        <p className="text-[10px] text-gray-300 font-medium">© 2024 D-Code Web Development. All rights reserved.</p>
    </div>
  </footer>
);

export default function App() {
  const galleryItems = [
    { src: IMAGES.gallery1, title: "Unspoken Vows" },
    { src: IMAGES.gallery3, title: "Our Hidden Sky" },
    { src: IMAGES.gallery2, title: "Chasing Sunsets" },
    { src: IMAGES.gallery4, title: "Forever & Ever" },
  ];

  return (
    <div className="min-h-screen relative selection:bg-pink-200">
      <Header />
      <HeartParticles />
      <MusicToggle />

      {/* Hero Section */}
      <section className="relative w-full overflow-hidden">
        <div className="h-[75vh] w-full relative">
            <motion.img 
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.5 }}
                src={IMAGES.hero} 
                className="w-full h-full object-cover" 
                alt="Couple"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#fffafa]" />
            
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="absolute bottom-12 left-0 right-0 px-6 text-center"
            >
                <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-6 border border-white/30 inline-block w-full max-w-sm">
                    <h1 className="font-dancing text-5xl text-white drop-shadow-lg mb-2">Hiccup & Astrid</h1>
                    <div className="w-12 h-1 bg-white/50 mx-auto mb-4 rounded-full" />
                    <p className="font-playfair italic text-white/90 text-base leading-relaxed">
                        "If you have to leave, I'll find you. Because I'm never letting you go again."
                    </p>
                </div>
            </motion.div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="px-6 py-12 relative z-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-playfair text-2xl font-bold text-gray-800">Captured Love</h2>
            <p className="text-pink-400 font-dancing text-lg italic">The moments we shared...</p>
          </div>
          <div className="bg-rose-50 p-2 rounded-xl text-rose-400">
            <Camera size={24} />
          </div>
        </div>
        
        <div className="columns-2 gap-4 space-y-4">
          {galleryItems.map((img, idx) => (
            <PhotoCard key={idx} src={img.src} title={img.title} delay={idx * 0.1} />
          ))}
        </div>
      </section>

      {/* Letter Section */}
      <EnvelopeLetter />

      {/* Decorative Quote */}
      <section className="px-10 py-16 text-center">
        <div className="relative">
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-10">
                <Heart size={80} className="fill-rose-500" />
            </div>
            <p className="font-playfair text-gray-500 italic leading-loose">
                "We’re not just friends. We’re something more. Something that dragons can't even describe."
            </p>
        </div>
      </section>

      {/* Floating CTA for Mobile */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[70] w-full px-6 max-w-sm">
        <motion.a 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          href="https://t.me/avariosh"
          className="w-full bg-gradient-to-r from-pink-500 to-rose-400 text-white flex items-center justify-center gap-3 py-4.5 rounded-2xl shadow-2xl shadow-rose-200/50 font-bold border-b-4 border-rose-600"
        >
          <Heart size={20} className="fill-white" />
          Send a Letter to Your Love
        </motion.a>
      </div>

      <Footer />
    </div>
  );
}
