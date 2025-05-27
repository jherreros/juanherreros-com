---
title: Lessons learnt from building blocks
slug: "lessons-learnt-from-building-blocks"
date: "2024-09-30"
author: Juan Herreros Elorza
excerpt: Lessons learnt from using "building blocks" as an approach to IaC
tags: ["Platform Engineering", "Internal Developer Platform"]
---

When I first started working at Banking Circle, I was working with Infrastructure as Code (IaC).
Maintaining a declarative definition of all the infrastructure the team was using and being able to provision it in a controlled, repeatable way, worked wonders for us. It drastically reduced drift between the different environments, which previously were handled rather manually.

Naturally, having seen how well it worked in the team, we wanted to expand that approach to other teams that, until that point, were also handling their infrastructure the "old-school" way.
To do that, we bundled each of our infrastructure components (such as a database, a webapp or a secrets store), together with some auxiliary resources that would always be deployed next to them, in a re-usable, pre-configured, easy-to-use module.

Then, each team that wanted to get all the benefits of using IaC would _only_ need to create their own project using those modules. _How difficult could that be?_ After all, the hard work was already done inside each of the modules.

To make things ~~worse~~ better, we also took care of writing some pipeline templates that can be used to test, apply or destroy each of those IaC projects.
Once again, the _only_ thing teams need to take care of is to build a pipeline using those templates, and use that pipeline to deploy their projects.

We did manage to expand this approach to more or less the entire Engineering Organization, however it took us quite a bit of effort not only in building these reusable components, but especially in getting people to understand the approach and use them.

### What works

- These building blocks allow teams to provision infrastructure independently, without needing anyone from a different department to execute any actions on their behalf.
- New projects can be created faster and changes to those (and to existing projects, after importing/migrating them to the IaC paradigm) become so much more frequent.

### What doesn't work

- Most developers I've met don't really have an interest in infrastructure and, even if they do, it's far from the top of their priority list, because they have their own concerns. Therefore, when they are asked to work on infrastructure they tend to be reluctant.
- Because of that and because infrastructure is not typically their area of expertise, they tend to need help putting those modules and templates together. In some cases, they rely on that help to get the IaC project built and released, and the knowledge doesn't really sink in. 
- Because of that, whenever they need to provision some additional infrastructure, they tend to need help again. If, on top of the new requirements, they need to take care of updating the modules and/or templates, it's even more likely that they will be reluctant and that they will need help with that.

### A solution

As we can see from all the points exposed above, developers want to have the freedom of provisioning the infrastructure they need in a self-service way and they benefit from that. In most cases, they don't want to (and shouldn't) be concerned about writing IaC nor pipeline code, even if that's based on some modules or templates.

The solution is, then, to put all that code behind an interface the developers interact with. They then provide simpler inputs, such as:
- The name of their team, application or system
- The people working in their team
- Other systems or endpoints they need access to
- (Optionally) configuration that would supplement or override the defaults for some of the resources they get

This definition is still declarative, so it maintains the benefits of using IaC, but it's now based on a single component/block (this interface), so there's no need to write anything else than the input to this interface.

Furthermore, if this interface is exposed as an API, it can easily be integrated with other solutions. This can make the developers' life even easier by using a developer platform, another kind of UI, a CLI or any other integration on top of the API.

The API is also easy to version, so handling updates to the underlying infrastructure "model" (the project behind the API) and shipping those to everyone using it is much easier than releasing updates to each building block and asking developers to keep them up-to-date.

### Caveats

Depending on the complexity and uniqueness of the infrastructure each team needs, it is possible that the resources handled through the API are not enough, and they need to be complemented with some "building blocks" (some IaC modules). This is, in some cases, preferable to introducing the complexity in the API everyone else is using.

This is a relatively unlikely scenario, though, as most teams can be covered by the IaC API. Even then, these teams that have specific infrastructure requirements are normally more familiar with (their) infrastructure. And still, they only have to be familiar with the part that is not covered by the more general solution.

### Conclusion

All in all, allowing developers to provision their infrastructure in a self-service way is a good way of allowing them to deliver more while enjoying more their time at work.
Putting some effort into building an API-based Platform they can interact with is a good way of having a good Developer Experience, for both people using and maintaining the Platform.

Using building blocks, such as IaC modules or pipeline templates can still be an interesting approach while the API-based Platform is being built and/or before it is available, if the effort that goes into building those is nonetheless going to be useful in the construction of that Platform.