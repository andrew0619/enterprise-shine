const NodeNetwork = () => {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="lineGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(255,255,255,0)" />
          <stop offset="50%" stopColor="rgba(255,255,255,0.2)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
        <linearGradient id="lineGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,255,255,0)" />
          <stop offset="50%" stopColor="rgba(255,255,255,0.2)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
      </defs>
      
      {/* Lines from floating cards to center */}
      <line x1="15%" y1="25%" x2="50%" y2="50%" stroke="url(#lineGradient1)" strokeWidth="1" />
      <line x1="85%" y1="20%" x2="50%" y2="50%" stroke="url(#lineGradient1)" strokeWidth="1" />
      <line x1="8%" y1="50%" x2="50%" y2="50%" stroke="url(#lineGradient1)" strokeWidth="1" />
      <line x1="92%" y1="55%" x2="50%" y2="50%" stroke="url(#lineGradient1)" strokeWidth="1" />
      <line x1="20%" y1="80%" x2="50%" y2="50%" stroke="url(#lineGradient1)" strokeWidth="1" />
      <line x1="80%" y1="75%" x2="50%" y2="50%" stroke="url(#lineGradient1)" strokeWidth="1" />
      
      {/* Center node dot */}
      <circle cx="50%" cy="50%" r="4" fill="rgba(255,255,255,0.3)" />
    </svg>
  );
};

export default NodeNetwork;
