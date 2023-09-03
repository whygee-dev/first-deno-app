import { Suspense } from "react";
import { useGetPokemon } from "../hooks/useGetPokemon.ts";
import { PokemonListItem } from "../types.ts";
import Loading from "./Loading.tsx";
import SuspenseImage from "./SuspenseImage.tsx";
import { tw } from "../twind/twind.ts";

type Props = {
  pokemon: PokemonListItem;
};

export default function Pokemon({ pokemon }: Props) {
  const { data: pokemonData } = useGetPokemon(pokemon.url);

  return (
    <section className={tw`flex flex-col items-center`}>
      <Suspense fallback={<Loading />}>
        <SuspenseImage src={pokemonData.sprites.other["official-artwork"].front_default} alt={pokemon.name} />
      </Suspense>
      <h2 className={tw`text-xl`}>{pokemon.name}</h2>
    </section>
  );
}
