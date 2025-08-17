# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/afebe04e-8108-4128-abeb-6943e8701d79

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/afebe04e-8108-4128-abeb-6943e8701d79) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/afebe04e-8108-4128-abeb-6943e8701d79) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

# Portfolio Project

## Features

- **Modern Portfolio Website** built with Vite, React, TypeScript, Tailwind CSS, and shadcn-ui.
- **Contact Form** with automated email notifications:
  - Sends form submissions to the site owner (admin).
  - Sends a confirmation/thank you email to the client (the person who filled the form).
  - If email delivery fails, the form data is saved to `messages.txt` for later review.
- **Backend** powered by Node.js, Express, and Nodemailer for email automation.
- **Easy Deployment** and local development.

## How the Contact Form Works

1. **User submits the contact form** on the website.
2. **Backend (`server.js`) receives the data** and:
    - Sends an email to the admin with all form details.
    - Sends a confirmation email to the client.
    - If email sending fails, saves the data to `messages.txt`.
3. **No manual intervention needed**—all email automation is handled by the backend.

## Getting Started

### Prerequisites

- Node.js & npm installed
- (Optional) Python for previous automation scripts (no longer required)

### Setup

```sh
# Install dependencies
npm install

# Start the backend server
node server.js

# Start the frontend (Vite)
npm run dev
```

### Environment Variables

Create a `.env` file in your project root:

```
GMAIL_USER=your_gmail@gmail.com
GMAIL_APP_PASSWORD=your_app_password
```

### File Structure

- `src/` — Frontend React code
- `server.js` — Backend server for handling form submissions and sending emails
- `messages.txt` — Stores failed email submissions (if any)

## Next Steps: Chatbot Integration (Optional)

You can add a RAG-based chatbot using Gemini and LangChain to answer questions about your skills, experience, and projects.  
See the project documentation or ask for a step-by-step guide!

---

## Technologies Used

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Node.js (Express, Nodemailer)

---

## Deployment

See [Lovable](https://lovable.dev/projects/afebe04e-8108-4128-abeb-6943e8701d79) for deployment and custom domain setup.
