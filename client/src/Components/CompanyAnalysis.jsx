import React, { useEffect, useState, useRef } from "react";
import './CompanyAnalysis.css';
import { useHistory } from "react-router-dom";
import FinancialDataService from '../Services/financialdata.service';
import Table from 'react-bootstrap/Table';
import marketCap from './TablePictures/market-cap.png';
import profit from './TablePictures/cash.svg';
import cashFlow from './TablePictures/money-in-wallet.png';
import growth from './TablePictures/financial-graph-arrows-green.svg';

var pictureBox = {
    margin: '20px',
    width: '250px',
    height: '250px',
};



const CompanyData = () => {
    const [rawFinancialData, setRawFinancialData] = useState("default");
    const [isLoading, setIsLoading] = useState(true);
    const [riskData, setRiskData] = useState({});
    let history = useHistory();
    const { state : symbol } = history.location;
    

    
    
    useEffect(() => {
        FinancialDataService.create({'Symbol': symbol})
        .then(res => {
            console.log(res.data);
            if(res.data !== "empty"){
                setRawFinancialData(
                {
                marketCapRaw: res.data.price.marketCap['raw'],
                marketCapFmt: res.data.price.marketCap['fmt'],
                PERatioRaw: res.data.summaryDetail.trailingPE['raw'],
                PERatioFmt: res.data.summaryDetail.trailingPE['fmt'],

                });
                setIsLoading(false);
            } else {setRawFinancialData("empty")}})
    }, []);

    useEffect(() => {
        if(rawFinancialData != "default" && rawFinancialData != "empty"){
            var risk = {};

            //Risk data for Market Cap
            if(rawFinancialData.marketCapRaw < 250000000) risk.marketCapRisk = "Very High";
            else if(rawFinancialData.marketCapRaw >= 250000000 && rawFinancialData.marketCapRaw <= 2000000000) risk.marketCapRisk = "High";
            else if(rawFinancialData.marketCapRaw > 2000000000 && rawFinancialData.marketCapRaw <= 10000000000) risk.marketCapRisk = "Medium";
            else if(rawFinancialData.marketCapRaw > 10000000000) risk.marketCapRisk = "Low";

            setRiskData(risk);
        }
        
    }, [rawFinancialData]);
    
    if( rawFinancialData === "empty") {
        return <h1>Not able to find that Company</h1>
    }
    {return isLoading ? <h1>Loading...</h1> : 
    (
        <div>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossOrigin="anonymous"></link>
            <h1>Data found</h1>
            <h2>Temp</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th></th>
                    <th>NUMBER</th>
                    <th>RISK</th>
                    <th>EXPLANATION</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td><img src={marketCap} width="50" height="50"></img><span style={pictureBox}>Market Cap</span></td>
                    <td>{rawFinancialData.marketCapFmt}</td>
                    <td>{riskData.marketCapRisk}</td>
                    <td>@mdo</td>
                    </tr>
                    <tr>
                    <td><img src={profit} width="50" height="50"></img><span style={pictureBox}>Profitability</span></td>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                    </tr>
                    <tr>
                    <td><img src={growth} width="50" height="50"></img><span style={pictureBox}>Growth</span></td>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                    </tr>
                    <tr>
                    <td><img src={profit} width="50" height="50"></img><span style={pictureBox}>Price-to-Earnings Ratio</span></td>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                    </tr>
                    <tr>
                    <td><img src={profit} width="50" height="50"></img><span style={pictureBox}>Price-to-Book Ratio</span></td>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                    </tr>
                    <tr>
                    <td><img src={profit} width="50" height="50"></img><span style={pictureBox}>Debt-to-Equity Ratio</span></td>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                    </tr>
                    <tr>
                    <td><img src={profit} width="50" height="50"></img><span style={pictureBox}>Free Cash Flow</span></td>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                    </tr>
                    <tr>
                    <td><img src={profit} width="50" height="50"></img><span style={pictureBox}>Price-to-Earnings Growth Ratio</span></td>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
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