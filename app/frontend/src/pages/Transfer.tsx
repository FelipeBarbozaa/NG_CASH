import { useEffect, useState } from "react";
import { getBalance } from "../api/fetchGetBalance";
import { fetchTransfer } from "../api/fetchTransfer";
import Header from "../components/Header";
import Input from "../components/Input";

export default function Transfer() {
  const [disabled, setDisabled] = useState<boolean>(true);
  const [transferData, setTransferData] = useState({ user: '', value: -1});
  const [error, setError] = useState({ show: false, message: '' });
  const { user, value } = transferData;
  const [balance, setBalance] = useState(null);
  const debitedAccountId = localStorage.getItem('accountId') as string;
  
  const handleData = ({ target }: any): void => {
    setTransferData({ ...transferData, [target.name]: target.value})
  };

  useEffect(() => {
    const fetchBalance = async () => {
      const response = await getBalance(debitedAccountId); 
      return response;
    }
    fetchBalance().then(({ balance }) => setBalance(balance));
  }, [debitedAccountId])

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const response = await fetchTransfer(
      { debitedAccountId, creditedAccountUser: user, balance: value }
    )
    if (response.error) {
      setError({ show: true, message: response.error })
    }
    if (response.message === 'success') {
      window.location.reload();
    }
  }

  useEffect(() => {
    if (user.length >= 3 && value > 0) {
      setDisabled(false)
    } else {
      setDisabled(true);
    }
  }, [user.length, value]);

  return (
    <div className="login-container">
      <div className="home-background">
        <Header />
        <section className="section-balance">
          {balance === null ? (<p className="balance font-noto-sans white">Loading...</p>) : (
            <p className="balance font-noto-sans white">R$: {balance}</p>
          )}
        </section>
        <form className='form-login' onSubmit={(event) => handleSubmit(event) }>
        { error ? <p className="font-noto-sans transfer-text">{error.message}</p> : null }
          <Input className="login-input" type="text" name="user" func={ handleData } />
          <Input className="login-input" type="number" name="value" func={ handleData} />
          <button disabled={ disabled } className="btn draw-border">Transfer</button>
      </form>
      </div>
    </div>
  )
}