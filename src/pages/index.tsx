import React from 'react';
import { history } from 'umi';
import styles from './index.less';
import './index.css';
import './common.css';
import { Layout, Menu, Tooltip } from 'antd';
import {
  GithubOutlined,
} from '@ant-design/icons';
import { PROPERTY_TYPES } from '@babel/types';

const { Header, Content, Sider } = Layout;

class Index extends React.Component {

  componentDidMount = () => {
    history.push('/components');
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
            <Tooltip title="个人技术网站github">
              <a href="https://github.com/libingbing-li/PersonalTechnology">
                <GithubOutlined />
              </a>
            </Tooltip>
            <Tooltip title="github个人页面">
              <a href="https://github.com/libingbing-li">libingbing-li</a>
            </Tooltip>
          </div>
        </Header>
        {this.props.children}
      </Layout>
    );
  }
}



export default Index;