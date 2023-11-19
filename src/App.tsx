import { Routes, Route } from 'react-router-dom';
import ProductPage from './pages/ProductPage/ProductPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import Layout from './Components/Layout/Layout';
import HomePage from './pages/HomePage/HomePage';
import './Components/Layout/Layout.css';

function App() {
  return (
    <Routes>
      <Route path={`/`} element={<Layout />}>
        <Route path={':page'} element={<HomePage />}>
          <Route path={':productId'} element={<ProductPage />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
