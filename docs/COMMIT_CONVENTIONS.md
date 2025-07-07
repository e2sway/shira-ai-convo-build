# Commit Conventions

This document outlines the commit message conventions and Git workflow for the Shira AI Conversation Builder project.

## Commit Message Format

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Types

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **perf**: A code change that improves performance
- **test**: Adding missing tests or correcting existing tests
- **build**: Changes that affect the build system or external dependencies
- **ci**: Changes to our CI configuration files and scripts
- **chore**: Other changes that don't modify src or test files
- **revert**: Reverts a previous commit

### Scopes

Common scopes for this project:

- **api**: Gemini Live API integration
- **ui**: User interface components
- **audio**: Audio processing and streaming
- **navigation**: App navigation
- **state**: State management
- **config**: Configuration files
- **deps**: Dependencies

### Examples

```bash
feat(api): integrate Gemini Live Audio API
fix(ui): resolve audio playback button state issue
docs: add API integration documentation
style(components): format Button component code
refactor(audio): extract audio processing utilities
perf(ui): optimize conversation list rendering
test(api): add unit tests for audio service
build(deps): upgrade expo to v50
ci: add automated testing workflow
chore(config): update TypeScript strict rules
```

## Branching Strategy

### Branch Types

- **main**: Production-ready code
- **develop**: Integration branch for features
- **feature/**: New features (`feature/audio-streaming`)
- **bugfix/**: Bug fixes (`bugfix/audio-sync-issue`)
- **hotfix/**: Emergency fixes for production (`hotfix/critical-audio-bug`)
- **release/**: Release preparation (`release/v1.0.0`)

### Workflow

1. **Feature Development**:

   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feature/new-feature
   # Make changes and commits
   git push origin feature/new-feature
   # Create pull request to develop
   ```

2. **Bug Fixes**:

   ```bash
   git checkout develop
   git checkout -b bugfix/issue-description
   # Fix and commit
   git push origin bugfix/issue-description
   # Create pull request to develop
   ```

3. **Hotfixes**:
   ```bash
   git checkout main
   git checkout -b hotfix/critical-fix
   # Fix and commit
   git push origin hotfix/critical-fix
   # Create pull requests to both main and develop
   ```

## Code Review Process

### Pull Request Requirements

1. **Title**: Clear, descriptive title following commit conventions
2. **Description**: Detailed explanation of changes
3. **Testing**: Evidence of testing (screenshots, test results)
4. **Documentation**: Updated documentation if needed
5. **Breaking Changes**: Clearly marked if applicable

### Review Checklist

- [ ] Code follows TypeScript best practices
- [ ] ESLint rules pass without errors
- [ ] Tests are included for new functionality
- [ ] Performance implications considered
- [ ] Error handling implemented
- [ ] Accessibility guidelines followed
- [ ] Documentation updated
- [ ] No console.log statements in production code

### Approval Process

1. At least 1 reviewer approval required
2. All CI checks must pass
3. No merge conflicts
4. Branch up to date with target branch

## Git Hooks

### Pre-commit

- Run ESLint
- Run TypeScript type checking
- Format code with Prettier
- Run affected tests

### Pre-push

- Run full test suite
- Verify build passes

## Release Process

1. Create release branch from develop
2. Update version numbers
3. Update CHANGELOG.md
4. Test release candidate
5. Merge to main with tag
6. Merge back to develop
7. Deploy to production

## Best Practices

### Commit Best Practices

1. **Atomic Commits**: One logical change per commit
2. **Clear Messages**: Write clear, concise commit messages
3. **Present Tense**: Use present tense ("Add feature" not "Added feature")
4. **Imperative Mood**: Write as if giving commands ("Fix bug" not "Fixes bug")
5. **Reference Issues**: Include issue numbers when applicable

### Examples of Good Commits

```bash
feat(audio): implement real-time audio streaming with WebSocket
fix(ui): resolve conversation list scrolling performance issue
docs(api): add Gemini Live API integration examples
refactor(state): extract audio player state to custom hook
test(audio): add integration tests for audio processing pipeline
```

### Examples of Bad Commits

```bash
fixed stuff                    # Too vague
WIP                           # Work in progress, should be squashed
Updated files                 # No meaningful description
feat: added new feature       # Redundant "added"
Fix bug                      # No context about which bug
```

## Task Master Integration

When working with Task Master AI:

- Reference task/subtask IDs in commits: `feat(api): implement Gemini integration (Task 3.1)`
- Update task status after commits: `task-master set-status --id=3.1 --status=done`
- Link commits to tasks in Task Master updates

## Tools and Configuration

### Recommended Git Configuration

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
git config --global core.autocrlf true  # Windows
git config --global init.defaultBranch main
```

### Git Aliases

```bash
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.st status
git config --global alias.unstage 'reset HEAD --'
git config --global alias.last 'log -1 HEAD'
git config --global alias.visual '!gitk'
```

This convention ensures consistent, traceable, and maintainable code history throughout the project lifecycle.
