import React from 'react';
import { Layout, Switch, Table, Tooltip, Typography, Menu } from 'antd';
import {
  GithubOutlined,
  CodeOutlined,
  LeftOutlined,
  RightOutlined,
} from '@ant-design/icons';
import styles from './styles/demo.less';
import MoveBox from '@/common-components/MoveBox';
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
    key: '18',
    parameter: 'children',
    description: '组件包裹元素',
    type: 'ReactNode | undefined',
    default: '-',
  },
  {
    key: '2',
    parameter: 'scrollBox',
    description:
      '可能存在的滚动的父盒子，当存在时，拖动组件会设置父盒子不可滚动',
    type: 'ReactNode | undefined',
    default: 'undefined',
  },
  {
    key: '3',
    parameter: 'style',
    description: '样式',
    type: 'object',
    default: '{}',
  },
  {
    key: '4',
    parameter: 'fw',
    description: '父元素宽度',
    type: 'number',
    default: 'document.body.clientWidth',
  },
  {
    key: '5',
    parameter: 'fh',
    description: '父元素高度',
    type: 'number',
    default: 'document.body.clientHeight',
  },
  {
    key: '6',
    parameter: 'top',
    description: 'css属性top值',
    type: 'string',
    default: '0px',
  },
  {
    key: '7',
    parameter: 'left',
    description: 'css属性left值',
    type: 'string',
    default: '0px',
  },
  {
    key: '8',
    parameter: 'bottom',
    description: 'css属性bottom值',
    type: 'string',
    default: 'auto',
  },
  {
    key: '9',
    parameter: 'right',
    description: 'css属性right值',
    type: 'string',
    default: 'auto',
  },
  {
    key: '10',
    parameter: 'isTop',
    description: '是否贴边-top',
    type: 'boolean',
    default: 'false',
  },
  {
    key: '11',
    parameter: 'isBottom',
    description: '是否贴边-bottom',
    type: 'boolean',
    default: 'false',
  },
  {
    key: '12',
    parameter: 'isLeft',
    description: '是否贴边-left',
    type: 'boolean',
    default: 'false',
  },
  {
    key: '13',
    parameter: 'isRight',
    description: '是否贴边-right',
    type: 'boolean',
    default: 'false',
  },
  {
    key: '14',
    parameter: 'minTop',
    description: '移动时距离边框的边距-top',
    type: 'number',
    default: '0',
  },
  {
    key: '15',
    parameter: 'minBottom',
    description: '移动时距离边框的边距-bottom',
    type: 'number',
    default: '0',
  },
  {
    key: '16',
    parameter: 'minLeft',
    description: '移动时距离边框的边距-left',
    type: 'number',
    default: '0',
  },
  {
    key: '17',
    parameter: 'minRight',
    description: '移动时距离边框的边距-right',
    type: 'number',
    default: '0',
  },
];

interface DIProsp {
  title: string;
}
class Demo extends React.Component<DIProsp> {
  returnTime = (year: number, month: number, date: number) => {
    console.log(`当前选择的日期是: ${year}.${month}.${date}`);
  };

  render() {
    return (
      <div className={styles.demo}>
        <div className={styles.title}>{this.props.title}</div>
        <div
          id="moveBoxPageDemo"
          className={styles.main}
          style={{ height: '300px' }}
        >
          <MoveBox
            style={{
              width: '30px',
              height: '30px',
              borderRadius: '15px',
              border: 'solid',
            }}
            id="moveBoxPage"
            fw={document.querySelector('#moveBoxPageDemo')?.clientWidth}
            fh={document.querySelector('#moveBoxPageDemo')?.clientHeight}
            scrollBox={document.querySelector('#componentsPageMain')}
          />
        </div>
      </div>
    );
  }
}

class MoveBoxPage extends React.Component {
  render = () => {
    return (
      <div id="moveBoxPage">
        <Title>
          MoveBox 移动盒子
          <Tooltip title="点击跳转到github">
            <CodeOutlined style={{ marginLeft: '15px' }}>
              <a href="https://github.com/libingbing-li/PersonalTechnology/blob/master/src/common-components/MoveBox.tsx"></a>
            </CodeOutlined>
          </Tooltip>
        </Title>
        <Paragraph>
          可在屏幕上随意移动的盒子，可以在其中包裹自定义元素。
        </Paragraph>
        <Title level={2}>演示</Title>
        <Demo title="移动盒子" />
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

export default MoveBoxPage;
