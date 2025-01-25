'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Bot, Heart, Shield, Cross, Stethoscope, Pill } from 'lucide-react'
import Link from 'next/link'
import React, { useState, useMemo } from "react";

// Memoizing button variants to prevent inline function recreation on each render
const buttonVariants = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
};

// Memoizing FloatingIcon component to prevent unnecessary re-renders
const FloatingIcon = React.memo(({ Icon, delay = 0, duration = 10 }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{
      opacity: [0.2, 0.5, 0.2],
      y: [0, -20, 0],
    }}
    transition={{
      duration,
      repeat: Infinity,
      delay,
      ease: 'easeInOut',
    }}
    className="absolute text-rose-300/20 pointer-events-none"
    style={{
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    }}
  >
    <Icon size={40} />
  </motion.div>
));

export default function EmergencyChat() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      text: 'I understand this is an emergency. I\'m here to help while I assist you understand your situation PLEASE contact medical services to assist you immediately. Can you tell me more about what\'s happening?',
      sender: 'bot',
    },
  ]);

  // Memoizing the list of icons to avoid recalculating on each render
  const icons = useMemo(() => [Heart, Shield, Cross, Stethoscope, Pill], []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Use functional state update to ensure we're working with the most current state
    setMessages((prevMessages) => [...prevMessages, { text: input, sender: 'user' }]);
    setInput('');

    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text: "I understand this is an emergency. I'm here to help while emergency services are contacted. Can you tell me more about what's happening?",
          sender: 'bot',
        },
      ]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      {/* Animated Background Icons */}
      {icons.map((Icon, i) => (
        <FloatingIcon key={i} Icon={Icon} delay={i * 2} />
      ))}

      {/* Header */}
      <div className="border-b border-gray-800">
        <div className="max-w-4xl mx-auto p-4 flex items-center justify-between">
          <Link href="/">
            <motion.div className="flex items-center gap-2 cursor-pointer" variants={buttonVariants}>
              <Bot className="w-8 h-8 text-rose-500" />
              <span className="font-bold text-xl">Bertha</span>
            </motion.div>
          </Link>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 bg-rose-500/20 px-3 py-1 rounded-full">
            <span className="animate-pulse relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
            </span>
            Emergency Mode
          </motion.div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="max-w-4xl mx-auto p-4 h-[calc(100vh-8rem)]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-rose-500/10 rounded-lg p-4 mb-6"
        >
          <p>
            You are using emergency mode of Bertha, meaning Bertha is trying to help you without knowing anything about you. So please try and be detailed so that Bertha can help you better.
          </p>
        </motion.div>

        <div className="space-y-4 mb-8 h-[calc(100vh-18rem)] overflow-y-auto">
          <AnimatePresence>
            {messages.map((message, i) => (
              <motion.div
                key={message.text} // Using unique identifier to prevent re-renders from index
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-rose-500 text-white'
                      : 'bg-gray-800 text-white'
                  }`}
                >
                  {message.text}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <form onSubmit={handleSubmit} className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Bertha Am I Cooked..."
            className="w-full bg-gray-800 text-white rounded-lg pl-4 pr-16 py-3 focus:outline-none focus:ring-2 focus:ring-rose-500"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10">
            <motion.button
              type="submit"
              variants={buttonVariants} // Using memoized button variants
              className="bg-rose-500 text-white px-4 py-2 rounded-lg"
              style={{ transformOrigin: 'center' }}
            >
              Send
            </motion.button>
          </div>
        </form>
      </div>
    </div>
  );
}
