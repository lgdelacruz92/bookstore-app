# Documentation

# Video Demo of The App In Use

https://www.loom.com/share/0a0c5e3fc7b84c6895b2021684f19839?sid=879c3834-e129-45cd-b7fd-18684cd7e62b

## How to run the services

1 .   extract `bookstore-app.zip`
2 .   extract `secrets.zip` inside the extracted folder of `bookstore-app`
3 .   Folder structure should look like this 

```
|----bookstore-app
		|----secrets/
				|----.env.users
				...
		|---
```
4 .  inside bookstore app run this in the terminal `chmod +x setup.sh && ./setup.sh`. 
	 Note: This should copy the .env files the proper folders and run `docker compose`
### Warning: at the time of this writing the `docker compose` is what I'm using. There is another version called `docker-compose` and I did not test this on that.


# Requirements

#### Requirements:

1. **Frontend Development:**

   - Implement a responsive web interface using React.
   - Design intuitive user interfaces for browsing books, searching for books by title or author, and viewing book details.

2. **Backend Development:**

   - Implement CRUD operations for managing and browsing books, as well as viewing book details.
   - Integrate with a database of your choice to store book data.
   - NOTE: We ask that you do not use Next.js for this assessment. Any other backend framework is fine.

3. **Database Design:**

   - Design an appropriate database schema to store information about books.

4. **Additional Features:**

   - Implement validation and error handling on both the frontend and backend to ensure data integrity and provide a smooth user experience.
   - Allow for the entire project to be stood up using a single Docker Compose command.

5. **Bonus Points:**
   - Implement user authentication for login and registration functionalities (3rd party library/services are allowed).
   - Implement a "favorites" list where the user can save and manage their favorite books.
   - Verify your work with unit tests.
   - Use a monorepo build system to structure your project (hint: We are big fans of Nx).
# Architecture

![bookstore-architecture](./books-store-architecture.png)

# Decisions
### Tech
* Database: I've decided to use MongoDB. For in a real production app, there are often extra layer for DB caching on traditional relational dbs. MongoDB allows me to abstract all of that as the cloud service provides that efficiently.
* Auth Service: I've decided to use Firebase as it comes with google email login and authentication out of the box
* FrontEnd: React (typescript)
* Services: Node Express apps.
### Architecture
* I've decided to use the latest and greatest micro services architecture. This is each entity like `Books,Uses,Favorites` is encapsulated in their own service.
	* This allows services to be much more scalable, focused, and DRY. 
# Repos

### Main Repos:
- bookstore-ui (React App)
- bookstore-books
- bookstore-favorites
- bookstore-auth (node wrapper for firebase)
- bookstore-users

Based on Monorepo microservices architecture design. I've made sure that each specific entity serves a singular purpose. For example `bookstore-books` is solely for book operations and `bookstore-users` is solely for user operations.

```
.
├── README.md
├── bookstore-auth
│   ├── Dockerfile
│   ├── bookstoreAccountKey.json
│   ├── dist
│   ├── http
│   ├── package-lock.json
│   ├── package.json
│   ├── serviceAccountKey.json
│   ├── src
│   └── tsconfig.json
├── bookstore-books
│   ├── Dockerfile
│   ├── db
│   ├── dist
│   ├── http
│   ├── package.json
│   ├── public
│   ├── src
│   └── tsconfig.json
├── bookstore-favorites
│   ├── Dockerfile
│   ├── http
│   ├── package-lock.json
│   ├── package.json
│   ├── src
│   └── tsconfig.json
├── bookstore-ui
│   ├── Dockerfile
│   ├── README.md
│   ├── bookstore-shared
│   ├── build
│   ├── craco.config.js
│   ├── nginx.conf
│   ├── package.json
│   ├── public
│   ├── src
│   ├── tailwind.config.js
│   └── tsconfig.json
├── bookstore-users
│   ├── Dockerfile
│   ├── http
│   ├── package.json
│   ├── src
│   └── tsconfig.json
├── docker-compose.yml
├── output.txt
├── package-lock.json
└── package.json

23 directories, 27 files

```
