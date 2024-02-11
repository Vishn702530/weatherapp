// App.js
import React, { useState } from 'react';
import City from './City';
import Weather from './Weather';

function App() {
  const [page, setPage] = useState('input'); // 'input' or 'forecast'
  const [city, setCity] = useState('');

  return (
    <div>
      {page === 'input' && <City setCity={setCity} setPage={setPage} />}
      {page === 'forecast' && <Weather city={city} setPage={setPage} />}
    </div>
  );
}

export default App;
