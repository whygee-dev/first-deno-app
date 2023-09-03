import useAsset from "ultra/hooks/use-asset.js";
import PokemonList from "./components/PokemonList.tsx";
import { tw } from "./twind/twind.ts";

export default function App() {
  return (
    <html lang="en" className={tw`p-0`}>
      <head>
        <meta charSet="utf-8" />
        <title>Pokémon</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="shortcut icon" href={useAsset("/favicon.ico")} />
        <link rel="stylesheet" href={useAsset("/style.css")} />
      </head>
      <body className={tw`p-0`}>
        <main>
          <PokemonList />
        </main>
      </body>
    </html>
  );
}
