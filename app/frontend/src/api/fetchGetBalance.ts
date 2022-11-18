export const getBalance = async (accountId: string) => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = await fetch(`http://localhost:3001/balance/${accountId}`, requestOptions);
  return response.json();
}
