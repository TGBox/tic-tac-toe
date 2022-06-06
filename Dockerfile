FROM node:alpine3.14

WORKDIR /tic-tac-toe

COPY . .

EXPOSE 3000

RUN npm install

CMD ["npm", "start"]