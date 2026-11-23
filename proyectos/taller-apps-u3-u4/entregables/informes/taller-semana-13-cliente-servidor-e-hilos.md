# Semana 13 · Arquitectura cliente-servidor y concurrencia

**Proyecto:** JHEYVX TECH · aplicación de escritorio Java Swing

## Propósito y desarrollo

Separar la interfaz del servicio mediante peticiones JSON por TCP. El servidor acepta varias conexiones usando un pool de hilos y delega las acciones de inventario y ventas a los mismos servicios.

## Flujo técnico

`Swing Client → socket TCP local → JSON por línea → ExecutorService → servicios JDBC`

## Resultado y evidencia

La prueba de integración inicia el servidor en un puerto libre y comprueba una petición PING cliente-servidor.

## Herramientas y componentes

ApiClient.java · ApiServer.java · ExecutorService · TCP
