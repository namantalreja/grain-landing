"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Moon, Sun, Database, Zap, RefreshCw, Cloud, Download, Video, Bot, Mail, Check } from "lucide-react"
import { useState, useEffect, useRef } from "react"

export default function GrainLanding() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [scrollY, setScrollY] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHoveringDesignElement, setIsHoveringDesignElement] = useState(false)
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")
  const [mounted, setMounted] = useState(false)
  const scrollRef = useRef<NodeJS.Timeout | null>(null)
  const mouseRef = useRef<NodeJS.Timeout | null>(null)

  // Check system preference on initial load
  useEffect(() => {
    setMounted(true)
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    setIsDarkMode(prefersDark)
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
    if (mounted) {
      document.documentElement.classList.toggle("dark")
    }
  }

  // Handle waitlist submission
  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || isSubmitting) return

    setIsSubmitting(true)
    
    try {
      // Create a hidden form and submit it to Mailchimp via iframe
      const form = document.createElement('form')
      form.action = 'https://gmail.us9.list-manage.com/subscribe/post?u=348afc9a48688a3033efd0f17&id=dc3f234433&f_id=003358e1f0'
      form.method = 'POST'
      form.target = 'mailchimp-iframe'
      form.style.display = 'none'

      // Add email field
      const emailField = document.createElement('input')
      emailField.type = 'email'
      emailField.name = 'EMAIL'
      emailField.value = email
      form.appendChild(emailField)

      // Add bot prevention field
      const botField = document.createElement('input')
      botField.type = 'text'
      botField.name = 'b_348afc9a48688a3033efd0f17_dc3f234433'
      botField.value = ''
      botField.style.position = 'absolute'
      botField.style.left = '-5000px'
      form.appendChild(botField)

      // Create hidden iframe
      const iframe = document.createElement('iframe')
      iframe.name = 'mailchimp-iframe'
      iframe.style.display = 'none'
      document.body.appendChild(iframe)
      document.body.appendChild(form)

      // Submit form
      form.submit()

      // Clean up
      setTimeout(() => {
        document.body.removeChild(form)
        document.body.removeChild(iframe)
      }, 1000)
      
      // Show success message
      setIsSubmitted(true)
      setSubmitMessage("🎉 You're on the list! We'll notify you when Grain is ready.")
      setEmail("")
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false)
        setSubmitMessage("")
      }, 5000)
    } catch (error) {
      setSubmitMessage("Something went wrong. Please try again.")
      setTimeout(() => setSubmitMessage(""), 3000)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Calculate morphing progress based on scroll - simplified
  const getShapeProgress = () => {
    if (!mounted) return { borderRadius: "50%", rotation: "0deg" }

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

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return null
  }

  return (
    <div
      className={`h-screen w-screen overflow-y-auto bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-slate-950 dark:via-gray-900 dark:to-slate-950 text-gray-900 dark:text-white relative transition-colors duration-500 ${
        isHoveringDesignElement ? "cursor-crosshair" : "cursor-default"
      }`}
      style={{ minHeight: '100vh', width: '100vw', margin: 0, padding: 0 }}
    >
      {/* Custom CSS for enhanced UX - simplified */}
      <style jsx global>{`
        /* Ensure full screen coverage */
        html, body {
          margin: 0;
          padding: 0;
          width: 100%;
          overflow-x: hidden;
        }
        
        ::selection {
          background: ${isDarkMode ? "rgba(127, 127, 127, 0.3)" : "rgba(127, 127, 127, 0.2)"};
          color: ${isDarkMode ? "#ffffff" : "#1f2937"};
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 6px;
        }
        ::-webkit-scrollbar-track {
          background: ${isDarkMode ? "rgba(55, 65, 81, 0.1)" : "rgba(229, 231, 235, 0.5)"};
        }
        ::-webkit-scrollbar-thumb {
          background: ${isDarkMode ? "rgba(75, 85, 99, 0.6)" : "rgba(75, 85, 99, 0.4)"};
          border-radius: 3px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: ${isDarkMode ? "rgba(75, 85, 99, 0.8)" : "rgba(75, 85, 99, 0.6)"};
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

            {/* Waitlist Form */}
            <div className="max-w-sm mx-auto">
              {isSubmitted ? (
                <div className="inline-flex items-center gap-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-full px-6 py-4 text-green-700 dark:text-green-300">
                  <Check className="h-5 w-5" />
                  <span className="text-sm font-medium">You're on the waitlist!</span>
                </div>
              ) : (
                <form onSubmit={handleWaitlistSubmit} className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-3 items-center">
                    <div className="relative flex-1 w-full sm:w-auto">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="w-full pl-9 pr-3 py-2.5 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 dark:focus:ring-gray-400 focus:border-transparent transition-all duration-300 text-sm"
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={isSubmitting || !email}
                      className="rounded-full bg-gray-900 dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-white/90 px-5 py-2.5 text-sm font-medium hover:scale-105 transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none w-full sm:w-auto"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 border-2 border-white dark:border-black border-t-transparent rounded-full animate-spin" />
                          Joining...
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          Join Waitlist
                          <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform duration-300" />
                        </div>
                      )}
                    </Button>
                  </div>
                  {submitMessage && (
                    <p className={`text-sm text-center ${submitMessage.includes('wrong') ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
                      {submitMessage}
                    </p>
                  )}
                </form>
              )}
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-3">
                Be the first to know when Grain launches. No spam, ever.
              </p>
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

                  {/* Demo Image */}
                  <div className="w-full h-full relative overflow-hidden rounded-2xl md:rounded-3xl">
                    <img
                      src="/demo.png"
                      alt="Grain Demo - Data extraction in action"
                      className="w-full h-full object-cover object-top"
                    />
                    
                    {/* Optional overlay for better text readability */}
                    <div className="absolute inset-0 bg-black/10 dark:bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section - Artistic Approach */}
        <section className="py-24 md:py-32 pb-32 md:pb-40 relative" aria-labelledby="features-heading">
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
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 lg:gap-20">
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
            <div className="w-[250px] md:w-[400px] lg:w-[500px] h-[250px] md:h-[400px] lg:h-[500px] rounded-full border border-gray-200 dark:border-white/10 subtle-breathe" />
            <div
              className="w-[350px] md:w-[550px] lg:w-[700px] h-[350px] md:h-[550px] lg:h-[700px] rounded-full border border-gray-100 dark:border-white/5 absolute subtle-breathe"
              style={{ animationDelay: "1s" }}
            />
            <div
              className="w-[450px] md:w-[700px] lg:w-[900px] h-[450px] md:h-[700px] lg:h-[900px] rounded-full border border-gray-300 dark:border-white/3 absolute subtle-breathe"
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

            {/* Second Waitlist Form */}
            <div className="max-w-sm mx-auto">
              {isSubmitted ? (
                <div className="inline-flex items-center gap-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-full px-6 py-3 text-green-700 dark:text-green-300">
                  <Check className="h-5 w-5" />
                  <span className="text-sm font-medium">Welcome to the Grain waitlist!</span>
                </div>
              ) : (
                <form onSubmit={handleWaitlistSubmit} className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-3 items-center">
                    <div className="relative flex-1 w-full">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Your email address"
                        className="w-full pl-9 pr-3 py-2.5 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 dark:focus:ring-gray-400 focus:border-transparent transition-all duration-300 text-sm"
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={isSubmitting || !email}
                      className="rounded-full bg-gray-900 dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-white/90 px-5 py-2.5 text-sm font-medium hover:scale-105 transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none w-full sm:w-auto"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 border-2 border-white dark:border-black border-t-transparent rounded-full animate-spin" />
                          Joining...
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          Get Early Access
                          <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform duration-300" />
                        </div>
                      )}
                    </Button>
                  </div>
                  {submitMessage && (
                    <p className={`text-sm text-center ${submitMessage.includes('wrong') ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
                      {submitMessage}
                    </p>
                  )}
                </form>
              )}
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-3">
                Join other developers and AI teams waiting for early access.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
