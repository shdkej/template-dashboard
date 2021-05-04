FROM node:12.10.0 as builder
WORKDIR /usr/app
COPY package*.json ./
RUN npm ci -qy

FROM node:12.10.0-alpine
WORKDIR /usr/app
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
