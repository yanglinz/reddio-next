import { useRouter } from "next/router";

function ResolverRoute() {
  const router = useRouter();
  return <div>Hello {router.asPath}!</div>;
}

export default ResolverRoute;
