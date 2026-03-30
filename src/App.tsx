/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  MapPin, 
  Clock, 
  Menu, 
  X, 
  Stethoscope, 
  Activity, 
  Sparkles, 
  Baby, 
  HeartPulse, 
  Star, 
  Send, 
  MessageCircle,
  ChevronRight,
  ShieldCheck,
  Award,
  Users,
  ChevronLeft,
  CheckCircle2,
  ThumbsUp,
  Heart,
  Calendar,
  Mail
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform, useInView } from 'motion/react';
import { useRef } from 'react';

const CLINIC_NAME = "SHIV CLINIC";
const PHONE_NUMBER = "+91 9904456426";
const ADDRESS = "Maa Complex, 12-A, Sadhu Vasvani Kunj Rd, Railnagar, Rajkot, Gujarat, India";

const NavItem = ({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: () => void }) => (
  <a 
    href={href} 
    onClick={onClick}
    className="text-slate-600 hover:text-blue-600 font-semibold transition-all duration-300 px-4 py-2 rounded-lg hover:bg-blue-50/50 md:hover:bg-transparent relative group"
  >
    {children}
    <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full group-hover:left-0" />
  </a>
);

const Counter = ({ value, label, suffix = "" }: { value: number; label: string; suffix?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 2000;
      const increment = end / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <div ref={ref} className="text-center p-4 sm:p-6 bg-white/50 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-white/20 shadow-xl shadow-blue-900/5 hover:bg-white transition-colors duration-500">
      <div className="text-3xl sm:text-5xl font-black text-blue-900 mb-1 sm:mb-2">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-[10px] sm:text-sm font-bold text-slate-500 uppercase tracking-[0.15em] sm:tracking-[0.2em]">{label}</div>
    </div>
  );
};

const ServiceCard = ({ icon: Icon, title, description, index }: { icon: any; title: string; description: string; index: number }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
    whileHover={{ 
      y: -12, 
      scale: 1.02,
    }}
    className="bg-white p-8 sm:p-10 rounded-[2.5rem] shadow-xl shadow-blue-900/5 border border-slate-100 transition-all duration-500 group relative overflow-hidden"
  >
    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-700" />
    <div className="relative z-10">
      <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-blue-200 group-hover:rotate-[10deg] transition-transform duration-500">
        <Icon size={32} />
      </div>
      <h3 className="text-2xl font-black text-slate-900 mb-4">{title}</h3>
      <p className="text-slate-600 leading-relaxed text-base sm:text-lg">{description}</p>
    </div>
  </motion.div>
);

const TestimonialCard = ({ name, text, rating }: { name: string; text: string; rating: number }) => (
  <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-100 w-full">
    <div className="flex mb-4">
      {[...Array(rating)].map((_, i) => (
        <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
      ))}
    </div>
    <p className="text-slate-700 italic mb-6 leading-relaxed text-sm sm:text-base">"{text}"</p>
    <div className="flex items-center">
      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold mr-3 text-sm">
        {name[0]}
      </div>
      <span className="font-bold text-slate-900">{name}</span>
    </div>
  </div>
);

const FadeIn = ({ children, delay = 0, direction = 'up' }: { children: React.ReactNode; delay?: number; direction?: 'up' | 'down' | 'left' | 'right' }) => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const offset = isMobile ? 20 : 40;
  
  const variants = {
    hidden: { 
      opacity: 0, 
      y: direction === 'up' ? offset : direction === 'down' ? -offset : 0,
      x: direction === 'left' ? offset : direction === 'right' ? -offset : 0
    },
    visible: { opacity: 1, y: 0, x: 0 }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: isMobile ? "-50px" : "-100px" }}
      transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
};

const TESTIMONIALS = [
  {
    name: "Rajesh Patel",
    text: "The best homeopathic treatment I've ever received. My chronic skin issue is finally gone after years of trying other medicines.",
    rating: 5
  },
  {
    name: "Anjali Sharma",
    text: "Dr. Shiv is very patient and listens to all concerns. My daughter's immunity has improved significantly with his treatment.",
    rating: 5
  },
  {
    name: "Vikram Mehta",
    text: "Highly professional and effective. The holistic approach really helped me manage my stress and lifestyle disorders.",
    rating: 5
  }
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    setTimeout(() => setFormStatus('success'), 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden">
      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-blue-600 z-[60] origin-left"
        style={{ scaleX }}
      />

      {/* Sticky Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-white/80 backdrop-blur-xl shadow-lg py-2' : 'bg-transparent py-4'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg sm:text-xl">S</div>
            <span className="text-xl sm:text-2xl font-black tracking-tighter text-blue-900">{CLINIC_NAME}</span>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <NavItem href="#about">About</NavItem>
            <NavItem href="#services">Services</NavItem>
            <NavItem href="#doctor">Doctor</NavItem>
            <NavItem href="#contact">Contact</NavItem>
            <a 
              href="#appointment" 
              className="bg-blue-600 text-white px-6 py-2.5 rounded-full font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
            >
              Book Appointment
            </a>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden text-slate-900" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-0 z-[60] bg-white/95 backdrop-blur-2xl md:hidden flex flex-col"
            >
              <div className="p-6 flex items-center justify-between border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">S</div>
                  <span className="text-2xl font-black tracking-tighter text-blue-900">{CLINIC_NAME}</span>
                </div>
                <button onClick={() => setIsMenuOpen(false)} className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-900">
                  <X size={24} />
                </button>
              </div>
              
              <div className="flex-1 px-6 py-12 flex flex-col gap-8">
                {[
                  { name: 'About', href: '#about' },
                  { name: 'Services', href: '#services' },
                  { name: 'Doctor', href: '#doctor' },
                  { name: 'Contact', href: '#contact' }
                ].map((item, idx) => (
                  <motion.a
                    key={item.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + idx * 0.1 }}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-4xl font-black text-slate-900 hover:text-blue-600 transition-colors"
                  >
                    {item.name}
                  </motion.a>
                ))}
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-auto"
                >
                  <a 
                    href="#appointment" 
                    onClick={() => setIsMenuOpen(false)}
                    className="w-full bg-blue-600 text-white py-6 rounded-[2rem] font-black text-xl text-center shadow-2xl shadow-blue-200 flex items-center justify-center gap-3"
                  >
                    Book Appointment <ChevronRight size={24} />
                  </a>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          style={{ y, scale, opacity }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/80 via-blue-900/40 to-slate-50 z-10" />
          <img 
            src="https://picsum.photos/seed/medical-hero/1920/1080" 
            alt="Medical Background" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 pt-20">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/10 backdrop-blur-md text-white font-bold text-sm mb-8 border border-white/20 shadow-2xl"
            >
              <ShieldCheck size={18} className="text-emerald-400" />
              <span className="uppercase tracking-[0.2em]">Premium Homeopathic Care</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl sm:text-7xl lg:text-8xl font-black text-white leading-[1.05] mb-8 tracking-tight drop-shadow-2xl"
            >
              Healing Naturally, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">Living Fully.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl sm:text-2xl text-blue-50 mb-12 leading-relaxed max-w-2xl mx-auto font-medium opacity-90"
            >
              Experience the future of holistic medicine with Dr. Shiv's advanced homeopathic protocols. Safe, effective, and tailored to your unique biology.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-6 justify-center"
            >
              <motion.a 
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px -10px rgba(59, 130, 246, 0.5)" }}
                whileTap={{ scale: 0.95 }}
                href="#appointment" 
                className="bg-blue-600 text-white px-10 py-5 rounded-2xl font-black text-xl hover:bg-blue-700 transition-all flex items-center justify-center gap-3 shadow-2xl"
              >
                Book Appointment <ChevronRight size={24} />
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.2)" }}
                whileTap={{ scale: 0.95 }}
                href={`tel:${PHONE_NUMBER}`}
                className="bg-white/10 backdrop-blur-md text-white border-2 border-white/30 px-10 py-5 rounded-2xl font-black text-xl transition-all flex items-center justify-center gap-3"
              >
                <Phone size={24} /> Call Now
              </motion.a>
            </motion.div>
          </div>
        </div>

        {/* Floating Background Shapes */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div 
            animate={{ 
              y: [0, -30, 0],
              rotate: [0, 10, 0]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-400/20 rounded-full blur-[100px]"
          />
          <motion.div 
            animate={{ 
              y: [0, 30, 0],
              rotate: [0, -10, 0]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-1/4 -right-20 w-96 h-96 bg-emerald-400/20 rounded-full blur-[100px]"
          />
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-30 -mt-16 sm:-mt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-8">
          <Counter value={10000} label="Happy Patients" suffix="+" />
          <Counter value={15} label="Years Experience" suffix="+" />
          <Counter value={5} label="Star Rating" suffix="/5" />
          <Counter value={100} label="Natural Care" suffix="%" />
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-sm font-black text-blue-600 uppercase tracking-[0.3em] mb-4"
            >
              Why Choose Us
            </motion.h2>
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl font-black text-slate-900 mb-6"
            >
              Excellence in Holistic Healthcare
            </motion.h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: CheckCircle2, title: "Natural Healing", desc: "100% natural treatments with zero side effects for all ages." },
              { icon: ThumbsUp, title: "Expert Care", desc: "Over 15 years of clinical expertise in complex health conditions." },
              { icon: Heart, title: "Holistic View", desc: "We treat the person, not just the disease, for lasting wellness." },
              { icon: Calendar, title: "Easy Access", desc: "Flexible timings and emergency consultations available." }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-8 rounded-[2rem] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl hover:shadow-blue-900/5 transition-all duration-500 group"
              >
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-blue-600 mb-6 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                  <item.icon size={28} />
                </div>
                <h4 className="text-xl font-black text-slate-900 mb-3">{item.title}</h4>
                <p className="text-slate-600 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <FadeIn direction="right">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-tr from-blue-600 to-teal-400 rounded-[3rem] blur-2xl opacity-20 animate-pulse" />
                <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
                  <img 
                    src="https://picsum.photos/seed/homeopathy-care/800/1000" 
                    alt="Homeopathy Medicine" 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 sm:-bottom-10 sm:-right-10 bg-white p-6 sm:p-8 rounded-[2rem] sm:rounded-[2.5rem] shadow-2xl border border-slate-100">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-14 sm:h-14 bg-emerald-100 text-emerald-600 rounded-xl sm:rounded-2xl flex items-center justify-center">
                      <Heart size={24} className="sm:w-8 sm:h-8" />
                    </div>
                    <div>
                      <div className="text-xl sm:text-2xl font-black text-slate-900">100%</div>
                      <div className="text-[10px] sm:text-sm font-bold text-slate-500 uppercase tracking-wider">Natural Care</div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
            <FadeIn direction="left">
              <h2 className="text-sm font-black text-blue-600 uppercase tracking-[0.3em] mb-4">Our Philosophy</h2>
              <h3 className="text-4xl sm:text-6xl font-black text-slate-900 mb-8 leading-tight">
                Restoring Balance, <br />
                <span className="text-blue-600">Empowering Life.</span>
              </h3>
              <p className="text-xl text-slate-600 leading-relaxed">
                At Shiv Clinic, we don't just treat symptoms; we understand the unique story behind every patient. Our homeopathic approach is rooted in the principle of "Like Cures Like," stimulating your body's innate healing intelligence.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-sm font-black text-blue-600 uppercase tracking-[0.3em] mb-4"
            >
              Our Expertise
            </motion.h2>
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl font-black text-slate-900 mb-6"
            >
              Specialized Care for Every Need
            </motion.h3>
            <p className="text-xl text-slate-600">
              Discover natural solutions for a wide range of health challenges, delivered with precision and care.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
            <ServiceCard 
              index={0}
              icon={Stethoscope} 
              title="General Wellness" 
              description="Comprehensive constitutional treatment to boost overall vitality and prevent future illness."
            />
            <ServiceCard 
              index={1}
              icon={Activity} 
              title="Chronic Conditions" 
              description="Advanced management for long-standing issues like allergies, migraines, and autoimmune disorders."
            />
            <ServiceCard 
              index={2}
              icon={Sparkles} 
              title="Dermatology" 
              description="Natural, scar-free healing for acne, eczema, psoriasis, and complex skin pathologies."
            />
            <ServiceCard 
              index={3}
              icon={Baby} 
              title="Pediatric Care" 
              description="Gentle, sweet-pill treatments that children love, building strong immunity from the start."
            />
            <ServiceCard 
              index={4}
              icon={HeartPulse} 
              title="Women's Health" 
              description="Specialized support for hormonal balance, PCOD, and emotional well-being at every stage."
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="bg-gradient-to-br from-blue-600 to-blue-800 p-10 rounded-[2.5rem] shadow-2xl flex flex-col justify-center items-center text-center text-white relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              <div className="relative z-10">
                <h4 className="text-3xl font-black mb-4">Start Your Journey</h4>
                <p className="mb-10 text-blue-100 text-lg">Every healing path is unique. Let's map yours together.</p>
                <a href="#appointment" className="bg-white text-blue-600 px-10 py-4 rounded-2xl font-black text-lg hover:scale-105 transition-all inline-block shadow-xl">
                  Book Consultation
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Doctor Profile */}
      <section id="doctor" className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-[4rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row border border-slate-100">
            <div className="lg:w-1/2 relative overflow-hidden group">
              <img 
                src="https://picsum.photos/seed/doctor-shiv/800/1000" 
                alt="Doctor Profile" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            <div className="lg:w-1/2 p-12 lg:p-24 flex flex-col justify-center relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full translate-x-32 -translate-y-32 -z-10" />
              <motion.h2 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-blue-600 font-black uppercase tracking-[0.3em] text-sm mb-6"
              >
                Meet Your Healer
              </motion.h2>
              <h3 className="text-5xl lg:text-7xl font-black text-slate-900 mb-4 tracking-tight">Dr. Shiv Kumar</h3>
              <p className="text-2xl text-teal-600 font-bold mb-10 italic">BHMS</p>
              <div className="space-y-8 text-slate-600 text-lg sm:text-xl leading-relaxed">
                <p>
                  With a legacy of over 15 years in clinical homeopathy, Dr. Shiv has pioneered holistic protocols that have transformed thousands of lives across Gujarat.
                </p>
                <p>
                  His philosophy merges classical homeopathic wisdom with modern physiological insights, ensuring that every treatment is as precise as it is gentle.
                </p>
              </div>
              <div className="mt-16 grid grid-cols-2 gap-12">
                <div className="border-l-4 border-blue-600 pl-6">
                  <div className="text-4xl font-black text-slate-900">15+</div>
                  <div className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">Years Experience</div>
                </div>
                <div className="border-l-4 border-teal-500 pl-6">
                  <div className="text-4xl font-black text-slate-900">5k+</div>
                  <div className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">Success Stories</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timing & Reviews */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-16">
            {/* Timing */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-slate-900 p-12 rounded-[3rem] shadow-2xl text-white relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-700" />
              <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center mb-10 shadow-xl shadow-blue-900/20">
                <Clock size={32} />
              </div>
              <h3 className="text-3xl font-black mb-10">Clinic Hours</h3>
              <div className="space-y-8">
                <div className="flex justify-between items-center pb-6 border-b border-white/10">
                  <span className="font-bold text-slate-400">Mon - Sat</span>
                  <span className="text-blue-400 font-black text-lg">9:30 AM – 10:00 PM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-400">Sunday</span>
                  <span className="text-emerald-400 font-black text-lg">10:00 AM – 8:00 PM</span>
                </div>
              </div>
              <div className="mt-12 p-6 bg-white/5 rounded-2xl flex items-center gap-4 text-emerald-400 text-sm font-black border border-white/10">
                <ShieldCheck size={24} />
                Emergency consultations available
              </div>
            </motion.div>

            {/* Reviews Carousel */}
            <div className="lg:col-span-2 space-y-12">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                  <h3 className="text-4xl sm:text-5xl font-black text-slate-900 mb-2">Patient Voices</h3>
                  <p className="text-slate-500 font-medium">Real stories of healing and transformation.</p>
                </div>
                <div className="flex items-center gap-4 bg-slate-50 px-6 py-3 rounded-2xl border border-slate-100">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => <Star key={i} size={18} className="text-yellow-400 fill-yellow-400" />)}
                  </div>
                  <span className="font-black text-slate-900 text-lg">4.9/5</span>
                </div>
              </div>
              
              <div className="relative min-h-[300px] flex items-center">
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={testimonialIndex}
                    initial={{ opacity: 0, y: 20, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.98 }}
                    transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                    className="w-full"
                  >
                    <TestimonialCard 
                      name={TESTIMONIALS[testimonialIndex].name}
                      text={TESTIMONIALS[testimonialIndex].text}
                      rating={TESTIMONIALS[testimonialIndex].rating}
                    />
                  </motion.div>
                </AnimatePresence>
                
                <div className="absolute -bottom-16 left-0 right-0 flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="flex gap-3">
                    {TESTIMONIALS.map((_, i) => (
                      <button 
                        key={i}
                        onClick={() => setTestimonialIndex(i)}
                        className={`h-2 rounded-full transition-all duration-500 ${i === testimonialIndex ? 'bg-blue-600 w-12' : 'bg-slate-200 w-4'}`}
                        aria-label={`Go to testimonial ${i + 1}`}
                      />
                    ))}
                  </div>

                  <div className="flex gap-4">
                    <motion.button 
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setTestimonialIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
                      className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl border border-slate-200 flex items-center justify-center hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all shadow-sm"
                    >
                      <ChevronLeft size={24} className="sm:w-7 sm:h-7" />
                    </motion.button>
                    <motion.button 
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setTestimonialIndex((prev) => (prev + 1) % TESTIMONIALS.length)}
                      className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl border border-slate-200 flex items-center justify-center hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all shadow-sm"
                    >
                      <ChevronRight size={24} className="sm:w-7 sm:h-7" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Appointment Booking */}
      <section id="appointment" className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto bg-blue-900 rounded-[4rem] p-8 lg:p-20 shadow-3xl relative overflow-hidden border border-white/10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-[120px]" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-500/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-[120px]" />
            
            <div className="relative z-10 grid lg:grid-cols-2 gap-20 items-center">
              <div className="text-white">
                <motion.h3 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-5xl sm:text-6xl font-black mb-8 leading-tight tracking-tight"
                >
                  Ready to <br />
                  <span className="text-teal-400">Heal Naturally?</span>
                </motion.h3>
                <p className="text-blue-100 text-xl mb-12 leading-relaxed opacity-80">
                  Join thousands who have found lasting wellness through our specialized homeopathic protocols. Your journey to health starts with a single conversation.
                </p>
                <div className="space-y-8">
                  <div className="flex items-center gap-6 group cursor-pointer">
                    <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center group-hover:bg-blue-600 transition-all duration-300">
                      <Phone size={24} />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-blue-300 uppercase tracking-widest mb-1">Call Us Directly</div>
                      <div className="text-2xl font-black">{PHONE_NUMBER}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 group cursor-pointer">
                    <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center group-hover:bg-teal-500 transition-all duration-300">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-blue-300 uppercase tracking-widest mb-1">Visit Clinic</div>
                      <div className="text-2xl font-black">Railnagar, Rajkot</div>
                    </div>
                  </div>
                </div>
              </div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-white p-6 sm:p-12 rounded-[2.5rem] sm:rounded-[3rem] shadow-2xl border border-white/20 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 to-teal-400" />
                {formStatus === 'success' ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-16"
                  >
                    <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                      <ShieldCheck size={48} />
                    </div>
                    <h4 className="text-3xl font-black text-slate-900 mb-4">Request Received!</h4>
                    <p className="text-slate-600 text-lg">Our wellness coordinator will contact you within 2 hours to confirm your slot.</p>
                    <button 
                      onClick={() => setFormStatus('idle')}
                      className="mt-10 text-blue-600 font-black text-lg hover:underline flex items-center gap-2 mx-auto"
                    >
                      Send another request <ChevronRight size={20} />
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleBooking} className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-black text-slate-900 uppercase tracking-widest ml-1">Full Name</label>
                      <input 
                        required
                        type="text" 
                        placeholder="Enter your name"
                        className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 outline-none transition-all font-medium"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-black text-slate-900 uppercase tracking-widest ml-1">Phone Number</label>
                      <input 
                        required
                        type="tel" 
                        placeholder="+91 XXXXX XXXXX"
                        className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 outline-none transition-all font-medium"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-black text-slate-900 uppercase tracking-widest ml-1">Preferred Date</label>
                      <input 
                        required
                        type="date" 
                        className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 outline-none transition-all font-medium"
                      />
                    </div>
                    <motion.button 
                      whileHover={{ scale: 1.02, backgroundColor: "rgb(30, 58, 138)" }}
                      whileTap={{ scale: 0.98 }}
                      disabled={formStatus === 'submitting'}
                      type="submit" 
                      className="w-full bg-blue-900 text-white py-5 rounded-2xl font-black text-xl transition-all shadow-2xl shadow-blue-900/20 flex items-center justify-center gap-3 mt-8"
                    >
                      {formStatus === 'submitting' ? 'Processing...' : (
                        <>Confirm Request <Send size={24} /></>
                      )}
                    </motion.button>
                  </form>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact & Map Section */}
      <section id="contact" className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-12">
              <div>
                <motion.h2 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="text-blue-600 font-black uppercase tracking-[0.3em] text-sm mb-4"
                >
                  Get In Touch
                </motion.h2>
                <h3 className="text-5xl sm:text-6xl font-black text-slate-900 mb-6 tracking-tight">Visit Our Clinic</h3>
                <p className="text-slate-500 text-xl leading-relaxed max-w-lg">
                  Located in the heart of Rajkot, our clinic offers a serene environment for your healing journey.
                </p>
              </div>

              <div className="space-y-8">
                <motion.div 
                  whileHover={{ x: 10 }}
                  className="flex items-start gap-6 p-8 bg-slate-50 rounded-3xl border border-slate-100 transition-all"
                >
                  <div className="w-14 h-14 bg-blue-600 text-white rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-blue-200">
                    <MapPin size={28} />
                  </div>
                  <div>
                    <h4 className="text-xl font-black text-slate-900 mb-2">Our Location</h4>
                    <p className="text-slate-600 text-lg leading-relaxed">
                      Shiv Clinic, Opp. Railnagar Police Chowki,<br />
                      Railnagar, Rajkot, Gujarat 360001
                    </p>
                  </div>
                </motion.div>

                <motion.div 
                  whileHover={{ x: 10 }}
                  className="flex items-start gap-6 p-8 bg-slate-50 rounded-3xl border border-slate-100 transition-all"
                >
                  <div className="w-14 h-14 bg-teal-500 text-white rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-teal-200">
                    <Phone size={28} />
                  </div>
                  <div>
                    <h4 className="text-xl font-black text-slate-900 mb-2">Direct Contact</h4>
                    <p className="text-slate-600 text-lg font-bold mb-1">{PHONE_NUMBER}</p>
                    <p className="text-slate-400 text-sm font-medium">Available for calls 9 AM - 10 PM</p>
                  </div>
                </motion.div>

                <motion.div 
                  whileHover={{ x: 10 }}
                  className="flex items-start gap-6 p-8 bg-slate-50 rounded-3xl border border-slate-100 transition-all"
                >
                  <div className="w-14 h-14 bg-slate-900 text-white rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-slate-200">
                    <Mail size={28} />
                  </div>
                  <div>
                    <h4 className="text-xl font-black text-slate-900 mb-2">Email Support</h4>
                    <p className="text-slate-600 text-lg font-bold">contact@shivclinic.com</p>
                  </div>
                </motion.div>
              </div>
            </div>

            <div className="relative h-[600px] rounded-[4rem] overflow-hidden shadow-3xl border-8 border-white group">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3690.873214814544!2d70.7856423150274!3d22.32064198531234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3959c99666666667%3A0x1234567890abcdef!2sRailnagar%2C%20Rajkot%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1648580000000!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale group-hover:grayscale-0 transition-all duration-1000"
                title="Shiv Clinic Location"
              />
              <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-2xl border border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-black text-blue-600 uppercase tracking-widest mb-1">Clinic Status</p>
                    <p className="text-lg font-black text-slate-900">Open Now • Closes 10 PM</p>
                  </div>
                  <a 
                    href={`https://www.google.com/maps/dir/?api=1&destination=Shiv+Clinic+Railnagar+Rajkot`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-black text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
                  >
                    Get Directions
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 pt-24 pb-12 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-teal-400 to-blue-600" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 mb-20">
            <div className="space-y-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-900/50">
                  <Heart className="text-white fill-white" size={24} />
                </div>
                <span className="text-3xl font-black text-white tracking-tighter">SHIV<span className="text-blue-500">CLINIC</span></span>
              </div>
              <p className="text-slate-400 text-lg leading-relaxed">
                Pioneering natural healing through advanced homeopathic protocols. Trusted by thousands for holistic wellness since 2008.
              </p>
            </div>

            <div>
              <h4 className="text-white font-black text-xl mb-10">Quick Links</h4>
              <ul className="space-y-6">
                {['Home', 'About', 'Services', 'Doctor', 'Appointment'].map((item) => (
                  <li key={item}>
                    <a href={`#${item.toLowerCase()}`} className="text-slate-400 hover:text-blue-400 transition-all flex items-center gap-3 group">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full opacity-0 group-hover:opacity-100 transition-all" />
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-black text-xl mb-10">Our Services</h4>
              <ul className="space-y-6">
                {['Chronic Care', 'Skin Treatment', 'Hair Restoration', 'Child Health', 'Mental Wellness'].map((item) => (
                  <li key={item}>
                    <a href="#services" className="text-slate-400 hover:text-teal-400 transition-all flex items-center gap-3 group">
                      <div className="w-1.5 h-1.5 bg-teal-500 rounded-full opacity-0 group-hover:opacity-100 transition-all" />
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-slate-500 text-sm font-medium">
              © {new Date().getFullYear()} SHIV CLINIC. All rights reserved. Designed for excellence.
            </p>
            <div className="flex gap-10">
              <a href="#" className="text-slate-500 hover:text-white text-sm transition-all">Privacy Policy</a>
              <a href="#" className="text-slate-500 hover:text-white text-sm transition-all">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-4">
        <motion.a 
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          href={`https://wa.me/${PHONE_NUMBER.replace(/\D/g, '')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-16 h-16 bg-emerald-500 text-white rounded-2xl shadow-2xl flex items-center justify-center hover:bg-emerald-600 transition-all group"
        >
          <MessageCircle size={32} />
          <span className="absolute right-full mr-4 bg-slate-900 text-white px-4 py-2 rounded-xl text-sm font-black opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            WhatsApp Us
          </span>
        </motion.a>
        
        <AnimatePresence>
          {isScrolled && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="w-16 h-16 bg-blue-600 text-white rounded-2xl shadow-2xl flex items-center justify-center hover:bg-blue-700 transition-all group"
            >
              <ChevronRight className="-rotate-90 group-hover:-translate-y-1 transition-transform" size={32} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
