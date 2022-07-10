import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
// export const HomePage = (props) =>{
// // export const HomePage = ({name}) =>{

//     return (
//         <p>
//             Welcome {props.name}
//         </p>
//     );
// }

class HomePageComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name,
            loading: true,
            data: null,
            users: [],
            counter: 0
        };
        this.props.setName('Hello Name');
        console.log("I am first call");
        this.updateState();
    }

    updateState = () => {
        setTimeout(() => {
            // state update 
            // this.state.name = ""
            this.setState({
                name: "Updated Name"
            });
        }, 3000);
    }

    componentDidMount = () => {
        // 
        console.log("I am third call");
        // state update for data 
        // api call 
        setTimeout(() => {
            let data = [
                {
                    name: "User One",
                    email: "userone@test.com",
                    address: "Kathmandu",
                    role: "Admin",
                    phone: 12312312321
                }
            ];
            this.setState({
                loading: false,
                users: data
            })
        }, 2000)

        // loggedin 
        // redirect 
        // window.location.href = ""
        // this.props.navigate('/login');
    }

    componentDidUpdate = () => {
        console.log("I am fourth call");
    }

    componentWillUnmount = () => {
        console.log("I am fifth call");
    }

    increaseCounter = (e) => {
        e.preventDefault();
        let counter = this.state.counter;
        counter = counter+1;
        this.setState({
            counter: counter
        })
    }

    submitEvent = (e)=>{
        e.preventDefault();
    }

    handleChange = (e) => {
        
    }

    render = () => {
        console.log("I am second Call");
        return (<div>
            <p>Welcome {this.state.name}</p>
            <p>{this.state.counter}</p>
            <a href="" onClick={this.increaseCounter}>Add Counter</a>
            <table>
                <thead>
                    <tr>
                        <th>S.N</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Phone</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.users.map((o, i) => (
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{o.name}</td>
                                <td>{o.email}</td>
                                <td>{o.role}</td>
                                <td>{o.phone}</td>
                                <td>
                                    Edit/Delete
                                </td>
                            </tr>
                        ))
                    }
                </tbody>

            </table>

            <form onSubmit={this.submitEvent}>
                <input type="text" name="full_name" onChange={this.handleChange}/>
                <button type="submit">Submit Form</button>
            </form>
        </div>)
    }
}

export const HomePage = () => {
    const [name, setName] = useState();

    let navigate = useNavigate();
    console.log(name);
    return(<>
        <HomePageComponent 
            setName={setName}
            navigate={navigate}
        />
    </>);
}