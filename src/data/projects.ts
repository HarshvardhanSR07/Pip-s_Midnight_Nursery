export interface ProjectItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  tags: string[];
  status: 'active' | 'archived' | 'prototype';
  icon: string;
}

export const projects: ProjectItem[] = [
  {
    id: 'lullaby-lab',
    title: 'Lullaby Lab',
    tagline: 'Procedural sleep audio & frequency synthesizer',
    description: 'An interactive soundscape generator tuned to delta and theta brainwaves with gentle chimes and midnight rain.',
    tags: ['Web Audio API', 'React', 'Generative'],
    status: 'active',
    icon: '🎵'
  },
  {
    id: 'nightlight-collection',
    title: 'Nightlight Collection',
    tagline: 'Ambient illumination shaders',
    description: 'A curated gallery of gentle WebGL nightlight shaders providing soft bedroom ambiance without blue light.',
    tags: ['Three.js', 'GLSL', 'Color Science'],
    status: 'active',
    icon: '✨'
  },
  {
    id: 'dream-delivery-routes',
    title: 'Dream Delivery Routes',
    tagline: 'Starlight pathfinding & logistics map',
    description: 'Visualizing optimal wind currents and rooftop landing pads for nightly dream parcel distribution.',
    tags: ['Canvas', 'Pathfinding', 'Visualization'],
    status: 'prototype',
    icon: '🗺️'
  }
];
