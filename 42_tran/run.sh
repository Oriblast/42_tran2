#!/bin/bash
set -e

BASEDIR=$(dirname "$0")
DC="$BASEDIR/docker-compose.yml"

docker_compose_command() {
    docker-compose -f $DC "$@"
}

show_help() {
    echo "Usage: ./script.sh [all|stop|status|rebuild|restart|full-clean]"
    echo "Commands:"
    echo "  a     : Start the application."
    echo "  stop  : Stop the application."
    echo "  ps    : Show the status of the application docker."
    echo "  reb   : Rebuild all Docker images."
    echo "  rest  : Restart the application."
    echo "  fc    : Clean all Docker related data and free up port."
}

a() {
    echo "Building and starting the application..."
    docker_compose_command build
    docker_compose_command up -d
}

stop() {
    echo "Stopping the application..."
    docker_compose_command down
}

ps() {
    echo "Showing application status..."
    docker_compose_command ps
}

reb() {
    echo "Rebuilding all Docker images..."
    docker_compose_command build --no-cache
}

rest() {
    echo "Restarting the application..."
    docker volume prune -f
    docker_compose_command restart
}

fc() {
    echo "Cleaning all Docker related data..."
    docker_compose_command down -v
    docker volume prune -f
    docker network prune -f
    docker system prune --all -f
    rm -rf ./python/app/
    rm -rf ./frontend/.pnpm-store/
    rm -rf ./frontend/node_modules/
}

case $1 in
    a) a ;;
    stop) stop ;;
    ps) ps ;;
    reb) reb ;;
    rest) rest ;;
    fc) fc ;;
    help) show_help ;;
    *) echo "Invalid command."; show_help ;;
esac
