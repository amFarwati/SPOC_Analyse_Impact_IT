FROM node:alpine3.11
WORKDIR /usr/code/server
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 4000
CMD ["npm","run", "start:prod"]