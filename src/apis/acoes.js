import axios from 'axios';

const API_URL = 'https://valueappapi.azurewebsites.net';

export async function obterAcoes() {
  const response = await axios.get(`${API_URL}/api/ObterListaAcoes`, {
    timeout: 30000,
  });
  return response.data;
}
