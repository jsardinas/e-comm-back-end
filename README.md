# e-commerce back-end
![badge](https://img.shields.io/badge/license-ISC-brightgreen)

## Description
Simple [API](htps://localhost:3001/api/categories/) to manage a database of products for an e-commerce solution.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)

## Installation
- npm install
- npm start

## Usage
The [API](htps://localhost:3001/api/categories/) can be hit from the browser or using an API platform like Postman or Insomnia.

To test on your local computer call `https://localhost:3001/api/<x>/` where `x` is one of `tags`, `categories` or `products` and `id` is a parameter. `GET`, `POST`, `PUT` and `DELETE` verbs can be used to get, create, update and delete respectively.

Watch [this video](https://youtu.be/8FYipeuEdpQ) for a walkthrough of all the capabilities.

### Examples
`GET https://localhost:3001/api/products` will return a list of all the products and the associated tags for each product.

`GET https://localhost:3001/api/products/1` will return the product with id `1` and its associated tags.

`POST https://localhost:3001/api/tags` will create a new tag. This call requires a json formatted body with the parameters.

## License
![badge](https://img.shields.io/badge/license-ISC-brightgreen)

This application is covered under ISC license.

## Contributing
This project is public on Github, feel free to submit your pull requests.

## Tests
None at this moment

## Questions


Contact Me

[![](http://www.github.com/jsardinas.png?size=36) jsardinas](http://github.com/jsardinas) on Github 

[:email: javier.sardinas@gmail.com](mailto:javier.sardinas@gmail.com)


<br/><br/>

<span style="font-size:.75em">Made with [Markdown Generator](https://github.com/jsardinas/mdgen)</span>
