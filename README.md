# RecipeManager

Recipe App

The Recipe App is a web application that allows users to create, view, and manage recipes. Users can add new recipes with ingredients and instructions, view a list of existing recipes, and delete recipes they no longer need. The app is built using React, GraphQL, and Apollo Client.
Table of Contents

    Features
    Installation
    Usage
    Technologies Used
    Contributing
    License

Features

    View a list of recipes with their titles, descriptions, ingredients, and summarized instructions.
    Add new recipes with a title, description, detailed instructions, and a list of ingredients (name, quantity, and unit).
    Delete recipes from the list.

Installation

To run the Recipe App locally, follow these steps:

    Clone the repository:
    git clone https://github.com/your-username/recipe-app.git
    cd recipe-app

Install dependencies:

    npm install

    Set up the backend (GraphQL server and database). Make sure you have the backend server running and its endpoint correctly set in the client application (Apollo Client configuration).

Start the development server:

    npm start

The app should now be running at http://localhost:3000.

Usage

    Upon launching the app, you will see a list of existing recipes (if any) displayed as cards on the homepage.
    To add a new recipe, click the "Add Recipe" button and fill out the required information in the form. You can also add multiple ingredients by clicking the "+" button and remove them using the "Remove" button (on larger screens) or the red "X" button (on smaller screens).
    To delete a recipe, click the red "X" button next to the recipe title on the homepage.

Technologies Used

    React: Frontend JavaScript library for building user interfaces.
    GraphQL: Query language and runtime for APIs.
    Apollo Client: State management library for GraphQL.
    React Icons: Library for including popular icons in React applications.

Contributing

Contributions to the Recipe App are welcome! If you find any issues or have suggestions for improvements, please feel free to submit a pull request or open an issue.

    Fork the repository from the main branch.
    Create a new branch with a descriptive name for your feature or bug fix.
    Make your changes and commit them with clear commit messages.
    Push your branch to your forked repository.
    Submit a pull request to the main repository.

License

The Recipe App is open-source software.
