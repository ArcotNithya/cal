import React ,{useState}from 'react';
import ReactDOM from 'react-dom/client';

var calculatePayment=function(pricipal,years,rate){
  var monthlyRate= rate/100/12;
  var monthlyPayment=monthlyRate/(1-(Math.pow(1/(1+monthlyRate),years*12)));
  var balance=principal;
  for(var y=0;y<years;y++){
    var interest=0;
    var principal=0;
    for(var m=0;m<12;m++){
      var interestM=balance+monthlyRate;
      var pricipalM=monthlyPayment-interestM;
      interest=interest+interestM;
      principal=principal+pricipalM;
      balance=balance=pricipalM;
    }
  }
  return {monthlyPayment:monthlyPayment};
};

const Header=({title})=>(
      <header>
        <h1>{title}</h1>
      </header>
    );

const Mortgage=({pricipal:initPricipal,years:initYears,rate:initRate})=>{
  const [pricipal, setPricipal] = useState(Number(initPricipal));
  const [years, setYears] = useState(Number(initYears));
  const [rate, setRate] = useState(Number(initRate));

  const payment = calculatePayment(pricipal, years, rate);
  const monthlyPayment = payment.monthlyPayment;

  
    return(
      <div className="content">
        <div className="form">
          <div>
            <label>principal</label>
            <input type="text" value={pricipal} onChange={(e)=>setPricipal(Number(e.target.value))}/>
          </div>
          <div>
            <label>Years</label>
            <input type="text"value={years} onChange={(e)=>setYears(Number(e.target.value))} />
          </div>
          <div>
          <label htmlFor="rate">Rate</label>
          <input type='text'value={rate} onChange={(e)=>setRate(Number(e.target.value))} />
          </div>
        </div>
        <h2>Monthly Payments: <span className="currency">{Number(monthlyPayment.toFixed(2)).toLocaleString()}</span></h2>
      </div>
    );
  };

const App=()=>(
      <div>
      <Header title="React Mortgage Calculator"/>,
      <Mortgage pricipal="200000" years="30" rate="5"/>
      </div>
    );
  
const root=ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
