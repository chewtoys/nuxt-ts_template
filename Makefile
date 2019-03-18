.DEFAULT_GOAL := help

.PHONY: help
help: ## コマンド一覧を表示
	@echo "Commands:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "    \033[36m%-20s\033[0m %s\n", $$1, $$2}'

.PHONY: analyze
analyze: ## webpackのバンドルファイル解析を時刻します
	npx nuxt-ts build --analyze

.PHONY: dev
dev: ## nuxt-tsのdev serverを立ち上げます
	npm run dev

.PHONY: lint-fix
lint-fix: ## eslintを --fix で実行します
	eslint --ext .js,.vue --ignore-path .gitignore . --fix

.PHONY: build
build: ## dockerコンテナをビルドします
	docker-compose build
	# docker-compose run --rm web npm i -g nuxt-ts
	# docker-compose run --rm web npm i

.PHONY: up
up: ## dockerコンテナを立ち上げます
	docker-compose up

.PHONY: down
down: ## dockerコンテナを停止します
	docker-compose down

.PHONY: bash
bash: ## Dockerのbashに入ります
	docker-compose exec web /bin/ash

.PHONY: db_bash
db_bash: ## dbコンテナのbashに入ります
	docker-compose exec db /bin/bash

