const { config } = require("@netlify/remix-edge-adapter");
const baseConfig =
  process.env.NODE_ENV === "production"
    ? config
    : { ignoredRouteFiles: ["**/.*"], future: config.future };

/**
 * @type {import('@remix-run/dev').AppConfig}
 */
module.exports = {
  ...baseConfig,
  // serverModuleFormat: "esm",
  future: {
    v2_normalizeFormMethod: true,
    v2_errorBoundary: true,
    v2_meta: true,
    v2_headers: true,
    v2_routeConvention: true,
  },
  tailwind: true,
  serverDependenciesToBundle: [
    "axios",
  ]
  // This works out of the box with the Netlify adapter, but you can
  // add your own custom config here if you want to.
  //
  // See https://remix.run/docs/en/v1/file-conventions/remix-config
};


// Read this before enabling serviceModuleFormat: esm
// https://remix.run/docs/en/main/pages/gotchas#importing-esm-packages
// https://github.com/remix-run/remix/issues/109