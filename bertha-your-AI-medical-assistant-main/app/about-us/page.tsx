"use client"

import React, { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import Image from "next/image"
import * as THREE from "three"

const IMAGES = [
  {
    id: "image-1",
    src: "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/M/MAXVER01_Max_Verstappen/maxver01.png",
    alt: "Max Verstappen",
    title: "Aarnav Arya",
  },
  {
    id: "image-2",
    src: "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/C/CHALEC01_Charles_Leclerc/chalec01.png",
    alt: "Charles Leclerc",
    title: "Darsh Thakur ",
  },
  {
    id: "image-3",
    src: "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/L/LANNOR01_Lando_Norris/lannor01.png",
    alt: "Lando Norris",
    title: "Aditya Singh ",
  },
  {
    id: "image-4",
    src: "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/C/CARSAI01_Carlos_Sainz/carsai01.png",
    alt: "Carlos Sainz",
    title: "Shivang Upadhya ",
  },
  {
    id: "image-5",
    src: "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/S/SERPER01_Sergio_Perez/serper01.png",
    alt: "Sergio Perez",
    title: "Bhavya Yadav ",
  },
]

const RADIUS = 250
const THUMBNAIL_SIZE = 60

const FuturisticBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })

    renderer.setSize(window.innerWidth, window.innerHeight)
    containerRef.current.appendChild(renderer.domElement)

    // Create starfield
    const starGeometry = new THREE.BufferGeometry()
    const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.5 })

    const starVertices = []
    for (let i = 0; i < 10000; i++) {
      const x = (Math.random() - 0.5) * 2000
      const y = (Math.random() - 0.5) * 2000
      const z = (Math.random() - 0.5) * 2000
      starVertices.push(x, y, z)
    }

    starGeometry.setAttribute("position", new THREE.Float32BufferAttribute(starVertices, 3))
    const stars = new THREE.Points(starGeometry, starMaterial)
    scene.add(stars)

    // Create nebula
    const nebulaTexture = new THREE.TextureLoader().load("/nebula.jpg")
    const nebulaGeometry = new THREE.SphereGeometry(500, 32, 32)
    const nebulaMaterial = new THREE.MeshBasicMaterial({ map: nebulaTexture, transparent: true, opacity: 0.3 })
    const nebula = new THREE.Mesh(nebulaGeometry, nebulaMaterial)
    scene.add(nebula)

    // Create glowing rings
    const ringGeometry = new THREE.RingGeometry(100, 120, 64)
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ffff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.5,
    })
    const ring = new THREE.Mesh(ringGeometry, ringMaterial)
    ring.rotation.x = Math.PI / 2
    scene.add(ring)

    camera.position.z = 1000

    const animate = () => {
      requestAnimationFrame(animate)
      stars.rotation.y += 0.0002
      nebula.rotation.y += 0.0001
      ring.rotation.z += 0.001
      renderer.render(scene, camera)
    }

    animate()

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      containerRef.current?.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={containerRef} className="absolute inset-0 z-0" />
}

export default function AboutUs() {
  const [selectedImage, setSelectedImage] = useState(IMAGES[0])
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <FuturisticBackground />

      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,255,0.1),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(255,165,0,0.1),transparent_30%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_100%,rgba(255,165,0,0.1),transparent_30%)]" />

        {/* Reduced floating dots effect */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
            initial={{ x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 20 + 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}

        {/* Mouse follower effect */}
        <motion.div
          className="absolute w-64 h-64 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(0,255,255,0.1) 0%, transparent 70%)",
            x: mousePosition.x - 128,
            y: mousePosition.y - 128,
          }}
        />
      </div>

      {/* Navigation */}
      <div className="absolute top-4 left-4 z-50">
        <Link href="/" passHref>
          <motion.a
            whileHover={{ scale: 1.05, x: -5 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center text-white hover:text-cyan-400 transition-colors cursor-pointer"
          >
            <ArrowLeft className="mr-2" /> Back to Home
          </motion.a>
        </Link>
      </div>

      {/* Main Content */}
      <div className="relative min-h-screen flex items-center justify-center z-20">
        {/* Central Image Display */}
        <motion.div
          className="relative w-[600px] h-[600px] rounded-full overflow-hidden bg-black/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedImage.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              transition={{ duration: 0.4 }}
              className="relative w-full h-full"
            >
              <Image
                src={selectedImage.src || "/placeholder.svg"}
                alt={selectedImage.alt}
                fill
                className="object-cover"
                priority
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50" />
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Circular Navigation */}
        <div className="absolute inset-0">
          <div className="relative w-full h-full">
            {IMAGES.map((image, index) => {
              const angle = (index / IMAGES.length) * 2 * Math.PI
              const x = Math.cos(angle) * RADIUS
              const y = Math.sin(angle) * RADIUS

              return (
                <motion.button
                  key={image.id}
                  className={`absolute rounded-full overflow-hidden border-2 
                    ${selectedImage.id === image.id ? "border-cyan-400" : "border-cyan-900"}
                    hover:border-cyan-400 transition-colors`}
                  style={{
                    width: `${THUMBNAIL_SIZE}px`,
                    height: `${THUMBNAIL_SIZE}px`,
                    left: `calc(50% + ${x}px - ${THUMBNAIL_SIZE / 2}px)`,
                    top: `calc(50% + ${y}px - ${THUMBNAIL_SIZE / 2}px)`,
                  }}
                  onClick={() => setSelectedImage(image)}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.2 }}
                >
                  <Image
                    src={image.src || "/placeholder.svg"}
                    alt={image.alt}
                    width={THUMBNAIL_SIZE}
                    height={THUMBNAIL_SIZE}
                    className="object-cover w-full h-full"
                    unoptimized
                  />
                </motion.button>
              )
            })}
          </div>
        </div>

        {/* Title Overlay */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="absolute bottom-8 left-0 right-0 text-center"
        >
          <h2 className="text-2xl font-bold text-white mb-2">{selectedImage.title}</h2>
          <p className="text-cyan-400 text-sm">Team Member</p>
        </motion.div>
      </div>
    </div>
  )
}

