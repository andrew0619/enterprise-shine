import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Products from "./pages/Products";
import Solutions from "./pages/Solutions";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";
import GPUCompute from "./pages/GPUCompute";
import About from "./pages/About";
import Studio from "./pages/Studio";
import NotFound from "./pages/NotFound";

// Product sub-pages
import ClusterEngine from "./pages/products/ClusterEngine";
import InferenceEngine from "./pages/products/InferenceEngine";
import ModelLibrary from "./pages/products/ModelLibrary";

// GPU pages
import GPUH200 from "./pages/GPUH200";
import GPUGB200 from "./pages/gpus/GPUGB200";
import GPUHGXB200 from "./pages/gpus/GPUHGXB200";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/gpu-compute" element={<GPUCompute />} />
          <Route path="/products/cluster-engine" element={<ClusterEngine />} />
          <Route path="/products/inference-engine" element={<InferenceEngine />} />
          <Route path="/products/model-library" element={<ModelLibrary />} />
          <Route path="/gpus/h200" element={<GPUH200 />} />
          <Route path="/gpus/gb200" element={<GPUGB200 />} />
          <Route path="/gpus/hgx-b200" element={<GPUHGXB200 />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/about" element={<About />} />
          <Route path="/studio" element={<Studio />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
