# @splice/addon-storybook-preview-branch

<img width="1056" alt="addon-preview-branch" src="https://user-images.githubusercontent.com/18332/74503402-a4392400-4ea5-11ea-9c7c-0dbb7d0fc001.png">

This module is a Storybook addon for presenting and modifying the current Preview Branch of Storybook being viewed.

The UI is a text input in the Storybook toolbar which contains the name of the branch currently being viewed.

To change the branch you enter the branch you want into the input and press return. When Storybook reloads your target branch of Storybook will be what is presented.

## How it Works

This addons depends on some infrastructure to allow for different branches to be served.

1. Storybook should be served from a static file server out of branch-specific sub-directories, each with their own Storybook builds. For example:
    * `master`
    * `staging`
    * `<username>/feature-name`
1. CI should exist to automatically push branches into the static server's sub-directories.
1. A proxy must exist in front of the static server (or the static server must implement it) to route incoming HTTP requests to sub-directories based on the `branch` cookie (not an HTTP-Only cookie!). If the cookie is not set it should use the default branch (likely `master`).
1. The proxy should serve all assets with `Cache-Control: no-cache` to ensure the target branch content is served whenever the value of the `branch` cookie changes.

### Our Specific Example

* We have a bucket in S3 dedicated to design system (ie, `storybook.example.com`). The bucket is configured to operate as a static web server.
* Our CI builds Storybook Pull Request (as well as the `master` branch) and uploads it to a folder in the bucket named after the branch (ie, `storybook.example.com/dandean/8786/my-feature`)
* We have nginx which receives requests for `storybook.example.com` and proxies them to S3. _Before_ the requests are proxied nginx looks for the cooke and rewrites the request to the target directory in the bucket. Our nginx config looks something like this:

```conf
location / {
    # Disable HTTP Caching
    expires -1;

    # If cookie named branch is not set, use `master`...
    if ($cookie_branch = "") {
        # If found, use value to prefix URL and rewrite:
        rewrite (.*) /master$1 break;
    }

    # ...if cookie named "branch" set, use it...
    if ($cookie_branch) {
        # If found, use value to prefix URL and rewrite:
        rewrite (.*) /$cookie_branch$1 break;
    }

    # Proxy all requests to the static host.
    proxy_pass http://storybook.example.com.s3-website-us-west-1.amazonaws.com;
}
```

With this infrastructure in place this addon reads the cookie and reflects its value into the input. When the form is submitted the cookie is updated, the page is refreshed, and the proxy serves the new target branch.

## Development and Publishing Workflow

1. Install dependencies: `npm install`.
1. Build it in watch mode: `npm run build:watch`.
1. Use `npm link` to expose your local build to your local Storybook.
1. In your Storybook project use `npm link @splice/addon-storybook-preview-branch` to pull in your local dev build.
1. Whenever you make changes to this project you will have to manually refresh Storybook to see the changes.
1. When done, call update the version in `package.json` and run `npm publish`.