const ComplianceBadge = () => {
  return (
    <div className="relative">
      {/* Grid background container */}
      <div 
        className="w-full aspect-square max-w-md mx-auto rounded-2xl bg-gradient-to-br from-primary/5 to-cyan-500/5 p-8 flex items-center justify-center"
        style={{
          backgroundImage: `
            linear-gradient(to bottom right, hsl(var(--primary) / 0.05), hsl(210 100% 50% / 0.05)),
            linear-gradient(rgba(0,0,0,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.02) 1px, transparent 1px)
          `,
          backgroundSize: '100% 100%, 20px 20px, 20px 20px'
        }}
      >
        {/* SOC Badge */}
        <div className="relative bg-white rounded-xl shadow-xl p-8 transform hover:scale-105 transition-transform duration-300">
          {/* Badge content */}
          <div className="flex flex-col items-center space-y-4">
            {/* AICPA Logo placeholder */}
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-cyan-500 flex items-center justify-center">
              <span className="text-white font-bold text-2xl">SOC</span>
            </div>
            
            {/* Badge text */}
            <div className="text-center">
              <p className="font-bold text-heading text-lg">AICPA</p>
              <p className="text-sm text-muted-foreground">SOC 2 Type II</p>
              <p className="text-xs text-muted-foreground mt-1">Certified</p>
            </div>
            
            {/* Decorative checkmark */}
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating decorative elements */}
      <div className="absolute top-4 left-4 w-3 h-3 bg-primary/30 rounded-full animate-pulse" />
      <div className="absolute bottom-8 right-8 w-2 h-2 bg-cyan-400/30 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
    </div>
  );
};

export default ComplianceBadge;
