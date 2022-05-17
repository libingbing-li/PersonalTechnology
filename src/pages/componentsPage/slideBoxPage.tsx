import React from 'react';
import { Layout, Switch, Table, Tooltip, Typography, Menu } from 'antd';
import {
  GithubOutlined,
  CodeOutlined,
  LeftOutlined,
  RightOutlined,
} from '@ant-design/icons';
import styles from './styles/demo.less';
import SlideBox from '@/common-components/SlideBox';
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
    parameter: 'children',
    description: '组件包裹元素',
    type: 'ReactNode | undefined',
    default: '-',
  },
  {
    key: '3',
    parameter: 'scrollBox',
    description:
      '可能存在的滚动的父盒子，当存在时，拖动组件会设置父盒子不可滚动',
    type: 'ReactNode | undefined',
    default: '-',
  },
  {
    key: '4',
    parameter: 'style',
    description: '样式',
    type: 'object',
    default: '{}',
  },
  {
    key: '5',
    parameter: 'slideDistance',
    description: '滑动距离',
    type: 'number',
    default: '50px',
  },
  {
    key: '6',
    parameter: 'slideLeft',
    description: '左滑回调函数',
    type: '(e?: any, payload?: any) => void',
    default: '(e?: any, payload?: any) => {console.log("slideLeft");}',
  },
  {
    key: '7',
    parameter: 'slideRight',
    description: '右滑回调函数',
    type: '(e?: any, payload?: any) => void',
    default: '(e?: any, payload?: any) => {console.log("slideRight");}',
  },
  {
    key: '8',
    parameter: 'slideTop',
    description: '上滑回调函数',
    type: '(e?: any, payload?: any) => void',
    default: '(e?: any, payload?: any) => {console.log("slideTop");}',
  },
  {
    key: '9',
    parameter: 'slideBottom',
    description: '下滑回调函数',
    type: '(e?: any, payload?: any) => void',
    default: '(e?: any, payload?: any) => {console.log("slideBottom");}',
  },
  {
    key: '10',
    parameter: 'payload',
    description: '回调函数所需参数',
    type: 'any | undefined',
    default: '-',
  },
];

interface DIProsp {
  title: string;
}
interface DIState {
  page: number;
  top: number;
  bottom: number;
}
class Demo extends React.Component<DIProsp> {
  state: DIState = {
    page: 1,
    top: 0,
    bottom: 0,
  };
  slideLeft = () => {
    if (this.state.page === 1) return;
    this.setState((state: DIState) => {
      return {
        page: state.page - 1,
      };
    });
  };
  slideRight = () => {
    if (this.state.page === 3) return;
    this.setState((state: DIState) => {
      return {
        page: state.page + 1,
      };
    });
  };
  slideBottom = () => {
    this.setState({
      top: 1,
    });
    setTimeout(() => {
      this.setState({
        top: 0,
      });
    }, 500);
  };
  slideTop = () => {
    this.setState({
      bottom: 1,
    });
    setTimeout(() => {
      this.setState({
        bottom: 0,
      });
    }, 500);
  };

  render() {
    return (
      <div className={styles.demo}>
        <div className={styles.title}>{this.props.title}</div>
        <div className={styles.main} style={{ height: '300px' }}>
          <SlideBox
            id="slideBoxPage"
            style={{
              position: 'relative',
              width: '200px',
              height: '300px',
              overflow: 'hidden',
            }}
            slideLeft={this.slideLeft}
            slideRight={this.slideRight}
            slideTop={this.slideTop}
            slideBottom={this.slideBottom}
            scrollBox={document.querySelector('#componentsPageMain')}
          >
            <div
              style={{
                transition: 'left .5s',
                width: '200px',
                height: '300px',
                background: '#FAEBD7',
                position: 'absolute',
                top: '0px',
                left: `${200 - this.state.page * 200}px`,
              }}
            >
              page1
            </div>
            <div
              style={{
                transition: 'left .5s',
                width: '200px',
                height: '300px',
                background: '#00FFFF',
                position: 'absolute',
                top: '0px',
                left: `${400 - this.state.page * 200}px`,
              }}
            >
              page2
            </div>
            <div
              style={{
                transition: 'left .5s',
                width: '200px',
                height: '300px',
                background: '#7FFFD4',
                position: 'absolute',
                top: '0px',
                left: `${600 - this.state.page * 200}px`,
              }}
            >
              page3
            </div>
            <div
              style={{
                transition: 'top .5s',
                width: '200px',
                height: '100px',
                background: '#FF7F50',
                position: 'absolute',
                top: `${this.state.top * 100 - 100}px`,
                left: '0px',
              }}
            >
              top
            </div>
            <div
              style={{
                transition: 'bottom .5s',
                width: '200px',
                height: '100px',
                background: '#FFD700',
                position: 'absolute',
                bottom: `${this.state.bottom * 100 - 100}px`,
                left: '0px',
              }}
            >
              bottom
            </div>
          </SlideBox>
        </div>
      </div>
    );
  }
}

class SlideBoxPage extends React.Component {
  render = () => {
    return (
      <div id="slideBoxPage">
        <Title>
          SlideBox 滑动盒子
          <Tooltip title="点击跳转到github">
            <a
              target="_blank"
              href="https://github.com/libingbing-li/PersonalTechnology/blob/master/src/common-components/SlideBox.tsx"
            >
              <CodeOutlined style={{ marginLeft: '15px' }} />
            </a>
          </Tooltip>
        </Title>
        <Paragraph>检测用户上下左右滑动行为并调用对应函数。</Paragraph>
        <Title level={2}>演示</Title>
        <Demo title="滑动盒子" />
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

export default SlideBoxPage;
