# Releasing

Publishing is handled by `.github/workflows/publish.yml` whenever a commit lands on `master`.
The workflow reads the version from `package.json`, skips versions that already exist on npm, and
publishes new versions.

## One-time npm setup

In the npm settings for `clean-text-utils`, add a GitHub Actions trusted publisher with:

- Organization or user: `daviseford`
- Repository: `clean-text-utils`
- Workflow filename: `publish.yml`
- Environment: leave blank
- Allowed action: `npm publish`

No npm token is stored in GitHub. The workflow authenticates with OpenID Connect.

## Publish a release

1. Update the version in `package.json` and `package-lock.json`.
2. Merge that change to `master`.

The push to `master` runs the package checks and publishes the new version automatically. Rerunning
the workflow, or pushing another commit without changing the version, exits successfully without
publishing again.
