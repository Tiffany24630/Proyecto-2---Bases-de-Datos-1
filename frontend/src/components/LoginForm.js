export const LoginForm = () => `
    <div class = "card">
        <h2>Iniciar Sesión</h2>
        <form>
            <input type="text" placeholder="Usuario" />
            <input type="password" placeholder="Contraseña" />
            <button onClick="login()">Ingresar</button>
        </form>
    </div>
`;