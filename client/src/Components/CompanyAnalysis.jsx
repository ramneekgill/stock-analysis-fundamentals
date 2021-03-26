import React, { useEffect, useState, useRef } from "react";
import './CompanyAnalysis.css';
import { useHistory } from "react-router-dom";
import FinancialDataService from '../Services/financialdata.service';
import Table from 'react-bootstrap/Table';
import marketCap from './TablePictures/market-cap.png';
import profit from './TablePictures/cash.svg';
import cashFlow from './TablePictures/money-in-wallet.png';

var pictureBox = {
    margin: '20px',
    width: '250px',
    height: '250px',
};


const CompanyData = () => {
    const [financialdata, setFinancialData] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    let history = useHistory();
    const { state : symbol } = history.location;

    useEffect(() => {
        FinancialDataService.create({'Symbol': symbol})
        .then(res => {
            if(res.data !== "empty"){
                setFinancialData(res.data);
                setIsLoading(false);
            } else setFinancialData("empty");
            
        });
    }, []);




    if( financialdata === "empty") {
        return <h1>Not able to find that Company</h1>
      } 
    {return isLoading ? <h1>Loading...</h1> : 
    (
        <div>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"></link>
            <h1>Data found</h1>
            <h2>{financialdata.insiderHolders.holders[0]["name"]}</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th></th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Username</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td><img src={marketCap} width="50" height="50"></img><span style={pictureBox}>Market Cap</span></td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                    </tr>
                    <tr>
                    <td><img src={profit} width="50" height="50"></img><span style={pictureBox}>Profitability</span></td>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                    </tr>
                    <tr>
                    <td><img src={cashFlow} width="50" height="50"></img><span style={pictureBox}>Cash Flow History</span></td>
                    <td colSpan="2">Larry the Bird</td>
                    <td>@twitter</td>
                    </tr>
                    <tr>
                    <td><img src={marketCap} width="50" height="50"></img><span style={pictureBox}>Growth</span></td>
                    <td colSpan="2">Larry the Bird</td>
                    <td>@twitter</td>
                    </tr>
                    <tr>
                    <td><img src={marketCap} width="50" height="50"></img><span style={pictureBox}>Debt to Equity</span></td>
                    <td colSpan="2">Larry the Bird</td>
                    <td>@twitter</td>
                    </tr>
                </tbody>
            </Table>
        </div>
    )}
}

export default function CompanyAnalysis() {
    return (
        <div className="App">
            <CompanyData />
        </div>
    );
  }











// import React, { useEffect, useState } from "react";
// import ReactDOM from "react-dom";

// function Reddit() {
//   // Initialize state to hold the posts
//   const [posts, setPosts] = useState([]);

//   // effect functions can't be async, so declare the
//   // async function inside the effect, then call it
//   useEffect(() => {
//     async function fetchData() {
//       // Call fetch as usual
//       const res = await fetch(
//         "https://www.reddit.com/r/reactjs.json"
//       );
//       console.log("after fetch before json:");
//       console.log(res);
//       // Pull out the data as usual
//       const json = await res.json();
//       console.log("after json function");
//       console.log(json);
//       // Save the posts into state
//       // (look at the Network tab to see why the path is like this)
//       setPosts(json.data.children.map(c => c.data));
//     }

//     fetchData();
//   }, []); // <-- we didn't pass a value. what do you think will happen?
//   console.log(posts);
//   // Render as usual
//   return (
//     <ul>
//       {posts.map(post => (
//         <li key={post.id}>{post.title}</li>
//       ))}
//     </ul>
//   );
// }

// export default function CompanyAnalysis() {
//     return (
//         <div className="App">
//             <Reddit />
//         </div>
//     );
//   }