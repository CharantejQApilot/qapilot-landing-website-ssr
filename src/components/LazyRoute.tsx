/**
 * No-op in Next.js SSR build. Code splitting is handled by Next.js automatically.
 */
export default function LazyRoute({ component: Component }: { component: React.ComponentType }) {
  return <Component />;
}
