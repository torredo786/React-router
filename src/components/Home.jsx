import React from 'react';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { data, loading, error } = useAuth();

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error: {error}</h1>;

  return (
    <div>
      <h1>Home Page</h1>
      <ul>
        {data.slice(0, 10).map((item) => (
          <li key={item.id}>
            <strong>{item.title}</strong>: {item.body}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
