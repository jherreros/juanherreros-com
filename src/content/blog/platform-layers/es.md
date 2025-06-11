---
title: Capas de la Plataforma
slug: "platform-layers"
date: "2024-10-06"
author: Juan Herreros Elorza
excerpt: Cómo estructurar una Plataforma en Core, Foundation y Delivery
tags: ["Platform Engineering", "Internal Developer Platform"]
---

A lo largo de mis años construyendo Plataformas, me he encontrado con diferentes interpretaciones de lo que es una Plataforma. Todo el mundo estaría de acuerdo en que es un punto de partida sobre el que construir y que facilita la vida de sus usuarios (es decir, que reduce su carga cognitiva), sin embargo, hay diferentes enfoques sobre cómo lo consigue.

- Para algunas personas, una Plataforma es algo como un servidor, un lugar donde ejecutar sus cargas de trabajo. Algunos argumentarían que incluye, además, una colección de herramientas, normalmente relacionadas con Kubernetes y otros softwares encargados de la seguridad, redes u observabilidad.
- Otros señalarían que la Plataforma es lo que les libera de tener que lidiar con todas esas herramientas y la infraestructura subyacente, es decir, una abstracción que les permite centrarse únicamente en los aspectos específicos del dominio en el que trabajan (es decir, la [carga cognitiva relevante](https://itrevolution.com/articles/cognitive-load/)), asegurando al mismo tiempo que ejecutan su software de manera segura, eficiente y fiable.
- En esa misma línea, algunas personas también señalarían que la Plataforma no solo debería abstraer los servidores y herramientas subyacentes que se utilizan, sino también proporcionar una forma sencilla de desplegar su código en ella.

Yo creo que una Plataforma es todo lo que hay entre la infraestructura y el usuario de dicha Plataforma, es decir, el desarrollador que quiere construir/ejecutar/entender su software sobre/a través/de la Plataforma.  
Por lo tanto, creo que todas esas visiones son válidas en cierta medida y una Plataforma es (o al menos puede ser) todas esas cosas. Para estructurar cómo construyo Plataformas, he descubierto que ayuda dividirlas en capas.

Desde mi punto de vista, las capas de una Plataforma, desde la más oculta hasta la más visible, son:
- **Core layer**: Esta es la "bolsa de herramientas", es decir, una distribución específica de Kubernetes (k3s, AKS, EKS), además de todo el software adicional que se instala en el/los clúster(es) de Kubernetes, como herramientas de seguridad, red, observabilidad o despliegue.
- **Foundation layer**: Esta es la estructura encima de la bolsa de herramientas que permite a los usuarios de la Plataforma acceder a ella y construir sobre ella. Se encarga de proporcionar una configuración base en torno a multi-tenanting, gestión de accesos, segmentación de red y otras configuraciones (pre)definidas.
- **Delivery layer**: Esta es la capa que permite a los usuarios de la Plataforma construir y desplegar su software sobre ella. En algunos casos, los usuarios podrían no necesitar usar esta capa si están familiarizados con las tecnologías subyacentes y por tanto pueden construir directamente sobre la Foundation.

### The Core Layer

Esta es la infraestructura sobre la que se ejecuta la Plataforma, más las herramientas instaladas y su configuración general.

Por tanto, esta capa concierne exclusivamente al equipo que construye la Plataforma, y cualquier usuario de la misma no debería preocuparse de cómo está construida.

El alcance de esta capa es toda la Plataforma, ya que cualquier capacidad que se quiera construir sobre ella necesitará que esa infraestructura, software y configuración estén disponibles.

### The Foundation Layer

Esta es el área sobre la que trabaja un usuario concreto de la Plataforma (normalmente, un equipo). Dependiendo del tipo de Plataforma, se puede entender como un tenant y/o como una [Landing Zone](https://juanherreros.com/landing-zones/).

Un usuario de la Plataforma no debería recibir solo la “bolsa de herramientas” del Core Layer, sino una estructura coherente de recursos construida encima.

Además, esos recursos deberían estar (pre)configurados con las mejores prácticas que la Plataforma quiere fomentar o imponer. Por ejemplo, Network Policies que restrinjan tráfico de entrada o salida a las aplicaciones desplegadas o Security Policies que aseguren que no se despliegan vulnerabilidades críticas en la Plataforma.

El diseño de esta capa lo hace el equipo que mantiene la Plataforma, aunque el uso y la responsabilidad de una Foundation concreta recae en el equipo que despliega sobre esa Foundation. No es realista, sin embargo, esperar que cualquier usuario de la Plataforma conozca a fondo todos los recursos que forman parte de esta capa Foundation. Por tanto, el equipo que mantiene la Plataforma debe abstraer esa complejidad.

La mejor forma de hacerlo, en mi opinión, es exponer una API a través de la cual los usuarios puedan gestionar sus Foundations. Así pueden manejar todas las operaciones a través de una interfaz consistente con un esquema bien definido.

Esta capa debe estar estandarizada y ser lo suficientemente flexible como para permitir que el uso de la Plataforma sea coherente entre distintos equipos, pero al mismo tiempo se adapte a diferentes casos de uso.

El alcance de esta capa es un equipo o sistema concreto (un usuario particular de la Plataforma), que desplegará sus distintas aplicaciones (u otros recursos, dependiendo de la Plataforma) sobre una Foundation concreta. Las Foundations de diferentes equipos y sistemas se parecerán entre sí y se construirán mediante el mismo proceso, pero los detalles de cada una serán distintos (por ejemplo, un sistema puede necesitar acceso a una base de datos, pero otro puede que no).

### The Delivery Layer

Una vez que un usuario de la Plataforma tiene una Foundation sobre la que desplegar, lo único que falta son las aplicaciones (y/u otros recursos) que se despliegan encima.

Las aplicaciones son, naturalmente, responsabilidad de cada uno de los usuarios de la Plataforma. Sin embargo, el equipo que mantiene la Plataforma también puede ofrecer mecanismos de entrega para ayudar a los usuarios a llevar sus aplicaciones a ella.

Estos mecanismos de entrega pueden variar bastante, dependiendo del nivel de madurez de los equipos que usan la Plataforma y de su complejidad. Entre otras cosas, el equipo de la Plataforma (y/o un equipo centrado en Developer Experience) puede proporcionar:

- Imágenes base de máquinas virtuales o contenedores sobre las que los equipos puedan construir
- Plantillas de pipelines (por ejemplo, para GitHub Actions) que los equipos puedan usar para entregar su software
- Plantillas o APIs con configuraciones de ejecución predefinidas, a las que los equipos puedan aportar sus propios valores

Aquí también creo que usar APIs en lugar de plantillas proporciona una mejor experiencia para desarrolladores (es más fácil proporcionar datos a una interfaz que juntar [bloques de construcción](https://juanherreros.com/lessons-learnt-from-building-blocks/)) y una mejor mantenibilidad (es más fácil manejar versiones y su uso en una API que en una colección dispersa de bloques).

El alcance de esta capa es una aplicación concreta. Si un equipo mantiene varias aplicaciones, cada una usará esta capa de entrega a su manera y aportará sus propios valores.

### Ejemplo

La **core layer** consiste en un clúster de Kubernetes con ArgoCD, Cilium, Kyverno y GitLab instalados.

La **foundation layer** consiste en un namespace de Kubernetes, un proyecto de ArgoCD, una Network Policy de Cilium, una serie de políticas de Kyverno y un repositorio en GitLab.

La gestión de todos estos recursos se realiza a través de un CRD de Kubernetes, que es consumido por un Operator construido por el equipo de la Plataforma.

Los usuarios de la Plataforma proporcionan un nombre para su equipo, que se utiliza luego para nombrar los distintos recursos. Además, y si es necesario, pueden proporcionar excepciones a la Network Policy y/o a las políticas de Kyverno.

La **delivery layer** consiste en un chart de Helm mantenido por el equipo de la Plataforma. Para usarlo, los equipos solo tienen que crear una Argo Application que use ese chart de Helm y un fichero de values con la configuración específica de su aplicación. Luego hacen commit de esos ficheros en el repositorio de GitLab que se les asignó en su Foundation, y la aplicación se despliega.

### Reflexiones finales

Hay distintas formas de pensar sobre lo que es una Plataforma y cómo dividirla. Daniel Bryant, por ejemplo, ha escrito sobre ello en el [blog de Syntasso](https://www.syntasso.io/post/platform-engineering-orchestrating-applications-platforms-and-infrastructure). En su caso, divide la Plataforma entre Infraestructura, Orquestación de Plataforma y Aplicación.

Creo que la separación entre Foundation y Delivery es fácil de entender tanto para los responsables de la Plataforma como para sus usuarios, y que permite una separación de responsabilidades entre el entorno general que afecta a todas las aplicaciones de un equipo y los detalles específicos de cada una. Si miramos las buenas prácticas en el uso de proveedores de nube pública (que son, en cierto modo, grandes Plataformas), usar Landing Zones —que en este caso se corresponderían con la Foundation Layer— es una recomendación en todos los principales. Así que creo que tiene sentido pensarlo también así para las Internal Developer Platforms.

También creo que, tanto para la Foundation como para la capa de Delivery (en general, para cualquier cosa que tenga que hacer un usuario en la Plataforma), interactuar a través de una API (o al menos algún tipo de interfaz) es preferible a usar una serie de módulos o plantillas.
