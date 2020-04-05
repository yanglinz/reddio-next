import Header from "../src/screens/App/Header";
import AppWrapper from "../src/screens/App/AppWrapper";
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
