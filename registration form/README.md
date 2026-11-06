# Nook — User Registration & Management

A responsive React and Vite demonstration app with registration, login, personal profiles, and an admin member directory. Account data is stored in the browser's local storage. Passwords are stored as salted PBKDF2 hashes, not plaintext.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. To create a production build, run `npm run build`; preview it with `npm run preview`.

## Admin demo

- Email: `admin@nook.demo`
- Password: `NookAdmin2026!`

The demo administrator account is created automatically on first load. Create a regular account from **Get started** to try registration and member management.

## Demo security note

This is a frontend-only demonstration, not production authentication. Account details and password hashes are saved in the current browser and can be inspected or changed by its owner. Password recovery updates the password locally and does not send an email. Do not use real or sensitive personal information. A production deployment must use a backend authentication service, secure sessions, verified password recovery, and server-side authorization.
