const CONFIG = {
  USER: 'webstraycom',
  REPO: 'authenticator-plugin-registry',
  BRANCH: 'main',
};

export const REGISTRY_URL = `https://raw.githubusercontent.com/${CONFIG.USER}/${CONFIG.REPO}/${CONFIG.BRANCH}/registry.json`;

export const PLUGIN_BASE_URL = `https://github.com/${CONFIG.USER}/${CONFIG.REPO}/tree/${CONFIG.BRANCH}/plugins/`;
