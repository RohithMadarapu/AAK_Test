import React from 'react';
import ChartView from './components/ChartView'

const App: React.FC = () => {
  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: 20 }}>
      <h1>Candidate Test Data - Bar Chart</h1>
      <ChartView />
    </div>
  );
};

export default App;
