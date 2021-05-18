export const getSessionCookie = async (token: string) => {
  return fetch('/api/session', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ access_token: token }),
  });
};
