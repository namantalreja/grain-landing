"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Moon, Sun, Database, Zap, RefreshCw, Cloud, Download, Video, Bot } from "lucide-react"
import { useState, useEffect, useRef } from "react"

export default function GrainLanding() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [scrollY, setScrollY] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHoveringDesignElement, setIsHoveringDesignElement] = useState(false)
  const scrollRef = useRef<NodeJS.Timeout | null>(null)
  const mouseRef = useRef<NodeJS.Timeout | null>(null)

  // Check system preference on initial load
  useEffect(() => {
    if (typeof window !== "undefined") {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      setIsDarkMode(prefersDark)
    }
  }, [])

  // Handle scroll for morphing animation with debounce
  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        clearTimeout(scrollRef.current)
      }

      scrollRef.current = setTimeout(() => {
        setScrollY(window.scrollY)
      }, 10) // Small debounce for smoother performance
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      if (scrollRef.current) clearTimeout(scrollRef.current)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Track mouse position for magnetic effects with debounce
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (mouseRef.current) {
        clearTimeout(mouseRef.current)
      }

      mouseRef.current = setTimeout(() => {
        setMousePosition({ x: e.clientX, y: e.clientY })
      }, 10) // Small debounce for smoother performance
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    return () => {
      if (mouseRef.current) clearTimeout(mouseRef.current)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle("dark")
  }

  // Calculate morphing progress based on scroll - simplified
  const getShapeProgress = () => {
    if (typeof window === "undefined") return { borderRadius: "50%", rotation: "0deg" }

    const windowHeight = window.innerHeight
    const totalScrollHeight = document.documentElement.scrollHeight - windowHeight

    // Avoid division by zero
    if (totalScrollHeight <= 0) return { borderRadius: "50%", rotation: "0deg" }

    // First transition: circle to square (0% to 40% of scroll)
    const firstTransition = Math.min(scrollY / (totalScrollHeight * 0.4), 1)

    // Second transition: square back to circle (60% to 100% of scroll)
    const secondTransitionStart = totalScrollHeight * 0.6
    const secondTransition = Math.max(0, Math.min((scrollY - secondTransitionStart) / (totalScrollHeight * 0.4), 1))

    // Calculate border radius
    let borderRadius = "50%"
    if (secondTransition > 0) {
      // Morphing back to circle
      borderRadius = `${secondTransition * 50}%`
    } else {
      // Morphing to square
      borderRadius = `${(1 - firstTransition) * 50}%`
    }

    // Calculate rotation - simplified
    const rotation = `${firstTransition * 20 - secondTransition * 20}deg`

    return { borderRadius, rotation }
  }

  const { borderRadius, rotation } = getShapeProgress()

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-slate-950 dark:via-gray-900 dark:to-slate-950 text-gray-900 dark:text-white relative transition-colors duration-500 ${
        isHoveringDesignElement ? "cursor-crosshair" : "cursor-default"
      }`}
    >
      {/* Custom CSS for enhanced UX - simplified */}
      <style jsx global>{`
        ::selection {
          background: ${isDarkMode ? "rgba(168, 85, 247, 0.3)" : "rgba(147, 51, 234, 0.2)"};
          color: ${isDarkMode ? "#ffffff" : "#1f2937"};
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 6px;
        }
        ::-webkit-scrollbar-track {
          background: ${isDarkMode ? "rgba(15, 23, 42, 0.1)" : "rgba(243, 244, 246, 0.5)"};
        }
        ::-webkit-scrollbar-thumb {
          background: ${isDarkMode ? "rgba(168, 85, 247, 0.3)" : "rgba(147, 51, 234, 0.3)"};
          border-radius: 3px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: ${isDarkMode ? "rgba(168, 85, 247, 0.5)" : "rgba(147, 51, 234, 0.5)"};
        }

        /* Breathing animation - simplified */
        @keyframes subtle-breathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.01); }
        }
        
        .subtle-breathe {
          animation: subtle-breathe 6s ease-in-out infinite;
          will-change: transform;
        }

        /* Hardware acceleration for performance */
        .hw-accelerate {
          transform: translateZ(0);
          will-change: transform;
        }
      `}</style>

      {/* Artistic Background */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,rgba(100,116,139,0.03),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_at_center,rgba(148,163,184,0.08),rgba(0,0,0,0))]" />
      <div className="fixed top-0 left-0 w-full h-full">
        <div className="absolute top-[10%] left-[5%] w-32 md:w-64 h-32 md:h-64 rounded-full bg-gradient-to-r from-gray-500/3 to-slate-500/3 dark:from-gray-500/10 dark:to-gray-600/10 blur-3xl subtle-breathe" />
        <div
          className="absolute top-[40%] right-[10%] w-40 md:w-80 h-40 md:h-80 rounded-full bg-gradient-to-r from-gray-400/3 to-gray-500/3 dark:from-gray-500/10 dark:to-gray-600/10 blur-3xl subtle-breathe"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute bottom-[15%] left-[15%] w-36 md:w-72 h-36 md:h-72 rounded-full bg-gradient-to-r from-slate-400/3 to-gray-500/3 dark:from-gray-500/10 dark:to-gray-600/10 blur-3xl subtle-breathe"
          style={{ animationDelay: "2s" }}
        />
      </div>

      {/* Main Content */}
      <main className="relative z-10">
        {/* Responsive Navigation */}
        <nav className="fixed top-4 md:top-8 right-4 md:right-8 z-50" role="navigation" aria-label="Main navigation">
          <div className="flex items-center gap-3 md:gap-6">
            <Button
              variant="ghost"
              onClick={toggleTheme}
              className="text-sm md:text-lg font-light text-gray-600 dark:text-white/70 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100/50 dark:hover:bg-white/5 transition-all duration-300 px-2 md:px-4 rounded-full group"
              aria-label="Toggle between light and dark theme"
            >
              <div className="group-hover:rotate-180 transition-transform duration-500">
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </div>
            </Button>
            <Button
              variant="ghost"
              className="text-sm md:text-lg font-light text-gray-600 dark:text-white/70 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100/50 dark:hover:bg-white/5 transition-all duration-300 px-2 md:px-4"
              onClick={() => {
                const element = document.getElementById("showcase-heading")
                if (element) {
                  const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
                  const offsetPosition = elementPosition - 100 // Scroll 100px higher
                  window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth",
                  })
                }
              }}
            >
              Demo
            </Button>
            <Button
              variant="ghost"
              className="text-sm md:text-lg font-light text-gray-600 dark:text-white/70 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100/50 dark:hover:bg-white/5 transition-all duration-300 px-2 md:px-4"
              onClick={() => {
                const element = document.getElementById("features-heading")
                if (element) {
                  const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
                  const offsetPosition = elementPosition - 100 // Scroll 100px higher
                  window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth",
                  })
                }
              }}
            >
              Superpowers
            </Button>
            <Button className="rounded-full bg-gray-900 dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-white/90 px-3 md:px-6 py-1.5 md:py-2 text-sm md:text-base hover:scale-105 transition-all duration-300 hover:shadow-lg">
              Get Started
            </Button>
          </div>
        </nav>

        {/* Creative Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-8 md:px-12 lg:px-16 relative">
          {/* Morphing Circles/Squares - simplified with CSS variables */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[600px] lg:w-[800px] h-[400px] md:h-[600px] lg:h-[800px] border border-gray-200 dark:border-white/5 transition-all duration-500 ease-out hw-accelerate"
            style={{
              borderRadius,
              transform: `translate(-50%, -50%) rotate(${rotation})`,
            }}
          />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[450px] lg:w-[600px] h-[300px] md:h-[450px] lg:h-[600px] border border-gray-200 dark:border-white/10 transition-all duration-500 ease-out hw-accelerate"
            style={{
              borderRadius,
              transform: `translate(-50%, -50%) rotate(${rotation === "0deg" ? "0deg" : `-${rotation}`})`,
            }}
          />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] md:w-[300px] lg:w-[400px] h-[200px] md:h-[300px] lg:h-[400px] border border-gray-300 dark:border-white/20 transition-all duration-500 ease-out hw-accelerate"
            style={{
              borderRadius,
              transform: `translate(-50%, -50%) rotate(${rotation === "0deg" ? "0deg" : `${Number.parseFloat(rotation) * 0.5}deg`})`,
            }}
          />

          <div className="max-w-6xl mx-auto text-center relative">
            <Badge
              variant="outline"
              className="hidden md:inline-flex mb-8 md:mb-12 text-xs md:text-sm font-light border-gray-300 dark:border-white/20 text-gray-600 dark:text-white/80 px-3 md:px-4 py-1.5 md:py-2 items-center"
            >
              <Bot className="w-3 h-3 mr-2" />
              Your AI needs the right grain
            </Badge>

            <h1 className="text-[6rem] md:text-[10rem] lg:text-[12rem] font-bold mb-8 md:mb-12 group cursor-default">
              <span className="block bg-gradient-to-r from-gray-700 to-gray-900 dark:from-gray-200 dark:to-gray-400 bg-clip-text text-transparent group-hover:tracking-wide transition-all duration-500">
                grain
              </span>
            </h1>

            <p className="text-base md:text-lg lg:text-xl text-gray-700 dark:text-white/80 mb-12 md:mb-16 max-w-3xl mx-auto leading-relaxed font-light">
              The data layer for AI. Want your model to reason over 200 KPIs from 1500 websites? We make that seamless.
            </p>

            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-gray-600 to-gray-800 dark:from-gray-300 dark:to-gray-100 p-[1px] rounded-full group hover:scale-105 transition-all duration-300 hover:shadow-xl">
              <Button className="rounded-full bg-white dark:bg-black text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-black/90 px-6 md:px-8 py-4 md:py-6 text-lg md:text-xl group">
                Start Extracting Data
                <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </div>
          </div>
        </section>

        {/* Creative Showcase */}
        <section className="py-24 md:py-32 relative" aria-labelledby="showcase-heading">
          <div className="max-w-6xl mx-auto px-8 md:px-12 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
              {/* Left Column */}
              <div className="lg:col-span-5 flex flex-col justify-start lg:pr-16 mb-16 lg:mb-0">
                <h2
                  id="showcase-heading"
                  className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 md:mb-12 leading-tight"
                >
                  From chaos to{" "}
                  <span className="bg-gradient-to-r from-gray-600 to-gray-800 dark:from-gray-300 dark:to-gray-100 bg-clip-text text-transparent">
                    context
                  </span>
                </h2>
                <p className="text-base md:text-lg lg:text-xl text-gray-700 dark:text-white/70 mb-8 md:mb-12 leading-relaxed">
                  LLMs understand language but lack your context. Grain bridges that gap with fast extraction, smart
                  cleaning, and instant AI integration.
                </p>
                <div className="flex items-center gap-6 md:gap-8">
                  <div className="w-16 md:w-20 h-[2px] bg-gradient-to-r from-gray-600 to-gray-800 dark:from-gray-300 dark:to-gray-100" />
                  <p className="text-sm md:text-base text-gray-500 dark:text-white/50">
                    Perfect for developers and AI teams
                  </p>
                </div>
              </div>

              {/* Right Column - Demo Video */}
              <div className="lg:col-span-7 relative">
                <div className="absolute -top-10 md:-top-20 -left-10 md:-left-20 w-20 md:w-40 h-20 md:h-40 rounded-full bg-gradient-to-r from-gray-500/5 to-gray-600/5 dark:from-gray-500/10 dark:to-gray-600/10 blur-3xl" />
                <div className="absolute -bottom-10 md:-bottom-20 -right-10 md:-right-20 w-20 md:w-40 h-20 md:h-40 rounded-full bg-gradient-to-r from-gray-500/5 to-gray-600/5 dark:from-gray-500/10 dark:to-gray-600/10 blur-3xl" />

                <div
                  className="relative w-full h-[300px] md:h-[400px] lg:h-[450px] rounded-2xl md:rounded-3xl bg-gradient-to-br from-gray-500/8 to-slate-500/8 dark:from-gray-500/10 dark:to-gray-600/10 backdrop-blur-sm border border-gray-300 dark:border-gray-600 shadow-lg overflow-hidden group hover:scale-[1.02] hover:shadow-xl transition-all duration-500"
                  onMouseEnter={() => setIsHoveringDesignElement(true)}
                  onMouseLeave={() => setIsHoveringDesignElement(false)}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-500/5 to-slate-500/5 dark:from-gray-500/10 dark:to-gray-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Video placeholder */}
                  <div className="w-full h-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center relative">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
                        <Video className="w-8 h-8 text-gray-500 dark:text-gray-400" />
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Demo Video</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">See Grain in action</p>
                    </div>

                    {/* Play button overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-20 h-20 rounded-full bg-white/90 dark:bg-black/90 flex items-center justify-center shadow-lg">
                        <div className="w-0 h-0 border-l-[12px] border-l-gray-800 dark:border-l-white border-y-[8px] border-y-transparent ml-1"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section - Artistic Approach */}
        <section className="py-24 md:py-32 relative" aria-labelledby="features-heading">
          <div className="max-w-6xl mx-auto px-8 md:px-12 lg:px-16">
            <div className="mb-20 md:mb-28 max-w-3xl">
              <h2
                id="features-heading"
                className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 md:mb-12 leading-tight"
              >
                <span className="bg-gradient-to-r from-gray-600 to-gray-800 dark:from-gray-300 dark:to-gray-100 bg-clip-text text-transparent">
                  Superpowers
                </span>{" "}
                included
              </h2>
              <p className="text-base md:text-lg lg:text-xl text-gray-700 dark:text-white/70 leading-relaxed">
                Everything you need to transform raw data into AI-ready context. No more data wrangling headaches.
              </p>
            </div>

            <div className="relative">
              {/* Artistic Feature Display */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-20 lg:gap-28">
                <article className="relative">
                  <div className="absolute -top-5 md:-top-10 -left-5 md:-left-10 w-20 md:w-40 h-20 md:h-40 rounded-full bg-gradient-to-r from-gray-500/5 to-gray-600/5 dark:from-gray-500/10 dark:to-gray-600/10 blur-3xl" />
                  <div className="mb-8 md:mb-12 w-16 md:w-20 h-16 md:h-20 rounded-2xl md:rounded-3xl bg-gradient-to-r from-gray-500/5 to-gray-600/5 dark:from-gray-500/10 dark:to-gray-600/10 backdrop-blur-sm border border-gray-200 dark:border-white/10 flex items-center justify-center shadow-sm">
                    <Zap className="w-8 md:w-10 h-8 md:h-10 text-gray-600 dark:text-gray-400" />
                  </div>
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-6 md:mb-8 text-gray-900 dark:text-white">
                    Fast Extraction
                  </h3>
                  <p className="text-base md:text-lg text-gray-700 dark:text-white/70 leading-relaxed mb-8 md:mb-12">
                    Paste links and get perfectly typed tables in minutes. No more manual data entry or complex scraping
                    scripts.
                  </p>
                  <div className="grid grid-cols-3 gap-3 md:gap-4">
                    <div className="h-16 md:h-36 rounded-xl md:rounded-2xl bg-gradient-to-br from-gray-500/8 to-slate-500/8 dark:from-gray-500/10 dark:to-gray-600/10 backdrop-blur-sm border border-gray-300 dark:border-gray-600 shadow-sm flex items-center justify-center group hover:scale-105 hover:-rotate-1 hover:shadow-lg transition-all duration-500">
                      <div className="text-xs font-mono text-gray-500 group-hover:text-gray-600 transition-colors duration-300">
                        URL
                      </div>
                    </div>
                    <div className="h-16 md:h-36 rounded-xl md:rounded-2xl bg-gradient-to-br from-slate-500/8 to-gray-500/8 dark:from-gray-500/10 dark:to-gray-600/10 backdrop-blur-sm border border-gray-300 dark:border-gray-600 shadow-sm flex items-center justify-center group hover:scale-105 hover:shadow-lg transition-all duration-500 delay-75">
                      <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-gray-600 group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                    <div className="h-16 md:h-36 rounded-xl md:rounded-2xl bg-gradient-to-br from-gray-500/8 to-slate-500/8 dark:from-gray-500/10 dark:to-gray-600/10 backdrop-blur-sm border border-gray-300 dark:border-gray-600 shadow-sm flex items-center justify-center group hover:scale-105 hover:rotate-1 hover:shadow-lg transition-all duration-500 delay-150">
                      <Database className="w-6 h-6 text-gray-500 group-hover:text-gray-600 group-hover:scale-110 transition-all duration-300" />
                    </div>
                  </div>
                </article>

                <article className="relative">
                  <div className="absolute -top-5 md:-top-10 -right-5 md:-right-10 w-20 md:w-40 h-20 md:h-40 rounded-full bg-gradient-to-r from-gray-500/5 to-gray-600/5 dark:from-gray-500/10 dark:to-gray-600/10 blur-3xl" />
                  <div className="mb-8 md:mb-12 w-16 md:w-20 h-16 md:h-20 rounded-2xl md:rounded-3xl bg-gradient-to-r from-gray-500/5 to-gray-600/5 dark:from-gray-500/10 dark:to-gray-600/10 backdrop-blur-sm border border-gray-200 dark:border-white/10 flex items-center justify-center shadow-sm">
                    <RefreshCw className="w-8 md:w-10 h-8 md:h-10 text-gray-600 dark:text-gray-400" />
                  </div>
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-6 md:mb-8 text-gray-900 dark:text-white">
                    Live Pipelines
                  </h3>
                  <p className="text-base md:text-lg text-gray-700 dark:text-white/70 leading-relaxed mb-8 md:mb-12">
                    Sources change? Tables refresh automatically. Keep your AI agents updated with the latest data
                    without manual intervention.
                  </p>
                  <div className="grid grid-cols-2 gap-3 md:gap-4">
                    <div className="h-24 md:h-36 rounded-xl md:rounded-2xl bg-gradient-to-br from-gray-500/8 to-slate-500/8 dark:from-gray-500/10 dark:to-gray-600/10 backdrop-blur-sm border border-gray-300 dark:border-gray-600 shadow-sm flex flex-col items-center justify-center gap-2 group hover:scale-105 hover:-rotate-1 hover:shadow-lg transition-all duration-500">
                      <RefreshCw className="w-4 h-4 text-gray-500 group-hover:text-gray-600 group-hover:rotate-180 transition-all duration-500" />
                      <div className="w-8 h-1 bg-gradient-to-r from-gray-400 to-slate-400 rounded-full group-hover:w-10 transition-all duration-300" />
                    </div>
                    <div className="h-24 md:h-36 rounded-xl md:rounded-2xl bg-gradient-to-br from-slate-500/8 to-gray-500/8 dark:from-gray-500/10 dark:to-gray-600/10 backdrop-blur-sm border border-gray-300 dark:border-gray-600 shadow-sm flex flex-col items-center justify-center gap-2 group hover:scale-105 hover:rotate-1 hover:shadow-lg transition-all duration-500 delay-75">
                      <Database className="w-4 h-4 text-slate-500 group-hover:text-slate-600 group-hover:scale-110 transition-all duration-300" />
                      <div className="w-6 h-1 bg-gradient-to-r from-slate-400 to-gray-400 rounded-full group-hover:w-8 transition-all duration-300" />
                    </div>
                  </div>
                </article>

                <article className="relative group">
                  <div className="absolute -bottom-5 md:-bottom-10 -left-5 md:-left-10 w-20 md:w-40 h-20 md:h-40 rounded-full bg-gradient-to-r from-gray-500/5 to-gray-600/5 dark:from-gray-500/10 dark:to-gray-600/10 blur-3xl" />
                  <div className="mb-8 md:mb-12 w-16 md:w-20 h-16 md:h-20 rounded-2xl md:rounded-3xl bg-gradient-to-r from-gray-500/5 to-gray-600/5 dark:from-gray-500/10 dark:to-gray-600/10 backdrop-blur-sm border border-gray-200 dark:border-white/10 flex items-center justify-center shadow-sm">
                    <Cloud className="w-8 md:w-10 h-8 md:h-10 text-gray-600 dark:text-gray-400" />
                  </div>
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-6 md:mb-8 text-gray-900 dark:text-white">
                    Context Cloud
                  </h3>
                  <p className="text-base md:text-lg text-gray-700 dark:text-white/70 leading-relaxed mb-8 md:mb-12">
                    Eliminate redundancy. Any future agent can query your data in milliseconds with our smart caching
                    layer.
                  </p>
                  <div className="relative h-32 md:h-40 overflow-hidden rounded-xl md:rounded-2xl bg-gradient-to-b from-gray-500/8 via-slate-500/8 to-transparent dark:from-gray-500/10 dark:via-gray-600/10 dark:to-transparent backdrop-blur-sm border border-gray-300 dark:border-gray-600 shadow-sm">
                    {/* Cloud visualization */}
                    <div className="absolute inset-0 p-2 md:p-3">
                      <div className="grid grid-cols-4 gap-1 md:gap-1.5 h-full">
                        {/* Data nodes */}
                        <div className="col-span-2 h-6 md:h-8 rounded bg-gray-400/60 group-hover:bg-gray-500/60 transition-colors duration-300" />
                        <div className="col-span-1 h-6 md:h-8 rounded bg-slate-400/60 group-hover:bg-slate-500/60 transition-colors duration-300" />
                        <div className="col-span-1 h-6 md:h-8 rounded bg-gray-400/60 group-hover:bg-gray-500/60 transition-colors duration-300" />

                        <div className="col-span-1 h-6 md:h-8 rounded bg-slate-400/50 group-hover:bg-slate-500/50 transition-colors duration-300" />
                        <div className="col-span-3 h-6 md:h-8 rounded bg-gray-400/50 group-hover:bg-gray-500/50 transition-colors duration-300" />

                        <div className="col-span-3 h-6 md:h-8 rounded bg-gray-400/40 group-hover:bg-gray-500/40 transition-colors duration-300" />
                        <div className="col-span-1 h-6 md:h-8 rounded bg-gray-400/40 group-hover:bg-gray-500/40 transition-colors duration-300" />

                        <div className="col-span-2 h-6 md:h-8 rounded bg-slate-400/30 group-hover:bg-slate-500/30 transition-colors duration-300" />
                        <div className="col-span-2 h-6 md:h-8 rounded bg-gray-400/30 group-hover:bg-gray-500/30 transition-colors duration-300" />

                        <div className="col-span-1 h-4 md:h-6 rounded bg-gray-400/20 group-hover:bg-gray-500/20 transition-colors duration-300" />
                        <div className="col-span-2 h-4 md:h-6 rounded bg-slate-400/20 group-hover:bg-slate-500/20 transition-colors duration-300" />
                        <div className="col-span-1 h-4 md:h-6 rounded bg-gray-400/20 group-hover:bg-gray-500/20 transition-colors duration-300" />
                      </div>
                    </div>

                    {/* Fade out gradient */}
                    <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white dark:from-slate-950 to-transparent pointer-events-none" />

                    {/* Hover effect overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-gray-500/5 to-slate-500/5 dark:from-gray-500/10 dark:to-gray-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </article>

                <article className="relative">
                  <div className="absolute -bottom-5 md:-bottom-10 -right-5 md:-right-10 w-20 md:w-40 h-20 md:h-40 rounded-full bg-gradient-to-r from-gray-500/5 to-gray-600/5 dark:from-gray-500/10 dark:to-gray-600/10 blur-3xl" />
                  <div className="mb-8 md:mb-12 w-16 md:w-20 h-16 md:h-20 rounded-2xl md:rounded-3xl bg-gradient-to-r from-gray-500/5 to-gray-600/5 dark:from-gray-500/10 dark:to-gray-600/10 backdrop-blur-sm border border-gray-200 dark:border-white/10 flex items-center justify-center shadow-sm">
                    <Download className="w-8 md:w-10 h-8 md:h-10 text-gray-600 dark:text-gray-400" />
                  </div>
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-6 md:mb-8 text-gray-900 dark:text-white">
                    End-to-End Integration
                  </h3>
                  <p className="text-base md:text-lg text-gray-700 dark:text-white/70 leading-relaxed mb-8 md:mb-12">
                    Need it in Excel? SQL? R? Python? You got it. Export to any format or integrate directly with your
                    existing tools.
                  </p>
                  <div className="h-20 md:h-40 rounded-xl md:rounded-2xl bg-gradient-to-br from-gray-500/8 to-slate-500/8 dark:from-gray-500/10 dark:to-gray-600/10 backdrop-blur-sm border border-gray-300 dark:border-gray-600 shadow-sm flex items-center justify-center group hover:scale-105 hover:shadow-lg transition-all duration-500">
                    <div className="flex items-center gap-3 group-hover:gap-4 transition-all duration-300">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-gray-400 to-slate-400 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Download className="w-4 h-4 text-white group-hover:rotate-12 transition-transform duration-300" />
                      </div>
                      <div className="text-sm font-medium text-gray-600 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300">
                        Export Anywhere
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </section>

        {/* Creative Call to Action */}
        <section
          className="min-h-screen flex items-center justify-center relative py-24 md:py-32"
          aria-labelledby="cta-heading"
        >
          {/* Final morphed circles - back to original state */}
          <div className="absolute inset-0 flex items-center justify-center -z-10">
            <div className="w-[300px] md:w-[500px] lg:w-[600px] h-[300px] md:h-[500px] lg:h-[600px] rounded-full border border-gray-200 dark:border-white/10 subtle-breathe" />
            <div
              className="w-[400px] md:w-[650px] lg:w-[800px] h-[400px] md:h-[650px] lg:h-[800px] rounded-full border border-gray-100 dark:border-white/5 absolute subtle-breathe"
              style={{ animationDelay: "1s" }}
            />
            <div
              className="w-[500px] md:w-[800px] lg:w-[1000px] h-[500px] md:h-[800px] lg:h-[1000px] rounded-full border border-gray-300 dark:border-white/3 absolute subtle-breathe"
              style={{ animationDelay: "2s" }}
            />
          </div>

          <div className="max-w-4xl mx-auto text-center px-8 md:px-12 lg:px-16 relative z-10">
            <h2
              id="cta-heading"
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-12 md:mb-16 leading-tight text-gray-900 dark:text-white"
            >
              Ready to{" "}
              <span className="bg-gradient-to-r from-gray-600 to-gray-800 dark:from-gray-300 dark:to-gray-100 bg-clip-text text-transparent">
                Extract
              </span>
              ?
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-gray-700 dark:text-white/70 mb-16 md:mb-20 leading-relaxed">
              Stop wrangling data manually. Let Grain transform your messy sources into AI-ready context.
            </p>

            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-gray-600 to-gray-800 dark:from-gray-300 dark:to-gray-100 p-[1px] rounded-full group hover:scale-105 transition-all duration-300 hover:shadow-xl">
              <Button className="rounded-full bg-white dark:bg-black text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-black/90 px-8 md:px-12 py-6 md:py-8 text-base md:text-lg group">
                Start Extracting
                <ArrowRight className="ml-2 md:ml-3 h-5 w-5 md:h-6 md:w-6 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
