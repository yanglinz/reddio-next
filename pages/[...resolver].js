import Header from "../src/screens/Header";
import AppWrapper from "../src/screens/AppWrapper";
import ListingResolver from "../src/screens/Listing/Listing";

function ResolverRoute() {
  return (
    <AppWrapper>
      <Header />
      <ListingResolver />
    </AppWrapper>
  );
}

export default ResolverRoute;
