/**
 * 🎭 Page Composer - 頁面組合器
 * 
 * 將劇本 (Script) + 內容 (Content) 組合成實際的 React 頁面
 * 這是 NDMD 系統的「編譯器」
 */

import React from 'react';
import { PageScript, SectionScript, SectionType } from './script-engine';
import { PageContent } from './content-schema';
import { cn } from './utils';

// ============================================================
// Section 渲染器
// ============================================================

interface SectionRendererProps {
  script: SectionScript;
  content: PageContent;
}

/**
 * 根據劇本配置渲染對應的區塊
 */
function renderSection({ script, content }: SectionRendererProps): React.ReactNode {
  const { type, background, spacing } = script;
  
  // 背景樣式映射
  const bgClasses: Record<typeof background, string> = {
    transparent: '',
    muted: 'bg-muted/30',
    glass: 'backdrop-blur-xl bg-card/30 border-y border-border/50',
    dark: 'bg-slate-900 text-white',
  };
  
  // 間距映射
  const spacingClasses: Record<typeof spacing, string> = {
    compact: 'py-12 md:py-16',
    default: 'py-16 md:py-24',
    relaxed: 'py-24 md:py-32',
  };
  
  // 根據區塊類型渲染內容
  const sectionContent = renderSectionContent(type, content);
  
  if (!sectionContent) return null;
  
  return (
    <section 
      key={type}
      className={cn(bgClasses[background], spacingClasses[spacing])}
    >
      <div className="container">
        {sectionContent}
      </div>
    </section>
  );
}

/**
 * 根據區塊類型渲染內容
 */
function renderSectionContent(type: SectionType, content: PageContent): React.ReactNode {
  switch (type) {
    case 'hero':
      return renderHero(content.hero);
    
    case 'trust':
      return content.trust ? renderTrust(content.trust) : null;
    
    case 'features':
      return content.features ? renderFeatures(content.features) : null;
    
    case 'stats':
      // 複用 trust 的 stats 或 hero 的 stats
      const stats = content.trust?.stats || content.hero.stats;
      return stats ? renderStats(stats) : null;
    
    case 'testimonials':
      return content.testimonials ? renderTestimonials(content.testimonials) : null;
    
    case 'case-study':
      return content.caseStudy ? renderCaseStudy(content.caseStudy) : null;
    
    case 'pricing':
      return content.pricing ? renderPricing(content.pricing) : null;
    
    case 'cta':
      return renderCTA(content.cta);
    
    case 'faq':
      return content.faq ? renderFAQ(content.faq) : null;
    
    default:
      return null;
  }
}

// ============================================================
// 區塊渲染函數
// ============================================================

import type { 
  HeroContent, 
  TrustContent, 
  FeaturesContent,
  TestimonialsContent,
  CTAContent,
  FAQSectionContent,
  PricingAreaContent,
  CaseStudyContent,
  StatContent
} from './content-schema';

function renderHero(hero: HeroContent): React.ReactNode {
  return (
    <div className="text-center max-w-4xl mx-auto">
      {hero.badge && (
        <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full mb-6">
          {hero.badge}
        </span>
      )}
      <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
        {hero.title}
      </h1>
      {hero.subtitle && (
        <p className="text-xl md:text-2xl text-muted-foreground mb-8">
          {hero.subtitle}
        </p>
      )}
      {hero.description && (
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          {hero.description}
        </p>
      )}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a 
          href={hero.primaryCta.href}
          className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
        >
          {hero.primaryCta.text}
          {hero.primaryCta.icon === 'arrow' && (
            <span className="ml-2">→</span>
          )}
        </a>
        {hero.secondaryCta && (
          <a 
            href={hero.secondaryCta.href}
            className="inline-flex items-center justify-center px-6 py-3 border border-border rounded-lg font-medium hover:bg-accent transition-colors"
          >
            {hero.secondaryCta.icon === 'play' && (
              <span className="mr-2">▶</span>
            )}
            {hero.secondaryCta.text}
          </a>
        )}
      </div>
      {hero.stats && hero.stats.length > 0 && (
        <div className="grid grid-cols-3 gap-8 mt-16 pt-8 border-t border-border">
          {hero.stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl md:text-4xl font-bold">
                {stat.prefix}{stat.value}{stat.suffix}
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function renderTrust(trust: TrustContent): React.ReactNode {
  return (
    <div className="text-center">
      {trust.title && (
        <p className="text-sm text-muted-foreground mb-8">{trust.title}</p>
      )}
      <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
        {trust.logos.map((logo, i) => (
          <div key={i} className="opacity-60 hover:opacity-100 transition-opacity">
            {logo.href ? (
              <a href={logo.href} title={logo.name}>
                <img src={logo.src} alt={logo.name} className="h-8 md:h-10" />
              </a>
            ) : (
              <img src={logo.src} alt={logo.name} className="h-8 md:h-10" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function renderFeatures(features: FeaturesContent): React.ReactNode {
  const columns = features.columns || 3;
  
  return (
    <div>
      {(features.badge || features.title) && (
        <div className="text-center mb-12">
          {features.badge && (
            <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full mb-4">
              {features.badge}
            </span>
          )}
          {features.title && (
            <h2 className="text-3xl md:text-4xl font-bold">{features.title}</h2>
          )}
          {features.subtitle && (
            <p className="text-lg text-muted-foreground mt-4">{features.subtitle}</p>
          )}
        </div>
      )}
      <div className={cn(
        'grid gap-8',
        columns === 2 && 'md:grid-cols-2',
        columns === 3 && 'md:grid-cols-3',
        columns === 4 && 'md:grid-cols-2 lg:grid-cols-4'
      )}>
        {features.features.map((feature, i) => (
          <div key={i} className="p-6 rounded-xl border border-border bg-card">
            {feature.icon && (
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <span className="text-primary text-xl">⚡</span>
              </div>
            )}
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-muted-foreground">{feature.description}</p>
            {feature.link && (
              <a 
                href={feature.link.href}
                className="inline-flex items-center text-primary mt-4 hover:underline"
              >
                {feature.link.text} →
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function renderStats(stats: StatContent[]): React.ReactNode {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {stats.map((stat, i) => (
        <div key={i} className="text-center">
          <div className="text-4xl md:text-5xl font-bold">
            {stat.prefix}{stat.value}{stat.suffix}
          </div>
          <div className="text-sm text-muted-foreground mt-2">
            {stat.label}
          </div>
          {stat.description && (
            <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
          )}
        </div>
      ))}
    </div>
  );
}

function renderTestimonials(testimonials: TestimonialsContent): React.ReactNode {
  return (
    <div>
      {testimonials.title && (
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">{testimonials.title}</h2>
          {testimonials.subtitle && (
            <p className="text-lg text-muted-foreground mt-4">{testimonials.subtitle}</p>
          )}
        </div>
      )}
      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.testimonials.map((testimonial, i) => (
          <div key={i} className="p-6 rounded-xl border border-border bg-card">
            <blockquote className="text-lg mb-6">
              "{testimonial.quote}"
            </blockquote>
            <div className="flex items-center gap-4">
              {testimonial.avatar && (
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.author}
                  className="w-12 h-12 rounded-full"
                />
              )}
              <div>
                <div className="font-semibold">{testimonial.author}</div>
                <div className="text-sm text-muted-foreground">
                  {testimonial.role}, {testimonial.company}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function renderCaseStudy(caseStudy: CaseStudyContent): React.ReactNode {
  return (
    <div className="grid md:grid-cols-2 gap-12 items-center">
      <div>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{caseStudy.title}</h2>
        {caseStudy.subtitle && (
          <p className="text-lg text-muted-foreground mb-8">{caseStudy.subtitle}</p>
        )}
        <div className="grid grid-cols-2 gap-6 mb-8">
          {caseStudy.stats.map((stat, i) => (
            <div key={i}>
              <div className="text-3xl font-bold">
                {stat.prefix}{stat.value}{stat.suffix}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
        {caseStudy.testimonial && (
          <blockquote className="border-l-2 border-primary pl-4 italic">
            "{caseStudy.testimonial.quote}"
            <footer className="text-sm text-muted-foreground mt-2">
              — {caseStudy.testimonial.author}, {caseStudy.testimonial.company}
            </footer>
          </blockquote>
        )}
      </div>
      {caseStudy.media && (
        <div className="rounded-xl overflow-hidden border border-border">
          {caseStudy.media.isVideo ? (
            <video src={caseStudy.media.src} controls className="w-full" />
          ) : (
            <img src={caseStudy.media.src} alt={caseStudy.media.alt} className="w-full" />
          )}
        </div>
      )}
    </div>
  );
}

function renderPricing(pricing: PricingAreaContent): React.ReactNode {
  return (
    <div>
      {pricing.title && (
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">{pricing.title}</h2>
          {pricing.subtitle && (
            <p className="text-lg text-muted-foreground mt-4">{pricing.subtitle}</p>
          )}
        </div>
      )}
      <div className="grid md:grid-cols-3 gap-8">
        {pricing.plans.map((plan, i) => (
          <div 
            key={i} 
            className={cn(
              "p-8 rounded-xl border bg-card",
              plan.featured ? "border-primary ring-2 ring-primary/20" : "border-border"
            )}
          >
            {plan.badge && (
              <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full mb-4">
                {plan.badge}
              </span>
            )}
            <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
            {plan.price && (
              <div className="text-4xl font-bold mb-4">
                {plan.price}
                {plan.unit && <span className="text-lg font-normal text-muted-foreground">/{plan.unit}</span>}
              </div>
            )}
            <p className="text-muted-foreground mb-6">{plan.description}</p>
            {plan.features && (
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            )}
            <a 
              href={plan.ctaHref}
              className={cn(
                "block text-center py-3 rounded-lg font-medium transition-colors",
                plan.featured 
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "border border-border hover:bg-accent"
              )}
            >
              {plan.ctaText}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

function renderCTA(cta: CTAContent): React.ReactNode {
  return (
    <div className="text-center max-w-2xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">{cta.title}</h2>
      {cta.subtitle && (
        <p className="text-lg text-muted-foreground mb-8">{cta.subtitle}</p>
      )}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a 
          href={cta.primaryCta.href}
          className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground rounded-lg font-medium text-lg hover:bg-primary/90 transition-colors"
        >
          {cta.primaryCta.text}
          {cta.primaryCta.icon === 'arrow' && (
            <span className="ml-2">→</span>
          )}
        </a>
        {cta.secondaryCta && (
          <a 
            href={cta.secondaryCta.href}
            className="inline-flex items-center justify-center px-8 py-4 border border-current rounded-lg font-medium text-lg hover:bg-white/10 transition-colors"
          >
            {cta.secondaryCta.text}
          </a>
        )}
      </div>
    </div>
  );
}

function renderFAQ(faq: FAQSectionContent): React.ReactNode {
  return (
    <div className="max-w-3xl mx-auto">
      {faq.title && (
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">{faq.title}</h2>
          {faq.subtitle && (
            <p className="text-lg text-muted-foreground mt-4">{faq.subtitle}</p>
          )}
        </div>
      )}
      <div className="space-y-4">
        {faq.items.map((item, i) => (
          <details 
            key={i}
            className="group p-6 rounded-xl border border-border bg-card"
          >
            <summary className="font-semibold cursor-pointer list-none flex justify-between items-center">
              {item.question}
              <span className="text-muted-foreground group-open:rotate-180 transition-transform">
                ▼
              </span>
            </summary>
            <p className="text-muted-foreground mt-4">{item.answer}</p>
          </details>
        ))}
      </div>
      {faq.cta && (
        <div className="text-center mt-12">
          <a 
            href={faq.cta.href}
            className="inline-flex items-center text-primary hover:underline"
          >
            {faq.cta.text} →
          </a>
        </div>
      )}
    </div>
  );
}

// ============================================================
// 主要組合函數
// ============================================================

interface ComposePageProps {
  script: PageScript;
  content: PageContent;
}

/**
 * 將劇本和內容組合成完整頁面
 */
export function composePage({ script, content }: ComposePageProps): React.ReactNode {
  return (
    <>
      {script.sections.map((section, index) => (
        <React.Fragment key={`${section.type}-${index}`}>
          {renderSection({ script: section, content })}
        </React.Fragment>
      ))}
    </>
  );
}

/**
 * 生成頁面的 React 組件代碼（字串形式）
 */
export function generatePageCode(script: PageScript, content: PageContent): string {
  const imports = new Set<string>();
  imports.add("import { PageLayout } from '@/components/blocks/layout';");
  imports.add("import { Section } from '@/components/blocks/layout';");
  
  const sectionCodes: string[] = [];
  
  for (const section of script.sections) {
    sectionCodes.push(`
      <Section
        id="${section.type}"
        background="${section.background}"
        spacing="${section.spacing}"
      >
        {/* ${section.type.toUpperCase()} 區塊 */}
        {/* 詞彙: ${section.vocabulary.join(', ')} */}
      </Section>`);
  }
  
  return `
${Array.from(imports).join('\n')}

export default function GeneratedPage() {
  return (
    <PageLayout>
      ${sectionCodes.join('\n')}
    </PageLayout>
  );
}
`.trim();
}

// ============================================================
// 匯出
// ============================================================

export { renderSection, renderSectionContent };

