# InspectionVisitApp Server - for Prodeman

InspectionVisitApp is a system that provides inspection tools for teams that focus on IT equipment maintenance.

<br>

## Quick Start

Install dependencies:

```console
 npm install
```

Make sure you have a MySql instance in your environment.
Then create, check and set your environment variables for that instance:

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

## Deployment on Vercel's serverless function:

### https://inspection-visit-app-be.vercel.app

> ** NOTE: Remember that Vercel's serverless functions do not support uploading files from the browser, so uploading images to the ObservedValues endpoint will not work for this demo deployment. **