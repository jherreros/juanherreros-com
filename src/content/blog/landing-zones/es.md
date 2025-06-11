---
title: Landing Zones
slug: "landing-zones"
date: "2023-11-24"
author: Juan Herreros Elorza
excerpt: Una invitación a usar el concepto de Landing Zones en Plataformas Internas
tags: ["Platform Engineering", "Internal Developer Platform"]
---

Esta entrada es una invitación abierta a usar terminología específica para referirse a diferentes aspectos de las Plataformas Internas de Desarrolladores. Los Proveedores Cloud definen las Landing Zones como una forma de configurar y estructurar los recursos en ellos, y creo que ese término también podría usarse en las Plataformas Internas de Desarrolladores.

### Platform Engineering

Platform Engineering continúa siendo una práctica en crecimiento constante. Cada vez más empresas están invirtiendo en sus propias Plataformas Internas de Desarrolladores, las herramientas en el área, como Backstage o Crossplane continúan acaparando mucha atención y en conferencias como KubeCon, ahora tenemos un track para Platform Engineering y un Platform Engineering Day co-localizado.

Cuando se construyen adecuadamente, los beneficios de usar una Plataforma son obvios: Empoderan a los desarrolladores para poseer su software desde la mesa de diseño hasta la infraestructura en la que se ejecuta, de manera self-service y sin entregas durante todo el ciclo de vida; mientras reducen la carga cognitiva para que puedan hacer eso sin tener que aprender una plétora de nuevas herramientas y prácticas.

Sin embargo, ofrecer capacidades self-service, abstraer la complejidad y reducir la carga cognitiva no es sencillo. A menudo, la experiencia de usar una plataforma puede resultar en confusión, ya que el desarrollador que la usa aún tiene que aprender cómo interactuar con ella. Además, si no hay una separación clara de responsabilidades o si las capacidades de la plataforma no son lo suficientemente maduras, las personas que la construyen podrían aún ser necesarias para guiar a los usuarios y ayudarles a resolver problemas, derrotando el propósito del self-service.

### Qué es una Plataforma

Puede haber algo de confusión al definir qué es una plataforma y cuáles son sus componentes. Creo que podemos distinguir al menos 3 áreas de interés:
- La **tecnología subyacente**, es decir, la colección de software (y hardware) sobre la que funciona la Plataforma, como Kubernetes, git, Flux o Grafana
- El **área(s) a la que un usuario** de la Plataforma tiene acceso, y donde pueden crear/gestionar sus recursos. Por ejemplo, esto podría incluir un namespace o un vCluster en Kubernetes, un repositorio o un proyecto en git y un proyecto en Flux.
- **Límites y barreras** entre y alrededor de esas áreas. Estas son esencialmente mejores prácticas que se aplican a través de medios de escáneres de configuración, políticas, restricciones de red, gestión de identidad y acceso, etc. Pueden o no dirigirse específicamente a una de las áreas mencionadas anteriormente, pero sí tienen un efecto en esas.

La responsabilidad de cada una de esas 3 áreas recae en un equipo diferente:
- La **tecnología subyacente** típicamente es instalada y mantenida por el **equipo de Plataforma**, aunque también podrían consumirla como una oferta de una plataforma diferente (por ejemplo cuando se usa GKE/AKS/EKS en lugar de instalar Kubernetes desde cero).
- Todo lo que pasa dentro del **área de usuario** es responsabilidad del **equipo de desarrolladores** que usa la Plataforma.
- Los **límites y barreras** también son gestionados por el **equipo de Plataforma**. Si hay un equipo dedicado de networking o seguridad, también podrían querer contribuir a esta configuración.

### Landing Zones

*Una Landing Zone es un entorno cloud bien diseñado, modular, escalable y seguro que sirve como fundación para las operaciones cloud.*

La definición anterior sintetiza las definiciones proporcionadas por los tres principales Proveedores Cloud (AWS, Azure y GCP). Esa definición esencialmente cubre 2 de las 3 áreas de interés mencionadas anteriormente: Los límites, barreras y mejores prácticas, y las áreas específicas a las que los usuarios de la Plataforma obtienen acceso.
Los tres Proveedores usan el término "Landing Zone" para referenciar la configuración general o paradigma, y Azure también usa el término para referirse al área en la que un equipo trabaja:

- [AWS](https://docs.aws.amazon.com/prescriptive-guidance/latest/migration-aws-environment/understanding-landing-zones.html): *Una landing zone es un entorno AWS multi-cuenta bien arquitecturado que es escalable y seguro.*
- [Azure](https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ready/landing-zone/): *Una Azure landing zone es un entorno que sigue principios de diseño clave [...] y usa subscripciones para aislar y escalar recursos de aplicaciones y recursos de plataforma. Las subscripciones para recursos de aplicaciones se llaman application landing zones, y las subscripciones para recursos de plataforma se llaman platform landing zones.*
- [GCP](https://cloud.google.com/architecture/landing-zones): *Una landing zone, también llamada cloud foundation, es una configuración modular y escalable que permite a las organizaciones adoptar Google Cloud para sus necesidades de negocio.*

Profundizando en su documentación, hay 4 áreas a las que todos ellos se refieren cuando hablan de Landing Zones. Las primeras 3 de esas se refieren de nuevo a los límites, barreras, mejores prácticas alrededor de las operaciones cloud, mientras que la última se refiere a estructurar recursos de una manera que las áreas de equipo estén segregadas:
- Networking
- Seguridad
- Gestión de Identidad y Acceso
- Organización (es decir, una jerarquía para estructurar los recursos)

En términos más simples y si seguimos la forma de Azure de referirse a una Landing Zone como el área donde un equipo puede hacer su trabajo, podríamos definir una Landing Zone como:
*"El área que posee un equipo, configurada de manera escalable, eficiente y segura".*

### Por qué usar Landing Zones

A medida que las Plataformas crecen en complejidad, se vuelve necesario encontrar un lenguaje para describir y organizar los conceptos alrededor de ellas. "Plataforma" puede, dependiendo del contexto, referirse a cualquiera de las 3 áreas descritas anteriormente, a todas ellas o a una combinación. Por eso necesitamos introducir términos más específicos.

Las Plataformas ofrecidas por Amazon, Microsoft y Google son más complejas que cualquier Plataforma Interna, así que encontraron esta necesidad de ser más específicos primero. Podemos usar su aprendizaje en nuestras Plataformas Internas de Desarrolladores, e incorporar la terminología que usan.

Una vez que tenemos un entendimiento común de qué es una Landing Zone, por ejemplo, podemos abordar preguntas como las siguientes:

- ¿Cómo se crea y mantiene una Landing Zone?
- ¿Cómo se entregan recursos en ella?
- ¿Cómo debería verse? P.ej., ¿debería la Landing Zone en Kubernetes ser un vCluster o un namespace?
- ¿Qué herramientas y procesos puede usar un equipo para interactuar con la Landing Zone?

En conclusión, creo que nombrar y definir abstracciones como partes de una Plataforma o formas de estructurar dicha Plataforma es beneficioso, y nos permite ir más lejos y crear abstracciones más complejas. Las Landing Zones, específicamente, son una abstracción que puede ser útil para diseñar una Plataforma, para ayudar a entender cómo está construida y para proporcionar una división clara de responsabilidades.
