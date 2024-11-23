import { createContext, useState, useContext, useEffect } from "react";
import { persist } from "react-persist";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Call a dummy API
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <AuthContext.Provider value={{ data, loading, error }}>
      {children}
      <persist
        name="auth-state"
        data={data}
        debounce={500}
        onMount={(data) => {
          setData(data);
        }}
      />
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
