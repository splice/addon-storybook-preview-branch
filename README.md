# @splice/addon-storybook-preview-branch

This module is a Storybook addon for presenting and modifying the current Preview Branch of Storybook being viewed.

The UI is a text input in the Storybook toolbar which contains the name of the branch currently being viewed.

To change the branch you enter the branch you want into the input and press return. When Storybook reloads your target branch of Storybook will be what is presented.

## How it Works

This addons depends on some infrastructure to allow for different branches to be served.

1. Storybook should be served from a static file server out of branch-specific sub-directories. For example:
    * `master`
    * `staging`
    * `<username>/feature-name`
1. CI should exist to automatically push branches into the static server's sub-directories.
1. A proxy must exist in front of the static server (or the static server must implement it) to route incoming HTTP requests to sub-directories based on the `branch` cookie (not an HTTP-Only cookie!). If the cookie is not set it should use the default branch (likely `master`).
1. The proxy should serve all assets with `Cache-Control: no-cache` to ensure the target branch content is served whenever the value of the `branch` cookie changes.

## Development and Publishing Workflow

1. Install dependencies: `npm install`.
1. Build it in watch mode: `npm run build:watch`.
1. Use `npm link` to expose your local build to your local Storybook.
1. In your Storybook project use `npm link @splice/addon-storybook-preview-branch` to pull in your local dev build.
1. Whenever you make changes to this project you will have to manually refresh Storybook to see the changes.
1. When done, call update the version in `package.json` and run `npm publish`.