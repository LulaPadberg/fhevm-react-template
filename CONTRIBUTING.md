# Contributing to Universal FHEVM SDK

Thank you for your interest in contributing to the Universal FHEVM SDK! This document provides guidelines and instructions for contributing.

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for all contributors.

## How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in [Issues](https://github.com/your-repo/issues)
2. If not, create a new issue with:
   - Clear, descriptive title
   - Steps to reproduce
   - Expected vs actual behavior
   - Environment details (OS, Node version, etc.)
   - Code samples if applicable

### Suggesting Enhancements

1. Check existing [Discussions](https://github.com/your-repo/discussions)
2. Create a new discussion with:
   - Clear use case
   - Expected benefits
   - Potential implementation approach

### Pull Requests

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Add tests if applicable
5. Update documentation
6. Commit with clear messages
7. Push to your fork
8. Open a Pull Request

## Development Setup

```bash
# Clone your fork
git clone https://github.com/your-username/fhevm-react-template.git
cd fhevm-react-template

# Install dependencies
pnpm install

# Build the SDK
pnpm build

# Run tests
pnpm test

# Run showcase
pnpm showcase
```

## Project Structure

```
fhevm-react-template/
├── packages/
│   └── fhevm-sdk/          # Core SDK package
│       ├── src/
│       │   ├── core/       # Framework-agnostic core
│       │   ├── hooks/      # React hooks
│       │   ├── types.ts    # TypeScript types
│       │   └── utils/      # Utility functions
│       └── package.json
├── examples/
│   ├── nextjs-showcase/    # Next.js demo
│   └── insurance-dapp/     # Production example
└── docs/                   # Documentation
```

## Coding Standards

### TypeScript

- Use TypeScript strict mode
- Add JSDoc comments for public APIs
- Export types for public interfaces
- Avoid `any` types

### Code Style

- Use Prettier for formatting
- 2 spaces indentation
- Semicolons required
- Double quotes for strings
- Max line length: 100 characters

### Naming Conventions

- PascalCase for types/interfaces
- camelCase for functions/variables
- UPPER_CASE for constants
- Prefix hooks with `use`

### Testing

- Write tests for new features
- Maintain >80% code coverage
- Use descriptive test names
- Test edge cases

## Commit Messages

Follow conventional commits:

```
type(scope): subject

body (optional)

footer (optional)
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting
- `refactor`: Code restructuring
- `test`: Tests
- `chore`: Maintenance

Example:
```
feat(hooks): add useEncrypt hook

Implement React hook for encryption with loading states
and error handling

Closes #123
```

## Documentation

- Update README.md for user-facing changes
- Update API docs for new functions
- Add examples for new features
- Include JSDoc comments

## Release Process

1. Update version in package.json
2. Update CHANGELOG.md
3. Create git tag
4. Publish to npm (maintainers only)

## Questions?

- Create a [Discussion](https://github.com/your-repo/discussions)
- Join [Zama Discord](https://discord.gg/zama)
- Review existing [documentation](./docs)

Thank you for contributing!
