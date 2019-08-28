import { configure, addDecorator } from "@storybook/react";
import { loadStories } from "./storyLoader";
import { centeredDecorator } from "./decorators";

addDecorator(centeredDecorator);

configure(loadStories, module);
