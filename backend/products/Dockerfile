FROM node:18
WORKDIR /products-app
COPY package*.json .
RUN npm ci
COPY . .
CMD ["npm", "run", "start"]