# Stage 1: Build the react app
FROM node:18 AS build
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN ls -l
RUN npm run build

# Stage 2
FROM nginx:alpine
RUN ls -l
COPY --from=build /app/build /usr/share/nginx/html
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]