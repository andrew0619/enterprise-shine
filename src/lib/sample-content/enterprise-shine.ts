/**
 * 📦 Enterprise Shine 樣本網站完整內容
 * 
 * 這是從 enterprise-shine 專案首頁提取的真實內容
 * 用於 NDMD 系統驗證測試
 * 
 * ⚠️ 不要修改任何文字或圖片，保持原汁原味
 */

import type { PageContent } from '../content-schema';

// ============================================================
// 圖片資源路徑（來自 enterprise-shine/src/assets/）
// ============================================================
export const SHINE_IMAGES = {
  heroCubes: '/assets/home/hero-cubes.png',
  ctaAbstract: '/assets/home/cta-abstract.jpg',
  h200Hero: '/assets/h200/hero-h200.jpg',
  gpuRack: '/assets/gpu/gpu-rack.jpg',
} as const;

// ============================================================
// Partner Logos
// ============================================================
export const partnerLogos = [
  { name: 'DeepSeek', icon: '🐋', src: '' },
  { name: 'OpenAI', icon: '◯', src: '' },
  { name: 'Anthropic', icon: 'A', src: '' },
  { name: 'NVIDIA', icon: '◆', src: '' },
  { name: 'LangChain', icon: '🔗', src: '' },
  { name: 'Hugging Face', icon: '🤗', src: '' },
  { name: 'Meta', icon: '∞', src: '' },
  { name: 'Mistral', icon: 'M', src: '' },
];

// ============================================================
// Enterprise Shine 完整頁面內容
// ============================================================
export const enterpriseShineContent: PageContent = {
  meta: {
    title: 'NexusAI - Build AI Without Limits',
    description: 'Complete GPU infrastructure for building scalable AI solutions',
    slug: 'enterprise-shine',
  },
  
  // ============================================================
  // Hero Section
  // ============================================================
  hero: {
    title: 'Build AI Without Limits',
    subtitle: 'We build complete GPU infrastructure so you can focus on what really matters — your AI.',
    primaryCta: {
      text: 'Get Started',
      href: '/contact',
      icon: 'arrow',
    },
    secondaryCta: {
      text: 'View Pricing',
      href: '/pricing',
    },
    logos: partnerLogos,
  },
  
  // ============================================================
  // Trust Section (Stats + Logos)
  // ============================================================
  trust: {
    title: 'Trusted by leading AI companies',
    logos: partnerLogos,
    stats: [
      { value: '87', suffix: '%', label: 'Avg. GPU Usage' },
      { value: '24', label: 'Active Nodes' },
      { value: '1.2', suffix: 'TB', label: 'Memory Used' },
      { value: '99.9', suffix: '%', label: 'Uptime' },
    ],
    variant: 'both',
  },
  
  // ============================================================
  // Features Section (Foundation + Products)
  // ============================================================
  features: {
    badge: 'PLATFORM',
    title: 'The Foundation for Your AI Success',
    subtitle: '— Powered by GPU Cloud Solutions',
    features: [
      {
        icon: 'Zap',
        title: 'Inference Engine',
        description: 'GMI Cloud Inference Engine provides developers with the ultra-fast speed and flexible scalability needed to run AI models, designed for extremely low latency, high concurrency processing, and top-tier performance optimization.',
        link: {
          text: 'Learn More',
          href: '/products/inference-engine',
        },
      },
      {
        icon: 'Boxes',
        title: 'Cluster Engine',
        description: 'GMI Cloud\'s Cluster Engine is your all-in-one AI cloud management platform, designed to streamline GPU resource coordination, workload scheduling, and cost optimization.',
        link: {
          text: 'Learn More',
          href: '/products/cluster-engine',
        },
      },
      {
        icon: 'Cpu',
        title: 'GPUs',
        description: 'GMI Cloud offers a diverse portfolio of NVIDIA GPUs, designed for AI/ML training, inference, and data analytics. Our GPU infrastructure is purpose-built for the most demanding AI workloads.',
        link: {
          text: 'Learn More',
          href: '/gpu-compute',
        },
      },
    ],
    layout: 'grid',
    columns: 3,
  },
  
  // ============================================================
  // Testimonials / Case Study
  // ============================================================
  testimonials: {
    title: 'Proven Results',
    subtitle: 'Our customers achieve measurable improvements in cost, performance, and time-to-market.',
    testimonials: [
      {
        quote: 'NexusAI transformed how we deploy AI models. What used to take weeks now takes hours.',
        author: 'Sarah Chen',
        role: 'CTO',
        company: 'TechVentures',
      },
    ],
  },
  
  caseStudy: {
    title: 'Proven Results',
    subtitle: 'Our customers achieve measurable improvements in cost, performance, and time-to-market.',
    testimonial: {
      quote: 'NexusAI transformed how we deploy AI models. What used to take weeks now takes hours.',
      author: 'Sarah Chen',
      role: 'CTO',
      company: 'TechVentures',
    },
    stats: [
      { 
        value: '50', 
        suffix: '%', 
        label: 'Cost Savings',
        description: 'Average reduction in infrastructure costs',
      },
      { 
        value: '10', 
        suffix: 'x', 
        label: 'Faster Deployment',
        description: 'From weeks to hours for new GPU clusters',
      },
    ],
  },
  
  // ============================================================
  // FAQ Section
  // ============================================================
  faq: {
    title: 'Frequently Asked Questions',
    subtitle: 'Everything you need to know about our GPU infrastructure platform.',
    items: [
      {
        question: 'What GPU models do you offer?',
        answer: 'We offer the latest NVIDIA GPUs including H100, A100, and L40S. All clusters are equipped with NVLink and InfiniBand for maximum performance.',
      },
      {
        question: 'How quickly can I deploy a new cluster?',
        answer: 'Most clusters can be provisioned within hours, not weeks. Our automated infrastructure allows for rapid scaling.',
      },
      {
        question: 'What security certifications do you have?',
        answer: 'We maintain SOC 2 Type II, HIPAA, and GDPR compliance. All data is encrypted at rest and in transit.',
      },
      {
        question: 'Can I bring my own models?',
        answer: 'Absolutely. Our platform supports any model format including PyTorch, TensorFlow, and ONNX.',
      },
      {
        question: 'How does billing work?',
        answer: 'We offer flexible pricing including on-demand, reserved capacity, and committed use discounts.',
      },
    ],
    cta: {
      text: 'Contact Sales',
      href: '/contact',
    },
  },
  
  // ============================================================
  // CTA Section
  // ============================================================
  cta: {
    title: 'Ready to Deploy AI at Scale?',
    subtitle: 'Join thousands of companies using NexusAI to power their AI infrastructure. Get started in minutes.',
    primaryCta: {
      text: 'Contact Sales',
      href: '/contact',
      icon: 'arrow',
    },
    secondaryCta: {
      text: 'View Pricing',
      href: '/pricing',
    },
  },
};

// ============================================================
// News Articles
// ============================================================
export const newsArticles = [
  {
    title: 'Scaling AI Infrastructure: Lessons from 10,000 GPUs',
    excerpt: 'How enterprise teams are managing GPU clusters at unprecedented scale.',
    category: 'Engineering',
    href: '/blog/scaling-ai',
  },
  {
    title: 'The Future of Inference: H100 vs A100 Benchmarks',
    excerpt: 'Real-world performance comparisons for production AI workloads.',
    category: 'Research',
    href: '/blog/h100-benchmarks',
  },
  {
    title: 'Cost Optimization Strategies for AI Teams',
    excerpt: 'Practical tips to reduce your GPU infrastructure costs by up to 50%.',
    category: 'Business',
    href: '/blog/cost-optimization',
  },
];

// ============================================================
// GPU Features
// ============================================================
export const gpuFeatures = [
  {
    icon: 'Cpu',
    title: 'Top Tier GPUs',
    description: 'Access the latest NVIDIA H100 and A100 GPUs with guaranteed availability and competitive pricing.',
  },
  {
    icon: 'Network',
    title: 'InfiniBand Networking',
    description: 'Ultra-low latency interconnects with 400Gb/s bandwidth for distributed training and real-time inference.',
  },
  {
    icon: 'Lock',
    title: 'Secure and Scalable',
    description: 'Enterprise-grade security with SOC 2 Type II, HIPAA, and GDPR compliance. Scale from 1 to 1000+ GPUs.',
  },
];

// ============================================================
// Model List (Inference Engine)
// ============================================================
export const modelsList = [
  {
    type: 'Chat',
    name: 'DeepSeek R1',
    description: 'Open-source reasoning model, rivaling OpenAI o1, excelling in math, coding, and multi-step reasoning.',
    icon: '🐋',
    free: false,
  },
  {
    type: 'Chat',
    name: 'DeepSeek R1 Distill Llama 70B Free',
    description: 'Free endpoint to experience powerful reasoning model, this distilled version retains excellent reasoning capabilities.',
    icon: '🐋',
    free: true,
  },
  {
    type: 'Chat',
    name: 'Llama 3.3 70B Instruct Turbo Free',
    description: 'Open-source reasoning model, supports multi-language dialogue optimization, specifically tuned for dialogue fluency.',
    icon: '∞',
    free: true,
  },
];

export default enterpriseShineContent;

