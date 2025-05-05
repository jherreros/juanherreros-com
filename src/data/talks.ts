
import { Talk } from "@/lib/types";

export const talks: Talk[] = [
  {
    id: "1",
    title: "Building Internal Developer Platforms",
    event: "KubeCon Europe 2023",
    date: "2023-04-19",
    description:
      "A deep dive into how to create effective internal developer platforms that boost productivity and standardize workflows across engineering teams.",
    videoUrl: "https://www.youtube.com/watch?v=example1",
    slides: "https://speakerdeck.com/example/internal-developer-platforms",
    tags: ["Platform Engineering", "Developer Experience", "Kubernetes"],
  },
  {
    id: "2",
    title: "From Engineer to Manager: The Transition Journey",
    event: "LeadDev London 2023",
    date: "2023-06-28",
    description:
      "Insights and practical advice on making the transition from a hands-on technical role to engineering management, including common challenges and strategies for success.",
    imageUrl: "/placeholder.svg",
    slides: "https://speakerdeck.com/example/engineer-to-manager",
    tags: ["Leadership", "Career Development", "Engineering Management"],
  },
  {
    id: "3",
    title: "GitOps in Practice: Real-world Implementation Patterns",
    event: "DevOpsDays Madrid 2022",
    date: "2022-10-15",
    description:
      "A practical look at implementing GitOps in enterprise environments, featuring case studies and lessons learned from real deployments.",
    videoUrl: "https://www.youtube.com/watch?v=example3",
    slides: "https://speakerdeck.com/example/gitops-in-practice",
    tags: ["GitOps", "CI/CD", "DevOps"],
  },
  {
    id: "4",
    title: "Kubernetes Cost Optimization Strategies",
    event: "Cloud Native Spain 2022",
    date: "2022-03-22",
    description:
      "Practical techniques for managing and optimizing Kubernetes costs in production environments, from resource requests to namespace budgets.",
    imageUrl: "/placeholder.svg",
    slides: "https://speakerdeck.com/example/k8s-cost-optimization",
    tags: ["Kubernetes", "Cost Optimization", "Cloud Native"],
  },
];
