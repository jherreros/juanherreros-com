---
title: Talking to infrastructure in plain English
slug: "talking-to-infrastructure-in-plain-english"
date: "2025-08-01"
author: Claude
excerpt: How the Mini-Atlas MCP Server bridges the gap between natural language and Kubernetes operations
tags: ["Platform Engineering", "AI", "Kubernetes", "Internal Developer Platform"]
---

The last few days, I have been working on a project that allows AI assistants like Claude to interact directly with Kubernetes clusters through natural language. The idea is simple: instead of writing YAML manifests or kubectl commands, you just tell an AI "create a workspace for the frontend team and deploy their React app" and it happens.

The result is the Mini-Atlas MCP Server, a Model Context Protocol server that provides a natural language interface to the Mini-Atlas Internal Developer Platform. It transforms infrastructure management from a series of technical commands into conversational requests.

### The problem with infrastructure complexity

When building Internal Developer Platforms, we often focus on abstracting away the complexity of the underlying infrastructure. We create APIs, build user interfaces, and design workflows that make it easier for developers to provision resources. But there's still a learning curve. Developers need to understand the platform's concepts, remember specific parameter names, and navigate through interfaces or documentation.

What if we could eliminate that learning curve entirely? What if developers could just describe what they want in plain English, and the platform would understand and execute it?

### Enter the Model Context Protocol

The Model Context Protocol (MCP) is an open standard that allows AI assistants to connect to data sources and tools. It's designed to provide secure, controlled access to external systems while maintaining the conversational nature of AI interactions.

For the Mini-Atlas platform, this meant I could build a bridge between natural language and Kubernetes operations. The MCP server exposes the platform's capabilities as tools that an AI assistant can call based on user intent expressed in natural language.

### How it works

The architecture is straightforward. The AI assistant (like Claude) communicates with the MCP server, which in turn interacts with the Kubernetes API to manage Mini-Atlas resources. The server provides eight core tools:

- **create_workspace**: Sets up isolated environments for teams
- **deploy_webapp**: Deploys containerized applications with ingress and monitoring
- **create_infrastructure**: Provisions PostgreSQL databases and Redis instances
- **create_topic**: Creates Kafka topics for event-driven architectures
- **get_resource_status**: Provides detailed status information for specific resources
- **delete_resource**: Safely removes resources with proper cleanup
- **list_resources**: Discovers and inventories platform resources
- **get_cluster_status**: Provides cluster health and capacity information

What makes this interesting is that users don't need to know these tools exist. They can say something like "Set up a complete microservices stack with database, Redis, and Kafka topics for the payment team" and the AI figures out which tools to call and in what order.

### The developer experience

The experience of using natural language to manage infrastructure is quite different from traditional approaches. Instead of remembering specific commands or navigating through interfaces, developers can express their intent conversationally:

> "Deploy a documentation site using nginx:alpine in the mobile-team workspace, make it accessible at docs.company.com"

> "Create three identical environments (dev, staging, prod) each with their own workspace, PostgreSQL database, and user service API"

> "Show me all web applications and their status across all workspaces"

This approach particularly shines when handling complex, multi-step operations. Setting up a complete microservices environment traditionally requires multiple commands, understanding resource dependencies, and getting the configuration right. With natural language, you describe the end state you want, and the system figures out how to get there.

The platform also handles the full resource lifecycle. You can monitor resource status, check detailed configurations, and safely clean up resources when they're no longer needed:

> "Get the status of the user-api application in production and show me its current configuration"

> "Delete the old payment-service from the legacy workspace since we migrated to the new version"

### The implementation challenges

Building this wasn't straightforward. The main challenge was bridging the gap between conversational intent and precise infrastructure operations. Natural language is inherently ambiguous, while infrastructure management requires exact specifications.

The solution was to design the platform's abstractions carefully. Mini-Atlas uses Kubernetes Custom Resources that represent higher-level concepts like "Workspace" or "WebApplication" rather than low-level resources like "Deployment" or "Service". This creates a vocabulary that's both meaningful to humans and precise enough for automation.

Another challenge was handling errors gracefully. When you're typing kubectl commands, you get immediate feedback if something's wrong. With natural language, the AI needs to understand what went wrong and communicate it in a way that makes sense to the user.

To ensure reliability, I implemented comprehensive input validation, type safety throughout the codebase, and extensive testing. The server now includes 29 tests covering everything from basic validation to end-to-end functionality. Custom error types (`ValidationError`, `KubernetesError`, `ResourceNotFoundError`) provide clear feedback when things go wrong, and strict TypeScript ensures that the AI gets consistent, well-structured responses.

### What this means for platforms

This experiment suggests that natural language interfaces might become an important part of Internal Developer Platforms. Not as a replacement for APIs or UIs, but as an additional layer that makes platforms more accessible.

The key insight is that the quality of the natural language interface depends heavily on the quality of the underlying abstractions. Platforms that are built with clear, high-level concepts translate well to conversational interfaces. Those built around low-level technical details don't.

This also reinforces something I've written about before: the importance of having well-designed APIs in platforms. The MCP server essentially provides a natural language frontend to the Mini-Atlas API. The better the API design, the better the conversational experience.

### Looking ahead

The Mini-Atlas MCP Server has evolved beyond a proof of concept into a production-ready tool with comprehensive testing and robust error handling. The implementation demonstrates that with proper abstractions and careful engineering, natural language interfaces can be both intuitive and reliable.

There are still interesting questions about security, auditability, and scaling that will shape how this type of interface evolves. But the developer experience improvements are significant enough that I expect to see more teams experimenting with conversational infrastructure management.

What's exciting is how this approach could lower the barrier to entry for platform adoption. When interacting with infrastructure becomes as simple as describing what you want, it opens up possibilities for broader team collaboration and faster development cycles.

For now, the Mini-Atlas MCP Server serves as a proof of concept that infrastructure management doesn't have to be complex. Sometimes, you really can just ask for what you want.

The project is available on GitHub, and you can try it out with any MCP-compatible AI assistant. It's been fascinating to see how natural language can make platform adoption easier, and I'm excited to see where this approach leads.