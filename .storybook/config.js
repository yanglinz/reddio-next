import Router from "next/router";
import { configure, addDecorator } from "@storybook/react";
import { loadStories } from "./storyLoader";
import { centeredDecorator } from "./decorators";

// Mock next.js router component
const mockedRouter = {
  push: () => {
    return Promise.resolve({});
  },
  prefetch: () => {
    return Promise.resolve({});
  }
};
Router.router = mockedRouter;

addDecorator(centeredDecorator);

configure(loadStories, module);
