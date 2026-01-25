/**
 * 📦 Enterprise Shine (NexusAI) 樣本網站【完整內容】
 * 
 * 從 enterprise-shine 專案提取的所有頁面完整內容
 * 用於 NDMD 系統驗證測試
 * 
 * ⚠️ 不要修改任何文字或圖片，保持原汁原味
 */

// ============================================================
// 公司基本資訊
// ============================================================
export const companyInfo = {
  name: 'NexusAI (GMI Cloud)',
  tagline: 'Build AI Without Limits',
  description: 'We build complete GPU infrastructure so you can focus on what really matters — your AI.',
  email: 'sales@nexusai.com',
  founded: '2023',
  globalOffices: '3+',
  coreMembers: '50+',
};

// ============================================================
// Partner Logos
// ============================================================
export const partnerLogos = [
  { name: 'DeepSeek', icon: '🐋' },
  { name: 'OpenAI', icon: '◯' },
  { name: 'Anthropic', icon: 'A' },
  { name: 'NVIDIA', icon: '◆' },
  { name: 'LangChain', icon: '🔗' },
  { name: 'Hugging Face', icon: '🤗' },
  { name: 'Meta', icon: '∞' },
  { name: 'Mistral', icon: 'M' },
];

// ============================================================
// 首頁 Hero
// ============================================================
export const hero = {
  title: 'Build AI Without Limits',
  subtitle: 'We build complete GPU infrastructure so you can focus on what really matters — your AI.',
  primaryCta: { text: 'Get Started', href: '/contact' },
  secondaryCta: { text: 'View Pricing', href: '/pricing' },
  logos: partnerLogos,
};

// ============================================================
// Foundation Section
// ============================================================
export const foundation = {
  title: 'The Foundation for Your AI Success',
  subtitle: '— Powered by GPU Cloud Solutions',
  description: 'GMI Cloud provides everything you need to build scalable AI solutions — running entirely on GMI-owned, AI-optimized datacenters. From high-performance inference and containerized ops to on-demand access to top-tier GPUs for training and inference, we control the full stack.',
};

// ============================================================
// 統計數據
// ============================================================
export const stats = [
  { value: '87%', label: 'Avg. GPU Usage', color: 'text-primary' },
  { value: '24', label: 'Active Nodes', color: 'text-green-600' },
  { value: '1.2TB', label: 'Memory Used', color: 'text-blue-600' },
  { value: '99.9%', label: 'Uptime', color: 'text-amber-600' },
];

// ============================================================
// 產品 (Inference Engine)
// ============================================================
export const inferenceEngine = {
  title: 'Inference Engine',
  description1: 'GMI Cloud Inference Engine provides developers with the ultra-fast speed and flexible scalability needed to run AI models, designed for extremely low latency, high concurrency processing, and top-tier performance optimization.',
  description2: 'Through GMI Cloud\'s global GPU node layout, developers can instantly deploy models, scale computing power anytime and anywhere, automatically adjust computing loads, significantly reduce costs and improve performance.',
  modelsLabel: 'Easily run market-leading AI models',
  features: [
    { title: 'Rapid Deployment, Zero Hassle', description: 'Scale instantly with fully managed infrastructure.' },
    { title: 'Optimized for Efficiency', description: 'Advanced GPU optimization and model caching minimize latency.' },
  ],
  scalingFeatures: [
    { title: 'Dynamic Scaling', description: 'Automatically provisions GPUs as demand increases.' },
    { title: 'Blazing Flexibility', description: 'Choose your minimum and maximum replicas.' },
  ],
  monitoringStats: [
    { value: '1.2M', label: 'Total Inferences' },
    { value: '45ms', label: 'Avg Latency' },
    { value: '15K/s', label: 'Throughput' },
    { value: '99.9%', label: 'Uptime' },
    { value: '$0.002', label: 'Cost/1K inferences' },
  ],
};

// ============================================================
// 產品 (Cluster Engine)
// ============================================================
export const clusterEngine = {
  title: 'Cluster Engine',
  description: 'GMI Cloud\'s Cluster Engine is your all-in-one AI cloud management platform, designed to streamline GPU resource coordination, workload scheduling, and cost optimization.',
  features: [
    { icon: 'TrendingUp', title: 'Efficient Scaling', description: 'Automatically scale your GPU clusters.' },
    { icon: 'Monitor', title: 'Real-time Monitoring', description: 'Monitor every aspect of your cluster.' },
    { icon: 'BarChart', title: 'Usage Analytics', description: 'Gain deep insights into your compute usage.' },
    { icon: 'Boxes', title: 'Resource Management', description: 'Fine-grained control over every GPU, node, and container.' },
    { icon: 'Shield', title: 'Enterprise Security', description: 'Bank-grade security for your AI workloads.' },
  ],
  dashboardData: [
    { id: 'gpu-001', name: 'NVIDIA H100', status: 'active', utilization: '94%' },
    { id: 'gpu-002', name: 'NVIDIA H100', status: 'active', utilization: '87%' },
    { id: 'gpu-003', name: 'NVIDIA A100', status: 'active', utilization: '92%' },
    { id: 'gpu-004', name: 'NVIDIA A100', status: 'idle', utilization: '12%' },
    { id: 'gpu-005', name: 'NVIDIA H100', status: 'active', utilization: '78%' },
  ],
  teamMembers: [
    { name: 'John Chen', role: 'Admin', avatar: 'JC' },
    { name: 'Sarah Lin', role: 'Developer', avatar: 'SL' },
    { name: 'Mike Wang', role: 'Viewer', avatar: 'MW' },
  ],
  clusterStats: [
    { value: '87%', label: 'Avg. GPU Usage', color: 'text-primary' },
    { value: '24', label: 'Active Nodes', color: 'text-green-600' },
    { value: '1.2TB', label: 'Memory Used', color: 'text-blue-600' },
    { value: '99.9%', label: 'Uptime', color: 'text-amber-600' },
  ],
  integrations: ['Centralized Management', 'Real-Time Dashboard', 'Access Management'],
};

// ============================================================
// GPU 產品
// ============================================================
export const gpuCompute = {
  title: 'GPUs',
  description: 'GMI Cloud offers a diverse portfolio of NVIDIA GPUs, designed for AI/ML training, inference, and data analytics. Our GPU infrastructure is purpose-built for the most demanding AI workloads.',
  features: [
    { icon: 'Cpu', title: 'Top Tier GPUs', description: 'Access the latest NVIDIA H100 and A100 GPUs with guaranteed availability and competitive pricing.' },
    { icon: 'Network', title: 'InfiniBand Networking', description: 'Ultra-low latency interconnects with 400Gb/s bandwidth for distributed training and real-time inference.' },
    { icon: 'Lock', title: 'Secure and Scalable', description: 'Enterprise-grade security with SOC 2 Type II, HIPAA, and GDPR compliance. Scale from 1 to 1000+ GPUs.' },
  ],
  pageHero: {
    title: 'GPU Compute Rental',
    subtitle: 'Bare metal servers with full cloud integration, offered at the most competitive prices.',
  },
  hardwareFeatures: [
    {
      title: 'Flexible On-Demand GPU Service',
      description: 'Instantly access NVIDIA GPU compute power and rapidly deploy your workloads. Our scalable platform lets you freely adjust resources to perfectly support AI and machine learning tasks. Affordable pricing with no long-term contracts gives you maximum flexibility without upfront costs.',
    },
    {
      title: 'Top-Tier Hardware Specs',
      description: 'Equipped with 3.2 Tbps InfiniBand networking for ultra-fast distributed training connections; powered by advanced NVIDIA H100 GPU training clusters for ultimate compute power. Simple SSH access and dataset downloads let you start your AI journey immediately.',
    },
    {
      title: 'Enterprise Private Cloud',
      description: 'GMI Cloud provides dedicated cloud environments for enterprises, ensuring end-to-end security and data isolation. Customizable configurations meet your unique IT policies. Build your way with complete control and flexibility, seamlessly switching between cloud and on-premises environments.',
    },
    {
      title: 'Secure Network Architecture',
      description: 'Built on high-performance InfiniBand networking for stable, efficient cross-region connectivity. Applications run with optimal performance while strict network access controls maintain security.',
    },
  ],
};

// ============================================================
// H200 產品頁
// ============================================================
export const h200 = {
  hero: {
    price: 'Starts from $2.15 / GPU-hour',
    title: 'Accelerate AI Innovation with NVIDIA H200 Cloud GPUs',
    description: 'The NVIDIA H200 Tensor Core GPU supercharges generative AI and high-performance computing (HPC) workloads with game-changing performance and memory capabilities. With 141GB of HBM3e memory and 4.8TB/s bandwidth, it delivers unprecedented throughput for large language model inference.',
    cta: 'Deploy Now',
  },
  features: [
    { title: 'Higher Memory Capacity', description: 'The H200 features 141GB of HBM3e memory, nearly double the capacity of the H100, enabling the processing of larger models and datasets without memory constraints.' },
    { title: 'Increased Memory Bandwidth', description: 'With 4.8 TB/s of memory bandwidth, the H200 offers 1.4x more bandwidth than the H100, significantly speeding up data transfer and processing tasks.' },
    { title: 'Enhanced AI Performance', description: 'The H200 is optimized for generative AI and large language models, delivering up to 1.9x faster inference performance for models like Llama 2 70B.' },
  ],
  benchmarks: [
    { name: 'Llama 2 70B Inference (tokens/sec)', h100: 1800, h200: 2520 },
    { name: 'Llama 2 70B (FP8) Inference (tokens/sec)', h100: 2400, h200: 4560 },
  ],
  marketing: {
    title: 'Future-Proof Your AI with GMI Cloud and the H200',
    description: 'As AI models continue to grow in size and complexity, the NVIDIA H200 provides the headroom you need to stay ahead. With its massive 141GB memory capacity and industry-leading bandwidth, the H200 on GMI Cloud ensures your infrastructure can handle tomorrow\'s AI workloads today. Scale from development to production seamlessly with our enterprise-grade cloud platform.',
  },
};

// ============================================================
// GB200 產品頁
// ============================================================
export const gb200 = {
  hero: {
    title: 'Next-Gen AI Acceleration with NVIDIA GB200 NVL72',
    description: 'Advanced AI infrastructure designed for the most demanding enterprise workloads. The GB200 NVL72 combines Grace CPUs with Blackwell GPUs for unprecedented performance.',
    cta: 'Get Started',
  },
  features: [
    { title: 'Unmatched AI Performance', description: 'Combines Grace CPUs with Blackwell GPUs for unprecedented compute density and efficiency, delivering breakthrough performance for AI training and inference.' },
    { title: 'Next-Level Data Processing for Enterprise AI', description: 'Handles multi-trillion parameter models with ease, enabling organizations to tackle the most complex AI challenges without infrastructure limitations.' },
    { title: 'Next-Level Scalability for LLM and AI Workloads', description: 'Scale from single node to thousands with NVLink interconnect, providing seamless expansion as your AI requirements grow.' },
    { title: 'Energy-Efficient Architecture', description: 'Optimized power consumption per FLOP means lower operational costs while maintaining peak performance for sustainable AI infrastructure.' },
  ],
  solutions: [
    { title: 'AI Training Infrastructure', description: 'Dedicated infrastructure for AI training with high-speed NVLink connectivity, enabling distributed training across thousands of GPUs with minimal latency.' },
    { title: 'Production Inference', description: 'Low-latency inference solutions optimized for production AI applications, delivering real-time responses for mission-critical workloads.' },
    { title: 'Flexible Scaling', description: 'Flexible scaling options from single GPU to multi-node clusters, with on-demand provisioning that adapts to your workload requirements.' },
  ],
  marketing: {
    title: 'Future-Proof Your AI with GMI Cloud and the GB200 NVL72',
    description: 'As AI models continue to grow in complexity, the GB200 NVL72 ensures your infrastructure stays ahead of the curve. With its groundbreaking architecture and seamless scalability, you can confidently invest in tomorrow\'s AI capabilities today. GMI Cloud provides the platform to harness this power with enterprise-grade reliability and support.',
  },
};

// ============================================================
// HGX B200 產品頁
// ============================================================
export const hgxB200 = {
  hero: {
    title: 'Unleash the Power of NVIDIA HGX™ B200',
    description: 'Top-tier performance for complex models and enterprise-scale AI deployments. The ultimate 8-GPU platform for AI training and inference.',
    cta: 'Contact Sales',
  },
  features: [
    { title: 'Optimized GPU Performance for AI Training & Inference', description: 'The HGX B200 delivers unprecedented compute density with 8 Blackwell GPUs connected via 5th-generation NVLink, providing 1.8TB/s of GPU-to-GPU bandwidth for seamless parallel processing.' },
    { title: 'Highly-Scaled Architecture for Demanding AI Workloads', description: 'Purpose-built for multi-trillion parameter models and enterprise AI deployments. The unified memory architecture enables efficient handling of the largest foundation models.' },
    { title: 'Seamless AI Scalability', description: 'Connect multiple HGX B200 systems for rack-scale AI supercomputing. NVLink Switch enables linear scaling across thousands of GPUs for the most demanding training workloads.' },
  ],
  solutions: [
    { title: 'On-Demand Access', description: 'Flexible hourly billing for experimentation and development workloads with instant provisioning. Perfect for teams exploring new model architectures or running periodic training jobs.' },
    { title: 'Reserved Capacity', description: 'Discounted pricing for long-term AI projects with guaranteed availability and performance. Ideal for production workloads requiring predictable compute resources.' },
    { title: 'Dedicated Clusters', description: 'Custom configurations of HGX B200 systems for large-scale training with dedicated networking and storage. Designed for organizations training frontier AI models.' },
  ],
  marketing: {
    title: 'Elevate Your AI Capabilities with GMI Cloud and NVIDIA HGX B200',
    description: 'Leverage the world\'s most powerful AI platform with GMI Cloud\'s enterprise infrastructure. Get immediate access to HGX B200 systems without capital investment, backed by 24/7 support and optimized MLOps tooling for accelerated time-to-value.',
  },
};

// ============================================================
// AI 模型列表
// ============================================================
export const modelsList = [
  {
    type: 'Chat',
    name: 'DeepSeek R1',
    description: 'Open-source reasoning model, rivaling OpenAI o1, excelling in math, coding, and multi-step reasoning.',
    icon: '🐋',
    iconColor: 'text-blue-500',
    free: false,
  },
  {
    type: 'Chat',
    name: 'DeepSeek R1 Distill Llama 70B Free',
    description: 'Free endpoint to experience powerful reasoning model, this distilled version retains excellent reasoning capabilities.',
    icon: '🐋',
    iconColor: 'text-blue-500',
    free: true,
  },
  {
    type: 'Chat',
    name: 'Llama 3.3 70B Instruct Turbo Free',
    description: 'Open-source reasoning model, supports multi-language dialogue optimization, specifically tuned for dialogue fluency.',
    icon: '∞',
    iconColor: 'text-blue-600',
    free: true,
  },
];

// ============================================================
// 定價
// ============================================================
export const pricing = {
  title: 'Pricing',
  subtitle: 'Competitive, transparent pricing with flexible billing — tailored for modern AI deployment',
  gpuPlans: [
    {
      id: 'h200',
      label: 'Highest Performance',
      description: 'For large-scale training needs, the most powerful compute option. Equipped with HBM3e memory for unmatched AI training performance.',
      cta: 'Contact Us',
    },
    {
      id: 'h100',
      label: 'Performance & Cost Balance',
      description: 'Ideal for high-volume inference tasks with cost-effective optimization. 80GB HBM3 memory for enterprise-grade AI deployment.',
      cta: 'Deploy Now',
    },
    {
      id: 'blackwell',
      label: 'Coming Soon',
      headline: 'Reserve Now',
      description: 'Blackwell launches in 2025 with higher efficiency and AI optimization features for next-gen AI workloads.',
      cta: 'Reserve Now',
    },
  ],
  serviceEngine: {
    title: 'Supercharge Your GPU Cloud Computing',
    subtitle: 'Break through performance bottlenecks and accelerate AI training and inference.',
    inference: {
      title: 'Inference Engine',
      description: 'GMI Cloud\'s inference service is optimized for high-throughput and low-latency scenarios. The optimized inference stack ensures models run at peak performance.',
      cta: 'Learn More',
    },
    cluster: {
      title: 'Cluster Engine',
      description: 'GMI Cluster service is optimized for distributed training and large-scale computing. InfiniBand high-speed networking enables multi-node coordination.',
      cta: 'Start Deploying',
    },
  },
  cta: {
    title: 'Not sure which product fits your needs? Let\'s talk.',
    subtitle: 'Our team is here to help you choose the right GPU cloud solution and answer any questions about performance, pricing, or scaling.',
  },
};

// ============================================================
// Case Study
// ============================================================
export const caseStudy = {
  title: 'Proven Results',
  subtitle: 'Our customers achieve measurable improvements in cost, performance, and time-to-market.',
  quote: 'NexusAI transformed how we deploy AI models. What used to take weeks now takes hours.',
  author: 'Sarah Chen',
  role: 'CTO',
  company: 'TechVentures',
  stats: [
    { value: '50%', label: 'Cost Savings', description: 'Average reduction in infrastructure costs' },
    { value: '10x', label: 'Faster Deployment', description: 'From weeks to hours for new GPU clusters' },
  ],
};

// ============================================================
// 新聞文章
// ============================================================
export const newsArticles = [
  {
    id: 'scaling-ai',
    title: 'Scaling AI Infrastructure: Lessons from 10,000 GPUs',
    excerpt: 'How enterprise teams are managing GPU clusters at unprecedented scale.',
    category: 'Engineering',
    href: '/blog/scaling-ai',
  },
  {
    id: 'h100-benchmarks',
    title: 'The Future of Inference: H100 vs A100 Benchmarks',
    excerpt: 'Real-world performance comparisons for production AI workloads.',
    category: 'Research',
    href: '/blog/h100-benchmarks',
  },
  {
    id: 'cost-optimization',
    title: 'Cost Optimization Strategies for AI Teams',
    excerpt: 'Practical tips to reduce your GPU infrastructure costs by up to 50%.',
    category: 'Business',
    href: '/blog/cost-optimization',
  },
];

// ============================================================
// FAQ
// ============================================================
export const faq = [
  { question: 'What GPU models do you offer?', answer: 'We offer the latest NVIDIA GPUs including H100, A100, and L40S. All clusters are equipped with NVLink and InfiniBand for maximum performance.' },
  { question: 'How quickly can I deploy a new cluster?', answer: 'Most clusters can be provisioned within hours, not weeks. Our automated infrastructure allows for rapid scaling.' },
  { question: 'What security certifications do you have?', answer: 'We maintain SOC 2 Type II, HIPAA, and GDPR compliance. All data is encrypted at rest and in transit.' },
  { question: 'Can I bring my own models?', answer: 'Absolutely. Our platform supports any model format including PyTorch, TensorFlow, and ONNX.' },
  { question: 'How does billing work?', answer: 'We offer flexible pricing including on-demand, reserved capacity, and committed use discounts.' },
];

// ============================================================
// H200 FAQ
// ============================================================
export const h200Faq = [
  { question: 'What is the NVIDIA H200 GPU offered by GMI Cloud?', answer: 'The NVIDIA H200 is the latest high-performance GPU from NVIDIA, featuring 141GB of HBM3e memory and 4.8 TB/s bandwidth. GMI Cloud offers on-demand access to H200 GPUs in our enterprise-grade cloud infrastructure, enabling you to run the most demanding AI and HPC workloads without capital investment.' },
  { question: 'How does the H200 differ from previous GPU models like the H100?', answer: 'The H200 offers nearly double the memory capacity (141GB vs 80GB) and 1.4x more memory bandwidth compared to the H100. In practical benchmarks, this translates to 1.4x-1.9x faster inference performance for large language models like Llama 2 70B.' },
  { question: 'How does the H200 enhance generative AI and LLM development?', answer: 'The H200\'s massive memory capacity and bandwidth are specifically designed for large language models. It can handle larger batch sizes, longer context windows, and bigger models without memory constraints, enabling faster iteration and more efficient training and inference workflows.' },
  { question: 'What are the benefits of using the H200 within GMI Cloud?', answer: 'GMI Cloud provides instant access to H200 GPUs with pay-as-you-go pricing starting at $2.15/GPU-hour. Benefits include enterprise SLAs, NVLink connectivity for multi-GPU workloads, pre-configured ML environments, and 24/7 technical support.' },
  { question: 'How can users access the H200 GPU on GMI Cloud?', answer: 'Getting started is simple: sign up for a GMI Cloud account, select the H200 GPU configuration that matches your workload needs, and deploy within minutes. Our team is also available to help with custom configurations and enterprise deployments.' },
];

// ============================================================
// GPU Compute FAQ
// ============================================================
export const gpuFaq = [
  { question: 'What types of GPUs do you offer?', answer: 'We offer the latest NVIDIA GPUs including H100 (80GB HBM3 memory), H200 (HBM3e memory), and the upcoming Blackwell series. All configurations include NVLink and InfiniBand for optimal distributed training performance.' },
  { question: 'How do I manage GPU clusters for distributed training?', answer: 'Our platform includes a comprehensive cluster management dashboard. You can configure nodes, monitor utilization, set up networking, and manage jobs through our web console or API. We also support popular orchestration tools like Kubernetes and Slurm.' },
  { question: 'Which deep learning frameworks are supported? Can I customize?', answer: 'We support all major frameworks including PyTorch, TensorFlow, JAX, and ONNX. You can use our pre-configured containers or bring your own Docker images. We also offer optimized versions for maximum GPU utilization.' },
  { question: 'What are the pricing options? Do you offer cost optimization?', answer: 'We offer flexible pricing options including on-demand hourly rates, reserved capacity with significant discounts, and committed use contracts. Our platform includes built-in cost optimization tools to help you minimize spending while maximizing performance.' },
];

// ============================================================
// CTA 區塊
// ============================================================
export const cta = {
  title: 'Ready to Deploy AI at Scale?',
  subtitle: 'Join thousands of companies using NexusAI to power their AI infrastructure. Get started in minutes.',
  primaryCta: { text: 'Contact Sales', href: '/contact' },
  secondaryCta: { text: 'View Pricing', href: '/pricing' },
};

// ============================================================
// 關於我們
// ============================================================
export const about = {
  kicker: 'About GMI Cloud',
  heroTitle: 'Building AI Infrastructure, Empowering Possibilities',
  heroSubtitle: 'We are dedicated to building the most advanced GPU cloud computing platform, accelerating global AI innovation.',
  stats: [
    { value: '2023', label: 'Year' },
    { value: '50+', label: 'Core Members' },
    { value: '3+', label: 'Global Offices' },
  ],
};

// ============================================================
// 開發者資源
// ============================================================
export const developers = {
  demoApps: {
    badge: 'Demo',
    title: 'Demo Apps for Developers',
    subtitle: 'Explore and test live AI models on GMI Cloud. Build prototypes, run experiments, and integrate generative AI into your apps.',
    apps: [
      {
        id: 'rag-chatbot',
        title: 'Multimodal RAG Chatbot',
        description: 'Intelligent multimodal RAG chatbot granting natural Q&A capabilities, generated answers, and interactive visuals for Q&A, summarization, and multimedia workflows.',
        tags: ['RAG', 'Chatbot', 'Q&A', 'PDF Upload', 'Multimedia', 'Knowledge Grounding'],
      },
      {
        id: 'deep-research',
        title: 'Deep Research Agent',
        description: 'Long-context agent analyzing sources and producing a structured, citation-based report — a shortcut reasoning for complex research.',
        tags: ['AI Assistant', 'Research', 'Long Context', 'Summarization', 'Analysis', 'Citations', 'Multi-Document', 'Knowledge Synthesis'],
      },
      {
        id: 'company-research',
        title: 'Company Research Agent',
        description: 'Specialized agent for company analysis, synthesizing funding, products, competitors, and market position into a narrative basis for business growth.',
        tags: ['Company Research', 'Business Intelligence', 'Competitor Analysis', 'Web Generation', 'Sales Enablement', 'Market Research'],
      },
    ],
    cta: {
      title: 'Ready to build?',
      subtitle: 'Explore powerful AI models and launch your project in just a few clicks.',
    },
  },
  docsHub: {
    badge: 'Documentation',
    title: 'Docs Hub',
    subtitle: 'Comprehensive documentation, API references, and integration guides to help you build with GMI Cloud. Coming soon.',
    cta1: 'Get Early Access',
    cta2: 'Explore Demo Apps',
  },
};

// ============================================================
// Studio
// ============================================================
export const studio = {
  heroTitle: 'Creativity That Flows.',
  heroSubtitle: 'Your intelligent canvas for dreaming, iterating, and shaping workflows.',
  cta: 'Start Now',
};

// ============================================================
// 導航選單
// ============================================================
export const navigation = {
  main: [
    { label: 'Products', href: '/products' },
    { label: 'GPUs', href: '/gpus' },
    { label: 'Studio', href: '/studio' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Developers', href: '/developers' },
    { label: 'Company', href: '/about' },
  ],
  products: [
    { label: 'GPU Compute', href: '/gpu-compute' },
    { label: 'Cluster Engine', href: '/products/cluster-engine' },
    { label: 'Inference Engine', href: '/products/inference-engine' },
    { label: 'Model Library', href: '/products/model-library' },
  ],
  gpus: [
    { label: 'NVIDIA H200', href: '/gpus/h200' },
    { label: 'NVIDIA GB200 NVL72', href: '/gpus/gb200' },
    { label: 'NVIDIA HGX™ B200', href: '/gpus/hgx-b200' },
  ],
  developers: [
    { label: 'Demo Apps', href: '/developers/demo-apps' },
    { label: 'Docs Hub', href: '/developers/docs-hub' },
  ],
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Discord', href: '#' },
    { label: 'Partners', href: '/partners' },
    { label: 'Careers', href: '/careers' },
  ],
};

// ============================================================
// Footer
// ============================================================
export const footer = {
  newsletter: {
    title: 'Subscribe to our newsletter',
    placeholder: 'Enter email',
    cta: 'Subscribe',
  },
  sections: [
    {
      title: 'Products',
      links: [
        { label: 'GPU Cloud', href: '/gpu-compute' },
        { label: 'Cluster Engine', href: '/products/cluster-engine' },
        { label: 'Inference Engine', href: '/products/inference-engine' },
        { label: 'Pricing', href: '/pricing' },
        { label: 'Model Library', href: '/products/model-library' },
        { label: 'Glossary', href: '#' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'Blog', href: '/blog' },
        { label: 'Careers', href: '/careers' },
        { label: 'About Us', href: '/about' },
        { label: 'Partners', href: '/partners' },
        { label: 'Contact Us', href: '/contact' },
      ],
    },
  ],
  legal: {
    privacy: 'Privacy Policy',
    terms: 'Terms of Use',
    copyright: '© 2025 All Rights Reserved.',
  },
};

export default {
  companyInfo,
  partnerLogos,
  hero,
  foundation,
  stats,
  inferenceEngine,
  clusterEngine,
  gpuCompute,
  h200,
  gb200,
  hgxB200,
  modelsList,
  pricing,
  caseStudy,
  newsArticles,
  faq,
  h200Faq,
  gpuFaq,
  cta,
  about,
  developers,
  studio,
  navigation,
  footer,
};
