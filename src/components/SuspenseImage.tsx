import { loadImage } from "../utils.ts";

export default function SuspenseImage(props: React.ImgHTMLAttributes<HTMLImageElement> & { src: string }): JSX.Element {
  loadImage(props.src).read();

  return <img {...props} />;
}
