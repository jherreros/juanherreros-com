
import { Talk } from "@/lib/types";

export const talks: Talk[] = [
  {
    title: "Self-service IaC @ Banking Circle",
    event: "DevOps Meetup, Copenhagen",
    date: "2022-11-10T00:00:00Z",
    description: {
      en: "An introduction to how Banking Circle went from a mostly manual approach to re-usable terraform modules for infrastructure provisioning.",
      es: "Una introducción a cómo Banking Circle pasó de un enfoque mayormente manual a módulos de terraform reutilizables para el aprovisionamiento de infraestructura.",
      da: "En introduktion til hvordan Banking Circle gik fra en mest manuel tilgang til genanvendelige terraform moduler til infrastruktur provisionering."
    },
    videoUrl: "https://www.youtube.com/watch?v=KnLCEtHkRa8",
    tags: ["Infrastructure as Code", "Automation", "Terraform"],
  },
  {
    title: "Self-service Infrastructure as Code: People, process, product",
    event: "HashiTalks 2023",
    date: "2023-02-16T00:00:00Z",
    description: {
      en: "A reflection of how an automated, repeatable approach drives benefits in both technical and non-technical areas.",
      es: "Una reflexión sobre cómo un enfoque automatizado y repetible genera beneficios tanto en áreas técnicas como no técnicas.",
      da: "En reflektion over hvordan en automatiseret, gentagelig tilgang driver fordele i både tekniske og ikke-tekniske områder."
    },
    videoUrl: "https://www.youtube.com/watch?v=_-mHscUXYZY",
    tags: ["Infrastructure as Code", "Automation", "Terraform", "Culture"],
  },
  {
    title: "Yes sir, I can GitOps! SDLC automation on a regulated industry",
    event: "PlatformCon 2023",
    date: "2023-06-09T00:00:00Z",
    description: {
      en: "A look into how we put in place an automated compliance solution in our pipelines and a GitOps solution for Feature Flags, within the regulations of our industry.",
      es: "Una mirada a cómo implementamos una solución de cumplimiento automatizada en nuestros pipelines y una solución GitOps para Feature Flags, dentro de las regulaciones de nuestra industria.",
      da: "Et kig på hvordan vi implementerede en automatiseret compliance-løsning i vores pipelines og en GitOps-løsning til Feature Flags, inden for vores industris reguleringer."
    },
    videoUrl: "https://www.youtube.com/watch?v=7P6IaysAiCM",
    tags: ["GitOps", "CI/CD", "Compliance", "Feature Flags"],
  },
  {
    title: "The 3 Layers of our Platform and Helmping Ourselves before helping others",
    event: "Cloud Native Copenhagen",
    date: "2024-05-21T00:00:00Z",
    description: {
      en: "A look into the structure of Banking Circle's Internal Developer Platform, and the open source tooling we have built for it.",
      es: "Una mirada a la estructura de la Plataforma Interna de Desarrolladores de Banking Circle, y las herramientas de código abierto que hemos construido para ella.",
      da: "Et kig på strukturen af Banking Circles Interne Udviklerplatform, og de open source værktøjer vi har bygget til den."
    },
    imageUrl: "/cncf-cph.png",
    tags: ["Kubernetes", "Open Source", "Cloud Native", "Platform Engineering"],
  },
  {
    title: "A Platform to run a Bank on, in 4 simple steps",
    event: "QCon London 2025",
    date: "2025-04-08T00:00:00Z",
    description: {
      en: "A quick overview of Banking Circle's Compute Platform, including its core and the abstraction layers exposed to our users.",
      es: "Una descripción rápida de la Plataforma de Cómputo de Banking Circle, incluyendo su núcleo y las capas de abstracción expuestas a nuestros usuarios.",
      da: "Et hurtigt overblik over Banking Circles Compute Platform, inklusive dens kerne og abstraktionslag eksponeret til vores brugere."
    },
    imageUrl: "/qcon.jpg",
    tags: ["Kubernetes", "Open Source", "Cloud Native", "Platform Engineering"],
  },
  {
    title: "Azure Landing Zones as a Service",
    event: "Azure Usergroup Denmark",
    date: "2025-02-05T00:00:00Z",
    description: {
      en: "An introduction to our single, simple, self-service interface to provision infrastructure resources.",
      es: "Una introducción a nuestra interfaz única, simple y de autoservicio para aprovisionar recursos de infraestructura.",
      da: "En introduktion til vores enkle, selvbetjente interface til at provisionere infrastruktur ressourcer."
    },
    imageUrl: "/azure-usergroup.jpg",
    tags: ["Azure", "Landing Zones", "Cloud Native", "Platform Engineering"],
  },
  {
    title: "Evolving Engineering at Banking Circle",
    event: "The Shortcu.tt podcast ",
    date: "2025-05-14T00:00:00Z",
    description: {
      en: "(Not a talk as such) I was a guest in the podcast The Shortcu.tt, where I talked about our journey in Banking Circle",
      es: "(No es una charla como tal) Fui invitado en el podcast The Shortcu.tt, donde hablé sobre nuestro viaje en Banking Circle",
      da: "(Ikke et foredrag som sådan) Jeg var gæst i podcasten The Shortcu.tt, hvor jeg talte om vores rejse i Banking Circle"
    },
    videoUrl: "https://www.youtube.com/watch?v=i8EGSQcg0aY",
    tags: ["Podcast", "Culture", "Cloud Native", "Platform Engineering"],
  },
  {
    title: "Infrastructure as code, from templates to APIs: A Platform Engineering Story",
    event: "PlatformCon 2025",
    date: "2025-06-23T00:00:00Z",
    description: {
      en: "A look back at our journey around infrastructure provisioning, from re-usable building blocks to a pure Platform Engineering approach.",
      es: "Una mirada retrospectiva a nuestro viaje alrededor del aprovisionamiento de infraestructura, desde bloques de construcción reutilizables hasta un enfoque puro de Platform Engineering.",
      da: "Et tilbageblik på vores rejse omkring infrastruktur provisionering, fra genanvendelige byggeklodser til en ren Platform Engineering tilgang."
    },
    imageUrl: "/pcon25.png",
    tags: ["Terraform", "Infrastructure as Code", "Cloud Native", "Platform Engineering"],
  },
];
