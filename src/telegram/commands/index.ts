import './debug';
import { Composer } from 'grammy';
// import activity from './activity';
import { MyContext } from '../bot';

export default new Composer<MyContext>(activity.middleware());
