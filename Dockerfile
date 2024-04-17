FROM node:latest

WORKDIR /frondend-test-server/

COPY . .

RUN npm install

EXPOSE 9091

CMD ["npm", "run", "start"]
