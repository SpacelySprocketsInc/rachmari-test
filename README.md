
:wave: :wave: :metal:

![](https://github.com/bbq-beets/rachmari-test/workflows/Greet%20everyone/badge.svg)

# Notify issue author f;akj

> A **GitHub Action** that pings you on issues you opened when they get closed! :zap:

![demo](https://user-images.githubusercontent.com/27806/52508405-3c793a80-2bba-11e9-9f05-aa3e81ca5f17.gif)

## Using this Action . 

In your workflow:

```hcl
workflow "Notify author when issue closed" {
  on = "issues"
  resolves = ["Notify author"]
}

action "Issue closed" {
  uses = "actions/bin/filter@master"
  args = ["action closed"]
}

action "Notify author" {
  needs = ["Issue closed"]
  uses = "github-developer/notify-issue-author.action@master"
  secrets = ["GITHUB_TOKEN"]
}
```

## Using a custom template

You can use a custom template for the comment that gets added to a closed issue:

![custom comment template](https://user-images.githubusercontent.com/27806/52507088-2a959880-2bb6-11e9-9dd6-79f142176184.png)

To do this, just specify your desired template using the `--template` flag to `args`:

```hcl
action "Notify author" {
  needs = ["Issue closed"]
  uses = "github-developer/notify-issue-author.action@master"
  args = ["--template", ":wave: hola @{{ author }}, @{{ actor }} closed your issue :sunglasses:"]
  secrets = ["GITHUB_TOKEN"]
}
```

A couple of template variables are available:

1. `author`: the GitHub username of the issue author
1. `actor`: the Actor (could a user or a bot) name that closed the issue
