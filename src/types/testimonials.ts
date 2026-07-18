export interface TrustMetric {
  id: string;
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
}

export interface ClientLogo {
  id: string;
  name: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  project: string;
  quote: string;
  technologies: string[];
  rating: number;
  avatarInitials: string;
  avatarAlt: string;
}

export interface SuccessStory {
  id: string;
  title: string;
  summary: string;
}

export type RecognitionIconName =
  | 'code-xml'
  | 'brain-circuit'
  | 'cloud'
  | 'gauge';

export interface RecognitionBadge {
  id: string;
  title: string;
  description: string;
  icon: RecognitionIconName;
}
