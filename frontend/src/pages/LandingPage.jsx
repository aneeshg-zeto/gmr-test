import { Link } from 'react-router-dom';
import { ArrowRight, Home, Bot, Sparkles } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-20 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-primary text-white shadow-soft">
        <Home size={32} />
      </div>

      <h1 className="mt-8 font-display text-5xl font-bold text-secondary sm:text-6xl">
        GMR AI Homes
      </h1>

      <p className="mt-4 max-w-lg text-lg text-muted">
        Your AI-powered real estate assistant. Find homes, check prices, calculate EMIs, and get expert guidance — just ask.
      </p>

      <div className="mt-6 flex items-center gap-2 text-sm text-muted">
        <Bot size={16} />
        <span>Powered by Groq AI</span>
        <Sparkles size={14} className="text-accent" />
      </div>

      <Link
        to="/chat"
        className="mt-10 inline-flex items-center gap-2 rounded-2xl bg-primary px-8 py-4 text-lg font-semibold text-white shadow-soft transition hover:translate-y-[-2px] hover:bg-blue-700"
      >
        Start Chatting
        <ArrowRight size={20} />
      </Link>

      <div className="mt-16 grid gap-4 sm:grid-cols-3">
        {[
          { title: 'Property Search', desc: 'Find homes by budget, location, BHK, and more' },
          { title: 'Market Insights', desc: 'Understand pricing trends and neighborhood data' },
          { title: 'Home Buying Help', desc: 'EMI calc, legal docs, and buying process' },
        ].map((item) => (
          <div key={item.title} className="rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-soft">
            <p className="font-display text-lg font-bold text-secondary">{item.title}</p>
            <p className="mt-1 text-sm text-muted">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
