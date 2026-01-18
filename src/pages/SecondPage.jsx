import { useNavigate } from "react-router-dom";
function SecondPage() {
    const navigate = useNavigate();
    return <h1>This is the second page</h1>;
    <button onClick={() => navigate("/second")}>
        Go to Second Page
    </button>
}

export default SecondPage;
