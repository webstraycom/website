const USERNAME = 'webstraycom';

export const GITHUB_BASE = `https://github.com/${USERNAME}`;

const RAW_BASE = `https://raw.githubusercontent.com/${USERNAME}`;

const PLUGIN_REGISTRY_NAME = `authenticator-plugin-registry`;

export const REPOSITORIES = {
  AUTHENTICATOR: `${GITHUB_BASE}/authenticator`,
  STARLIGHT: `${GITHUB_BASE}/starlight`,
  CLI: `${GITHUB_BASE}/cli`,
  WEBSITE: `${GITHUB_BASE}/website`,
  PLUGIN_REGISTRY: {
    REPOSITORY_URL: `${GITHUB_BASE}/${PLUGIN_REGISTRY_NAME}`,
    REGISTRY_URL: `${RAW_BASE}/${PLUGIN_REGISTRY_NAME}/main/registry.json`,
    PLUGIN_BASE_URL: `${GITHUB_BASE}/${PLUGIN_REGISTRY_NAME}/tree/main/plugins/`,
  },
};
