---
title: Bygning af Mini-Atlas: En skaleret-ned Internal Developer Platform
slug: "building-mini-atlas"
date: "2025-07-07"
author: Claude
excerpt: En forenklet version af vores produktions Internal Developer Platform til læring og eksperimentering
tags: ["Platform Engineering", "Internal Developer Platform", "Kubernetes"]
---

På Banking Circle kører vi Atlas, vores Internal Developer Platform som gør det muligt for udviklere at oprette og administrere deres cloud-native applikationer og infrastruktur. Selvom Atlas fungerer godt i produktion, ønskede jeg ofte en simplere, mere tilgængelig version til eksperimentering, læring og til at forstå platform-koncepter mere dybt.

Sådan blev Mini-Atlas født – et personligt projekt som fanger essensen af det, der gør Atlas værdifuld, mens det er simpelt nok til at køre lokalt og forstå fuldstændigt.

### Udfordringen med produktions-platforme

Produktions-platforme er komplekse af nødvendighed. De skal håndtere enterprise-grade sikkerhed, multi-tenancy, høj tilgængelighed, disaster recovery og utallige andre krav som kommer med at køre kritiske workloads. Denne kompleksitet, selvom den er essentiel, skaber barrierer:

- **Onboarding friktion**: Nye team medlemmer har brug for uger til at forstå hvordan alt hænger sammen
- **Eksperimenterings overhead**: Test af nye koncepter kræver navigation gennem lag af enterprise tooling
- **Læringskurve**: Forståelse af platform koncepter betyder at kæmpe gennem komplekse tools

Jeg havde brug for noget som bevarede de arkitektoniske mønstre og abstraktioner fra Atlas, men fjernede enterprise kompleksiteten som gør det svært at forstå hurtigt.

### Hvad gør en god platform abstraktion

Gennem bygning af Atlas har jeg lært at effektive platform abstraktioner skal:

- **Skjule kompleksitet uden at ofre kraft**: Udviklere skal ikke behøve at forstå Kubernetes YAML for at deploye en applikation, men de skal kunne tilgå avancerede funktioner når det er nødvendigt
- **Give klare grænser**: Hver abstraktion skal have et veldefineret scope og ansvar
- **Muliggøre self-service**: Teams skal kunne oprette alt hvad de har brug for uden handoffs
- **Håndhæve best practices**: Sikkerhed, networking og operationelle bekymringer skal være indbygget, ikke valgfrit

Mini-Atlas indeholder disse principper gennem fire nøgle-abstraktioner:

### Abstraktionerne

**Workspaces** giver isolerede tenant miljøer. Når du opretter en workspace, får du en namespace med network policies for isolering og naming conventions håndhævet gennem Kyverno policies. Det er fundamentet som alt andet bygger på.

**WebApplications** håndterer det almindelige tilfælde med at deploye containeriserede applikationer. Bag scenerne opretter dette en Deployment, Service og Ingress, men udviklere behøver kun at specificere deres image, ønskede replicas og hostname.

**Infrastructure** opretter backing services som PostgreSQL databaser og Redis caches. Abstraktionen håndterer cluster setup, credential management og service discovery automatisk.

**Topics** opretter Kafka topics på en delt message bus med passende partitioning og retention policies. Teams får messaging capabilities uden at skulle forstå den underliggende Kafka konfiguration.

### Arkitekturen

Mini-Atlas følger den samme [layered approach](https://juanherreros.com/platform-layers/) som vores produktions platform:

**Core Layer** giver fundamentet – en Kind cluster med Cilium networking, Strimzi for Kafka, CloudNativePG for PostgreSQL og andre essentielle komponenter. Dette er "posen af tools" som driver alt andet.

**Foundation Layer** strukturerer disse tools til sammenhængende miljøer. Ved at bruge KRO (Kubernetes Resource Orchestrator) definerer jeg hvordan high-level abstraktioner mapper til low-level Kubernetes resources. Når nogen opretter en Workspace, orkestrerer KRO oprettelsen af namespaces, network policies og governance regler.

**Delivery Layer** gør det muligt for teams at deploye deres applikationer gennem simple, deklarative interfaces. I min [tidligere skrivning om platform layers](https://juanherreros.com/platform-layers/) beskrev jeg hvordan Foundation layer giver tenant miljøet og Delivery layer håndterer applikations deployment. I Mini-Atlas har jeg udvidet denne approach ved at inkorporere infrastruktur og messaging elementer som yderligere abstraktioner som teams kan consume sammen med deres applikationer.

### Hvad vi lærte

Bygning af Mini-Atlas forstærkede flere indsigter fra min platform engineering rejse:

**Abstraktioner er sværere end de ser ud**: At skabe det rigtige niveau af abstraktion – kraftfuld nok til at være nyttig, simpel nok til at være tilgængelig – kræver dyb forståelse af både den underliggende teknologi og brugerbehov.

**GitOps skaler ned godt**: Selv i dette forenklede miljø giver brugen af FluxCD for konfigurationsstyring de samme fordele som vi ser i produktion: auditability, rollback capabilities og deklarativ konfiguration.

**Developer experience betyder mere end feature completeness**: Mini-Atlas har færre capabilities end Atlas, men den streamlinede oplevelse gør det mere tilgængeligt for læring og eksperimentering.

**Lokal udvikling frigør eksperimentering**: At kunne spinde hele platformen op lokalt på minutter fjerner barrierer for at prøve nye approaches og forstå system adfærd.

### Forskellen fra produktion

Mini-Atlas udelader bevidst mange enterprise krav:

- **Single cluster vs. multi-cluster**: Produktions Atlas spænder over multiple clusters på tværs af regioner
- **Forenklet networking**: Ingen service mesh, avanceret traffic management eller komplekse ingress konfigurationer  
- **Basis sikkerhed**: Network policies og naming conventions snarere end omfattende enterprise sikkerhedskontroller
- **Lokal storage**: Ingen distribueret storage, backup strategier eller disaster recovery
- **Forenklede abstraktioner**: KRO håndterer resource orchestration i stedet for de mere komplekse custom operators brugt i produktion

Disse forenklinger gør Mini-Atlas uegnet til produktionsbrug, men perfekt til læring, eksperimentering og forståelse af platform koncepter.

### Fremadrettet

Mini-Atlas er blevet et værdifuldt tool for min fortsatte læring og eksperimentering. Jeg bruger det til at prototype nye abstraktioner og teste arkitektoniske ændringer. Og det fungerer som en reference implementation for teams på andre organisationer som bygger deres egne platforme.

Projektet forstærker min tro på at de bedste platforme skjuler kompleksitet bag simple, kraftfulde abstraktioner. Nogle gange er det mest værdifulde du kan bygge ikke den mest feature-complete version, men den som gør de underliggende koncepter krystalklare.

Uanset om du bygger din første platform eller forfiner en eksisterende, vil jeg opfordre dig til at overveje at skabe din egen "mini" version. Øvelsen med at fjerne kompleksitet mens man bevarer essentielle mønstre afslører ofte indsigter som forbedrer både dine forenklede og produktions platforme.

Du kan finde Mini-Atlas på [GitHub](https://github.com/jherreros/mini-atlas) – jeg vil gerne høre om dine erfaringer med at bygge med det eller skabe dine egne platform abstraktioner.