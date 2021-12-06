import React from 'react';
import { Layout, Switch, Table, Tooltip, Typography, Menu } from 'antd';
import { GithubOutlined, CodeOutlined } from '@ant-design/icons';
// import style from './styles/demo.less';
import { columns } from '../../data';
import VerifyCode from '@/common-components/VerifyCode';
import VerifyImage from '@/common-components/VerifyImage';
import { check } from 'prettier';

const { Header, Content, Sider } = Layout;
const { Title, Paragraph } = Typography;

class BackAlertPage extends React.Component {
  componentDidMount = () => {
    //刚刚进入A
    window.history.pushState(null, '', window.location.href);
    window.addEventListener('popstate', this.intercept);
  };
  // 拦截回退事件
  intercept = () => {
    console.log('jsPage-back-intercept');
    // if (...) {
    //   // ... 要做的其他操作
    // } else {
    //   // 手动返回
    // window.history.back();
    // 这里不可以直接back，会出bug，是因为jsPage页面会跳到本页面，造成循环bug
    // }
    // 移除事件
    window.removeEventListener('popstate', this.intercept);
  };

  render = () => {
    return (
      <div id="BackAlertPage">
        <Title>
          后退警告
          <Tooltip title="点击跳转到github">
            <CodeOutlined style={{ marginLeft: '15px' }} />
          </Tooltip>
        </Title>
        <Paragraph>
          当使用浏览器的后退按钮或者移动端物理后退键时，不直接后退，而是弹出一个警告，根据用户选择内容留在当前页面或是退出到上一个页面。
        </Paragraph>
        <Title level={2}>演示</Title>
        <Paragraph>
          使用浏览器后退或移动端物理后退键，后退本页面，你需要后退两次才能成功。
          <br />
          打开控制台console，当第一次后退时，会输出‘jsPage-back-intercept’。
        </Paragraph>
        <Title level={2}>思路</Title>
        <Paragraph>
          在由B页面进入A页面时添加一层历史记录，此时历史记录为B-A-A。
          <br />
          当用户强制后退时,由A退到A，此时历史记录为B-A，同时弹出弹窗询问是否确认后退，如果确认，执行js代码后退到页面B，如果不后退，再添加一层历史记录，历史记录为：B-A-A，那么当用户强制后退时，就会出现之前的情况。
          <br />
          在用户层面的表现：后退，弹出警告，取消，再次后退，再次弹出警告，确认后退，后退到B。
        </Paragraph>
        <Title level={2}>BUG</Title>
        <Paragraph>
          ios，一个使用了react-route的项目，部分无法使用本方法进行后退拦截：
          <ol>
            <li>
              在ios中, 只有部分页面(一级跳二级)出现了该bug,
              而二级跳三级则没有问题,排除了window.history.back出问题的可能性.
            </li>
            <li>
              接着,对跳转方式进行排查,由于该项目技术使用了react-route,对此不熟悉,所以没能及时确定.但对某个方式进行了二级到三级的替换,bug仍然存在,排除跳转方式出错
            </li>
            <li>
              到了历史记录,app.info历史记录后发现ios比安卓少一层,
              <b>故而跳二级页面后只有该二级页面一个历史记录</b>
              ,尚未找到bug出现原因,但找到了解决办法
            </li>
          </ol>
          解决：
          <li>初始化时判断机型是否是ios, 是的话就加一层index的历史记录。</li>
        </Paragraph>
      </div>
    );
  };
}

export default BackAlertPage;
