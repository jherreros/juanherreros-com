---
title: Lecciones aprendidas de los building blocks
slug: "lessons-learnt-from-building-blocks"
date: "2024-09-30"
author: Juan Herreros Elorza
excerpt: Lecciones aprendidas de usar "building blocks" como aproximación al IaC
tags: ["Platform Engineering", "Internal Developer Platform"]
---

Cuando empecé a trabajar en Banking Circle, estaba trabajando con Infrastructure as Code (IaC).
Mantener una definición declarativa de toda la infraestructura que el equipo estaba usando y ser capaz de provisionarla de manera controlada y repetible, funcionó de maravilla para nosotros. Redujo drásticamente la deriva entre los diferentes entornos, que anteriormente se gestionaban de manera bastante manual.

Naturalmente, habiendo visto lo bien que funcionaba en el equipo, queríamos expandir esa aproximación a otros equipos que, hasta ese momento, también estaban gestionando su infraestructura de la manera "de toda la vida".
Para hacer eso, agrupamos cada uno de nuestros componentes de infraestructura (como una base de datos, una webapp o un almacén de secretos), junto con algunos recursos auxiliares que siempre se desplegarían junto a ellos, en un módulo reutilizable, preconfigurado y fácil de usar.

Entonces, cada equipo que quisiera obtener todos los beneficios de usar IaC _solo_ necesitaría crear su propio proyecto usando esos módulos. _¿Qué difícil podía ser?_ Después de todo, el trabajo duro ya estaba hecho dentro de cada uno de los módulos.

Para empeorar~mejorar~ las cosas, también nos encargamos de escribir algunas plantillas de pipeline que se pueden usar para probar, aplicar o destruir cada uno de esos proyectos de IaC.
Una vez más, la _única_ cosa de la que los equipos necesitan encargarse es construir un pipeline usando esas plantillas, y usar ese pipeline para desplegar sus proyectos.

Conseguimos expandir esta aproximación a más o menos toda la Organización de Ingeniería, sin embargo nos tomó bastante esfuerzo no solo en construir estos componentes reutilizables, sino especialmente en conseguir que la gente entendiera la aproximación y los usara.

### Qué funciona

- Estos building blocks permiten a los equipos provisionar infraestructura independientemente, sin necesitar que nadie de un departamento diferente ejecute ninguna acción en su nombre.
- Los nuevos proyectos se pueden crear más rápido y los cambios a esos (y a proyectos existentes, después de importar/migrarlos al paradigma IaC) se vuelven mucho más frecuentes.

### Qué no funciona

- La mayoría de desarrolladores que he conocido no tienen realmente interés en infraestructura y, incluso si lo tienen, está lejos de ser lo primero en su lista de prioridades, porque tienen sus propias preocupaciones. Por tanto, cuando se les pide que trabajen en infraestructura tienden a ser reticentes.
- Debido a eso y porque la infraestructura no es típicamente su área de expertise, tienden a necesitar ayuda juntando esos módulos y plantillas. En algunos casos, dependen de esa ayuda para conseguir que el proyecto IaC se construya y publique, y el conocimiento realmente no cala.
- Debido a eso, siempre que necesitan provisionar alguna infraestructura adicional, tienden a necesitar ayuda de nuevo. Si, encima de los nuevos requisitos, necesitan encargarse de actualizar los módulos y/o plantillas, es aún más probable que sean reticentes y que necesiten ayuda con eso.

### Una solución

Como podemos ver de todos los puntos expuestos anteriormente, los desarrolladores quieren tener la libertad de provisionar la infraestructura que necesitan de manera self-service y se benefician de eso. En la mayoría de casos, no quieren (y no deberían) preocuparse por escribir código IaC ni código de pipeline, incluso si eso está basado en algunos módulos o plantillas.

La solución es, entonces, poner todo ese código detrás de una interfaz con la que los desarrolladores interactúan. Entonces proporcionan inputs más simples, como:
- El nombre de su equipo, aplicación o sistema
- La gente trabajando en su equipo
- Otros sistemas o endpoints a los que necesitan acceso
- (Opcionalmente) configuración que complementaría o sobrescribiría los valores por defecto para algunos de los recursos que obtienen

Esta definición sigue siendo declarativa, así que mantiene los beneficios de usar IaC, pero ahora está basada en un único componente/bloque (esta interfaz), así que no hay necesidad de escribir nada más que el input a esta interfaz.

Además, si esta interfaz se expone como una API, se puede integrar fácilmente con otras soluciones. Esto puede hacer la vida de los desarrolladores aún más fácil usando una plataforma de desarrolladores, otro tipo de UI, un CLI o cualquier otra integración encima de la API.

La API también es fácil de versionar, así que gestionar actualizaciones al "modelo" de infraestructura subyacente (el proyecto detrás de la API) y enviar esas a todos los que la usan es mucho más fácil que publicar actualizaciones a cada building block y pedir a los desarrolladores que las mantengan actualizadas.

### Inconvenientes

Dependiendo de la complejidad y singularidad de la infraestructura que cada equipo necesita, es posible que los recursos gestionados a través de la API no sean suficientes, y necesiten ser complementados con algunos "building blocks" (algunos módulos IaC). Esto es, en algunos casos, preferible a introducir la complejidad en la API que todos los demás están usando.

Este es un escenario relativamente improbable, sin embargo, ya que la mayoría de equipos pueden ser cubiertos por la API IaC. Incluso entonces, estos equipos que tienen requisitos específicos de infraestructura normalmente están más familiarizados con (su) infraestructura. Y aún así, solo tienen que estar familiarizados con la parte que no está cubierta por la solución más general.

### Conclusión

En general, permitir a los desarrolladores provisionar su infraestructura de manera self-service es una buena forma de permitirles entregar más mientras disfrutan más su tiempo en el trabajo.
Poner algo de esfuerzo en construir una Plataforma basada en API con la que puedan interactuar es una buena manera de tener una buena Developer Experience, tanto para la gente que usa como para la que mantiene la Plataforma.

Usar building blocks, como módulos IaC o plantillas de pipeline puede seguir siendo una aproximación interesante mientras la Plataforma basada en API se está construyendo y/o antes de que esté disponible, si el esfuerzo que se dedica a construir esos va a ser útil de todas formas en la construcción de esa Plataforma.