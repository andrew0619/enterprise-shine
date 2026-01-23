const solutions = [
  {
    title: "On-Demand Access",
    description: "Flexible hourly billing for experimentation and development workloads with instant provisioning. Perfect for teams exploring new model architectures or running periodic training jobs."
  },
  {
    title: "Reserved Capacity",
    description: "Discounted pricing for long-term AI projects with guaranteed availability and performance. Ideal for production workloads requiring predictable compute resources."
  },
  {
    title: "Dedicated Clusters",
    description: "Custom configurations of HGX B200 systems for large-scale training with dedicated networking and storage. Designed for organizations training frontier AI models."
  }
];

const HGXB200SolutionsGrid = () => {
  return (
    <section className="bg-[#F3F4F6] py-20">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-12">
          Flexible GPU Solutions Tailored to Your AI Needs
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {solutions.map((solution, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-8 shadow-sm"
            >
              <h3 className="text-xl font-semibold text-slate-900 mb-4">
                {solution.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {solution.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HGXB200SolutionsGrid;
