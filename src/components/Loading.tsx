import useAsset from "ultra/hooks/use-asset.js";

type Props = {
  width?: number;
};

export default function Loading({ width }: Props) {
  return <img src={useAsset("/loading.gif")} style={{ width: width ?? 475 }} alt="loading" />;
}
