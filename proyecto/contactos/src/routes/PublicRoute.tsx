import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface Props extends RouteProps {
  component: React.ComponentType<any>;
}

const PublicRoute: React.FC<Props> = ({ component: Component, ...rest }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        !user ? <Component {...props} /> : <Redirect to="/home" />
      }
    />
  );
};

export default PublicRoute;