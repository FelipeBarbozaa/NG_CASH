import { useEffect, useState } from 'react';
import { getBalance } from '../api/fetchGetBalance';
import Header from '../components/Header';
import '../styles/home.css'

export default function Home() {
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    const accountId = localStorage.getItem('accountId') as string;
    const fetchBalance = async () => {
      const response = await getBalance(accountId); 
      return response;
    }
    fetchBalance().then(({ balance }) => setBalance(balance));
  }, [])

  return (
    <div className="login-container">
      <div className="home-background">
        <Header />
        <section className="section-balance">
          {balance === null ? (<p className="balance font-noto-sans white">Loading...</p>) : (
            <p className="balance font-noto-sans white">R$: {balance}</p>
          )}
        </section>
      </div>
    </div>
  )
}