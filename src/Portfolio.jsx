"use client";

import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useSpring,
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect, useRef } from "react";

export default function Portfolio() {
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const scaleProgress = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setForm({ name: "", email: "", message: "" });
    }, 2500);
  };

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenu(false);
  };

  const navItems = ["About", "Experience", "Projects", "Skills", "Contact"];

  return (
    <>
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap");

        :root {
          --primary: #6366f1;
          --primary-dark: #4f46e5;
          --primary-light: #818cf8;
        }
        .dark {
          --primary: #818cf8;
          --primary-dark: #6366f1;
          --primary-light: #a5b4fc;
        }

        * {
          font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI",
            sans-serif;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .glass {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .dark .glass {
          background: rgba(15, 23, 42, 0.7);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .glow-box {
          box-shadow: 0 0 60px rgba(99, 102, 241, 0.15);
        }

        .dark .glow-box {
          box-shadow: 0 0 80px rgba(129, 140, 248, 0.2);
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .float-animation {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>

      <div
        className={`min-h-screen transition-colors duration-700 ${
          darkMode ? "dark bg-slate-950" : "bg-white"
        }`}
      >
        {/* Cursor Glow Effect */}
        <motion.div
          className="fixed w-96 h-96 rounded-full pointer-events-none z-0 blur-3xl opacity-10"
          style={{
            background: `radial-gradient(circle, ${
              darkMode ? "rgba(129, 140, 248, 0.3)" : "rgba(99, 102, 241, 0.2)"
            }, transparent)`,
            x: mousePosition.x - 192,
            y: mousePosition.y - 192,
          }}
        />

        {/* Progress Bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-indigo-600 dark:bg-indigo-500 z-50 origin-left"
          style={{ scaleX: scrollYProgress }}
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
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", damping: 25 }}
                className="fixed inset-y-0 left-0 w-80 glass flex flex-col items-center justify-center space-y-8 shadow-2xl"
              >
                {navItems.map((item, i) => (
                  <motion.button
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    onClick={() => scrollTo(item.toLowerCase())}
                    className="text-2xl font-semibold text-indigo-600 dark:text-indigo-400 hover:scale-110 transition-transform"
                  >
                    {item}
                  </motion.button>
                ))}
                <button
                  onClick={() => setMobileMenu(false)}
                  className="absolute top-6 right-6 p-2 rounded-full glass hover:scale-110 transition-transform"
                >
                  <X className="h-6 w-6" />
                </button>
              </motion.div>
              <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm -z-10"
                onClick={() => setMobileMenu(false)}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <nav className="fixed top-0 w-full z-40">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="glass rounded-2xl px-6 py-3 flex justify-between items-center shadow-xl">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-2xl font-bold text-indigo-600 dark:text-indigo-400"
              >
                Yash Singh
              </motion.div>

              <div className="hidden lg:flex items-center space-x-8">
                {navItems.map((item, i) => (
                  <motion.button
                    key={item}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    onClick={() => scrollTo(item.toLowerCase())}
                    className="relative text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors group"
                  >
                    {item}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 dark:bg-indigo-400 group-hover:w-full transition-all duration-300" />
                  </motion.button>
                ))}
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setDarkMode(!darkMode)}
                  className="rounded-full hover:scale-110 transition-transform"
                >
                  {darkMode ? (
                    <Sun className="h-5 w-5 text-yellow-500" />
                  ) : (
                    <Moon className="h-5 w-5 text-indigo-600" />
                  )}
                </Button>
              </div>

              <button
                onClick={() => setMobileMenu(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-white/50 dark:hover:bg-slate-800/50 transition-colors"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative pt-40 pb-32 overflow-hidden">
          {/* Floating Orbs */}
          <motion.div style={{ y: heroY }}>
            <div className="absolute top-20 left-10 w-[500px] h-[500px] bg-indigo-200/20 dark:bg-indigo-600/10 rounded-full blur-3xl animate-pulse" />
            <div
              className="absolute top-40 right-20 w-[600px] h-[600px] bg-blue-200/20 dark:bg-blue-600/10 rounded-full blur-3xl animate-pulse"
              style={{ animationDelay: "1s" }}
            />
            <div
              className="absolute bottom-20 left-1/3 w-[400px] h-[400px] bg-violet-200/20 dark:bg-violet-600/10 rounded-full blur-3xl animate-pulse"
              style={{ animationDelay: "2s" }}
            />
          </motion.div>

          <div className="relative max-w-7xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, type: "spring" }}
              className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full glass"
            >
              <Sparkles className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
              <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                Available for Freelance
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-6xl sm:text-7xl lg:text-8xl font-black mb-6"
            >
              <span className="text-slate-900 dark:text-white">
                Hi, I&apos;m{" "}
              </span>
              <br />
              <span className="text-indigo-600 dark:text-indigo-400">
                Yash Singh
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-wrap items-center justify-center gap-4 mb-8"
            >
              <div className="flex items-center gap-2 px-4 py-2 rounded-full glass">
                <Zap className="h-5 w-5 text-yellow-500" />
                <span className="text-lg font-semibold text-indigo-600 dark:text-indigo-400">
                  SoftwareDeveloper
                </span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full glass">
                <Target className="h-5 w-5 text-green-500" />
                <span className="text-sm text-slate-600 dark:text-slate-300">
                  3+ Years Experience
                </span>
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="max-w-3xl mx-auto text-xl text-slate-600 dark:text-slate-300 mb-12 leading-relaxed"
            >
              Crafting{" "}
              <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                pixel-perfect
              </span>
              , lightning-fast web experiences with React, Next.js &
              cutting-edge UI
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                size="lg"
                onClick={() => scrollTo("projects")}
                className="px-8 py-6 text-lg bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white transition-all duration-300 hover:scale-105 rounded-2xl shadow-lg hover:shadow-xl"
              >
                View Projects <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollTo("contact")}
                className="px-8 py-6 text-lg glass border-2 border-indigo-600/30 dark:border-indigo-400/30 text-indigo-600 dark:text-indigo-400 hover:border-indigo-600 dark:hover:border-indigo-400 hover:scale-105 transition-all duration-300 rounded-2xl"
              >
                Let&apos;s Talk
              </Button>
            </motion.div>

            {/* Floating Avatar */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="mt-20 relative inline-block"
            >
              <div className="w-40 h-40 rounded-full bg-indigo-600 dark:bg-indigo-500 p-1 glow-box">
                <div className="w-full h-full rounded-full bg-white dark:bg-slate-900 flex items-center justify-center text-5xl font-black text-indigo-600 dark:text-indigo-400">
                  YS
                </div>
              </div>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border-2 border-dashed border-indigo-600/30 dark:border-indigo-400/30"
              />
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-400 rounded-full border-4 border-white dark:border-slate-900 animate-pulse" />
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section
          id="about"
          className="py-32 relative bg-slate-50/50 dark:bg-slate-900/50"
        >
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-5xl font-black mb-4 text-indigo-600 dark:text-indigo-400">
                About Me
              </h2>
              <div className="w-24 h-1 bg-indigo-600 dark:bg-indigo-400 mx-auto rounded-full" />
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                <div className="space-y-6 text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                  <p>
                    With{" "}
                    <span className="font-bold text-indigo-600 dark:text-indigo-400">
                      3+ years
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
                    <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                      React, Next.js, TypeScript
                    </span>
                    , and modern UI libraries. I&apos;m passionate about{" "}
                    <span className="font-semibold">
                      performance optimization, pixel-perfect design
                    </span>
                    , and creating delightful user experiences.
                  </p>
                  <p>
                    I&apos;ve worked with companies ranging from startups to
                    enterprises, delivering solutions that drive real business
                    value.
                  </p>
                </div>

                <div className="flex flex-wrap gap-4">
                  <Button className="px-6 py-6 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white transition-all duration-300 hover:scale-105 rounded-xl shadow-lg hover:shadow-xl">
                    <Download className="mr-2 h-5 w-5" />
                    Download Resume
                  </Button>
                  <Button
                    variant="outline"
                    className="px-6 py-6 glass border-2 border-indigo-600/30 dark:border-indigo-400/30 text-indigo-600 dark:text-indigo-400 hover:border-indigo-600 dark:hover:border-indigo-400 hover:scale-105 transition-all duration-300 rounded-xl"
                  >
                    <Github className="mr-2 h-5 w-5" />
                    GitHub Profile
                  </Button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="glass rounded-3xl p-8 glow-box">
                  <div className="grid grid-cols-2 gap-6">
                    {[
                      { num: "15+", label: "Projects Delivered" },
                      { num: "3+", label: "Years Experience" },
                      { num: "50+", label: "Happy Clients" },
                      { num: "99%", label: "Success Rate" },
                    ].map((stat, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="text-center p-6 rounded-2xl bg-gradient-to-br from-white/50 to-white/30 dark:from-slate-800/50 dark:to-slate-900/30 backdrop-blur-sm"
                      >
                        <div className="text-4xl font-black text-indigo-600 dark:text-indigo-400 mb-2">
                          {stat.num}
                        </div>
                        <div className="text-sm font-medium text-slate-600 dark:text-slate-400">
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
        <section id="experience" className="py-32">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-5xl font-black mb-4 text-indigo-600 dark:text-indigo-400">
                Experience
              </h2>
              <div className="w-24 h-1 bg-indigo-600 dark:bg-indigo-400 mx-auto rounded-full" />
            </motion.div>

            <div className="space-y-8 max-w-4xl mx-auto">
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
                },
              ].map((job, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  whileHover={{ scale: 1.02 }}
                  className="relative"
                >
                  <Card className="glass rounded-3xl p-8 border-2 border-transparent hover:border-indigo-600/30 dark:hover:border-indigo-400/30 transition-all duration-300 glow-box">
                    <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
                      <div>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                          {job.company}
                        </h3>
                        <p className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
                          {job.role}
                        </p>
                      </div>
                      <Badge className="px-4 py-2 h-fit bg-indigo-100 dark:bg-indigo-900/30 border border-indigo-600/30 dark:border-indigo-400/30 text-indigo-600 dark:text-indigo-400 font-medium">
                        {job.period}
                      </Badge>
                    </div>
                    <ul className="space-y-3">
                      {job.points.map((point, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.15 + idx * 0.1 }}
                          className="flex items-start gap-3 text-slate-600 dark:text-slate-300"
                        >
                          <div className="w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-400 mt-2 flex-shrink-0" />
                          <span>{point}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section
          id="projects"
          className="py-32 relative overflow-hidden bg-slate-50/50 dark:bg-slate-900/50"
        >
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-5xl font-black mb-4 text-indigo-600 dark:text-indigo-400">
                Featured Projects
              </h2>
              <div className="w-24 h-1 bg-indigo-600 dark:bg-indigo-400 mx-auto rounded-full" />
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  name: "Properlydone",
                  tech: ["React", "Tailwind", "Redux"],
                  desc: "Real-time property management platform with advanced analytics and tenant portals",
                  live: "https://www.properlydone.com/",
                  color: "blue",
                },
                {
                  name: "Collab CRM",
                  tech: ["Next.js", "TanStack", "Shadcn"],
                  desc: "AI-powered team collaboration suite with intelligent task management",
                  color: "indigo",
                },
                {
                  name: "Arranged Sugar",
                  tech: ["React", "TypeScript", "Zustand"],
                  desc: "E-commerce platform with advanced filtering and real-time inventory",
                  color: "violet",
                },
                {
                  name: "Aakash LMS",
                  tech: ["Next.js", "Material UI"],
                  desc: "Comprehensive learning management system with video streaming",
                  color: "purple",
                },
              ].map((project, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="group"
                >
                  <Card className="glass rounded-3xl overflow-hidden border-2 border-transparent hover:border-indigo-600/30 dark:hover:border-indigo-400/30 transition-all duration-500 h-full">
                    <div
                      className={`h-48 bg-${project.color}-600 dark:bg-${project.color}-500 relative overflow-hidden`}
                    >
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all duration-500" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                        <div className="flex gap-4">
                          <Button
                            size="sm"
                            className="bg-white text-slate-900 hover:bg-white/90 rounded-full shadow-lg"
                          >
                            <Github className="h-4 w-4 mr-1" /> Code
                          </Button>
                          {project.live && (
                            <a
                              href={project.live}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Button
                                size="sm"
                                className="bg-white text-slate-900 hover:bg-white/90 rounded-full shadow-lg"
                              >
                                Live <ExternalLink className="h-4 w-4 ml-1" />
                              </Button>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="p-8">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                          {project.name}
                        </h3>
                        {project.live && (
                          <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-indigo-600 dark:text-indigo-400 hover:scale-110 transition-transform"
                          >
                            <ExternalLink className="h-5 w-5" />
                          </a>
                        )}
                      </div>
                      <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                        {project.desc}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech) => (
                          <Badge
                            key={tech}
                            className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 border border-indigo-600/30 dark:border-indigo-400/30 text-indigo-600 dark:text-indigo-400 font-medium"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-32">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-5xl font-black mb-4 text-indigo-600 dark:text-indigo-400">
                Skills & Expertise
              </h2>
              <div className="w-24 h-1 bg-indigo-600 dark:bg-indigo-400 mx-auto rounded-full" />
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  cat: "Frontend",
                  icon: Code,
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
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -10 }}
                >
                  <Card className="glass rounded-3xl p-8 border-2 border-transparent hover:border-indigo-600/30 dark:hover:border-indigo-400/30 transition-all duration-300 h-full">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-12 h-12 rounded-2xl bg-indigo-600 dark:bg-indigo-500 flex items-center justify-center">
                        <group.icon className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
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
                          transition={{ delay: i * 0.1 + idx * 0.1 }}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-slate-700 dark:text-slate-300">
                              {skill.name}
                            </span>
                            <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
                              {skill.level}%
                            </span>
                          </div>
                          <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${skill.level}%` }}
                              viewport={{ once: true }}
                              transition={{
                                duration: 1,
                                delay: i * 0.1 + idx * 0.1,
                              }}
                              className="h-full bg-indigo-600 dark:bg-indigo-500 rounded-full"
                            />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          className="py-32 relative bg-slate-50/50 dark:bg-slate-900/50"
        >
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-5xl font-black mb-4 text-indigo-600 dark:text-indigo-400">
                Let&apos;s Create Something Amazing
              </h2>
              <div className="w-24 h-1 bg-indigo-600 dark:bg-indigo-400 mx-auto rounded-full mb-6" />
              <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                Have a project in mind? Let&apos;s discuss how we can work
                together
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <Card className="glass rounded-3xl p-8 border-2 border-transparent hover:border-indigo-600/30 dark:hover:border-indigo-400/30 transition-all duration-300">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                    Get in Touch
                  </h3>
                  <div className="space-y-6">
                    <a
                      href="mailto:syash@gmail.com"
                      className="flex items-center gap-4 group"
                    >
                      <div className="w-12 h-12 rounded-xl bg-indigo-600 dark:bg-indigo-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Mail className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <div className="text-sm text-slate-500 dark:text-slate-400">
                          Email
                        </div>
                        <div className="text-lg font-semibold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                          syash@gmail.com
                        </div>
                      </div>
                    </a>
                    <a
                      href="tel:+919688888344"
                      className="flex items-center gap-4 group"
                    >
                      <div className="w-12 h-12 rounded-xl bg-indigo-600 dark:bg-indigo-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Phone className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <div className="text-sm text-slate-500 dark:text-slate-400">
                          Phone
                        </div>
                        <div className="text-lg font-semibold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                          +91 9688888344
                        </div>
                      </div>
                    </a>
                  </div>
                </Card>

                <div className="flex gap-4">
                  <Button
                    size="lg"
                    className="flex-1 glass border-2 border-indigo-600/30 dark:border-indigo-400/30 text-indigo-600 dark:text-indigo-400 hover:border-indigo-600 dark:hover:border-indigo-400 hover:scale-105 transition-all duration-300 rounded-xl"
                  >
                    <Linkedin className="h-5 w-5 mr-2" />
                    LinkedIn
                  </Button>
                  <Button
                    size="lg"
                    className="flex-1 glass border-2 border-indigo-600/30 dark:border-indigo-400/30 text-indigo-600 dark:text-indigo-400 hover:border-indigo-600 dark:hover:border-indigo-400 hover:scale-105 transition-all duration-300 rounded-xl"
                  >
                    <Github className="h-5 w-5 mr-2" />
                    GitHub
                  </Button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <Card className="glass rounded-3xl p-8 border-2 border-transparent hover:border-indigo-600/30 dark:hover:border-indigo-400/30 transition-all duration-300">
                  {sent ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="h-full flex flex-col items-center justify-center text-center py-12"
                    >
                      <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center mb-6">
                        <Award className="h-10 w-10 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                        Message Sent!
                      </h3>
                      <p className="text-slate-600 dark:text-slate-300">
                        I&apos;ll get back to you soon
                      </p>
                    </motion.div>
                  ) : (
                    <form onSubmit={onSubmit} className="space-y-6">
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
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
                          className="glass border-2 border-slate-200/50 dark:border-slate-700/50 focus:border-indigo-600 dark:focus:border-indigo-400 rounded-xl h-12 text-lg"
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
                          className="glass border-2 border-slate-200/50 dark:border-slate-700/50 focus:border-indigo-600 dark:focus:border-indigo-400 rounded-xl h-12 text-lg"
                        />
                      </div>
                      <div>
                        <Textarea
                          placeholder="Your Message"
                          rows={6}
                          value={form.message}
                          onChange={(e) =>
                            setForm({ ...form, message: e.target.value })
                          }
                          required
                          className="glass border-2 border-slate-200/50 dark:border-slate-700/50 focus:border-indigo-600 dark:focus:border-indigo-400 rounded-xl text-lg resize-none"
                        />
                      </div>
                      <Button
                        type="submit"
                        size="lg"
                        className="w-full bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white transition-all duration-300 hover:scale-105 rounded-xl h-14 text-lg shadow-lg hover:shadow-xl"
                      >
                        Send Message <Send className="ml-2 h-5 w-5" />
                      </Button>
                    </form>
                  )}
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 border-t border-slate-200/50 dark:border-slate-800/50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-slate-600 dark:text-slate-400">
                © 2025 Yash Singh – Crafted with passion using React & Framer
                Motion
              </p>
              <div className="flex gap-4">
                {["LinkedIn", "GitHub", "Twitter"].map((social) => (
                  <Button
                    key={social}
                    size="sm"
                    variant="ghost"
                    className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  >
                    {social}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
