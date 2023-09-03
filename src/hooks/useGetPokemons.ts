import { useDeferredValue } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { PokemonList, PokemonListItem } from "../types.ts";

const defaultURL = "https://pokeapi.co/api/v2/pokemon?limit=10&offset=0";

const getPokemons = async (url: string): Promise<PokemonList> => (await fetch(url)).json();

export const useGetPokemons = (): {
  data: PokemonListItem[];
  fetchNextPage: () => Promise<void>;
} => {
  const { data, fetchNextPage } = useInfiniteQuery(["pokemons"], ({ pageParam = defaultURL }) => getPokemons(pageParam), {
    getNextPageParam: (lastPage: PokemonList) => lastPage.next,
  });

  return {
    data: data ? useDeferredValue(data).pages.flatMap((page: PokemonList) => page.results) : [],
    fetchNextPage,
  };
};
