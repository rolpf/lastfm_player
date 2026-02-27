import LastfmData from "./components/LastfmData.jsx";

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
        <LastfmData username={username} apiKey={apiKey} />
      </div>
    </>
  );
}

export default App;
