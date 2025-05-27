
---
title: El Backend
slug: "the-backend"
date: "2020-09-28"
author: Juan Herreros Elorza
excerpt: Esta web ahora tiene un backend que sirve un contador de visitantes
tags: ["Cloud", "Infrastructure", "Challenge", "Project", "AWS"]
---

¡Bienvenidos a un nuevo post en mi blog!

Esta vez escribo sobre cómo he creado un backend para este sitio web, incluyendo una base de datos, una función lambda y una API, que llamo desde el frontend.
Además, todo esto está completamente automatizado y bajo control de versiones, para que pueda ser desplegado y actualizado de manera controlada y repetible.

#### La arquitectura

![Imagen](/arch.png)

El frontend de este sitio web, como se describió en los posts anteriores del blog, está compuesto por:
- Un bucket de [S3](https://aws.amazon.com/s3/), que aloja el sitio estático generado con Gatsby
- Una distribución de [CloudFront](https://aws.amazon.com/cloudfront/) que sirve y asegura el sitio almacenado en el bucket
- Una zona DNS de [Route 53](https://aws.amazon.com/route53/) con un registro de dominio para proporcionar acceso a este sitio en mi dominio personalizado

A ese frontend, ahora he agregado:
- Una tabla de [DynamoDB](https://aws.amazon.com/dynamodb/) que aloja el número de visitantes
- Una función [Lambda](https://aws.amazon.com/lambda/) que lee y actualiza esa tabla de DynamoDB
- Un [API Gateway](https://aws.amazon.com/api-gateway/) que expone la función Lambda
- Un registro DNS para el API gateway, para que sea accesible en un endpoint conocido

El front- y backend se comunican a través de esta API, que es llamada desde un componente de [React](https://reactjs.org/), que luego muestra el número de visitas a los lectores que acceden a la página de inicio.

#### La API basada en Lambda

Como se describió antes, el componente principal del backend es una función Lambda. Este es un tipo muy interesante de [computación sin servidor](https://en.wikipedia.org/wiki/Serverless_computing), donde solo tengo que preocuparme por escribir el código para la función misma, pero no sobre alojarla o servirla. La función Lambda:
1. Recibe la solicitud del API gateway, incluyendo los detalles que podrían estar incluidos en esa solicitud, tales como:
    - El id del usuario, incluido en la URL. En este punto solo estoy usando "default" para todos los usuarios, pero el código de la API está preparado para almacenar el número de visitas de cada usuario individual.
    - Una clave API, pasada como un header
1. Consulta la tabla para actualizar y obtener el número de visitas. Si no hay visitas registradas, entonces crea el registro
1. Devuelve el número actualizado de visitas

Para probar que la API está funcionando, también he incluido algunas [pruebas unitarias](https://en.wikipedia.org/wiki/Unit_testing) para la función lambda.

#### Infraestructura como Código: SAM

Toda la implementación del backend está descrita como código en un lenguaje proporcionado por AWS que se llama [Serverless Application Model](https://aws.amazon.com/serverless/sam/).
Esto me permite evitar tener que configurar todos los servicios en la UI de la consola, y en su lugar solo ejecutar un comando para desplegar todo el stack del backend.

Esto es increíblemente útil porque me permite actualizar o redesplegar todos los servicios en un abrir y cerrar de ojos. Además de eso, toda la configuración para todos los servicios que estoy usando está en el mismo lugar y por lo tanto es más fácil de manejar. Además, lo tengo bajo control de versiones, así que puedo hacer un seguimiento de los cambios que he hecho a mi infraestructura.

#### Usando secretos

También estoy usando algunos secretos en mis pipelines de [CodeBuild](https://aws.amazon.com/codebuild/) ahora. Los almaceno en el [Parameter Store](https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html) de AWS [Systems Manager](https://aws.amazon.com/systems-manager/). De esta manera evito tener información sensible en mis repositorios públicos de GitHub. En lugar de eso, tengo algunas cadenas de marcador de posición que reemplazo como parte de mi pipeline.

Con esto, cubro todos los puntos restantes del [Cloud Resume Challenge](https://cloudresumechallenge.dev/instructions/), que eran 7, 8, 9, 10, 11, 12 y 14. ¡Así que lo considero completo! Realmente fue una buena experiencia de aprendizaje :)

No obstante, hay algunas mejoras funcionales y técnicas que tengo en mente para este sitio, y seguiré escribiendo sobre esas en este blog cuando las incluya en la página.

Como siempre, espero que te haya gustado el post. ¡Nos vemos en el siguiente y gracias por leer!
