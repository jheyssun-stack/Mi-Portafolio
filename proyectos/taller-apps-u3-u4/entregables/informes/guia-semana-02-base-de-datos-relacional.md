# Semana 02 · Base de datos relacional

**Autor:** Jheyssun Breydi Vargas Taipe  
**Curso:** Taller VII: Desarrollo de Aplicaciones  
**Tipo:** Informe de estudio y guía para la práctica

## Propósito
Organizar los conceptos de la guía semanal y relacionarlos con una ruta de desarrollo Full-Stack. Este documento es material de estudio; no afirma haber realizado instalaciones o pruebas no documentadas.

## Contenidos

### 1. Modela entidades y atributos antes de codificar.

Modela entidades y atributos antes de codificar. La decisión práctica debe considerar requisitos, validación, mantenibilidad y seguridad desde el inicio.
### 2. ER: entidades, relaciones y cardinalidad.

ER: entidades, relaciones y cardinalidad. La decisión práctica debe considerar requisitos, validación, mantenibilidad y seguridad desde el inicio.
### 3. MySQL crea el esquema con CREATE DATABASE.

MySQL crea el esquema con CREATE DATABASE. La decisión práctica debe considerar requisitos, validación, mantenibilidad y seguridad desde el inicio.
### 4. PK identifica filas; FK preserva relaciones.

PK identifica filas; FK preserva relaciones. La decisión práctica debe considerar requisitos, validación, mantenibilidad y seguridad desde el inicio.
### 5. INSERT agrega; SELECT consulta; UPDATE edita; DELETE borra.

INSERT agrega; SELECT consulta; UPDATE edita; DELETE borra. La decisión práctica debe considerar requisitos, validación, mantenibilidad y seguridad desde el inicio.

## Aplicación práctica
Antes de avanzar, dibuja el flujo de información, identifica las entradas y salidas, y verifica las operaciones con datos de prueba. Documenta comandos, versiones y capturas cuando realices la práctica en tu computadora.

## Lista de comprobación
- [ ] Reconozco cada componente y su responsabilidad.
- [ ] Puedo explicar el flujo de datos con mis palabras.
- [ ] Registré comandos, configuración y errores observados.
- [ ] Protegí credenciales y usé datos ficticios.

## Desarrollo ampliado

Un esquema relacional divide los datos en entidades. Para una plataforma educativa, tablas posibles son estudiante, curso, matrícula y entrega. `estudiante.id` identifica una fila; `matricula.estudiante_id` referencia la clave primaria y debe apuntar a una persona existente. Declara tipos, `NOT NULL`, unicidad y claves foráneas antes de cargar. Practica `INSERT`, `SELECT`, `UPDATE` y `DELETE` en una base de prueba, revisando qué filas afecta cada sentencia.
## Infografía
Consulta `../infografias/guia-semana-02-infografia.svg`.

## Referencias técnicas
- Documentación oficial de Java, Apache, MySQL, React, Spring, Docker o GitHub según los temas de la semana.
- Guía de Actividades adjunta por el estudiante.
