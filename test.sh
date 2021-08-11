#!/bin/bash

show_help() {
  local exit_code="${1:-0}"
  echo
  echo "    Usage: $0 [option...]"
  echo
  echo "    -h display this help"
  echo "    -r rebuild container"
  echo
  exit "$exit_code"
}

rebuild() {
  docker-compose -f docker-compose.test.yml build --no-cache
}

while getopts ':rh' flag; do
  case "${flag}" in
    r) rebuild ;;
    h) show_help ;;
    *) show_help 1 ;;
  esac
done

echo
echo "Running tests..."
echo
docker-compose -f docker-compose.test.yml run pdf-generator-test 2> /dev/null
docker-compose -f docker-compose.test.yml down -v --remove-orphans 2> /dev/null
