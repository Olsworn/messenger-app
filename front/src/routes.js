import HomeComponent from './component/pages/Home';
import RoomComponent from './component/pages/Room';

const routes = [{
    name: 'room',
    path: '/room/:roomId',
    component: RoomComponent,
}, {
    name: 'home',
    path: '/',
    component: HomeComponent,
}];

export default routes;