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


## MVP (Minimum Viable Product):
- Sistema de login para usuarios (gestión de app).
- Jugadores:
  - Ver jugadores.
  - Crear jugadores.
  - Editar jugadores.
  - Eliminar jugadores.
  - Exportar jugadores a CSV.
  - Importar jugadores desde CSV.

- Contratos:
  - Ver contratos.
  - Crear contratos.
  - Editar contratos.
  - Eliminar contratos.
  - Exportar contratos a CSV.
  - Importar contratos desde CSV.

- Scouting:
  - Ver jugadores ojeados.
  - Crear jugadores ojeados.
  - Editar jugadores ojeados.
  - Eliminar jugadores ojeados.
  - Crear jugador real y contrato desde un jugador ojeado.
  - Exportar jugadores ojeados a CSV.
  - Importar jugadores ojeados desde CSV.

- Anuncios oficiales:
  - Ver anuncios oficiales.
  - Crear anuncios oficiales.
  - Editar anuncios oficiales.
  - Eliminar anuncios oficiales.
  - Exportar anuncios oficiales a CSV.
  - Importar anuncios oficiales desde CSV.

- Posts:
  - Ver posts.
  - Crear posts.
  - Editar posts.
  - Eliminar posts.
  - Exportar posts a CSV.
  - Importar posts desde CSV.

