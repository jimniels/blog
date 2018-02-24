
A post on the `prepare` script for git packages via npm.

Present

- `prepare` a script run automatically on local install
  - https://github.com/npm/npm/blob/latest/doc/misc/npm-scripts.md
- in npm5 it now runs for git repos (and not just npm packages)
  - http://blog.npmjs.org/post/161081169345/v500
    - "Git dependencies with prepare scripts will have their devDependencies installed, and npm install run in their directory before being packed."
  - now git repos don't have to keep around built artifacts

Old way:
- ui-toolkit: Commit some changes, tag a release, create build artifact, commit to `dist` in repos
- consumer: npm i --no-save github:icg360/ui-toolkit.git#1.1.0
New way
- ui-toolkit: commit some changes, tag a release, done.
- consumer:

What this enables:
- no more saving compiled files in git repo
- easily test feature branches for deps