# --build stage
FROM node:12.13 AS builder
WORKDIR /app
COPY ["package.json", "./"]
RUN npm install
COPY . .
RUN npm run build

# --run stage
FROM node:12.13-alpine

ARG port=$port
ENV PORT ${port}

WORKDIR /app
COPY --from=builder /app/package.json ./
RUN npm install --omit=dev
COPY --from=builder /app/dist ./dist

EXPOSE ${PORT}

CMD ["npm", "run", "start:prod"]
