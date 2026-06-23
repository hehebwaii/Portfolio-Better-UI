"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X } from "lucide-react";
import { useEsc } from "./ClientProvider";

interface MediaDeckProps {
  media: any[];
  initialIndex: number;
  onClose: () => void;
}

export default function MediaDeck({ media, initialIndex, onClose }: MediaDeckProps) {
  const [cards, setCards] = useState<any[]>([]);
  const { escPressed, resetEsc } = useEsc();

  useEffect(() => {
    // Reorder array so initialIndex is at the end (top of stack visually)
    if (media && media.length > 0) {
      const reordered = [...media];
      // Move the clicked index to the top of the deck
      const topCard = reordered.splice(initialIndex, 1)[0];
      reordered.push(topCard);
      setCards(reordered);
    }
  }, [media, initialIndex]);

  useEffect(() => {
    if (escPressed) {
      onClose();
      resetEsc();
    }
  }, [escPressed, onClose, resetEsc]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleNextCard = () => {
    setCards((prev) => {
      if (prev.length <= 1) {
        onClose();
        return prev;
      }
      // Remove top card (last element)
      const newStack = [...prev];
      newStack.pop();
      return newStack;
    });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-6">
      
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-[110] bg-neoyellow border-4 border-black p-3 rounded-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] transition-all"
        aria-label="Close Deck"
      >
        <X size={24} strokeWidth={4} color="black" />
      </button>

      {/* Solitaire Stack */}
      <div className="relative w-full max-w-[400px] h-[600px] flex items-center justify-center">
        <AnimatePresence>
          {cards.map((card, index) => {
            const isTop = index === cards.length - 1;
            const isSecond = index === cards.length - 2;
            const isThird = index === cards.length - 3;

            // Simple stacking math
            const yOffset = isTop ? 0 : isSecond ? -20 : isThird ? -40 : -60;
            const scale = isTop ? 1 : isSecond ? 0.95 : isThird ? 0.9 : 0.85;
            const opacity = isTop || isSecond || isThird ? 1 : 0;
            const rotation = isTop ? 0 : isSecond ? -3 : isThird ? 3 : 0;

            return (
              <motion.div
                key={card.imageUrl + index}
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity, y: yOffset, scale, rotate: rotation }}
                exit={{ x: 300, rotate: 15, opacity: 0, transition: { duration: 0.3 } }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className={`absolute w-full h-[550px] bg-white border-4 border-black p-4 flex flex-col justify-between ${
                  isTop ? "shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] cursor-pointer" : ""
                }`}
                style={{ zIndex: index }}
                onClick={isTop ? handleNextCard : undefined}
                whileHover={isTop ? { scale: 1.02, rotate: -2 } : {}}
              >
                {/* Polaroid Image Area */}
                <div className="relative w-full h-[380px] bg-neogray border-4 border-black overflow-hidden pointer-events-none">
                  {card.imageUrl && (
                    <Image
                      src={card.imageUrl}
                      alt={card.title || "Media"}
                      fill
                      className="object-cover"
                      placeholder={card.lqip ? "blur" : "empty"}
                      blurDataURL={card.lqip || undefined}
                    />
                  )}
                </div>

                {/* Polaroid Caption Area */}
                <div className="w-full flex-grow flex flex-col justify-end pt-4 pb-2 pointer-events-none text-black">
                  <h3 className="font-display font-black text-2xl uppercase leading-tight line-clamp-1">
                    {card.title}
                  </h3>
                  <p className="font-body text-sm font-medium opacity-80 line-clamp-2 mt-1">
                    {card.desc}
                  </p>
                  <div className="font-mono text-xs font-bold uppercase mt-2 tracking-widest text-neopink line-clamp-1">
                    {card.tags}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {cards.length === 0 && (
          <div className="text-white font-display text-2xl font-black">Deck Empty</div>
        )}
      </div>

    </div>
  );
}
