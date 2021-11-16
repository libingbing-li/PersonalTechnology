import React from 'react';
import { Layout, Switch, Table, Tooltip, Typography, Menu } from 'antd';
import { GithubOutlined, CodeOutlined } from '@ant-design/icons';
import styles from './VerifyPage.less';
import { columns } from '../../../data';
import { check } from 'prettier';

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
    parameter: 'onClick',
    description: '点击事件的回调',
    type: '() => void',
    default: '() => {}',
  },
  {
    key: '3',
    parameter: 'cancel',
    description: '是否显示关闭按钮',
    type: 'boolean',
    default: 'false',
  },
  {
    key: '4',
    parameter: 'style',
    description: '组件样式',
    type: 'object',
    default: '{}',
  },
  {
    key: '5',
    parameter: 'fx',
    description: '父元素的宽度,默认是整个窗口的可见区域px',
    type: 'number',
    default: 'document.body.clientWidth',
  },
  {
    key: '6',
    parameter: 'fy',
    description: '父元素的高度,默认是整个窗口的可见区域px',
    type: 'number',
    default: 'document.body.clientHeight',
  },
  {
    key: '7',
    parameter: 'top',
    description: '初始化位置值(带单位px), 默认auto',
    type: 'string',
    default: 'auto',
  },
  {
    key: '8',
    parameter: 'left',
    description: '初始化位置值(带单位px), 默认auto',
    type: 'string',
    default: 'auto',
  },
  {
    key: '9',
    parameter: 'bottom',
    description: '初始化位置值(带单位px), 默认auto',
    type: 'string',
    default: 'auto',
  },
  {
    key: '10',
    parameter: 'right',
    description: '初始化位置值(带单位px), 默认auto',
    type: 'string',
    default: 'auto',
  },
  {
    key: '11',
    parameter: 'isTop',
    description: '松开移动盒子后，是否贴边（上）',
    type: 'boolean',
    default: 'false',
  },
  {
    key: '12',
    parameter: 'isBottom',
    description: '松开移动盒子后，是否贴边（下）',
    type: 'boolean',
    default: 'false',
  },
  {
    key: '13',
    parameter: 'isLeft',
    description: '松开移动盒子后，是否贴边（左）',
    type: 'boolean',
    default: 'false',
  },
  {
    key: '14',
    parameter: 'isRight',
    description: '松开移动盒子后，是否贴边（右）',
    type: 'boolean',
    default: 'false',
  },
  {
    key: '15',
    parameter: 'minTop',
    description: '存在贴边时与父元素边框之间的距离（上）',
    type: 'number',
    default: '0',
  },
  {
    key: '16',
    parameter: 'minBottom',
    description: '存在贴边时与父元素边框之间的距离（下）',
    type: 'number',
    default: '0',
  },
  {
    key: '17',
    parameter: 'minLeft',
    description: '存在贴边时与父元素边框之间的距离（左）',
    type: 'number',
    default: '0',
  },
  {
    key: '18',
    parameter: 'minRight',
    description: '存在贴边时与父元素边框之间的距离（右）',
    type: 'number',
    default: '0',
  },
];

interface IState {
  demoCancel: boolean;
  demo: any;
}

class Demo extends React.Component {
  state: IState = {
    demoCancel: false,
    demo: null,
  };

  componentDidMount = () => {
    this.setState({
      demo: document.querySelector('#moveBoxPageDemo'),
    });
  };

  render() {
    return <div className={styles.demo} id="moveBoxPageDemo"></div>;
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
            <li>拼图验证</li>
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
