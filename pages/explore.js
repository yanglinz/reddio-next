import Header from "../src/screens/Header";
import AppWrapper from "../src/screens/AppWrapper";
import Explore from "../src/screens/Explore/Explore";

function ExploreRoute() {
  return (
    <AppWrapper>
      <Header />
      <Explore />
    </AppWrapper>
  );
}

export default ExploreRoute;
