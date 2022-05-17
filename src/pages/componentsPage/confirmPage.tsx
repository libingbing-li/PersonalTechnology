import React from 'react';
import { Layout, Switch, Table, Tooltip, Typography, Menu } from 'antd';
import {
  GithubOutlined,
  CodeOutlined,
  LeftOutlined,
  RightOutlined,
} from '@ant-design/icons';
import styles from './styles/demo.less';
import Confirm from '@/common-components/Confirm';
import ConfirmBtn from '@/common-components/ConfirmBtn';
import { columns } from '../../data';

const { Header, Content, Sider } = Layout;
const { Title, Paragraph } = Typography;

const data: Array<any> = [
  {
    key: '1',
    parameter: 'id（必须）',
    description: '为组件指定id',
    type: 'string',
    default: '-',
  },
  {
    key: '2',
    parameter: 'style',
    description: '组件样式',
    type: 'object',
    default: '{}',
  },
  {
    key: '3',
    parameter: 'confirmStr',
    description: '确认文字',
    type: 'string',
    default: '确认',
  },
  {
    key: '4',
    parameter: 'cancelStr',
    description: '取消文字',
    type: 'string',
    default: '取消',
  },
  {
    key: '5',
    parameter: 'txt',
    description: '选择框主体显示文字',
    type: 'string',
    default: '是否进行操作',
  },
  {
    key: '6',
    parameter: 'confirm',
    description: '确认函数',
    type: '() => void',
    default: '() => { console.log("confirm");}',
  },
  {
    key: '7',
    parameter: 'cancel',
    description: '取消函数',
    type: '() => void',
    default: '() => { console.log("cancel");}',
  },
  {
    key: '8',
    parameter: 'closeIcon',
    description: '是否出现关闭选择框按钮',
    type: 'boolean',
    default: 'false',
  },
  {
    key: '9',
    parameter: 'close',
    description: '关闭选择框按钮对应函数',
    type: '() => void',
    default: '() => {}',
  },
  {
    key: '10',
    parameter: 'btnStr（ ConfirmBtn组件 ）',
    description: 'ConfirmBtn组件按钮文字',
    type: 'string',
    default: '点击显示选择框',
  },
];

class Demo extends React.Component {
  confirmShow = () => {
    const con: any = document.querySelector('#confirm-ConfirmPage1');
    if (con) {
      if (con.style.display === 'none') {
        con.style.display = 'flex';
      } else {
        con.style.display = 'none';
      }
    }
  };
  confirm = () => {
    console.log('Page-confirm');
    this.confirmShow();
  };
  cancel = () => {
    console.log('Page-cancel');
    this.confirmShow();
  };

  render() {
    return (
      <div>
        <div className={styles.demo}>
          <div className={styles.title}>选择框</div>
          <div
            className={styles.main}
            style={{
              height: '300px',
            }}
          >
            <Confirm
              id="ConfirmPage1"
              closeIcon={true}
              close={this.confirmShow}
              confirm={this.confirm}
              cancel={this.cancel}
              style={{
                display: 'none',
              }}
            />
            <button onClick={this.confirmShow}>自定义按钮</button>
          </div>
        </div>
        <div className={styles.demo}>
          <div className={styles.title}>选择框+按钮+遮罩层</div>
          <div
            className={styles.main}
            style={{
              height: '300px',
            }}
          >
            <ConfirmBtn
              id="ConfirmPage2"
              closeIcon={true}
              close={this.confirmShow}
              confirm={this.confirm}
              cancel={this.cancel}
            />
          </div>
        </div>
      </div>
    );
  }
}

class ConfirmPage extends React.Component {
  render = () => {
    return (
      <div id="dateSelectPage">
        <Title>
          Confirm 弹出选择框
          <Tooltip title="点击跳转到github">
            <a
              target="_blank"
              href="https://github.com/libingbing-li/PersonalTechnology/blob/master/src/common-components/Confirm.tsx"
            >
              <CodeOutlined style={{ marginLeft: '15px' }} />
            </a>
            <a
              target="_blank"
              href="https://github.com/libingbing-li/PersonalTechnology/blob/master/src/common-components/ConfirmBtn.tsx"
            >
              <CodeOutlined style={{ marginLeft: '15px' }}></CodeOutlined>
            </a>
          </Tooltip>
        </Title>
        <Paragraph>用于确认用户操作的选择框</Paragraph>
        <Paragraph>
          <ul>
            <li>单纯的选择框，需要开发者自行编写控制出现的函数</li>
            <li>点击按钮出现的选择框</li>
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

export default ConfirmPage;
