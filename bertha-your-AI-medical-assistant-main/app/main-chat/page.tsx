"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Paperclip, Send, Sparkles, Circle, Square, Triangle, Heart, Star, Cloud } from 'lucide-react'
import Link from "next/link"

export default function ChatInterface() {
  const [messages, setMessages] = useState<Array<{type: 'user' | 'bot', content: string}>>([])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const resetChat = () => {
    setMessages([])
    setInput("")
    setIsTyping(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    setMessages(prev => [...prev, { type: 'user', content: input }])
    setInput("")
    setIsTyping(true)

    setTimeout(() => {
      setMessages(prev => [...prev, { 
        type: 'bot', 
        content: "I understand your concern. Let me help you with that." 
      }])
      setIsTyping(false)
    }, 2000)
  }

  const FloatingShape = ({ children, delay = 0, size = "large" }) => (
    <motion.div
      className={`absolute ${size === "large" ? "text-sky-200/10" : "text-pink-200/10"}`}
      animate={{
        y: [0, -20, 0],
        rotate: [0, 360],
        scale: [1, 1.2, 1]
      }}
      transition={{
        duration: 8,
        delay,
        repeat: Infinity,
        repeatType: "reverse"
      }}
    >
      {children}
    </motion.div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-pink-50 text-slate-800 relative overflow-hidden">
      {/* Ambient Background Animations */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Gradient Orbs */}
        <motion.div 
          className="absolute inset-0"
          animate={{
            background: [
              "radial-gradient(600px at 0% 0%, rgba(186, 230, 253, 0.2), transparent 70%)",
              "radial-gradient(600px at 100% 0%, rgba(249, 168, 212, 0.2), transparent 70%)",
              "radial-gradient(600px at 100% 100%, rgba(186, 230, 253, 0.2), transparent 70%)",
              "radial-gradient(600px at 0% 100%, rgba(249, 168, 212, 0.2), transparent 70%)",
            ]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />

        {/* Floating Particles */}
        {Array.from({ length: 40 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-sky-200 to-pink-200 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [null, Math.random() * -500],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}

        {/* Floating Shapes */}
        <FloatingShape delay={0}>
          <Circle className="w-40 h-40" />
        </FloatingShape>
        <FloatingShape delay={2}>
          <Square className="w-32 h-32 absolute right-20 top-40" />
        </FloatingShape>
        <FloatingShape delay={4}>
          <Triangle className="w-48 h-48 absolute left-1/4 top-1/3" />
        </FloatingShape>
        <FloatingShape delay={3} size="small">
          <Heart className="w-24 h-24 absolute right-1/3 top-1/4" />
        </FloatingShape>
        <FloatingShape delay={5} size="small">
          <Star className="w-20 h-20 absolute left-1/4 bottom-1/4" />
        </FloatingShape>
        <FloatingShape delay={1} size="small">
          <Cloud className="w-28 h-28 absolute right-1/4 bottom-1/3" />
        </FloatingShape>
      </div>

      {/* Main Container */}
      <div className="max-w-4xl mx-auto h-screen flex flex-col relative z-10">
        {/* Header */}
        <motion.div 
          className="p-4 border-b border-sky-200/50 backdrop-blur-sm bg-white/50"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <div className="flex items-center justify-between">
            <motion.div 
              className="flex items-center gap-3 cursor-pointer"
              onClick={resetChat}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div 
                className="w-10 h-10 rounded-full bg-gradient-to-r from-sky-400 to-pink-400 flex items-center justify-center"
                animate={{
                  boxShadow: [
                    "0 0 0 0 rgba(186, 230, 253, 0.4)",
                    "0 0 0 10px rgba(186, 230, 253, 0)",
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity
                }}
              >
                <span className="text-white font-bold text-lg">B</span>
              </motion.div>
              <span className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-pink-400">
                Bertha
              </span>
            </motion.div>
            <Link href="/history">
            <motion.button
              className="px-4 py-2 rounded-lg bg-white/50 hover:bg-white/80 transition-colors border border-sky-200/50"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Access History
            </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Welcome Message */}
          {messages.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center p-8"
            >
              <motion.div
                animate={{
                  y: [0, -15, 0],
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                }}
                className="inline-block mb-8"
              >
                <Sparkles className="w-16 h-16 text-pink-400 mx-auto mb-6" />
              </motion.div>
              <motion.h2 
                className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-pink-400"
                animate={{
                  scale: [1, 1.02, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                }}
              >
                Welcome to Bertha
              </motion.h2>
              <p className="text-slate-600 text-lg mb-4">Your AI medical assistant is ready to help</p>
              <Link href="/warning">
                <motion.p
                  className="text-sm text-slate-500 hover:text-slate-600 cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  bertha can be wrong, please consult professionals for better care of yourself
                </motion.p>
              </Link>
            </motion.div>
          )}

          {/* Chat Messages */}
          <AnimatePresence>
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <motion.div 
                  className={`max-w-[80%] ${
                    message.type === 'user' 
                      ? 'bg-gradient-to-r from-sky-400 to-pink-400 text-white' 
                      : 'bg-white/80 backdrop-blur-sm border border-sky-200/50'
                  } rounded-2xl px-4 py-3 shadow-lg`}
                  whileHover={{ scale: 1.01 }}
                >
                  <p className={message.type === 'user' ? 'text-white' : 'text-slate-700'}>
                    {message.content}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing Indicator */}
          <AnimatePresence>
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex items-center gap-2 text-slate-500"
              >
                <div className="flex items-center gap-1">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 rounded-full bg-gradient-to-r from-sky-400 to-pink-400"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 1, 0.5]
                      }}
                      transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        delay: i * 0.2
                      }}
                    />
                  ))}
                </div>
                <span className="text-sm">Bertha is thinking...</span>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <motion.div 
          className="p-4 border-t border-sky-200/50 backdrop-blur-sm bg-white/50"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <form onSubmit={handleSubmit} className="relative">
            <motion.div 
              className="relative bg-white/80 backdrop-blur-md rounded-lg overflow-hidden border border-sky-200/50"
              whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}
            >
              <motion.div
                className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-sky-400 to-pink-400"
                initial={{ width: "0%" }}
                animate={{ width: input ? "100%" : "0%" }}
                transition={{ duration: 0.3 }}
              />
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Bertha anything..."
                className="w-full bg-transparent px-4 py-3 pr-24 outline-none placeholder:text-slate-400"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
                <motion.button
                  type="button"
                  className="p-2 text-slate-400 hover:text-sky-400 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Paperclip className="w-5 h-5" />
                </motion.button>
                <motion.button
                  type="submit"
                  className={`p-2 ${input.trim() ? 'text-pink-400' : 'text-slate-400'} transition-colors`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  disabled={!input.trim()}
                >
                  <Send className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </div>
  )
}