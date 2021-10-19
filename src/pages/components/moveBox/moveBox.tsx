import React from 'react';
import { Layout, Switch, Table, Tooltip } from 'antd';
import {
  GithubOutlined,
  CodeOutlined,
} from '@ant-design/icons';
import MoveBox from '@/common-components/MoveBox';
const { Header, Content, Sider } = Layout;

const columns: Array<any> = [
  {
    title: '参数',
    dataIndex: 'parameter',
    align: 'center',
  },
  {
    title: '说明',
    dataIndex: 'description',
    align: 'center',
  },
  {
    title: '类型',
    dataIndex: 'type',
    align: 'center',
  },
  {
    title: '默认值',
    dataIndex: 'default',
    align: 'center',
  },
];
const data: Array<any> = [
  {
    key: '1',
    parameter: 'id',
    description: '为组件指定id',
    type: 'string',
    default: '-',
  }
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