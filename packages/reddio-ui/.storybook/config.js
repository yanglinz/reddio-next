import { configure } from "@storybook/react";
import { loadStories } from "./storyLoader";

configure(loadStories, module);
