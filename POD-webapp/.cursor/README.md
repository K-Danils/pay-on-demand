# 💸 Pay On Demand App

This is a fullstack web application designed to enable **on-demand salary access** for employees, while providing administrative tools for company-level management.

## 🧑‍💼 User Roles

### 1. Workers (Users)

- Log in via **email-based authentication**
- Access a **dashboard** showing:
  - Available accumulated funds (calculated over the current month)
  - Past pay requests with their statuses
  - Ability to **submit a new withdrawal request**

### 2. Administrators

- Log in with email-based credentials (accounts are provisioned manually by the system owner)
- Admin dashboard includes:
  - Overview of **most recent pay requests**
  - Ability to **approve or deny requests**
  - Management tools to:
    - **Add / Edit / Delete companies**
    - **Define occupations** for each company
    - **Manage users** under each company
      - Assign occupations, monthly wages, and payroll date

## 🔐 Authentication

- Provided by **Firebase Auth**
- **Email-based login** only (no passwords or social logins)
- Access delegation:
  - Admins are added by the system owner
  - Admins can add users (workers)

## 🌐 Architecture

| Component  | Stack                            |
| ---------- | -------------------------------- |
| Frontend   | React (vite) + Ant Design (Antd) |
| Backend    | Spring Boot (Java 17+)           |
| Database   | PostgreSQL                       |
| Auth       | Firebase Auth                    |
| Deployment | Firebase Hosting (planned)       |
| Containers | Docker (preferred setup)         |

## 🏗️ Project Structure

-- all files are under src folder
-- first level is reserved for global files, global component folder, configs, services, hooks, etc.
-- pages are put under pages folder
-- first level of pages/page folder is reserved for files which will be accessed by App.tsx, or routers e.g., dashboard-page.tsx, edit-page.tsx
-- rest of files are put under components, hooks, utils, etc., depends on the context
