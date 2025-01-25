"use client"

import { motion } from "framer-motion"
import { ArrowLeft } from 'lucide-react'
import Link from "next/link"

export default function WarningPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white relative overflow-hidden">
      {/* Ambient Background Animations */}
      <motion.div 
        className="fixed inset-0 pointer-events-none"
        animate={{
          background: [
            "radial-gradient(600px at 0% 0%, rgba(186, 230, 253, 0.05), transparent 70%)",
            "radial-gradient(600px at 100% 0%, rgba(249, 168, 212, 0.05), transparent 70%)",
            "radial-gradient(600px at 100% 100%, rgba(186, 230, 253, 0.05), transparent 70%)",
            "radial-gradient(600px at 0% 100%, rgba(249, 168, 212, 0.05), transparent 70%)",
          ]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />

      {/* Floating Particles */}
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-gradient-to-r from-sky-200/20 to-pink-200/20 rounded-full"
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

      {/* Content Container */}
      <div className="max-w-4xl mx-auto px-6 py-12 relative z-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <motion.div 
            className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm"
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          />
          <Link href="/main-chat">
            <motion.button
              className="px-6 py-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors flex items-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ArrowLeft className="w-4 h-4" />
              GO back
            </motion.button>
          </Link>
        </div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <motion.h1 
            className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-sky-200 to-pink-200"
            animate={{
              scale: [1, 1.01, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
          >
            This is a warning regarding the limitations of Bertha
          </motion.h1>

          <motion.p 
            className="text-lg text-gray-300 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Bertha is an AI and can make mistakes, please consult an actual medical professional for more accurate insight about your health conditions and to avoid a risk of misdiagnosis due to technical faults.
          </motion.p>

          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-2xl font-semibold mb-4">Is Bertha a misleading response ?</h2>
            <p className="text-gray-300 leading-relaxed">
              "hallucinating" responses are possible to come around as a byproduct of current limitation we face on our end. This can lead to sure sounding statements being shown that are not based on facts resulting in confusion and more damaging results. We apologies for any misunderstanding this cna lead to and advice the user to always take professional opinion on matters once done consulting Bertha to have a better understanding of their own condition.
            </p>
          </motion.div>

          <motion.div
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <p className="text-gray-300">
              Moreover, we are actively working on bettering ourselves so please contact us on feedback@berthaai.com reporting such instances to help us improve.
            </p>

            <p className="text-gray-300">
              We hope you have a good time using Bertha :) .
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

