---
title: Empezando el Cloud Resume Challenge
slug: "the-cloud-resume-challenge"
date: "2020-08-30"
author: Juan Herreros Elorza
excerpt: He decidido empezar el Cloud Resume Challenge, y esta página web es el resultado de ello.
tags: ["Cloud", "Infrastructure", "Challenge", "Project"]
---

¡Bienvenido a mi blog!

Llevaba mucho tiempo pensando que sería interesante tener una página web personal. Al mismo tiempo, también quería tener algún proyecto paralelo donde poder trastear con tecnologías que no son las que uso cada día en el trabajo.

Hace un par de semanas, mientras leía algunas publicaciones en [dev.to](http://dev.to), me encontré con el [Cloud Resume Challenge](https://cloudresumechallenge.dev/instructions/).

Fue propuesto originalmente por [Forrest Brazeal](https://forrestbrazeal.com/), quien además ofrecía su ayuda a las personas que aceptaran el reto y estuvieran buscando trabajo. Aunque ese no es mi caso, me sigue pareciendo un reto especialmente interesante porque me permite cumplir esos dos objetivos que tenía desde hace tiempo: tener una página web personal y adquirir experiencia práctica con nuevas herramientas y tecnologías.

#### Primeros pasos

Empecé buscando plantillas HTML para un currículum, y estaba listo para subir una de esas como primera versión, muy sencilla, del sitio. Pero entonces descubrí [Gatsby](https://www.gatsbyjs.com/), un framework open source basado en React que me permite construir una página más completa, que incluya no solo el Curriculum Vitae, sino también este blog que estás leyendo ahora mismo (además de otro contenido que quizá llegue más adelante).

Gatsby ofrece un montón de [starters](https://www.gatsbyjs.com/starters/?v=2), plantillas que ya tienen un aspecto bastante profesional. Elegí una pensada para un blog de [estilo minimalista](https://www.gatsbyjs.com/starters/LekoArts/gatsby-starter-minimal-blog/), desarrollada por [@LekoArts](https://github.com/LekoArts).

#### Publicar el sitio

Siguiendo las instrucciones originales del reto, estoy utilizando [Amazon Web Services (AWS)](https://aws.amazon.com/) como proveedor de cloud.
Esto también me resulta especialmente interesante, ya que trabajo con Azure, así que es una buena forma de adquirir experiencia práctica en una cloud diferente.

Para el primer despliegue utilicé los siguientes servicios, configurándolos todos desde la consola web:

* [S3](https://aws.amazon.com/s3/), para alojar el sitio web estático
* [Certificate Manager](https://aws.amazon.com/certificate-manager/), para aprovisionar los certificados SSL usados en la conexión HTTPS al sitio
* [CloudFront](https://aws.amazon.com/cloudfront/), para proporcionar la conexión HTTPS (y también para servir el sitio a través de una CDN)
* [Route 53](https://aws.amazon.com/route53/), un servicio DNS para apuntar mi dominio propio al proporcionado por CloudFront

Con esto ya estoy cubriendo los puntos 2, 3, 4, 5 y 6 del [reto](https://cloudresumechallenge.dev/instructions/). Por si te lo preguntas, no tengo intención de cumplir el primer requisito a corto plazo, pero sí tengo algunas [certificaciones de Azure](https://www.youracclaim.com/users/juan-herreros-elorza/badges).

Las instrucciones que seguí para desplegar el sitio fueron las que aparecen en la [propia web de Gatsby](https://www.gatsbyjs.com/docs/deploying-to-s3-cloudfront/), además de una [entrada de blog fantástica](https://blog.joshwalsh.me/aws-gatsby/) de Joshua Walsh.

Resumiendo: primero aprovisioné un bucket en **S3**, después instalé la **AWS CLI** y el plugin de Gatsby para desplegar en S3, y finalmente desplegué el sitio desde la línea de comandos. Más tarde, solicité los **certificados** SSL y los usé para crear una distribución de **CloudFront** apuntando a mi bucket de S3. Una vez todo eso funcionaba, creé una zona DNS en **Route 53** y un registro para mi dominio.

¡Y eso es todo! Con todo esto ya puedo ofrecerte esta página. El siguiente paso será [versionar el código](https://git-scm.com/book/en/v2/Getting-Started-About-Version-Control) y desplegar un pipeline de CI/CD para que el sitio se actualice cada vez que suba cambios. Me imagino que [la entrada de Joshua](https://blog.joshwalsh.me/aws-gatsby/) volverá a ser de gran ayuda en esa tarea.
Daré los detalles sobre esa parte del proyecto en la próxima entrada del blog.

¡Gracias por leer la entrada! Espero que te haya gustado y tengo muchas ganas de traerte la próxima :)
