export const fetchEntity = ({ method, ...options }) => (url, token) =>
  fetch(url, {
    method,
    headers: new Headers({ 'Content-Type': 'application/json', token }),
    credentials: 'same-origin',
    ...options
  }).then((res) => res.json());