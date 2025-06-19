# Plants App

La intención principal de este proyecto es utilizar Sveltekit para montar una web que permita ver y gestionar las plantas de un hogar. La idea es que el usuario pueda añadir plantas, verlas en una lista y gestionar su cuidado.

## Echar a andar el proyecto
Para empezar a trabajar con el proyecto, lo primero que hay que hacer es clonar el repositorio y ejecutar el siguiente comando para instalar las dependencias:

```bash
git clone
cd plants-app
npm install
```

Una vez instaladas las dependencias, debes crear un archivo `.env` en la raíz del proyecto:

```bash
touch .env
```
Y añadir las siguientes variables de entorno:

```env
DATABASE_URL=<motor>://<user>:<password>@<host>:<port>/<database>"
```

Tras esto, debes generar los archivos propios locales de Prisma con:

```bash
npm run prisma:generate
```

Ahora ya puedes ejecutar el proyecto con:

```bash
npm run dev
```


Esto abrirá el proyecto en un [servidor local](http://localhost:5175) y podrás ver la aplicación en tu navegador.


## Funcionalidades
- Público:
  - Ver plantas.
  - Suscribirse al boletín de la app.
  - La suscripción al boletín sirve para que la app te notifique al móvil mediante push notifications y mediante correo acerca de qué plantas requieren cuidados.

- Privado:
	- Plantas:
		- Ver plantas.
		- Crear plantas.
		- Editar plantas.
		- Eliminar plantas (CRUD).
		- Generar QR para una o varias plantas.
		- Ver QR de una o varias plantas.
		- Descargar un archivo PDF generado con los códigos QR de las plantas seleccionadas.

	- Usuarios:
		- Ver usuarios.
		- Crear usuarios.
		- Editar usuarios.
		- Eliminar usuarios.
		- Cambiar contraseña de un usuario.

	- Suscripciones (push):
		- Ver suscripciones (con user-agent y usuario).
		- Eliminar suscripciones.

## Cosas a futuro
Esta app puede escalar rápido y puede ser que se considere oportuno añadir nuevas partes a ella. Cosas que pueden llegar en un futuro son:
- Quizás en un futuro se considere introducir una nueva "app" dentro de esta, con paneles propios para gestionar stockage de productos de casa como agua, tierra, abono, etc.
- El apartado de Stockage puede ser con productos no relacionados con plantas, como por ejemplo productos de limpieza, comida, etc.
- Se va a utilizar un lector de códigos de barras para escanear productos y buscar en API por si se pueden obtener los datos de manera más sencilla.