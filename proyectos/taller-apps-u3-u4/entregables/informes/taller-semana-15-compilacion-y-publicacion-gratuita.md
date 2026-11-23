# Semana 15 · Empaquetado y ejecución del proyecto

**Proyecto:** JHEYVX TECH · aplicación de escritorio Java Swing

## Propósito y desarrollo

Empaquetar clases y dependencias en un JAR ejecutable con clase principal declarada. La aplicación no requiere VPS: corre localmente y guarda sus datos en la carpeta data.

## Flujo técnico

`mvn clean test package → JAR autocontenido → Java 8+ → base local H2`

## Resultado y evidencia

Artefacto generado: target/JHEYVX-Tech-Desktop.jar. GitHub Pages presenta y distribuye los archivos, pero no ejecuta Swing.

## Herramientas y componentes

Maven Shade Plugin · Manifest Main-Class · JAR
