
---
title: Automatisering af deployment
slug: "automating-the-deployment"
date: "2020-09-06"
author: Juan Herreros Elorza
excerpt: Jeg har uploadet koden til et VCS og har oprettet en pipeline til at automatisere deployment af hjemmesiden.
tags: ["Cloud", "Infrastructure", "Challenge", "Project"]
---

Velkommen til et nyt indlæg på bloggen!

I dag vil jeg fortælle dig om, hvordan jeg har formået at lægge hjemmesidens kode på et [Version Control System (VCS)](https://git-scm.com/book/en/v2/Getting-Started-About-Version-Control).
Sammen med det har jeg sat en pipeline op, så hjemmesiden bliver automatisk deployeret hver gang jeg pusher nogle ændringer til dette VCS.

#### Versionskontrol af koden: Oprettelse af et GitHub repository

Pointen med at have min kode på et Version Control System er at have en registrering af hver ændring, som jeg introducerer til den kode.
Dette er nyttigt, for eksempel, hvis jeg vil tjekke hvornår jeg introducerede en bestemt ændring, eller hvis jeg vil tilbageføre den ændring, fordi den har introduceret en uønsket effekt eller har forårsaget at sitet er stoppet med at virke.

Jeg bruger [git](https://git-scm.com/) som mit VCS og [GitHub](https://github.com/) som host for repositoriet. Disse er de mest kendte og mest udbredte i deres respektive områder. GitHub er også særligt velegnet til open source projekter, hvilket er netop tilfældet med min hjemmeside.

Fordi det er et open source projekt, kan andre mennesker tage det, modificere det og bruge det i deres egne projekter. Det tillader mig også at modtage bidrag fra potentielt alle, for at forbedre noget om sitet eller for at inkludere nogle indlæg fra andre forfattere, for eksempel.

I tilfælde af at du er interesseret i at tjekke sidens kildekode, kan du finde den [her](https://github.com/jherreros/cloud-resume-challenge) eller i "GitHub" knappen i øverste højre hjørne.

#### Brug af en pipeline til at deploye sitet: AWS CodeBuild

En anden af de interessante muligheder, som opbevaring af koden på et repository tilbyder, er at den kan hentes derfra af tredjeparts værktøjer. Og disse værktøjer kan automatisk deploye hjemmesiden hver gang jeg uploader (pusher) nogle ændringer til repositoriet.

Dette betyder, at nu behøver jeg ikke manuelt at køre kommandoerne for at deploye hjemmesiden. I det øjeblik jeg pusher noget ind i repo'et, ved jeg at det vil blive deployeret.

Tjenesten jeg bruger til dette formål er [AWS CodeBuild](https://aws.amazon.com/codebuild/).
Der er mere komplicerede og sofistikerede måder at bygge en deployment pipeline på, såsom eksemplet præsenteret i [Joshua Walsh's blog indlæg](https://blog.joshwalsh.me/aws-gatsby/), som bruger [CodePipeline](https://aws.amazon.com/codepipeline/) ud over CodeBuild.
Men jeg ville holde det simpelt, og bare have en grundlæggende pipeline, der kører nogle npm kommandoer for mig. Jeg kan altid forbedre mit setup senere.

Lad os ikke glemme at jeg følger [Cloud Resume Challenge](https://cloudresumechallenge.dev/instructions/) som reference. Dette indlæg dækker punkterne 13 (VCS) og 15 (CI/CD for Frontend). Også, udviklingen indtil nu ville allerede være tilstrækkelig for en grundlæggende statisk hjemmeside, inklusive nogle sider og bloggen.
Men selvfølgelig vil jeg introducere nogle mere interessante funktioner og beskæftige mig med nogle tekniske ting, nemlig besøgstælleren nævnt i udfordringen.

Jeg håber du har kunnet lide indlægget! Tak for at læse det og jeg ser frem til at bringe dig det næste.
