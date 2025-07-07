---
title: Construyendo Mini-Atlas: Una versión reducida de una Plataforma Interna de Desarrollador
slug: "construyendo-mini-atlas"
date: "2025-07-07"
author: Claude
excerpt: Una versión simplificada de nuestra Plataforma Interna de Desarrollador de producción para aprender y experimentar
tags: ["Ingeniería de Plataformas", "Plataforma Interna de Desarrollador", "Kubernetes"]
---

En Banking Circle, operamos Atlas, nuestra Plataforma Interna de Desarrollador que permite a los desarrolladores aprovisionar y gestionar sus aplicaciones e infraestructura cloud-native. Aunque Atlas nos sirve bien en producción, a menudo me encontraba deseando una versión más simple y accesible para experimentar, aprender y comprender los conceptos de plataforma más profundamente.

Así nació Mini-Atlas: un proyecto personal que captura la esencia de lo que hace valioso a Atlas, siendo lo suficientemente simple como para ejecutarse localmente y entenderse completamente.

### El desafío con las plataformas de producción

Las plataformas de producción son complejas por necesidad. Necesitan manejar seguridad de grado empresarial, multi-tenencia, alta disponibilidad, recuperación ante desastres, y un sinfín de otros requisitos que vienen con ejecutar cargas de trabajo críticas. Esta complejidad, aunque esencial, crea barreras:

- **Fricción en la incorporación**: Los nuevos miembros del equipo necesitan semanas para entender cómo encaja todo
- **Sobrecarga de experimentación**: Probar nuevos conceptos requiere navegar por capas de herramientas empresariales
- **Curva de aprendizaje**: Entender los conceptos de plataforma significa luchar contra herramientas complejas

Necesitaba algo que preservase los patrones arquitectónicos y abstracciones de Atlas, pero que eliminase la complejidad empresarial que hace difícil comprenderlo rápidamente.

### Qué hace que una abstracción de plataforma sea buena

A través de construir Atlas, he aprendido que las abstracciones de plataforma efectivas deberían:

- **Ocultar complejidad sin sacrificar potencia**: Los desarrolladores no deberían necesitar entender YAML de Kubernetes para desplegar una aplicación, pero deberían poder acceder a funciones avanzadas cuando sea necesario
- **Proporcionar límites claros**: Cada abstracción debería tener un ámbito y responsabilidad bien definidos
- **Permitir autoservicio**: Los equipos deberían poder aprovisionar todo lo que necesiten sin traspasos
- **Hacer cumplir las mejores prácticas**: Las preocupaciones de seguridad, red y operaciones deberían estar integradas, no ser opcionales

Mini-Atlas encarna estos principios a través de cuatro abstracciones clave:

### Las abstracciones

**Workspaces** proporcionan entornos de inquilino aislados. Cuando creas un workspace, obtienes un namespace con políticas de red para aislamiento y convenciones de nomenclatura aplicadas a través de políticas de Kyverno. Es la base sobre la que todo lo demás se construye.

**WebApplications** manejan el caso común de desplegar aplicaciones contenerizadas. Entre bastidores, esto crea un Deployment, Service e Ingress, pero los desarrolladores solo necesitan especificar su imagen, réplicas deseadas y nombre de host.

**Infrastructure** aprovisiona servicios de respaldo como bases de datos PostgreSQL y cachés Redis. La abstracción maneja la configuración del clúster, gestión de credenciales y descubrimiento de servicios automáticamente.

**Topics** crean temas de Kafka en un bus de mensajes compartido con particionado apropiado y políticas de retención. Los equipos obtienen capacidades de mensajería sin necesidad de entender la configuración subyacente de Kafka.

### La arquitectura

Mini-Atlas sigue el mismo [enfoque por capas](https://juanherreros.com/platform-layers/) que nuestra plataforma de producción:

La **Capa Core** proporciona la base: un clúster Kind con red Cilium, Strimzi para Kafka, CloudNativePG para PostgreSQL, y otros componentes esenciales. Esta es la "bolsa de herramientas" que potencia todo lo demás.

La **Capa Foundation** estructura estas herramientas en entornos coherentes. Usando KRO (Kubernetes Resource Orchestrator), defino cómo las abstracciones de alto nivel se mapean a recursos de Kubernetes de bajo nivel. Cuando alguien crea un Workspace, KRO orquesta la creación de namespaces, políticas de red y reglas de gobernanza.

La **Capa Delivery** permite a los equipos desplegar sus aplicaciones a través de interfaces simples y declarativas. En mi [escritura anterior sobre capas de plataforma](https://juanherreros.com/platform-layers/), describí cómo la capa Foundation proporciona el entorno de inquilino y la capa Delivery maneja el despliegue de aplicaciones. En Mini-Atlas, he expandido este enfoque incorporando elementos de infraestructura y mensajería como abstracciones adicionales que los equipos pueden consumir junto con sus aplicaciones.

### Lo que aprendimos

Construir Mini-Atlas reforzó varias percepciones de mi viaje en ingeniería de plataformas:

**Las abstracciones son más difíciles de lo que parecen**: Crear el nivel correcto de abstracción —lo suficientemente potente para ser útil, lo suficientemente simple para ser accesible— requiere una comprensión profunda tanto de la tecnología subyacente como de las necesidades del usuario.

**GitOps escala bien hacia abajo**: Incluso en este entorno simplificado, usar FluxCD para gestión de configuración proporciona los mismos beneficios que vemos en producción: auditabilidad, capacidades de rollback y configuración declarativa.

**La experiencia del desarrollador importa más que la completitud de funciones**: Mini-Atlas tiene menos capacidades que Atlas, pero la experiencia simplificada lo hace más accesible para aprender y experimentar.

**El desarrollo local desbloquea la experimentación**: Poder levantar toda la plataforma localmente en minutos elimina barreras para probar nuevos enfoques y entender el comportamiento del sistema.

### La diferencia con producción

Mini-Atlas deliberadamente omite muchos requisitos empresariales:

- **Clúster único vs. multi-clúster**: Atlas de producción abarca múltiples clústeres a través de regiones
- **Red simplificada**: Sin service mesh, gestión de tráfico avanzada o configuraciones de ingress complejas
- **Seguridad básica**: Políticas de red y convenciones de nomenclatura en lugar de controles de seguridad empresariales completos
- **Almacenamiento local**: Sin almacenamiento distribuido, estrategias de backup o recuperación ante desastres
- **Abstracciones simplificadas**: KRO maneja la orquestación de recursos en lugar de los operadores personalizados más complejos usados en producción

Estas simplificaciones hacen que Mini-Atlas no sea adecuado para uso en producción, pero perfecto para aprender, experimentar y entender conceptos de plataforma.

### Mirando hacia adelante

Mini-Atlas se ha convertido en una herramienta valiosa para mi aprendizaje y experimentación continua. Lo uso para prototipar nuevas abstracciones y probar cambios arquitectónicos. Y sirve como implementación de referencia para equipos en otras organizaciones que construyen sus propias plataformas.

El proyecto refuerza mi creencia de que las mejores plataformas ocultan complejidad detrás de abstracciones simples y potentes. A veces lo más valioso que puedes construir no es la versión más completa en funciones, sino la que hace que los conceptos subyacentes sean cristalinos.

Ya sea que estés construyendo tu primera plataforma o refinando una existente, te animaría a considerar crear tu propia versión "mini". El ejercicio de eliminar complejidad mientras preservas patrones esenciales a menudo revela percepciones que mejoran tanto tus plataformas simplificadas como las de producción.

Puedes encontrar Mini-Atlas en [GitHub](https://github.com/jherreros/mini-atlas) – me encantaría escuchar sobre vuestras experiencias construyendo con él o creando vuestras propias abstracciones de plataforma.