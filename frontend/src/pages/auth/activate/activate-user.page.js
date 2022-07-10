import { Container, Row, Col } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { HomeHeaderComponent } from "../../../components/home/header"
import { httpPost } from "../../../service/axios.service"
import { PasswrodForm } from "../password-form/password-form.page"
export const ActivateUser = () => {
    let params = useParams();
    let navigate = useNavigate();

    let setPassword = async (data) => {
        try{
            let response = await httpPost('/activate/'+params.token, data);
            if(response.status) {
                toast.success(response.msg)
                navigate("/login")
            } else {
                toast.error(response.msg)
            }
        } catch(error) {
            toast.error(error.response.data.msg)
            console.log('error: ', error);
        }
    }
    return (<>
        <HomeHeaderComponent />
        <Container >
            <Row>
                <Col>
                <h1 className="text-center">Activate Your User</h1></Col>
                <hr />
                <PasswrodForm
                    handleSubmit={setPassword}
                />
            </Row>
        </Container>
    </>)
}