---
title: El Backend
slug: "the-backend"
date: "2020-09-28"
author: Juan Herreros Elorza
excerpt: Esta web ahora tiene un backend que sirve un contador de visitas
tags: ["Cloud", "Infrastructure", "Challenge", "Project", "AWS"]
---

¡Bienvenido a una nueva entrada en mi blog!

Esta vez escribo sobre cómo he creado un backend para esta web, incluyendo una base de datos, una función Lambda y una API, a la que llamo desde el frontend.
Además, todo esto está completamente automatizado y bajo control de versiones, de forma que se puede desplegar y actualizar de manera controlada y repetible.

#### La arquitectura

![Imagen](/arch.png)

El frontend de esta web, como describí en entradas anteriores del blog, está compuesto por:

* Un bucket de [S3](https://aws.amazon.com/s3/), que aloja el sitio estático generado con Gatsby
* Una distribución de [CloudFront](https://aws.amazon.com/cloudfront/) que sirve y securiza el sitio almacenado en el bucket
* Una zona DNS de [Route 53](https://aws.amazon.com/route53/) con un registro de dominio para dar acceso a este sitio desde mi dominio personalizado

A ese frontend, ahora le he añadido:

* Una tabla de [DynamoDB](https://aws.amazon.com/dynamodb/) que guarda el número de visitantes
* Una función [Lambda](https://aws.amazon.com/lambda/) que lee y actualiza esa tabla de DynamoDB
* Un [API Gateway](https://aws.amazon.com/api-gateway/) que expone la función Lambda
* Un registro DNS para el API Gateway, para que sea accesible desde un endpoint conocido

El front y el backend se comunican a través de esta API, que se invoca desde un componente [React](https://reactjs.org/), el cual muestra el número de visitas a los lectores que acceden a la página principal.

#### La API basada en Lambda

Como se ha descrito antes, el componente principal del backend es una función Lambda. Este es un tipo muy interesante de [serverless computing](https://en.wikipedia.org/wiki/Serverless_computing), donde solo tengo que preocuparme de escribir el código de la función en sí, sin tener que encargarme de alojarla o servirla. La función Lambda:

1. Recibe la petición del API Gateway, incluyendo los detalles que puedan venir en esa petición, como por ejemplo:

   * El id del usuario, incluido en la URL. De momento solo estoy usando "default" para todos los usuarios, pero el código de la API está preparado para guardar el número de visitas de cada usuario individual.
   * Una API key, pasada como cabecera (header)
2. Consulta la tabla para actualizar y obtener el número de visitas. Si no hay visitas registradas, entonces crea el registro
3. Devuelve el número actualizado de visitas

Para probar que la API funciona correctamente, también he incluido algunos [unit tests](https://en.wikipedia.org/wiki/Unit_testing) para la función Lambda.

#### Infraestructura como código: SAM

Toda la implementación del backend está descrita como código en un lenguaje proporcionado por AWS llamado [Serverless Application Model](https://aws.amazon.com/serverless/sam/).
Esto me permite evitar tener que configurar todos los servicios en la interfaz gráfica de la consola, y en su lugar simplemente ejecutar un comando para desplegar toda la pila del backend.

Esto es increíblemente útil porque me permite actualizar o volver a desplegar todos los servicios en un abrir y cerrar de ojos. Además, toda la configuración de todos los servicios que estoy utilizando está en el mismo sitio, lo cual facilita su gestión. Y como lo tengo bajo control de versiones, puedo hacer seguimiento de los cambios que he ido haciendo en mi infraestructura.

#### Uso de secretos

También estoy utilizando algunos secretos en mis pipelines de [CodeBuild](https://aws.amazon.com/codebuild/). Los almaceno en el [Parameter Store](https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html) del [Systems Manager](https://aws.amazon.com/systems-manager/) de AWS.
De esta forma, evito tener información sensible en mis repositorios públicos de GitHub. En lugar de eso, utilizo cadenas de texto de ejemplo que sustituyo como parte de mi pipeline.

Con esto, cubro todos los puntos restantes del [Cloud Resume Challenge](https://cloudresumechallenge.dev/instructions/), que eran los puntos 7, 8, 9, 10, 11, 12 y 14. ¡Así que lo considero completo! Ha sido una experiencia de aprendizaje muy interesante :)

No obstante, tengo en mente algunas mejoras tanto funcionales como técnicas para esta web, y seguiré escribiendo sobre ellas en este blog cuando las incorpore a la página.

Como siempre, espero que te haya gustado la entrada. ¡Nos vemos en la próxima y gracias por leer!
