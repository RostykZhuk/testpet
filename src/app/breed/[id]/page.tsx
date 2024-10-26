import { fetchBreedImages, fetchDogBreeds, fetchCatBreeds } from "@/lib/api";
import { Breed } from "@/utils/types";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const dogBreeds = await fetchDogBreeds();
  const catBreeds = await fetchCatBreeds();

  const breedIds = [...dogBreeds, ...catBreeds].map((breed) => ({ id: String(breed.id) }));
  return breedIds;
}

async function BreedPage({ params }: never) {
  const { id } = params;

  if (!id) {
    notFound();
  }

  const isDog = /^\d+$/.test(id);
  const breedData = await (isDog ? fetchDogBreeds() : fetchCatBreeds());
  const breed = breedData.find((b: Breed) => String(b.id) === id);

  if (!breed) {
    notFound();
  }

const images = await fetchBreedImages(id, isDog);

  const breedDetails: { [key: string]: string | undefined } = {
    "Origin": breed.origin,
    "Life Span": breed.life_span,
    "Temperament": breed.temperament,
    "Description": breed.description,
    "Wikipedia": breed.wikipedia_url,
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{breed.name}</h1>
      <img src={breed.image?.url || '/placeholder.jpg'} alt={breed.name} className="w-full h-90 object-cover rounded-lg mb-4" />

      <div className="mb-4">
        {Object.entries(breedDetails).map(([label, value]) => (
          <p key={label}>
            <strong>{label}:</strong>{" "}
            {label === "Wikipedia" && value ? (
              <a href={value} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                {value}
              </a>
            ) : (
              value || "Interesting"
            )}
          </p>
        ))}
      </div>

      <h2 className="text-2xl font-semibold mt-8">Additional Images</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        {images.length > 0 ? (
          images.map((image: { url: string }, index: number) => (
            <img key={index} src={image.url} alt={`${breed.name} ${index + 1}`} className="w-full h-90 object-cover rounded-lg" />
          ))
        ) : (
          <p>No additional images available.</p>
        )}
      </div>
    </div>
  );
}

export default BreedPage;