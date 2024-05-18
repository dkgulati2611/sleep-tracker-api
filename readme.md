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
npm start
```
The API will be available at http://localhost:8000.








