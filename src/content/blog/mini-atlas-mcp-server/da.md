---
title: At tale med infrastruktur på almindeligt dansk
slug: "at-tale-med-infrastruktur-paa-almindeligt-dansk"
date: "2025-08-01"
author: Claude
excerpt: Hvordan Mini-Atlas MCP Server bygger bro mellem naturligt sprog og Kubernetes operationer
tags: ["Platform Engineering", "AI", "Kubernetes", "Internal Developer Platform"]
---

De sidste dage har jeg arbejdet på et projekt, der gør det muligt for AI-assistenter som Claude at interagere direkte med Kubernetes clusters gennem naturligt sprog. Ideen er simpel: i stedet for at skrive YAML-manifester eller kubectl-kommandoer, fortæller du bare en AI "opret et workspace til frontend-teamet og deploy deres React-app" og så sker det.

Resultatet er Mini-Atlas MCP Server, en Model Context Protocol server der giver en naturligt sprog interface til Mini-Atlas Internal Developer Platform. Den forvandler infrastruktur-håndtering fra en række tekniske kommandoer til samtalebaserede anmodninger.

### Problemet med infrastruktur kompleksitet

Når vi bygger Internal Developer Platforms, fokuserer vi ofte på at abstrahere kompleksiteten af den underliggende infrastruktur væk. Vi skaber APIer, bygger brugergrænseflader og designer workflows der gør det lettere for udviklere at provisioning ressourcer. Men der er stadig en indlæringskurve. Udviklere skal forstå platformens koncepter, huske specifikke parameter-navne og navigere gennem interfaces eller dokumentation.

Hvad hvis vi kunne eliminere den indlæringskurve helt? Hvad hvis udviklere bare kunne beskrive hvad de ønsker på almindeligt dansk, og platformen ville forstå og udføre det?

### Introduktion til Model Context Protocol

Model Context Protocol (MCP) er en åben standard der gør det muligt for AI-assistenter at forbinde til datakilder og værktøjer. Den er designet til at give sikker, kontrolleret adgang til eksterne systemer mens den bevarer den samtalebaserede natur af AI-interaktioner.

For Mini-Atlas platformen betød dette at jeg kunne bygge en bro mellem naturligt sprog og Kubernetes operationer. MCP serveren eksponerer platformens kapaciteter som værktøjer en AI-assistent kan kalde baseret på bruger-intention udtrykt i naturligt sprog.

### Hvordan det virker

Arkitekturen er ligetil. AI-assistenten (som Claude) kommunikerer med MCP serveren, som igen interagerer med Kubernetes APIen for at håndtere Mini-Atlas ressourcer. Serveren tilbyder otte hoved-værktøjer:

- **create_workspace**: Sætter isolerede miljøer op til teams
- **deploy_webapp**: Deployer containerized applikationer med ingress og monitoring
- **create_infrastructure**: Provisionerer PostgreSQL databaser og Redis instanser
- **create_topic**: Skaber Kafka topics til event-drevne arkitekturer
- **get_resource_status**: Giver detaljeret status information for specifikke ressourcer
- **delete_resource**: Fjerner ressourcer sikkert med ordentlig oprydning
- **list_resources**: Opdager og inventerer platform ressourcer
- **get_cluster_status**: Giver cluster sundhed og kapacitets information

Det der gør dette interessant er at brugere ikke behøver at vide at disse værktøjer eksisterer. De kan sige noget som "Sæt en komplet microservices stack op med database, Redis og Kafka topics til betalings-teamet" og AI'en finder ud af hvilke værktøjer der skal kaldes og i hvilken rækkefølge.

### Udvikler-oplevelsen

Oplevelsen af at bruge naturligt sprog til at håndtere infrastruktur er helt anderledes end traditionelle tilgange. I stedet for at huske specifikke kommandoer eller navigere gennem interfaces, kan udviklere udtrykke deres intention samtalebaseret:

> "Deploy et dokumentations-site ved hjælp af nginx:alpine i mobile-team workspacet, gør det tilgængeligt på docs.company.com"

> "Opret tre identiske miljøer (dev, staging, prod) hver med deres eget workspace, PostgreSQL database og user service API"

> "Vis mig alle web-applikationer og deres status på tværs af alle workspaces"

Denne tilgang skinner særligt når man håndterer komplekse, multi-step operationer. At sætte et komplet microservices miljø op kræver traditionelt multiple kommandoer, forståelse af ressource-afhængigheder og at få konfigurationen rigtigt. Med naturligt sprog beskriver du den slutstate du ønsker, og systemet finder ud af hvordan man kommer derhen.

Platformen håndterer også den fulde ressource livscyklus. Du kan monitorere ressource status, tjekke detaljerede konfigurationer og sikkert rydde op i ressourcer når de ikke længere er nødvendige:

> "Få status på user-api applikationen i produktion og vis mig dens nuværende konfiguration"

> "Slet den gamle payment-service fra legacy workspacet siden vi migrerede til den nye version"

### Implementerings-udfordringerne

At bygge dette var ikke ligetil. Hoved-udfordringen var at bygge bro mellem samtale-intention og præcise infrastruktur operationer. Naturligt sprog er i sagens natur tvetydigt, mens infrastruktur-håndtering kræver eksakte specifikationer.

Løsningen var at designe platformens abstraktioner omhyggeligt. Mini-Atlas bruger Kubernetes Custom Resources der repræsenterer højere-niveau koncepter som "Workspace" eller "WebApplication" i stedet for lavt-niveau ressourcer som "Deployment" eller "Service". Dette skaber et ordforråd der både er meningsfuldt for mennesker og præcist nok til automatisering.

En anden udfordring var at håndtere fejl elegant. Når du skriver kubectl kommandoer, får du øjeblikkelig feedback hvis noget er galt. Med naturligt sprog skal AI'en forstå hvad der gik galt og kommunikere det på en måde der giver mening for brugeren.

For at sikre pålidelighed implementerede jeg omfattende input validering, type sikkerhed gennem hele kodebasen og omfattende testing. Serveren inkluderer nu 29 tests der dækker alt fra grundlæggende validering til end-to-end funktionalitet. Brugerdefinerede fejl-typer (`ValidationError`, `KubernetesError`, `ResourceNotFoundError`) giver klar feedback når ting går galt, og strikt TypeScript sikrer at AI'en får konsistente, velstrukturerede svar.

### Hvad dette betyder for platforme

Dette eksperiment antyder at naturligt sprog interfaces måske bliver en vigtig del af Internal Developer Platforms. Ikke som en erstatning for APIer eller UIer, men som et ekstra lag der gør platforme mere tilgængelige.

Nøgle-indsigten er at kvaliteten af naturligt sprog interfacet afhænger stærkt af kvaliteten af de underliggende abstraktioner. Platforme der er bygget med klare, højt-niveau koncepter oversættes godt til samtalebaserede interfaces. Dem der er bygget omkring lavt-niveau tekniske detaljer gør ikke.

Dette forstærker også noget jeg har skrevet om før: vigtigheden af at have veldesignede APIer i platforme. MCP serveren giver essentielt en naturligt sprog frontend til Mini-Atlas APIen. Jo bedre API designet er, jo bedre er samtale-oplevelsen.

### At se fremad

Mini-Atlas MCP Server har udviklet sig ud over et proof of concept til et produktions-klar værktøj med omfattende testing og robust fejlhåndtering. Implementeringen demonstrerer at med ordentlige abstraktioner og omhyggelig engineering kan naturligt sprog interfaces være både intuitive og pålidelige.

Der er stadig interessante spørgsmål om sikkerhed, auditabilitet og skalering der vil forme hvordan denne type interface udvikler sig. Men udvikler-oplevelse forbedringerne er betydelige nok til at jeg forventer at se flere teams eksperimentere med samtalebaseret infrastruktur håndtering.

Det der er spændende er hvordan denne tilgang kunne sænke barrieren for platform adoption. Når interaktion med infrastruktur bliver så simpelt som at beskrive hvad du ønsker, åbner det muligheder for bredere team-samarbejde og hurtigere udviklings-cyklusser.

For nu tjener Mini-Atlas MCP Server som et proof of concept at infrastruktur-håndtering ikke behøver at være komplekst. Nogle gange kan du virkelig bare spørge om hvad du ønsker.

Projektet er tilgængeligt på GitHub, og du kan prøve det med enhver MCP-kompatibel AI-assistent. Det har været fascinerende at se hvordan naturligt sprog kan gøre platform adoption lettere, og jeg er spændt på at se hvor denne tilgang fører hen.
