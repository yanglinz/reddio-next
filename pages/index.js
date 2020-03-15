import Header from "../src/screens/Header";
import AppWrapper from "../src/screens/AppWrapper";
import Home from "../src/screens/Home/Home";

function HomeRoute() {
  return (
    <AppWrapper>
      <Header />
      <Home />
    </AppWrapper>
  );
}

export default HomeRoute;
