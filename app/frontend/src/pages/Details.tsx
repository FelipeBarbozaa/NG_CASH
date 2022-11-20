import Header from "../components/Header";
import { useEffect, useState } from "react";
import { fetchGetTransactions } from "../api/fetchGetTransactions";

export default function Details() {
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    const getTransactions = async () => {
      const id = localStorage.getItem('accountId');
      const response = await fetchGetTransactions(id as string);
      return response;
    }
    getTransactions().then((response) => setTransactions(response));
  }, [])
  return (
    <div className="login-container">
      <div className="home-background">
        <Header />
        {transactions.map((transaction: any) => (
          <div>
            <span>{transaction.debitedAccountId}</span>
          </div>
        ))}
      </div>
    </div>
  )
}