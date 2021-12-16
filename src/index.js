import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'modern-normalize/modern-normalize.css';
import App from 'components/App';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
  document.getElementById('root'),
);
