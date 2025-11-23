FROM node:18.20.8 AS builder

RUN corepack enable

WORKDIR /app

COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm run build


FROM node:18.20.8 AS runner

RUN corepack enable

WORKDIR /app

RUN apt-get update && apt-get install -y netcat-openbsd

COPY --from=builder /app ./

COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

EXPOSE 3000

ENTRYPOINT ["./entrypoint.sh"]
