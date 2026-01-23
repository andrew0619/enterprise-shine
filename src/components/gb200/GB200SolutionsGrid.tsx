const solutions = [
  {
    title: "AI Training Infrastructure",
    description: "Dedicated infrastructure for AI training with high-speed NVLink connectivity, enabling distributed training across thousands of GPUs with minimal latency."
  },
  {
    title: "Production Inference",
    description: "Low-latency inference solutions optimized for production AI applications, delivering real-time responses for mission-critical workloads."
  },
  {
    title: "Flexible Scaling",
    description: "Flexible scaling options from single GPU to multi-node clusters, with on-demand provisioning that adapts to your workload requirements."
  }
];

const GB200SolutionsGrid = () => {
  return (
    <section className="bg-[#F3F4F6] py-20">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-12">
          Custom GPU Cloud Solutions Built for Your AI Needs
        </h2>
        
        <div className="grid md:grid-cols-3 gap-6">
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

export default GB200SolutionsGrid;
