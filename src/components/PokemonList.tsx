import { useGetPokemons } from "../hooks/useGetPokemons.ts";
import { tw } from "../twind/twind.ts";
import List from "./List.tsx";
import Pokemon from "./Pokemon.tsx";

export default function PokemonList() {
  const { data: pokemons, fetchNextPage } = useGetPokemons();

  const className = tw`h-screen flex flex-col justify-items-center items-center  overflow-y-scroll`;

  return (
    <List onReachEnd={fetchNextPage} className={className}>
      <h1 className={tw`text-5xl`}>Pokemons</h1>
      <section>
        {pokemons.map((pokemon) => {
          return <Pokemon key={pokemon.name} pokemon={pokemon} />;
        })}
      </section>
    </List>
  );
}
