
---
title: Comenzando el Cloud Resume Challenge
slug: "the-cloud-resume-challenge"
date: "2020-08-30"
author: Juan Herreros Elorza
excerpt: He decidido comenzar el Cloud Resume Challenge, y este sitio web es el resultado de eso.
tags: ["Cloud", "Infrastructure", "Challenge", "Project"]
---

¡Bienvenidos a mi blog!

Había estado pensando durante mucho tiempo que sería interesante tener un sitio web personal. Al mismo tiempo, también quería tener algún proyecto paralelo donde pudiera jugar con algunas tecnologías que no son las que uso en el trabajo todos los días.

Hace un par de semanas, mientras leía algunos posts en [dev.to](http://dev.to), me topé con el [Cloud Resume Challenge](https://cloudresumechallenge.dev/instructions/).

Fue originalmente propuesto por [Forrest Brazeal](https://forrestbrazeal.com/), quien también ofreció su ayuda a las personas que tomaran el desafío y estuvieran buscando trabajo. Aunque esa no es mi intención, aún encuentro el desafío particularmente interesante ya que me permitirá cumplir esos 2 objetivos que he tenido por un tiempo: obtener un sitio web personal y experiencia práctica con nuevas herramientas y tecnologías.

#### Primeros pasos

Comencé buscando plantillas HTML para un currículum, y estaba listo para subir una de esas como una primera versión muy simple del sitio. Pero entonces descubrí [Gatsby](https://www.gatsbyjs.com/), un framework de código abierto basado en React que me permite obtener un sitio web más completo, que contiene no solo el Currículum Vitae, sino también el blog que estás leyendo ahora mismo (así como otro contenido que eventualmente pueda venir).

Gatsby ofrece un montón de [starters](https://www.gatsbyjs.com/starters/?v=2), plantillas que ya se ven bastante profesionales. Tomé una de esas, destinada a un blog de [estilo minimalista](https://www.gatsbyjs.com/starters/LekoArts/gatsby-starter-minimal-blog/), desarrollado por [@LekoArts](https://github.com/LekoArts).

#### Publicando el sitio

Siguiendo las instrucciones originales del desafío, estoy usando [Amazon Web Services (AWS)](https://aws.amazon.com/) como mi proveedor de nube.
Esto también es particularmente interesante para mí, porque trabajo en Azure, así que esta es una forma interesante de obtener experiencia práctica en una nube diferente.

Para el primer despliegue, usé los siguientes servicios, configurándolos todos desde la consola web:

- [S3](https://aws.amazon.com/s3/), para alojar el sitio web estático
- [Certificate Manager](https://aws.amazon.com/certificate-manager/), para provisionar los certificados SSL usados en la conexión HTTPS al sitio
- [CloudFront](https://aws.amazon.com/cloudfront/), para proporcionar conexión HTTPS (también para proporcionar acceso al sitio a través de un CDN)
- [Route 53](https://aws.amazon.com/route53/), un servicio DNS para apuntar mi propio dominio al proporcionado por CloudFront

Esto ya está resolviendo los puntos 2, 3, 4, 5 y 6 del [desafío](https://cloudresumechallenge.dev/instructions/). En caso de que te preguntes, no tengo la intención de cumplir el primer requisito a corto plazo, pero sí tengo algunas [certificaciones de Azure](https://www.youracclaim.com/users/juan-herreros-elorza/badges).

Las instrucciones que seguí para desplegar el sitio fueron las proporcionadas en [el propio sitio web de Gatsby](https://www.gatsbyjs.com/docs/deploying-to-s3-cloudfront/), así como un [fantástico post de blog](https://blog.joshwalsh.me/aws-gatsby/) de Joshua Walsh.

Para resumir, primero aprovisioné un bucket en **S3**, luego instalé el **AWS CLI** y el plugin de Gatsby para desplegar a S3, y finalmente desplegué el sitio desde la línea de comandos. Más tarde, solicité los **certificados** SSL y los usé para obtener una distribución de **CloudFront** apuntando a mi bucket de S3. Una vez que todo eso estaba funcionando, creé una zona DNS en **Route 53** y un registro para mi dominio.

¡Y eso es todo! Con todo eso soy capaz de entregarte este sitio. El siguiente paso será [controlar la versión](https://git-scm.com/book/en/v2/Getting-Started-About-Version-Control) del código y desplegar un pipeline de CI/CD para que mi sitio se actualice cada vez que publique cambios en él. Supongo que [el post de Joshua](https://blog.joshwalsh.me/aws-gatsby/) será nuevamente de gran ayuda en esa tarea.
Proporcionaré los detalles sobre esa parte del proyecto en mi próximo post del blog.

¡Gracias por leer el post! Espero que te haya gustado y espero traerte el siguiente :)
