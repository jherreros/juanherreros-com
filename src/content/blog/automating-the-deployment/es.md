---
title: Automatizando el despliegue
slug: "automating-the-deployment"
date: "2020-09-06"
author: Juan Herreros Elorza
excerpt: He subido el código a un VCS y he creado un pipeline para automatizar el despliegue de la web.
tags: ["Cloud", "Infrastructure", "Challenge", "Project"]
---

¡Bienvenidos a una nueva entrada del blog!

Hoy quiero contaros cómo he conseguido poner el código de la web en un [Sistema de Control de Versiones (VCS)](https://git-scm.com/book/en/v2/Getting-Started-About-Version-Control).
Junto con eso, he configurado un pipeline para que la web se despliegue automáticamente cada vez que hago push de algunos cambios a este VCS.

#### Control de versiones del código: Creando un repositorio de GitHub

El objetivo de tener mi código en un Sistema de Control de Versiones es tener un registro de cada cambio que introduzco a ese código.
Esto es útil, por ejemplo, si quiero comprobar cuándo introduje algún cambio en particular, o si quiero revertir ese cambio porque ha introducido algún efecto no deseado o ha causado que la web deje de funcionar.

Estoy usando [git](https://git-scm.com/) como mi VCS y [GitHub](https://github.com/) como el host para el repositorio. Estos son los más conocidos y ampliamente utilizados en sus respectivos campos. GitHub también está particularmente bien adaptado para proyectos de código abierto, que es exactamente el caso de mi web.

Porque es un proyecto de código abierto, otras personas pueden cogerlo, modificarlo y usarlo en sus propios proyectos. También, me permite recibir contribuciones de potencialmente cualquiera, para mejorar algo sobre la web o para incluir algunas entradas de otros autores, por ejemplo.

En caso de que estés interesado en revisar el código fuente de la web, puedes encontrarlo [aquí](https://github.com/jherreros/cloud-resume-challenge) o en el botón "GitHub" en la esquina superior derecha.

#### Usando un pipeline para desplegar la web: AWS CodeBuild

Otra de las posibilidades interesantes que ofrece almacenar el código en un repositorio es que puede ser obtenido desde ahí por herramientas de terceros. Y esas herramientas pueden desplegar automáticamente la web cada vez que subo (hago push) algunos cambios al repositorio.

Esto significa que ahora no tengo que ejecutar manualmente los comandos para desplegar la web. En el momento en que hago push de algo al repo, sé que será desplegado.

El servicio que estoy usando para esto es [AWS CodeBuild](https://aws.amazon.com/codebuild/).
Hay formas más complicadas y sofisticadas de construir un pipeline de despliegue, como el ejemplo presentado en [la entrada de blog de Joshua Walsh](https://blog.joshwalsh.me/aws-gatsby/), que usa [CodePipeline](https://aws.amazon.com/codepipeline/) además de CodeBuild.
Pero quería mantenerlo simple, y solo tener un pipeline básico que ejecute algunos comandos npm por mí. Siempre puedo mejorar mi configuración más tarde.

No nos olvidemos de que estoy siguiendo el [Cloud Resume Challenge](https://cloudresumechallenge.dev/instructions/) como referencia. Esta entrada cubre los puntos 13 (VCS) y 15 (CI/CD para Frontend). También, el desarrollo hasta ahora ya sería suficiente para una web estática básica, incluyendo algunas páginas y el blog.
Pero por supuesto quiero introducir alguna funcionalidad más interesante y tratar con algunas cosas técnicas, concretamente el contador de visitantes mencionado en el reto.

¡Espero que os haya gustado la entrada! Gracias por leerla y espero traeros la siguiente pronto.
