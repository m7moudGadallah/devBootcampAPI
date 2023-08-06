# Dev Bootcamps API

<div align="center" width=100%>
    &emsp;
    <img src="./src/dev-data/pic/api.png" alt="api" width=10%" />
    <img src="./src/dev-data/pic/nodejs.png" alt="nodejs" width=10%" />
    <img src="./src/dev-data/pic/mongodb.png" alt="mongodb" width=10%" />
</div>
<br>

## Content

<!-- TOC -->

- [Dev Bootcamps API](#dev-bootcamps-api)
    - [Content](#content)
    - [Description](#description)
    - [Project Specification](#project-specification)
    - [Installation](#installation)
    - [Usage](#usage)
        - [Development Mode](#development-mode)
        - [Production Mode](#production-mode)
    - [Version](#version)
    - [License](#license)
    - [How to Use the API](#how-to-use-the-api)
    - [Technologies Used](#technologies-used)
    - [Acknowledgments](#acknowledgments)

<!-- /TOC -->

## Description

This is the backend for a bootcamp directory website that provides information about available bootcamps, their courses, publishers, and reviews.

**_[⬆️top](#content)_**

## Project Specification

For detailed information about the project's specifications, please refer to [projectSpecifications.md](./docs/projectSpecifications.md).

## Installation

1. Rename the file `config/config.env.env` to `config/config.env` and set the appropriate values to configure the application based on your requirements.

2. Install the dependencies by running the following command:

```
npm install
```

## Usage

### Development Mode

To run the application in development mode, use the following command:

```
npm run start:dev
```

### Production Mode

To run the application in production mode, use the following command:

```
npm run start:prod
```

**_[⬆️top](#content)_**

## Version

Current version: v1.0.0

## License

This project is licensed under the MIT License - see the [LICENSE.md](./LICENSE) file for details.

**_[⬆️top](#content)_**

## How to Use the API

Please refer to the [API documentation](https://m7moudgadallah.github.io/devBootcampAPI/) for information on how to interact with the API and the available endpoints.

## Technologies Used

-   API: Node.js with Express
-   Database: MongoDB
-   Additional Tools:
    -   [Mailtrap](https://mailtrap.io/): An email testing service that allows developers to inspect and debug emails sent from their applications during development.
    -   [Geocoder](https://www.npmjs.com/package/node-geocoder): A Node.js library for geocoding and reverse geocoding addresses using various geocoding providers.
        -   [MapQuest Geocoding API](https://developer.mapquest.com/documentation/geocoding-api/): The MapQuest Geocoding API is used to convert addresses into geographic coordinates (latitude and longitude) and vice versa.

**_[⬆️top](#content)_**

## Acknowledgments

This project is based on the teachings and materials from the Node.js API Masterclass With Express & MongoDB course on Udemy. Special thanks to the instructor and creators of the course for providing valuable insights into building robust APIs using Node.js, Express, and MongoDB.

Course Link: [Node.js API Masterclass With Express & MongoDB](https://www.udemy.com/course/nodejs-api-masterclass/)

**_[⬆️top](#content)_**

> Note: Please note that this project may have been customized or extended beyond the original course content to meet specific requirements or add additional features.
