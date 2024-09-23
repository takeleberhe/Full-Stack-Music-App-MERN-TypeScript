Music App
A full-stack music application built with the MERN stack and TypeScript. This project demonstrates the use of React, Redux Toolkit, Redux Saga, and Tailwind CSS for the front-end, and Node.js, Express.js, and MongoDB for the back-end.

Table of Contents
Features
Technologies Used
Folder Structure
Installation
Usage
Contributing
License
Features
User authentication and authorization
Music album and song management
Responsive design with Tailwind CSS
State management with Redux Toolkit and Redux Saga
API integration with Node.js and Express.js
Database management with MongoDB
Technologies Used
Front-end:
React
Redux Toolkit
Redux Saga
Tailwind CSS
Vite
TypeScript
Back-end:
Node.js
Express.js
MongoDB
TypeScript
Folder Structure
music-app/
├── backend/
│   ├── src/
│   │   ├── Config/
│   │   ├── Controllers/
│   │   ├── Models/
│   │   ├── Routes/
│   │   ├── Middlewares/
│   │   └── server.ts
│   ├── uploads/
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pageRouter/
│   │   ├── Pages/
│   │   ├── Redux/
│   │   ├── App.tsx
│   │   ├── index.css
│   │   └── main.tsx
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   └── tsconfig.json
├── README.md
└── .gitignore

Installation
Run Front-end
Clone the repository:
git clone https://github.com/takeleberhe/Full-Stack-Music-App-MERN-TypeScript.git
cd music-app/Front-end

Install dependencies:
npm install

Start the development server:
npm run dev

Run Back-end
Navigate to the backend directory:
cd music-app/Back-end

Install dependencies:
npm install

Start the development server:
npm run dev

Usage
Open your browser and navigate to http://localhost:5173/ to access the front-end.
The back-end server will be running on http://localhost:5000.
Contributing
Contributions are welcome! Please fork the repository and create a pull request with your changes.

License
This project is licensed under the MIT License.