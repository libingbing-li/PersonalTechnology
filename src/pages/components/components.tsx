import React from 'react';
import { history } from 'umi';
import styles from './components.less';
import { Layout, Menu } from 'antd';
import { PROPERTY_TYPES } from '@babel/types';

const { Header, Content, Sider } = Layout;

class Components extends React.Component {

  componentDidMount = () => {
    history.push('/components/moveBox')
  }

  render = () => {
    return (
      <Layout className={styles.body} id="components">
        <Sider 
          className={styles.sider}
          breakpoint='md'
          collapsedWidth={0}
        >
          <Menu
            className={styles.smenu}
            mode="inline"
            defaultSelectedKeys={['moveBox']}
            defaultOpenKeys={['common']}
          >
            <Menu.ItemGroup key="common" title="通用">
              <Menu.Item 
                key="moveBox"
                onClick={() => history.push('/components/moveBox')}
              >移动盒子</Menu.Item>
            </Menu.ItemGroup>
            <Menu.ItemGroup key="layout" title="布局">
              <Menu.Item 
                key="slideBox"
                onClick={() => history.push('/components/slideBox')}
              >滑动盒子</Menu.Item>
            </Menu.ItemGroup>
            <Menu.ItemGroup key="dataEntry" title="数据录入">
              <Menu.Item 
                key="dateSelect"
                onClick={() => history.push('/components/dateSelect')}
              >日期选择</Menu.Item>
            </Menu.ItemGroup>
            <Menu.ItemGroup key="back" title="反馈">
              <Menu.Item 
                key="confirm"
                onClick={() => history.push('/components/confirm')}
              >选择弹出框</Menu.Item>
            </Menu.ItemGroup>
          </Menu>
        </Sider>
        <Content
          className={styles.main}
        >
          {this.props.children}
        </Content>
      </Layout>
    );
  }
}


export default Components;