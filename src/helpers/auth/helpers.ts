export const checkSessionCookie = async () => {
  return (await fetch('/api/auth')).status !== 401;
};

export const getSessionCookieFromToken = async (token: string) => {
  return (
    (
      await fetch('/api/auth', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    ).status !== 401
  );
};

export const deleteSessionCookie = async () => {
  return (
    (
      await fetch('/api/auth', {
        method: 'DELETE',
      })
    ).status === 200
  );
};
