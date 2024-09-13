FROM node:22.8

WORKDIR /frondend-test-server/

COPY . .

RUN npm install

EXPOSE 9091

CMD ["npm", "run", "start"]
