# InspectionVisitApp Server - for Prodeman

InspectionVisitApp is a system that provides inspection tools for teams that focus on IT equipment maintenance.

<br>

## Quick Start

Install dependencies:

```console
 npm install
```

Create, check and set your environment variables:

```console
 touch .env
```

...then setup!

Start your db:

```console
 npx sequelize-cli db:create
```

Run migrations:

```console
 npx sequelize-cli db:migrate --name 20221114155448-create-observed-values.js
```

Seed data:

```console
 npx sequelize-cli db:seed --seed 20221114044920-teams.js
```

Start the server:

```console
 npm start
```

 View the server at: http://localhost:3000

<br>