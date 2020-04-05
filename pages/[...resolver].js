import Header from "../src/screens/App/Header";
import AppWrapper from "../src/screens/App/AppWrapper";
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
