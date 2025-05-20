---
title: Platform layers
slug: "platform-layers"
date: "2024-10-06"
author: Juan Herreros Elorza
excerpt: How to strucute a Platform in Core, Foundation and Delivery
tags: ["Platform Engineering", "Internal Developer Platform"]
---

Throughout my years building Platforms, I’ve found that there are different understandings about what a Platform is. Everybody would agree that it’s a starting point where to build on top and that it makes the life of its users easier (that it reduces their cognitive load), however there are different takes on how it does that.

- For some people, a Platform is something like a server, a place where to run their workloads. Some would argue it includes, on top of that, a collection of tools, typically involving Kubernetes and other software to take care of security, networking or observability.
- Others would point that the Platform is what frees them from having to deal with all those tools and the underlying infrastructure, i.e., an abstraction that enables them to care only about the specifics of the domain where they work in (i.e. the [germane cognitive load](https://itrevolution.com/articles/cognitive-load/)), while ensuring they are running their software in a secure, efficient, reliable way.
- In line with that, some people would also point that the Platform should not only abstract away the underlying servers and server tooling that is used, but also provide an easy way to deliver their code onto it.

I think a Platform is everything that lays between the infrastructure and the user of that Platform, i.e. the developer that wants to build/run/understand their software on/through/with the Platform.
Therefore, I think all those views are right to some extent and a Platform is (or at least it can be) all of those things. To structure the way I build Platforms, I’ve found that it helps to structure them into layers.

The way I see them the layers of a Platform, from the most hidden one to the most visible one, are:
- **Core layer**: This is the “bag of tools”, i.e. a specific distribution of Kubernetes (k3s, AKS, EKS), plus all the additional software that is installed in the Kubernetes cluster(s), such as security, networking, observability or delivery tools.
- **Foundation layer**: This is the structure on top of the bag of tools which allows users of the Platform to access it and to build on top. It takes care of providing a baseline configuration around multi-tenancy, access management, network segregation and other basic (pre-)configurations
- **Delivery layer**: This is what allows users of the Platform to build and deploy their software to the Platform. In some cases, users might not need to use this layer in they are familiar with the underlying technologies and therefore able to build directly on top of the Foundation.

### The Core Layer

This is the infrastructure the Platform runs on, plus the tools installed on top and their general configuration.

Therefore, this layer concerns exclusively the team building the Platform, and any user of it should not be concerned about how it's built.

The scope of this layer is the entire Platform, as any capability that wants to be build on top will require that infrastructure, software and configuration to be in place.

### The Foundation Layer

This is the area a particular user of the Platform (typically, a team) gets to work on. Depending on the type of Platform, it can be understood as a tenant and/or as a [Landing Zone](https://juanherreros.com/landing-zones/).

A user of the Platform should not only get the "bag of tools" from the Core Layer, but rather a cohesive structure of resources built on top.

Furthermore, those resources should be (pre-)configured with the best Practices the Platform want to enforce or at least foster. For example, Network Policies restricting ingress or egress traffic to the deployed applications or Security Policies to ensure that no critical vulnerabilities are deployed to the Platform.

The design of this layer is done by the team maintaining the Platform, although the usage and the ownership of a particular Foundation lies with the team that deploys on top of said Foundation. It is not realistic, though, to expect that any user of the Platform will be familiar with the ins and outs of all the resources belonging to this Foundation layer. Therefore, the team maintaining the Platform should abstract away that complexity.

The best way of doing this is, in my opinion, to expose an API through which users of the Platform can manage their Foundations. This way they can handle all operations on them through a consistent interface with a well defined schema.

This layer should be standardized and flexible enough so that the way in which different users utilize the Platform is consistent, while accommodating to different use cases.

The scope of this layer is a particular team or system (a particular user of the Platform), which will then deploy its different applications (or other resources, depending on the Platform) on top of a particular Foundation. The Foundations for different teams and systems will look similar and are built through the same process, but the specifics of each of them will be different (e.g. a given system might need access to a database server, but a different one might not).

### The Delivery Layer

Once a user of the Platform has a Foundation to deploy on, the only thing missing are the applications (and/or other resources) deployed on top.

The applications are, naturally, the responsibility of each of the users of the Platform. However the team maintaining the Platform can also provide delivery mechanisms to help the users in bringing those applications onto the Platform.

This delivery mechanisms can look rather different, depending on the maturity level of the teams using the Platform and the complexity of it. Among others, the team maintaining the Platform (and/or a different team focused on Developer Experience) can provide:

- Baseline VM or container images that the teams can build on top
- Pipeline templates (e.g. for GitHub Actions) that teams can use to deliver their software
- Templates or APIs with pre-configured running configurations, to which teams can then provide their own inputs.

Here again, I believe using APIs instead of templates leads to a better Developer Experience (it's easier to provide input to an interface rather than putting [building blocks](https://juanherreros.com/lessons-learnt-from-building-blocks/) together) and to better maintainability (it's easier to handle versions and the usage of those in an API than for a collection of disperse building blocks).

The scope of this layer is a particular application. If a team is maintaining several applications, each of them will use this delivery layer in its own way and provide its own inputs to it.

### Example

The **core layer** consists of a Kubernetes Cluster with ArgoCD, Cilium, Kyverno and GitLab on top.

The **foundation layer** consists of a Kubernetes namespace, an ArgoCD project, A Cilium Network Policy, a series of Kyverno policies and a GitLab repo.

The management of all these resources is handled through a Kubernetes CRD, which is consumed by an Operator built by the Platform team.

Users of the Platform provide a name for their team, which is then used to name the different resources. Additionally and if needed, they can provide exceptions to the Network Policy and/or the Kyverno policies.

The **delivery layer** consists of a Helm chart maintained by the Platform team. To use it, teams just define to create an Argo Application which uses that Helm chart and a values file with the configuration specific to their app. They then commit those to the GitLab repo they got in their Foundation, and the application is deployed.

### Final thoughts

There are different ways of thinking about what a Platform is and how to slice it. Daniel Bryant, for example, has been writing about it in [Syntasso's blog](https://www.syntasso.io/post/platform-engineering-orchestrating-applications-platforms-and-infrastructure). In his case, he splits the Platform between Infrastructure, Platform Orchestration and Application.

I think the split between Foundation and Delivery is easy to understand for maintainers and users of the Platform, and that it can provide a separation of concerns between the general environment that affects all applications for one team and the specifics that apply to just a single app. If we look at best practices in using Public Cloud providers (which are, arguably, big Platforms), using Landing Zones - which would map to the Foundation Layer, in that case - is a recommendation for all the mayor ones. So I believe it's also sensible to look at it like that for Internal Developer Platforms.

I also think that, both for the Foundation and the Delivery layer (for anything a user has to do on the Platform, really) interacting through an API (or at least an interface of some kind) is preferable to using a series of modules or templates.