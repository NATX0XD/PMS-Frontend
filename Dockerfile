FROM node:23-alpine3.20 AS builder

WORKDIR /app

COPY ./ .

RUN yarn install --production --ignore-scripts --prefer-offline --frozen-lockfile
RUN yarn run build

FROM node:23-alpine3.20 AS runner

WORKDIR /app

ARG NEXT_PUBLIC_API_URL=https://localhost:3000 \
    NEXT_PUBLIC_APP_NAME=APP NAME \
    NEXT_PUBLIC_APP_SHORT_NAME=APP \
    APP_PORT=3000 \
    NODE_ENV=production \
    TZ=Asia/Bangkok 
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL \
    NEXT_PUBLIC_APP_NAME=$NEXT_PUBLIC_APP_NAME \
    NEXT_PUBLIC_APP_SHORT_NAME=$NEXT_PUBLIC_APP_SHORT_NAME \
    APP_PORT=$APP_PORT \
    NODE_ENV=$NODE_ENV \
    TZ=$TZ

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/entrypoint.sh ./entrypoint.sh
COPY --from=builder /app/.env.production ./.env
RUN chmod +x ./entrypoint.sh

HEALTHCHECK --interval=15s --timeout=10s --start-period=15s --retries=8 \
    CMD wget -qO- http://localhost:$APP_PORT || exit 1

EXPOSE $APP_PORT

ENTRYPOINT ["./entrypoint.sh"]
# CMD ["node_modules/.bin/next", "start", "--port", "3000"]