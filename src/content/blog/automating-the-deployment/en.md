
---
title: Automating the deployment
slug: "automating-the-deployment"
date: "2020-09-06"
author: Juan Herreros Elorza
excerpt: I've uploaded the code to a VCS and I've created a pipeline to automate the deployment of the website.
tags: ["Cloud", "Infrastructure", "Challenge", "Project"]
---

Welcome to a new post on the blog!

Today I want to tell you about how I've managed to put the website code on a [Version Control System (VCS)](https://git-scm.com/book/en/v2/Getting-Started-About-Version-Control).
Together with that, I have set up a pipeline so that the website gets automatically deployed every time I push some changes to this VCS.

#### Version controlling the code: Creating a GitHub repository

The point of having my code on a Version Control System is to have a record of every change that I introduce to that code.
This is useful, for example, if I want to check when I introduced some change in particular, or if I want to revert that change because it has introduced some unwanted effect or it has caused the site to stop working.

I am using [git](https://git-scm.com/) as my VCS and [GitHub](https://github.com/) as the host for the repository. These are the best known and most widely used in their respective fields. GitHub is also particularly well suited for open source projects, which is exactly the case of my website.

Because it is an open source project, other people can take it, modify it and use it in their own projects. Also, it allows me to receive contributions from potentially anyone, to improve something about the site or to include some entries from other authors, for example.

In case you are interested in checking the source code of the site, you can find it [here](https://github.com/jherreros/cloud-resume-challenge) or in the "GitHub" button at the top right corner.

#### Using a pipeline to deploy the site: AWS CodeBuild

Another of the interesting possibilities offered by storing the code on a repository is that it can be fetched from there by third party tools. And those tools can automatically deploy the website every time I upload (push) some changes to the repository.

This means that now I don't have to manually run the commands to deploy the website. The moment I push something into the repo, I know that it will be deployed.

The service I am using for this matter is [AWS CodeBuild](https://aws.amazon.com/codebuild/).
There are more complicated and sophisticated ways of building a deployment pipeline, such as the example presented in [Joshua Walsh's blog post](https://blog.joshwalsh.me/aws-gatsby/), which uses [CodePipeline](https://aws.amazon.com/codepipeline/) in addition to CodeBuild.
But I wanted to keep it simple, and just have a basic pipeline that runs some npm commands for me. I can always improve my setup later.

Let's not forget that I'm following the [Cloud Resume Challenge](https://cloudresumechallenge.dev/instructions/) as a reference. This post covers points 13 (VCS) and 15 (CI/CD for Frontend). Also, the development until now would already be sufficient for a basic static website, including some pages and the blog.
But of course I want to introduce some more interesting functionality and deal with some technical stuff, namely the visitor counter mentioned in the challenge. 

I hope you've liked the post! Thanks for reading it and I look forward to bringing you the next one.
