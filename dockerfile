FROM node:latest AS builder
WORKDIR /build
COPY . .

RUN npm install && npm run build




FROM node:latest AS runner
WORKDIR /bot
ENV NODE_ENV=production
ENV CLIENT_ID="Replace!"
ENV TOKEN="Replace!"
COPY --from=builder /build/dist ./dist
COPY --from=builder /build/package.json .
COPY --from=builder /build/package-lock.json .
RUN npm install

CMD ["node","dist/bootstrap.js"]