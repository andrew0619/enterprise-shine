const DemoHero = () => {
  return (
    <section className="bg-white py-16">
      <div className="container">
        <div className="flex flex-col items-center text-center">
          {/* Badge */}
          <span className="bg-slate-100 text-slate-600 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            Demo
          </span>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Demo Apps for Developers
          </h1>

          {/* Subtext */}
          <p className="text-slate-600 text-lg max-w-2xl">
            Explore and test live AI models on GMI Cloud. Build prototypes, run experiments, 
            and integrate generative AI into your apps.
          </p>
        </div>
      </div>
    </section>
  );
};

export default DemoHero;
