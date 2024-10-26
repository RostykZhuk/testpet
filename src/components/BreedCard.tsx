import { BreedProps } from "@/utils/types";

  const BreedCard: React.FC<{ breed: BreedProps }> = ({ breed }) => {
    return (
      <div className="card">
        <img src={breed.image?.url} alt={breed.name} className="w-full h-48 object-cover" />
        <div className="p-4">
          <h2 className="text-lg font-semibold">{breed.name}</h2>
        </div>
      </div>
    );
  };
  
  export default BreedCard;