---
id: "3"
title: "Landing Zones"
slug: "landing-zones"
date: "2023-11-24"
author: "Juan Herreros Elorza"
excerpt: "An invitation to use the concept of Landing Zones in Internal Platforms"
tags:
  - "Platform Engineering"
  - "Internal Developer Platform"
---

This post is an open invitation to use specific terminology to refer to different aspects of Internal Developer Platforms. Cloud Providers define Landing Zones as a way of configuring and structuting the resources in them, and I think that term could be used also in Internal Developer Platforms.

### Platform Engineering

Platform Engineering continues to be a practice in constant growth. More and more companies are investing in their own Internal Developer Platforms, tools in the area, such as Backstage or Crossplane continue to gather lots of attention and in conferences like KubeCon, we now have a track for Platform Engineering and a co-located Platform Engineering Day. 

When built properly, the benefits of using a Platform are obvious: They empower the developers to own their software from the design table to the infrastructure it runs on, in a self-service manner and without any hand-offs during the whole lifecycle; while reducing the cognitive load so that they can do that without having to learn a plethora of new tools and practices.

However, offering self-service capabilities, abstracting complexity away and reducing cognitive load is not straightforward. Oftentimes, the experience of using a platform can result confusing, since the developer using it still has to learn how to interact with it. Furthermore, if there is no clear separation of concerns or if the capabilities of the platform are not mature enough, the people building it might still be needed to guide the users and help them troubleshoot, defeating the point of self-service.

### What is a Platform

There can be some confusion in defining what a platform is and what its components are. I think we can distinguish at least 3 areas of concern:
- The **underlying technology**, that is, the collection of software (and hardware) the Platform runs on, such as Kubernetes, git, Flux or Grafana
- The **area(s) a user** of the Platform has access to, and where they can create/manage their resources. For example, this could include a namespace or a vCluster on Kubernetes, a repository or a project in git and a project on Flux.
- **Boundaries and guardrails** between and around those areas. These are essentially best practices that are enforced through means of configuration  scanners, policies, network restrictions, identity and access management, etc. They may or may not target one of the areas mentioned above specifically, but they do have an effect on those.

The responsibility for each of those 3 areas lies in a different team:
- The **underlying technology** is typically installed an maintained by the **Platform team**, though they might also consume it as an offering from a different platform (for example when using GKE/AKS/EKS instead of installing Kubernetes from scratch).
- Everything that happens inside the **user area** is the responsibility of the **developer team** using the Platform. 
- The **boundaries and guardrails** are also handled by the **Platform team**. If there is a dedicated networking or security team, they may want to also contribute to this setup.

### Landing Zones

*A Landing Zone is a well-designed, modular, scalable, and secure cloud environment that serves as a foundation for cloud operations.*

The above definition synthesises the definitions provided by the three major Cloud Providers (AWS, Azure and GCP). That definition essentially covers 2 of the 3 areas of concern mentioned above: The boundaries, guardrails and best practices, and the specific areas users of the Platform get access to.
All three Providers use the term “Landing Zone” to reference to the general setup or paradigm, and Azure also users the term to refer to the area a team works on:

- [AWS](https://docs.aws.amazon.com/prescriptive-guidance/latest/migration-aws-environment/understanding-landing-zones.html): *A landing zone is a well-architected, multi-account AWS environment that is scalable and secure.*
- [Azure](https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ready/landing-zone/): *An Azure landing zone is an environment that follows key design principles […] and uses subscriptions to isolate and scale application resources and platform resources. Subscriptions for application resources are called application landing zones, and subscriptions for platform resources are called platform landing zones.*
- [GCP](https://cloud.google.com/architecture/landing-zones): *A landing zone, also called a cloud foundation, is a modular and scalable configuration that enables organizations to adopt Google Cloud for their business needs.*

Going deeper into their documentation, there are 4 areas that all of them refer to when talking about Landing Zones. The first 3 of those again refer to the boundaries, guardrails, best practices around cloud operations, while the last 2 refer to structuring resources in a way that team areas are segregated:
- Networking
- Security
- Identity and Access Management
- Organization (i.e. a hierarchy for structuring the resources)

In more simple terms and if we follow Azure’s way of referring to a Landing Zone as the area where a team can do their job, we could define a Landing Zone as:
*“The area a team owns, configured in a scalable, efficient and secure way”.*

### Why using Landing Zones

As Platforms grow in complexity, it becomes necessary to come up with a language to describe and organise the concepts around them. “Platform” can, depending on the context, refer to any of the 3 areas described above, to all of them or to a combination. That’s why we need to introduce more specific terms.

The Platforms offered by Amazon, Microsoft and Google are more complex than any Internal Platform, so they encountered this need to get more specific first. We can use their learnings on our Internal Developer Platforms, and incorporate the terminology they use.

Once that we have a common understanding of what a Landing Zone is, for example, we can tackle questions like the following ones:

- How is a Landing Zone created and maintained?
- How are resources delivered into it?
- How should it look like? E.g., should the Landing Zone in Kubernetes be a vCluster or a namespace?
- Which tools and processes can a team use to interact with the Landing Zone?

In conclusion, I think naming and defining abstractions like parts of a Platform or ways of structuring said Platform is beneficial, and allows us to go further and create more complex abstractions. Landing Zones, specifically, are an abstraction that can be useful to design a Platform, to help understanding how it's built and to provide a clear split of responsibilities.