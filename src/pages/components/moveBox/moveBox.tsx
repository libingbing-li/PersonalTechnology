import React from 'react';
import { Layout, Switch, Table, Tooltip } from 'antd';
import {
  GithubOutlined,
  CodeOutlined,
} from '@ant-design/icons';
import MoveBox from '@/common-components/MoveBox';
import { columns } from '../../../data';

const { Header, Content, Sider } = Layout;

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
    parameter: 'fx',
    description: '父元素的宽度,默认是整个窗口的可见区域px',
    type: 'number',
    default: 'document.body.clientWidth',
  },
  {
    key: '5',
    parameter: 'fy',
    description: '父元素的高度,默认是整个窗口的可见区域px',
    type: 'number',
    default: 'document.body.clientHeight',
  },
  {
    key: '6',
    parameter: 'top',
    description: '初始化位置值(带单位px), 默认auto',
    type: 'string',
    default: 'auto',
  },
  {
    key: '7',
    parameter: 'left',
    description: '初始化位置值(带单位px), 默认auto',
    type: 'string',
    default: 'auto',
  },
  {
    key: '8',
    parameter: 'bottom',
    description: '初始化位置值(带单位px), 默认auto',
    type: 'string',
    default: 'auto',
  },
  {
    key: '9',
    parameter: 'right',
    description: '初始化位置值(带单位px), 默认auto',
    type: 'string',
    default: 'auto',
  },
  {
    key: '10',
    parameter: 'isTop',
    description: '松开移动盒子后，是否贴边（上）',
    type: 'boolean',
    default: 'false',
  },
  {
    key: '11',
    parameter: 'isBottom',
    description: '松开移动盒子后，是否贴边（下）',
    type: 'boolean',
    default: 'false',
  },
  {
    key: '12',
    parameter: 'isLeft',
    description: '松开移动盒子后，是否贴边（左）',
    type: 'boolean',
    default: 'false',
  },
  {
    key: '13',
    parameter: 'isRight',
    description: '松开移动盒子后，是否贴边（右）',
    type: 'boolean',
    default: 'false',
  },
  {
    key: '14',
    parameter: 'minTop',
    description: '存在贴边时与父元素边框之间的距离（上）',
    type: 'number',
    default: '0',
  },
  {
    key: '15',
    parameter: 'minBottom',
    description: '存在贴边时与父元素边框之间的距离（下）',
    type: 'number',
    default: '0',
  },
  {
    key: '16',
    parameter: 'minLeft',
    description: '存在贴边时与父元素边框之间的距离（左）',
    type: 'number',
    default: '0',
  },
  {
    key: '17',
    parameter: 'minRight',
    description: '存在贴边时与父元素边框之间的距离（右）',
    type: 'number',
    default: '0',
  },
];


class Confirm extends React.Component {
  render = () => {
    return (
      <div id='moveBoxPage'>
        <h1>MoveBox 移动盒子</h1>
        <p>可以包裹一个内容，将其在屏幕上随意移动。</p>
        <h3>演示</h3>
        <Layout>
          <Sider></Sider>
          <Layout>
            <Header></Header>
            <Content
              style={{
                position: 'relative',
              }}
            >
              <MoveBox
                id="moveBoxPage"
              ></MoveBox>
            </Content>
          </Layout>
        </Layout>
        <h2>API</h2>
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
  }
}


export default Confirm;