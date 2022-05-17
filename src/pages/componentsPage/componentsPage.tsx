import React from 'react';
import { history } from 'umi';
import styles from './styles/componentsPage.less';
import { Layout, Menu } from 'antd';
import { PROPERTY_TYPES } from '@babel/types';

const { Header, Content, Sider } = Layout;

interface IState {
  collapsed: boolean;
}
class Components extends React.Component {
  state: IState = {
    collapsed: true,
  };
  componentDidMount = () => {
    history.push('/componentsPage/dateSelectPage');
  };

  go = (url: string) => {
    history.push(url);
    this.setState({
      collapsed: true,
    });
  };
  tigger = () => {
    this.setState((preState: IState) => {
      return {
        collapsed: !preState.collapsed,
      };
    });
  };

  render = () => {
    return (
      <Layout className={styles.body} id="components">
        <Sider
          collapsed={this.state.collapsed}
          onCollapse={this.tigger}
          className={styles.sider}
          breakpoint="md"
          collapsedWidth={0}
        >
          <Menu
            className={styles.smenu}
            mode="inline"
            defaultSelectedKeys={['dateSelect']}
          >
            <Menu.Item
              key="dateSelect"
              onClick={() => this.go('/componentsPage/dateSelectPage')}
            >
              日期选择
            </Menu.Item>
            <Menu.Item
              key="confirm"
              onClick={() => this.go('/componentsPage/confirmPage')}
            >
              选择弹出框
            </Menu.Item>
            <Menu.Item
              key="loginVerify"
              onClick={() => this.go('/componentsPage/verifyPage')}
            >
              登录验证
            </Menu.Item>
            <Menu.Item
              key="movebox"
              onClick={() => this.go('/componentsPage/moveBoxPage')}
            >
              移动盒子
            </Menu.Item>
            <Menu.Item
              key="slidebox"
              onClick={() => this.go('/componentsPage/slideBoxPage')}
            >
              滑动盒子
            </Menu.Item>
          </Menu>
        </Sider>
        <Content className={styles.main} id="componentsPageMain">
          {this.props.children}
        </Content>
      </Layout>
    );
  };
}

export default Components;
