"use client";

import { useEffect, useState } from "react";
import { fetchDogBreeds, fetchCatBreeds } from "../lib/api";
import Link from "next/link";
import BreedCard from "../components/BreedCard";
import { BreedProps } from "@/utils/types";
import { shuffleArray } from "@/utils/shuffle";



export default function HomePage() {
  const [breeds, setBreeds] = useState<BreedProps[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredBreeds, setFilteredBreeds] = useState<BreedProps[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [suggestions, setSuggestions] = useState<BreedProps[]>([]);

  useEffect(() => {
    const loadBreeds = async () => {
      try {
        const [dogs, cats] = await Promise.all([fetchDogBreeds(), fetchCatBreeds()]);
        const combinedBreeds = [...dogs, ...cats];
        const shuffledBreeds = shuffleArray(combinedBreeds);
        setBreeds(shuffledBreeds);
        setFilteredBreeds(shuffledBreeds);
      } catch (error) {
        console.error("Error loading breeds:", error);
      }
    };
    loadBreeds();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    setShowSuggestions(true);

    const filteredSuggestions = breeds.filter((breed) =>
      breed.name.toLowerCase().includes(term)
    );

    setSuggestions(filteredSuggestions);
    setFilteredBreeds(filteredSuggestions);
  };

  const handleSuggestionClick = (breed: BreedProps) => {
    setSearchTerm(breed.name);
    setFilteredBreeds([breed]);
    setShowSuggestions(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Pet Breed Explorer</h1>

      <div className="relative">
        <input
          type="text"
          placeholder="Search breeds..."
          value={searchTerm}
          onChange={handleSearch}
          onFocus={() => setShowSuggestions(true)}
          className="border rounded-lg p-2 w-full mb-4 text-black"
        />

        {showSuggestions && searchTerm && (
          <ul className="absolute bg-white border border-gray-300 rounded-lg w-full max-h-40 overflow-y-auto mt-1 z-10 text-black">
            {suggestions.map((suggestion) => (
              <li
                key={suggestion.id}
                onClick={() => handleSuggestionClick(suggestion)}
                className="p-2 cursor-pointer hover:bg-gray-200"
              >
                {suggestion.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        {filteredBreeds.map((breed) => (
          <Link href={`/breed/${breed.id}`} key={breed.id}>
            <BreedCard breed={breed} />
          </Link>
        ))}
      </div>
    </div>
  );
}