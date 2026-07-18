import type {
  CaseStudyStep,
  ProjectFilterItem,
  TechGroup,
  WorkCtaContent,
  WorkHeroContent,
  WorkProject,
} from '@/types/projects';
import { SITE } from '@/lib/constants';
import { buildCanonicalUrl } from '@/utils/seo';
import { siteConfig } from '@/data/site';

export const workPageSeo = {
  title: 'Software Development Projects & AI Case Studies',
  description:
    'Explore EatCodeSleep projects including AI applications, SaaS platforms, mobile apps, automation systems, and custom software solutions.',
  canonical: buildCanonicalUrl('/work'),
  keywords: [
    'Software development projects',
    'AI development case studies',
    'SaaS development portfolio',
    'Custom software examples',
    'EatCodeSleep',
  ],
} as const;

export const workPageJsonLd = {
  type: 'CollectionPage',
  data: {
    name: 'EatCodeSleep Software Development Projects & AI Case Studies',
    description: workPageSeo.description,
    url: workPageSeo.canonical,
    isPartOf: {
      '@type': 'WebSite',
      name: SITE.name,
      url: SITE.url,
    },
    about: {
      '@type': 'ItemList',
      name: 'Case study portfolio',
      itemListElement: [
        {
          '@type': 'CreativeWork',
          position: 1,
          name: 'Stax Fun',
          description:
            'An AI-driven, Scratch-inspired platform for building interactive games with a visual block editor and AI copilot.',
        },
        {
          '@type': 'CreativeWork',
          position: 2,
          name: 'Qreates',
          description:
            'An AI platform that generates studio-quality product photography without traditional photoshoots.',
        },
        {
          '@type': 'CreativeWork',
          position: 3,
          name: 'Croptalk',
          description:
            'An AI chatbot for plant and crop guidance with chat history, feedback loops, and subscription trials.',
        },
        {
          '@type': 'CreativeWork',
          position: 4,
          name: 'Gradcut',
          description:
            'A microservices graduation livestream platform that cuts and delivers ceremony clips with FFmpeg.',
        },
      ],
    },
  },
};

export const workHero: WorkHeroContent = {
  headingLines: ['Building digital products', 'that solve real problems.'],
  description:
    'Explore software platforms, AI solutions, mobile applications, and automation systems built by EatCodeSleep.',
  primaryCta: { label: 'View Projects', href: '#featured-projects' },
  secondaryCta: { label: 'Start Your Project', href: '/contact/' },
};

export const projects: WorkProject[] = [
  {
    id: 'stax-fun',
    title: 'Stax Fun',
    category: 'AI EdTech',
    description:
      'An AI-driven, Scratch-inspired platform that makes game development accessible through a visual block editor, AI copilot, and shareable projects.',
    technologies: ['React', 'Flask', 'PostgreSQL', 'Nginx', 'Stripe', 'AWS'],
    outcomes: [
      { label: 'Visual block-based game editor' },
      { label: 'AI copilot for block suggestions and debugging' },
      { label: 'Publish and remix community projects' },
    ],
    filters: ['ai', 'web-apps', 'saas'],
    visual: 'ai-workflow',
    featured: true,
    href: 'https://stax.fun/',
    imageAlt: 'Stylized mockup of the Stax Fun visual game editor with AI-assisted block programming',
  },
  {
    id: 'qreates',
    title: 'Qreates',
    category: 'AI Product Photography',
    description:
      'An AI platform that creates studio-quality product photos without traditional photoshoots, helping brands ship channel-ready visuals faster.',
    technologies: ['Next.js', 'Clerk', 'PostgreSQL', 'Amazon SST', 'Drizzle ORM'],
    outcomes: [
      { label: 'AI product image generation from uploads' },
      { label: 'Reference styling and prompt controls' },
      { label: 'Upscale and download for commerce channels' },
    ],
    filters: ['ai', 'web-apps', 'saas'],
    visual: 'ai-workflow',
    featured: true,
    href: 'https://qreates.com/',
    imageAlt: 'Stylized mockup of Qreates generating AI studio product photography',
  },
  {
    id: 'croptalk',
    title: 'Croptalk',
    category: 'AI Agriculture',
    description:
      'An AI chatbot focused on plant and crop guidance, delivering recommendations from crop context with chat history and feedback loops.',
    technologies: ['Next.js', 'Clerk', 'DynamoDB', 'FastAPI', 'OpenAI', 'LangChain', 'Stripe'],
    outcomes: [
      { label: 'Clerk-authenticated AI chat access' },
      { label: 'Persisted chat history in DynamoDB' },
      { label: 'Stripe trial flow for subscription access' },
    ],
    filters: ['ai', 'web-apps', 'saas'],
    visual: 'ai-workflow',
    featured: true,
    href: 'https://croptalk.ai/',
    imageAlt: 'Stylized mockup of Croptalk AI crop advisory chat interface',
  },
  {
    id: 'gradcut',
    title: 'Gradcut',
    category: 'Live Streaming',
    description:
      'A microservices graduation livestream platform that cuts ceremony footage into student clips using FFmpeg pipelines on Kubernetes.',
    technologies: ['Python', 'React', 'Next.js', 'Kubernetes', 'Docker', 'FFmpeg', 'PostgreSQL', 'Cognito'],
    outcomes: [
      { label: 'Live graduation stream cutting' },
      { label: 'Kubernetes microservices architecture' },
      { label: 'Automated FFmpeg clip delivery' },
    ],
    filters: ['web-apps', 'enterprise', 'automation'],
    visual: 'analytics',
    featured: true,
    href: 'https://www.gradcut.com/',
    imageAlt: 'Stylized mockup of Gradcut livestream cutting and clip delivery dashboard',
  },
  {
    id: 'ms-medi',
    title: 'MS Medi',
    category: 'Healthcare SaaS',
    description:
      'A medical point-of-sale system for pharmacies that manages sales, purchases, inventory, permissions, and accounting in real time.',
    technologies: ['Node.js', 'Express', 'React', 'MongoDB', 'Nginx', 'Cron'],
    outcomes: [
      { label: 'POS sales with live inventory updates' },
      { label: 'Role-based admin and staff permissions' },
      { label: 'Financial reporting and stock monitoring' },
    ],
    filters: ['saas', 'web-apps', 'enterprise'],
    visual: 'healthcare',
    featured: false,
    href: 'https://msmedi-v1.mssalepoint.com/',
    imageAlt: 'Stylized mockup of MS Medi pharmacy POS dashboard and inventory panels',
  },
  {
    id: 'sullymac',
    title: 'SullyMac SysMon',
    category: 'Network Security',
    description:
      'A web platform for deploying and managing Sysmon configurations across Windows environments to improve system event visibility.',
    technologies: ['Django', 'React', 'PostgreSQL', 'Python', 'MySQL'],
    outcomes: [
      { label: 'Centralized Sysmon configuration management' },
      { label: 'Deploy monitoring rules to Windows fleets' },
      { label: 'Analyze process and network activity logs' },
    ],
    filters: ['web-apps', 'enterprise'],
    visual: 'analytics',
    featured: false,
    href: 'https://sysmon.sullymac.com/login',
    imageAlt: 'Stylized mockup of SullyMac SysMon configuration and monitoring console',
  },
  {
    id: 'moms',
    title: 'MOMS',
    category: 'Security Operations',
    description:
      'A SecureResi operations module that unifies monitoring, incident handling, and analytics across connected security systems.',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Bull Queue'],
    outcomes: [
      { label: 'Real-time security operations dashboard' },
      { label: 'Incident monitoring and response workflows' },
      { label: 'Integrated reporting across security modules' },
    ],
    filters: ['web-apps', 'enterprise', 'saas'],
    visual: 'analytics',
    featured: false,
    href: 'https://moms.secureresi.com/',
    imageAlt: 'Stylized mockup of MOMS security operations monitoring dashboard',
  },
  {
    id: 'happy-hour-hound',
    title: 'Happy Hour Hound',
    category: 'Local Discovery',
    description:
      'A MERN scraping platform that finds local restaurant happy-hour deals, structures offer data, and maps results with location filters.',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'AWS Serverless'],
    outcomes: [
      { label: 'CSV-driven restaurant URL ingestion' },
      { label: 'Periodic scraping for offer freshness' },
      { label: 'Map and list discovery with location filters' },
    ],
    filters: ['web-apps', 'automation', 'saas'],
    visual: 'analytics',
    featured: false,
    href: '/contact/?project=happy-hour-hound',
    imageAlt: 'Stylized mockup of Happy Hour Hound map and offer discovery interface',
  },
  {
    id: 'cropgard',
    title: 'Cropgard',
    category: 'AgriTech SaaS',
    description:
      'A crop and plant management dashboard that organizes crop data and analysis to help reduce farmer risk.',
    technologies: ['Next.js', 'Clerk', 'PostgreSQL', 'Django'],
    outcomes: [
      { label: 'Centralized crop data management' },
      { label: 'Analysis workflows for risk reduction' },
    ],
    filters: ['web-apps', 'saas', 'enterprise'],
    visual: 'analytics',
    featured: false,
    href: 'https://www.cropguard.ai/',
    imageAlt: 'Stylized mockup of Cropgard crop management and analytics dashboard',
  },
  {
    id: 'eos',
    title: 'Edit On The Spot',
    category: 'Live Streaming',
    description:
      'A live streaming and clip-cutting platform on AWS that adds AI transcription for live and edited graduation videos.',
    technologies: ['React', 'TypeScript', 'Auth0', 'AWS IVS', 'ECS', 'S3', 'Lambda', 'SQS', 'Pulumi'],
    outcomes: [
      { label: 'AWS-native live stream processing' },
      { label: 'AI transcription for live and cut clips' },
      { label: 'Event-driven clip pipeline with SQS and Lambda' },
    ],
    filters: ['ai', 'web-apps', 'enterprise', 'automation'],
    visual: 'ai-workflow',
    featured: false,
    href: 'https://www.editonthespot.com/',
    imageAlt: 'Stylized mockup of Edit On The Spot livestream editing and transcription tools',
  },
  {
    id: 'tamtracker',
    title: 'TamTracker',
    category: 'Operations Platform',
    description:
      'A serverless tracking platform built with Next.js and AWS primitives for operational event processing and persistence.',
    technologies: ['Next.js', 'SST', 'SQS', 'Lambda', 'PostgreSQL'],
    outcomes: [
      { label: 'Event-driven processing with SQS and Lambda' },
      { label: 'PostgreSQL-backed tracking records' },
    ],
    filters: ['web-apps', 'saas', 'enterprise'],
    visual: 'analytics',
    featured: false,
    href: 'https://tamtracker.io/',
    imageAlt: 'Stylized mockup of TamTracker operations tracking dashboard',
  },
  {
    id: 'patrol-6',
    title: 'Patrol 6',
    category: 'Operations Platform',
    description:
      'An operations web application for patrol workflows built with Next.js, tRPC, and background job triggers.',
    technologies: ['Next.js', 'Trigger.dev', 'tRPC', 'PostgreSQL'],
    outcomes: [
      { label: 'Type-safe API workflows with tRPC' },
      { label: 'Background jobs for patrol operations' },
    ],
    filters: ['web-apps', 'saas', 'enterprise'],
    visual: 'analytics',
    featured: false,
    href: 'https://patrol6.app/',
    imageAlt: 'Stylized mockup of Patrol 6 operations workflow interface',
  },
  {
    id: 'project-ronny',
    title: 'Project Ronny',
    category: 'E-commerce Operations',
    description:
      'A unified Amazon and Walmart store management platform so teams can operate multiple marketplaces from one place.',
    technologies: ['MongoDB', 'Express', 'React', 'Node.js', 'Cron'],
    outcomes: [
      { label: 'Multi-store marketplace operations' },
      { label: 'Scheduled jobs for sync and automation' },
    ],
    filters: ['web-apps', 'saas', 'automation', 'enterprise'],
    visual: 'analytics',
    featured: false,
    href: '/contact/?project=project-ronny',
    imageAlt: 'Stylized mockup of a multi-store Amazon and Walmart operations dashboard',
  },
  {
    id: '3pl-terminal',
    title: '3PL Terminal',
    category: 'Warehouse SaaS',
    description:
      'A product platform for ecommerce warehouse and store operations with API docs, automation jobs, and test coverage.',
    technologies: ['MongoDB', 'Express', 'React', 'Node.js', 'Cron', 'Swagger'],
    outcomes: [
      { label: 'Warehouse and store operations tooling' },
      { label: 'Documented APIs with Swagger' },
      { label: 'Automated cron-based workflows' },
    ],
    filters: ['web-apps', 'saas', 'enterprise', 'automation'],
    visual: 'analytics',
    featured: false,
    href: '/contact/?project=3pl-terminal',
    imageAlt: 'Stylized mockup of 3PL Terminal warehouse management interface',
  },
  {
    id: 'prepare4u',
    title: 'Prepare4u',
    category: 'E-commerce Operations',
    description:
      'A rebuilt Amazon store management frontend with a modern React experience and PostgreSQL-backed services.',
    technologies: ['React', 'PostgreSQL', 'Python', 'Flask'],
    outcomes: [
      { label: 'Modern React frontend for store ops' },
      { label: 'PostgreSQL-backed backend services' },
    ],
    filters: ['web-apps', 'saas'],
    visual: 'analytics',
    featured: false,
    href: '/contact/?project=prepare4u',
    imageAlt: 'Stylized mockup of Prepare4u Amazon store management interface',
  },
  {
    id: 'performance-management-system',
    title: 'Performance Management System',
    category: 'Enterprise SaaS',
    description:
      'A goals and task tracking dashboard for company performance management with a serverless Node.js backend.',
    technologies: ['React', 'Node.js', 'AWS Serverless', 'MySQL', 'Amplify'],
    outcomes: [
      { label: 'Goal and task performance tracking' },
      { label: 'Serverless Node.js API layer' },
    ],
    filters: ['web-apps', 'saas', 'enterprise'],
    visual: 'analytics',
    featured: false,
    href: '/contact/?project=performance-management-system',
    imageAlt: 'Stylized mockup of a performance management goals and tasks dashboard',
  },
  {
    id: 'le-gourmet',
    title: 'Le Gourmet',
    category: 'Restaurant Platform',
    description:
      'A full restaurant management system with customer, manager, cashier, chef, restaurant, and admin roles plus realtime notifications.',
    technologies: ['React', 'React Native', 'Node.js', 'AWS Serverless', 'WebSockets'],
    outcomes: [
      { label: 'Multi-role restaurant operations' },
      { label: 'Realtime notifications over sockets' },
      { label: 'Web and mobile client coverage' },
    ],
    filters: ['web-apps', 'mobile', 'saas'],
    visual: 'mobile-learning',
    featured: false,
    href: '/contact/?project=le-gourmet',
    imageAlt: 'Stylized mockup of Le Gourmet restaurant management web and mobile apps',
  },
  {
    id: 'junity',
    title: 'Junity LMS',
    category: 'Learning Platform',
    description:
      'A learning management system with Youth, Resources, Counselors, and Admin modules spanning web and mobile PWA experiences.',
    technologies: ['React', 'AWS Amplify', 'GraphQL', 'DynamoDB'],
    outcomes: [
      { label: 'Four connected LMS modules' },
      { label: 'GraphQL API with DynamoDB' },
      { label: 'PWA delivery for mobile learners' },
    ],
    filters: ['web-apps', 'mobile', 'saas', 'enterprise'],
    visual: 'mobile-learning',
    featured: false,
    href: 'https://www.youth.joinjunity.com/',
    imageAlt: 'Stylized mockup of Junity LMS youth and counselor learning modules',
  },
  {
    id: 'cogen',
    title: 'Cogen',
    category: 'Recruitment Platform',
    description:
      'A recruitment web and mobile product supporting company, recruiter, and candidate flows across shared hiring workflows.',
    technologies: ['React', 'React Native'],
    outcomes: [
      { label: 'Company, recruiter, and candidate roles' },
      { label: 'Shared web and mobile experience' },
    ],
    filters: ['web-apps', 'mobile', 'saas'],
    visual: 'mobile-learning',
    featured: false,
    href: '/contact/?project=cogen',
    imageAlt: 'Stylized mockup of Cogen recruitment web and mobile interfaces',
  },
  {
    id: 'rental-booth',
    title: 'Rental Booth',
    category: 'Marketplace SaaS',
    description:
      'A salon seat rental dashboard where operators list booth inventory and customers book rentals with Stripe payments.',
    technologies: ['MongoDB', 'Express', 'React', 'Node.js', 'Stripe'],
    outcomes: [
      { label: 'Salon booth inventory and bookings' },
      { label: 'Stripe payment checkout' },
    ],
    filters: ['web-apps', 'saas'],
    visual: 'analytics',
    featured: false,
    href: '/contact/?project=rental-booth',
    imageAlt: 'Stylized mockup of Rental Booth salon seating rental dashboard',
  },
  {
    id: 'survey-application',
    title: 'Survey Application',
    category: 'Web Application',
    description:
      'A React survey builder that lets users create surveys, share them, and collect response statistics.',
    technologies: ['React'],
    outcomes: [
      { label: 'Create and share surveys' },
      { label: 'Collect and review response stats' },
    ],
    filters: ['web-apps'],
    visual: 'analytics',
    featured: false,
    href: '/contact/?project=survey-application',
    imageAlt: 'Stylized mockup of a survey builder and statistics dashboard',
  },
  {
    id: 'chughtai-labs',
    title: 'Chughtai Labs',
    category: 'Healthcare Mobile',
    description:
      'Pakistan\'s largest diagnostic lab network app with real-time lab reports and home sampling across 350+ centers.',
    technologies: ['React Native', 'iOS', 'Android'],
    outcomes: [
      { label: 'Nationwide diagnostics network support' },
      { label: 'Realtime lab report access' },
      { label: 'Home sampling workflows' },
    ],
    filters: ['mobile', 'saas', 'enterprise'],
    visual: 'healthcare',
    featured: false,
    href: 'https://apps.apple.com/pk/app/chughtailab/id931352435',
    imageAlt: 'Stylized mockup of the Chughtai Labs mobile diagnostics experience',
  },
  {
    id: 'nuriq',
    title: 'NuriQ',
    category: 'AI Healthcare',
    description:
      'An AI healthcare companion that records medical visits, generates smart summaries, and supports family sharing.',
    technologies: ['React Native', 'iOS', 'Android', 'AI'],
    outcomes: [
      { label: 'Visit recording and smart summaries' },
      { label: 'Family sharing of medical context' },
    ],
    filters: ['ai', 'mobile', 'saas'],
    visual: 'healthcare',
    featured: false,
    href: 'https://apps.apple.com/us/app/nuriq/id6743381914',
    imageAlt: 'Stylized mockup of NuriQ AI medical visit companion app',
  },
  {
    id: 'wellmeai',
    title: 'WellmeAI',
    category: 'AI Mental Health',
    description:
      'An AI mental wellness coach with empathetic chat and voice support, guided journaling, mood tracking, and subscriptions.',
    technologies: ['React Native', 'iOS', 'Android', 'AI'],
    outcomes: [
      { label: 'AI coaching over voice and chat' },
      { label: 'Mood tracking and journaling analytics' },
      { label: 'Multi-tier subscription model' },
    ],
    filters: ['ai', 'mobile', 'saas'],
    visual: 'healthcare',
    featured: false,
    href: 'https://apps.apple.com/pk/app/wellmeai/id6741913983',
    imageAlt: 'Stylized mockup of WellmeAI mental wellness coaching app',
  },
  {
    id: 'leafem',
    title: 'Leafem',
    category: 'Marketplace Mobile',
    description:
      'A US-market plant parent and plant sitter marketplace app for connecting plant care seekers and providers.',
    technologies: ['React Native', 'iOS', 'Android'],
    outcomes: [
      { label: 'Plant parent and sitter matching' },
      { label: 'Cross-platform store presence' },
    ],
    filters: ['mobile', 'saas'],
    visual: 'mobile-learning',
    featured: false,
    href: 'https://apps.apple.com/pk/app/leafem/id6465991609',
    imageAlt: 'Stylized mockup of Leafem plant care marketplace app screens',
  },
  {
    id: 'capstone-builder',
    title: 'Capstone I Am Builder',
    category: 'Construction SaaS',
    description:
      'A paid builder onboarding and lead-management app for listing projects and converting inbound construction leads.',
    technologies: ['React Native'],
    outcomes: [
      { label: 'Builder onboarding and project listing' },
      { label: 'Lead-to-project conversion workflows' },
    ],
    filters: ['mobile', 'saas', 'enterprise'],
    visual: 'mobile-learning',
    featured: false,
    href: '/contact/?project=capstone-builder',
    imageAlt: 'Stylized mockup of Capstone builder onboarding and project management app',
  },
  {
    id: 'xprintx',
    title: 'XprintX',
    category: 'Hardware Support',
    description:
      'A service app for printer purchasers covering setup support, product services, and after-sales tooling.',
    technologies: ['React Native', 'iOS'],
    outcomes: [{ label: 'Printer owner service workflows' }],
    filters: ['mobile'],
    visual: 'mobile-learning',
    featured: false,
    href: 'https://apps.apple.com/pk/app/xprintx/id6477220593',
    imageAlt: 'Stylized mockup of XprintX printer services mobile application',
  },
  {
    id: 'spot-social',
    title: 'Spot Social',
    category: 'Social & Events',
    description:
      'A US community social and events booking app for discovering gatherings and managing event attendance.',
    technologies: ['React Native', 'iOS'],
    outcomes: [
      { label: 'Community gathering discovery' },
      { label: 'Event booking flows' },
    ],
    filters: ['mobile', 'saas'],
    visual: 'mobile-learning',
    featured: false,
    href: 'https://apps.apple.com/pk/app/spot-social/id6477300134',
    imageAlt: 'Stylized mockup of Spot Social community events booking app',
  },
  {
    id: 'shopzone',
    title: 'Shopzone',
    category: 'E-commerce Mobile',
    description:
      'An ecommerce storefront app where shoppers buy products and earn loyalty points across mobile commerce flows.',
    technologies: ['React Native', 'Android'],
    outcomes: [
      { label: 'Mobile product shopping experience' },
      { label: 'Points and rewards for purchases' },
    ],
    filters: ['mobile', 'saas'],
    visual: 'mobile-learning',
    featured: false,
    href: 'https://play.google.com/store/search?q=shopzone+app&c=apps&hl=en',
    imageAlt: 'Stylized mockup of Shopzone ecommerce and rewards mobile app',
  },
  {
    id: 'lilli-health',
    title: 'Lilli Health',
    category: 'Health Tracking',
    description:
      'A health tracking application for measuring blood markers, weight, skin issues, and generating diet plans.',
    technologies: ['React Native'],
    outcomes: [
      { label: 'Health marker and lifestyle tracking' },
      { label: 'Diet plan generation workflows' },
    ],
    filters: ['mobile', 'saas'],
    visual: 'healthcare',
    featured: false,
    href: '/contact/?project=lilli-health',
    imageAlt: 'Stylized mockup of Lilli Health tracking and diet planning screens',
  },
  {
    id: 'heraf-lms',
    title: 'Heraf LMS',
    category: 'Learning Platform',
    description:
      'A React Native learning management application for delivering educational content and learner workflows on mobile.',
    technologies: ['React Native'],
    outcomes: [{ label: 'Mobile LMS learning workflows' }],
    filters: ['mobile', 'saas'],
    visual: 'mobile-learning',
    featured: false,
    href: '/contact/?project=heraf-lms',
    imageAlt: 'Stylized mockup of Heraf mobile learning management screens',
  },
  {
    id: 'gelameat',
    title: 'Gelameat',
    category: 'E-commerce Mobile',
    description:
      'A React Native meat marketplace app supporting product browsing and purchase flows for specialty food retail.',
    technologies: ['React Native'],
    outcomes: [{ label: 'Mobile specialty food shopping' }],
    filters: ['mobile', 'saas'],
    visual: 'mobile-learning',
    featured: false,
    href: '/contact/?project=gelameat',
    imageAlt: 'Stylized mockup of Gelameat meat marketplace mobile app',
  },
  {
    id: 'nikkah',
    title: 'Nikkah',
    category: 'Matrimonial Mobile',
    description:
      'A React Native matrimonial matching application for profile discovery and connection workflows.',
    technologies: ['React Native'],
    outcomes: [{ label: 'Profile matching and discovery' }],
    filters: ['mobile', 'saas'],
    visual: 'mobile-learning',
    featured: false,
    href: '/contact/?project=nikkah',
    imageAlt: 'Stylized mockup of Nikkah matrimonial matching mobile app',
  },
  {
    id: 'emenew-rider',
    title: 'Emenew Rider',
    category: 'Delivery Mobile',
    description:
      'A multi-vendor ecommerce and restaurant rider app for order delivery routing, status updates, and field operations.',
    technologies: ['React Native', 'Android', 'iOS'],
    outcomes: [
      { label: 'Multi-vendor delivery assignment' },
      { label: 'Rider order status workflows' },
    ],
    filters: ['mobile', 'saas'],
    visual: 'mobile-learning',
    featured: false,
    href: 'https://play.google.com/store/apps/details?id=com.emenewrider',
    imageAlt: 'Stylized mockup of Emenew Rider delivery operations app',
  },
  {
    id: 'dailymart',
    title: 'Dailymart',
    category: 'Grocery Commerce',
    description:
      'A grocery commerce suite covering user, restaurant, and rider experiences with Firebase-backed data integration.',
    technologies: ['Android', 'Firebase'],
    outcomes: [
      { label: 'User, restaurant, and rider roles' },
      { label: 'Firebase-backed data sync' },
    ],
    filters: ['mobile', 'saas'],
    visual: 'mobile-learning',
    featured: false,
    href: 'https://play.google.com/store/apps/details?id=com.ujudebug.dailymart&hl=en',
    imageAlt: 'Stylized mockup of Dailymart grocery commerce mobile flows',
  },
  {
    id: 'kid-learning-app',
    title: 'Kid Learning App',
    category: 'EdTech Mobile',
    description:
      'A children’s learning Android application delivering interactive educational content for early learners.',
    technologies: ['Android'],
    outcomes: [{ label: 'Interactive early-learning experiences' }],
    filters: ['mobile'],
    visual: 'mobile-learning',
    featured: false,
    href: 'https://play.google.com/store/apps/details?id=com.elearning.yoga.e_learningapp',
    imageAlt: 'Stylized mockup of a kid-focused mobile learning application',
  },
  {
    id: 'interval-trainer',
    title: 'Interval Trainer',
    category: 'Fitness Mobile',
    description:
      'A training app for interval workouts and progress tracking across guided fitness sessions.',
    technologies: ['Android'],
    outcomes: [{ label: 'Guided interval training sessions' }],
    filters: ['mobile'],
    visual: 'mobile-learning',
    featured: false,
    href: 'https://play.google.com/store/apps/details?id=be.webelite.intervaltrainer&hl=en',
    imageAlt: 'Stylized mockup of Interval Trainer workout tracking screens',
  },
  {
    id: 'restaurant-pos-pwa',
    title: 'Restaurant POS PWA',
    category: 'Restaurant Operations',
    description:
      'A progressive web POS for user, waiter, cashier, and admin roles with an AWS Lambda Node.js and MySQL backend.',
    technologies: ['React', 'PWA', 'AWS Lambda', 'Node.js', 'MySQL'],
    outcomes: [
      { label: 'Multi-role restaurant POS flows' },
      { label: 'Serverless Node.js backend on Lambda' },
    ],
    filters: ['web-apps', 'mobile', 'saas', 'enterprise'],
    visual: 'analytics',
    featured: false,
    href: '/contact/?project=restaurant-pos-pwa',
    imageAlt: 'Stylized mockup of a restaurant POS progressive web application',
  },
];

export const featuredProjects = projects.filter((project) => project.featured);

export const projectFilters: ProjectFilterItem[] = [
  { id: 'all', label: 'All' },
  { id: 'ai', label: 'AI' },
  { id: 'web-apps', label: 'Web Apps' },
  { id: 'mobile', label: 'Mobile' },
  { id: 'automation', label: 'Automation' },
  { id: 'saas', label: 'SaaS' },
  { id: 'enterprise', label: 'Enterprise' },
];

export const caseStudySteps: CaseStudyStep[] = [
  {
    id: 'challenge',
    title: 'Challenge',
    description: 'We define the business problem, constraints, and success metrics.',
  },
  {
    id: 'solution',
    title: 'Solution',
    description: 'We design an architecture and product approach tailored to the outcome.',
  },
  {
    id: 'technology',
    title: 'Technology',
    description: 'We select a stack that balances speed, reliability, and long-term maintainability.',
  },
  {
    id: 'impact',
    title: 'Impact',
    description: 'We measure results in efficiency, scalability, and business value delivered.',
  },
];

export const workTechGroups: TechGroup[] = [
  {
    id: 'frontend',
    title: 'Frontend',
    items: ['React', 'Next.js', 'Astro', 'TypeScript', 'Tailwind CSS'],
  },
  {
    id: 'backend',
    title: 'Backend',
    items: ['Node.js', 'NestJS', 'Python', 'FastAPI'],
  },
  {
    id: 'ai',
    title: 'AI',
    items: ['OpenAI', 'Claude', 'LangChain', 'Vector DBs'],
  },
  {
    id: 'cloud',
    title: 'Cloud',
    items: ['AWS', 'Docker', 'Kubernetes', 'GitHub Actions'],
  },
  {
    id: 'database',
    title: 'Database',
    items: ['PostgreSQL', 'Redis', 'Firebase', 'Supabase'],
  },
  {
    id: 'automation',
    title: 'Automation',
    items: ['n8n', 'Zapier', 'Make', 'Webhooks'],
  },
];

export const workTechMarquee = [
  'React',
  'Node.js',
  'OpenAI',
  'PostgreSQL',
  'AWS',
  'React Native',
  'Python',
  'Docker',
  'Next.js',
  'Firebase',
] as const;

export const workCta: WorkCtaContent = {
  headingLines: ['Have a project like this?', "Let's build it together."],
  description:
    'Share your goals and we will recommend the right product approach, architecture, and delivery plan.',
  primaryCta: { label: 'Discuss Your Project', href: '/contact/' },
  secondaryCta: { label: 'Book a Call', href: siteConfig.bookingUrl },
};
