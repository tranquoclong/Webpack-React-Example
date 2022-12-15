import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import enUS from 'antd/lib/locale-provider/en_US';
import { ConfigProvider } from 'antd';
import 'antd/dist/antd.css';

import App from './App'
import store from './store';


ReactDOM.render(
    <ConfigProvider locale={enUS}>
        <Provider store={store}>
            <App />
        </Provider>
    </ConfigProvider>,
document.getElementById('root'))

