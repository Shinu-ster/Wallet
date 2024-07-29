import { useEffect, useState } from "react";
import Balance from "../components/Balance";
import Navbar from "../components/Navbar";

export default function Home() {
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(true);
  const aT = localStorage.getItem("at");
  let data;

  // const calcBalance=(data)=>{
  //   console.log('calcBalance',data)
  //   let totalIncome = 0;
  //   let totalExpense = 0;
  //   data.array.forEach(element => {
  //     console.log(element)
  //     const amount = parseFloat(element.transaction.amount);
  //     if (element.transaction_type === 'income') {
  //       totalIncome += amount;
  //     }else if(element.transaction_type === 'expense'){
  //       totalExpense += amount;
  //     }
  //   });
  // }
  
  const fetchBalance = async () => {
    try {
      const response = await fetch("http://localhost:8000/users/show-balance", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${aT}`,
        },
      });
      if (!response.ok) throw "Failed to fetch balance";
       data = await response.json();
      console.log("Data", data);
      setBalance(data);
      // calcBalance(data)
      setLoading(false);
    } catch (e) {
      console.error("fetchging error", e);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchBalance();
  }, []);

  return (
    <>
      <Navbar />
      {loading ? <p>Loading...</p> : <Balance balance={balance} />}
    </>
  );
}
