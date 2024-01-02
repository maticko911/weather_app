import { Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Singin from "./components/SingIn/Singin";
import Weather from "./components/Weather/Weather";
import Layout from "./components/Layout/Layout";
import { useEffect, useState } from "react";
import api from "./api/weatherApi";
import { debounce } from "lodash";

function App() {
  const [search, setSearch] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  let authToken = sessionStorage.getItem("Auth Token");

  useEffect(() => {
    if (!authToken) {
      return;
    }
    const fetchWeather = async () => {
      try {
        navigator.geolocation.getCurrentPosition(async function (position) {
          const { latitude, longitude } = position.coords;
          const response = await api.get(
            `/forecast?lat=${latitude}&lon=${longitude}&appid=2f1af95c086b8b73f33f5cb51a545fd1&units=metric`
          );
          setWeatherData(response.data);
          setLoading(false);
        });
      } catch (err) {
        console.log({ err });
      }
    };
    if (authToken) {
      fetchWeather();
    }
  }, [authToken]);

  useEffect(() => {
    const debouncedSearch = debounce(async () => {
      setLoading(true);
      try {
        const response = await api.get(
          `/forecast?q=${search}&appid=2f1af95c086b8b73f33f5cb51a545fd1&units=metric`
        );
        setWeatherData(response.data);
        setLoading(false);
      } catch (error) {
        console.log({ error });
        setLoading(false);
      }
    }, 500);

    if (search !== "") {
      debouncedSearch(search);
    }

    return () => {
      debouncedSearch.cancel();
    };
  }, [authToken, search]);

  return (
    <div className="bg-gradient-to-b from-slate-500 to-blue-500">
      <Routes>
        <Route
          path="/"
          element={<Layout search={search} setSearch={setSearch} />}>
          <Route
            index
            element={
              loading ? (
                <p className="flex justify-center items-center h-screen w-screen">
                  Loading...
                </p>
              ) : (
                <Weather weather={weatherData} />
              )
            }
          />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Singin />} />
      </Routes>
    </div>
  );
}

export default App;
