export const fetchGetTransactions = async (id: string) => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = await fetch(`http://localhost:3001/transactions/${id}`, requestOptions);
  return response.json();
}

