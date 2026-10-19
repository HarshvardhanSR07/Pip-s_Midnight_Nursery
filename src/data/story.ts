export interface StoryScene {
  id: string;
  title: string;
  subtitle?: string;
  narrative: string;
  illustrationPlaceholder?: string;
}

export const storyScenes: StoryScene[] = [
  {
    id: 'hero',
    title: "Pip's Midnight Nursery",
    subtitle: 'Where stars are tucked in and dream bubbles take flight',
    narrative: 'High above the sleepy town, Pip tends to the whispering lanterns and drifting dreams of the midnight nursery.'
  },
  {
    id: 'meet-pip',
    title: 'Meet Pip',
    subtitle: 'The Smallest Guardian of Starlight',
    narrative: 'With soft velvet wings and a lantern full of stardust, Pip wakes just when the clock strikes twelve.'
  },
  {
    id: 'spill',
    title: 'The Great Stardust Spill',
    subtitle: 'Oops! A bottle tumbled...',
    narrative: 'A sudden flutter tipped the dream jar! Shimmering orbs scattered across the tiled sill and out into the night.'
  },
  {
    id: 'rooftop-chase',
    title: 'Rooftop Chase',
    subtitle: 'Leaping over chimney tops',
    narrative: 'Pip darted over slate tiles, chasing glowing bubbles as they bounced off sleepy cats and weather vanes.'
  },
  {
    id: 'ghost-window',
    title: 'The Ghost Window',
    subtitle: 'A glowing visitor',
    narrative: 'Behind an attic sash, a friendly shadow waved back, helping guide the wayward dreams.'
  },
  {
    id: 'catch',
    title: 'Catching the Dreams',
    subtitle: 'Safe in the velvet net',
    narrative: 'One by one, the glowing memories were scooped up safely into Pip’s woven net of moonbeams.'
  },
  {
    id: 'sweet-dreams',
    title: 'Sweet Dreams',
    subtitle: 'Returned to slumber',
    narrative: 'Tucked back into their brass cradles, each dream hummed a gentle lullaby.'
  },
  {
    id: 'workshop',
    title: "Pip's Workshop",
    subtitle: 'Creations & Innovations',
    narrative: 'Here are the whimsical contraptions and inventions Pip built to protect the night.'
  }
];
