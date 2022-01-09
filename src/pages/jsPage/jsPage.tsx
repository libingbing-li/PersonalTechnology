import React from 'react';
import { history } from 'umi';
import styles from '../componentsPage/styles/componentsPage.less';
import { Layout, Menu } from 'antd';
import { PROPERTY_TYPES } from '@babel/types';

const { Header, Content, Sider } = Layout;

class JsPage extends React.Component {
  componentDidMount = () => {
    history.push('/jsPage/backAlertPage');
  };

  render = () => {
    return (
      <Layout className={styles.body} id="jsPage">
        <Sider className={styles.sider} breakpoint="md" collapsedWidth={0}>
          <Menu
            className={styles.smenu}
            mode="inline"
            defaultSelectedKeys={['backAlertPage']}
          >
            <Menu.Item
              key="backAlertPage"
              onClick={() => history.push('/jsPage/backAlertPage')}
            >
              后退拦截
            </Menu.Item>
            <Menu.Item
              key="qrlink"
              onClick={() => history.push('/jsPage/qrlinkPage')}
            >
              二维码+链接
            </Menu.Item>
          </Menu>
        </Sider>
        <Content className={styles.main}>{this.props.children}</Content>
      </Layout>
    );
  };
}

export default JsPage;
