FROM golang:alpine
WORKDIR /app
COPY . .
EXPOSE 4000
ENV DEV_STAGE=docker
RUN go mod tidy
CMD go run .
