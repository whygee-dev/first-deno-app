// deno-lint-ignore-file
import { Resource, createResource } from "./types.ts";

export const throttle = <F extends (...args: any[]) => any>(func: F, waitFor: number) => {
  const now = () => new Date().getTime();
  const resetStartTime = () => (startTime = now());
  let timeout: number;
  let startTime: number = now() - waitFor;

  return (...args: Parameters<F>): Promise<ReturnType<F>> =>
    new Promise((resolve) => {
      const timeLeft = startTime + waitFor - now();
      if (timeout) {
        clearTimeout(timeout);
      }
      if (startTime + waitFor <= now()) {
        resetStartTime();
        resolve(func(...args));
      } else {
        timeout = setTimeout(() => {
          resetStartTime();
          resolve(func(...args));
        }, timeLeft);
      }
    });
};

const cache = new Map<string, any>();

export function loadImage(source: string): Resource<string> {
  let resource = cache.get(source);
  if (resource) return resource;
  resource = createResource<string>(
    () =>
      new Promise((resolve, reject) => {
        if (typeof window === "undefined") return;

        const img = new window.Image();
        img.src = source;
        img.addEventListener("load", () => resolve(source));
        img.addEventListener("error", () => reject(new Error(`Failed to load image ${source}`)));
      })
  );
  cache.set(source, resource);
  return resource;
}
