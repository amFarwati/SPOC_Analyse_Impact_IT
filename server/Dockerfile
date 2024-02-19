FROM node:alpine3.11
WORKDIR /usr/code/server
COPY package*.json ./
RUN npm install
RUN npm install redaxios
COPY . .
EXPOSE 4000
CMD ["npm","run", "start:prod"]