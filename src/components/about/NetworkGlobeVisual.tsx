const NetworkGlobeVisual = () => {
  return (
    <div className="relative w-full h-80 md:h-96">
      {/* Main globe container */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Outer ring */}
        <div className="absolute w-64 h-64 md:w-80 md:h-80 rounded-full border border-primary/20 animate-spin" style={{ animationDuration: '20s' }} />
        
        {/* Middle ring */}
        <div className="absolute w-48 h-48 md:w-64 md:h-64 rounded-full border border-primary/30 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }} />
        
        {/* Inner ring */}
        <div className="absolute w-32 h-32 md:w-48 md:h-48 rounded-full border border-primary/40" />
        
        {/* Center glow */}
        <div className="absolute w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-primary/30 to-cyan-500/20 blur-xl" />
        
        {/* Network nodes */}
        <div className="absolute top-8 left-1/4 w-2 h-2 bg-primary rounded-full animate-pulse" />
        <div className="absolute top-1/4 right-8 w-3 h-3 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
        <div className="absolute bottom-1/4 left-8 w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-8 right-1/4 w-2 h-2 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/3 left-1/3 w-1.5 h-1.5 bg-primary/80 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }} />
        <div className="absolute bottom-1/3 right-1/3 w-1.5 h-1.5 bg-cyan-400/80 rounded-full animate-pulse" style={{ animationDelay: '0.8s' }} />
        
        {/* Connection lines (using borders) */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          {/* Network connection lines */}
          <line x1="100" y1="80" x2="200" y2="150" stroke="url(#lineGradient)" strokeWidth="1" />
          <line x1="300" y1="100" x2="200" y2="150" stroke="url(#lineGradient)" strokeWidth="1" />
          <line x1="80" y1="250" x2="200" y2="200" stroke="url(#lineGradient)" strokeWidth="1" />
          <line x1="320" y1="300" x2="200" y2="200" stroke="url(#lineGradient)" strokeWidth="1" />
          <line x1="200" y1="150" x2="200" y2="200" stroke="url(#lineGradient)" strokeWidth="1" />
        </svg>
      </div>
      
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
    </div>
  );
};

export default NetworkGlobeVisual;
