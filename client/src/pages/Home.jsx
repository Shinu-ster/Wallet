import { useCallback, useEffect, useState } from "react";
import Balance from "../components/Balance";
import Navbar from "../components/Navbar";
import AddIncome from "../components/AddIncome";
import AddExpense from "../components/AddExpense";
import '../styles/Home.css'



export default function Home() {
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(true);

  const aT = localStorage.getItem("at");
 

  const fetchBalance = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:8000/users/show-balance", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${aT}`,
        },
      });
      if (!response.ok) throw new Error("Failed to fetch balance");
      const data = await response.json();
      console.log("Data", data);
      setBalance(data);
      setLoading(false);
    } catch (e) { 
      console.error("fetching error", e);
      setLoading(false);
    }
  }, [aT]);

  useEffect(() => {
    fetchBalance();
  }, [fetchBalance]);

  return (
    <>
      <Navbar />
      {loading ? <p>Loading...</p> : <Balance balance={balance} />}
      <div className="modal-container">
      <AddIncome/>
      <AddExpense/>
      </div>
    </>
  );
}
