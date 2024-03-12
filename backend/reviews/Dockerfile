FROM node:18
WORKDIR /reviews-app
COPY package*.json .
RUN npm ci
COPY . .
RUN npm run build
CMD ["npm", "run", "start"]