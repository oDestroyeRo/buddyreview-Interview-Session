FROM node:12
WORKDIR /usr/src/app

COPY nestjs-back-end/ .
RUN npm install

EXPOSE 3000
CMD ["npm", "run", "start"]