import "./Home.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
  import { faDownload } from '@fortawesome/free-solid-svg-icons'

import Swal from 'sweetalert2'
import { useEffect, useState } from "react";
function Home() {
  const [results, setresults] = useState([]);
  const [faceresults, setfaceresults] = useState([]);
  const [kind, setkind] = useState("");

  function getData() {
    let inputValue = document.getElementById("search").value;
    fetch(`https://api.snappea.com/v1/video/details?url=${inputValue}`)
      .then((res) => res.json())
      .then((data) => {
        setresults(data);
        setkind("y");
      })
      .catch(rejected => {
        
      Swal.fire('Enter a correct link')
    });
  }
 
 
  function getDataFromFace() {
    const d = {
      url: `${document.getElementById("search").value}`,
    };

    fetch("https://save-from.net/api/convert", {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(d),
    })
      .then((response) => response.json())
      .then((data) => {
        setfaceresults(data);
        setkind("f");
      })
      .catch(rejected => {
        
        Swal.fire('Enter a correct link')
      });
  }
  if (kind === "y") {
    return (

      <div className="our-home">
        <div className="container">
          <div className="home-content">
            
            <input type="search" id="search" className="form-control" placeholder="Enter your link"/>
            <div className="box mt-5">
              <div className="btns">
                <button onClick={() => getData()} className="btn-style">search in youtube</button>
                <button onClick={() => getDataFromFace()} className="btn-style">
                  search in facebook
                </button>
              </div>
              <div className="info">
                <h3>{results.videoInfo.title}</h3>
                <h3>from youtube</h3>
                <img src={results.videoInfo.thumbnail} alt="" />
              </div>
              
              <div className="download-content">
                {results.videoInfo.downloadInfoList.map((el,index) => (
                  <button className="btn-download" key={index}>
                    <a href={el.partList[0].urlList[0]}>
                     <FontAwesomeIcon icon={faDownload}  className="icon"/> {el.mime} {el.formatExt} {el.formatAlias}
                    </a>
                  </button>
                ))}
              </div>
              
              
              
            </div>
            
            
          </div>
        </div>
      </div>
      
    );
  } else if (kind === "f") {
    return (
      <div className="our-home">
        <div className="container">
          <div className="home-content">
            <input type="search" id="search" className="form-control" placeholder="Enter your link"/>
            <div className="box mt-5">
              <div className="btns">
                <button onClick={() => getData()} className="btn-style">search in youtube</button>
                <button onClick={() => getDataFromFace()} className="btn-style">
                  search in facebook
                </button>
              </div>
              <div className="info">
                  <h3>video from facebook</h3>
                  <img src={faceresults.thumb} alt="" />
              </div>
              <div className="download-content">
                {faceresults.url.map((el,index)=>
                
                <button className="btn-download"  key={index}><a href={el.url}><FontAwesomeIcon icon={faDownload}  className="icon"/> {el.ext} {el.type} {el.subname}</a></button>
              )}
              </div>
              
            
              
            </div>
            
          </div>
        </div>
      </div>
    );
  }else{
    return(
        <div className="our-home">
        <div className="container">
          <div className="home-content">
            
            <input type="search" id="search" className="form-control" placeholder="Enter your link" />
            <div className="box mt-5">
             
            </div>
            <div className="btns">
              <button onClick={() => getData()} className="btn-style">search in youtube</button>
              <button onClick={() => getDataFromFace()} className="btn-style">
                search in facebook
              </button>
            </div>
          </div>
        </div>
      </div>
    )
    
  
  }

  // console.log(lists);
}
export default Home;
