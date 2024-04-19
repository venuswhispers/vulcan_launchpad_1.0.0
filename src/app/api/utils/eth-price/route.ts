import { redirect } from 'next/navigation';
import axios from 'axios';
 
export async function GET(request: Request) {
  try {
    const headers = {
      'x-api-key': '2eDS3r6N5KZTEdOGuKRfqVzTyuQ',
      'accept': 'application/json'
    }
    const { data: { data } } = await axios.get(`https://api.coinbase.com/v2/prices/ETH-USD/buy`, { headers });
    return Response.json({ status: 'SUCCESS', payload: data });
  } catch (err) {
    return Response.json({ status: 'ERROR' });
  }
}