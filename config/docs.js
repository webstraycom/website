export const docsConfig = {
  authenticator: [
    {
      title: 'About',
      items: [{ title: 'WebStray Authenticator', href: '/docs/authenticator' }],
    },
    {
      title: 'Architecture',
      items: [
        { title: 'Overview', href: '/docs/authenticator/architecture' },
        { title: 'Security Model', href: '/docs/authenticator/architecture/security-model' },
        { title: 'Cryptography', href: '/docs/authenticator/architecture/cryptography' },
        { title: 'Local-First', href: '/docs/authenticator/architecture/local-first' },
        { title: 'App Lifecycle', href: '/docs/authenticator/architecture/app-lifecycle' },
        { title: 'Storage', href: '/docs/authenticator/architecture/storage' },
        { title: 'Sessions', href: '/docs/authenticator/architecture/sessions' },
        { title: 'Import & Export', href: '/docs/authenticator/architecture/import-and-export' },
        {
          title: 'Credential Rotation',
          href: '/docs/authenticator/architecture/credential-rotation',
        },
        { title: 'Plugin System', href: '/docs/authenticator/architecture/plugin-system' },
      ],
    },
    {
      title: 'Developer Guide',
      items: [
        { title: 'Overview', href: '/docs/authenticator/developer-guide' },
        {
          title: 'Development Environment',
          href: '/docs/authenticator/developer-guide/development-environment',
        },
        {
          title: 'Project Structure',
          href: '/docs/authenticator/developer-guide/project-structure',
        },
        {
          title: 'Internal Services',
          href: '/docs/authenticator/developer-guide/internal-services',
        },
        { title: 'State Layer', href: '/docs/authenticator/developer-guide/state-layer' },
        { title: 'Plugin SDK', href: '/docs/authenticator/developer-guide/plugin-sdk' },
        { title: 'Plugin Lifecycle', href: '/docs/authenticator/developer-guide/plugin-lifecycle' },
        { title: 'Plugin Security', href: '/docs/authenticator/developer-guide/plugin-security' },
        { title: 'First Plugin', href: '/docs/authenticator/developer-guide/first-plugin' },
        {
          title: 'Testing & Quality',
          href: '/docs/authenticator/developer-guide/testing-and-quality',
        },
      ],
    },
    {
      title: 'User Guide',
      items: [
        { title: 'Overview', href: '/docs/authenticator/user-guide' },
        { title: 'Getting Started', href: '/docs/authenticator/user-guide/getting-started' },
        { title: 'Authentication', href: '/docs/authenticator/user-guide/authentication' },
        { title: 'Passwords', href: '/docs/authenticator/user-guide/passwords' },
        { title: 'TOTP', href: '/docs/authenticator/user-guide/totp' },
        { title: 'Tokens', href: '/docs/authenticator/user-guide/tokens' },
        { title: 'Import & Export', href: '/docs/authenticator/user-guide/import-and-export' },
        { title: 'Settings', href: '/docs/authenticator/user-guide/settings' },
        { title: 'Plugins', href: '/docs/authenticator/user-guide/plugins' },
        {
          title: 'FAQ & Troubleshooting',
          href: '/docs/authenticator/user-guide/faq-and-troubleshooting',
        },
      ],
    },
    {
      title: 'Plugins',
      items: [{ title: 'Plugin Registry', href: '/docs/authenticator/plugins' }],
    },
  ],
  starlight: [
    {
      title: 'About',
      items: [{ title: 'Starlight', href: '/docs/starlight' }],
    },
  ],
  cli: [
    {
      title: 'About',
      items: [{ title: 'WebStray CLI', href: '/docs/cli' }],
    },
    {
      title: 'Product CLIs',
      items: [
        { title: 'Authenticator CLI', href: '/docs/cli/authenticator' },
        { title: 'Starlight CLI', href: '/docs/cli/starlight' },
      ],
    },
  ],
  general: [
    {
      title: 'Changelog',
      items: [{ title: 'Changelog', href: '/docs/general/changelog' }],
    },
    {
      title: 'Website',
      items: [{ title: 'WebStray Website', href: '/docs/general/website' }],
    },
    {
      title: 'Products',
      items: [
        { title: 'WebStray Authenticator', href: '/docs/authenticator' },
        { title: 'WebStray Starlight', href: '/docs/starlight' },
        { title: 'WebStray CLI', href: '/docs/cli' },
      ],
    },
  ],
};
