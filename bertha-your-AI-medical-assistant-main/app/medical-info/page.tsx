"use client"

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion"
import { ArrowRight } from 'lucide-react'
import { useRouter } from "next/navigation"

function FloatingIcon({ Icon, delay = 0, size = 40, left = "50%", top = "50%", color = 'rose' }) {
  const animationVariants = useMemo(() => [
    { opacity: [0.1, 0.3, 0.1], scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] },
    { opacity: [0.1, 0.3, 0.1], scale: [1, 0.8, 1], y: [0, -10, 0] },
    { opacity: [0.1, 0.3, 0.1], scale: [1, 1.1, 0.9, 1], x: [0, 10, -10, 0] },
  ], []);

  const selectedVariant = animationVariants[Math.floor(Math.random() * animationVariants.length)];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={selectedVariant}
      transition={{ 
        duration: 8,
        repeat: Infinity,
        delay,
        ease: "easeInOut"
      }}
      className={`absolute ${color === 'rose' ? 'text-rose-200/20' : 'text-rose-200/20'} pointer-events-none`}
      style={{
        left,
        top,
      }}
    >
      <Icon size={size} />
    </motion.div>
  );
}

function MovingGradient() {
  return (
    <motion.div
      className="fixed inset-0 pointer-events-none"
      animate={{
        background: [
          "radial-gradient(600px at 0% 0%, rgba(254, 205, 211, 0.2) 0%, transparent 80%)",
          "radial-gradient(600px at 100% 0%, rgba(254, 205, 211, 0.2) 0%, transparent 80%)",
          "radial-gradient(600px at 100% 100%, rgba(254, 205, 211, 0.2) 0%, transparent 80%)",
          "radial-gradient(600px at 0% 100%, rgba(254, 205, 211, 0.2) 0%, transparent 80%)",
          "radial-gradient(600px at 50% 50%, rgba(254, 205, 211, 0.2) 0%, transparent 80%)",
        ]
      }}
      transition={{
        duration: 15,
        repeat: Infinity,
        ease: "linear"
      }}
    />
  );
}

function FloatingParticles() {
  return (
    <motion.div
      className="fixed inset-0 pointer-events-none"
      initial="hidden"
      animate="visible"
    >
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-rose-200/20 rounded-full"
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
    </motion.div>
  );
}

export default function MedicalInfoPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    allergies: "",
    activeMedication: "",
    otherDetails: ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log(formData)
    // Navigate to next page or dashboard
    router.push('/main-chat')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-rose-100 p-6 relative overflow-hidden font-['Poppins']">
      <MovingGradient />
      <FloatingParticles />

      <div className="container mx-auto max-w-2xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/10 backdrop-blur-sm shadow-2xl p-8 rounded-xl"
        >
          <div className="text-center mb-8">
            <motion.h1 
              className="text-3xl font-bold text-rose-600 mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Some Personal Information
            </motion.h1>
            <motion.p 
              className="text-gray-600 text-sm px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Bertha needs this information to be able to help you better in your medical queries, as having this information is extremely helpful specially in cases of allergies, running medications and recent major medical incidents. Please do not take these lightly as fill them untruthfully as that will hinder Bertha's ability to help you. We store this information securely and link it to your email address so Bertha provides a personalized experience every time you ask her something.
            </motion.p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div 
              className="form-group"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <label className="block text-gray-700 mb-2">Age</label>
              <input
                type="number"
                className="w-full px-4 py-3 rounded-lg bg-white/20 border border-rose-100 focus:border-rose-500 outline-none"
                placeholder="ex - 42"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              />
            </motion.div>

            <motion.div 
              className="form-group"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <label className="block text-gray-700 mb-2">Gender</label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-lg bg-white/20 border border-rose-100 focus:border-rose-500 outline-none"
                placeholder="ex - Attack Helicopter"
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              />
            </motion.div>

            <motion.div 
              className="form-group"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <label className="block text-gray-700 mb-2">Allergies, if any</label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-lg bg-white/20 border border-rose-100 focus:border-rose-500 outline-none"
                placeholder="Peanuts, Pollen, Soy etc"
                value={formData.allergies}
                onChange={(e) => setFormData({ ...formData, allergies: e.target.value })}
              />
            </motion.div>

            <motion.div 
              className="form-group"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
            >
              <label className="block text-gray-700 mb-2">Active Medication, if any</label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-lg bg-white/20 border border-rose-100 focus:border-rose-500 outline-none"
                placeholder="Any Painkillers, Antibiotics etc"
                value={formData.activeMedication}
                onChange={(e) => setFormData({ ...formData, activeMedication: e.target.value })}
              />
            </motion.div>

            <motion.div 
              className="form-group"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
            >
              <label className="block text-gray-700 mb-2">Any other medically relevant detail you want to share</label>
              <textarea
                className="w-full px-4 py-3 rounded-lg bg-white/20 border border-rose-100 focus:border-rose-500 outline-none min-h-[100px]"
                placeholder="ex - any operations or accidents"
                value={formData.otherDetails}
                onChange={(e) => setFormData({ ...formData, otherDetails: e.target.value })}
              />
            </motion.div>

            <motion.button
              type="submit"
              className="w-full py-3 rounded-lg bg-rose-500 hover:bg-rose-600 text-white font-semibold shadow-lg mt-8"
              whileHover={{ scale: 1.02, boxShadow: "0 10px 25px -5px rgba(244, 63, 94, 0.4)" }}
              whileTap={{ scale: 0.98 }}
            >
              Press me to finish
              <ArrowRight className="inline-block ml-2 w-4 h-4" />
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  )
}
