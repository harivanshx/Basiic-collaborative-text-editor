# Collaborative Text Editor

A simple, real-time collaborative text editor built with modern web technologies.

## Features

- Real-time text synchronization
- Multiple user collaboration
- Clean and responsive UI

## Technologies Used

- Frontend: React, Socket.io
- Backend: Node.js, Express, Socket.io
- Database: (if applicable, specify)

## Key Design Decisions

- **Socket.io over Alternatives:** We chose Socket.io for real-time communication because of its simplicity, robust event system, and built-in support for handling WebSocket connections with fallbacks to other protocols. This choice ensured seamless synchronization even in fluctuating network conditions.

- **React for Frontend:** React's component-based architecture made it easy to build a modular and maintainable UI. It also integrates well with Socket.io, allowing real-time updates to propagate smoothly.

- **Node.js & Express for Backend:** This combination provided a lightweight, high-performance server capable of handling concurrent connections, making it ideal for a real-time application.

## Setup and Run Locally

Follow these steps to run the project locally:

### Prerequisites

- Node.js (v18+)
- npm or yarn

### Installation

1. **Clone the repository:**

```sh
git clone https://github.com/your-repo/collaborative-text-editor.git
cd Basiic-collaborative-text-editor
```

2. **Install dependencies:**

For both frontend and backend, run:

```sh
cd frontend
npm install
cd ../backend
npm install
```

3. **Environment setup:**

Create a `.env` file in the backend directory and add necessary variables:

```
"it includes .env file linked to a cluster over mongodb"
MONGO_URI=****************************
```

4. **Run the backend server:**

```sh
cd backend
npm start
```

5. **Run the frontend app:**

```sh
cd frontend
npm start
```

6. **Access the app:**

Open your browser and go to: `http://localhost:5173/`

6. **Create a note:**

Click on : "create new document" button it will create a new note with a rendom id  like: 67bc88cdc7e388de22fdc500
you can access the same note via link: `http://localhost:5173/docs/67bc88cdc7e388de22fdc500`




## Collaborative Feature and How It Works

The core of the project is its real-time collaborative editing feature, which allows multiple users to edit the same document simultaneously. Here’s how it works:

1. **WebSocket Connection:**
   - When a user opens the editor, the frontend establishes a WebSocket connection with the backend using Socket.io.

2. **Document Rooms:**
   - Each document is assigned a unique room ID. Users editing the same document join the same room, enabling isolated collaboration for different documents.

3. **Real-time Event Handling:**
   - On every keystroke, the frontend emits a `text-change` event with the updated content.
   - The backend listens for these events and broadcasts the changes to all users in the same room.



This architecture ensures a smooth and intuitive collaborative experience, with minimal lag and accurate content updates across all connected clients.













































































































