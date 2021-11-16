import React from 'react';
import { history } from 'umi';
import styles from './componentsPage.less';
import { Layout, Menu } from 'antd';
import { PROPERTY_TYPES } from '@babel/types';

const { Header, Content, Sider } = Layout;

class Components extends React.Component {
  componentDidMount = () => {
    history.push('/componentsPage/dateSelectPage');
  };

  render = () => {
    return (
      <Layout className={styles.body} id="components">
        <Sider className={styles.sider} breakpoint="md" collapsedWidth={0}>
          <Menu
            className={styles.smenu}
            mode="inline"
            defaultSelectedKeys={['dateSelect']}
          >
            <Menu.Item
              key="dateSelect"
              onClick={() => history.push('/componentsPage/dateSelectPage')}
            >
              日期选择
            </Menu.Item>
            <Menu.Item
              key="confirm"
              onClick={() => history.push('/componentsPage/confirm')}
            >
              选择弹出框
            </Menu.Item>
          </Menu>
        </Sider>
        <Content className={styles.main}>{this.props.children}</Content>
      </Layout>
    );
  };
}

export default Components;
