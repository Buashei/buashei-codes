import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export type TFeatureCard = (props: FeatureCardProps) => ReactNode;
