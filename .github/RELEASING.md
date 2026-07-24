# Releasing

Publishing is handled by `.github/workflows/publish.yml` when a GitHub release is published.

## One-time npm setup

In the npm settings for `clean-text-utils`, add a GitHub Actions trusted publisher with:

- Organization or user: `daviseford`
- Repository: `clean-text-utils`
- Workflow filename: `publish.yml`
- Environment: leave blank
- Allowed action: `npm publish`

No npm token is stored in GitHub. The workflow authenticates with OpenID Connect.

## Publish a release

1. Update the version in `package.json` and `package-lock.json`, then merge that change to `master`.
2. Create a GitHub release whose tag exactly matches the package version:

   ```sh
   gh release create v1.3.0 --target master --generate-notes
   ```

The workflow rejects mismatched release tags and package versions before publishing.
