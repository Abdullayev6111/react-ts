import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import UserDetail from './pages/UserDetail';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import NotFound from './pages/NotFound';

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/userDetail/:id" element={<UserDetail />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
