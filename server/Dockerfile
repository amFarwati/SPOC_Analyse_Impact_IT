FROM node:14.14.0-alpine
WORKDIR /SPOC_Analyse_Impact_IT
COPY ./package.json ./
RUN npm i
COPY . .
CMD ["npm","run", "dev"]