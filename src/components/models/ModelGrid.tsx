import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import ModelFilterBar from "./ModelFilterBar";
import ModelCard, { ModelCardProps } from "./ModelCard";

const ModelGrid = () => {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const allModels: ModelCardProps[] = useMemo(() => [
    // LLMs
    { id: "llama-3-70b", name: "Llama-3-70b-instruct", provider: "Meta", type: t("modelLibrary.types.textGeneration"), category: "LLM", logoColor: "bg-blue-600", logoIcon: "M", isNew: true },
    { id: "llama-3-8b", name: "Llama-3-8b-instruct", provider: "Meta", type: t("modelLibrary.types.textGeneration"), category: "LLM", logoColor: "bg-blue-600", logoIcon: "M" },
    { id: "mistral-large", name: "Mistral Large", provider: "Mistral AI", type: t("modelLibrary.types.textGeneration"), category: "LLM", logoColor: "bg-orange-500", logoIcon: "M", isNew: true },
    { id: "mistral-7b", name: "Mistral-7b-instruct", provider: "Mistral AI", type: t("modelLibrary.types.textGeneration"), category: "LLM", logoColor: "bg-orange-500", logoIcon: "M" },
    { id: "gemma-7b", name: "Gemma 7B", provider: "Google", type: t("modelLibrary.types.textGeneration"), category: "LLM", logoColor: "bg-gradient-to-br from-blue-500 via-green-500 to-yellow-500", logoIcon: "G" },
    { id: "gemma-2b", name: "Gemma 2B", provider: "Google", type: t("modelLibrary.types.textGeneration"), category: "LLM", logoColor: "bg-gradient-to-br from-blue-500 via-green-500 to-yellow-500", logoIcon: "G" },
    { id: "qwen-2.5-72b", name: "Qwen 2.5 72B", provider: "Alibaba", type: t("modelLibrary.types.textGeneration"), category: "LLM", logoColor: "bg-purple-600", logoIcon: "Q", isNew: true },
    { id: "qwen-2.5-7b", name: "Qwen 2.5 7B", provider: "Alibaba", type: t("modelLibrary.types.textGeneration"), category: "LLM", logoColor: "bg-purple-600", logoIcon: "Q" },
    { id: "deepseek-v3", name: "DeepSeek V3", provider: "DeepSeek", type: t("modelLibrary.types.textGeneration"), category: "LLM", logoColor: "bg-cyan-600", logoIcon: "D", isNew: true },
    { id: "deepseek-coder", name: "DeepSeek Coder", provider: "DeepSeek", type: t("modelLibrary.types.codeGeneration"), category: "LLM", logoColor: "bg-cyan-600", logoIcon: "D" },
    
    // Vision
    { id: "sdxl", name: "Stable Diffusion XL", provider: "Stability AI", type: t("modelLibrary.types.imageGeneration"), category: "Vision", logoColor: "bg-violet-600", logoIcon: "S" },
    { id: "sd-3", name: "Stable Diffusion 3", provider: "Stability AI", type: t("modelLibrary.types.imageGeneration"), category: "Vision", logoColor: "bg-violet-600", logoIcon: "S", isNew: true },
    { id: "llava-1.6", name: "LLaVA 1.6", provider: "LMSys", type: t("modelLibrary.types.visionLanguage"), category: "Vision", logoColor: "bg-green-600", logoIcon: "L" },
    { id: "cogvlm", name: "CogVLM", provider: "Tsinghua", type: t("modelLibrary.types.visionLanguage"), category: "Vision", logoColor: "bg-red-600", logoIcon: "C" },
    
    // Embedding
    { id: "bge-large", name: "BGE Large EN", provider: "BAAI", type: t("modelLibrary.types.textEmbedding"), category: "Embedding", logoColor: "bg-slate-700", logoIcon: "B" },
    { id: "e5-mistral", name: "E5-Mistral-7B", provider: "Microsoft", type: t("modelLibrary.types.textEmbedding"), category: "Embedding", logoColor: "bg-blue-500", logoIcon: "E" },
  ], [t]);

  const filteredModels = useMemo(() => {
    return allModels.filter((model) => {
      const matchesFilter =
        activeFilter === "All" || model.category === activeFilter;
      const matchesSearch =
        model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        model.provider.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, searchQuery, allModels]);

  return (
    <>
      <ModelFilterBar
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <section className="bg-background py-8 md:py-12">
        <div className="container">
          {/* Results count */}
          <p className="text-sm text-muted-foreground mb-6">
            {t("common.showingModels", { count: filteredModels.length })}
          </p>

          {/* Model Grid - 4 columns on desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredModels.map((model) => (
              <ModelCard key={model.id} {...model} />
            ))}
          </div>

          {/* Empty state */}
          {filteredModels.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground">{t("common.noModelsFound")}</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default ModelGrid;
