import React from 'react';
import { history } from 'umi';
import styles from './index.less';
import './index.css';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  GithubOutlined,
} from '@ant-design/icons';
import { PROPERTY_TYPES } from '@babel/types';

const { Header, Content, Sider } = Layout;

class Index extends React.Component {

  componentDidMount = () => {
    history.push('/components')
  }

  render() {
    return (
      <Layout id="index">
      <Header className={styles.header}>
        <div className={styles.logo} >
          个人技术网站
        </div>
        <Menu 
          className={styles.menu}
          mode="horizontal" 
          defaultSelectedKeys={['components']}
        >
          <Menu.Item key="components" onClick={() => history.push('/components')}>组件</Menu.Item>
        </Menu>
        <div className={styles.git} >
          <GithubOutlined 
            style={{
              fontSize: '30px',
              marginRight: '10px',
            }}
          />
          <a href="">libingbing-li</a>
        </div>
      </Header>
      {this.props.children}
    </Layout>
    );
  }
}



export default Index;