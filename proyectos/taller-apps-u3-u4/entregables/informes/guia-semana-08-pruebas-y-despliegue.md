# Semana 08 · Pruebas y despliegue

**Autor:** Jheyssun Breydi Vargas Taipe  
**Curso:** Taller VII: Desarrollo de Aplicaciones  
**Tipo:** Informe de estudio y guía para la práctica

## Propósito
Organizar los conceptos de la guía semanal y relacionarlos con una ruta de desarrollo Full-Stack. Este documento es material de estudio; no afirma haber realizado instalaciones o pruebas no documentadas.

## Contenidos

### 1. Prueba integración y flujos principales antes de publicar.

Prueba integración y flujos principales antes de publicar. La decisión práctica debe considerar requisitos, validación, mantenibilidad y seguridad desde el inicio.
### 2. Empaqueta artefactos reproducibles de producción.

Empaqueta artefactos reproducibles de producción. La decisión práctica debe considerar requisitos, validación, mantenibilidad y seguridad desde el inicio.
### 3. Docker empaqueta aplicaciones en imágenes portables.

Docker empaqueta aplicaciones en imágenes portables. La decisión práctica debe considerar requisitos, validación, mantenibilidad y seguridad desde el inicio.
### 4. Compose coordina frontend, backend y MySQL localmente.

Compose coordina frontend, backend y MySQL localmente. La decisión práctica debe considerar requisitos, validación, mantenibilidad y seguridad desde el inicio.
### 5. Variables de entorno separan configuración y secretos.

Variables de entorno separan configuración y secretos. La decisión práctica debe considerar requisitos, validación, mantenibilidad y seguridad desde el inicio.
### 6. Producción requiere HTTPS, persistencia y monitoreo.

Producción requiere HTTPS, persistencia y monitoreo. La decisión práctica debe considerar requisitos, validación, mantenibilidad y seguridad desde el inicio.
### 7. Entrega manual de usuario y código fuente.

Entrega manual de usuario y código fuente. La decisión práctica debe considerar requisitos, validación, mantenibilidad y seguridad desde el inicio.

## Aplicación práctica
Antes de avanzar, dibuja el flujo de información, identifica las entradas y salidas, y verifica las operaciones con datos de prueba. Documenta comandos, versiones y capturas cuando realices la práctica en tu computadora.

## Lista de comprobación
- [ ] Reconozco cada componente y su responsabilidad.
- [ ] Puedo explicar el flujo de datos con mis palabras.
- [ ] Registré comandos, configuración y errores observados.
- [ ] Protegí credenciales y usé datos ficticios.

## Desarrollo ampliado

Prueba reglas unitarias, integración API y un recorrido manual antes de desplegar. `docker compose` puede iniciar servicios locales: frontend, API y base SQL con volúmenes persistentes. Guarda configuración en `.env`, exclúyela del repositorio si contiene secretos y ofrece `.env.example` sin valores privados. El despliegue debe usar HTTPS, copias de seguridad y migraciones revisadas. GitHub Pages solo sirve el frontend estático; para ejecutar Spring Boot continuamente se requiere otro servidor, que no es parte de esta publicación gratuita.
## Infografía
Consulta `../infografias/guia-semana-08-infografia.svg`.

## Referencias técnicas
- Documentación oficial de Java, Apache, MySQL, React, Spring, Docker o GitHub según los temas de la semana.
- Guía de Actividades adjunta por el estudiante.
