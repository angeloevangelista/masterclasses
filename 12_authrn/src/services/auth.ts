interface Response {
  token: string;
  user: {
    name: string;
    email: string;
  };
}

export function signIn(): Promise<Response> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        token: 'iasjfdihvsljb21noi3jr2084h9ofq2gb',
        user: {
          name: 'Angelo',
          email: 'angelo@email.com',
        },
      });
    }, 2000);
  });
}
