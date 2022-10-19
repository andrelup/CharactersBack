# Iniciar el proyecto sin docker
```
npm start
```

# Iniciar el proyecto con docker
```
npm run build-docker
npm run run-docker
```
## Lanzar los tests unitarios
```
npm run test
```

# Librerías usadas:
He usado `expressJS` y `nodeJS` para construir el backend, porque es la tecnología que uso actualmente en el trabajo para el back, por lo tanto es la que me hace sentir más confortable a la hora de programar bien y con rapidez. 
Sin embargo en el trabajo usamos una versión antigua de node, y he decido hacer esta prueba en la ultima versión de nodeJS más estable(16.18.0) para que puedan ver que también puedo salir de mi zona de conforto y construir un buen producto.
Las demás Librerías he usado dentro del proyecto front fueran las que son más usadas dentro de la comunidad nodeJS, porque acaban por ser las mejores documentadas y por si encontro algun error raro tengo el apoyo de la comunidad.
Estas serían:
    - `node-fetch` para consultar otra API;
    - `mongodb` para consultar la base de datos;
    - `jsonwebtoken` para gestionar el token de seguridad;

# Base de datos 
La base de datos ya está totalmente configurada, porque he usado mongodb Atlas para crear una base de datos en la cloud. 
He permitido acesso desde todos IPs, como es una aplicacion de prueba no necesitamos de este nivel de seguridad. 
Entonces solo tenemos aceder a la BBDD con usuario y contraseña que están metidos ya en el código

