import { useTranslation } from "react-i18next";

const H200PerformanceChart = () => {
  const { t } = useTranslation();

  return (
    <section className="py-20 bg-background">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Chart */}
          <div className="bg-secondary/30 rounded-2xl p-8">
            <h3 className="text-lg font-semibold text-foreground mb-8">
              {t("h200Page.chart.title")}
            </h3>
            
            <div className="space-y-10">
              {/* Llama 2 70B Benchmark */}
              <div>
                <p className="text-sm text-muted-foreground mb-4">{t("h200Page.chart.benchmark1")}</p>
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
                <p className="text-sm text-muted-foreground mb-4">{t("h200Page.chart.benchmark2")}</p>
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
              {t("h200Page.chart.resultsTitle")}
            </h2>
            
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                {t("h200Page.chart.resultsP1")} <span className="text-primary font-semibold">{t("h200Page.chart.resultsP1Highlight")}</span> {t("h200Page.chart.resultsP1End")}
              </p>
              
              <p>
                {t("h200Page.chart.resultsP2")} <span className="text-primary font-semibold">{t("h200Page.chart.resultsP2Highlight")}</span> {t("h200Page.chart.resultsP2End")}
              </p>
              
              <p>
                {t("h200Page.chart.resultsP3")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default H200PerformanceChart;
