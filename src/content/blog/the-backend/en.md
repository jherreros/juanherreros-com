
---
title: The Backend
slug: "the-backend"
date: "2020-09-28"
author: Juan Herreros Elorza
excerpt: This web now has backend that serves a visitor counter
tags: ["Cloud", "Infrastructure", "Challenge", "Project", "AWS"]
---

Welcome to a new post on my blog!

This time I am writing about how I have created a backend for this website, including a database, a lambda function and an API, which I call from the frontend.
Moreover, all of this is completely automated and version-controlled, so that it can be deployed and updated in a controlled, repeatable way.

#### The architecture

![Picture](/arch.png)

The frontend of this website, as described in the previous blog posts, is composed by:
- A [S3](https://aws.amazon.com/s3/) bucket, which hosts the static site generated with Gatsby
- A [CloudFront](https://aws.amazon.com/cloudfront/) distribution that serves and secures the site stored in the bucket
- A [Route 53](https://aws.amazon.com/route53/) DNS zone with a domain record to provide access to this site on my custom domain

To that frontend, now I have added:
- A [DynamoDB](https://aws.amazon.com/dynamodb/) table that hosts the number of visitors
- A [Lambda](https://aws.amazon.com/lambda/) function that reads and updates that DynamoDB table
- An [API Gateway](https://aws.amazon.com/api-gateway/) that exposes the Lambda function
- A DNS record for the API gateway, for it to be accessible at a known endpoint

The front- and backend communicate over this API, which is called from a [React](https://reactjs.org/) component, which then displays the number of visits to the readers that access the home page.

#### The Lambda-based API

As described before, the main component of the backend is a Lambda function. This is a very interesting type of [serverless computing](https://en.wikipedia.org/wiki/Serverless_computing), where I just have to worry about writing the code for the function itself, but not about hosting or serving it. The Lambda function:
1. Receives the request from the API gateway, including the details that might be included in that request, such as:
    - The user id, included in the URL. At this point I'm just using "default" for all users, but the API code is prepared to store the number of visits from each individual user.
    - An API key, passed as a header
1. Queries the table to update and get the number of visits. If there are no visits registered, then it creates the record
1. Returns the updated number of visits

To test that the API is working, I have also included some [unit tests](https://en.wikipedia.org/wiki/Unit_testing) for the lambda function.

#### Infrastructure as Code: SAM

All of the implementation of the backend is described as code in a language provided by AWS which is called [Serverless Application Model](https://aws.amazon.com/serverless/sam/).
This allows me to avoid having to configure all the services in the console UI, and instead just run a command to deploy the whole backend stack.

This is incredibly useful because it allows me to update or redeploy all the services in the blink of an eye. On top of that, all the configuration for all the services that I am using is in the same place and so it is easier to manage. Plus, I have it version controlled, so I can keep track of the changes that I have done to my infrastructure.

#### Using secrets

I am also using some secrets in my [CodeBuild](https://aws.amazon.com/codebuild/) pipelines now. I store them in the [Parameter Store](https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html) of AWS [Systems Manager](https://aws.amazon.com/systems-manager/). This way I avoid having sensitive information on my public GitHub repositories. Instead of that, I have some placeholder strings which I replace as part of my pipeline.

With this, I cover all the remaining points of the [Cloud Resume Challenge](https://cloudresumechallenge.dev/instructions/), which were 7, 8, 9, 10, 11, 12 and 14. So I consider it complete! It was really a nice learning experience :)

Nonetheless, there are some functional and technical improvements that I have in mind for this site, and I'll keep writing about those in this blog when I include them on the page. 

As always, I hope you've liked the post. See you in the next one and thanks for reading!
