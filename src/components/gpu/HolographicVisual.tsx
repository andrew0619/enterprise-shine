const HolographicVisual = () => {
  return (
    <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
      {/* Outer glow layer */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-500 via-pink-500 to-cyan-400 blur-3xl opacity-50 animate-pulse" />
      
      {/* Middle layer */}
      <div className="absolute inset-6 rounded-full bg-gradient-to-bl from-blue-600 via-purple-600 to-pink-500 blur-2xl opacity-70" />
      
      {/* Inner glowing disc */}
      <div className="absolute inset-12 rounded-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 opacity-90 animate-spin-slow" 
           style={{ animationDuration: '8s' }} />
      
      {/* Core bright center */}
      <div className="absolute inset-20 rounded-full bg-gradient-to-br from-white via-cyan-200 to-purple-300 blur-sm opacity-80" />
      
      {/* Accent rings */}
      <div className="absolute inset-4 rounded-full border border-purple-400/30" />
      <div className="absolute inset-10 rounded-full border border-cyan-400/20" />
      <div className="absolute inset-16 rounded-full border border-pink-400/20" />
    </div>
  );
};

export default HolographicVisual;
