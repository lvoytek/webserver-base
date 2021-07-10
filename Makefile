.PHONY:build
build:
	rm -f nginx/.env
	ln .env nginx/
	docker-compose build

.PHONY:start
start:
	docker-compose up -d

.PHONY:stop
stop:
	docker-compose down --remove-orphans