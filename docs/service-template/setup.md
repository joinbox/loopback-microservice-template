# Setup a new service

  1. Create a new repository on Github (the `origin`) for your organisation. Github will automatically create a `master` branch set up to track `origin/master`.
  1. Clone the repository.
  1. Add the `loopback-microservice-template` repository to your remotes (to list your remotes use `git remote -v`), _e.g._ called `upstream` via `git remote add upstream git@github.com:joinbox/loopback-microservice-template.git`
  1. We'd recommend to create a new branch for your setup _e.g._ `git checkout -b initial-setup` based on your master branch (which should be set up to track `origin/master`). We've usually got [branch-protection](https://help.github.com/articles/about-protected-branches/) and you're not allowed to push (or merge without review) changes to the master branch.
  1. Pull the template (`upstream`) into your setup branch `git pull upstream master` (_If you are allowed to make changes to your master branch, then you could pull it directly_).
  1. Configure your `datasources.json` and create the schema if you use postgres.
  1. Add the service name and the port to the `config.json`.
  1. Update the service version in the `package.json`.
  1. Commit and push your changes (**todo:** add contribution guideline).
  1. Create a pull request and assign someone of the team for a review.
  1. Add it to the devstar setup (**todo:** add documentation).