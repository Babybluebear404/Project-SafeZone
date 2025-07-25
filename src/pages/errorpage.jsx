// src/pages/ErrorPage.jsx
import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
    const error = useRouteError();
    console.error(error);

    return (
        <div className="error-page">
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            {error && <p><i>{error.statusText || error.message}</i></p>}
        </div>
    );
};

export default ErrorPage;
