
---
title: Backend'en
slug: "the-backend"
date: "2020-09-28"
author: Juan Herreros Elorza
excerpt: Denne hjemmeside har nu en backend, der server en besøgstæller
tags: ["Cloud", "Infrastructure", "Challenge", "Project", "AWS"]
---

Velkommen til et nyt indlæg på min blog!

Denne gang skriver jeg om, hvordan jeg har skabt en backend til denne hjemmeside, inklusiv en database, en lambda-funktion og en API, som jeg kalder fra frontend'en.
Desuden er alt dette fuldstændigt automatiseret og versionskontrolleret, så det kan deployes og opdateres på en kontrolleret, gentagelig måde.

#### Arkitekturen

![Billede](/arch.png)

Frontend'en af denne hjemmeside, som beskrevet i de tidligere blog indlæg, består af:
- En [S3](https://aws.amazon.com/s3/) bucket, som hoster det statiske site genereret med Gatsby
- En [CloudFront](https://aws.amazon.com/cloudfront/) distribution, der server og sikrer sitet gemt i bucket'en
- En [Route 53](https://aws.amazon.com/route53/) DNS zone med en domæne record for at give adgang til dette site på mit tilpassede domæne

Til den frontend har jeg nu tilføjet:
- En [DynamoDB](https://aws.amazon.com/dynamodb/) tabel, der hoster antallet af besøgende
- En [Lambda](https://aws.amazon.com/lambda/) funktion, der læser og opdaterer den DynamoDB tabel
- En [API Gateway](https://aws.amazon.com/api-gateway/), der eksponerer Lambda funktionen
- En DNS record for API gateway'en, for at den kan være tilgængelig på et kendt endpoint

Front- og backend'en kommunikerer over denne API, som kaldes fra en [React](https://reactjs.org/) komponent, som derefter viser antallet af besøg til læserne, der tilgår hjemmesiden.

#### Den Lambda-baserede API

Som beskrevet før, er hovedkomponenten i backend'en en Lambda funktion. Dette er en meget interessant type [serverless computing](https://en.wikipedia.org/wiki/Serverless_computing), hvor jeg kun skal bekymre mig om at skrive koden til selve funktionen, men ikke om at hoste eller serve den. Lambda funktionen:
1. Modtager anmodningen fra API gateway'en, inklusiv detaljerne der måtte være inkluderet i den anmodning, såsom:
    - Bruger id'et, inkluderet i URL'en. På dette tidspunkt bruger jeg bare "default" for alle brugere, men API koden er forberedt på at gemme antallet af besøg fra hver individuel bruger.
    - En API nøgle, sendt som en header
1. Forespørger tabellen for at opdatere og få antallet af besøg. Hvis der ikke er registreret besøg, så opretter den recorden
1. Returnerer det opdaterede antal besøg

For at teste at API'en virker, har jeg også inkluderet nogle [unit tests](https://en.wikipedia.org/wiki/Unit_testing) for lambda funktionen.

#### Infrastructure as Code: SAM

Hele implementeringen af backend'en er beskrevet som kode i et sprog leveret af AWS, som kaldes [Serverless Application Model](https://aws.amazon.com/serverless/sam/).
Dette giver mig mulighed for at undgå at skulle konfigurere alle tjenesterne i konsol UI'en, og i stedet bare køre en kommando for at deploye hele backend stacken.

Dette er utroligt nyttigt, fordi det giver mig mulighed for at opdatere eller gendeploye alle tjenesterne på et øjeblik. Oven i det er al konfigurationen for alle de tjenester, jeg bruger, på samme sted og derfor lettere at administrere. Plus, jeg har det versionskontrolleret, så jeg kan holde styr på de ændringer, jeg har lavet til min infrastruktur.

#### Brug af hemmeligheder

Jeg bruger også nogle hemmeligheder i mine [CodeBuild](https://aws.amazon.com/codebuild/) pipelines nu. Jeg gemmer dem i [Parameter Store](https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html) af AWS [Systems Manager](https://aws.amazon.com/systems-manager/). På denne måde undgår jeg at have følsom information på mine offentlige GitHub repositories. I stedet for det har jeg nogle placeholder strenge, som jeg erstatter som en del af min pipeline.

Med dette dækker jeg alle de resterende punkter af [Cloud Resume Challenge](https://cloudresumechallenge.dev/instructions/), som var 7, 8, 9, 10, 11, 12 og 14. Så jeg betragter det som fuldført! Det var virkelig en god læringsoplevelse :)

Ikke desto mindre er der nogle funktionelle og tekniske forbedringer, som jeg har i tankerne for dette site, og jeg vil fortsætte med at skrive om dem på denne blog, når jeg inkluderer dem på siden.

Som altid håber jeg, at du har kunnet lide indlægget. Vi ses i det næste, og tak for at læse!
