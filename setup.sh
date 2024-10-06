# setup.sh

#!/bin/bash

# Run your setup script here
echo "copy environment variables"
cp ./secrets/bookstoreAccountKey.json ./bookstore-auth/
cp ./secrets/.env.books ./bookstore-books/.env
cp ./secrets/.env.favorites ./bookstore-favorites/.env
cp ./secrets/.env.ui ./bookstore-ui/.env
cp ./secrets/.env.users ./bookstore-users/.env


# Run docker-compose up
docker compose up --build