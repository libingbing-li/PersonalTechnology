import React from 'react';
import QRCode from 'qrcode.react';
import { Layout, Switch, Table, Tooltip, Typography, Menu } from 'antd';
import { GithubOutlined, CodeOutlined } from '@ant-design/icons';
import styles from '../componentsPage/styles/demo.less';
import { columns } from '../../data';
import VerifyCode from '@/common-components/VerifyCode';
import VerifyImage from '@/common-components/VerifyImage';
import { check } from 'prettier';

const { Header, Content, Sider } = Layout;
const { Title, Paragraph, Text } = Typography;

class Demo extends React.Component {
  // 下载二维码图片
  // changeCanvasToPic = () => {
  //     const canvasImg: any = document.getElementById('qrCode'); // 获取canvas类型的二维码
  //     const img = new Image();
  //     img.src = canvasImg.toDataURL('image/png'); // 将canvas对象转换为图片的data url --  在此处，不成功，因为logo图片是百度的，因为跨域限制所以无法下载
  //     const downLink = document.getElementById('down_link');
  //     downLink.href = img.src;
  //     downLink.download = '二维码'; // 图片name
  // };

  render() {
    return (
      <div>
        <div className={styles.demo}>
          <div className={styles.title}>
            二维码展示-qrcode.react
            <Tooltip title="点击跳转到简书教程">
              <a target="_blank" href="https://www.jianshu.com/p/92d5a778d964">
                <CodeOutlined style={{ marginLeft: '15px' }} />
              </a>
            </Tooltip>
            <Tooltip title="点击跳转到npm文档">
              <a
                target="_blank"
                href="https://www.npmjs.com/package/qrcode.react"
              >
                <CodeOutlined style={{ marginLeft: '5px' }} />
              </a>
            </Tooltip>
          </div>
          <div className={styles.description}>
            <ol>
              <li>
                <Text code>
                  --yarn add qrcode.react/npm install qrcode.react --save
                </Text>
              </li>
              <li>
                <Text code>import QRCode from 'qrcode.react';</Text>
              </li>
              <li>
                setInterval 定时更新 value 值来更新二维码, 要及时清理定时器
              </li>
            </ol>
          </div>
          <div
            className={styles.main}
            style={{
              height: '300px',
            }}
          >
            <QRCode
              id="qrCode"
              value="https://t7.baidu.com/it/u=166556752,1568603529&fm=193&f=GIF"
              size={200} // 二维码的大小
              fgColor="#000000" // 二维码的颜色
              style={{ margin: 'auto' }}
              imageSettings={{
                // 二维码中间的logo图片
                src: 'https://t7.baidu.com/it/u=166556752,1568603529&fm=193&f=GIF',
                height: 50,
                width: 50,
                excavate: true, // 中间图片所在的位置是否镂空
              }}
            />
            {/* <a id="down_link" onClick={this.changeCanvasToPic}>
                        点击下载
                    </a> */}
          </div>
        </div>
        <div className={styles.demo}>
          <div className={styles.title}>
            js生成二维码-QRCode.js
            <Tooltip title="点击跳转到简书教程">
              <a target="_blank" href="https://www.jianshu.com/p/ef2aabb8a5ac">
                <CodeOutlined style={{ marginLeft: '15px' }} />
              </a>
            </Tooltip>
            {/* <Tooltip title="点击跳转到npm文档">
                        <a target='_blank' href="https://www.npmjs.com/package/qrcode.react">
                            <CodeOutlined style={{ marginLeft: '5px' }} />
                        </a>
                    </Tooltip> */}
          </div>
          暂不实现
        </div>
        <div className={styles.demo}>
          <div className={styles.title}>
            iframe展示百度搜索网站
            {/* <Tooltip title="点击跳转到简书教程">
                        <a target='_blank' href="https://www.jianshu.com/p/ef2aabb8a5ac">
                            <CodeOutlined style={{ marginLeft: '15px' }} />
                        </a>
                    </Tooltip> */}
            {/* <Tooltip title="点击跳转到npm文档">
                        <a target='_blank' href="https://www.npmjs.com/package/qrcode.react">
                            <CodeOutlined style={{ marginLeft: '5px' }} />
                        </a>
                    </Tooltip> */}
          </div>
          <div className={styles.description}>存在跨域问题，暂不学习</div>
          <iframe src="https://www.baidu.com/" frameBorder="0"></iframe>
        </div>
      </div>
    );
  }
}

class QRLinkPage extends React.Component {
  componentDidMount = () => {
    this.hashRoute();
    this.historyRoute();
  };

  hashRoute = () => {
    //原生半链接跳转 - hash
    // // 页面加载完不会触发 hashchange，这里主动触发一次 hashchange 事件
    // window.addEventListener('DOMContentLoaded', onLoad)
    // 监听hash值的变化
    window.addEventListener('hashchange', onHashChange);
    //通过浏览器前进后退改变 URL、通过<a>标签改变 URL、通过window.location改变URL，这几种情况改变 URL 都会触发 hashchange 事件

    // 路由视图
    var routerView: any = document.querySelector('#routeView');

    // function onLoad() {
    //   routerView = document.querySelector('#routeView')
    //   onHashChange()
    // }

    // 路由变化时，根据路由渲染对应 UI
    function onHashChange() {
      switch (location.hash) {
        case '#/page1':
          routerView.innerHTML = '跳转到page1页面，观察url后的hash';
          return;
        case '#/page2':
          routerView.innerHTML = '跳转page2';
          return;
        default:
          return;
      }
    }
  };
  historyRoute = () => {
    //原生半链接跳转 - hash
    // // 页面加载完不会触发 hashchange，这里主动触发一次 hashchange 事件
    // window.addEventListener('DOMContentLoaded', onLoad)
    // 监听hash值的变化
    window.addEventListener('popstate', onPopState);
    //通过浏览器前进后退改变 URL、通过<a>标签改变 URL、通过window.location改变URL，这几种情况改变 URL 都会触发 hashchange 事件

    // 路由视图
    var routerViewHistory: any = document.querySelector('#routeViewHistory');

    // function onLoad() {
    //   routerView = document.querySelector('#routeView')
    //   onHashChange()
    // }
    // 拦截 <a> 标签点击事件默认行为， 点击时使用 pushState 修改 URL并更新手动 UI，从而实现点击链接更新 URL 和 UI 的效果。
    // var linkList = document.querySelectorAll('a[href]')
    var linkList = document.querySelectorAll('a.link');
    linkList.forEach((el) =>
      el.addEventListener('click', function (e) {
        e.preventDefault();
        history.pushState(null, '', el.getAttribute('href'));
        onPopState();
      }),
    );

    // 路由变化时，根据路由渲染对应 UI
    function onPopState() {
      switch (location.pathname) {
        case '/page3':
          routerViewHistory.innerHTML = '跳转到page3页面，观察pathname';
          return;
        case '/page4':
          routerViewHistory.innerHTML = '跳转page4';
          return;
        default:
          return;
      }
    }
  };

  render = () => {
    return (
      <div id="QRLinkPage">
        <Title>
          二维码+链接
          <Tooltip title="点击跳转到github">
            <CodeOutlined style={{ marginLeft: '15px' }}>
              <a href=""></a>
            </CodeOutlined>
          </Tooltip>
        </Title>
        <Paragraph>
          前端路由就是【浏览器地址栏中的url和所见网页的对应关系】
          <br />
          改变url的方式（均会触发hashChange事件）：
          <li>浏览器前进后退</li>
          <li>a标签改变（不会触发popstate事件</li>
          <li>window.location改变</li>
        </Paragraph>
        <Paragraph>
          <ul>
            <li>
              扫一扫获得结果:先判断是不是应用内半链接,再判断是否是全链接,都不是则视作文本
            </li>
            <li>
              {`if(url?.indexOf('http://') > -1 || url?.indexOf('https://') > -1)`}
            </li>
            <li>
              全连接跳转（网址可以作为url参数传递）:window.location.href =
              'https://你的url'（在移动端跳转到默认浏览器打开页面）
            </li>
            <li>iframe标签，参数为需要跳转的链接。</li>
            <li>
              半链接跳转：1.框架中有直接跳转的方法，如umi的history.push()。 2.
              原生半链接跳转，原生js没有具体跳转的方法，需要进行处理
            </li>
          </ul>
        </Paragraph>
        <Title level={2}>原生路由切换-url变化引起ui更新而不刷新页面</Title>
        <a
          target="_blank"
          href="https://blog.csdn.net/mfwscq/article/details/90256807"
        >
          csdn基础教程
        </a>
        <a target="_blank" href="https://zhuanlan.zhihu.com/p/130995492">
          知乎一个更高级更广泛应用的教程
        </a>
        <Paragraph>
          前端路由切换有两种方式：基于hash + hashChange、history.pushState() +
          popState 事件完成。
          <br />
          实现前端路由的核心：
          <ul>
            <li>改变url且不引起页面的刷新</li>
            <li>检测到url的变化</li>
          </ul>
        </Paragraph>
        <Title level={3}>使用hash原生切换路由</Title>
        <Paragraph>
          hash模式是一种把前端路由的路径用井字符号#拼接在真实url后面的模式。特征为：
          <li>url中hash值的变化并不会重新加载页面。</li>
          <li>
            hash值的改变，都会在浏览器的访问历史中增加一个记录，可以通过浏览器的回退前进按钮控制hash值的切换。
          </li>
          <li>
            可以通过hashChange事件，监听到hash值的变化，从而响应不同路径的逻辑处理。
          </li>
          <br />
          hash模式的思路就是当url改变，检测hashChange事件，然后js进行对应操作
        </Paragraph>
        {/* hash html代码 */}
        <a href="#/page1">page1</a> <a href="#/page2">page2</a>
        <div id="routeView">还未使用hash模式原生切换路由</div>
        <Title level={3}>使用history原生切换路由</Title>
        <a
          target="_blank"
          href="https://developer.mozilla.org/zh-CN/docs/Web/API/History_API"
        >
          History API -MDN
        </a>
        <Paragraph>
          pushState：增加一条新的历史记录 replaceState：替换当前的历史记录
          <li>
            HTML5引入了history.pushState和history.replaceState两个方法，可以改变url的path部分而不引起刷新。
          </li>
          popstate事件：
          <li>
            当活动历史记录条目更改时，将触发popstate事件。[...]
            popstate事件仅通过执行浏览器操作（例如单击后退按钮（或在JavaScript中调用history.back()、history.forward()、history.go()来触发
          </li>
          <Text code>
            window.history.pushState(null, null, "http://www.baidu.com")
          </Text>
          history和hash不同在于popstate事件在a标签点击中无法触发，所以要手动拦截并调用popstate函数。
          <br />
          {/* history html代码 */}
          <a href="/page3" className="link">
            page3
          </a>{' '}
          <a href="/page4" className="link">
            page4
          </a>
          <div id="routeViewHistory">还未使用history原生切换路由</div>
        </Paragraph>
        {/* history html代码 */}
        <Title level={2}>演示</Title>
        <Demo />
      </div>
    );
  };
}

export default QRLinkPage;
