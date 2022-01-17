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
    boxCT: 0,
    boxCL: 0,
    boxSW: 0,
    boxSH: 0,
    boxST: 0,
    boxSL: 0,
    pageAT: 0,
    pageAL: 0,
    pageOT: 0,
    pageOL: 0,
  };

  componentDidMount = () => {
    this.setWH();
  };

  setWH = () => {
    const box: any = document.querySelector('#HWD-box');
    const page: any = document.querySelector('#HWD-page');
    this.setState({
      pageCW: page?.clientWidth,
      pageCH: page?.clientHeight,
      boxOW: box?.offsetWidth,
      boxOH: box?.offsetHeight,
      boxCW: box?.clientWidth,
      boxCH: box?.clientHeight,
      boxCT: box?.clientTop,
      boxCL: box?.clientLeft,
      boxSW: box?.scrollWidth,
      boxSH: box?.scrollHeight,
      boxST: box?.scrollTop,
      boxSL: box?.scrollLeft,
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
        <div className={styles.title}>元素的各项宽高</div>
        <div className={styles.description}>
          <li>
            <b>clientWidth、clientHeight：</b>
            元素的内容+padding所占据的视觉面积，不包括border和滚动条——对于内联元素inline为0，返回数值
          </li>
          <li>
            <b>clientTop、clientLeft：</b>
            表示一个元素的顶部边框、左边框的宽度，以像素表示。如果元素的文本方向是从右向左（RTL,
            right-to-left），并且由于内容溢出导致左边出现了一个垂直滚动条，则该属性包括滚动条的宽度。
          </li>
          <br />
          <li>
            <b>scrollWidth、scrollHeight：</b>{' '}
            包含滚动条在内的元素的视觉面积——包括了::after、::before这样的伪元素
          </li>
          <li>
            <b>scrollTop、scrollLeft</b>
            可以读取或设置元素滚动条垂直滚动/到元素左边的距离。
            <br />
            注意如果这个元素的内容排列方向（direction） 是rtl (right-to-left)
            ，那么滚动条会位于最右侧（内容开始处），并且scrollLeft值为0。此时，当你从右到左拖动滚动条时，scrollLeft会从0变为负数。
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
          <button onClick={this.setWH}>点击重新获取各项数值</button>
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
              <b>clientTop:</b> {this.state.boxCT} <br />
              <b>clientLeft:</b> {this.state.boxCL}
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
              <b>scrollTop:</b>
              {this.state.boxST} <br />
              <b>scrollLeft</b> {this.state.boxSL}
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
class Demo2 extends React.Component {
  state = {};

  componentDidMount = () => {
    document.addEventListener('mousedown', this.setPosition);
  };

  setPosition = (e: any) => {
    console.log(e);
  };

  render() {
    return (
      <div className={styles.demo}>
        <div className={styles.title}>鼠标事件(mouseEvent)的坐标</div>
        <div className={styles.description}>
          <b>在页面上点击鼠标，显示坐标</b>
          <br />
          <li>
            <b>clientX、clientY：</b>
            鼠标相对于【浏览器可视窗口】的xy坐标。不包括工具栏和滚动条，当有滚动条时clientX小于pageX
          </li>
          <li>
            <b>pageX、pageY：</b>
            类似client，但使用的是文档坐标而不是窗口坐标。不是标准属性，但得到了广泛支持
          </li>
          <li>
            <b>offsetX，offsetY</b>
            鼠标相对于目标元素（被点击的元素）的内填充边（padding edge）在 X Y
            轴方向上的偏移量。
          </li>
          <li>
            <b>screenX、screenY</b>
            鼠标相对于用户显示屏左上角的xy坐标。
          </li>
        </div>
        <div
          className={styles.main}
          style={{
            position: 'relative',
          }}
        >
          点击后查看控制台
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
        <Title>元素宽高定位滚动距离+鼠标事件定位坐标</Title>

        <Paragraph>
          <Tooltip title="点击跳转到MDN">
            <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Element">
              Element
            </a>
            <br />
            <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/MouseEvent">
              MouseEvent
            </a>
          </Tooltip>
          <br />
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
        <Demo2 />
        <Title level={2}>演示</Title>
        <Demo />
      </div>
    );
  };
}

export default HWPage;
