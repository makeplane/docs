# Plane Developer Documentation

Official developer documentation for [Plane](https://plane.so) - an open-source project management platform.

This repository contains comprehensive guides for REST API integration, self-hosting deployments, and building custom applications on the Plane platform.

## Documentation Sections

- **[Self-Hosting](https://developers.plane.so/self-hosting/overview)** - Deploy Plane on your own infrastructure with Docker, Kubernetes, or other platforms
- **[API Reference](https://developers.plane.so/api-reference/introduction)** - Complete REST API documentation for integrating with Plane
- **[Developer Tools](https://developers.plane.so/dev-tools/build-plane-app)** - Build custom apps, webhooks, and extensions

## Tech Stack

- [VitePress](https://vitepress.dev/) - Static site generator
- [Vue 3](https://vuejs.org/) - Custom components
- [Tailwind CSS](https://tailwindcss.com/) - Styling

## Local Development

### Prerequisites

- Node.js 18+
- pnpm

### Setup

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

The development server runs at `http://localhost:5173` with hot reload enabled.

## Project Structure

```
docs/
├── .vitepress/
│   ├── config.mts          # VitePress configuration
│   ├── theme/              # Custom Vue theme
│   │   ├── components/     # Custom Vue components
│   │   ├── styles.css           # VoidZero/Vitest theme styles
│   │   └── plane-overrides.css  # Plane-specific overrides
│   └── public/             # Static assets (images, logos)
├── api-reference/          # REST API documentation
├── self-hosting/           # Deployment and configuration guides
├── dev-tools/              # Developer tools and extensions
└── plane-one/              # Plane One (licensed edition) docs
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on contributing to this documentation.

## Community

- [GitHub](https://github.com/makeplane/plane) - Main Plane repository
- [Discord](https://discord.com/invite/A92xrEGCge) - Community chat
- [Twitter](https://twitter.com/planepowers) - Updates and announcements

## License

This project is licensed under the [Apache License 2.0](LICENSE).
