FROM golang:alpine
WORKDIR /app
COPY . .

ENV DEV_STAGE=docker
ARG PORT_VAR
ENV PORT=$PORT_VAR
EXPOSE $PORT_VAR
RUN go mod tidy
CMD go run .
