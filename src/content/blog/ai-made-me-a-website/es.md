---
title: La IA me hizo una web
slug: "ai-made-me-a-website"
date: "2025-05-24"
author: Juan Herreros Elorza
excerpt: He rehecho esta web con la ayuda de una herramienta de IA
tags: ["AI", "LLM", "Web"]
---

He tenido esta web para mantener mi CV y un pequeño blog desde que la construí por primera vez hace casi cinco años, como parte del [Cloud Resume challenge](https://juanherreros.com/blog/the-cloud-resume-challenge). Aparte de añadir algunas entradas y charlas, no había hecho muchos cambios, así que pensé que era hora de darle un nuevo aspecto.

Estaba mirando nuevas plantillas de Gatsby así como otros frameworks, como Hugo. Pero entonces pensé: ¿Y si en lugar de usar una plantilla, simplemente uso un servicio basado en LLM? Después de todo, crear una web estática es una tarea bastante sencilla, y la idea de decirle a una IA que cambie este o aquel elemento, y verlo cambiar sin tener que pasar por todo ese lío yo mismo sonaba muy atractiva.

Así que empecé a hacer "vibe coding". Decidí usar [Lovable](https://lovable.dev/) porque me parece que ofrece la mejor experiencia de usuario (al menos entre las que he probado) y porque intenta arreglar errores sin contar esos como prompts (tienes 5 prompts gratis al día, así que eso es muy útil). Y oye, es europea (con sede en Estocolmo).

Este fue mi prompt inicial:

```
I want to create my personal website. I'm a Platform Engineer, now turned Engineering Manager, and I'd like to showcase what I can do to anyone that wants to check.

The website will be hosted at juanherreros.com, and should include (at least):

- A blog
- A page showing the talks I have delivered at different events in the last years, including videos where available (maybe a picture for those that I don't have a video)
- My CV
- Links to my GitHub and LinkedIn profiles
- Anything else you may deem necessary/relevant

The page should have a modern look, use shades of green and have light/dark modes.

I need to be able to easily edit the CV, blog, etc using only markdown. It would be great if I can add more sections in a simple way too.
```

Este fue el resultado inicial (como puedes ver, ya se parece mucho a la versión final):

![New web](/new-web.png)

Incluso incluyó algunas charlas que encontró en YouTube, inventó un CV, escribió algunas entradas de blog... ¡solo con un prompt, ya se veía bastante bien! Sin embargo, no estaba particularmente contento con el modo oscuro, y pude refinarlo pasándole una captura de pantalla de una web que estaba usando la paleta que más o menos buscaba. Entendió la imagen, y cambió los colores de mi modo oscuro. Estaba muy, muy contento con el constructor de webs con IA hasta aquí.

En ese momento, necesitaba algunos cambios menores, pero pensé que estaba listo para traer el contenido real de mi web a mi nueva versión. Conecté Lovable a GitHub y empecé a hacer eso, y fue entonces cuando noté algo extraño: estaba añadiendo mis archivos markdown con el contenido de mi blog, había eliminado los que había escrito el LLM... y aún así, los que se mostraban eran las entradas antiguas. Empecé a investigar cómo podía pasar eso (mirando el código fuente, así que probablemente sea justo decir en este punto que dejé de hacer vibe coding) y me di cuenta de que la IA estaba haciendo trampa: Había introducido el contenido de las 3 entradas de blog que había escrito como archivos markdown, pero esos no se usaban en absoluto. En su lugar, el contenido de esas había sido duplicado, textualmente, en un archivo diferente.

Así que intenté arreglar eso:

```
The content of the blog is not picked from the markdown files in src/content/blog, but rather from src/data/blogPosts.ts. Fix that so that the source of truth is the src/content/blog folder.

I also want to be able to write the resume in markdown.
```

Ahora, eso resultó ser una tarea mucho más desafiante para la IA. Las siguientes iteraciones ni siquiera podían compilar, y me encontré haciendo clic en el botón "Fix it" una y otra vez, esperando lo mejor. Finalmente, lo conseguí, y lo que ayudó aquí fue mirar los errores individualmente, en lugar de pedirle que los arreglara todos a la vez.

Sin embargo, incluso cuando la web era funcional de nuevo, aún no conseguía que el contenido de mis entradas de blog se mostrara correctamente. Ahora, esta es posiblemente una situación peor en la que estar, porque, como esta es funcionalidad incorrecta pero no un error del código, cada intento de arreglarlo cuenta como un prompt (y de nuevo, en el plan gratuito solo tengo 5 al día, así que son muy escasos).

Tardó un tiempo, pero finalmente conseguí que cargara todo el contenido de esos archivos markdown, para el blog y el CV. También conseguí que arreglara algunos otros problemas menores que encontré. A veces, me encontré dándole varias cosas para arreglar a la vez, lo que probablemente no ayudó... sin embargo intenté sacar el máximo partido de esos 5 prompts diarios. Por ejemplo:

```
There are 3 errors:

1. On all blog posts, dates are shown as today - The date indicated in the markdown is not correctly loaded
2. Tags are not loaded (at least not displayed) for blog posts
3. On the home page, the "recent talks" section displays the 2 oldest talks, instead of the 2 newest ones
```

En general, ¡la experiencia fue divertida! Hay algunas partes que se sintieron frustrantes y donde tuve que mirar el código fuente, pero en su mayor parte la IA fue capaz de construir la web que quería simplemente siguiendo mis prompts. De nuevo, esto es solo una web estática muy simple, así que mantengo cierto escepticismo sobre la viabilidad del vibe coding para cualquier cosa más grande, al menos la posibilidad de hacer eso desde solo uno de estos servicios.

Para esos casos más complejos, el camino a seguir es probablemente combinar estos con diferentes modelos o herramientas, pero aún así, creo que podría pasar un tiempo hasta que solo necesitemos prompts.

¡Gracias por leer la entrada, espero que la hayas encontrado interesante!
