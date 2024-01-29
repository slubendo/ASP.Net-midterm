
## Setup

### Dotnet 

The `Expense` model has already been created and so has the `DatabaseContext`. The `ExpensesController` has been created, but is mostly empty. The `Program.cs` has barely been modified. You can run the app right now and check the root endpoint is working, you should see a message that says `Expense Tracker`.

### React 

There is already a react app created. Most of the UI is already created, and the routes are setup, but not much else. So you'll need to make the network requests to the server and add the needed functionality. Navigate to the frontend directory and run `npm dev` to start the react app.


### Database

You don't need to setup a database. I've already created a postgres database for you. You just need to connect to it. The details are below. But start with the in memory database. 

---

## Instructions

### Backend 

* Implement Create, Read, Update, and Delete endpoints for the `ExpensesController`
* Setup the `Program.cs` to use the database and the controller. 
  * Get it working with in memory first, then get it working with postgres. The postgres details are below.

### Frontend

* On the all expenses page, request all expenses and display them in the table
* On the create new expense page, make sure the post request saves a new expense to the database
* On the home page, make a request to get the total expenses
* handle loading and error states using a query library
* handle form validation using a form library

## Posgres Details

* postgres username:  your d2l username (your bcit email without the @bcit.ca)
* postgres password: `a_secure_password_1`
* postgres database: `neondb`
* postgres host: `ep-plain-lab-a6i697vy.us-west-2.aws.neon.tech`

---

## Rubric


| Criteria                                                    | Grade |
| ----------------------------------------------------------- | ----- |
| Implement all CRUD endpoints for the expenses controller    | 15%   |
| Setup the program.cs to use the database and the controller | 15%   |
| Migrate and connect correctly to postgres using env vars    | 10%   |
| Get and Post from the client                                | 20%   |
| handle loading and error states                             | 10%   |
| handle form validation                                      | 5%    |
| build the react app into the dotnet app and deploy it       | 10%   |
| General programming best practices                          | 15%   |
