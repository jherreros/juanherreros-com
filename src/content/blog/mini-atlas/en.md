---
title: Building Mini-Atlas: A scaled-down Internal Developer Platform
slug: "building-mini-atlas"
date: "2025-07-07"
author: Claude
excerpt: A simplified version of our production Internal Developer Platform for learning and experimentation
tags: ["Platform Engineering", "Internal Developer Platform", "Kubernetes"]
---

At Banking Circle, we operate Atlas, our Internal Developer Platform that enables developers to provision and manage their cloud-native applications and infrastructure. While Atlas serves us well in production, I often found myself wanting a simpler, more accessible version for experimentation, learning, and understanding platform concepts more deeply.

That's how Mini-Atlas was born – a personal project that captures the essence of what makes Atlas valuable, while being simple enough to run locally and understand completely.

### The challenge with production platforms

Production platforms are complex by necessity. They need to handle enterprise-grade security, multi-tenancy, high availability, disaster recovery, and countless other requirements that come with running critical workloads. This complexity, while essential, creates barriers:

- **Onboarding friction**: New team members need weeks to understand how everything fits together
- **Experimentation overhead**: Testing new concepts requires navigating layers of enterprise tooling
- **Learning curve**: Understanding platform concepts means fighting through complex tooling

I needed something that preserved the architectural patterns and abstractions of Atlas, but stripped away the enterprise complexity that makes it difficult to grasp quickly.

### What makes a good platform abstraction

Through building Atlas, I've learned that effective platform abstractions should:

- **Hide complexity without sacrificing power**: Developers shouldn't need to understand Kubernetes YAML to deploy an application, but they should be able to access advanced features when needed
- **Provide clear boundaries**: Each abstraction should have a well-defined scope and responsibility
- **Enable self-service**: Teams should be able to provision everything they need without handoffs
- **Enforce best practices**: Security, networking, and operational concerns should be built-in, not optional

Mini-Atlas embodies these principles through four key abstractions:

### The abstractions

**Workspaces** provide isolated tenant environments. When you create a workspace, you get a namespace with network policies for isolation and naming conventions enforced through Kyverno policies. It's the foundation that everything else builds upon.

**WebApplications** handle the common case of deploying containerized applications. Behind the scenes, this creates a Deployment, Service, and Ingress, but developers only need to specify their image, desired replicas, and hostname.

**Infrastructure** provisions backing services like PostgreSQL databases and Redis caches. The abstraction handles cluster setup, credential management, and service discovery automatically.

**Topics** create Kafka topics on a shared message bus with appropriate partitioning and retention policies. Teams get messaging capabilities without needing to understand the underlying Kafka configuration.

### The architecture

Mini-Atlas follows the same [layered approach](https://juanherreros.com/platform-layers/) as our production platform:

The **Core Layer** provides the foundation – a Kind cluster with Cilium networking, Strimzi for Kafka, CloudNativePG for PostgreSQL, and other essential components. This is the "bag of tools" that powers everything else.

The **Foundation Layer** structures these tools into coherent environments. Using KRO (Kubernetes Resource Orchestrator), I define how high-level abstractions map to low-level Kubernetes resources. When someone creates a Workspace, KRO orchestrates the creation of namespaces, network policies, and governance rules.

The **Delivery Layer** enables teams to deploy their applications through simple, declarative interfaces. In my [previous writing about platform layers](https://juanherreros.com/platform-layers/), I described how the Foundation layer provides the tenant environment and the Delivery layer handles application deployment. In Mini-Atlas, I've expanded this approach by incorporating infrastructure and messaging elements as additional abstractions that teams can consume alongside their applications.

### What we learned

Building Mini-Atlas reinforced several insights from my platform engineering journey:

**Abstractions are harder than they appear**: Creating the right level of abstraction – powerful enough to be useful, simple enough to be approachable – requires deep understanding of both the underlying technology and user needs.

**GitOps scales down well**: Even in this simplified environment, using FluxCD for configuration management provides the same benefits we see in production: auditability, rollback capabilities, and declarative configuration.

**Developer experience matters more than feature completeness**: Mini-Atlas has fewer capabilities than Atlas, but the streamlined experience makes it more approachable for learning and experimentation.

**Local development unlocks experimentation**: Being able to spin up the entire platform locally in minutes removes barriers to trying new approaches and understanding system behavior.

### The difference from production

Mini-Atlas deliberately omits many enterprise requirements:

- **Single cluster vs. multi-cluster**: Production Atlas spans multiple clusters across regions
- **Simplified networking**: No service mesh, advanced traffic management, or complex ingress configurations  
- **Basic security**: Network policies and naming conventions rather than comprehensive enterprise security controls
- **Local storage**: No distributed storage, backup strategies, or disaster recovery
- **Simplified abstractions**: KRO handles resource orchestration instead of the more complex custom operators used in production

These simplifications make Mini-Atlas unsuitable for production use, but perfect for learning, experimentation, and understanding platform concepts.

### Looking forward

Mini-Atlas has become a valuable tool for my continued learning and experimentation. I use it for prototyping new abstractions and testing architectural changes. And it serves as a reference implementation for teams at other organizations building their own platforms.

The project reinforces my belief that the best platforms hide complexity behind simple, powerful abstractions. Sometimes the most valuable thing you can build is not the most feature-complete version, but the one that makes the underlying concepts crystal clear.

Whether you're building your first platform or refining an existing one, I'd encourage you to consider creating your own "mini" version. The exercise of stripping away complexity while preserving essential patterns often reveals insights that improve both your simplified and production platforms.

You can find Mini-Atlas on [GitHub](https://github.com/jherreros/mini-atlas) – I'd love to hear about your experiences building with it or creating your own platform abstractions.