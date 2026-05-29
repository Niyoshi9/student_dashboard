# Student Dashboard

A responsive student learning dashboard built using React.js and Supabase.

## Features

* Responsive UI for desktop and mobile
* Sliding sidebar navigation
* Dynamic course cards
* Learning streak section
* Activity tiles
* Upcoming tasks section
* Supabase integration for dynamic data
* Clean modern dashboard design

## Tech Stack

* React.js
* CSS3
* Supabase
* Create React App
* Vercel Deployment

## Project Structure

* Components are separated for maintainability.
* Reusable cards and sections were created using dynamic mapping.
* Supabase was used as the backend service for fetching dashboard data.

## Environment Variables

Create a `.env` file in the root directory and add:

REACT_APP_SUPABASE_URL=your_url

REACT_APP_SUPABASE_ANON_KEY=your_key

## Installation

Install dependencies:

npm install

Run the development server:

npm start

## Build for Production

npm run build

## Deployment

The project is deployed using Vercel.

## Challenges Faced

* Learning Supabase integration with React
* Implementing responsive dashboard layouts
* Creating a sliding sidebar for mobile devices
* Managing reusable dynamic components

## Future Improvements

* Authentication system
* Real-time dashboard updates
* Better animations using Framer Motion
* Dark/light theme toggle
