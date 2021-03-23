import React, { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import FinancialDataService from '../Services/financialdata.service';



const CompanyData = () => {
    const [financialdata, setFinancialData] = useState("");
    let history = useHistory();
    const { state : symbol } = history.location;

    useEffect(() => {
        FinancialDataService.create({'Symbol': symbol})
        .then(res => {
            if(res.data !== "empty"){
                setFinancialData(res.data.insiderHolders.holders);
            } else setFinancialData("empty");

        });
    }, []);

    if( financialdata === "empty") {
        return <h1>Not able to find that Company</h1>
      } else if(financialdata !== ""){
          return (
            <h1>Loading...</h1>
          );
          
      } else {
        return (
            <h1>Data found</h1>
        );
      }
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