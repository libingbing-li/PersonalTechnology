import React from 'react';
import { Layout, Switch, Table, Tooltip, Typography, Menu } from 'antd';
import { GithubOutlined, CodeOutlined } from '@ant-design/icons';
import styles from '../componentsPage/styles/demo.less';
import { columns } from '../../data';
import VerifyCode from '@/common-components/VerifyCode';
import VerifyImage from '@/common-components/VerifyImage';
import { check } from 'prettier';

const { Header, Content, Sider } = Layout;
const { Title, Paragraph } = Typography;

interface DIState {
  count: number;
  dcount: number;
  tcount: number;
}
class Demo extends React.Component {
  state: DIState = {
    count: 0,
    dcount: 0,
    tcount: 0,
  };

  componentDidMount = () => {
    const scrollDiv = document.querySelector('#DTdemo-scrollEvent');
    if (scrollDiv) {
      scrollDiv.addEventListener('scroll', this.scroll);
      scrollDiv.addEventListener('scroll', this.debounce(this.dscroll));
      scrollDiv.addEventListener('scroll', this.throttle(this.tscroll));
    }
  };

  // 防抖 fun:需要防抖的函数 wait 等待时间
  debounce = (
    fun: Function,
    wait: number = 1000,
    immediate: boolean = true,
  ) => {
    // 缓存一个定时器id
    let timer: any = null;

    // 延迟执行函数
    const later = (args: any) =>
      setTimeout(() => {
        timer = null; //已经执行完了就将其消除，这样点击就可以执行
        // if(!immediate) {
        //   fun(args)
        // }
        fun(args);
      }, wait);

    // 返回每次实际调用的函数
    return (args: any) => {
      /*
      //不带立刻执行
      if(timer) clearTimeout(timer); // 如果已经设定过定时器了就清空上一个定时器，重新设定一个新的定时器
      timer = setTimeout(() => {
        // fun.apply(this, args);
        fun(args);
      }, wait)
      */
      if (!timer) {
        timer = later(args);
        if (immediate) {
          fun(args);
        } else {
          // 缓存执行环节和参数，放到延迟函数中去执行
        }
      } else {
        // 如果已存在延时执行函数，调用的时候清除原来的并重新设定一个
        clearTimeout(timer);
        timer = later(args);
      }
    };
  };

  // 获取当前时间戳
  now = () => {
    return +new Date();
  };

  // 节流
  throttle = (fun: Function, wait: number = 500) => {
    let startT = this.now();
    return (args: any) => {
      let now = this.now();
      if (now - startT < wait) return;
      else {
        fun(args);
        startT = now;
      }
    };
  };

  scroll = () => {
    this.setState((state: any) => {
      return {
        count: state.count + 1,
      };
    });
  };
  dscroll = () => {
    this.setState((state: any) => {
      return {
        dcount: state.dcount + 1,
      };
    });
  };
  tscroll = () => {
    this.setState((state: any) => {
      return {
        tcount: state.tcount + 1,
      };
    });
  };

  restart = () => {
    this.setState({
      count: 0,
      dcount: 0,
      tcount: 0,
    });
  };

  render() {
    return (
      <div className={styles.demo}>
        <div className={styles.title}>显示调用滚动事件的函数次数</div>
        <div className={styles.description}>
          <button onClick={this.restart}>重新开始</button>
          <br />
          滚动事件调用次数: {this.state.count} <br />
          <br />
          滚动事件防抖Debounce：
          间隔500毫秒，立即执行一次后，不论触发多少次事件，直到最后一次执行后超过等待时间（500ms）才执行最后一次
          <br />
          调用次数: {this.state.dcount}
          <br />
          <br />
          滚动事件节流Throttle： 间隔500毫秒，每隔一段时间（500ms）就执行一次
          <br />
          调用次数: {this.state.tcount}
        </div>
        <div
          className={styles.main}
          id="DTdemo-scrollEvent"
          style={{
            height: '100px',
            overflowY: 'scroll',
          }}
        >
          <div
            style={{
              height: '400px',
            }}
          ></div>
        </div>
      </div>
    );
  }
}

class DTPage extends React.Component {
  componentDidMount = () => {};
  render = () => {
    return (
      <div id="DTPage">
        <Title>
          防抖(Debouncing) + 节流(Throtting)
          <Tooltip title="点击跳转到github">
            <CodeOutlined style={{ marginLeft: '15px' }}>
              <a href=""></a>
            </CodeOutlined>
          </Tooltip>
        </Title>
        <Paragraph>
          防抖节流是用于控制一个函数在一段时间之内执行几次的技术手段，防止函数被频繁调用。
        </Paragraph>
        <Title level={2}>演示</Title>
        <Demo />
        <Title level={2}>思路</Title>
        <Paragraph>
          在由B页面进入A页面时添加一层历史记录，此时历史记录为B-A-A。
          <br />
          当用户强制后退时,由A退到A，此时历史记录为B-A，同时弹出弹窗询问是否确认后退，如果确认，执行js代码后退到页面B，如果不后退，再添加一层历史记录，历史记录为：B-A-A，那么当用户强制后退时，就会出现之前的情况。
          <br />
          在用户层面的表现：后退，弹出警告，取消，再次后退，再次弹出警告，确认后退，后退到B。
        </Paragraph>
      </div>
    );
  };
}

export default DTPage;
