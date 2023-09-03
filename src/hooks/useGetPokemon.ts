import { useQuery } from "@tanstack/react-query";

type Pokemon = {
  id: string;
  sprites: {
    other: {
      "official-artwork": {
        front_default: string;
        front_shiny: string;
      };
    };
  };
};

const getPokemon = async (url: string): Promise<Pokemon> => {
  const response = await fetch(url);
  const json = await response.json();

  return json;
};

export const useGetPokemon = (
  url: string
): {
  data: Pokemon;
  isLoading: boolean;
} => {
  const { data, isLoading } = useQuery(["pokemon", url], () => getPokemon(url));

  return {
    data,
    isLoading,
  };
};
