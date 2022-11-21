import Header from "../components/Header";
import { useEffect, useState } from "react";
import { fetchGetCashOut } from "../api/fetchGetCashOut";
import { fetchGetCashIn } from "../api/fetchCashIn";

export default function Details() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(0)
  const [type, setType] = useState('cashOut');
  const [css, setCss] = useState({ cashOut: 'selected font-noto-sans cash', cashIn: 'font-noto-sans cash' });
  useEffect(() => {
    const getTransactions = async () => {
      const id = localStorage.getItem('accountId');
      if (type === 'cashOut') {
        const response = await fetchGetCashOut(id as string);
        if (response.length === 0) {
          setLoading(1);
        } else {
          setLoading(2);
        }
        return response;
      } else {
        const response = await fetchGetCashIn(id as string);
        if (response.length === 0) {
          setLoading(1);
        } else {
          setLoading(2);
        }
        return response;
      }
    }
    getTransactions().then((response) => setTransactions(response));
  }, [type])

  const handleCss = ({ target: { name }}: any) => {
    if (name === 'cashIn') {
      setType('cashIn');
      setCss({ cashOut: 'font-noto-sans cash', cashIn: 'font-noto-sans cash selected'})
    } else {
      setType('cashOut');
      setCss({ cashOut: 'font-noto-sans cash selected', cashIn: 'font-noto-sans cash'})
    }
  }
  return (
    <div className="login-container">
      <div className="home-background">
        <Header />
        <div className="cash-type">
          <button onClick={ (e) => handleCss(e)} name="cashOut" className={css.cashOut}>cash-out</button>
          <button onClick={ (e) => handleCss(e)} name="cashIn" className={css.cashIn}>cash-in</button>
        </div>
        { loading === 0 ? <p className="font-noto-sans loading">Loading...</p> : null}
        { loading === 1 ? <p className="font-noto-sans loading">no transaction here</p> : null}
        {transactions.map((transaction: any) => (
          <div className="container-cash" key={transaction.id}>
            { type === 'cashIn' ? (
              <p className="fonto-noto-sans">from: {transaction.username}</p>
            ): (
              <p className="fonto-noto-sans">to: {transaction.username}</p>
            )}
            <p className="fonto-noto-sans">value: {transaction.value}</p>
            <p className="fonto-noto-sans">date: {transaction.createdAt}</p>
          </div>
        ))}
      </div>
    </div>
  )
}