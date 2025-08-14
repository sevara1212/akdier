import React, { useState, useEffect } from 'react';

const TypewriterText = ({ text, speed = 50 }: { text: string; speed?: number }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed]);

  return <span>{displayText}</span>;
};
import Head from 'next/head';

export default function Home() {
  const [counts, setCounts] = useState({ revenue: 0, expenses: 0, partners: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    // Initialize animation state once on mount
    setCounts({ revenue: 0, expenses: 0, partners: 0 });
    setIsVisible(false);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          console.log('Section is visible, starting animation');
          setIsVisible(true);
          setHasAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3, rootMargin: '0px 0px -10% 0px' }
    );

    const statsSection = document.getElementById('stats-section');
    if (statsSection) {
      observer.observe(statsSection);
      
      // Immediate check if already visible
      const rect = statsSection.getBoundingClientRect();
      const isInView = rect.top < window.innerHeight && rect.bottom > 0;
      
      if (isInView && !hasAnimated) {
        console.log('Section already visible, starting animation immediately');
        setIsVisible(true);
        setHasAnimated(true);
        observer.disconnect();
      }
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      console.log('Starting counting animation');
      
      const revenueTarget = 43.8;
      const expensesTarget = 42.1;
      const partnersTarget = 15;
      
      const duration = 2500; // 2.5 seconds
      const steps = 60; // 60 steps for smoother animation
      const stepDuration = duration / steps;
      
      let currentStep = 0;
      
      const timer = setInterval(() => {
        currentStep++;
        
        // Use easing function for smoother animation
        const progress = currentStep / steps;
        const easeOut = 1 - Math.pow(1 - progress, 3);
        
        const newRevenue = revenueTarget * easeOut;
        const newExpenses = expensesTarget * easeOut;
        const newPartners = Math.round(partnersTarget * easeOut);
        
        console.log(`Step ${currentStep}: Revenue=${newRevenue.toFixed(1)}, Expenses=${newExpenses.toFixed(1)}, Partners=${newPartners}`);
        
        setCounts({
          revenue: newRevenue,
          expenses: newExpenses,
          partners: newPartners
        });
        
        if (currentStep >= steps) {
          console.log('Animation completed');
          clearInterval(timer);
        }
      }, stepDuration);
      
      return () => clearInterval(timer);
    }
  }, [isVisible]);

  // Simple fallback: start animation shortly after mount if not triggered
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasAnimated) {
        console.log('Fallback: Starting animation after delay');
        setIsVisible(true);
        setHasAnimated(true);
      }
    }, 1200);

    return () => clearTimeout(timer);
  }, [hasAnimated]);

  return (
    <div className="bg-gray-50 min-h-screen font-roboto">
      <Head>
        <title>Akdier - Waste Recycling Partner</title>
        <link href="https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=HK+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Garet:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Telegraf:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>
      
      {/* Header/NavBar */}
      <header className="bg-[#0a1a3c] backdrop-blur-md flex items-center justify-between px-6 py-2 w-full shadow-lg border-b border-white/10 sticky top-0 z-50">
        <div className="flex items-center space-x-4">
          <div className="relative group">
            <img src="/logo.png" alt="Akdier Logo" className="h-14 w-14 rounded-full shadow-lg group-hover:scale-110 transition-transform duration-300" />
            <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          </div>
          <div className="w-px h-6 bg-gradient-to-b from-transparent via-white/30 to-transparent"></div>
          <nav className="hidden md:flex space-x-6 text-xs font-semibold">
            {['ГЛАВНАЯ', 'О КОМПАНИИ', 'УСЛУГИ', 'МЕДИА', 'ПРОЕКТЫ', 'ПОЛИТИКА КОМПАНИИ', 'КОНТАКТЫ'].map((item, i) => (
              <a key={i} href="#" className="text-white/90 hover:text-white relative px-3 py-2 transition-all duration-300 ease-out group">
                <span className="relative z-10">{item}</span>
                <div className="absolute inset-0 bg-white/20 rounded-lg scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left"></div>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></div>
              </a>
            ))}
          </nav>
        </div>
        <div className="flex items-center space-x-3">
          <div className="relative group">
            <input type="text" placeholder="Search..." className="rounded-full px-4 py-2 pl-10 border border-white/20 bg-white/10 backdrop-blur-sm text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all duration-300 text-sm w-48" />
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <button className="bg-black text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-gray-800 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">Связаться С Нами</button>
        </div>
      </header>

      {/* Hero Section */}
      <section
        className="relative w-full flex items-center justify-start bg-black overflow-hidden"
        style={{ height: '720px' }}
      >
        <img
          src="/hero-bg.png"
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-80"
          style={{ minHeight: '720px', minWidth: '100%' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
        <div className="relative z-10 flex flex-col justify-start h-full px-16 md:px-20 lg:px-24" style={{ paddingTop: '120px' }}>
          <div 
            className="text-white mb-4 tracking-widest uppercase"
            style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '15.6px' }}
          >
            THE BUSINESS OF TOMORROW
          </div>
          <h1
            className="font-bold text-white mb-6"
            style={{ fontFamily: 'Roboto, sans-serif', fontSize: '48.2px', lineHeight: '1.1', maxWidth: '700px' }}
          >
            Your trusted partner<br />
            <span className="text-white">for waste recycling</span><br />
            at South Kazakhstan
          </h1>
          <div className="flex items-center space-x-6 mt-10">
            <button className="group flex items-center bg-transparent border-2 border-white text-white rounded-full px-8 py-4 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
              <svg className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="2" fill="none" /><polygon points="10,8 16,12 10,16" fill="currentColor" /></svg>
              <span className="text-lg font-semibold">Наши сотрудники о ценностях АкДиЕр</span>
            </button>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <div className="text-white/80">
                <div className="text-sm font-medium">Trusted by 15+ organizations</div>
                <div className="text-xs">Leading waste management partner</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section 
        id="stats-section"
        className="bg-[#0a1a3c] text-white w-full flex items-center justify-center relative overflow-hidden"
        style={{ height: '720px' }}
      >
        <div className="absolute inset-0 opacity-50" style={{ backgroundImage: 'radial-gradient(circle at 30px 30px, rgba(255,255,255,0.03) 2px, transparent 2px)', backgroundSize: '60px 60px' }}></div>
        <div className="max-w-7xl mx-auto px-8 text-center relative z-10">
          <h2 
            className="font-bold mb-8 tracking-tight text-white"
            style={{ fontFamily: 'HK Grotesk, sans-serif', fontSize: '42px' }}
          >
            The year in numbers
          </h2>
          <div className="w-24 h-1 bg-[#d9b071] mx-auto mb-12 rounded-full"></div>
          <div className="flex flex-col md:flex-row justify-between text-center mb-8 gap-8 md:gap-0">
            <div className="flex-1">
              <div className="uppercase text-lg tracking-widest font-medium mb-2">Revenue</div>
              <div 
                className="font-bold mb-2"
                style={{ fontFamily: 'HK Grotesk, sans-serif', fontSize: '72px', lineHeight: '1' }}
              >
                ${counts.revenue.toFixed(1)}
              </div>
              <div 
                className="text-gray-300"
                style={{ fontFamily: 'HK Grotesk, sans-serif', fontSize: '14px' }}
              >
                million
              </div>
            </div>
            <div className="flex-1">
              <div className="uppercase text-lg tracking-widest font-medium mb-2">Expenses</div>
              <div 
                className="font-bold mb-2"
                style={{ fontFamily: 'HK Grotesk, sans-serif', fontSize: '72px', lineHeight: '1' }}
              >
                ${counts.expenses.toFixed(1)}
              </div>
              <div 
                className="text-gray-300"
                style={{ fontFamily: 'HK Grotesk, sans-serif', fontSize: '14px' }}
              >
                million
              </div>
            </div>
            <div className="flex-1">
              <div className="uppercase text-lg tracking-widest font-medium mb-2">Partners</div>
              <div 
                className="font-bold mb-2"
                style={{ fontFamily: 'HK Grotesk, sans-serif', fontSize: '72px', lineHeight: '1' }}
              >
                {Math.round(counts.partners)}
              </div>
              <div 
                className="text-gray-300"
                style={{ fontFamily: 'HK Grotesk, sans-serif', fontSize: '14px' }}
              >
                organizations
              </div>
            </div>
          </div>
          <div className="border-t border-white/20 pt-8 text-center max-w-4xl mx-auto">
            <div 
              className="text-white leading-relaxed"
              style={{ fontFamily: 'Telegraf, sans-serif', fontSize: '24px' }}
            >
              "<TypewriterText 
                text="AkDIEr is more than a recycling company — we are Kazakhstan's trusted partner in building a cleaner, greener, and more sustainable future through innovation, responsibility, and action."
                speed={30}
              />"
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section 
        className="relative w-full flex items-center justify-center overflow-hidden"
        style={{ height: '720px' }}
      >
        <img src="/services-bg.png" alt="Services Background" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-8 w-full">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-end pt-6 pb-8">
              <h2 className="text-white tracking-tight" style={{ fontFamily: 'Red Hat Display, sans-serif', fontSize: '47.4px' }}>Our <span className="font-bold">Services</span></h2>
            </div>
            <div className="bg-[#f2f2f2]/70 rounded-2xl p-6 md:p-8 shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              { title: 'Waste Management', img: '/waste.png', desc: 'Comprehensive waste collection and processing solutions' },
              { title: 'Transportation', img: '/transportation.png', desc: 'Efficient logistics and transportation services' },
              { title: 'Liquidation of pollution', img: '/liquidation.png', desc: 'Advanced pollution control and remediation' },
              { title: 'Cleaning the reserves', img: '/cleaning.png', desc: 'Environmental restoration and conservation' },
              { title: 'Collection and Utilisation', img: '/collection.png', desc: 'Sustainable resource recovery systems' },
              { title: 'Construction', img: '/construction.png', desc: 'Green construction and development projects' }
            ].map((service, i) => (
              <div key={i} className="group bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl hover:scale-105 transition-all duration-300">
                <div className="relative w-full h-32 overflow-hidden">
                  <img src={service.img} alt={service.title} className="absolute inset-0 w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-6">
                  <div className="font-bold text-lg mb-2 text-gray-800 group-hover:text-yellow-600 transition-colors duration-300">{service.title}</div>
                  <div className="text-gray-600 text-sm leading-relaxed">{service.desc}</div>
                </div>
              </div>
            ))}
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* Clients Section */}
      <section 
        className="bg-white w-full flex flex-col justify-center overflow-hidden"
        style={{ height: '600px' }}
      >
        <div className="max-w-6xl mx-auto px-8 w-full">
          {/* Title and Line */}
          <div className="flex items-center justify-center mb-12">
            <h2 
              className="text-center"
              style={{ fontFamily: 'Red Hat Display, sans-serif', fontSize: '48px', lineHeight: '1' }}
            >
              Our <span className="font-bold">Clients</span>
            </h2>
          </div>
          
          {/* Scrolling Clients */}
          <div className="space-y-20">
            {/* First Row - Moving Left */}
            <div className="overflow-hidden">
              <div className="flex space-x-24 animate-scroll-left">
                {[
                  { name: "Phases & Spaces Inc.", icon: "▲▲" },
                  { name: "schematiq", icon: "⬡" },
                  { name: "MEMENTO", icon: "●" },
                  { name: "Sprig & Sky", icon: "🌿" },
                  { name: "Chapter & Co Books", icon: "&" },
                  { name: "CuraAid +", icon: "+" },
                  { name: "Crowd zero", icon: "0" },
                  { name: "Wilderness Watchers Foundation", icon: "🐦" }
                ].map((client, i) => (
                  <div key={`left-${i}`} className="flex flex-col items-center justify-center space-y-3 whitespace-nowrap text-center">
                    <span className="text-gray-600 text-3xl">{client.icon}</span>
                    <span className="text-5xl font-semibold text-gray-700">{client.name}</span>
                  </div>
                ))}
                {/* Duplicate for seamless loop */}
                {[
                  { name: "Phases & Spaces Inc.", icon: "▲▲" },
                  { name: "schematiq", icon: "⬡" },
                  { name: "MEMENTO", icon: "●" },
                  { name: "Sprig & Sky", icon: "🌿" },
                  { name: "Chapter & Co Books", icon: "&" },
                  { name: "CuraAid +", icon: "+" },
                  { name: "Crowd zero", icon: "0" },
                  { name: "Wilderness Watchers Foundation", icon: "🐦" }
                ].map((client, i) => (
                  <div key={`left-duplicate-${i}`} className="flex flex-col items-center justify-center space-y-3 whitespace-nowrap text-center">
                    <span className="text-gray-600 text-3xl">{client.icon}</span>
                    <span className="text-5xl font-semibold text-gray-700">{client.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Second Row - Moving Right */}
            <div className="overflow-hidden">
              <div className="flex space-x-24 animate-scroll-right">
                {[
                  { name: "Wilderness Watchers Foundation", icon: "🐦" },
                  { name: "Crowd zero", icon: "0" },
                  { name: "CuraAid +", icon: "+" },
                  { name: "Chapter & Co Books", icon: "&" },
                  { name: "Sprig & Sky", icon: "🌿" },
                  { name: "MEMENTO", icon: "●" },
                  { name: "schematiq", icon: "⬡" },
                  { name: "Phases & Spaces Inc.", icon: "▲▲" }
                ].map((client, i) => (
                  <div key={`right-${i}`} className="flex flex-col items-center justify-center space-y-2 whitespace-nowrap text-center">
                    <span className="text-gray-600 text-4xl">{client.icon}</span>
                    <span className="text-6xl font-semibold text-gray-700">{client.name}</span>
                  </div>
                ))}
                {/* Duplicate for seamless loop */}
                {[
                  { name: "Wilderness Watchers Foundation", icon: "🐦" },
                  { name: "Crowd zero", icon: "0" },
                  { name: "CuraAid +", icon: "+" },
                  { name: "Chapter & Co Books", icon: "&" },
                  { name: "Sprig & Sky", icon: "🌿" },
                  { name: "MEMENTO", icon: "●" },
                  { name: "schematiq", icon: "⬡" },
                  { name: "Phases & Spaces Inc.", icon: "▲▲" }
                ].map((client, i) => (
                  <div key={`right-duplicate-${i}`} className="flex flex-col items-center justify-center space-y-2 whitespace-nowrap text-center">
                    <span className="text-gray-600 text-4xl">{client.icon}</span>
                    <span className="text-6xl font-semibold text-gray-700">{client.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer 
        className="bg-gradient-to-br from-[#0a1a3c] to-[#1a2a4c] text-white w-full overflow-hidden relative"
        style={{ height: '320px' }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30px_30px,rgba(255,255,255,0.02)_2px,transparent_2px)] opacity-30" style={{ backgroundSize: '60px 60px' }}></div>
        <div className="max-w-7xl mx-auto px-8 md:px-12 lg:px-16 h-full flex flex-col justify-center relative z-10">
          {/* Two Column Layout - Office and Business Hours */}
          <div className="flex flex-col md:flex-row justify-between items-start mb-10 gap-12" style={{ marginTop: '38px' }}>
            {/* Left Column - Office Information */}
            <div className="min-w-0 flex-1 group">
              <div className="font-bold mb-4 text-white group-hover:text-yellow-300 transition-colors duration-300" style={{ fontFamily: 'Garet, sans-serif', fontSize: '26px' }}>Office</div>
              <div className="text-white/90 leading-relaxed space-y-2" style={{ fontFamily: 'Garet, sans-serif', fontSize: '14px' }}>
                <div className="hover:text-yellow-200 transition-colors duration-200">123 Anywhere St. Any City ST 12345</div>
                <div className="hover:text-yellow-200 transition-colors duration-200">Tel: +123-456-7890</div>
                <div className="hover:text-yellow-200 transition-colors duration-200">hello@reallygreatsite.com</div>
              </div>
            </div>
            
            {/* Right Column - Business Hours */}
            <div className="min-w-0 flex-1 group">
              <div className="font-bold mb-4 text-white group-hover:text-yellow-300 transition-colors duration-300" style={{ fontFamily: 'Garet, sans-serif', fontSize: '26px' }}>Business hours</div>
              <div className="text-white/90 leading-relaxed space-y-2" style={{ fontFamily: 'Garet, sans-serif', fontSize: '14px' }}>
                <div className="hover:text-yellow-200 transition-colors duration-200">Monday - Friday: 9am - 6pm</div>
                <div className="hover:text-yellow-200 transition-colors duration-200">Saturday: 9am - 12pm</div>
              </div>
            </div>
          </div>

          {/* Social Media Section */}
          <div className="border-t border-white/20 pt-6">
            <div className="flex items-center space-x-4">
              <div className="font-bold text-white" style={{ fontFamily: 'Garet, sans-serif', fontSize: '22px' }}>Get social</div>
              <a href="#" className="text-white/80 hover:text-yellow-300 hover:scale-110 transition-all duration-300">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="text-white/80 hover:text-yellow-300 hover:scale-110 transition-all duration-300">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        
        @keyframes scroll-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        
        .animate-scroll-left {
          animation: scroll-left 30s linear infinite;
        }
        
        .animate-scroll-right {
          animation: scroll-right 30s linear infinite;
        }
      `}</style>
    </div>
  );
}
