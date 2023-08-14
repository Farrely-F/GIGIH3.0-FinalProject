# Generasi GIGIH3.0 MidTerm Project

Hello coders! 👋 in this project, i created a Tokopedia Play clone app using ReactJS with Node and Express as a backend server with MongoDB as the database (MERN Stack)

## Requirements

Node & NPM
MongoDB account & Compass/atlas

## How to Run Locally

1. Clone the repository to your local machine.

```bash
  git clone https://github.com/Farrely-F/GIGIH3.0-midTerm.git
```

2. Make sure youre on the right directory. if not, change directory using

```bash
  cd GIGIH3.0-FinalProject
```

3. Install the project dependencies by changing directory to backend and frontend folder

```bash
  cd backend
  npm i
  cd ..
  cd frontend
  npm i
```

4. Ensure you have MongoDB installed and running at the specified `MONGODB_URL` in the `.env` file. If you are confused, try checking out the .env example in`.env.example`

5. Seed the database with dummy data by running

```bash
  npm run seed
```

6. Start the server using on the backend folder

```bash
  npm run dev
  npm run seed
```

7. The server will be running at `http://localhost:8080`.

8. Start the ui/frontend on the frontend folder

```bash
    npm start
```
