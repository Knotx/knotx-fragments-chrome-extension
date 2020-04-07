import { addDecorator } from "@storybook/react";
import { withThemesProvider } from "storybook-addon-styled-component-theme";

import { defaultTheme, darkTheme } from '../src/js/devtools/themes';


const themes = [defaultTheme, darkTheme];
addDecorator(withThemesProvider(themes));
