#!/bin/bash

COMPOSE_FILE_NAME=docker-compose.test.yml

show_help() {
  local exit_code="${1:-0}"
  echo
  echo "    Usage: $0 [option...]"
  echo
  echo "    -h display this help"
  echo "    -r rebuild container"
  echo "    -R rebuild container without using cache"
  echo
  exit "$exit_code"
}

rebuild() {
  docker-compose -f $COMPOSE_FILE_NAME build
}

rebuild_without_cache() {
  docker-compose -f $COMPOSE_FILE_NAME build --no-cache
}

while getopts ':rRh' flag; do
  case "${flag}" in
    r) rebuild ;;
    R) rebuild_without_cache ;;
    h) show_help ;;
    *) show_help 1 ;;
  esac
done

echo
echo "Running tests..."
echo
docker-compose -f $COMPOSE_FILE_NAME run pdf-generator-test 2> /dev/null
docker-compose -f $COMPOSE_FILE_NAME down -v 2> /dev/null
