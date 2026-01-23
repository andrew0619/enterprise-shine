import heroHolographic from "@/assets/gpu/hero-holographic.jpg";

const HolographicVisual = () => {
  return (
    <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
      {/* Outer glow layer */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-500 via-pink-500 to-cyan-400 blur-3xl opacity-40" />
      
      {/* Main holographic image */}
      <div className="relative w-full h-full rounded-full overflow-hidden">
        <img 
          src={heroHolographic} 
          alt="Holographic GPU visualization"
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Accent glow rings */}
      <div className="absolute inset-4 rounded-full border border-purple-400/20 pointer-events-none" />
      <div className="absolute inset-8 rounded-full border border-cyan-400/15 pointer-events-none" />
    </div>
  );
};

export default HolographicVisual;
