import axios from 'axios';

export const api = axios.create({
  baseURL: "https://chess-me-server.leomaiajr.dev",
});
