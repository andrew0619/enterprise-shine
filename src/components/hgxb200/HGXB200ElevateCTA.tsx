import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const HGXB200ElevateCTA = () => {
  const { t } = useTranslation();

  return (
    <section className="bg-white py-20">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">{t("hgxb200Page.elevate.title")}</h2>
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">{t("hgxb200Page.elevate.description")}</p>
          <Button asChild size="lg" className="bg-slate-900 text-white hover:bg-slate-800 px-8">
            <Link to="/contact">{t("hgxb200Page.elevate.cta")}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HGXB200ElevateCTA;
