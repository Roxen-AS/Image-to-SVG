FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

RUN npm install -D tailwindcss postcss autoprefixer @tailwindcss/postcss

COPY . .

RUN npm run build

CMD ["npx", "serve", "dist"]
