FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY .. .
RUN npx ng build --configuration production

FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=build app/dist/contacts-app-frontend/browser /usr/share/nginx/html

EXPOSE 80
