export type ProcessIconName =
  | 'search'
  | 'blocks'
  | 'code-2'
  | 'shield-check'
  | 'trending-up';

export interface ProcessStep {
  id: string;
  number: string;
  title: string;
  description: string;
  icon: ProcessIconName;
}

export interface ProcessHighlight {
  title: string;
  points: readonly string[];
}

export interface ProcessStat {
  id: string;
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
}
