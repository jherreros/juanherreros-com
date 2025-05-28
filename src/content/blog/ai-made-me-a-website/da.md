---
title: AI lavede en hjemmeside til mig
slug: "ai-lavede-en-hjemmeside-til-mig"
date: "2025-05-24"
author: Juan Herreros Elorza
excerpt: Jeg har redesignet denne hjemmeside med hjælp fra et AI-værktøj
tags: ["AI", "LLM", "Web"]
---

Jeg har haft denne hjemmeside til at vedligeholde mit CV og en lille blog, siden jeg først byggede den for næsten fem år siden, som en del af [Cloud Resume challenge](https://juanherreros.com/blog/the-cloud-resume-challenge). Bortset fra at tilføje nogle få indlæg og talks, havde jeg ikke lavet mange ændringer til den, så jeg tænkte, det var tid til et nyt look.

Jeg kiggede på nye Gatsby-skabeloner samt andre frameworks, som Hugo. Men så tænkte jeg: Hvad nu hvis jeg i stedet for at bruge en skabelon, bare bruger en LLM-baseret service? Trods alt er det at skabe en statisk hjemmeside en ret simpel opgave, og idéen om at fortælle en AI at ændre dette eller hint element, og se det ændre sig uden at skulle igennem alt det bøvl selv, lød meget tiltalende.

Så jeg begyndte at "vibe code". Jeg besluttede at bruge [Lovable](https://lovable.dev/), fordi jeg finder, at det giver den bedste brugeroplevelse (i hvert fald blandt dem, jeg har prøvet), og fordi det forsøger at rette fejl uden at tælle dem som prompts (du får 5 gratis prompts om dagen, så det er meget praktisk). Og hey, det er europæisk (baseret i Stockholm).

Dette var mit indledende prompt:

```
Jeg vil gerne lave min personlige hjemmeside. Jeg er en Platform Engineer, nu blevet Engineering Manager, og jeg vil gerne vise, hvad jeg kan til alle, der vil tjekke det ud.

Hjemmesiden vil blive hostet på juanherreros.com, og bør inkludere (mindst):

- En blog
- En side, der viser de talks, jeg har holdt ved forskellige begivenheder i de seneste år, inklusive videoer hvor tilgængelige (måske et billede for dem, jeg ikke har video af)
- Mit CV
- Links til mine GitHub og LinkedIn profiler
- Alt andet, du måtte anse for nødvendigt/relevant

Siden bør have et moderne look, bruge grønne nuancer og have lys/mørke tilstande.

Jeg skal kunne nemt redigere CV'et, bloggen osv. ved kun at bruge markdown. Det ville være fantastisk, hvis jeg også kan tilføje flere sektioner på en simpel måde.
```

Dette var det indledende resultat (som du kan se, ligner det allerede meget den endelige version):

![New web](/new-web.png)

Det inkluderede endda nogle talks, det fandt på YouTube, opfandt et CV, skrev nogle blogindlæg... bare med et prompt så det ret godt ud! Jeg var ikke særlig tilfreds med den mørke tilstand dog, og jeg var i stand til at forfine den ved at give den et screenshot af en hjemmeside, som brugte den palette, jeg mere eller mindre ledte efter. Den forstod billedet og ændrede farverne i min mørke tilstand. Jeg var meget, meget tilfreds med AI hjemmeside-byggerens indtil her.

På det tidspunkt havde jeg brug for nogle mindre ændringer, men jeg tænkte, jeg var klar til at bringe det rigtige indhold fra min hjemmeside til min nye version af den. Jeg forbandt Lovable til GitHub og begyndte at gøre det, og det var da, jeg bemærkede noget mærkeligt: Jeg tilføjede mine markdown-filer med indholdet af min blog, jeg havde fjernet dem, som LLM'en havde skrevet... og alligevel var dem, der blev vist, de gamle indlæg. Jeg begyndte at undersøge, hvordan det kunne ske (ved at kigge på kildekoden, så det er nok rimeligt at sige, at på dette tidspunkt stoppede jeg med at vibe code), og jeg bemærkede, at AI'en snød: Den havde introduceret indholdet af de 3 blogindlæg, den havde skrevet som markdown-filer, men de blev slet ikke brugt. I stedet var indholdet af dem blevet duplikeret, ord for ord, i en anden fil.

Så jeg prøvede at fikse det:

```
Indholdet af bloggen bliver ikke hentet fra markdown-filerne i src/content/blog, men snarere fra src/data/blogPosts.ts. Fiks det, så kilden til sandhed er src/content/blog mappen.

Jeg vil også gerne kunne skrive CV'et i markdown.
```

Nu viste det sig at være en meget mere udfordrende opgave for AI'en. De næste få iterationer kunne ikke engang bygge, og jeg fandt mig selv i at klikke på "Fiks det" knappen igen og igen, håbende på det bedste. Til sidst lykkedes det mig, og det, der hjalp her, var at kigge på fejlene individuelt, i stedet for at bede den om at fikse dem alle på én gang.

Men selv da hjemmesiden var funktionel igen, kunne jeg stadig ikke få indholdet af mine blogindlæg vist korrekt. Nu er dette nok en værre situation at være i, fordi siden dette er ukorrekt funktionalitet, men ikke en fejl fra koden, tæller hvert forsøg på at fikse det som et prompt (og igen, i den gratis plan får jeg kun 5 om dagen, så de er meget knappe).

Det tog et stykke tid, men til sidst fik jeg den til at indlæse alt indholdet fra de markdown-filer, for bloggen og CV'et. Jeg fik den også til at fikse nogle andre mindre problemer, jeg fandt. Nogle gange fandt jeg mig selv i at give den flere ting at fikse på én gang, hvilket nok ikke hjalp... men jeg prøvede at få mest muligt ud af de 5 daglige prompts. For eksempel:

```
Der er 3 fejl:

1. På alle blogindlæg vises datoer som i dag - Datoen angivet i markdown'en indlæses ikke korrekt
2. Tags indlæses ikke (i hvert fald ikke vist) for blogindlæg
3. På forsiden viser "seneste talks" sektionen de 2 ældste talks i stedet for de 2 nyeste
```

Alt i alt var oplevelsen sjov! Der er nogle dele af det, der føltes frustrerende, og hvor jeg måtte kigge på kildekoden, men for det meste var AI i stand til at bygge det site, jeg ønskede, bare ved at følge mine prompts. Igen, dette er bare en meget simpel statisk hjemmeside, så jeg forbliver lidt skeptisk over for muligheden for vibe coding af noget større, i hvert fald muligheden for at gøre det fra bare en af disse services.

For de mere komplekse tilfælde er vejen frem sandsynligvis at kombinere disse med forskellige modeller eller værktøjer, men selv da tror jeg, det kan tage et stykke tid, før vi bare har brug for prompts.

Tak for at læse indlægget, jeg håber, du fandt det interessant!