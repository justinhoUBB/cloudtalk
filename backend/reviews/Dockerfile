FROM node:18
WORKDIR /reviews-app
COPY package*.json .
RUN npm ci
COPY . .
CMD ["npm", "run", "start"]