# Repository Validation Commands

Before sending any changes for review, run the following commands from the repository root:

1. `npm run lint` – Runs the TypeScript type checker to ensure there are no type errors.
2. `npm run build` – Builds the Docusaurus site and regenerates dynamic assets.
3. `npm run test` – Executes the full build as an integration smoke test.

All three commands must succeed locally before creating a pull request.
