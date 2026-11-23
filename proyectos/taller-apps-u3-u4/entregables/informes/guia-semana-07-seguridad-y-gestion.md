# Semana 07 · Seguridad y gestión

**Autor:** Jheyssun Breydi Vargas Taipe  
**Curso:** Taller VII: Desarrollo de Aplicaciones  
**Tipo:** Informe de estudio y guía para la práctica

## Propósito
Organizar los conceptos de la guía semanal y relacionarlos con una ruta de desarrollo Full-Stack. Este documento es material de estudio; no afirma haber realizado instalaciones o pruebas no documentadas.

## Contenidos

### 1. Autenticación verifica identidad; autorización define permisos.

Autenticación verifica identidad; autorización define permisos. La decisión práctica debe considerar requisitos, validación, mantenibilidad y seguridad desde el inicio.
### 2. Spring Security aplica políticas en endpoints.

Spring Security aplica políticas en endpoints. La decisión práctica debe considerar requisitos, validación, mantenibilidad y seguridad desde el inicio.
### 3. JWT transporta claims firmados; no se guardan contraseñas en texto plano.

JWT transporta claims firmados; no se guardan contraseñas en texto plano. La decisión práctica debe considerar requisitos, validación, mantenibilidad y seguridad desde el inicio.
### 4. Roles y permisos limitan acciones y rutas.

Roles y permisos limitan acciones y rutas. La decisión práctica debe considerar requisitos, validación, mantenibilidad y seguridad desde el inicio.
### 5. Protege datos, valida entrada y aplica mínimo privilegio.

Protege datos, valida entrada y aplica mínimo privilegio. La decisión práctica debe considerar requisitos, validación, mantenibilidad y seguridad desde el inicio.

## Aplicación práctica
Antes de avanzar, dibuja el flujo de información, identifica las entradas y salidas, y verifica las operaciones con datos de prueba. Documenta comandos, versiones y capturas cuando realices la práctica en tu computadora.

## Lista de comprobación
- [ ] Reconozco cada componente y su responsabilidad.
- [ ] Puedo explicar el flujo de datos con mis palabras.
- [ ] Registré comandos, configuración y errores observados.
- [ ] Protegí credenciales y usé datos ficticios.

## Desarrollo ampliado

Autenticación responde “quién eres”; autorización responde “qué puedes hacer”. Spring Security aplica reglas en rutas y métodos; roles agrupan permisos. JWT es un token firmado con expiración: el cliente lo presenta en cada petición y el servidor verifica firma, vencimiento y permisos. Contraseñas se almacenan con hash fuerte, nunca en texto claro. Esta aplicación de portafolio no agrega login por preferencia del autor; el informe explica el tema académico, no afirma que la demo pública proteja datos privados.
## Infografía
Consulta `../infografias/guia-semana-07-infografia.svg`.

## Referencias técnicas
- Documentación oficial de Java, Apache, MySQL, React, Spring, Docker o GitHub según los temas de la semana.
- Guía de Actividades adjunta por el estudiante.
