import { createApp } from 'vue';
import {
  Layout,
  Spin,
  Result,
  Card,
  Divider,
  Col,
  Row,
  Drawer,
  Table,
  Form,
  InputNumber,
  Tag,
} from 'ant-design-vue';
import router from './router';
import Page from './components/Page';
import App from './App';

const app = createApp(App);
app.config.productionTip = false;
app.use(router);
app.use(Layout);
app.use(Spin);
app.use(Result);
app.use(Card);
app.use(Divider);
app.use(Col);
app.use(Row);
app.use(Drawer);
app.use(Table);
app.use(Form);
app.use(InputNumber);
app.use(Tag);
app.component('page', Page);
app.mount('#app');
