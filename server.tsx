import { serve } from "https://deno.land/std@0.176.0/http/server.ts";
import { type Context, createServer } from "ultra/server.ts";
import App from "./src/app.tsx";

// Twind
import { createHeadInsertionTransformStream } from "ultra/stream.ts";
import { stringify, tw } from "./src/twind/twind.ts";

// Wouter
import { Router } from "wouter";
import staticLocationHook from "wouter/static-location";
import { SearchParamsProvider } from "./src/wouter/index.tsx";

// React Query
import { QueryClientProvider } from "@tanstack/react-query";
import { useDehydrateReactQuery } from "./src/react-query/useDehydrateReactQuery.tsx";
import { queryClient } from "./src/react-query/query-client.ts";

const server = await createServer({
  importMapPath: import.meta.resolve("./importMap.json"),
  browserEntrypoint: import.meta.resolve("./client.tsx"),
});

function ServerApp({ context }: { context: Context }) {
  useDehydrateReactQuery(queryClient);

  const requestUrl = new URL(context.req.url);

  return (
    <QueryClientProvider client={queryClient}>
      <Router hook={staticLocationHook(requestUrl.pathname)}>
        <SearchParamsProvider value={requestUrl.searchParams}>
          <App />
        </SearchParamsProvider>
      </Router>
    </QueryClientProvider>
  );
}

server.get("*", async (context) => {
  queryClient.clear();

  let result = await server.render(<ServerApp context={context} />);

  const stylesInject = createHeadInsertionTransformStream(() => {
    if (Array.isArray(tw.target)) {
      return Promise.resolve(stringify(tw.target));
    }

    throw new Error("Expected tw.target to be an instance of an Array");
  });

  result = result.pipeThrough(stylesInject);

  return context.body(result, 200, {
    "content-type": "text/html; charset=utf-8",
  });
});

if (import.meta.main) {
  serve(server.fetch);
}

export default server;
