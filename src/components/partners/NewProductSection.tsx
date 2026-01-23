const NewProductSection = () => {
  return (
    <section className="bg-black py-20 md:py-28 overflow-hidden">
      <div className="container">
        {/* Chrome Arch Visual */}
        <div className="relative h-48 md:h-64 mb-12">
          {/* Metallic arch layers */}
          <div className="absolute left-1/2 -translate-x-1/2 w-[600px] md:w-[800px] h-[300px] md:h-[400px]">
            {/* Main arc - blue/cyan gradient */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] md:w-[700px] h-[200px] md:h-[280px]">
              <div
                className="absolute inset-0 opacity-60"
                style={{
                  background:
                    "conic-gradient(from 180deg at 50% 100%, transparent 0deg, rgba(59, 130, 246, 0.3) 60deg, rgba(6, 182, 212, 0.5) 90deg, rgba(59, 130, 246, 0.3) 120deg, transparent 180deg)",
                  borderRadius: "50% 50% 0 0",
                }}
              />
            </div>
            {/* Inner arc - brighter */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] md:w-[550px] h-[160px] md:h-[220px]">
              <div
                className="absolute inset-0 opacity-40"
                style={{
                  background:
                    "conic-gradient(from 180deg at 50% 100%, transparent 0deg, rgba(147, 197, 253, 0.4) 70deg, rgba(165, 243, 252, 0.6) 90deg, rgba(147, 197, 253, 0.4) 110deg, transparent 180deg)",
                  borderRadius: "50% 50% 0 0",
                }}
              />
            </div>
            {/* Glow effect */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-cyan-500/20 blur-3xl" />
          </div>
        </div>

        {/* Content */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            New product
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-4">
            Develop access to the IT supply chain and connect with partners, OEMs, and ISVs in a single cohesive AI app workflow infrastructure.
          </p>
          <p className="text-zinc-500 text-sm leading-relaxed">
            We are connecting our partners and creating an ecosystem where the AI GPU is the core compute and ready for the latest technology to meet accelerated time-to-value and predictable workloads. Let us do the work for you.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewProductSection;
