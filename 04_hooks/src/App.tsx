import React, { useState } from 'react';

interface User {
  name: string;
  login: string;
  avatar_url: string;
}

function App() {
  const [user, setUser] = useState<User>();

  async function loaduserData() {
    const response = await fetch(
      'https://api.github.com/users/angeloevangelista'
    );
    const data = await response.json();

    setUser(data);
  }

  loaduserData();

  return <h1>{user?.name}</h1>;
}

export default App;
