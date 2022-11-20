export const fetchGetCashOut = async (id: string) => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = await fetch(`http://localhost:3001/cashout/${id}`, requestOptions);
  return response.json();
}

