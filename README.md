# **Users - Logins Manager**

# Overview

Full-stack application created with the following technologies:

-   Frontend: Angular, TypeScript, Angular Material UI, SASS, Akita Store
-   Backend: ASP .NET Core WebApi with .NET 7, C#, PostgreSQL, pgAdmin4

# Features

-   **/GET** Get all users
-   **/GET** Get paginated users
-   **/GET** Get all user logins (successful, unsuccessful)
-   **/POST** Create new user
-   **/POST** Login user

# How to run it

    1. git clone https://github.com/Kvelail/fullstack-users-logins
    2. download & install PostgreSQL with pgAdmin4
    3. open solution from /backend in Visual Studio and add your database connection string to 'appsettings.json'
    4. migrations will be applied automatically to the datbase and default user will be created (email: 'kvelail@gmail.com', password: 'Kvelail123')
    5. start project
    6. open /frontend and run npm install
    7. run 'npm run start' instead of 'ng serve' - proxy config applied

# Dependencies

**Node version 18.16.1**

**Backend**

-   .net core
-   entity framework core design
-   entity framework core tools
-   npgsql entity framework core
-   jwt bearer

**Frontend**

-   angular dependencies
-   rxjs
-   angular material ui
-   angular svg-icon
-   date-fns
