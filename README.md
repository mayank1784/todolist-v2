# Todolist v2  
This is a simple Todolist web application built with Node.js, Express, and MongoDB. It provides a basic example of how to create a web application with database integration and CRUD functionality for tasks.  

##Installation  
To use this web application, you'll need to have Node.js and MongoDB installed on your system. Then, you can follow these steps:  

Clone this repository to your local machine:  
'''console
Copy code
git clone https://github.com/mayank1784/todolist-v2.git
'''  
Install the dependencies using npm:  
'''console
Copy code
cd todolist-v2
npm install  
Start the server:  
'''console
Copy code
npm start
'''  
Access the web application at [http://localhost:3000]  
## Features  
This web application has the following features:  

User authentication: Users can register, log in, and log out.  
Task management: Users can create, read, update, and delete tasks. Tasks are stored in a MongoDB database.  
List management: Users can create and delete lists to organize their tasks.  
Filter tasks: Users can filter their tasks by list or status (completed or incomplete).  
## Dependencies  
This web application uses the following dependencies:  

ejs: Embedded JavaScript templates for rendering views.  
express: Web framework for Node.js.  
mongoose: MongoDB object modeling for Node.js.  
lodash: string manipulation  
## Database  
This web application uses MongoDB as its database. The connection details are stored in a .env file, which you should create in the root directory of the project with the following structure:  

'''console
Copy code
DB_HOST=<your-mongodb-host>
DB_PORT=<your-mongodb-port>
DB_NAME=<your-database-name>
Replace the placeholders with your own values.
'''  

## License  
This project is licensed under the MIT License. See the LICENSE file for details.  

## Contributing  
If you find any issues or have suggestions for improvement, feel free to create an issue or pull request. We welcome contributions from the community!  
