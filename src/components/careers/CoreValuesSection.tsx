const coreValues = [
  {
    title: "Engineering Excellence",
    description:
      "Build complex, cutting-edge technology that push the limits of what's possible. If you're an engineer who thrives on innovation, this is where you can truly test your skills and grow.",
  },
  {
    title: "Business at the Forefront",
    description:
      "Join a team of bold thinkers charting a global business from the ground up. We're looking for exceptional problem solvers ready to make a real impact in a rapidly evolving industry.",
  },
  {
    title: "Startup Energy, Big Ambitions",
    description:
      "We move fast, value fresh ideas, and believe in bold leaps. At NexusAI Cloud, proactivity, speed, and innovation aren't just encouraged — they're essential.",
  },
];

const CoreValuesSection = () => {
  return (
    <section className="bg-background py-16 md:py-20">
      <div className="container">
        {/* Kicker Text */}
        <p className="text-muted-foreground text-sm mb-10 max-w-2xl">
          We're not just offering jobs — we're offering the chance to shape the future of AI.
        </p>

        {/* Values Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {coreValues.map((value, index) => (
            <div
              key={index}
              className="bg-blue-50/50 rounded-xl p-8"
            >
              <h3 className="text-lg font-semibold text-primary mb-3">
                {value.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreValuesSection;
