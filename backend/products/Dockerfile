FROM node:18
WORKDIR /products-app
COPY package*.json .
RUN npm ci
COPY . .
RUN npm run build
CMD ["npm", "run", "start"]