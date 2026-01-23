import { useTranslation } from "react-i18next";

const HGXB200SolutionsGrid = () => {
  const { t } = useTranslation();
  const solutionKeys = ["onDemand", "reserved", "dedicated"] as const;

  return (
    <section className="bg-[#F3F4F6] py-20">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-12">
          {t("hgxb200Page.solutions.title")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {solutionKeys.map((key) => (
            <div key={key} className="bg-white rounded-xl p-8 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">{t(`hgxb200Page.solutions.${key}.title`)}</h3>
              <p className="text-slate-600 leading-relaxed">{t(`hgxb200Page.solutions.${key}.description`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HGXB200SolutionsGrid;
