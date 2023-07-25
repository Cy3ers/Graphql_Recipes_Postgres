# Recipe Manager

The Recipe App is a web application that allows users to create, view, and manage recipes. Users can add new recipes with ingredients and instructions, view a list of existing recipes, and delete recipes they no longer need. The app is built using React, GraphQL, and Apollo Client.

### Table of Contents:
- [Features](#Features)
- [Installation](#Installation)
- [Usage](#Usage)
- [Technologies Used](#Technologies-Used)
- [Contributing](#Contributing)
- [License](#License)

## Features
View a list of recipes with their titles, descriptions, ingredients, and summarized instructions.
Add new recipes with a title, description, detailed instructions, and a list of ingredients (name, quantity, and unit).
Delete recipes from the list.

## Installation

To run the Recipe App locally, follow these steps:

Clone the Repository:
```bash
git clone https://github.com/Cy3ers/Graphql_Recipes_Postgres.git
cd Graphql_Recipes_Postgres
```

Install Dependencies:

```bash
npm install

cd frontend
npm install # For frontend dependencies
```

Start the development server:
```bash
# In the project directory:
npm start

# In a new terminal:
cd frontend
npm start

# Press 'y' if prompted which will run it on a different port
```
The app should now be running at [http://localhost:3000](http://localhost:3000).

> If the port is changed in the prompt above than your port will be different

## Usage

Upon launching the app, you will see a list of existing recipes (if any) displayed as cards on the homepage.
To add a new recipe, click the "Add Recipe" button and fill out the required information in the form. You can also add multiple ingredients by clicking the "+" button and remove them using the red "X" button (on larger screens) or "Remove" button (on smaller screens).
To delete a recipe, click the red "X" button next to the recipe title on the homepage.
To view a recipe in full-screen, click the recipes title.

## Technologies Used
React
>  Frontend JavaScript library for building user interfaces.

GraphQL
> Query language and runtime for APIs.

Apollo Client
> State management library for GraphQL.

React Icons
> Library for including popular icons in React applications.

## Contributing

Contributions to the Recipe App are welcome! If you find any issues or have suggestions for improvements, please feel free to submit a pull request or open an issue.
```bash
- Fork the repository from the main branch.
- Create a new branch with a descriptive name for your feature or bug fix.
- Make your changes and commit them with clear commit messages.
- Push your branch to your forked repository.
- Submit a pull request to the main repository.
```

## License

The Recipe App is open-source software.
