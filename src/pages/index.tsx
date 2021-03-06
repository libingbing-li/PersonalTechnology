import React from 'react';
import { history } from 'umi';
import styles from './index.less';
import './index.css';
import './common.css';
import { Layout, Menu, Tooltip } from 'antd';
import { GithubOutlined } from '@ant-design/icons';
import { PROPERTY_TYPES } from '@babel/types';

const { Header, Content, Sider } = Layout;

class Index extends React.Component {
  componentDidMount = () => {
    history.push('/componentsPage');
  };

  render() {
    return (
      <Layout id="index">
        <Header className={styles.header}>
          <div className={styles.logo}>个人技术网站</div>
          <Menu
            className={styles.menu}
            mode="horizontal"
            defaultSelectedKeys={['components']}
          >
            <Menu.Item
              key="components"
              onClick={() => history.push('/componentsPage')}
            >
              各类组件
            </Menu.Item>
            <Menu.Item key="js" onClick={() => history.push('/jsPage')}>
              JS代码
            </Menu.Item>
            <Menu.Item
              key="browser"
              onClick={() => history.push('/browserPage')}
            >
              浏览器相关
            </Menu.Item>
          </Menu>
          <div className={styles.git}>
            <Tooltip title="个人技术网站github">
              <a
                target="_blank"
                href="https://github.com/libingbing-li/PersonalTechnology"
              >
                <GithubOutlined />
              </a>
            </Tooltip>
            <Tooltip title="github个人页面">
              <a target="_blank" href="https://github.com/libingbing-li">
                libingbing-li
              </a>
            </Tooltip>
          </div>
        </Header>
        {this.props.children}
      </Layout>
    );
  }
}

export default Index;
