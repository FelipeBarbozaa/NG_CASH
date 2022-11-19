import { useEffect, useState } from "react";
import { getBalance } from "../api/fetchGetBalance";
import Header from "../components/Header";
import Input from "../components/Input";

export default function Transfer() {
  const [disabled, setDisabled] = useState<boolean>(true);
  const [transferData, setTransferData] = useState({ user: '', value: null});
  const { user, value } = transferData;
  const [balance, setBalance] = useState(null);
  const accountId = localStorage.getItem('accountId') as string;
  
  const handleData = ({ target }: any): void => {
    setTransferData({ ...transferData, [target.name]: target.value})
  };

  useEffect(() => {
    const fetchBalance = async () => {
      const response = await getBalance(accountId); 
      return response;
    }
    fetchBalance().then(({ balance }) => setBalance(balance));
  }, [accountId])

  const handleSubmit = async (event: any) => {
    event.preventDefault();
  }

  useEffect(() => {
    if (user.length >= 3 && value) {
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
          <Input className="login-input" type="text" name="user" func={ handleData } />
          <Input className="login-input" type="number" name="value" func={ handleData} />
          <button disabled={ disabled } className="btn draw-border">Transfer</button>
      </form>
      </div>
    </div>
  )
}