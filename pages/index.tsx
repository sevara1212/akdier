import React from 'react';
import Head from 'next/head';

export default function Home() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Head>
        <title>Akdier - Waste Recycling Partner</title>
      </Head>
      {/* Header/NavBar */}
      <header className="bg-yellow-200 flex items-center justify-between px-8 py-2">
        <div className="flex items-center space-x-4">
          <img src="/logo.png" alt="Akdier Logo" className="h-10 w-10 rounded-full" />
          <nav className="hidden md:flex space-x-6 text-sm font-semibold">
            <a href="#" className="hover:underline">ГЛАВНАЯ</a>
            <a href="#" className="hover:underline">О КОМПАНИИ</a>
            <a href="#" className="hover:underline">УСЛУГИ</a>
            <a href="#" className="hover:underline">МЕДИА</a>
            <a href="#" className="hover:underline">ПРОЕКТЫ</a>
            <a href="#" className="hover:underline">ПОЛИТИКА КОМПАНИИ</a>
            <a href="#" className="hover:underline">КОНТАКТЫ</a>
          </nav>
        </div>
        <div className="flex items-center space-x-2">
          <input type="text" placeholder="" className="rounded-full px-3 py-1 border border-gray-300 focus:outline-none" />
          <button className="bg-black text-white px-4 py-1 rounded-full text-sm">Связаться С Нами</button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center bg-black">
        <img src="/hero-bg.png" alt="Hero" className="absolute inset-0 w-full h-full object-cover opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
        <div className="relative z-10 text-left max-w-2xl px-8">
          <div className="text-xs text-white/70 mb-2">THE BUSINESS OF TOMORROW</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Your trusted partner<br />
            <span className="text-yellow-300">for waste recycling</span><br />
            at South Kazakhstan
          </h1>
          <div className="flex items-center space-x-3 mt-6">
            <button className="flex items-center border-2 border-white rounded-full px-4 py-2 text-white hover:bg-white/10">
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-5.197-3.027A1 1 0 008 9.027v5.946a1 1 0 001.555.832l5.197-3.027a1 1 0 000-1.664z" /></svg>
              Наши сотрудники о ценностях АкДиЕр
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-[#0a1a3c] text-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold text-center mb-8">The year in numbers</h2>
          <div className="flex flex-col md:flex-row justify-between text-center mb-8">
            <div className="flex-1">
              <div className="text-4xl font-bold">$43.8</div>
              <div className="uppercase text-sm tracking-widest">Revenue</div>
              <div className="text-xs text-gray-300">million</div>
            </div>
            <div className="flex-1">
              <div className="text-4xl font-bold">$42.1</div>
              <div className="uppercase text-sm tracking-widest">Expenses</div>
              <div className="text-xs text-gray-300">million</div>
            </div>
            <div className="flex-1">
              <div className="text-4xl font-bold">15</div>
              <div className="uppercase text-sm tracking-widest">Partners</div>
              <div className="text-xs text-gray-300">organizations</div>
            </div>
          </div>
          <div className="border-t border-white/20 pt-8 text-center text-lg font-light">
            <span className="font-bold text-white">“AkDIEr</span> is more than a recycling company — we are Kazakhstan's trusted partner in <span className="font-bold text-yellow-300">building a cleaner, greener, and more sustainable future</span> through innovation, responsibility, and action.”
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="relative py-16 px-4 bg-blue-100">
        <img src="/services-bg.png" alt="Services Background" className="absolute inset-0 w-full h-full object-cover opacity-40" />
        <div className="relative z-10 max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">Our <span className="text-blue-700">Services</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {['Child Custody Disputes', 'Division of Debts and Assets', 'Division of Debts and Assets', 'Alimony and Spousal Support', 'Division of Debts and Assets'].map((service, i) => (
              <div key={i} className="bg-white rounded-xl shadow-md p-6 min-h-[120px] flex flex-col justify-between">
                <div className="font-semibold text-lg mb-2">{service}</div>
                <div className="text-gray-500 text-sm">Briefly talk about your firm's services here.</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">Our <span className="text-blue-900">Clients</span></h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
            {["Phases & Spaces Inc.", "schematiq", "MEMENTO", "Sprig & Sky", "Chapter & Co Books", "CuraAid +", "Crowd zero", "Wilderness Watchers Foundation"].map((client, i) => (
              <div key={i} className="text-center text-lg font-semibold text-gray-700">
                {/* Replace with logos if available */}
                {client}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0a1a3c] text-white py-10 px-4">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="mb-6 md:mb-0">
            <div className="font-semibold text-lg mb-2">Office</div>
            <div className="text-sm">123 Anywhere St. Any City ST 12345<br />Tel: +123-456-7890<br />hello@reallygreatsite.com</div>
          </div>
          <div className="mb-6 md:mb-0">
            <div className="font-semibold text-lg mb-2">Business hours</div>
            <div className="text-sm">Monday - Friday: 9am - 6pm<br />Saturday: 9am - 12pm</div>
          </div>
          <div>
            <div className="font-semibold text-lg mb-2">Get social</div>
            <div className="flex space-x-3">
              <a href="#" className="hover:text-yellow-300"><i className="fab fa-facebook-f"></i>F</a>
              <a href="#" className="hover:text-yellow-300"><i className="fab fa-instagram"></i>I</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
} 