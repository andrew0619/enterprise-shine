import { useTranslation } from "react-i18next";
import ComplianceBadge from "./ComplianceBadge";

const ComplianceSection = () => {
  const { t } = useTranslation();

  const complianceItems = [
    t("about.compliance.items.soc2", { defaultValue: "SOC 2 Type II 認證" }),
    t("about.compliance.items.gdpr", { defaultValue: "GDPR 合規" }),
    t("about.compliance.items.encryption", { defaultValue: "端到端數據加密" }),
    t("about.compliance.items.monitoring", { defaultValue: "24/7 安全監控" }),
  ];

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <p className="text-primary font-medium text-sm">
              {t("about.compliance.kicker", { defaultValue: "安全與合規" })}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-heading">
              {t("about.compliance.title", { defaultValue: "Compliance That Powers Growth" })}
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                {t("about.compliance.description1", { defaultValue: "GMI Cloud 遵循業界最高安全標準，確保您的數據和 AI 工作負載受到全方位保護。我們的基礎設施通過 SOC 2 Type II 認證，符合嚴格的安全性、可用性和機密性要求。" })}
              </p>
              <p>
                {t("about.compliance.description2", { defaultValue: "我們的安全措施包括：端到端加密、多層身份驗證、持續安全監控，以及定期的第三方安全審計。無論您是處理敏感的金融數據還是醫療資訊，GMI Cloud 都能提供企業級的安全保障。" })}
              </p>
            </div>
            
            <ul className="space-y-3 pt-4">
              {complianceItems.map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                    <svg className="w-3 h-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Right Visual */}
          <div>
            <ComplianceBadge />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComplianceSection;
