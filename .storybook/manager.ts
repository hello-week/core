import { addons } from "@storybook/manager-api";
import { create } from "@storybook/theming";

const theme = create({
  base: "light",
  brandTitle: "Hello Week",
  brandUrl: "/",
  brandImage: "/images/logo/logo.png",
  colorPrimary: "#6366f1",
  colorSecondary: "#64748b",
  textColor: "#1e293b",
  appBg: "#fff",
});

addons.setConfig({
  theme,
  showToolbar: true,
});
