# Speech Recognition App

One Paragraph of project description goes here

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Starting the app locally

Start by installing front and backend dependencies. While in this directory, run the following command:
```
npm install
```
While waiting for the dependencies to install, create the MySQL database by running the `motivational_quotes_schema.sql` file inside the `seeds` folder.

To see this example boilerplate in action, create a `.env` file in the root of this project with the following inside:
DB_USERNAME=root
DB_PASSWORD=whateveryourpasswordis
DB_NAME=motivation_development
DB_HOST=127.0.0.1

REV_AI_ACCESS_TOKEN=yourRev.aiaccesstoken

After both installations complete, run the following command in your terminal:

```
npm run seed
```

Then:

```
npm start
```
Your app should now be running on <http://localhost:3000>. The Express server should intercept any AJAX requests from the client.

### Installing

A step by step series of examples that tell you how to get a development env running

Say what the step will be

```
Give the example
```

And repeat

```
until finished
```

End with an example of getting some data out of the system or using it for a little demo

## Running the tests

in your terminal/gitbash, enter

npm start

to run the app

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* [](http:) - The web framework used
* [](https:) - Dependency Management
* [](https:) - Used to generate RSS Feeds

## Contributing

Please read [CONTRIBUTING.md]() for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [](http:) for versioning. For the versions available, see the [tags on this repository](https://github.com/Sacchiy/speech-recognition-app/tags). 

## Authors

* **Federico, Kevin, Sachiko** - *Initial work* - [Speech Recognition App] https://github.com/Sacchiy/speech-recognition-app/

See also the list of [contributors](https://github.com/Sacchiy/speech-recognition-app/contributors) who participated in this project.

## License

This project is licensed under the xxxx License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone whose code was used
* Inspiration
* etc
