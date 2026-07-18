export type ValueIconName =
  | 'rocket'
  | 'shield-check'
  | 'cpu'
  | 'git-branch'
  | 'handshake'
  | 'sparkles';

export interface ValueCardItem {
  id: string;
  title: string;
  description: string;
  icon: ValueIconName;
}

export type ComparisonTone = 'negative' | 'positive';

export interface ComparisonItem {
  label: string;
}

export interface ComparisonColumn {
  id: string;
  title: string;
  tone: ComparisonTone;
  items: ComparisonItem[];
}

export interface WhyChooseMetric {
  id: string;
  label: string;
  /** Numeric value for animated counters. Omit for static display. */
  value?: number;
  prefix?: string;
  suffix?: string;
  /** Static display when counting is not appropriate (e.g. "Always"). */
  display?: string;
}
