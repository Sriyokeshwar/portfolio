import React, { useState } from 'react';
import { motion } from 'framer-motion';
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
} from 'lucide-react';
import { useCursor } from '../context/CursorContext';
import { fadeUp } from '../animations/variants';

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
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('');
  const [statusType, setStatusType] = useState('success');
  const [isSending, setIsSending] = useState(false);

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
      setStatus("Thank you! Your message has been sent — I'll reply soon.");
      setFormData({ name: '', email: '', message: '' });
      setErrors({});
    } catch (err) {
      setStatusType('error');
      setStatus(
        `Couldn't send automatically — please email me directly at ${profile.email}.`
      );
    } finally {
      setIsSending(false);
      setTimeout(() => setStatus(''), 6000);
    }
  };

  return (
    <section id="contact" className="py-24 px-6 relative z-10">
      <div className="max-w-6xl mx-auto space-y-16">
        <SectionHeading
          badge="Get in Touch"
          title="Let's Build Together"
          subtitle="Open for full-time roles, internships, and high-impact full stack collaborations."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Info & Quick Action Buttons */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="lg:col-span-5 space-y-6"
          >
            <GlassCard className="p-8 space-y-6">
              <Badge />

              <div className="space-y-4 pt-2">
                {/* Email Block */}
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-full glass-panel text-primary">
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

                {/* Phone & Direct Action Buttons */}
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-full glass-panel text-secondary">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-text-muted">Phone / WhatsApp</p>
                      <p className="text-sm font-bold text-text-primary">
                        {profile.phone}
                      </p>
                    </div>
                  </div>

                  {/* Call, WhatsApp, Copy Buttons */}
                  <div className="flex items-center gap-2 pt-1 pl-12">
                    <a
                      href={`tel:${profile.phoneRaw}`}
                      onMouseEnter={() => setCursor('hover-link', 'Call')}
                      onMouseLeave={resetCursor}
                      className="px-3 py-1.5 rounded-full text-xs font-semibold glass-panel border border-secondary/30 text-secondary hover:bg-secondary/10 transition-colors flex items-center gap-1"
                    >
                      <PhoneCall className="w-3 h-3" /> Call
                    </a>

                    <a
                      href={profile.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onMouseEnter={() => setCursor('hover-link', 'WhatsApp')}
                      onMouseLeave={resetCursor}
                      className="px-3 py-1.5 rounded-full text-xs font-semibold glass-panel border border-success/30 text-success hover:bg-success/10 transition-colors flex items-center gap-1"
                    >
                      <MessageCircle className="w-3 h-3" /> WhatsApp
                    </a>

                    <button
                      onClick={copyPhone}
                      onMouseEnter={() => setCursor('hover-link', 'Copy')}
                      onMouseLeave={resetCursor}
                      className="px-3 py-1.5 rounded-full text-xs font-semibold glass-panel border border-white/20 text-text-muted hover:text-text-primary transition-colors flex items-center gap-1"
                    >
                      <Copy className="w-3 h-3" /> Copy
                    </button>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center gap-3 pt-1">
                  <div className="p-3 rounded-full glass-panel text-accent">
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

              {/* Resume Button */}
              <div className="pt-4 border-t border-white/10">
                <Button
                  href={profile.assets.resumePdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="primary"
                  size="md"
                  icon={FileText}
                  className="w-full justify-center"
                >
                  Download Official Resume
                </Button>
              </div>

              {/* Social Links */}
              <div className="pt-4 space-y-2">
                <span className="text-xs font-mono uppercase tracking-wider text-text-muted">
                  Follow & Connect:
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
                        className="p-2.5 rounded-full glass-panel text-text-muted hover:text-primary hover:border-primary/40 transition-all duration-300 hover:scale-110"
                        aria-label={soc.name}
                      >
                        <Icon className="w-4 h-4" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Right Column: Interactive Glass Contact Form */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="lg:col-span-7"
          >
            <GlassCard className="p-8 space-y-6">
              <h3 className="text-2xl font-bold font-heading text-text-primary">
                Send a Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div>
                  <label className="block text-xs font-medium text-text-muted mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      if (errors.name) setErrors({ ...errors, name: '' });
                    }}
                    placeholder="Enter your name"
                    className={`w-full px-4 py-3 rounded-xl glass-panel text-text-primary placeholder-text-muted text-sm focus:outline-none transition-colors ${
                      errors.name
                        ? 'border-red-500/80 focus:border-red-500'
                        : 'focus:border-primary/50'
                    }`}
                  />
                  {errors.name && (
                    <p className="text-[11px] font-mono text-red-400 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-text-muted mb-1">
                    Your Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (errors.email) setErrors({ ...errors, email: '' });
                    }}
                    placeholder="name@company.com"
                    className={`w-full px-4 py-3 rounded-xl glass-panel text-text-primary placeholder-text-muted text-sm focus:outline-none transition-colors ${
                      errors.email
                        ? 'border-red-500/80 focus:border-red-500'
                        : 'focus:border-primary/50'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-[11px] font-mono text-red-400 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-text-muted mb-1">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value });
                      if (errors.message) setErrors({ ...errors, message: '' });
                    }}
                    placeholder="Tell me about your project or role opportunity..."
                    className={`w-full px-4 py-3 rounded-xl glass-panel text-text-primary placeholder-text-muted text-sm focus:outline-none transition-colors resize-none ${
                      errors.message
                        ? 'border-red-500/80 focus:border-red-500'
                        : 'focus:border-primary/50'
                    }`}
                  />
                  {errors.message && (
                    <p className="text-[11px] font-mono text-red-400 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.message}
                    </p>
                  )}
                </div>

                {status && (
                  <p
                    className={`text-xs font-medium font-mono ${
                      statusType === 'success' ? 'text-success' : 'text-red-400'
                    }`}
                  >
                    {status}
                  </p>
                )}

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  icon={Send}
                  disabled={isSending}
                  className="w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSending ? 'Sending…' : 'Send Message'}
                </Button>
              </form>
            </GlassCard>
          </motion.div>
        </div>
      </div>

      <Toast isVisible={showToast} message={toastMessage} />
    </section>
  );
};
