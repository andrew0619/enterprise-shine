import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const GB200FutureProof = () => {
  const { t } = useTranslation();

  return (
    <section className="bg-white py-20">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            {t("gb200Page.futureProof.title")}
          </h2>
          
          <p className="text-slate-600 text-lg leading-relaxed mb-8">
            {t("gb200Page.futureProof.description")}
          </p>
          
          <Button 
            asChild 
            size="lg" 
            className="bg-slate-900 text-white hover:bg-slate-800 px-8"
          >
            <Link to="/contact">{t("gb200Page.futureProof.cta")}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default GB200FutureProof;
