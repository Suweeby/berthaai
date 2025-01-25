"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion"
import Image from "next/image"
import { MessageSquare, ChevronDown, Search, Calendar } from 'lucide-react'

interface ChatMessage {
  id: string
  timestamp: string
  userInput: string
  berthaOutput: string
}

export default function HistoryPage() {
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      id: "1",
      timestamp: "January 20, 2025 10:30 AM",
      userInput: "What are the symptoms of a common cold?",
      berthaOutput: "Common cold symptoms typically include: runny or stuffy nose, sore throat, cough, congestion, mild body aches, and a low-grade fever. These symptoms usually develop slowly and can last for about 7-10 days."
    },
    {
      id: "2",
      timestamp: "January 20, 2025 10:32 AM",
      userInput: "How can I treat these symptoms at home?",
      berthaOutput: "For home treatment of cold symptoms, you can: 1. Get plenty of rest 2. Stay hydrated with water and warm liquids 3. Use over-the-counter decongestants 4. Try salt water gargles for sore throat 5. Use a humidifier to add moisture to the air. Always consult a healthcare provider if symptoms worsen."
    },
    {
      id: "3",
      timestamp: "January 21, 2025 2:15 PM",
      userInput: "What's the difference between a cold and the flu?",
      berthaOutput: "While colds and flu share some similarities, there are key differences: 1. Onset: Flu symptoms come on suddenly, while cold symptoms develop gradually. 2. Severity: Flu symptoms are generally more severe. 3. Fever: More common and higher with flu. 4. Body aches: More intense with flu. 5. Complications: Flu is more likely to lead to serious health issues. 6. Duration: Flu typically lasts longer than a cold."
    }
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ container: containerRef })
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  const filteredHistory = chatHistory.filter(chat => 
    (searchTerm === "" || chat.userInput.toLowerCase().includes(searchTerm.toLowerCase()) || chat.berthaOutput.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedDate === null || chat.timestamp.includes(selectedDate))
  )

  useEffect(() => {
    // Simulating new messages being added
    const interval = setInterval(() => {
      setChatHistory(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          timestamp: new Date().toLocaleString(),
          userInput: "Random question " + Math.floor(Math.random() * 100),
          berthaOutput: "Random answer " + Math.floor(Math.random() * 100)
        }
      ])
    }, 30000) // Add a new message every 30 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-pink-50 text-slate-800">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto p-8"
      >
        <header className="flex items-center justify-between mb-12">
          <motion.div 
            className="flex items-center gap-6"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
          >
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-sky-400 to-pink-400 p-1">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                <MessageSquare className="w-10 h-10 text-sky-500" />
              </div>
            </div>
            <h1 className="text-5xl font-bold font-serif">Your Chat History</h1>
          </motion.div>
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 120 }}
            className="flex items-center gap-4"
          >
            <div className="relative">
              <input
                type="text"
                placeholder="Search chats..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-white/80 border border-sky-200/50 rounded-full py-2 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-sky-400 placeholder-slate-400"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sky-400" />
            </div>
            <div className="relative">
              <input
                type="date"
                value={selectedDate || ""}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="bg-white/80 border border-sky-200/50 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-sky-400 text-slate-400"
              />
              <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sky-400" />
            </div>
          </motion.div>
        </header>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, type: "spring", stiffness: 100 }}
          className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 mb-8 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-sky-200/10 to-pink-200/10 animate-pulse" />
          <p className="text-2xl relative z-10">
            This page contains all chats with Bertha associated with your account. Scroll to view your conversation history and use the search or date filter to find specific interactions.
          </p>
        </motion.div>

        <div className="relative">
          <motion.div
            ref={containerRef}
            className="space-y-8 max-h-[600px] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-pink-500 scrollbar-track-indigo-800"
          >
            <AnimatePresence>
              {filteredHistory.map((chat, index) => (
                <motion.div
                  key={chat.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
                  className="space-y-6"
                >
                  <motion.div 
                    className="text-slate-500 text-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.2 }}
                  >
                    {chat.timestamp}
                  </motion.div>
                  
                  <motion.div 
                    className="flex items-start justify-end gap-4"
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.3, type: "spring", stiffness: 120 }}
                  >
                    <div className="bg-gradient-to-r from-sky-400 to-pink-400 rounded-2xl p-6 max-w-3xl">
                      <div className="text-xl font-semibold mb-3">User Input</div>
                      <p className="text-slate-800">{chat.userInput}</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-sky-400 to-pink-400 flex-shrink-0 overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=48&width=48"
                        alt="User"
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </motion.div>

                  <motion.div 
                    className="flex items-start gap-4"
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.4, type: "spring", stiffness: 120 }}
                  >
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-sky-400 to-pink-400 flex-shrink-0 overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=48&width=48"
                        alt="Bertha"
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="bg-white/80 backdrop-blur-sm border border-sky-200/50 rounded-2xl p-6 max-w-3xl">
                      <div className="text-xl font-semibold mb-3">Bertha output</div>
                      <p className="text-slate-800">{chat.berthaOutput}</p>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-sky-50 to-transparent pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          />
          <motion.div
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, type: "spring", stiffness: 120 }}
          >
            <ChevronDown className="w-8 h-8 text-sky-400 animate-bounce" />
          </motion.div>
        </div>
        <motion.div 
          className="h-1 bg-gradient-to-r from-sky-400 to-pink-400 mt-4 rounded-full"
          style={{ scaleX }}
        />
      </motion.div>
    </div>
  )
}

