import React from 'react';
import { Layout, Switch, Table, Tooltip, Typography, Menu } from 'antd';
import { GithubOutlined, CodeOutlined } from '@ant-design/icons';
import style from '../demo.less';
import { columns } from '../../../data';
import VerifyCode from '@/common-components/VerifyCode';
import VerifyImage from '@/common-components/VerifyImage';
import { check } from 'prettier';

const { Header, Content, Sider } = Layout;
const { Title, Paragraph } = Typography;

const data: Array<any> = [
  {
    key: '1',
    parameter: 'getCodeStr（组件CodeVerify）',
    description: '获取当前组件显示的验证码字符串',
    type: '(data: string[]) => void',
    default: '(data: string[]) =>  console.log(...data)',
  },
];

interface IState {
  codeStr: string;
  verifyCodeStr: string;
}

class Demo extends React.Component {
  state: IState = {
    codeStr: '',
    verifyCodeStr: '请重新输入',
  };

  componentDidMount = () => {};

  getCodeStr = (data: string[]) => {
    let str = '';
    data.forEach((v: string) => {
      str = str + v;
    });
    this.setState({
      codeStr: str,
      verifyCodeStr: '请重新输入',
    });
  };

  varifyCodeStr = (str: string) => {
    if (str === this.state.codeStr) {
      this.setState({
        verifyCodeStr: '验证成功',
      });
    } else {
      this.setState({
        verifyCodeStr: '验证失败',
      });
    }
  };

  render() {
    return (
      <div>
        <div className={style.demo}>
          <div className={style.title}>验证码验证——点击刷新</div>
          <div
            className={style.main}
            style={{
              flexDirection: 'column',
            }}
          >
            <VerifyCode
              getCodeStr={(data: string[]) => this.getCodeStr(data)}
            />
            <input
              type="text"
              style={{ margin: '20px' }}
              spellCheck={false}
              onChange={(v) => {
                this.varifyCodeStr(v.target.value);
              }}
            />
            <div>{this.state.verifyCodeStr}</div>
          </div>
        </div>
        <div className={style.demo}>
          <div className={style.title}>拼图验证</div>
          <div
            className={style.main}
            style={{
              flexDirection: 'column',
            }}
          >
            <VerifyImage />
          </div>
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
