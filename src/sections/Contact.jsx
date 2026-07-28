import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionHeading } from '../components/shared/SectionHeading';
import { GlassCard } from '../components/ui/GlassCard';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Toast } from '../components/ui/Toast';
import { profile } from '../data/profile';
import {
  Mail,
  Phone,
  MapPin,
  Copy,
  Send,
  FileText,
  MessageCircle,
  PhoneCall,
  Github,
  Linkedin,
  Code2,
  Terminal,
  Instagram,
  Figma,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';
import { useCursor } from '../context/CursorContext';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { cn } from '../utils/cn';

gsap.registerPlugin(ScrollTrigger);

const socialIcons = [
  { name: 'GitHub', href: profile.links.github, icon: Github },
  { name: 'LinkedIn', href: profile.links.linkedin, icon: Linkedin },
  { name: 'LeetCode', href: profile.links.leetcode, icon: Code2 },
  { name: 'HackerRank', href: profile.links.hackerrank, icon: Terminal },
  { name: 'Instagram', href: profile.links.instagram, icon: Instagram },
  { name: 'Figma', href: profile.links.figma, icon: Figma },
];

export const Contact = () => {
  const { setCursor, resetCursor } = useCursor();
  const prefersReducedMotion = useReducedMotion();

  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [focusedField, setFocusedField] = useState('');
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('');
  const [statusType, setStatusType] = useState('success');
  const [isSending, setIsSending] = useState(false);

  const contactSectionRef = useRef(null);

  // GSAP Cinematic Reveal triggers
  useEffect(() => {
    if (prefersReducedMotion) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: contactSectionRef.current,
        start: 'top bottom-=50px',
        end: 'bottom bottom',
        scrub: 1,
      }
    });

    // Darken the background layers
    tl.to('.contact-darken-overlay', {
      opacity: 0.92,
      duration: 1,
    }, 0);

    // Rise the contact card
    tl.fromTo('.contact-main-card',
      { y: 150, scale: 0.95, opacity: 0 },
      { y: 0, scale: 1, opacity: 1, duration: 1, ease: 'power2.out' },
      0
    );

    // Fade in particles
    tl.fromTo('.contact-reveal-particles',
      { opacity: 0, scale: 0.7 },
      { opacity: 0.6, scale: 1, duration: 1 },
      0
    );

    // Social icon rotation staggers
    tl.fromTo('.contact-social-item',
      { rotate: -35, opacity: 0, scale: 0.6 },
      { rotate: 0, opacity: 1, scale: 1, stagger: 0.08, duration: 1, ease: 'back.out(1.7)' },
      0.2
    );

    return () => {
      tl.kill();
    };
  }, [prefersReducedMotion]);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    triggerToast('Email address copied to clipboard!');
  };

  const copyPhone = () => {
    navigator.clipboard.writeText(profile.phoneRaw);
    triggerToast('Phone number copied to clipboard!');
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required.';
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!formData.message.trim()) newErrors.message = 'Message cannot be empty.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSending(true);
    setStatus('');

    try {
      const res = await fetch(`https://formsubmit.co/ajax/${profile.email}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `Portfolio contact from ${formData.name}`,
        }),
      });

      if (!res.ok) throw new Error('Request failed');

      setStatusType('success');
      setStatus(
        `Thanks! Your message has been submitted. If you do not hear back soon, email me directly at ${profile.email}. If this is your first time using FormSubmit, please check your inbox for the activation email.`
      );
      setFormData({ name: '', email: '', message: '' });
      setErrors({});
    } catch (err) {
      setStatusType('error');
      setStatus(
        `The automated form is not available yet. Please email me directly at ${profile.email} and check your inbox for the FormSubmit activation email.`
      );
    } finally {
      setIsSending(false);
      setTimeout(() => setStatus(''), 8000);
    }
  };

  const getLabelClass = (fieldName, hasValue) =>
    cn(
      'absolute left-4 top-3.5 text-xs text-text-muted transition-all duration-300 pointer-events-none origin-left select-none',
      focusedField === fieldName || hasValue
        ? 'transform -translate-y-6 scale-90 text-primary bg-[#050816] px-2 z-10'
        : 'transform translate-y-0 scale-100 text-sm'
    );

  return (
    <section
      ref={contactSectionRef}
      id="contact"
      className="py-24 px-6 relative overflow-hidden bg-[#050816]"
    >
      {/* Cinematic Darken Overlay */}
      <div className="contact-darken-overlay absolute inset-0 bg-[#020308] opacity-0 pointer-events-none transition-opacity duration-700 z-0" />

      {/* Floating Particles Overlay */}
      <div className="contact-reveal-particles absolute inset-0 pointer-events-none overflow-hidden opacity-0 z-[1] select-none">
        <div className="absolute top-[20%] left-[15%] w-2 h-2 rounded-full bg-primary/40 blur-[1px] animate-pulse" />
        <div className="absolute top-[60%] left-[80%] w-3 h-3 rounded-full bg-secondary/40 blur-[1px] animate-pulse" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-[40%] left-[75%] w-2 h-2 rounded-full bg-accent/40 blur-[1px] animate-pulse" style={{ animationDelay: '3s' }} />
        <div className="absolute top-[75%] left-[25%] w-3 h-3 rounded-full bg-primary/40 blur-[1px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-6xl mx-auto space-y-16 relative z-10">
        <SectionHeading
          badge="Get in Touch"
          title="Let's Build Together"
          subtitle="Open for full-time developer roles, internships, and high-craft collaborations."
        />

        {/* Rising Glass Contact Card */}
        <div className="contact-main-card grid grid-cols-1 lg:grid-cols-12 gap-8 items-start will-change-transform">
          
          {/* Left Panel: Contact info */}
          <div className="lg:col-span-5 space-y-6">
            <GlassCard
              glowColor="rgba(96, 165, 250, 0.24)"
              className="p-8 space-y-6 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
            >
              <Badge />

              <div className="space-y-4 pt-2">
                {/* Email Info */}
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-full glass-panel border border-white/10 text-primary">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-text-muted">Email</p>
                    <button
                      onClick={copyEmail}
                      onMouseEnter={() => setCursor('hover-link', 'Copy')}
                      onMouseLeave={resetCursor}
                      className="text-sm font-bold text-text-primary hover:text-primary transition-colors flex items-center gap-2 group"
                    >
                      <span>{profile.email}</span>
                      <Copy className="w-3.5 h-3.5 text-text-muted group-hover:text-primary transition-colors" />
                    </button>
                  </div>
                </div>

                {/* Phone & Direct Contacts */}
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-full glass-panel border border-white/10 text-secondary">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-text-muted">Phone / WhatsApp</p>
                      <p className="text-sm font-bold text-text-primary">
                        {profile.phone}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-1 pl-12 flex-wrap">
                    <a
                      href={`tel:${profile.phoneRaw}`}
                      onMouseEnter={() => setCursor('hover-link', 'Call')}
                      onMouseLeave={resetCursor}
                      className="px-3 py-1.5 rounded-full text-xs font-semibold glass-panel border border-secondary/30 text-secondary hover:bg-secondary/10 transition-colors flex items-center gap-1"
                    >
                      <PhoneCall className="w-3.5 h-3.5" /> Call
                    </a>
                    <a
                      href={profile.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onMouseEnter={() => setCursor('hover-link', 'WhatsApp')}
                      onMouseLeave={resetCursor}
                      className="px-3 py-1.5 rounded-full text-xs font-semibold glass-panel border border-success/30 text-success hover:bg-success/10 transition-colors flex items-center gap-1"
                    >
                      <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center gap-3 pt-1">
                  <div className="p-3 rounded-full glass-panel border border-white/10 text-accent">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-text-muted">Location</p>
                    <p className="text-sm font-bold text-text-primary">
                      {profile.location}
                    </p>
                  </div>
                </div>
              </div>

              {/* Resume download link */}
              <div className="pt-4 border-t border-white/10">
                <Button
                  href={profile.assets.resumePdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="primary"
                  size="md"
                  icon={FileText}
                  className="w-full justify-center shadow-[0_0_30px_rgba(96,165,250,0.2)]"
                >
                  Download Resume
                </Button>
              </div>

              {/* Connected Social icon row */}
              <div className="pt-4 space-y-2">
                <span className="text-xs font-mono uppercase tracking-wider text-text-muted">
                  Find me online:
                </span>
                <div className="flex items-center gap-2.5 flex-wrap">
                  {socialIcons.map((soc) => {
                    const Icon = soc.icon;
                    return (
                      <a
                        key={soc.name}
                        href={soc.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="contact-social-item p-2.5 rounded-full glass-panel text-text-muted border border-white/10 hover:text-primary hover:border-primary/40 transition-all duration-300 hover:scale-110"
                        aria-label={soc.name}
                      >
                        <Icon className="w-4 h-4" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Right Panel: Active Contact Form */}
          <div className="lg:col-span-7">
            <GlassCard
              glowColor="rgba(236, 72, 153, 0.24)"
              className="p-8 space-y-6 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
            >
              <h3 className="text-2xl font-extrabold font-heading text-text-primary">
                Send a Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                
                {/* Name */}
                <div className="relative">
                  <input
                    type="text"
                    value={formData.name}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField('')}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      if (errors.name) setErrors({ ...errors, name: '' });
                    }}
                    className={cn(
                      'w-full px-4 py-3.5 rounded-xl glass-panel border border-white/10 text-text-primary text-sm focus:outline-none transition-all duration-300 bg-transparent',
                      errors.name ? 'border-red-500/80 focus:border-red-500' : 'focus:border-primary/50'
                    )}
                  />
                  <label className={getLabelClass('name', formData.name)}>
                    Your Name
                  </label>
                  {errors.name && (
                    <p className="text-[11px] font-mono text-red-400 mt-1.5 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="relative">
                  <input
                    type="email"
                    value={formData.email}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField('')}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (errors.email) setErrors({ ...errors, email: '' });
                    }}
                    className={cn(
                      'w-full px-4 py-3.5 rounded-xl glass-panel border border-white/10 text-text-primary text-sm focus:outline-none transition-all duration-300 bg-transparent',
                      errors.email ? 'border-red-500/80 focus:border-red-500' : 'focus:border-primary/50'
                    )}
                  />
                  <label className={getLabelClass('email', formData.email)}>
                    Email Address
                  </label>
                  {errors.email && (
                    <p className="text-[11px] font-mono text-red-400 mt-1.5 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.email}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div className="relative">
                  <textarea
                    rows={4}
                    value={formData.message}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField('')}
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value });
                      if (errors.message) setErrors({ ...errors, message: '' });
                    }}
                    className={cn(
                      'w-full px-4 py-3.5 rounded-xl glass-panel border border-white/10 text-text-primary text-sm focus:outline-none transition-all duration-300 resize-none bg-transparent',
                      errors.message ? 'border-red-500/80 focus:border-red-500' : 'focus:border-primary/50'
                    )}
                  />
                  <label className={getLabelClass('message', formData.message)}>
                    Message Content
                  </label>
                  {errors.message && (
                    <p className="text-[11px] font-mono text-red-400 mt-1.5 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.message}
                    </p>
                  )}
                </div>

                {status && (
                  <motion.p
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn(
                      'text-xs font-semibold font-mono flex items-center gap-1.5 p-3 rounded-lg border',
                      statusType === 'success' 
                        ? 'text-success bg-success/5 border-success/20' 
                        : 'text-red-400 bg-red-500/5 border-red-500/20'
                    )}
                  >
                    {statusType === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                    {status}
                  </motion.p>
                )}

                <div className="rounded-xl border border-primary/20 bg-primary/5 p-3 text-[11px] font-mono text-text-muted leading-relaxed">
                  If the automated form does not respond immediately, email me directly at{' '}
                  <a href={`mailto:${profile.email}`} className="text-primary underline decoration-primary/40 underline-offset-2">
                    {profile.email}
                  </a>
                  . If this is your first time using FormSubmit, please check your inbox for the confirmation email so the form can be activated.
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  icon={Send}
                  disabled={isSending}
                  className="w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed hover:shadow-[0_0_30px_rgba(96,165,250,0.22)] duration-300"
                >
                  {isSending ? 'Sending…' : 'Send Message'}
                </Button>
              </form>
            </GlassCard>
          </div>
        </div>
      </div>

      <Toast isVisible={showToast} message={toastMessage} />
    </section>
  );
};
