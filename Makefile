.PHONY: docker-start docker-stop docker-test start test help
.DEFAULT_GOAL: help

default: help

help: ## Output available commands
	@echo "Available commands:"
	@echo
	@fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | sed -e 's/\\$$//' | sed -e 's/##//'

docker-start:  ## Run a development environment on port 3000
	@docker-compose up -d app

docker-stop: ## Stop the development environment running on port 3000
	@docker-compose stop

docker-test: ## Run the test suite
	@docker-compose build test
	@docker-compose run test

start: ## Run a development environment on port 3000
	@npm start

test: ## Run the test suite
	@npm test
