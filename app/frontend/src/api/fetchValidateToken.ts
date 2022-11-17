export default async function validateToken(token: string) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: token,
    },
  };

  const response = await fetch('http://localhost:3001/validate', requestOptions);
  return response;
}