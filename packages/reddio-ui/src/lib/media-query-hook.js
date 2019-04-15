import { useMedia } from "use-media";

function useMediaQuery() {
  const large = useMedia({ minWidth: 1000 });
  const medium = useMedia({ minWidth: 600 });
  const small = useMedia({ minWidth: 400 });
  return { large, medium, small };
}

export default useMediaQuery;
