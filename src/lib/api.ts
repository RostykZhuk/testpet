const DOG = process.env.NEXT_PUBLIC_DOG_API_URL_BASIC;
const CAT = process.env.NEXT_PUBLIC_CAT_API_URL_BASIC;

export const fetchDogBreeds = async () => {
  const url = `${DOG}/breeds`;
  if (!url) throw new Error("Dog API URL is not defined");

  const response = await fetch(url, {
    headers: {
      "x-api-key": process.env.NEXT_PUBLIC_DOG_API_KEY || "",
    },
  });
  if (!response.ok) throw new Error("Failed to fetch dog breeds");
  return await response.json();
};

export const fetchCatBreeds = async () => {
  const url = `${CAT}/breeds`;
  if (!url) throw new Error("Cat API URL is not defined");

  const response = await fetch(url, {
    headers: {
      "x-api-key": process.env.NEXT_PUBLIC_CAT_API_KEY || "",
    },
  });
  if (!response.ok) throw new Error("Failed to fetch cat breeds");
  return await response.json();
};
export const fetchBreedImages = async (breedId: string, isDog: boolean, limit: number = 20) => {
  const url = isDog
    ? `${DOG}/images/search?breed_ids=${breedId}&limit=${limit}`
    : `${CAT}/images/search?breed_ids=${breedId}&limit=${limit}`;

  const response = await fetch(url, {
    headers: {
      "x-api-key": isDog ? process.env.NEXT_PUBLIC_DOG_API_KEY || "" : process.env.NEXT_PUBLIC_CAT_API_KEY || "",
    },
  });

  if (!response.ok) throw new Error("Failed to fetch breed images");
  return await response.json();
};