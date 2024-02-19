FROM node:20-alpine
WORKDIR /usr/code/client
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm","start"]