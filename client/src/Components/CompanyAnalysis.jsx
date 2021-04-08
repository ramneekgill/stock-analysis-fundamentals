import React, { useEffect, useState } from "react";
import './CompanyAnalysis.css';
import FinancialDataService from '../Services/financialdata.service';
import Table from 'react-bootstrap/Table';
import marketCap from './TablePictures/market-cap.png';
import profit from './TablePictures/cash.svg';


var pictureBox = {
    margin: '20px',
    width: '250px',
    height: '250px',
};



const CompanyData = () => {
    const [financialData, setFinancialData] = useState("default");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        var urlSymbol = window.location.href.split("/");
        urlSymbol = urlSymbol[urlSymbol.length-1];

        FinancialDataService.create({'Symbol': urlSymbol})
        .then(res => {
            if(res.data !== "empty"){
                setFinancialData(res.data);
                setIsLoading(false);
            } else {setFinancialData("empty")}})
    }, []);
    
    if( financialData === "empty") {
        return <h1>Not able to find that Company</h1>
    }
    {return isLoading ? <h1>Loading...</h1> : 
    (
        <div>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossOrigin="anonymous"></link>
            <h1>{financialData['company_name']}</h1>
            <p>{financialData.Summary}</p>
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>METRICS</th>
                    <th>NUMBER</th>
                    <th>RISK</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td><img src={marketCap} width="50" height="50"></img><span style={pictureBox}>Market Cap</span></td>
                    <td>{financialData.MarketCap_Fmt}</td>
                    <td>{financialData['marketCapRisk']}</td>
                    </tr>
                    <tr>
                    <td><img src={profit} width="50" height="50"></img><span style={pictureBox}>Price-to-Earnings Ratio</span></td>
                    <td>
                        Company: {financialData['P/E_Company']}<br></br>
                        Sector: {financialData['P/E_Sector']}
                    </td>
                    <td>{financialData['P/E_Risk']}</td>
                    </tr>
                    <tr>
                    <td><img src={profit} width="50" height="50"></img><span style={pictureBox}>Price-to-Book Ratio</span></td>
                    <td>
                        Company: {financialData['P/B_Company']}<br></br>
                        Sector: {financialData['P/B_Sector']}
                    </td>
                    <td>{financialData['P/B_Risk']}</td>
                    </tr>
                    <tr>
                    <td><img src={profit} width="50" height="50"></img><span style={pictureBox}>Price-to-CashFlow Ratio</span></td>
                    <td>
                        Company: {financialData['P/CF_Company']}<br></br>
                        Sector: {financialData['P/CF_Sector']}
                    </td>
                    <td>{financialData['P/CF_Risk']}</td>
                    </tr>
                    <tr>
                    <td><img src={profit} width="50" height="50"></img><span style={pictureBox}>Price-To-Earnings Growth Ratio</span></td>
                    <td>{financialData['PEG']}</td>
                    <td>{financialData['PEG_Risk']}</td>
                    </tr>
                    <tr>
                    <td><img src={profit} width="50" height="50"></img><span style={pictureBox}>Current Ratio</span></td>
                    <td>{financialData.current_ratio_fmt}</td>
                    <td>{financialData['current_ratio_Risk']}</td>
                    </tr>
                    <tr>
                    <td><img src={profit} width="50" height="50"></img><span style={pictureBox}>Quick Ratio</span></td>
                    <td>{financialData.quick_ratio_fmt}</td>
                    <td>{financialData['quick_ratio_Risk']}</td>
                    </tr>
                    <tr>
                    <td><img src={profit} width="50" height="50"></img><span style={pictureBox}>Return on Equity</span></td>
                    <td>{financialData['ROE_fmt']}</td>
                    <td>{financialData['ROE_Risk']}</td>
                    </tr>
                </tbody>
            </Table>
        </div>
    )}
}

export default function CompanyAnalysis(props) {
    return (
        <div className="App">
            <CompanyData {...props}/>
        </div>
    );
  }