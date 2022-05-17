import React from 'react';
import { Layout, Switch, Table, Tooltip, Typography, Menu } from 'antd';
import {
  GithubOutlined,
  CodeOutlined,
  LeftOutlined,
  RightOutlined,
} from '@ant-design/icons';
import styles from './styles/demo.less';
import DateSelect from '@/common-components/DateSelect';
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
    parameter: 'returnTime（必须）',
    description: '获取组件返回的年月日',
    type: '(year: number, month: number, date: number) => void',
    default: '-',
  },
  {
    key: '3',
    parameter: 'style',
    description: '组件样式',
    type: 'object',
    default: '{}',
  },
  {
    key: '4',
    parameter: 'type',
    description: '组件的类型。1：选择月份  2：选择日期',
    type: 'number',
    default: '1',
  },
  {
    key: '5',
    parameter: 'time',
    description:
      '输入Date.getTime()得到的毫秒数，可以设定组件起始时间。为0时获取当前日期作为组件起始时间。',
    type: 'number',
    default: '0',
  },
];

interface DIProsp {
  type: number;
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
        <div className={styles.main}>
          <DateSelect
            id={'dateSelectPage' + this.props.type}
            type={this.props.type}
            returnTime={this.returnTime}
            style={{
              width: '80%',
              minWidth: '300px',
            }}
          />
        </div>
      </div>
    );
  }
}

class DateSelectPage extends React.Component {
  render = () => {
    return (
      <div id="dateSelectPage">
        <Title>
          DateSelect 日期选择
          <Tooltip title="点击跳转到github">
            <a
              target="_blank"
              href="https://github.com/libingbing-li/PersonalTechnology/blob/master/src/common-components/DateSelect.tsx"
            >
              <CodeOutlined style={{ marginLeft: '15px' }} />
            </a>
          </Tooltip>
        </Title>
        <Paragraph>选择日期的控件。</Paragraph>
        <Paragraph>
          <ul>
            <li>左右切换日期</li>
            <li>点击标题显示更多可选日期</li>
          </ul>
        </Paragraph>
        <Title level={2}>演示</Title>
        <Demo title="月份选择" type={1} />
        <Demo title="日期选择" type={2} />
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

export default DateSelectPage;
