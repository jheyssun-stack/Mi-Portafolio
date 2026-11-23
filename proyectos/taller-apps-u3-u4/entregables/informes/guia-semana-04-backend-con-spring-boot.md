# Semana 04 · Backend con Spring Boot

**Autor:** Jheyssun Breydi Vargas Taipe  
**Curso:** Taller VII: Desarrollo de Aplicaciones  
**Tipo:** Informe de estudio y guía para la práctica

## Propósito
Organizar los conceptos de la guía semanal y relacionarlos con una ruta de desarrollo Full-Stack. Este documento es material de estudio; no afirma haber realizado instalaciones o pruebas no documentadas.

## Contenidos

### 1. Spring Initializr crea el esqueleto del proyecto.

Spring Initializr crea el esqueleto del proyecto. La decisión práctica debe considerar requisitos, validación, mantenibilidad y seguridad desde el inicio.
### 2. MVC separa modelo, vista y controlador/API.

MVC separa modelo, vista y controlador/API. La decisión práctica debe considerar requisitos, validación, mantenibilidad y seguridad desde el inicio.
### 3. Entidad JPA representa una tabla; configuración conecta MySQL.

Entidad JPA representa una tabla; configuración conecta MySQL. La decisión práctica debe considerar requisitos, validación, mantenibilidad y seguridad desde el inicio.
### 4. Repository abstrae operaciones de persistencia.

Repository abstrae operaciones de persistencia. La decisión práctica debe considerar requisitos, validación, mantenibilidad y seguridad desde el inicio.
### 5. Service aplica reglas de negocio y transacciones.

Service aplica reglas de negocio y transacciones. La decisión práctica debe considerar requisitos, validación, mantenibilidad y seguridad desde el inicio.
### 6. Controller publica endpoints REST.

Controller publica endpoints REST. La decisión práctica debe considerar requisitos, validación, mantenibilidad y seguridad desde el inicio.
### 7. CRUD expone create/read/update/delete.

CRUD expone create/read/update/delete. La decisión práctica debe considerar requisitos, validación, mantenibilidad y seguridad desde el inicio.
### 8. Bean Validation y pruebas cubren entradas y errores.

Bean Validation y pruebas cubren entradas y errores. La decisión práctica debe considerar requisitos, validación, mantenibilidad y seguridad desde el inicio.

## Aplicación práctica
Antes de avanzar, dibuja el flujo de información, identifica las entradas y salidas, y verifica las operaciones con datos de prueba. Documenta comandos, versiones y capturas cuando realices la práctica en tu computadora.

## Lista de comprobación
- [ ] Reconozco cada componente y su responsabilidad.
- [ ] Puedo explicar el flujo de datos con mis palabras.
- [ ] Registré comandos, configuración y errores observados.
- [ ] Protegí credenciales y usé datos ficticios.

## Desarrollo ampliado

En Spring MVC, un `@RestController` recibe HTTP y devuelve JSON; un servicio concentra reglas; un `JpaRepository` permite guardar y consultar entidades JPA. Configura la conexión MySQL mediante variables de entorno, crea DTOs para entradas/salidas y valida con anotaciones como `@NotBlank` y `@Positive`. Divide rutas por recurso (`/api/estudiantes`) y responde con códigos HTTP apropiados. Las pruebas de servicio cubren reglas; las de controlador cubren contrato y validación.
## Infografía
Consulta `../infografias/guia-semana-04-infografia.svg`.

## Referencias técnicas
- Documentación oficial de Java, Apache, MySQL, React, Spring, Docker o GitHub según los temas de la semana.
- Guía de Actividades adjunta por el estudiante.
