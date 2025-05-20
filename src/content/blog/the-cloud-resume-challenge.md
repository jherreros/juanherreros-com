---
title: Starting the Cloud Resume Challenge
slug: "the-cloud-resume-challenge"
date: "2020-08-30"
author: Juan Herreros Elorza
excerpt: I've decided to start the Cloud Resume Challenge, and this website is the result of that.
tags: ["Cloud", "Infrastructure", "Challenge", "Project"]
---

Welcome to my blog!

I had been thinking for a long time, that it would be interesting to have a personal website. At the same time, I also wanted to have some side project, where I could play with some technologies which aren't the ones I use at work everyday.
A couple of weeks ago, while reading some posts in [dev.to](http://dev.to), I came accross the [Cloud Resume Challenge](https://cloudresumechallenge.dev/instructions/).

It was originally proposed by [Forrest Brazeal](https://forrestbrazeal.com/), who also offered his help to people that took the challenge and were looking for a job. Although that is not my intention, I still find the challenge particularly interesting as it will allow me to fulfill those 2 goals I've had for a while: Getting a personal website and hands-on experinece with new tools and technologies.

#### First steps

I started looking for HTML templates for a Resume, and I was ready to upload one of those as a first, very simple version of the site. But then I discovered [Gatsby](https://www.gatsbyjs.com/), a React-based open source framework which enables me to get a more complete website, containing not just the Curriculum Vitae, but also the blog you're reading right now (as well as other content that eventually may come).

Gatsby offers a bunch of [starters](https://www.gatsbyjs.com/starters/?v=2), templates that already look quite professional. I took one of those, intended for a [mininalistic-style](https://www.gatsbyjs.com/starters/LekoArts/gatsby-starter-minimal-blog/) blog, developed by [@LekoArts](https://github.com/LekoArts).

#### Publishing the site

Following the original instructions of the challenge, I am using [Amazon Web Services (AWS)](https://aws.amazon.com/) as my cloud provider. 
This is also particularly interesting for me, because I work on Azure, so this is an interesting way of getting hands-on expericne on a different cloud.

For the first deployment, I used the following services, configuring all of them from the web console:

- [S3](https://aws.amazon.com/s3/), to host the static website
- [Certificate Manager](https://aws.amazon.com/cloudfront/), to provision the SSL certificates used in the HTTPS connection to the site
- [CloudFront](https://aws.amazon.com/cloudfront/), to provide HTTPS connection (Also to provide access to the site over a CDN)
- [Route 53](https://aws.amazon.com/route53/), a DNS service to point my own domain to the one provided by CloudFront

This is already solving points 2, 3, 4, 5 and 6 of the [challege](https://cloudresumechallenge.dev/instructions/). In case you're wondering, I don't have the intention of fulfilling the first requisite in the short term, but I do have some [Azure certifications](https://www.youracclaim.com/users/juan-herreros-elorza/badges).

The instructions I followed to deploy the site were the ones provided in [Gatsby's own website](https://www.gatsbyjs.com/docs/deploying-to-s3-cloudfront/), as well as a [fantastic blog post](https://blog.joshwalsh.me/aws-gatsby/) by Joshua Walsh.
Summarizing, first I provisioned a bucket on **S3**, then I installed the **AWS CLI** and the gatsby plugin to deploy to S3 and finally I deployed the site from the command line. Later, I requested the SSL **certificates** and I used those to get a **CloudFront** distribution pointing to my S3 bucket. Once all of that was working, I created a DNS zone on **Route 53** and a record for my domain.


And that's it! With all of that I am able to deliver this site to you. Next step will be to [version control](https://git-scm.com/book/en/v2/Getting-Started-About-Version-Control) the code and deploy a CI/CD pipeline so my site gets updated every time I post changes to it. I am guessing [Joshua's post](https://blog.joshwalsh.me/aws-gatsby/) will again be of great help in that task.
I'll provide the details about that part of the project in my next blog post.

Thanks for reading the post! I hope you've liked it and I look forward to bringing you the next one :)