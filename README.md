# VegeApp

[React Native Application Preview on Youtube](https://www.youtube.com/watch?v=Cql1pk8h7g4)

[Django Application Preview on Youtube](https://www.youtube.com/watch?v=1VetHRRGF-c)

This project was originally a university project for Mobile Development using React Native and Java combined with Google Cloud Services. As a challenge I decided 
to also create a backend Application in Python using the Django Framework. The original idea was to make an applications for searching for Vegan Products. 

The React Native Application includes the following features:
* Connection to Google Firebase for storing Favorite Items
* User Accounts (handled by Firebase)
* Connection to Python Backend
* User Interface depends on Data received from backend as JSON
* Most important Screens: HomeScreen showing all Categories -> CategoryProductScreen which shows all products added to that specific category and ProductDetailScreen
which shows additional information about the project

The Django Application includes the following features:
* Basic CRUD operations for adding, deleting and editing items
* Connection to PostgreSQL 
* Different user rights for doing operations (login required and some only possible by superuser/ admin)
* Lists are created as JSON for fetching / use of GET POST DELETE operations
* Form design using bootstrap

The original Java application had the following features:
* Database connection to Google Cloud Services 
* a simple CRUD System using RESTful webservices 
* Data can be retrieved as JSON for processing in React Native Application
