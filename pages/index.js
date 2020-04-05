import Header from "../src/screens/App/Header";
import AppWrapper from "../src/screens/App/AppWrapper";
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
