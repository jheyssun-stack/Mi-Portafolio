# Semana 06 · Integración Full-Stack

**Autor:** Jheyssun Breydi Vargas Taipe  
**Curso:** Taller VII: Desarrollo de Aplicaciones  
**Tipo:** Informe de estudio y guía para la práctica

## Propósito
Organizar los conceptos de la guía semanal y relacionarlos con una ruta de desarrollo Full-Stack. Este documento es material de estudio; no afirma haber realizado instalaciones o pruebas no documentadas.

## Contenidos

### 1. React consume endpoints del backend por HTTP.

React consume endpoints del backend por HTTP. La decisión práctica debe considerar requisitos, validación, mantenibilidad y seguridad desde el inicio.
### 2. Fetch/Axios envían JSON y leen respuestas.

Fetch/Axios envían JSON y leen respuestas. La decisión práctica debe considerar requisitos, validación, mantenibilidad y seguridad desde el inicio.
### 3. El CRUD completo incluye listar, crear, editar y borrar.

El CRUD completo incluye listar, crear, editar y borrar. La decisión práctica debe considerar requisitos, validación, mantenibilidad y seguridad desde el inicio.
### 4. Mostrar estados de carga y error mejora claridad.

Mostrar estados de carga y error mejora claridad. La decisión práctica debe considerar requisitos, validación, mantenibilidad y seguridad desde el inicio.
### 5. Backend vuelve a validar; la interfaz no es frontera de seguridad.

Backend vuelve a validar; la interfaz no es frontera de seguridad. La decisión práctica debe considerar requisitos, validación, mantenibilidad y seguridad desde el inicio.

## Aplicación práctica
Antes de avanzar, dibuja el flujo de información, identifica las entradas y salidas, y verifica las operaciones con datos de prueba. Documenta comandos, versiones y capturas cuando realices la práctica en tu computadora.

## Lista de comprobación
- [ ] Reconozco cada componente y su responsabilidad.
- [ ] Puedo explicar el flujo de datos con mis palabras.
- [ ] Registré comandos, configuración y errores observados.
- [ ] Protegí credenciales y usé datos ficticios.

## Desarrollo ampliado

React llama al backend con `fetch`, define `Content-Type: application/json`, envía el método y el cuerpo, verifica `response.ok` y luego interpreta JSON. La vista distingue carga, éxito, lista vacía y error. Para CRUD, usa `GET` para listar/leer, `POST` para crear, `PUT` o `PATCH` para actualizar y `DELETE` para borrar. CORS se configura en el backend para permitir el origen de la aplicación; nunca se debe omitir la validación del lado servidor.
## Infografía
Consulta `../infografias/guia-semana-06-infografia.svg`.

## Referencias técnicas
- Documentación oficial de Java, Apache, MySQL, React, Spring, Docker o GitHub según los temas de la semana.
- Guía de Actividades adjunta por el estudiante.
