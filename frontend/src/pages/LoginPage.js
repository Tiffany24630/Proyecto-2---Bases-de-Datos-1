import { LoginForm } from "../components/LoginForm.js";

export const LoginPage = () => {
  return `
    <div>
      <h1>Login</h1>
      ${LoginForm()}
    </div>
  `;
};