# nwen304-project

## Database Instructions:

Using: Postgresql version 10.10-2

**Setting Up the database:**

1. Create a new database called nwen304_groupproject:
    1. `psql -U <user>`
    2. `CREATE DATABASE nwen304_groupproject;`
2. Create all the tables using `psql -U <user> -d nwen304_groupproject -f ~/database.data`
3. Insert the data using `psql -U <user> -d nwen304_groupproject -f ~/data.data`

## Deployment Instructions:

Using Heroku: [Getting Started](https://devcenter.heroku.com/articles/getting-started-with-nodejs)

Deploying: `git push heroku master`

### Deploying with Database:

1. `heroku addons:create heroku-postgresql:hobby-dev` Only do this if you are making a new deployment
2. `heroku pg:psql < database.data`
3. `heroku pg:psql < data.data`