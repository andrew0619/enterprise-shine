const featureCards = [
  {
    title: "Rapid Deployment, Zero Hassle",
    description:
      "Scale instantly with fully managed infrastructure. Our inference engine comes with all the automation and tooling you need to ship faster, so you can focus on building.",
  },
  {
    title: "Optimized for Efficiency",
    description:
      "Advanced GPU optimization and model caching minimize latency while maximizing throughput. Get more inferences per dollar with our intelligent resource allocation.",
  },
];

const SmarterWayCards = () => {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="container">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
          A Smarter Way to Inference
        </h2>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {featureCards.map((card, index) => (
            <div
              key={index}
              className="bg-slate-100 rounded-2xl p-8 md:p-10"
            >
              <h3 className="text-xl font-semibold text-primary mb-4">
                {card.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SmarterWayCards;
