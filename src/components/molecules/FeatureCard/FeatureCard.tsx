import React from 'react';
import type { TFeatureCard } from './FeatureCard.types';

export const FeatureCard: TFeatureCard = ({
  icon: Icon,
  title,
  description,
}) => {
  return (
    <div className="p-6 rounded-lg border border-border bg-card/50 hover:bg-card/80 transition-colors">
      <Icon className="h-10 w-10 text-primary mb-4" />
      <h3 className="text-xl font-semibold text-foreground mb-3">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};
