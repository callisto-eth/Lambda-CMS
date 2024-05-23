export async function userLogin() {
  const resp = await fetch('/api/auth/signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: 'test@test.com',
      password: 'adminadmin123',
    }),
  });
}

export async function checkUserRecord(userEmail: string) {
  const resp = await fetch('/api/user/fetch', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userEmail: userEmail,
    }),
  });
}
