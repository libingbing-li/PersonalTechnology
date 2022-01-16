import React from 'react';
import { Layout, Switch, Table, Tooltip, Typography, Menu } from 'antd';
import { GithubOutlined, CodeOutlined } from '@ant-design/icons';
import styles from '../componentsPage/styles/demo.less';
import style from './style/MessagesPage.less';
import { columns } from '../../data';
import VerifyCode from '@/common-components/VerifyCode';
import VerifyImage from '@/common-components/VerifyImage';
import { check } from 'prettier';

const { Header, Content, Sider } = Layout;
const { Title, Paragraph, Text } = Typography;

class Demo extends React.Component {
  state = {
    pageCW: 0,
    pageCH: 0,
    boxOW: 0,
    boxOH: 0,
    boxCW: 0,
    boxCH: 0,
    boxSW: 0,
    boxSH: 0,
    pageAT: 0,
    pageAL: 0,
    pageOT: 0,
    pageOL: 0,
  };

  box: any = document.querySelector('#HWD-box');
  page: any = document.querySelector('#HWD-page');

  componentDidMount = () => {
    const box: any = document.querySelector('#HWD-box');
    const page: any = document.querySelector('#HWD-page');
    this.setState({
      pageCW: page?.clientWidth,
      pageCH: page?.clientHeight,
      boxOW: box?.offsetWidth,
      boxOH: box?.offsetHeight,
      boxCW: box?.clientWidth,
      boxCH: box?.clientHeight,
      boxSW: box?.scrollWidth,
      boxSH: box?.scrollHeight,
      pageAT: this.getElementTop(page),
      pageAL: this.getElementLeft(page),
      pageOT: page?.offsetTop,
      pageOL: page?.offsetLeft,
    });
  };

  // 获取绝对位置的横坐标和纵坐标
  getElementLeft = (element: any) => {
    var actualLeft = element.offsetLeft;
    var current = element.offsetParent;

    while (current !== null) {
      actualLeft += current.offsetLeft;
      current = current.offsetParent;
    }

    return actualLeft;
  };

  getElementTop = (element: any) => {
    var actualTop = element.offsetTop;
    var current = element.offsetParent;

    while (current !== null) {
      actualTop += current.offsetTop;
      current = current.offsetParent;
    }

    return actualTop;
  };

  render() {
    return (
      <div className={styles.demo}>
        <div className={styles.title}></div>
        <div className={styles.description}>
          元素可视窗口大小：
          <br />
          <li>
            <b>clientWidth、clientHeight：</b>
            元素的内容+padding所占据的视觉面积，不包括border和滚动条——对于内联元素inline为0，返回数值，只读
          </li>
          <br />
          元素包含不可视滚动区域大小：
          <br />
          <li>
            <b>scrollWidth、scrollHeight：</b>{' '}
            包含滚动条在内的元素的视觉面积——包括了::after、::before这样的伪元素
          </li>
          <br />
          <li>
            <b>offsetWidth、offsetHeight：</b>{' '}
            想到与clientWH包含了border边框、滚动条，返回该元素的整数像素宽高（浮点数：element.getBoundingClientRect）——元素隐藏返回0
          </li>
          <li>
            <b>offsetTop、offsetLeft：</b>{' '}
            表示该元素与父容器（offsetParent对象，但在表格和iframe中不一定为父容器）左上角的距离
          </li>
        </div>
        <div
          className={styles.main}
          style={{
            position: 'relative',
          }}
        >
          {/* 模拟浏览器窗口 */}
          <div
            id="HWD-box"
            style={{
              boxSizing: 'content-box',
              padding: '30px',
              width: '500px',
              height: '200px',
              border: 'solid 10px #aaa',
              overflow: 'scroll',
            }}
          >
            <div>
              width: 500, padding: 30 <br />
              <b>clientWidth:</b> width(当受到挤压，会变小) + padding*2 ={' '}
              {this.state.boxCW} <br />
              height: 200, padding: 30 <br />
              <b>clientHeight:</b> height + padding*2 = {this.state.boxCH}{' '}
              <br />
              <br />
              <b>scorllWidth:</b>
              {this.state.boxSW} = padding*2(60) + 下方div宽度(340+20border
              <br />
              <b>scrollHeight:</b>
              {this.state.boxSH} = 包含文字的div.style.height + padding*2(60) +
              下方div的高度(440 + 20-border*2的高度 + 10-margin ) +
              横向滚动条的高度
              <br />
              <br />
              <b>offsetWidth:</b> {this.state.boxOW} = 滚动条+边框10px*2
              +clientWidth <br />
              <b>offsetHeight:</b> {this.state.boxOH} = 滚动条+边框10px*2
              +clientWidth
            </div>

            {/* 模拟网页内容 */}
            <div
              id="HWD-page"
              style={{
                boxSizing: 'content-box',
                width: '300px',
                height: '400px',
                padding: '20px',
                border: '10px solid #ddd',
                background: '#ddd',
                margin: '10px auto',
              }}
            >
              width: 300, padding: 20 <br />
              <b>clientWidth:</b> width + padding*2 = {this.state.pageCW} <br />
              height: 400, padding: 20 <br />
              <b>clientHeight:</b> height + padding*2 = {this.state.pageCH}{' '}
              <br />
              <br />
              定位: <br />
              <b>offsetTop：</b> {this.state.pageOT} = 上层div的高度 +
              10父容器border + 30padding + 10本身的margin
              <br />
              <b>offsetLeft:</b> {this.state.pageOL} = 父border10 + padding30{' '}
              <br />
              <b>针对本网页的绝对位置：</b>x：{this.state.pageAL} , y:{' '}
              {this.state.pageAT} <br />
              <b>针对浏览器左上角的相对位置：</b>
              绝对位置减去scrollHeight和scorllWidth
              <b>获取元素位置的快速方法：</b> <br />
              getBoundingClientRect()方法，返回一个包含left、right、top、bottom四个属性的对象，对应钙元素左上角和右下角相对于浏览器窗口（viewport）左上角的距离（相对位置。再加上滚动距离，就可以得到绝对位置。
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class HWPage extends React.Component {
  state = {
    pageW: 0,
    pageH: 0,
    browserW: 0,
    browserH: 0,
  };
  componentDidMount = () => {
    this.getViewport();
    this.getPagearea();
  };
  // 获取浏览器窗口高宽
  getViewport = () => {
    // 条件是对文档条件（浏览器）的判断
    if (document.compatMode == 'BackCompat') {
      this.setState({
        browserW: document.body.clientWidth,
        browserH: document.body.clientHeight,
      });
    } else {
      this.setState({
        browserW: document.documentElement.clientWidth,
        browserH: document.documentElement.clientHeight,
      });
    }
  };

  // 获取网页大小
  getPagearea = () => {
    if (document.compatMode == 'BackCompat') {
      this.setState({
        pageW: Math.max(document.body.scrollWidth, document.body.clientWidth),
        pageH: Math.max(document.body.scrollHeight, document.body.clientHeight),
      });
    } else {
      this.setState({
        pageW: Math.max(
          document.documentElement.scrollWidth,
          document.documentElement.clientWidth,
        ),
        pageH: Math.max(
          document.documentElement.scrollHeight,
          document.documentElement.clientHeight,
        ),
      });
    }
  };

  render = () => {
    return (
      <div id="HWPage">
        <Title>
          元素宽高
          <Tooltip title="点击跳转到MDN">
            <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Element">
              <CodeOutlined style={{ marginLeft: '15px' }} />
            </a>
          </Tooltip>
        </Title>
        <Paragraph>
          <b>innerHeight、innerWidth：</b>window内部宽高，包括滚动条 <br />
          {`innerW: ${window.innerWidth}, innerH: ${window.innerHeight}`} <br />
          <b>outerHeight、outerWidth：</b>
          整个浏览器窗口的大小，包括窗口标题和工具栏等
          <br />
          {`outerW: ${window.outerWidth}, outerH: ${window.outerHeight}`}
        </Paragraph>
        <Paragraph>
          <b>网页的大小：</b>{' '}
          {`scrollWidth: ${this.state.pageW}、scrollHeight: ${this.state.pageH}`}{' '}
          <br />
          <b>浏览器窗口的大小：</b>{' '}
          {`clientWidth: ${this.state.browserW}、clientHeight: ${this.state.browserH}`}{' '}
          <br />
          <li>
            如果网页内容能够在浏览器窗口中全部显示，不出现滚动条，那么网页的clientWidth和scrollWidth应该相等。但是实际上，不同浏览器有不同的处理，这两个值未必相等。所以，我们需要取它们之中较大的那个值
          </li>
        </Paragraph>
        <Title level={2}>演示</Title>
        <Demo />
      </div>
    );
  };
}

export default HWPage;
