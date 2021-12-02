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
    type: 'ReactNode | null',
    default: 'null',
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
            <CodeOutlined style={{ marginLeft: '15px' }} />
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
