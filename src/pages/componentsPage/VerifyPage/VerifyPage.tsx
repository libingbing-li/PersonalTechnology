import React from 'react';
import { Layout, Switch, Table, Tooltip, Typography, Menu } from 'antd';
import { GithubOutlined, CodeOutlined } from '@ant-design/icons';
import styles from './VerifyPage.less';
import style from '../demo.less';
import { columns } from '../../../data';
import Verify from '@/common-components/Verify';
import { check } from 'prettier';

const { Header, Content, Sider } = Layout;
const { Title, Paragraph } = Typography;

const data: Array<any> = [];

interface IState {
  demoCancel: boolean;
  demo: any;
}

class Demo extends React.Component {
  state: IState = {
    demoCancel: false,
    demo: null,
  };

  componentDidMount = () => {};

  render() {
    return (
      <div className={style.demo}>
        <div className={style.title}>验证码验证——点击刷新</div>
        <div className={style.main}>
          <Verify />
        </div>
      </div>
    );
  }
}

class VerifyPage extends React.Component {
  render = () => {
    return (
      <div id="VerifyPage">
        <Title>
          Verify 安全验证
          <Tooltip title="点击跳转到github">
            <CodeOutlined style={{ marginLeft: '15px' }} />
          </Tooltip>
        </Title>
        <Paragraph>用于安全验证的组件</Paragraph>
        <Paragraph>
          <ul>
            <li>验证码验证</li>
            {/* <li>点击顺序字符验证</li> */}
          </ul>
        </Paragraph>
        <Title level={2}>演示</Title>
        <Demo />
        <Title level={2}>API</Title>
        <Table
          scroll={{
            x: true,
          }}
          columns={columns}
          dataSource={data}
          bordered={true}
          pagination={false}
        />
      </div>
    );
  };
}

export default VerifyPage;
