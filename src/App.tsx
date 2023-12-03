import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout';
import HomePage from './pages/homePage';
import UncontrolledForm from './pages/uncontrolledForm';
import ControlledForm from './pages/controlledForm';
import NotFoundPage from './pages/404';

function App() {
  return (
    <Routes>
      <Route path={`/`} element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path={'uncontrolledForm'} element={<UncontrolledForm />} />
        <Route path={'controlledForm'} element={<ControlledForm />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
