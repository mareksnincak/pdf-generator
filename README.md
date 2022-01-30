# PDF generator

API for generating PDF documents from HTML templates. Currently it is just a prototype to try various things such as puppeteer setups, therefore there are few shortcuts such as missing tests, local file template saves or typeorm auto schema generation instead of using migrations.

Postman: https://documenter.getpostman.com/view/8331704/UVeCR8mt

## How to run

### Prerequisites
- [Docker](https://www.docker.com/get-started)
- [Docker compose](https://docs.docker.com/compose/install/)

### Running the app

1. Copy env files and optionally edit them:
    ```bash
    cp pdf-generator.example.env pdf-generator.env
    cp .postgres.example.env .postgres.env
    ```

1. Launch app:
    ```bash
    docker-compose up
    ```

### Running tests

* Run tests:
    ```bash
    ./test.sh
    ```

* View test options:
    ```bash
    ./test.sh -h
    ```
