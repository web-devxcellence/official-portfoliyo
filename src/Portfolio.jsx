"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useSpring,
  useInView,
} from "framer-motion";
import {
  ArrowRight,
  Download,
  Mail,
  Phone,
  Linkedin,
  Github,
  ExternalLink,
  Code,
  Database,
  Settings,
  Award,
  Moon,
  Sun,
  Send,
  Menu,
  X,
  Sparkles,
  Zap,
  Target,
  Star,
  Heart,
  Coffee,
  Rocket,
  Globe,
  Layers,
  Terminal,
  Cpu,
  Palette,
  Box,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { GITHUB, GOOGLE_DRIVE_LINK, LINKED_IN } from "./lib/constants";

// Floating particles component
const FloatingParticles = ({ darkMode }) => {
  const [particles] = useState(() =>
    Array.from({ length: 50 }, (_, i) => ({
      id: i,
      size: Math.random() * 4 + 1,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5,
    }))
  );

  if (particles.length === 0) {
    return null; // or return a loading state if needed
  }

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          // ... rest of your particle rendering code
        />
      ))}
    </div>
  );
};

// Animated gradient orb
const GradientOrb = ({ className, delay = 0 }) => (
  <motion.div
    className={`absolute rounded-full blur-3xl ${className}`}
    animate={{
      scale: [1, 1.2, 1],
      opacity: [0.3, 0.5, 0.3],
    }}
    transition={{
      duration: 8,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

// Animated counter component
const AnimatedCounter = ({ value, suffix = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      const num = parseInt(value);
      const duration = 2000;
      const steps = 60;
      const increment = num / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= num) {
          setCount(num);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
};

// Project images from Unsplash
const projectImages = {
  Properlydone:
    "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
  "Collab CRM":
    "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
  "Arranged Sugar":
    "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
  "Aakash LMS":
    "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&q=80",
};

// Skill icons mapping
const skillIcons = {
  React: <Layers className="h-4 w-4" />,
  "Next.js": <Globe className="h-4 w-4" />,
  TypeScript: <Terminal className="h-4 w-4" />,
  "Tailwind CSS": <Palette className="h-4 w-4" />,
  "Framer Motion": <Sparkles className="h-4 w-4" />,
  "Redux Toolkit": <Box className="h-4 w-4" />,
  Zustand: <Cpu className="h-4 w-4" />,
  "TanStack Query": <Database className="h-4 w-4" />,
  GraphQL: <Code className="h-4 w-4" />,
  "Git & GitHub": <Github className="h-4 w-4" />,
  "Vercel/Netlify": <Rocket className="h-4 w-4" />,
  Docker: <Box className="h-4 w-4" />,
  Figma: <Palette className="h-4 w-4" />,
};

export default function Portfolio() {
  const [darkMode, setDarkMode] = useState(true);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeSection, setActiveSection] = useState("hero");
  const { scrollYProgress } = useScroll();
  const heroRef = useRef(null);

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const smoothProgress = useSpring(scrollYProgress, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "hero",
        "about",
        "experience",
        "projects",
        "skills",
        "contact",
      ];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setForm({ name: "", email: "", message: "" });
    }, 3000);
  };

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenu(false);
  };

  const navItems = ["About", "Experience", "Projects", "Skills", "Contact"];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div
      className={`min-h-screen transition-all duration-700 ${
        darkMode ? "bg-slate-950" : "bg-slate-50"
      }`}
    >
      <FloatingParticles darkMode={darkMode} />

      {/* Cursor glow effect */}
      <motion.div
        className="fixed w-[600px] h-[600px] rounded-full pointer-events-none z-0"
        style={{
          background: `radial-gradient(circle, ${
            darkMode ? "rgba(99, 102, 241, 0.08)" : "rgba(99, 102, 241, 0.05)"
          }, transparent 70%)`,
          x: mousePosition.x - 300,
          y: mousePosition.y - 300,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 200 }}
      />

      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 z-50 origin-left"
        style={{
          scaleX: smoothProgress,
          background: "linear-gradient(90deg, #6366f1, #8b5cf6, #06b6d4)",
        }}
      />

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50"
          >
            <motion.div
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className={`fixed inset-y-0 left-0 w-80 ${
                darkMode ? "bg-slate-900/95" : "bg-white/95"
              } backdrop-blur-xl flex flex-col items-center justify-center space-y-8 shadow-2xl border-r ${
                darkMode ? "border-slate-800" : "border-slate-200"
              }`}
            >
              {navItems.map((item, i) => (
                <motion.button
                  key={item}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 + 0.2 }}
                  onClick={() => scrollTo(item.toLowerCase())}
                  className={`text-2xl font-semibold ${
                    darkMode
                      ? "text-white hover:text-indigo-400"
                      : "text-slate-900 hover:text-indigo-600"
                  } transition-all duration-300 hover:scale-110 hover:translate-x-2`}
                >
                  {item}
                </motion.button>
              ))}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                onClick={() => setMobileMenu(false)}
                className={`absolute top-6 right-6 p-3 rounded-full ${
                  darkMode
                    ? "bg-slate-800 hover:bg-slate-700"
                    : "bg-slate-100 hover:bg-slate-200"
                } transition-colors`}
              >
                <X className="h-6 w-6" />
              </motion.button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm -z-10"
              onClick={() => setMobileMenu(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-40 px-4 py-4">
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-6xl mx-auto"
        >
          <div
            className={`${
              darkMode
                ? "bg-slate-900/80 border-slate-800"
                : "bg-white/80 border-slate-200"
            } backdrop-blur-xl rounded-2xl px-6 py-4 flex justify-between items-center border shadow-lg`}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-cyan-500 flex items-center justify-center">
                <span className="text-white font-bold text-lg">Y</span>
              </div>
              <span
                className={`text-xl font-bold ${
                  darkMode ? "text-white" : "text-slate-900"
                }`}
              >
                Yash Singh
              </span>
            </motion.div>

            <div className="hidden lg:flex items-center space-x-2">
              {navItems.map((item, i) => (
                <motion.button
                  key={item}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => scrollTo(item.toLowerCase())}
                  className={`relative px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                    activeSection === item.toLowerCase()
                      ? darkMode
                        ? "text-white bg-indigo-500/20"
                        : "text-indigo-600 bg-indigo-50"
                      : darkMode
                      ? "text-slate-400 hover:text-white hover:bg-slate-800"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  {item}
                  {activeSection === item.toLowerCase() && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-indigo-500"
                    />
                  )}
                </motion.button>
              ))}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 180 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setDarkMode(!darkMode)}
                className={`ml-4 p-3 rounded-xl ${
                  darkMode
                    ? "bg-slate-800 text-yellow-400"
                    : "bg-slate-100 text-indigo-600"
                } transition-colors`}
              >
                {darkMode ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </motion.button>
            </div>

            <button
              onClick={() => setMobileMenu(true)}
              className={`lg:hidden p-3 rounded-xl ${
                darkMode ? "hover:bg-slate-800" : "hover:bg-slate-100"
              } transition-colors`}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </motion.div>
      </nav>

      {/* Hero Section */}
      <section
        id="hero"
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24"
      >
        {/* Gradient orbs */}
        <GradientOrb
          className={`w-[800px] h-[800px] -top-40 -left-40 ${
            darkMode ? "bg-indigo-600/20" : "bg-indigo-400/20"
          }`}
        />
        <GradientOrb
          className={`w-[600px] h-[600px] top-1/2 -right-20 ${
            darkMode ? "bg-purple-600/20" : "bg-purple-400/20"
          }`}
          delay={2}
        />
        <GradientOrb
          className={`w-[500px] h-[500px] bottom-0 left-1/3 ${
            darkMode ? "bg-cyan-600/15" : "bg-cyan-400/15"
          }`}
          delay={4}
        />

        <div className="relative max-w-6xl mx-auto px-6 text-center z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {/* Status badge */}
            <motion.div variants={itemVariants} className="flex justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className={`inline-flex items-center gap-3 px-5 py-2.5 rounded-full ${
                  darkMode
                    ? "bg-emerald-500/10 border-emerald-500/20"
                    : "bg-emerald-50 border-emerald-200"
                } border`}
              >
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                <span
                  className={`text-sm font-medium ${
                    darkMode ? "text-emerald-400" : "text-emerald-600"
                  }`}
                >
                  Available for Freelance Projects
                </span>
              </motion.div>
            </motion.div>

            {/* Main heading */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h1
                className={`text-5xl sm:text-6xl lg:text-8xl font-black tracking-tight ${
                  darkMode ? "text-white" : "text-slate-900"
                }`}
              >
                Hi, I&apos;m{" "}
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
                    Yash Singh
                  </span>
                  <motion.span
                    className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 rounded-full"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 1, duration: 0.8 }}
                  />
                </span>
              </h1>
            </motion.div>

            {/* Role badges */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center justify-center gap-4"
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                className={`flex items-center gap-2 px-5 py-3 rounded-2xl ${
                  darkMode
                    ? "bg-indigo-500/10 border-indigo-500/20"
                    : "bg-indigo-50 border-indigo-200"
                } border`}
              >
                <Rocket
                  className={`h-5 w-5 ${
                    darkMode ? "text-indigo-400" : "text-indigo-600"
                  }`}
                />
                <span
                  className={`text-lg font-semibold ${
                    darkMode ? "text-indigo-400" : "text-indigo-600"
                  }`}
                >
                  Full-Stack Developer
                </span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                className={`flex items-center gap-2 px-5 py-3 rounded-2xl ${
                  darkMode
                    ? "bg-purple-500/10 border-purple-500/20"
                    : "bg-purple-50 border-purple-200"
                } border`}
              >
                <Target
                  className={`h-5 w-5 ${
                    darkMode ? "text-purple-400" : "text-purple-600"
                  }`}
                />
                <span
                  className={`font-medium ${
                    darkMode ? "text-purple-400" : "text-purple-600"
                  }`}
                >
                  4+ Years Experience
                </span>
              </motion.div>
            </motion.div>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className={`max-w-2xl mx-auto text-xl leading-relaxed ${
                darkMode ? "text-slate-400" : "text-slate-600"
              }`}
            >
              Crafting{" "}
              <span
                className={`font-semibold ${
                  darkMode ? "text-white" : "text-slate-900"
                }`}
              >
                pixel-perfect
              </span>
              , lightning-fast web experiences with React, Next.js &
              cutting-edge UI
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  size="lg"
                  onClick={() => scrollTo("projects")}
                  className="px-8 py-7 text-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-2xl shadow-xl shadow-indigo-500/25 transition-all duration-300"
                >
                  View Projects <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => scrollTo("contact")}
                  className={`px-8 py-7 text-lg rounded-2xl border-2 ${
                    darkMode
                      ? "border-slate-700 text-white bg-transparent hover:bg-slate-800"
                      : "border-slate-300 text-slate-900 hover:bg-slate-100"
                  } transition-all duration-300`}
                >
                  Let&apos;s Talk <Coffee className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </motion.div>

            {/* Avatar section */}
            <motion.div
              variants={itemVariants}
              className="pt-12 flex justify-center"
            >
              <div className="relative">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute inset-0 rounded-full"
                  style={{
                    background:
                      "conic-gradient(from 0deg, #6366f1, #8b5cf6, #06b6d4, #6366f1)",
                    padding: "3px",
                  }}
                >
                  <div
                    className={`w-full h-full rounded-full ${
                      darkMode ? "bg-slate-950" : "bg-slate-50"
                    }`}
                  />
                </motion.div>
                <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-cyan-500 p-1 m-1">
                  <div
                    className={`w-full h-full rounded-full ${
                      darkMode ? "bg-slate-900" : "bg-white"
                    } flex items-center justify-center`}
                  >
                    <span className="text-4xl font-black bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
                      YS
                    </span>
                  </div>
                </div>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -top-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full border-4 border-slate-950"
                />
              </div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
              variants={itemVariants}
              className="pt-12"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <button
                onClick={() => scrollTo("about")}
                className={`mx-auto flex flex-col items-center gap-2 ${
                  darkMode ? "text-slate-500" : "text-slate-400"
                } hover:text-indigo-500 transition-colors`}
              >
                <span className="text-sm font-medium">Scroll to explore</span>
                <div
                  className={`w-6 h-10 rounded-full border-2 ${
                    darkMode ? "border-slate-700" : "border-slate-300"
                  } flex justify-center pt-2`}
                >
                  <motion.div
                    animate={{ y: [0, 12, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-1.5 h-1.5 rounded-full bg-indigo-500"
                  />
                </div>
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className={`py-32 relative ${
          darkMode ? "bg-slate-900/50" : "bg-white"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <span
              className={`text-sm font-semibold tracking-widest uppercase ${
                darkMode ? "text-indigo-400" : "text-indigo-600"
              }`}
            >
              Get to know me
            </span>
            <h2
              className={`text-4xl sm:text-5xl font-black mt-4 ${
                darkMode ? "text-white" : "text-slate-900"
              }`}
            >
              About Me
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div
                className={`space-y-6 text-lg leading-relaxed ${
                  darkMode ? "text-slate-300" : "text-slate-600"
                }`}
              >
                <p>
                  With{" "}
                  <span
                    className={`font-bold ${
                      darkMode ? "text-indigo-400" : "text-indigo-600"
                    }`}
                  >
                    4+ years
                  </span>{" "}
                  of experience building production-grade applications, I
                  specialize in creating{" "}
                  <span className="font-semibold">
                    lightning-fast, accessible
                  </span>{" "}
                  web experiences.
                </p>
                <p>
                  My expertise lies in{" "}
                  <span
                    className={`font-semibold ${
                      darkMode ? "text-white" : "text-slate-900"
                    }`}
                  >
                    React, Next.js, TypeScript
                  </span>
                  , and modern UI libraries. I&apos;m passionate about{" "}
                  <span className="font-semibold">
                    performance optimization, pixel-perfect design
                  </span>
                  , and creating delightful user experiences.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    className="px-6 py-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl shadow-lg"
                    onClick={() => window.open(GOOGLE_DRIVE_LINK, "_blank")}
                  >
                    <Download className="mr-2 h-5 w-5" />
                    Download Resume
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant="outline"
                    onClick={() => window.open(GITHUB, "_blank")}
                    className={`px-6 py-6 rounded-xl border-2 ${
                      darkMode
                        ? "border-slate-700 text-white bg-transparent hover:bg-slate-800"
                        : "border-slate-300 hover:bg-slate-100"
                    }`}
                  >
                    <Github className="mr-2 h-5 w-5" />
                    GitHub Profile
                  </Button>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div
                className={`${
                  darkMode ? "bg-slate-800/50" : "bg-slate-50"
                } rounded-3xl p-8 border ${
                  darkMode ? "border-slate-700" : "border-slate-200"
                }`}
              >
                <div className="grid grid-cols-2 gap-6">
                  {[
                    {
                      num: "15",
                      suffix: "+",
                      label: "Projects Delivered",
                      icon: Rocket,
                    },
                    {
                      num: "4",
                      suffix: "+",
                      label: "Years Experience",
                      icon: Target,
                    },
                    {
                      num: "50",
                      suffix: "+",
                      label: "Happy Clients",
                      icon: Heart,
                    },
                    {
                      num: "99",
                      suffix: "%",
                      label: "Success Rate",
                      icon: Award,
                    },
                  ].map((stat, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      whileHover={{ y: -5, scale: 1.02 }}
                      className={`text-center p-6 rounded-2xl ${
                        darkMode ? "bg-slate-900/50" : "bg-white"
                      } border ${
                        darkMode ? "border-slate-700" : "border-slate-200"
                      } transition-all duration-300`}
                    >
                      <stat.icon
                        className={`h-8 w-8 mx-auto mb-3 ${
                          darkMode ? "text-indigo-400" : "text-indigo-600"
                        }`}
                      />
                      <div
                        className={`text-3xl font-black mb-1 ${
                          darkMode ? "text-white" : "text-slate-900"
                        }`}
                      >
                        <AnimatedCounter
                          value={stat.num}
                          suffix={stat.suffix}
                        />
                      </div>
                      <div
                        className={`text-sm font-medium ${
                          darkMode ? "text-slate-400" : "text-slate-500"
                        }`}
                      >
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section
        id="experience"
        className={`py-32 ${darkMode ? "" : "bg-slate-50"}`}
      >
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span
              className={`text-sm font-semibold tracking-widest uppercase ${
                darkMode ? "text-indigo-400" : "text-indigo-600"
              }`}
            >
              Career Journey
            </span>
            <h2
              className={`text-4xl sm:text-5xl font-black mt-4 ${
                darkMode ? "text-white" : "text-slate-900"
              }`}
            >
              Experience
            </h2>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div
              className={`absolute left-8 top-0 bottom-0 w-0.5 ${
                darkMode ? "bg-slate-800" : "bg-slate-200"
              }`}
            />

            <div className="space-y-12">
              {[
                {
                  company: "Mind Inventory Pvt. Ltd.",
                  role: "Associate Software Developer",
                  period: "Mar 2023 – Present",
                  points: [
                    "Led UI architecture for SaaS products using React & TypeScript",
                    "Reduced bundle size by 40% via code-splitting & lazy loading",
                    "Implemented micro-frontend architecture for scalable solutions",
                  ],
                  color: "indigo",
                },
                {
                  company: "I4 Consulting Pvt. Ltd.",
                  role: "Frontend Developer",
                  period: "Jul 2023 – Jan 2024",
                  points: [
                    "Built SEO-optimized Next.js applications with ISR",
                    "Integrated GraphQL with TanStack Query for efficient data fetching",
                    "Improved Core Web Vitals scores by 60%",
                  ],
                  color: "purple",
                },
                {
                  company: "Cloud Analogy",
                  role: "Full Stack Developer",
                  period: "Feb 2022 – May 2023",
                  points: [
                    "Delivered 10+ responsive dashboards with Material UI",
                    "Optimized PostgreSQL queries resulting in 60% faster load times",
                    "Mentored junior developers on React best practices",
                  ],
                  color: "cyan",
                },
              ].map((job, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="relative pl-20"
                >
                  {/* Timeline dot */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15, type: "spring" }}
                    className={`absolute left-6 top-8 w-5 h-5 rounded-full border-4 ${
                      darkMode
                        ? "border-slate-950 bg-indigo-500"
                        : "border-slate-50 bg-indigo-600"
                    }`}
                  />

                  <motion.div
                    whileHover={{ x: 5 }}
                    className={`${
                      darkMode
                        ? "bg-slate-800/50 border-slate-700"
                        : "bg-white border-slate-200"
                    } rounded-2xl p-8 border transition-all duration-300 hover:shadow-xl ${
                      darkMode
                        ? "hover:shadow-indigo-500/5"
                        : "hover:shadow-indigo-500/10"
                    }`}
                  >
                    <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
                      <div>
                        <h3
                          className={`text-2xl font-bold mb-2 ${
                            darkMode ? "text-white" : "text-slate-900"
                          }`}
                        >
                          {job.company}
                        </h3>
                        <p
                          className={`text-lg font-semibold ${
                            darkMode ? "text-indigo-400" : "text-indigo-600"
                          }`}
                        >
                          {job.role}
                        </p>
                      </div>
                      <Badge
                        className={`px-4 py-2 h-fit ${
                          darkMode
                            ? "bg-indigo-500/10 border-indigo-500/20 text-indigo-400"
                            : "bg-indigo-50 border-indigo-200 text-indigo-600"
                        } border font-medium`}
                      >
                        {job.period}
                      </Badge>
                    </div>
                    <ul className="space-y-3">
                      {job.points.map((point, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.15 + idx * 0.1 }}
                          className={`flex items-start gap-3 ${
                            darkMode ? "text-slate-300" : "text-slate-600"
                          }`}
                        >
                          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500 flex-shrink-0" />
                          <span>{point}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        className={`py-32 ${darkMode ? "bg-slate-900/50" : "bg-white"}`}
      >
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span
              className={`text-sm font-semibold tracking-widest uppercase ${
                darkMode ? "text-indigo-400" : "text-indigo-600"
              }`}
            >
              My Work
            </span>
            <h2
              className={`text-4xl sm:text-5xl font-black mt-4 ${
                darkMode ? "text-white" : "text-slate-900"
              }`}
            >
              Featured Projects
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                name: "Properlydone",
                tech: ["React", "Tailwind", "Redux"],
                desc: "Real-time property management platform with advanced analytics and tenant portals",
                live: "https://www.properlydone.com/",
              },
              {
                name: "Collab CRM",
                tech: ["Next.js", "TanStack", "Shadcn"],
                desc: "AI-powered team collaboration suite with intelligent task management",
              },
              {
                name: "Arranged Sugar",
                tech: ["React", "TypeScript", "Zustand"],
                desc: "E-commerce platform with advanced filtering and real-time inventory",
              },
              {
                name: "Aakash LMS",
                tech: ["Next.js", "Material UI"],
                desc: "Comprehensive learning management system with video streaming",
              },
            ].map((project, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <motion.div
                  whileHover={{ y: -8 }}
                  className={`group h-full ${
                    darkMode
                      ? "bg-slate-800/50 border-slate-700"
                      : "bg-white border-slate-200"
                  } rounded-3xl overflow-hidden border transition-all duration-500 hover:shadow-2xl ${
                    darkMode
                      ? "hover:shadow-indigo-500/10"
                      : "hover:shadow-indigo-500/20"
                  }`}
                >
                  {/* Project image */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={projectImages[project.name]}
                      alt={project.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/40 backdrop-blur-sm">
                      <div className="flex gap-4">
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Button
                            size="sm"
                            className="bg-white text-slate-900 hover:bg-slate-100 rounded-full shadow-lg"
                          >
                            <Github className="h-4 w-4 mr-2" /> Code
                          </Button>
                        </motion.div>
                        {project.live && (
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <a
                              href={project.live}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Button
                                size="sm"
                                className="bg-white text-slate-900 hover:bg-slate-100 rounded-full shadow-lg"
                              >
                                Live <ExternalLink className="h-4 w-4 ml-2" />
                              </Button>
                            </a>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Project info */}
                  <div className="p-8">
                    <div className="flex justify-between items-start mb-4">
                      <h3
                        className={`text-2xl font-bold ${
                          darkMode ? "text-white" : "text-slate-900"
                        }`}
                      >
                        {project.name}
                      </h3>
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`${
                            darkMode
                              ? "text-indigo-400 hover:text-indigo-300"
                              : "text-indigo-600 hover:text-indigo-700"
                          } transition-colors`}
                        >
                          <ExternalLink className="h-5 w-5" />
                        </a>
                      )}
                    </div>
                    <p
                      className={`mb-6 ${
                        darkMode ? "text-slate-400" : "text-slate-600"
                      }`}
                    >
                      {project.desc}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <Badge
                          key={tech}
                          className={`px-3 py-1.5 ${
                            darkMode
                              ? "bg-indigo-500/10 border-indigo-500/20 text-indigo-400"
                              : "bg-indigo-50 border-indigo-200 text-indigo-600"
                          } border font-medium`}
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className={`py-32 ${darkMode ? "" : "bg-slate-50"}`}>
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span
              className={`text-sm font-semibold tracking-widest uppercase ${
                darkMode ? "text-indigo-400" : "text-indigo-600"
              }`}
            >
              What I Do Best
            </span>
            <h2
              className={`text-4xl sm:text-5xl font-black mt-4 ${
                darkMode ? "text-white" : "text-slate-900"
              }`}
            >
              Skills & Expertise
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                cat: "Frontend",
                icon: Code,
                gradient: "from-indigo-500 to-purple-500",
                list: [
                  { name: "React", level: 95 },
                  { name: "Next.js", level: 90 },
                  { name: "TypeScript", level: 88 },
                  { name: "Tailwind CSS", level: 92 },
                  { name: "Framer Motion", level: 85 },
                ],
              },
              {
                cat: "State & Data",
                icon: Database,
                gradient: "from-purple-500 to-pink-500",
                list: [
                  { name: "Redux Toolkit", level: 90 },
                  { name: "Zustand", level: 85 },
                  { name: "TanStack Query", level: 88 },
                  { name: "GraphQL", level: 80 },
                ],
              },
              {
                cat: "Tools & More",
                icon: Settings,
                gradient: "from-cyan-500 to-blue-500",
                list: [
                  { name: "Git & GitHub", level: 92 },
                  { name: "Vercel/Netlify", level: 90 },
                  { name: "Docker", level: 75 },
                  { name: "Figma", level: 85 },
                ],
              },
            ].map((group, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <motion.div
                  whileHover={{ y: -5 }}
                  className={`h-full ${
                    darkMode
                      ? "bg-slate-800/50 border-slate-700"
                      : "bg-white border-slate-200"
                  } rounded-3xl p-8 border transition-all duration-300 hover:shadow-xl ${
                    darkMode
                      ? "hover:shadow-indigo-500/5"
                      : "hover:shadow-indigo-500/10"
                  }`}
                >
                  <div className="flex items-center gap-4 mb-8">
                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${group.gradient} flex items-center justify-center shadow-lg`}
                    >
                      <group.icon className="h-7 w-7 text-white" />
                    </div>
                    <h3
                      className={`text-2xl font-bold ${
                        darkMode ? "text-white" : "text-slate-900"
                      }`}
                    >
                      {group.cat}
                    </h3>
                  </div>
                  <div className="space-y-5">
                    {group.list.map((skill, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 + idx * 0.05 }}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span
                              className={
                                darkMode ? "text-indigo-400" : "text-indigo-600"
                              }
                            >
                              {skillIcons[skill.name]}
                            </span>
                            <span
                              className={`font-medium ${
                                darkMode ? "text-slate-300" : "text-slate-700"
                              }`}
                            >
                              {skill.name}
                            </span>
                          </div>
                          <span
                            className={`text-sm font-bold ${
                              darkMode ? "text-indigo-400" : "text-indigo-600"
                            }`}
                          >
                            {skill.level}%
                          </span>
                        </div>
                        <div
                          className={`h-2 rounded-full overflow-hidden ${
                            darkMode ? "bg-slate-700" : "bg-slate-200"
                          }`}
                        >
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{
                              duration: 1.2,
                              delay: i * 0.1 + idx * 0.05,
                              ease: "easeOut",
                            }}
                            className={`h-full rounded-full bg-gradient-to-r ${group.gradient}`}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className={`py-32 ${darkMode ? "bg-slate-900/50" : "bg-white"}`}
      >
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span
              className={`text-sm font-semibold tracking-widest uppercase ${
                darkMode ? "text-indigo-400" : "text-indigo-600"
              }`}
            >
              Get In Touch
            </span>
            <h2
              className={`text-4xl sm:text-5xl font-black mt-4 mb-6 ${
                darkMode ? "text-white" : "text-slate-900"
              }`}
            >
              Let&apos;s Create Something Amazing
            </h2>
            <p
              className={`text-xl max-w-2xl mx-auto ${
                darkMode ? "text-slate-400" : "text-slate-600"
              }`}
            >
              Have a project in mind? Let&apos;s discuss how we can work
              together
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div
                className={`${
                  darkMode
                    ? "bg-slate-800/50 border-slate-700"
                    : "bg-slate-50 border-slate-200"
                } rounded-3xl p-8 border`}
              >
                <h3
                  className={`text-2xl font-bold mb-8 ${
                    darkMode ? "text-white" : "text-slate-900"
                  }`}
                >
                  Get in Touch
                </h3>
                <div className="space-y-6">
                  <motion.a
                    href="mailto:syash@gmail.com"
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Mail className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div
                        className={`text-sm ${
                          darkMode ? "text-slate-500" : "text-slate-400"
                        }`}
                      >
                        Email
                      </div>
                      <div
                        className={`text-lg font-semibold ${
                          darkMode
                            ? "text-white group-hover:text-indigo-400"
                            : "text-slate-900 group-hover:text-indigo-600"
                        } transition-colors`}
                      >
                        syash@gmail.com
                      </div>
                    </div>
                  </motion.a>
                  <motion.a
                    href="tel:+919601118344"
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Phone className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div
                        className={`text-sm ${
                          darkMode ? "text-slate-500" : "text-slate-400"
                        }`}
                      >
                        Phone
                      </div>
                      <div
                        className={`text-lg font-semibold ${
                          darkMode
                            ? "text-white group-hover:text-indigo-400"
                            : "text-slate-900 group-hover:text-indigo-600"
                        } transition-colors`}
                      >
                        +91 9601118344
                      </div>
                    </div>
                  </motion.a>
                </div>
              </div>

              <div className="flex gap-4">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1"
                >
                  <Button
                    onClick={() => window.open(LINKED_IN, "_blank")}
                    size="lg"
                    className={`w-full py-6 rounded-xl border-2 ${
                      darkMode
                        ? "border-slate-700 bg-slate-800 text-white hover:bg-slate-700"
                        : "border-slate-200 bg-white text-slate-900 hover:bg-slate-50"
                    }`}
                  >
                    <Linkedin className="h-5 w-5 mr-2" />
                    LinkedIn
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1"
                >
                  <Button
                    onClick={() => window.open(GITHUB, "_blank")}
                    size="lg"
                    className={`w-full py-6 rounded-xl border-2 ${
                      darkMode
                        ? "border-slate-700 bg-slate-800 text-white hover:bg-slate-700"
                        : "border-slate-200 bg-white text-slate-900 hover:bg-slate-50"
                    }`}
                  >
                    <Github className="h-5 w-5 mr-2" />
                    GitHub
                  </Button>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div
                className={`${
                  darkMode
                    ? "bg-slate-800/50 border-slate-700"
                    : "bg-white border-slate-200"
                } rounded-3xl p-8 border shadow-xl ${
                  darkMode ? "shadow-indigo-500/5" : "shadow-indigo-500/10"
                }`}
              >
                <AnimatePresence mode="wait">
                  {sent ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="h-full flex flex-col items-center justify-center text-center py-16"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", delay: 0.2 }}
                        className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center mb-6 shadow-lg"
                      >
                        <Award className="h-10 w-10 text-white" />
                      </motion.div>
                      <h3
                        className={`text-2xl font-bold mb-2 ${
                          darkMode ? "text-white" : "text-slate-900"
                        }`}
                      >
                        Message Sent!
                      </h3>
                      <p
                        className={
                          darkMode ? "text-slate-400" : "text-slate-600"
                        }
                      >
                        I&apos;ll get back to you soon
                      </p>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={onSubmit}
                      className="space-y-6"
                    >
                      <h3
                        className={`text-2xl font-bold mb-6 ${
                          darkMode ? "text-white" : "text-slate-900"
                        }`}
                      >
                        Send a Message
                      </h3>
                      <div>
                        <Input
                          placeholder="Your Name"
                          value={form.name}
                          onChange={(e) =>
                            setForm({ ...form, name: e.target.value })
                          }
                          required
                          className={`h-14 text-lg rounded-xl border-2 ${
                            darkMode
                              ? "bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-indigo-500"
                              : "bg-slate-50 border-slate-200 focus:border-indigo-500"
                          }`}
                        />
                      </div>
                      <div>
                        <Input
                          type="email"
                          placeholder="Your Email"
                          value={form.email}
                          onChange={(e) =>
                            setForm({ ...form, email: e.target.value })
                          }
                          required
                          className={`h-14 text-lg rounded-xl border-2 ${
                            darkMode
                              ? "bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-indigo-500"
                              : "bg-slate-50 border-slate-200 focus:border-indigo-500"
                          }`}
                        />
                      </div>
                      <div>
                        <Textarea
                          placeholder="Your Message"
                          rows={5}
                          value={form.message}
                          onChange={(e) =>
                            setForm({ ...form, message: e.target.value })
                          }
                          required
                          className={`text-lg rounded-xl border-2 resize-none ${
                            darkMode
                              ? "bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-indigo-500"
                              : "bg-slate-50 border-slate-200 focus:border-indigo-500"
                          }`}
                        />
                      </div>
                      <motion.div
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                      >
                        <Button
                          type="submit"
                          size="lg"
                          className="w-full h-14 text-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl shadow-xl shadow-indigo-500/25"
                        >
                          Send Message <Send className="ml-2 h-5 w-5" />
                        </Button>
                      </motion.div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className={`py-12 border-t ${
          darkMode ? "border-slate-800" : "border-slate-200"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-cyan-500 flex items-center justify-center">
                <span className="text-white font-bold">Y</span>
              </div>
              <p className={darkMode ? "text-slate-400" : "text-slate-600"}>
                © 2025 Yash Singh – Crafted with{" "}
                <Heart className="inline h-4 w-4 text-red-500" /> using React &
                Framer Motion
              </p>
            </div>
            <div className="flex gap-3">
              {[
                { name: "LinkedIn", icon: Linkedin, url: LINKED_IN },
                { name: "GitHub", icon: Github, url: GITHUB },
              ].map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-3 rounded-xl ${
                    darkMode
                      ? "bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
                      : "bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900"
                  } transition-colors`}
                >
                  <social.icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
