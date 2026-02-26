import LastFMData from "./components/LastFMData.jsx";

function App() {
  const apiKey = import.meta.env.VITE_LASTFM_API_KEY;
  const username = "meufshlag";

  return (
    <>
      <div>
        <p></p>
      </div>
      <h1>lastfm player</h1>
      <div>
        <LastFMData username={username} apiKey={apiKey} />
      </div>
    </>
  );
}

export default App;
