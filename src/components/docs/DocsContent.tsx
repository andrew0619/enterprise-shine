import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Copy, ChevronRight, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const DocsContent = () => {
  const { toast } = useToast();

  const handleCopyPage = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      description: "Page URL copied to clipboard",
    });
  };

  return (
    <article className="flex-1 min-w-0 py-8 px-8 lg:px-12">
      <div className="max-w-[800px]">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
          <span className="text-primary">Getting started</span>
        </div>

        {/* Header with Copy button */}
        <div className="flex items-start justify-between gap-4 mb-6">
          <h1 className="text-4xl font-bold text-slate-900">
            Welcome to GMI Cloud
          </h1>
          <Button
            variant="outline"
            size="sm"
            className="shrink-0 gap-2 text-slate-600"
            onClick={handleCopyPage}
          >
            <Copy className="h-4 w-4" />
            Copy page
          </Button>
        </div>

        {/* Intro paragraph */}
        <p className="text-slate-600 text-lg leading-relaxed mb-12">
          Whether you're deploying AI models, managing GPU clusters, or migrating workloads, 
          this guide will help you navigate our platform with ease. Choose a section below to get started.
        </p>

        {/* Inference Engine Section */}
        <section id="inference-engine" className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-3 border-b-2 border-primary inline-block pb-1">
            Inference Engine
          </h2>
          <h3 className="text-lg font-semibold text-slate-800 mt-4 mb-3">
            Optimization for faster, high-performance inference
          </h3>
          <p className="text-slate-600 leading-relaxed mb-6">
            You're about to supercharge your AI models with lightning-fast inference. 
            Inference Engine makes it easy to scale, and optimize your models for real-time 
            performance. Let's get started—your AI is ready to shine.
          </p>

          {/* Info Callout Box */}
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 flex gap-3">
            <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <div className="text-sm text-slate-700">
              <strong className="text-slate-900">Optimization Tip:</strong> Use batch processing 
              for higher throughput when handling multiple inference requests simultaneously.
            </div>
          </div>
        </section>

        {/* Cluster Engine Section */}
        <section id="cluster-engine" className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-3 border-b-2 border-primary inline-block pb-1">
            Cluster Engine
          </h2>
          <h3 className="text-lg font-semibold text-slate-800 mt-4 mb-3">
            Dynamic Resource Management and Orchestration
          </h3>
          <p className="text-slate-600 leading-relaxed">
            You now have full control over your GPU clusters, giving you the flexibility 
            to train, fine-tune, and scale your AI workloads with ease. Cluster Engine 
            simplifies resource management so you can focus on performance and efficiency. 
            Let's get started.
          </p>
        </section>

        {/* API Reference Section */}
        <section id="api-reference" className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-3 border-b-2 border-primary inline-block pb-1">
            API Reference
          </h2>
          <h3 className="text-lg font-semibold text-slate-800 mt-4 mb-3">
            Complete API Documentation for All Services
          </h3>
          <p className="text-slate-600 leading-relaxed mb-6">
            Ready to integrate GMI Cloud into your applications? Our comprehensive API 
            documentation covers everything from authentication to container management. 
            Whether you're building custom workflows or automating deployments, these APIs 
            give you programmatic access to all GMI Cloud capabilities.
          </p>

          {/* Code Block */}
          <div className="bg-slate-900 rounded-lg overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700">
              <span className="text-xs text-slate-400">bash</span>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 px-2 text-slate-400 hover:text-white hover:bg-slate-700"
                onClick={() => {
                  navigator.clipboard.writeText('curl -X POST https://api.gmicloud.ai/v1/deploy \\\n  -H "Authorization: Bearer $API_KEY" \\\n  -H "Content-Type: application/json" \\\n  -d \'{"model": "llama-3.1-70b", "instances": 2}\'');
                  toast({ description: "Code copied to clipboard" });
                }}
              >
                <Copy className="h-3.5 w-3.5" />
              </Button>
            </div>
            <pre className="p-4 overflow-x-auto text-sm">
              <code className="text-slate-100">
{`curl -X POST https://api.gmicloud.ai/v1/deploy \\
  -H "Authorization: Bearer $API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"model": "llama-3.1-70b", "instances": 2}'`}
              </code>
            </pre>
          </div>
        </section>

        {/* Migration Guides Section */}
        <section id="migration-guides" className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-3 border-b-2 border-primary inline-block pb-1">
            Migration Guides
          </h2>
          <h3 className="text-lg font-semibold text-slate-800 mt-4 mb-3">
            Moving AI Workloads to GMI Cloud
          </h3>
          <p className="text-slate-600 leading-relaxed">
            You've made it. Moving to GMI Cloud is the best decision for your AI workloads, 
            and we're here to make the transition smooth, fast, and stress-free. Follow this 
            guide, and you'll be up and running in no time. Let's get you settled into your 
            new AI home.
          </p>
        </section>

        {/* Bottom Navigation */}
        <div className="border-t border-slate-200 pt-8 flex justify-end">
          <Link
            to="/docs/what-we-do"
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
          >
            What We Do
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default DocsContent;
