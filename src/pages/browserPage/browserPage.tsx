import React from 'react';
import { history } from 'umi';
import styles from '../componentsPage/styles/componentsPage.less';
import { Layout, Menu } from 'antd';
import { PROPERTY_TYPES } from '@babel/types';

const { Header, Content, Sider } = Layout;

class BrowserPage extends React.Component {
  componentDidMount = () => {
    history.push('/browserPage/HWPage');
  };

  render = () => {
    return (
      <Layout className={styles.body} id="browserPage">
        <Sider className={styles.sider} breakpoint="md" collapsedWidth={0}>
          <Menu
            className={styles.smenu}
            mode="inline"
            defaultSelectedKeys={['HWPage']}
          >
            <Menu.Item
              key="HWPage"
              onClick={() => history.push('/browserPage/HWPage')}
            >
              浏览器宽高+滚动
            </Menu.Item>
          </Menu>
        </Sider>
        <Content className={styles.main}>{this.props.children}</Content>
      </Layout>
    );
  };
}

export default BrowserPage;
