export type Breed = {
    id: string;
    name: string;
    weight?: { imperial: string; metric: string };
    height?: { imperial: string; metric: string };
    temperament: string;
    origin: string;
    life_span: string;
    description: string;
    image?: { url: string };
    wikipedia_url?: string;
  };
  export type BreedProps = {
    id: string;
    name: string;
    image: { url: string };
  };