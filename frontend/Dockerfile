FROM node:16.14.2-slim

# RUN addgroup app && adduser -S -G app app
# USER app
#RUN npm i npm@latest -g

WORKDIR /app
COPY package*.json ./
RUN npm i
COPY . .

EXPOSE 3000 

CMD ["npm", "start"]