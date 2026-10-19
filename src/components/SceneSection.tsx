import React, { type ReactNode } from 'react';

interface SceneSectionProps {
  id: string;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}

export const SceneSection: React.FC<SceneSectionProps> = ({
  id,
  title,
  subtitle,
  children,
  className = '',
}) => {
  return (
    <section id={id} className={`scene-container ${className}`}>
      <div className="scene-content">
        {title && <h2 className="scene-title">{title}</h2>}
        {subtitle && <p className="scene-description">{subtitle}</p>}
        {children}
      </div>
    </section>
  );
};
