import React from 'react';
import './StaticPage.css';

interface StaticPageProps {
  title: string;
  onBack: () => void;
  children: React.ReactNode;
}

export function StaticPage({ title, onBack, children }: StaticPageProps) {
  return (
    <div className="sp-page">
      <header className="sp-header">
        <button className="sp-back" onClick={onBack} aria-label="Go back">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
        </button>
        <div className="sp-header-brand">
          <img src="/Afroslang.png" alt="Afroslang" className="sp-logo" />
          <span className="sp-brand-name">AFRO<em>SLANG</em></span>
        </div>
      </header>

      <div className="sp-body">
        <div className="sp-content">
          <h1 className="sp-title">{title}</h1>
          <div className="sp-prose">{children}</div>
        </div>
      </div>
    </div>
  );
}
