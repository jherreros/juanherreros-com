
import { Talk } from "@/lib/types";

export const talks: Talk[] = [
  {
    title: "Self-service IaC @ Banking Circle",
    event: "DevOps Meetup, Copenhagen",
    date: "2022-11-10T00:00:00Z",
    description:
      "An introduction to how Banking Cicle went from a mostly manual approach to re-usable terraform modules for infrastructure provisioning.",
    videoUrl: "https://www.youtube.com/watch?v=KnLCEtHkRa8",
    tags: ["Infrastructure as Code", "Automation", "Terraform"],
  },
  {
    title: "Self-service Infrastructure as Code: People, process, product",
    event: "HashiTalks 2023",
    date: "2023-02-16T00:00:00Z",
    description:
      "A reflection of how an automated, repeatable approach drives benefits in both technical and non-technical areas.",
    videoUrl: "https://www.youtube.com/watch?v=_-mHscUXYZY",
    tags: ["Infrastructure as Code", "Automation", "Terraform", "Culture"],
  },
  {
    title: "Yes sir, I can GitOps! SDLC automation on a regulated industry",
    event: "PlatformCon 2023",
    date: "2023-06-09T00:00:00Z",
    description:
      "A look into how we put in place an automated compliance solution in our pipelines and a GitOps solution for Feature Flags, within the regulations of our industry.",
    videoUrl: "https://www.youtube.com/watch?v=7P6IaysAiCM",
    tags: ["GitOps", "CI/CD", "Compliance", "Feature Flags"],
  },
  {
    title: "The 3 Layers of our Platform and Helmping Ourselves before helping others",
    event: "Cloud Native Copenhagen",
    date: "2024-05-21T00:00:00Z",
    description:
      "A look into the structure of Banking Circle's Internal Developer Platform, and the open source tooling we have built for it.",
    imageUrl: "/cncf-cph.png",
    tags: ["Kubernetes", "Open Source", "Cloud Native", "Platform Engineering"],
  },
  {
    title: "A Platform to run a Bank on, in 4 simple steps",
    event: "QCon London 2025",
    date: "2025-04-08T00:00:00Z",
    description:
      "A quick overview of Banking Circle's Compute Platform, including its core and the abstraction layers exposed to our users.",
    imageUrl: "/qcon.jpg",
    tags: ["Kubernetes", "Open Source", "Cloud Native", "Platform Engineering"],
  },
  {
    title: "Azure Landing Zones as a Service",
    event: "Azure Usergroup Denmark",
    date: "2025-02-05T00:00:00Z",
    description:
      "An introduction to our single, simple, self-service interface to provision infrastructure resources.",
    imageUrl: "/azure-usergroup.jpg",
    tags: ["Azure", "Landing Zones", "Cloud Native", "Platform Engineering"],
  },
  {
    title: "Evolving Engineering at Banking Circle",
    event: "The Shortcu.tt podcast ",
    date: "2025-05-14T00:00:00Z",
    description:
      "(Not a talk as such) I was a guest in the podcast The Shortcu.tt, where I talked about our journey in Banking Circle",
    videoUrl: "/https://www.youtube.com/watch?v=i8EGSQcg0aY",
    tags: ["Podcast", "Culture", "Cloud Native", "Platform Engineering"],
  },
  {
    title: "Infrastructure as code, from templates to APIs: A Platform Engineering Story",
    event: "PlatformCon 2025",
    date: "2025-06-23T00:00:00Z",
    description:
      "A look back at our journey around infrastructure provisioning, from re-usable building blocks to a pure Platform Engineering approach.",
    imageUrl: "/pcon25.png",
    tags: ["Terraform", "Infrastructure as Code", "Cloud Native", "Platform Engineering"],
  },
];
