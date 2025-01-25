"use client"

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowRight, Mail, Lock, User, Phone,
  Stethoscope, Pill, Syringe, CircuitBoard,
  Cross, Heart, Thermometer, Microscope,
  LigatureIcon as Bandage, Dna, Brain, Eye,
  TreesIcon as Lungs, WormIcon as Virus, BugIcon as Bacteria,
  PowerIcon as Pulse, PillIcon as Capsule, StethoscopeIcon as Stetoscope
} from 'lucide-react';


import Link from "next/link"

function FloatingIcon({ Icon, delay = 0, size = 40, left = "50%", top = "50%", color = 'rose' }) {
  const animationVariants = [
    {
      scale: [1, 1.2, 1],
      rotate: [0, 10, -10, 0]
    },
    {
      scale: [1, 0.8, 1],
      y: [0, -10, 0]
    },
    {
      scale: [1, 1.1, 0.9, 1],
      x: [0, 10, -10, 0]
    }
  ];
  
  

  const selectedVariant = animationVariants[Math.floor(Math.random() * animationVariants.length)];
  const ANIMATION_DURATION = 8;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={selectedVariant}
      

transition={{ 
  duration: ANIMATION_DURATION,
  repeat: Infinity,
  delay,
  ease: "easeInOut"
}}
      className={`absolute ${color === 'rose'  ? 'text-rose-200/20' : 'text-white/10'} pointer-events-none`}
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
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateDimensions(); // Initialize with the current window size
    window.addEventListener('resize', updateDimensions); // Listen for window resize

    return () => window.removeEventListener('resize', updateDimensions); // Cleanup on unmount
  }, []);

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
            x: Math.random() * dimensions.width,
            y: Math.random() * dimensions.height,
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

export default function RegisterPage() {
  const [isLogin, setIsLogin] = useState(false)
  const [showMedicalForm, setShowMedicalForm] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    age: "",
    gender: "",
    allergies: "",
    activeMedication: "",
    otherDetails: ""
  })

  const medicalIcons = [
    { Icon: Stethoscope, delay: 0, size: 48, left: "10%", top: "20%" },
    { Icon: Pill, delay: 5, size: 36, left: "20%", top: "60%" },
    { Icon: Syringe, delay: 2, size: 42, left: "80%", top: "30%" },
    { Icon: CircuitBoard, delay: 7, size: 40, left: "70%", top: "70%" },
    { Icon: Cross, delay: 3, size: 44, left: "30%", top: "40%" },
    { Icon: Heart, delay: 6, size: 38, left: "90%", top: "50%" },
    { Icon: Thermometer, delay: 1, size: 46, left: "15%", top: "80%" },
    { Icon: Microscope, delay: 4, size: 50, left: "85%", top: "15%" },
    { Icon: Bandage, delay: 8, size: 40, left: "40%", top: "75%" },
    { Icon: Dna, delay: 3, size: 52, left: "60%", top: "10%" },
    { Icon: Brain, delay: 9, size: 45, left: "25%", top: "25%" },
    { Icon: Eye, delay: 4, size: 38, left: "75%", top: "45%" },
    { Icon: Lungs, delay: 7, size: 42, left: "45%", top: "85%" },
    { Icon: Virus, delay: 2, size: 36, left: "88%", top: "88%" },
    { Icon: Bacteria, delay: 5, size: 40, left: "5%", top: "40%" },
    { Icon: Pulse, delay: 8, size: 44, left: "95%", top: "35%" },
    { Icon: Capsule, delay: 1, size: 38, left: "35%", top: "95%" },
    { Icon: Stetoscope, delay: 6, size: 46, left: "55%", top: "5%" }
  ];

  

  const handleSubmit = (e) => {
  e.preventDefault();
  const errors = [];
  // Validate password length
  if (formData.password.length < 8) {
    errors.push("Password must be at least 8 characters long.");
  }
  if (formData.password !== formData.confirmPassword) {
    errors.push("Passwords do not match.");
  }
  if (errors.length > 0) {
    alert(errors.join("\n"));
    return;
  }

};
  

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-rose-100 p-6 relative overflow-hidden font-['Poppins']">
      <MovingGradient />
      <FloatingParticles />
      
      {medicalIcons.map((icon, index) => (
        <FloatingIcon key={index} {...icon} color={showMedicalForm ? 'white' : 'rose'} />
      ))}

      <div className="container mx-auto relative z-10">
        <div className="row full-height justify-content-center">
          <div className="col-12 text-center align-self-center py-5">
            <div className="section pb-5 pt-5 pt-sm-2 text-center">
              {!showMedicalForm && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <h6 className="mb-0 pb-3">
                  <motion.span 
  className={`mr-4 cursor-pointer text-2xl font-semibold ${!isLogin ? 'text-rose-600' : 'text-gray-400'}`}
  onClick={() => setIsLogin(false)}
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  Sign Up
</motion.span>
<motion.span 
  className={`cursor-pointer text-2xl font-semibold ${isLogin ? 'text-rose-600' : 'text-gray-400'}`}
  onClick={() => setIsLogin(true)}
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  Log In
</motion.span>

                  </h6>
                </motion.div>
              )}

              <div className="card-3d-wrap mx-auto" style={{ perspective: '1000px' }}>
                <motion.div 
                  className="card-3d-wrapper"
                  animate={{ rotateY: !isLogin ? 180 : 0 }}
                  transition={{ duration: 0.6 }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <AnimatePresence mode="wait">
                    {!showMedicalForm ? (
                      isLogin ? (
                        // Login Form
                        <motion.div
                          key="login"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="card-front bg-white/10 backdrop-blur-sm shadow-2xl p-8 rounded-xl"
                          style={{ backfaceVisibility: 'hidden' }}
                        >
                          <div className="center-wrap">
                            <div className="section text-center">
                              <motion.h4 
                                className="mb-4 pb-3 text-rose-600 text-3xl font-bold"
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                              >
                                Welcome Back
                              </motion.h4>
                              <form onSubmit={handleSubmit} className="space-y-6">
                                <motion.div 
                                  className="form-group relative"
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                >
                                  <input
                                    type="email"
                                    className="w-full px-4 py-3 rounded-lg bg-white/20 border border-rose-100 focus:border-rose-500 outline-none"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                  />
                                  <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 text-rose-400" />
                                </motion.div>
                                <motion.div 
                                  className="form-group relative"
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                >
                                  <input
                                    type="password"
                                    className="w-full px-4 py-3 rounded-lg bg-white/20 border border-rose-100 focus:border-rose-500 outline-none"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                  />
                                  <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 text-rose-400" />
                                </motion.div>
                                <Link href="/main-chat">
                                <motion.button
  type="submit"
  className="w-full py-3 rounded-lg bg-rose-500 hover:bg-rose-600 text-white font-semibold shadow-lg"
  whileHover={{ scale: 1.02, boxShadow: "0 10px 25px -5px rgba(244, 63, 94, 0.4)" }}
  whileTap={{ scale: 0.98 }}
>
  Continue
  <ArrowRight className="inline-block ml-2 w-4 h-4" />
</motion.button>
</Link>

                              </form>
                              <motion.p 
                                className="mt-4 text-center"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                              >
                                <Link href="#" className="text-rose-500 hover:text-rose-600 font-medium">
                                  Forgot your password?
                                </Link>
                              </motion.p>
                            </div>
                          </div>
                        </motion.div>
                      ) : (
                        // Sign Up Form (New Log in)
                        <motion.div
                          key="signup"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="card-back bg-white/10 backdrop-blur-sm shadow-2xl p-8 rounded-xl absolute inset-0"
                          style={{ 
                            backfaceVisibility: 'hidden',
                            transform: 'rotateY(180deg)'
                          }}
                        >
                          <div className="section text-center">
                            <motion.h4 
                              className="mb-3 pb-3 text-rose-600 text-2xl font-bold"
                              initial={{ opacity: 0, y: -20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.2 }}
                            >
                              Make An Account With Us
                            </motion.h4>
                            <form onSubmit={handleSubmit} className="space-y-6">
                              <motion.div 
                                className="form-group relative"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                <input
                                  type="text"
                                  className="w-full px-4 py-3 rounded-lg bg-white/20 border border-rose-100 focus:border-rose-500 outline-none"
                                  placeholder="What do you want us to call you ?  "
                                  value={formData.fullName}
                                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                />
                                <User className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 text-rose-400" />
                              </motion.div>
                              <motion.div 
                                className="form-group relative"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                <input
                                  type="email"
                                  className="w-full px-4 py-3 rounded-lg bg-white/20 border border-rose-100 focus:border-rose-500 outline-none"
                                  placeholder="Your Email"
                                  value={formData.email}
                                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                                <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 text-rose-400" />
                              </motion.div>
                              <motion.div 
                                className="form-group relative"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                <input
                                  type="password"
                                  className="w-full px-4 py-3 rounded-lg bg-white/20 border border-rose-100 focus:border-rose-500 outline-none"
                                  placeholder="Make A Password"
                                  value={formData.password}
                                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                                />
                                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 -mt-4 w-6 h-6 text-rose-400" />
                                <motion.p 
                              className="mt-2 text-left"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.4 }}
                            >
                              <Link href="#" className="text-gray-500 hover:text-grey-600 text-xs font-slim ml-2 relative -top-3">
                                At least 8 characters, but more is fine too.
                              </Link>
                            </motion.p>
                              </motion.div>
                              <motion.div 
  className="form-group relative"
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
>
  <input
    type="password"
    className="w-full px-4 py-3 rounded-lg bg-white/20 border border-rose-100 focus:border-rose-500 outline-none"
    placeholder="Re-enter Your Password"
    value={formData.confirmPassword}
    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
  />
  <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 text-rose-400" />
</motion.div>
                              
                              <Link href="/medical-info/">
  <motion.button
    type="submit"
    className="w-full py-3 rounded-lg bg-rose-500 hover:bg-rose-600 text-white font-semibold shadow-lg"
    whileHover={{ scale: 1.02, boxShadow: "0 10px 25px -5px rgba(244, 63, 94, 0.4)" }}
    whileTap={{ scale: 0.98 }}
  >
    Continue
    <ArrowRight className="inline-block ml-2 w-4 h-4" />
  </motion.button>
</Link>
                            </form>
                          </div>
                        </motion.div> 
                        
                      )
                    )   : (
                      // Medical Information Form
                      <motion.div>
                      </motion.div>)}
                  </AnimatePresence>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}