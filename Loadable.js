import Loadable from 'react-loadable';

import ContainersLoader from 'ReactComponents/components/ContainersLoader';

export default Loadable({
    loader: () => import('./index'),
    loading: ContainersLoader,
});
