import React from 'react';

import Footer from './components/Footer';
import Header from './components/Header ';

function App() {
  return (
    <>
      <Header />
      <div style={{ minHeight: '90vh', padding: '20px' }}>
        {/* Main Content Goes Here */}
        <p>Restaurant Website with Booking site!</p>
      </div>
      <Footer />
    </>
  );
}

export default App;
