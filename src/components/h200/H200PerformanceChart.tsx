const H200PerformanceChart = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Chart */}
          <div className="bg-secondary/30 rounded-2xl p-8">
            <h3 className="text-lg font-semibold text-foreground mb-8">
              Performance Comparison: H100 vs H200
            </h3>
            
            <div className="space-y-10">
              {/* Llama 2 70B Benchmark */}
              <div>
                <p className="text-sm text-muted-foreground mb-4">Llama 2 70B Inference (tokens/sec)</p>
                <div className="flex items-end gap-6">
                  <div className="flex flex-col items-center">
                    <div 
                      className="w-16 bg-slate-400 rounded-t-md transition-all duration-500"
                      style={{ height: '100px' }}
                    />
                    <span className="text-xs text-muted-foreground mt-2">H100</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-sm font-bold text-primary mb-1">1.4x</span>
                    <div 
                      className="w-16 bg-primary rounded-t-md transition-all duration-500"
                      style={{ height: '140px' }}
                    />
                    <span className="text-xs text-muted-foreground mt-2">H200</span>
                  </div>
                </div>
              </div>
              
              {/* Llama 2 70B FP8 Benchmark */}
              <div>
                <p className="text-sm text-muted-foreground mb-4">Llama 2 70B (FP8) Inference (tokens/sec)</p>
                <div className="flex items-end gap-6">
                  <div className="flex flex-col items-center">
                    <div 
                      className="w-16 bg-slate-400 rounded-t-md transition-all duration-500"
                      style={{ height: '80px' }}
                    />
                    <span className="text-xs text-muted-foreground mt-2">H100</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-sm font-bold text-primary mb-1">1.9x</span>
                    <div 
                      className="w-16 bg-primary rounded-t-md transition-all duration-500"
                      style={{ height: '152px' }}
                    />
                    <span className="text-xs text-muted-foreground mt-2">H200</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right - Text Content */}
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Benchmark Results
            </h2>
            
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                The NVIDIA H200 demonstrates significant performance improvements over the H100 in real-world AI inference workloads. In Llama 2 70B inference benchmarks, the H200 delivers <span className="text-primary font-semibold">1.4x faster throughput</span> compared to the H100.
              </p>
              
              <p>
                When utilizing FP8 precision, the performance gains are even more dramatic. The H200 achieves <span className="text-primary font-semibold">1.9x faster inference</span> for Llama 2 70B models, making it the ideal choice for production AI deployments requiring both speed and efficiency.
              </p>
              
              <p>
                These improvements are driven by the H200's enhanced HBM3e memory architecture, delivering 4.8 TB/s of bandwidth – crucial for memory-intensive large language model operations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default H200PerformanceChart;
