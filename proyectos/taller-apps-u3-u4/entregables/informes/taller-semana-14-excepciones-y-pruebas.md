# Semana 14 · Excepciones, depuración y pruebas

**Proyecto:** JHEYVX TECH · aplicación de escritorio Java Swing

## Propósito y desarrollo

Validar entradas, responder con errores legibles y comprobar reglas de negocio con JUnit. Se prueban CRUD, importes y stock no negativos, consistencia de ventas y comunicación TCP.

## Flujo técnico

`Entrada inválida → IllegalArgumentException; SQL fallido → rollback + mensaje; pruebas → JUnit 5`

## Resultado y evidencia

Ejecución comprobada: 4 pruebas, 0 fallos y 0 errores (Maven Surefire).

## Herramientas y componentes

JUnit 5 · Maven Surefire · PreparedStatement · transacciones
