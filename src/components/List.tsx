import { throttle } from "../utils.ts";

type Props = {
  children: React.ReactNode;
  onReachEnd?: () => unknown | Promise<unknown>;
  className?: string;
};

export default function List({ children, onReachEnd, className }: Props) {
  const handleScroll = async (e: React.UIEvent<HTMLElement> & { target: HTMLElement }) => {
    const bottom = e.target?.scrollHeight - e.target?.scrollTop <= e.target.clientHeight + 50;

    if (bottom) {
      await onReachEnd?.();
    }
  };

  return (
    <section className={className} onScroll={throttle(handleScroll, 100)}>
      {children}
    </section>
  );
}
