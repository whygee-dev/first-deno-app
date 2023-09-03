export type Pokemon = {
  url: string;
  name: string;
};

export type PokemonListItem = {
  url: string;
  name: string;
};

export type PokemonList = {
  next: string;
  results: PokemonListItem[];
};

export interface Resource<Payload> {
  read: () => Payload;
}

export type status = "pending" | "success" | "error";

export function createResource<Payload>(asyncFn: () => Promise<Payload>): Resource<Payload> {
  let status: status = "pending";
  // deno-lint-ignore no-explicit-any
  let result: any;

  const promise = asyncFn().then(
    (r: Payload) => {
      status = "success";
      result = r;
    },
    (e: Error) => {
      status = "error";
      result = e;
    }
  );

  return {
    read(): Payload {
      switch (status) {
        case "pending":
          throw promise;
        case "error":
          throw result;
        case "success":
          return result;
      }
    },
  };
}
