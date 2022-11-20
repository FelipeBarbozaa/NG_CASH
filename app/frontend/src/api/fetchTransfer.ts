import { TransferData } from "../types/transfer";

export const fetchTransfer = async (data: TransferData) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  const response = await fetch('http://localhost:3001/transfer', requestOptions);
  return response.json();
}

