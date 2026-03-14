import { ArrowLeft, Instagram, Mail, Phone, Globe, MessageCircle, MapPin, ExternalLink } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export default function ContactScreen({ onBack }: { onBack: () => void }) {
  const { darkMode, t } = useTheme();
  const socialLinks = [
    {
      name: 'Instagram',
      icon: <Instagram size={24} />,
      label: '@ecoclub.turqyz',
      url: 'https://www.instagram.com/ecoclub.turqyz?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
      color: 'bg-pink-500/10 text-pink-500'
    },
    {
      name: 'WhatsApp',
      icon: <MessageCircle size={24} />,
      label: 'Eco-Club Support',
      url: 'https://wa.me/#',
      color: 'bg-green-500/10 text-green-500'
    },
    {
      name: 'TikTok',
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.89-.6-4.13-1.47V13.3c0 1.97-.5 3.99-1.85 5.48-1.3 1.5-3.39 2.32-5.39 2.19-2.45-.13-4.73-1.86-5.45-4.23-.78-2.68.06-5.85 2.23-7.41 1.29-.93 2.86-1.31 4.44-1.18v4.06c-.95-.1-1.98.09-2.75.71-.82.68-1.14 1.81-.81 2.82.31.99 1.29 1.66 2.32 1.69 1.05.05 2.1-.59 2.5-1.51.28-.63.33-1.33.33-2.02V0z" />
        </svg>
      ),
      label: '@ecoclub.turqyz',
      url: 'https://www.tiktok.com/@ecoclub.turqyz',
      color: 'bg-[var(--color-text-main)]/10 text-[var(--color-text-main)]'
    }
  ];

  return (
    <div className="pb-24 flex flex-col min-h-full font-display bg-[var(--color-bg-main)] text-[var(--color-text-main)]">
      {/* Header */}
      <header className="flex items-center justify-between p-4 pt-12 bg-[var(--color-accent)] z-10 relative overflow-hidden">
        <div className="absolute inset-0 geometric-green opacity-10" />
        <button 
          onClick={onBack}
          className="text-[var(--color-bg-main)] hover:bg-[var(--color-bg-main)]/10 transition-colors flex items-center justify-center w-10 h-10 rounded-full relative z-10"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg font-black tracking-tight uppercase text-[var(--color-bg-main)] relative z-10">Contact Us</h1>
        <div className="w-10 h-10" /> {/* Spacer */}
      </header>

      <main className="flex-1 flex flex-col px-6 space-y-8 pt-8 relative z-10">
        {/* Hero */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-[var(--color-accent)] text-[var(--color-bg-main)] shadow-xl shadow-[var(--color-accent)]/20 relative overflow-hidden">
            <div className="absolute inset-0 geometric-green opacity-10" />
            <Globe size={40} />
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl font-black text-[var(--color-text-main)] leading-tight">Get in Touch</h2>
            <p className="text-[var(--color-text-secondary)] text-sm font-bold uppercase tracking-widest">Official Eco-Club of Turkistan Bilim-Innovation Lyceum (turqyz)</p>
          </div>
        </div>

        {/* Social Links */}
        <div className="space-y-4">
          <h3 className="text-[10px] font-black text-[var(--color-text-secondary)] uppercase tracking-widest ml-1">Social Channels</h3>
          {socialLinks.map((link) => (
            <a 
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-5 rounded-3xl bg-[var(--color-card-bg)] border border-[var(--color-border)] shadow-xl shadow-black/5 hover:shadow-black/10 transition-all group"
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${link.color}`}>
                {link.icon}
              </div>
              <div className="flex-1">
                <p className="text-[10px] font-black text-[var(--color-text-secondary)]/40 uppercase tracking-widest">{link.name}</p>
                <p className="text-sm font-black text-[var(--color-text-main)]">{link.label}</p>
              </div>
              <ExternalLink size={18} className="text-[var(--color-text-secondary)]/20 group-hover:text-[var(--color-text-main)] transition-colors" />
            </a>
          ))}
        </div>

        {/* Location / Office */}
        <div className="p-6 rounded-[40px] bg-[var(--color-accent)] text-[var(--color-bg-main)] relative overflow-hidden shadow-2xl shadow-[var(--color-accent)]/30">
          <div className="absolute top-0 right-0 w-32 h-32 geometric-green opacity-10 -mr-8 -mt-8 rotate-12" />
          <div className="flex items-start gap-4 relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-[var(--color-bg-main)]/10 flex items-center justify-center shrink-0 border border-[var(--color-bg-main)]/10">
              <MapPin size={24} className="text-[var(--color-bg-main)]" />
            </div>
            <div>
              <h4 className="text-lg font-black uppercase tracking-tight text-[var(--color-bg-main)]/60">Eco-Hub Office</h4>
              <p className="text-sm text-[var(--color-bg-main)]/80 font-medium leading-relaxed mt-1">
                Turkistan Bilim-Innovation Lyceum<br />
                Girls' Side • Room 204<br />
                Available: 15:00 - 17:00 (Mon-Fri)
              </p>
            </div>
          </div>
        </div>

        {/* Support Note */}
        <div className="text-center px-4">
          <p className="text-[10px] text-[var(--color-text-secondary)]/40 font-bold uppercase tracking-[0.2em] leading-relaxed">
            Have a question about points or verification? <br />
            Our tutors are here to help you 24/7.
          </p>
        </div>
      </main>
    </div>
  );
}
