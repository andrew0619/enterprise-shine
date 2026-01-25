/**
 * 📦 Quantum Horizons 樣本網站【完整內容】
 * 
 * 從 quantum-horizons 專案提取的所有頁面完整內容
 * 用於 NDMD 系統驗證測試
 * 
 * ⚠️ 不要修改任何文字或圖片，保持原汁原味
 */

// ============================================================
// 公司基本資訊
// ============================================================
export const companyInfo = {
  name: 'Future Quantum (fQuantum)',
  tagline: 'Empowering AI-Driven Innovation and Growth',
  description: 'We are committed to providing world-class high-performance computing and data center solutions for Asia-Pacific enterprises, driving AI innovation and digital transformation.',
  email: 'sales@fquantum.net',
  phone: '02-2700-5678',
  address: 'No. 7, Section 5, Xinyi Road, Xinyi District, Taipei (Taipei 101)',
  locations: 'Taiwan, Malaysia, Korea, Japan',
  support: '24/7 Support Available',
};

// ============================================================
// 圖片資源
// ============================================================
export const images = {
  heroBg: '/quantum-horizons/hero-space-bg.jpg',
  globe: '/quantum-horizons/holographic-globe.png',
  serverRack: '/quantum-horizons/server-rack-dark.jpg',
  datacenter: '/quantum-horizons/datacenter-aisle.jpg',
  neuralNetwork: '/quantum-horizons/neural-network.jpg',
  aiChip: '/quantum-horizons/ai-chip-closeup.jpg',
  dataAbstract: '/quantum-horizons/data-abstract-blue.jpg',
  // Case Studies
  caseMalaysia: '/quantum-horizons/case-malaysia-idc.jpg',
  caseThailand: '/quantum-horizons/case-thailand-idc.jpg',
  caseJapan: '/quantum-horizons/case-japan-semiconductor.jpg',
  // News
  newsJapan: '/quantum-horizons/news-japan-datacenter.jpg',
  newsPartnership: '/quantum-horizons/news-partnership.jpg',
  newsSustainability: '/quantum-horizons/news-sustainability.jpg',
  newsAwards: '/quantum-horizons/news-awards.jpg',
  newsAiNetwork: '/quantum-horizons/news-ai-network.jpg',
};

// ============================================================
// 首頁 Hero
// ============================================================
export const hero = {
  badge: 'New Release',
  title: 'Empowering AI-Driven Innovation and Growth',
  subtitle: 'We provide high-performance computing and data center solutions across Asia, helping enterprises in Taiwan and globally scale faster and achieve more',
  primaryCta: { text: 'Contact Us', href: '/contact' },
  secondaryCta: { text: 'Learn More', href: '/about' },
};

// ============================================================
// 統計數據
// ============================================================
export const stats = [
  { value: '15+', label: 'Data Centers' },
  { value: '99.99%', label: 'Annual Uptime' },
  { value: '24/7', label: 'Technical Support' },
  { value: '500+', label: 'Enterprise Clients' },
];

// ============================================================
// Quick Access Cards
// ============================================================
export const quickAccess = [
  {
    icon: 'Server',
    title: 'AI Server & Computing Rental',
    description: 'High-performance computing infrastructure',
    href: '/services/compute',
  },
  {
    icon: 'Building',
    title: 'IDC Construction & Fiber Networks',
    description: 'Data center construction and connectivity',
    href: '/services/idc',
  },
  {
    icon: 'Cpu',
    title: 'AI Platform & Large Model Development',
    description: 'Enterprise AI model training and inference',
    href: '/services/ai-platform',
  },
];

// ============================================================
// 核心服務 (Core Services)
// ============================================================
export const coreServices = [
  {
    icon: 'Server',
    title: 'AI Server & Computing Rental',
    description: 'Enterprise-grade NVIDIA GPU clusters supporting large-scale AI model training and inference. Flexible rental plans with on-demand computing resources to help you rapidly deploy AI applications.',
    image: images.serverRack,
    link: '/services/compute',
  },
  {
    icon: 'Building',
    title: 'IDC Construction & Fiber Networks',
    description: 'From planning to construction, providing complete data center solutions. High-availability design combined with low-latency fiber networks ensures your business never stops.',
    image: images.datacenter,
    link: '/services/idc',
  },
  {
    icon: 'Cpu',
    title: 'AI Platform & Large Model Development',
    description: 'Custom AI platform development supporting enterprise-specific large language model training. End-to-end AI solutions from data processing to model deployment.',
    image: images.neuralNetwork,
    link: '/services/ai-platform',
  },
];

// ============================================================
// 全球基礎設施
// ============================================================
export const globalInfrastructure = {
  title: 'Global Infrastructure Network',
  subtitle: 'Asia-Pacific Data Center Layout',
  image: images.globe,
};

// ============================================================
// CTA 區塊
// ============================================================
export const cta = {
  title: 'Ready to Transform Your Business?',
  subtitle: 'Join hundreds of companies already leveraging our AI infrastructure solutions to drive innovation. Let\'s build the future together.',
  primaryCta: { text: 'Contact Us', href: '/contact' },
  secondaryCta: { text: 'Learn More', href: '/about' },
};

// ============================================================
// 關於我們
// ============================================================
export const about = {
  hero: {
    title: 'About fQuantum',
    subtitle: 'fQuantum is a professional IT services and solutions provider offering cloud solutions and data center services. With high-spec data centers across Asia, we enable clients to connect with the world with consistent quality, security, and service standards, wherever they are.',
  },
  mission: {
    paragraph1: 'Working with our technology partners, fQuantum provides comprehensive cloud computing solutions for enterprises of all sizes—from infrastructure and management to application software—without additional capital investment or extensive internal IT resources. Additionally, fQuantum can customize data center services according to client needs, such as hosting, cloud managed services, optimization, and business continuity/disaster recovery services.',
    paragraph2: 'Flexibility, reliability, security, and rapid resolution are at the core of fQuantum\'s values. With fully redundant infrastructure, robust systems, multi-layered security measures, and skilled staff, we provide professional and reliable services to our clients. To ensure uninterrupted business connectivity, fQuantum has established an extensive digital infrastructure network across Asia, including Singapore, Malaysia, and Vietnam, always staying at the forefront of the industry as your best choice.',
  },
  values: [
    {
      icon: 'DollarSign',
      title: 'Cost Efficiency',
      description: 'fQuantum\'s advanced computing centers significantly reduce hardware and operational costs compared to in-house facilities. Through flexible pay-as-you-go models, clients access world-class computing resources while minimizing capital investment at competitive costs.',
    },
    {
      icon: 'Leaf',
      title: 'Sustainable Green Energy',
      description: 'Powered by stable and renewable energy, fQuantum ensures reliable operations while supporting carbon reduction and sustainability goals. Our mission is to drive AI and cloud innovation while contributing to a greener planet.',
    },
    {
      icon: 'MapPin',
      title: 'Localized AI Development',
      description: 'As one of Taiwan\'s leading computing infrastructures, fQuantum integrates top local technologies to provide localized LLM and AI application options. We empower regional enterprises to accelerate industrial AI development, driving innovation and growth in Asia\'s AI ecosystem.',
    },
  ],
  journey: {
    title: 'Join Our Journey',
    subtitle: 'Be part of the AI revolution. Partner with Future Quantum to transform your business through cutting-edge infrastructure solutions.',
    cta: 'Work With Us',
  },
};

// ============================================================
// GPU 產品目錄
// ============================================================
export const gpuProducts = [
  {
    id: 'h100',
    title: 'H100 NVL 8x GPU Server',
    badge: 'Popular',
    description: 'Flagship AI training solution for large language models and generative AI',
    specs: [
      '8x NVIDIA H100 Tensor Core GPUs',
      'Intel Xeon Platinum 8480+ CPUs',
      '3.2 Tbps InfiniBand Networking',
      '960GB DDR5 Memory',
      '30.72TB NVMe Storage',
    ],
  },
  {
    id: 'a100',
    title: 'A100 80G 8x GPU Server',
    badge: 'Standard',
    description: 'Cost-effective AI training solution for medium to large model training and fine-tuning',
    specs: [
      '8x NVIDIA A100 80GB GPUs',
      'AMD EPYC 7763 CPUs',
      '400 Gbps InfiniBand Networking',
      '512GB DDR4 Memory',
      '15.36TB NVMe Storage',
    ],
  },
  {
    id: 'l40s',
    title: 'L40S 8x GPU Server',
    badge: 'Inference Optimized',
    description: 'Designed for AI inference with high throughput and low latency',
    specs: [
      '8x NVIDIA L40S GPUs',
      'Intel Xeon Gold 6448Y CPUs',
      '100 Gbps Ethernet Networking',
      '384GB DDR5 Memory',
      '7.68TB NVMe Storage',
    ],
  },
  {
    id: 'rtx6000',
    title: 'RTX 6000 Ada 4x GPU Workstation',
    badge: 'Workstation',
    description: 'Professional workstation for AI development, visualization, and lightweight training',
    specs: [
      '4x NVIDIA RTX 6000 Ada GPUs',
      'AMD Threadripper PRO 5975WX',
      '10 Gbps Ethernet Networking',
      '256GB DDR5 Memory',
      '4TB NVMe Storage',
    ],
  },
];

// ============================================================
// 核心優勢
// ============================================================
export const coreAdvantages = [
  { icon: 'Zap', title: 'Ultimate Performance', description: 'Latest NVIDIA GPU architecture delivering industry-leading AI computing power' },
  { icon: 'Clock', title: 'Flexible Rental', description: 'Pay-as-you-go, scale up or down anytime, no long-term commitment' },
  { icon: 'Headphones', title: 'Professional Support', description: '24/7 professional technical team with rapid response to your needs' },
  { icon: 'Shield', title: 'Security & Compliance', description: 'ISO 27001 certified ensuring absolute data security' },
  { icon: 'Rocket', title: 'Rapid Deployment', description: 'Deploy within 24 hours to get to production fast' },
  { icon: 'Globe', title: 'Global Nodes', description: 'Multiple Asia-Pacific data center nodes with low latency and high availability' },
];

// ============================================================
// 租賃模式
// ============================================================
export const rentalModels = [
  { icon: 'Server', title: 'Bare Metal Server', description: 'Dedicated hardware resources, no virtualization overhead, maximum performance' },
  { icon: 'Cloud', title: 'VM Instances', description: 'Elastic scaling, pay-as-you-go, quick start and stop' },
  { icon: 'Container', title: 'Container Services', description: 'Kubernetes native support, ideal for microservices and CI/CD workflows' },
];

// ============================================================
// 選擇流程
// ============================================================
export const selectionProcess = [
  { step: 1, title: 'Requirements Assessment', description: 'Understand your business needs and technical requirements' },
  { step: 2, title: 'Architecture Planning', description: 'Design optimized system architecture solutions' },
  { step: 3, title: 'Deployment', description: 'Rapid deployment with complete system testing' },
  { step: 4, title: 'Operations Management', description: 'Continuous monitoring and performance optimization' },
];

// ============================================================
// 為什麼選擇我們
// ============================================================
export const whyChooseUs = {
  title: 'Why Choose Future Quantum?',
  description: 'We provide the most comprehensive AI infrastructure solutions in the industry, from hardware to software, from deployment to operations, fully supporting your AI journey.',
  benefits: [
    'Industry-leading NVIDIA GPU partner',
    'Most comprehensive AI infrastructure in Asia-Pacific',
    'End-to-end technical support services',
    'Flexible billing models',
    'Comprehensive data security',
  ],
  stats: [
    { value: '99.99%', label: 'Uptime Guarantee' },
    { value: '500+', label: 'Servers' },
    { value: '8', label: 'Data Centers' },
    { value: '24/7', label: 'Technical Support' },
    { value: '15+', label: 'Years Experience' },
  ],
};

// ============================================================
// IDC 案例研究
// ============================================================
export const caseStudies = [
  {
    id: 'malaysia',
    title: 'Malaysia Smart Computing IDC',
    description: 'Flagship data center providing high-performance AI computing services for Southeast Asian markets',
    image: images.caseMalaysia,
    specs: { scale: '10MW', pue: '<1.4', tier: 'Tier III', location: 'Kuala Lumpur' },
  },
  {
    id: 'thailand',
    title: 'Thailand Bangkok 10th IDC',
    description: 'High-density computing data center with latest cooling technology',
    image: images.caseThailand,
    specs: { scale: '20MW', connectivity: 'Multi-BGP', tier: 'Tier III+', location: 'Bangkok' },
  },
  {
    id: 'japan',
    title: 'Kumamoto Semiconductor Data Center',
    description: 'Dedicated facility for semiconductor design and AI chip validation',
    image: images.caseJapan,
    specs: { purpose: 'Semiconductor Design', security: 'High-spec Physical Protection', power: 'Dual Redundancy', location: 'Kumamoto' },
  },
];

// ============================================================
// O&M 架構
// ============================================================
export const omArchitecture = {
  title: 'High-Performance O&M Architecture',
  subtitle: 'Enterprise-grade 24/7 operations and maintenance support',
  features: [
    { icon: 'Monitor', title: '24/7 Monitoring System', items: ['24/7 NOC Monitoring', 'Real-time Alerts', 'Automated Incident Response'] },
    { icon: 'Thermometer', title: 'Intelligent Thermal Management', items: ['AI Energy Optimization', 'Dynamic Cooling', 'Environmental Sensing'] },
    { icon: 'Battery', title: 'Power Backup Mechanism', items: ['N+1 UPS Configuration', 'Dual Utility Feeds', 'Diesel Generator Backup'] },
    { icon: 'Lock', title: 'Physical Security Protection', items: ['Biometric Access Control', 'Full CCTV Recording', '24/7 Security Patrol'] },
  ],
};

// ============================================================
// 跨境解決方案
// ============================================================
export const crossBorderSolution = {
  title: 'Cross-Border AI Computing Solutions',
  subtitle: 'Low-latency dedicated network connecting Taiwan, Japan, and Southeast Asia.',
  features: ['Direct Connections', 'Cross-border Redundancy', 'Flexible Scheduling', 'One-stop Service'],
  stats: [
    { value: '6', label: 'Sites' },
    { value: '5', label: 'Countries' },
    { value: '<10ms', label: 'Latency' },
    { value: '100Gbps', label: 'Bandwidth' },
  ],
};

// ============================================================
// 平台功能
// ============================================================
export const platformFeatures = [
  { icon: 'Server', title: 'Infrastructure Management', items: ['Resource Monitoring', 'Auto Scaling', 'Security & Permissions', 'Cluster Management'] },
  { icon: 'Cloud', title: 'Multi-Cloud Operations', items: ['AWS/GCP/Azure Integration', 'Hybrid Cloud Architecture', 'Data Migration', 'Cost Optimization'] },
  { icon: 'Container', title: 'Hybrid Deployment', items: ['Container Orchestration', 'CI/CD Pipelines', 'Edge Computing', 'K8s Management'] },
  { icon: 'BarChart', title: 'AI Analytics', items: ['Performance Monitoring', 'Log Analysis', 'Cost Analysis', 'Anomaly Detection'] },
];

// ============================================================
// API 功能
// ============================================================
export const apiFeatures = [
  { title: 'RESTful API', description: 'Standardized REST API endpoints', endpoint: 'api.futurequantum.io/v1' },
  { title: 'GraphQL API', description: 'Flexible query language interface', endpoint: 'api.futurequantum.io/graphql' },
  { title: 'WebSocket API', description: 'Real-time bidirectional communication', endpoint: 'ws.futurequantum.io' },
  { title: 'SDK Integration', description: 'Multi-language development kit support', endpoint: 'sdk.futurequantum.io' },
];

// ============================================================
// AI 模型
// ============================================================
export const aiModels = [
  { id: 'quantum7b', title: 'Quantum-7B', badge: 'General', specs: ['Parameters: 7B', 'Context: 32k'], tags: ['Dialogue', 'Summary', 'Translation'] },
  { id: 'quantum30b', title: 'Quantum-30B', badge: 'Pro', specs: ['Parameters: 30B', 'Context: 128k'], tags: ['Logical Reasoning', 'Code Generation'] },
  { id: 'quantumFinance', title: 'Quantum-Finance', badge: 'Industry', specs: ['Pre-trained: Financial Corpus', 'Compliance: High'], tags: ['Financial Analysis', 'Risk Control'] },
  { id: 'quantumMedical', title: 'Quantum-Medical', badge: 'Industry', specs: ['Pre-trained: Medical Literature', 'Accuracy: 99%'], tags: ['Diagnostic Assistance', 'Medical Records'] },
];

// ============================================================
// LLM 能力
// ============================================================
export const llmCapabilities = [
  { icon: 'Lock', title: 'Private LLM Deployment', items: ['Llama 3 / Mistral Support', 'On-premises Deployment', 'Data Privacy Protection'] },
  { icon: 'Settings', title: 'Fine-tuning & Optimization', items: ['RLHF / SFT Fine-tuning', 'LoRA Efficient Training', 'Quantization Compression'] },
  { icon: 'CheckCircle', title: 'Model Evaluation & Testing', items: ['Automated Evaluation', 'Benchmark Testing', 'Security Detection'] },
];

// ============================================================
// 行業應用
// ============================================================
export const industryApplications = [
  {
    id: 'finance',
    title: 'Financial Services',
    apps: [
      { title: 'Smart Customer Service', desc: '24/7 Automated Response' },
      { title: 'Risk Management', desc: 'Fraud Detection Models' },
      { title: 'Wealth Advisory', desc: 'Personalized Investment Advice' },
    ],
  },
  {
    id: 'healthcare',
    title: 'Smart Healthcare',
    apps: [
      { title: 'Medical Imaging', desc: 'AI Image Analysis' },
      { title: 'Diagnostic Assistance', desc: 'Clinical Decision Support' },
      { title: 'Drug Discovery', desc: 'Protein Structure Prediction' },
    ],
  },
  {
    id: 'manufacturing',
    title: 'Smart Manufacturing',
    apps: [
      { title: 'Defect Detection', desc: 'AOI Visual Recognition' },
      { title: 'Predictive Maintenance', desc: 'Equipment Failure Warning' },
      { title: 'Process Optimization', desc: 'Automatic Parameter Tuning' },
    ],
  },
];

// ============================================================
// AI 開發服務
// ============================================================
export const aiDevServices = [
  { icon: 'Cpu', title: 'Model Training Hosting', desc: 'One-click training job launch' },
  { icon: 'Zap', title: 'Inference API', desc: 'High concurrency, low latency API' },
  { icon: 'Database', title: 'RAG Service', desc: 'Enterprise knowledge retrieval augmentation' },
  { icon: 'MessageSquare', title: 'Prompt Engineering', desc: 'Professional prompt optimization service' },
];

// ============================================================
// 新聞文章
// ============================================================
export const newsArticles = {
  featured: [
    {
      id: 'japan',
      badge: 'Company News',
      readTime: '5 min read',
      title: 'Future Quantum Expands to Japan with New Tokyo Data Center',
      description: 'Our latest data center in Tokyo marks a significant milestone in our Asia-Pacific expansion strategy, bringing cutting-edge AI infrastructure closer to Japanese enterprises.',
      image: images.newsJapan,
    },
    {
      id: 'model',
      badge: 'Technology',
      readTime: '5 min read',
      title: 'FQuantum-13B Achieves State-of-the-Art Performance in Multilingual Tasks',
      description: 'Our latest large language model demonstrates superior performance across English, Chinese, Japanese, and Korean language tasks, setting new benchmarks in the industry.',
      image: images.newsAiNetwork,
    },
  ],
  latest: [
    {
      id: 'partnership',
      badge: 'Partnership',
      readTime: '4 min read',
      title: 'Strategic Partnership with Samsung to Develop Next-Gen AI Chips',
      description: 'Collaborative efforts on developing specialized AI processing units optimized for large language model inference and training workloads.',
      image: images.newsPartnership,
    },
    {
      id: 'sustainability',
      badge: 'Sustainability',
      readTime: '6 min read',
      title: '2025 Sustainability Report: 40% Carbon Footprint Reduction',
      description: 'Our commitment to green technology and renewable energy has resulted in significant carbon reductions across all data centers.',
      image: images.newsSustainability,
    },
    {
      id: 'awards',
      badge: 'Awards',
      readTime: '3 min read',
      title: 'Future Quantum Wins AI Infrastructure Provider of the Year Award',
      description: 'Recognition from the Asia Pacific Technology Awards for our innovative approach to AI infrastructure and exceptional customer service.',
      image: images.newsAwards,
    },
  ],
};

// ============================================================
// FAQ
// ============================================================
export const faq = [
  { question: 'How do I start using AI server rental?', answer: 'Simply fill out the form or contact sales@fquantum.net directly. Our team will reach out within 24 hours to discuss your needs and provide the best solution.' },
  { question: 'Which AI frameworks are supported?', answer: 'We support all major AI frameworks including PyTorch, TensorFlow, JAX, ONNX, and more, with pre-configured environments to accelerate your development.' },
  { question: 'How is data security ensured?', answer: 'We hold ISO 27001 security certification, all data transfers use TLS encryption, and we offer private cloud deployment options to meet the strictest compliance requirements.' },
  { question: 'Do you provide technical support?', answer: 'We provide a 24/7 technical support team available via phone, email, or instant messaging to ensure your AI workloads run continuously.' },
  { question: 'How does billing work?', answer: 'We offer flexible plans including hourly billing, monthly packages, and long-term contract discounts, customizable based on your usage and budget.' },
  { question: 'How can I get a quote?', answer: 'Please fill out the contact form above or send an email directly to sales@fquantum.net, and we will provide a detailed quote based on your requirements.' },
];

// ============================================================
// 導航選單
// ============================================================
export const navigation = {
  main: [
    { label: 'Compute Services', href: '/services/compute' },
    { label: 'Products', href: '/products' },
    { label: 'Solutions', href: '/solutions' },
    { label: 'Platform & Technology', href: '/platform' },
    { label: 'Software & AI', href: '/software' },
    { label: 'News & Insights', href: '/news' },
    { label: 'About Us', href: '/about' },
  ],
  products: [
    { label: 'Blackwell Ultra', href: '/products/blackwell-ultra' },
    { label: 'NVIDIA-GB200-NVL72', href: '/products/gb200' },
    { label: 'NVIDIA-HGX-B300', href: '/products/hgx-b300' },
    { label: 'NVIDIA-HGX-B200', href: '/products/hgx-b200' },
    { label: 'NVIDIA-H200', href: '/products/h200' },
    { label: 'NVIDIA-H100', href: '/products/h100' },
  ],
};

// ============================================================
// Footer
// ============================================================
export const footer = {
  description: companyInfo.description,
  sections: [
    {
      title: 'Services',
      links: [
        { label: 'AI Server Rental', href: '/services/compute' },
        { label: 'IDC Construction', href: '/solutions' },
        { label: 'AI Platform Development', href: '/software' },
        { label: 'Fiber Networks', href: '/solutions' },
      ],
    },
    {
      title: 'Solutions',
      links: [
        { label: 'Enterprise AI Adoption', href: '/solutions' },
        { label: 'Cloud Computing', href: '/platform' },
        { label: 'Data Center', href: '/solutions' },
        { label: 'Hybrid Cloud', href: '/platform' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '/about' },
        { label: 'Team', href: '/about' },
        { label: 'News', href: '/news' },
        { label: 'Partners', href: '/about' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'Documentation', href: '/platform' },
        { label: 'Case Studies', href: '/solutions' },
        { label: 'FAQ', href: '/contact' },
        { label: 'Contact Us', href: '/contact' },
      ],
    },
  ],
  legal: {
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
    copyright: '© 2024 Future Quantum. All rights reserved.',
  },
};

export default {
  companyInfo,
  images,
  hero,
  stats,
  quickAccess,
  coreServices,
  globalInfrastructure,
  cta,
  about,
  gpuProducts,
  coreAdvantages,
  rentalModels,
  selectionProcess,
  whyChooseUs,
  caseStudies,
  omArchitecture,
  crossBorderSolution,
  platformFeatures,
  apiFeatures,
  aiModels,
  llmCapabilities,
  industryApplications,
  aiDevServices,
  newsArticles,
  faq,
  navigation,
  footer,
};
