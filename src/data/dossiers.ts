export interface JobRecommendation {
  id: string;
  rank: string;
  title: string;
  description: string;
  matchScore: string;
  scopeTag: string;
  scopeIcon: string;
}

export interface TargetCompanyType {
  title: string;
  description: string;
}

export interface DossierProfile {
  id: string;
  label: string;
  confidenceScore: string;
  recognizedTitle: string;
  trajectory: string;
  skills: string[];
  jobs: JobRecommendation[];
  keywords: string[];
  companyTypes: TargetCompanyType[];
  sampleText: string;
}

export const DOSSIER_PROFILES: Record<string, DossierProfile> = {
  designer: {
    id: 'designer',
    label: 'Senior Product Designer',
    confidenceScore: '94% Match Confidence',
    recognizedTitle: 'Senior Product Designer / Strategist',
    trajectory: 'Ready for executive and principal IC trajectory',
    skills: [
      'Design Systems Architecture',
      'Cross-functional Product Leadership',
      'User Research & Heuristic Analysis',
      'B2B SaaS Strategy',
      'Figma / Advanced Prototyping',
      'Design Operations (DesignOps)',
      'Quantitative Analytics & A/B Testing',
      'Information Architecture',
      'Agile Sprint Orchestration'
    ],
    jobs: [
      {
        id: '1',
        rank: '01',
        title: 'Principal Product Designer',
        description: 'Systems & zero-to-one product vision',
        matchScore: '98% High',
        scopeTag: 'Tier 1 Enterprise Scope',
        scopeIcon: 'trending_up'
      },
      {
        id: '2',
        rank: '02',
        title: 'Lead Product Experience Architect',
        description: 'B2B complex workflows & enterprise UI',
        matchScore: '94% High',
        scopeTag: 'Multi-Platform Portfolios',
        scopeIcon: 'hub'
      },
      {
        id: '3',
        rank: '03',
        title: 'Design Systems Lead',
        description: 'Token architecture & component governance',
        matchScore: '91% High',
        scopeTag: 'Infra & Token Ops',
        scopeIcon: 'layers'
      },
      {
        id: '4',
        rank: '04',
        title: 'Staff UX Strategist',
        description: 'Qualitative research synthesis & roadmap alignment',
        matchScore: '87% Solid',
        scopeTag: 'Growth & Research Focus',
        scopeIcon: 'analytics'
      },
      {
        id: '5',
        rank: '05',
        title: 'Director of Product Design',
        description: 'Team enablement & organizational scale',
        matchScore: '82% Emerging',
        scopeTag: 'Executive Management',
        scopeIcon: 'groups'
      }
    ],
    keywords: [
      'Senior Staff UX',
      'Design Systems Lead',
      'B2B SaaS Designer',
      'Principal UI Architect',
      'Enterprise Product Design',
      'Figma Design Tokens',
      'UX Governance'
    ],
    companyTypes: [
      {
        title: 'Series B-to-D High-Growth SaaS',
        description: 'Companies scaling their design systems and needing strong architectural foundations to eliminate product debt across engineering teams.'
      },
      {
        title: 'Enterprise Infrastructure & Developer Tools',
        description: 'Complex multi-product ecosystems where dense information architecture, technical workflows, and systemic clarity are paramount.'
      },
      {
        title: 'Digital Product Consultancies & Strategy Studios',
        description: 'High-leverage client advisory requiring versatile senior leadership, zero-to-one prototyping velocity, and executive storytelling.'
      },
      {
        title: 'Modern FinTech & HealthTech Platforms',
        description: 'Highly regulated domains placing an extreme premium on user trust, transactional clarity, and systematic UI consistency.'
      }
    ],
    sampleText: `Senior Product Design Leader & Strategist with 9+ years architecting enterprise SaaS ecosystems, scalable design systems, and zero-to-one digital products. Led cross-functional UX governance across 14 squads, unifying design tokens between Figma and React codebases, cutting front-end design debt by 42%. Championed quantitative research frameworks, continuous heuristic analysis, and usability bench-marking that propelled user activation rates from 19% to 34%. Proven track record collaborating with VP of Product and Head of Engineering to translate complex multi-tenant workflows into elegant, humane human-computer interactions.`
  },
  engineer: {
    id: 'engineer',
    label: 'Staff AI Systems Architect',
    confidenceScore: '96% Match Confidence',
    recognizedTitle: 'Staff AI / ML Infrastructure Architect',
    trajectory: 'Targeted for Principal Platform & Foundation AI roles',
    skills: [
      'Distributed Systems Architecture',
      'LLM Serving & Inference Optimization',
      'Vector Databases & RAG Pipelines',
      'Kubernetes & GPU Cluster Orchestration',
      'Low-Latency C++ / Python Microservices',
      'Data Streaming & Kafka Pipelines',
      'System Reliability & Multi-Region SRE',
      'Cost-per-Token Reduction Strategies',
      'Technical Mentorship & RFC Governance'
    ],
    jobs: [
      {
        id: '1',
        rank: '01',
        title: 'Staff AI Infrastructure Engineer',
        description: 'High-throughput LLM inference & distributed clusters',
        matchScore: '97% High',
        scopeTag: 'Foundation Model Scale',
        scopeIcon: 'memory'
      },
      {
        id: '2',
        rank: '02',
        title: 'Principal Systems Architect',
        description: 'Core platform infrastructure & multi-region reliability',
        matchScore: '93% High',
        scopeTag: 'Tier 1 Distributed Scope',
        scopeIcon: 'hub'
      },
      {
        id: '3',
        rank: '03',
        title: 'Lead Machine Learning Platform Engineer',
        description: 'Internal ML developer tools & automated training pipelines',
        matchScore: '89% High',
        scopeTag: 'Infra & GPU Ops',
        scopeIcon: 'layers'
      },
      {
        id: '4',
        rank: '04',
        title: 'Director of AI Infrastructure',
        description: 'Team scaling, cloud GPU spend optimization & roadmaps',
        matchScore: '84% Solid',
        scopeTag: 'Engineering Leadership',
        scopeIcon: 'groups'
      },
      {
        id: '5',
        rank: '05',
        title: 'Staff Applied Research Engineer',
        description: 'Productionizing cutting-edge generative models & agents',
        matchScore: '80% Emerging',
        scopeTag: 'Applied AI Innovation',
        scopeIcon: 'auto_awesome'
      }
    ],
    keywords: [
      'Staff AI Engineer',
      'LLM Inference Platform',
      'Distributed Systems Architect',
      'GPU Cluster SRE',
      'Vector Search Infrastructure',
      'vLLM / TensorRT-LLM',
      'Platform Engineering Lead'
    ],
    companyTypes: [
      {
        title: 'Frontier AI Labs & LLM Infrastructure Providers',
        description: 'Scale-ups building foundational compute, specialized model hosting, fine-tuning APIs, and low-latency inference fabrics.'
      },
      {
        title: 'Cloud Hyper-scalers & Developer Tool Platforms',
        description: 'Organizations engineering managed distributed databases, event-driven stream processing, and developer-first cloud architectures.'
      },
      {
        title: 'Autonomous Systems & Robotics Scale-ups',
        description: 'High-bandwidth telemetry ingestion, real-time edge compute, and high-concurrency simulation backbones.'
      },
      {
        title: 'Algorithmic FinTech & High-Frequency Trading',
        description: 'Microsecond execution engines where deterministic latency, memory safety, and high-availability architecture dictate success.'
      }
    ],
    sampleText: `Staff Distributed Systems & AI Infrastructure Engineer with 11 years engineering low-latency platforms handling 85,000+ RPS. Designed and scaled GPU inference cluster powering enterprise generative AI features, decreasing P99 latency by 38% and reducing AWS compute overhead by $1.4M annually. Specialized in Kubernetes, vLLM, Triton Inference Server, Kafka, and Rust microservices. Authored foundational architectural RFCs adopted company-wide across 180 engineers.`
  },
  growth: {
    id: 'growth',
    label: 'VP Product & Growth',
    confidenceScore: '92% Match Confidence',
    recognizedTitle: 'VP of Product Strategy & Growth',
    trajectory: 'Ready for Chief Product Officer & Operating Partner path',
    skills: [
      'Product-Led Growth (PLG) Strategy',
      'Monetization & Pricing Tier Design',
      'Executive P&L Ownership',
      'Enterprise Inbound Funnel Optimization',
      'Data-Informed Retention Loops',
      'M&A Integration & Product Due Diligence',
      'Cross-Functional Executive Alignment',
      'Market Positioning & Competitive Moats',
      'Customer Advisory Board Leadership'
    ],
    jobs: [
      {
        id: '1',
        rank: '01',
        title: 'Vice President of Product Management',
        description: 'Strategic portfolio vision, multi-squad leadership & P&L',
        matchScore: '96% High',
        scopeTag: 'Executive Leadership',
        scopeIcon: 'trending_up'
      },
      {
        id: '2',
        rank: '02',
        title: 'Head of Product-Led Growth (PLG)',
        description: 'Self-serve expansion, viral loops & self-onboarding',
        matchScore: '93% High',
        scopeTag: 'Growth Engine Scope',
        scopeIcon: 'bolt'
      },
      {
        id: '3',
        rank: '03',
        title: 'Chief Product Officer (Series B/C)',
        description: 'Organizational culture, product strategy & board reporting',
        matchScore: '88% Solid',
        scopeTag: 'C-Suite Mandate',
        scopeIcon: 'verified'
      },
      {
        id: '4',
        rank: '04',
        title: 'Senior Director of Product Strategy',
        description: 'Enterprise market entry, packaging & portfolio expansion',
        matchScore: '85% Solid',
        scopeTag: 'Strategic Expansion',
        scopeIcon: 'domain'
      },
      {
        id: '5',
        rank: '05',
        title: 'Operating Partner - Product Portfolio',
        description: 'Advisory to portfolio ventures on scaling and retention',
        matchScore: '81% Emerging',
        scopeTag: 'Venture & Growth Advisory',
        scopeIcon: 'groups'
      }
    ],
    keywords: [
      'VP of Product',
      'Head of Product Growth',
      'Product-Led Growth Leader',
      'B2B Enterprise SaaS CPO',
      'Freemium Monetization Architect',
      'Portfolio Strategy Director',
      'Retention & Expansion Metrics'
    ],
    companyTypes: [
      {
        title: 'Growth-Stage B2B Platforms ($20M-$100M ARR)',
        description: 'SaaS market leaders transitioning from initial product-market fit to sustainable multi-product self-serve and enterprise monetization.'
      },
      {
        title: 'Tier 1 Venture Capital & Growth Equity Portfolios',
        description: 'Investment firms seeking operating executives to audit product roadmaps, accelerate go-to-market motions, and unblock portfolio company expansion.'
      },
      {
        title: 'Vertical SaaS Disrupters in Legacy Industries',
        description: 'Modernizing logistics, construction, healthcare, and procurement software with modern consumerized workflow experiences.'
      },
      {
        title: 'Global Collaboration & Workflow Networks',
        description: 'Product ecosystems driven by network effects, workspace viral invitations, and deep enterprise workflow automation.'
      }
    ],
    sampleText: `Vice President of Product & Growth with track record scaling enterprise SaaS from $8M to $46M ARR. Orchestrated conversion funnel overhaul boosting self-serve activation by 64% while maintaining gross margins at 82%. Managed product management, product marketing, and design organizations across 3 global hubs. Steered pricing and packaging restructuring that increased Net Dollar Retention (NDR) to 124%.`
  }
};
