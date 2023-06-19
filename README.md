# Movie Reviews Bookmarking
A Web application that allows the user to see movie reviews from The New York Times, and bookmark reviews within the application.
Backend: Flask-restful
Frontend: ReactJS

# Setting up

1. Create .env file

    ```bash
    cp .env.example .env
    ```

2. Add `SECRET_KEY` and working nytime api key for `NYT_API_KEY`

3. Build containers

    ```bash
    docker-compose up -d --build
    ```

4. Run migrate database

    ```bash
    docker-compose run api flask db upgrade
    ```

5. Access the app by: <http://localhost:3000>
