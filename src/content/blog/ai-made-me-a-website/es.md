---
title: La IA me hizo una página web
slug: "la-ia-me-hizo-una-pagina-web"
date: "2025-05-24"
author: Juan Herreros Elorza
excerpt: He rehecho esta página web con la ayuda de una herramienta de IA
tags: ["IA", "LLM", "Web"]
---

He tenido esta página web para mantener mi CV y un pequeño blog desde que la construí por primera vez hace casi cinco años, como parte del [Cloud Resume challenge](https://juanherreros.com/blog/the-cloud-resume-challenge). Aparte de añadir algunas publicaciones y charlas, no había hecho muchos cambios, así que pensé que era hora de darle un nuevo aspecto.

Estaba mirando nuevas plantillas de Gatsby así como otros frameworks, como Hugo. Pero entonces pensé: ¿Y si en lugar de usar una plantilla, simplemente uso un servicio basado en LLM? Después de todo, crear una página web estática es una tarea bastante simple, y la idea de decirle a una IA que cambie este o aquel elemento, y verlo cambiar sin tener que pasar por toda esa molestia yo mismo sonaba muy atractiva.

Así que empecé a hacer "vibe coding". Decidí usar [Lovable](https://lovable.dev/) porque encuentro que proporciona la mejor experiencia de usuario (al menos entre los que he probado) y porque trata de arreglar errores sin contar esos como prompts (obtienes 5 prompts gratuitos al día, así que eso es muy útil). Y oye, es europeo (con sede en Estocolmo).

Este fue mi prompt inicial:

```
Quiero crear mi página web personal. Soy un Platform Engineer, ahora convertido en Engineering Manager, y me gustaría mostrar lo que puedo hacer a cualquiera que quiera ver.

La página web estará alojada en juanherreros.com, y debería incluir (al menos):

- Un blog
- Una página mostrando las charlas que he dado en diferentes eventos en los últimos años, incluyendo videos donde estén disponibles (tal vez una imagen para aquellas de las que no tengo video)
- Mi CV
- Enlaces a mis perfiles de GitHub y LinkedIn
- Cualquier otra cosa que puedas considerar necesaria/relevante

La página debería tener un aspecto moderno, usar tonos de verde y tener modos claro/oscuro.

Necesito poder editar fácilmente el CV, blog, etc usando solo markdown. Sería genial si puedo añadir más secciones de una manera simple también.
```

Este fue el resultado inicial (como puedes ver, ya se parece mucho a la versión final):

![New web](/new-web.png)

¡Incluso incluyó algunas charlas que encontró en YouTube, inventó un CV, escribió algunas publicaciones de blog... solo con un prompt, se veía bastante bien! Sin embargo, no estaba particularmente contento con el modo oscuro, y pude refinarlo pasándole una captura de pantalla de una página web que estaba usando la paleta que más o menos estaba buscando. Entendió la imagen y cambió los colores de mi modo oscuro. Estaba muy, muy contento con el constructor de páginas web con IA hasta aquí.

En ese punto, necesitaba algunos cambios menores, pero pensé que estaba listo para traer el contenido real de mi página web a mi nueva versión. Conecté Lovable a GitHub y empecé a hacer eso, y ahí fue cuando noté algo extraño: estaba añadiendo mis archivos markdown con el contenido de mi blog, había eliminado los que el LLM había escrito... y aún así, los que se mostraban eran las publicaciones antiguas. Empecé a investigar cómo podía pasar eso (mirando el código fuente, así que probablemente es justo decir que en este punto dejé de hacer vibe coding) y noté que la IA estaba haciendo trampa: había introducido el contenido de las 3 publicaciones de blog que había escrito como archivos markdown, pero esos no se usaban para nada. En su lugar, el contenido de esos había sido duplicado, palabra por palabra, en un archivo diferente.

Así que traté de arreglar eso:

```
El contenido del blog no se toma de los archivos markdown en src/content/blog, sino de src/data/blogPosts.ts. Arregla eso para que la fuente de verdad sea la carpeta src/content/blog.

También quiero poder escribir el currículum en markdown.
```

Ahora, eso resultó ser una tarea mucho más desafiante para la IA. Las siguientes iteraciones ni siquiera podían compilar, y me encontré haciendo clic en el botón "Arréglalo" una y otra vez, esperando lo mejor. Eventualmente, lo logré, y lo que ayudó aquí fue mirar los errores individualmente, en lugar de pedirle que los arreglara todos a la vez.

Sin embargo, incluso cuando la página web era funcional otra vez, aún no conseguía que el contenido de mis publicaciones de blog se mostrara correctamente. Ahora, esta es posiblemente una peor situación en la que estar, porque, dado que esta es funcionalidad incorrecta pero no un error que viene del código, cada intento de arreglarlo cuenta como un prompt (y de nuevo, en el plan gratuito solo obtengo 5 por día, así que son muy escasos).

Tomó un tiempo, pero eventualmente conseguí que cargara todo el contenido de esos archivos markdown, para el blog y el CV. También conseguí que arreglara algunos otros problemas menores que encontré. A veces, me encontré dándole varias cosas para arreglar a la vez, lo que probablemente no ayudó... sin embargo traté de sacar el máximo provecho de esos 5 prompts diarios. Por ejemplo:

```
Hay 3 errores:

1. En todas las publicaciones del blog, las fechas se muestran como hoy - La fecha indicada en el markdown no se carga correctamente
2. Las etiquetas no se cargan (al menos no se muestran) para las publicaciones del blog
3. En la página de inicio, la sección "charlas recientes" muestra las 2 charlas más antiguas, en lugar de las 2 más nuevas
```

¡En general, la experiencia fue divertida! Hay algunas partes que se sintieron frustrantes y donde tuve que mirar el código fuente, pero en su mayoría la IA fue capaz de construir el sitio que quería solo siguiendo mis prompts. De nuevo, esto es solo una página web estática muy simple, así que sigo siendo un poco escéptico sobre la viabilidad del vibe coding para algo más grande, al menos la posibilidad de hacer eso desde solo uno de estos servicios.

Para esos casos más complejos, el camino a seguir es probablemente combinar estos con diferentes modelos o herramientas, pero incluso entonces, creo que podría tomar un tiempo hasta que solo necesitemos prompts.

¡Gracias por leer la publicación, espero que la hayas encontrado interesante!