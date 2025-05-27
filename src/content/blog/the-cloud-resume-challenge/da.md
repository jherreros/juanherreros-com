
---
title: Start på Cloud Resume Challenge
slug: "the-cloud-resume-challenge"
date: "2020-08-30"
author: Juan Herreros Elorza
excerpt: Jeg har besluttet at starte Cloud Resume Challenge, og denne hjemmeside er resultatet af det.
tags: ["Cloud", "Infrastructure", "Challenge", "Project"]
---

Velkommen til min blog!

Jeg havde tænkt i lang tid, at det ville være interessant at have en personlig hjemmeside. Samtidig ville jeg også gerne have et sideprojekt, hvor jeg kunne lege med nogle teknologier, der ikke er dem, jeg bruger på arbejdet hver dag.

For et par uger siden, mens jeg læste nogle indlæg på [dev.to](http://dev.to), stødte jeg på [Cloud Resume Challenge](https://cloudresumechallenge.dev/instructions/).

Det blev oprindeligt foreslået af [Forrest Brazeal](https://forrestbrazeal.com/), som også tilbød sin hjælp til folk, der tog udfordringen og søgte job. Selvom det ikke er min hensigt, finder jeg stadig udfordringen særligt interessant, da den vil give mig mulighed for at opfylde de 2 mål, jeg har haft et stykke tid: at få en personlig hjemmeside og praktisk erfaring med nye værktøjer og teknologier.

#### Første skridt

Jeg begyndte at lede efter HTML-skabeloner til et CV, og jeg var klar til at uploade en af dem som en første, meget simpel version af sitet. Men så opdagede jeg [Gatsby](https://www.gatsbyjs.com/), et React-baseret open source framework, som gør det muligt for mig at få en mere komplet hjemmeside, der ikke kun indeholder Curriculum Vitae, men også bloggen du læser lige nu (samt andet indhold, der måske kommer senere).

Gatsby tilbyder en masse [starters](https://www.gatsbyjs.com/starters/?v=2), skabeloner der allerede ser ret professionelle ud. Jeg tog en af dem, beregnet til en [minimalistisk-stil](https://www.gatsbyjs.com/starters/LekoArts/gatsby-starter-minimal-blog/) blog, udviklet af [@LekoArts](https://github.com/LekoArts).

#### Publicering af sitet

Efter de oprindelige instruktioner til udfordringen bruger jeg [Amazon Web Services (AWS)](https://aws.amazon.com/) som min cloud provider.
Dette er også særligt interessant for mig, fordi jeg arbejder på Azure, så dette er en interessant måde at få praktisk erfaring på en anden cloud.

Til den første deployment brugte jeg følgende tjenester, konfigurerede dem alle fra webkonsollen:

- [S3](https://aws.amazon.com/s3/), til at hoste den statiske hjemmeside
- [Certificate Manager](https://aws.amazon.com/certificate-manager/), til at levere SSL-certifikaterne brugt i HTTPS-forbindelsen til sitet
- [CloudFront](https://aws.amazon.com/cloudfront/), til at tilbyde HTTPS-forbindelse (også for at give adgang til sitet over et CDN)
- [Route 53](https://aws.amazon.com/route53/), en DNS-tjeneste til at pege mit eget domæne til det, der leveres af CloudFront

Dette løser allerede punkterne 2, 3, 4, 5 og 6 af [udfordringen](https://cloudresumechallenge.dev/instructions/). I tilfælde af at du undrer dig, har jeg ikke til hensigt at opfylde det første krav på kort sigt, men jeg har nogle [Azure-certificeringer](https://www.youracclaim.com/users/juan-herreros-elorza/badges).

Instruktionerne jeg fulgte for at deploye sitet var dem, der blev leveret på [Gatsbys egen hjemmeside](https://www.gatsbyjs.com/docs/deploying-to-s3-cloudfront/), samt et [fantastisk blog indlæg](https://blog.joshwalsh.me/aws-gatsby/) af Joshua Walsh.

For at opsummere, først lavede jeg en bucket på **S3**, derefter installerede jeg **AWS CLI** og Gatsby pluginet til at deploye til S3, og endelig deployede jeg sitet fra kommandolinjen. Senere anmodede jeg om SSL **certifikaterne** og brugte dem til at få en **CloudFront** distribution pegende på min S3 bucket. Når alt det virkede, oprettede jeg en DNS zone på **Route 53** og en record for mit domæne.

Og det var det! Med alt det er jeg i stand til at levere dette site til dig. Det næste skridt vil være at [versionskontrollere](https://git-scm.com/book/en/v2/Getting-Started-About-Version-Control) koden og deploye en CI/CD pipeline, så mit site bliver opdateret hver gang jeg poster ændringer til det. Jeg gætter på at [Joshuas indlæg](https://blog.joshwalsh.me/aws-gatsby/) igen vil være til stor hjælp i den opgave.
Jeg vil give detaljerne om den del af projektet i mit næste blog indlæg.

Tak for at læse indlægget! Jeg håber du har kunnet lide det, og jeg ser frem til at bringe dig det næste :)
