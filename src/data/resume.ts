
import { ResumeSection } from "@/lib/types";

export const resumeSections: ResumeSection[] = [
  {
    title: "Experience",
    items: [
      {
        id: "exp1",
        title: "Engineering Manager",
        organization: "Tech Company Inc.",
        location: "Madrid, Spain",
        startDate: "2022-01",
        current: true,
        description:
          "Leading a team of platform engineers building developer productivity tools and infrastructure.",
        bullets: [
          "Grew the platform team from 4 to 10 engineers while maintaining high team cohesion and productivity",
          "Implemented an internal developer platform that reduced deployment time by 60%",
          "Established quarterly planning processes and improved cross-team collaboration",
          "Mentored 3 senior engineers in their path to technical leadership roles",
        ],
        skills: ["Leadership", "Agile", "Platform Engineering", "Mentorship"],
      },
      {
        id: "exp2",
        title: "Senior Platform Engineer",
        organization: "Tech Company Inc.",
        location: "Madrid, Spain",
        startDate: "2019-03",
        endDate: "2021-12",
        description:
          "Designed and built cloud infrastructure and developer tools for product engineering teams.",
        bullets: [
          "Led the migration from on-premises infrastructure to AWS, reducing operational costs by 30%",
          "Developed and maintained CI/CD pipelines serving 50+ engineering teams",
          "Implemented Kubernetes-based platform, improving resource utilization by 40%",
          "Created documentation and training materials for platform adoption",
        ],
        skills: [
          "Kubernetes",
          "AWS",
          "Terraform",
          "CI/CD",
          "Docker",
          "GitOps",
        ],
      },
      {
        id: "exp3",
        title: "DevOps Engineer",
        organization: "Previous Company LLC",
        location: "Barcelona, Spain",
        startDate: "2016-09",
        endDate: "2019-02",
        description:
          "Built and maintained CI/CD pipelines and cloud infrastructure.",
        bullets: [
          "Automated deployment processes, reducing release time from days to hours",
          "Implemented monitoring and alerting solutions using Prometheus and Grafana",
          "Collaborated with development teams to improve application reliability",
          "Containerized legacy applications to improve deployment consistency",
        ],
        skills: [
          "Linux",
          "Docker",
          "Jenkins",
          "AWS",
          "Monitoring",
          "Automation",
        ],
      },
    ],
  },
  {
    title: "Education",
    items: [
      {
        id: "edu1",
        title: "MSc in Computer Science",
        organization: "Universidad Politécnica de Madrid",
        location: "Madrid, Spain",
        startDate: "2014-09",
        endDate: "2016-06",
        description: "Specialized in Distributed Systems and Cloud Computing.",
        bullets: [
          "Master's thesis on distributed database optimization techniques",
          "Participated in international cloud computing research project",
        ],
        skills: ["Distributed Systems", "Cloud Computing", "Research"],
      },
      {
        id: "edu2",
        title: "BSc in Computer Engineering",
        organization: "Universidad Autónoma de Madrid",
        location: "Madrid, Spain",
        startDate: "2010-09",
        endDate: "2014-06",
        description: "Graduated with honors.",
        bullets: [
          "Completed internship at local tech startup",
          "Team lead for senior project on real-time data processing",
        ],
        skills: ["Computer Science", "Software Engineering"],
      },
    ],
  },
  {
    title: "Certifications",
    items: [
      {
        id: "cert1",
        title: "Certified Kubernetes Administrator (CKA)",
        organization: "Cloud Native Computing Foundation",
        startDate: "2021-03",
        endDate: "2024-03",
        description: "Industry-recognized certification for Kubernetes expertise.",
        skills: ["Kubernetes"],
      },
      {
        id: "cert2",
        title: "AWS Solutions Architect Professional",
        organization: "Amazon Web Services",
        startDate: "2020-06",
        endDate: "2023-06",
        description: "Advanced certification for AWS architecture skills.",
        skills: ["AWS", "Cloud Architecture"],
      },
      {
        id: "cert3",
        title: "Google Cloud Professional Cloud Architect",
        organization: "Google Cloud",
        startDate: "2022-02",
        endDate: "2025-02",
        description: "Expert-level certification for Google Cloud architecture.",
        skills: ["Google Cloud", "Cloud Architecture"],
      },
    ],
  },
];
