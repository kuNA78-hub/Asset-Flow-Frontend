AssetFlow - Frontend ⚛️


This repository contains the frontend for AssetFlow, a full-stack corporate resource management system. This application provides a clean, modern, and responsive user interface for employees and administrators to manage and book company assets.

This frontend is built with React and Shadcn UI, and it communicates with the secure AssetFlow Backend (you can replace this with your backend repo link).

✨ Features
🔐 Secure Login/Registration: JWT-based authentication flow.

👤 Role-Based UI: The user interface dynamically changes based on whether the user is an EMPLOYEE or an ADMIN.

🖼️ Asset Dashboard: A visual dashboard of all company assets with images and key details.

🗂️ Category Filtering: Easily filter assets by type (e.g., Meeting Room, Vehicle).

📅 Dual View Modes: Toggle between a standard "Card View" and an interactive "Schedule View" to see asset bookings on a timeline.

📄 Detailed Asset View: Click any asset to see a dedicated page with more information and booking/management options.

👩‍💼 Employee Features:

Book any available asset.

View a personalized "My Bookings" page to track the status (PENDING, APPROVED, REJECTED) of their requests.

🛠️ Admin Panel: A secure area for administrators with dedicated pages to:

Manage all users in the system (View/Delete).

Manage all bookings (Approve/Reject).

Create, Edit, and Delete company assets.

🛠️ Technology Stack
Framework: React (with Vite)

UI Library: Shadcn UI

Styling: Tailwind CSS

API Communication: Axios

Routing: React Router DOM

JWT Handling: jwt-decode

🚀 Getting Started
Follow these instructions to get the frontend running on your local machine.

Prerequisites
Node.js and npm (or a similar package manager).

The AssetFlow Backend must be running separately.

Running the Application
Clone the repository:

Bash

git clone https://github.com/kuNA78-hub/Asset-Flow-Frontend.git
cd Asset-Flow-Frontend
Install dependencies:

Bash

npm install
Configure Backend URL:
Create a new file in the root of the project named .env.local and add the following line to tell the frontend where your backend is running:

VITE_API_BASE_URL=http://127.0.0.1:8080/api
Start the development server:

Bash

npm run dev
The application will be available at http://localhost:5173.

workflows
Employee Workflow
Register as a ROLE_EMPLOYEE.

Log in.

View assets on the dashboard and use the filters.

Click an asset to view its details.

Create a booking for that asset.

Navigate to "My Bookings" to see the request is PENDING.

Admin Workflow
Register as a ROLE_ADMIN.

Log in.

From the dashboard, create a new asset.

Navigate to the "Admin Panel".

Go to "Manage Bookings" and APPROVE the employee's pending request.

Go to "Manage Users" to see all users.

Go back to the main dashboard, click on an asset, and see the "Edit" and "Delete" options.
