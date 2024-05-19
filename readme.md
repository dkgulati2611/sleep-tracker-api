# Sleep Tracker API

This is a RESTful API for a sleep tracker app that allows users to store and retrieve their sleep data.

## Setup

1. Clone the repository:

    ```sh
    git clone <repository-url>
    cd sleep-tracker-api
    ```

2. Install dependencies:

    ```sh
    npm install
    ```

3. Set up MongoDB:

   - Ensure MongoDB is running locally or provide a MongoDB Atlas URI.
   - Create a `.env` file in the root directory with the following content:

        ```env
        MONGO_URI=YOUR_MONGO_URL
        PORT=8000
        ```

## Running the API

To start the API server, run the following command:

```sh
node index.js
```
The API will be available at http://localhost:8000.

The deployed version of the API is available at [Link](https://sleep-tracker-api-y2hz.onrender.com/)


## API Endpoints

##### 1. POST /sleep/
  Create a new sleep Record
  ```json
  {
    "userId": "string",
    "hours": "number",
    "timestamp": "string (ISO 8601)"
  }
  ```
##### Responses :
<UL>
    <li>
     '201 Created': On successful creation of the record.
    </li>
    <li>
     '400 Bad Request': If the request body is invalid.
    </li>    
</UL>


##### 2. GET /sleep/:userId
  Retrieve all sleep records for a given user.
##### Responses :
<UL>
    <li>
     '201 OK': Returns an array of records
    </li>
    <li>
     '400 NOT FOUND': If the record does not exist.
    </li>    
</UL>

##### 3. DELETE /sleep/:recordId
  Delete a specific sleep record by its ID.
##### Responses :
<UL>
    <li>
    '200 OK': On successful deletion of the record.
    </li>
    <li>
    '404 Not Found': If the record does not exist.
    </li>    
</UL>

## Example Usage
Create a new sleep record:
```sh
curl -X POST http://localhost:3000/sleep -H "Content-Type: application/json" -d '{"userId": "user1", "hours": 8, "timestamp": "2024-05-19T10:00:00Z"}'
```
Retrieve all sleep records for a user:
```sh
curl http://localhost:3000/sleep/user1
```
Delete a sleep record by ID:
```sh
curl -X DELETE http://localhost:3000/sleep/<recordId>
```

## Code Structure
<ul>
    <li>
        <b>index.js:</b> Main server file.
    </li>
    <li>
    <b>models/Sleep.js:</b> Mongoose schema for sleep records.
    </li>
    <li>
    <b>routes/sleep.js:</b> Routes for handling sleep data CRUD operations.
    </li>
    <li>
    <b>test/sleep.test.js:</b> Test cases for the API.
    </li>
</ul>

## Testing 

Testing is done using Mocha. To run the tests, use the following command:

```sh
npm run test
```

## Environment Variables
<ul>
    <li>
        <b>MONGO_URI:</b> MongoDB URI for connecting to the database.
    </li>
    <li>
        <b>PORT:</b> Port number for the API server.
    </li>
</ul>

##
Thank you for using the Sleep Tracker API!




  








