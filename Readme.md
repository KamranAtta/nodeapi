# Nodejs FES Template

# Environment vars
This project uses the following environment variables:

| Name                          | Description                         | Default Value                                  |
| PORT                          | prject default local port           | 5000 |
| DB_URL                        | MongoDB URL of the database | mongodb+srv://<username>:<password>@<clustername>.11liq14.mongodb.net/<database>
| CORS                           | Cors accepted values                | "*" |


# Pre-requisites
- Install [Node.js](https://nodejs.org/en/) version 18.18.1


# Getting started
- Clone the repository
```
git clone  git@github.com:KamranAtta/nodeapi.git
```
- Install dependencies
```
cd nodeapi
npm install
```
- Build and run the project
```
npm start
```
  Navigate to `http://localhost:5000`

- API Document endpoints, Use Postman(recommended)

POST: http://localhost:5000/signup

POST: http://localhost:5000/login

GET: http://localhost:5000/users

GET: http://localhost:5000/users/:id

DELETE: http://localhost:5000/users/:id

PATCH: http://localhost:5000/users/:id
