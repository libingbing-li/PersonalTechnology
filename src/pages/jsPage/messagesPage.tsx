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
const { Title, Paragraph } = Typography;

const msgData = [
  {
    msg: '这是一条消息。',
    msgT: 'This is a message.',
  },
  {
    msg: '接下来开始测试这个消息页面',
    msgT: 'Next, start testing this message page.',
  },
  {
    msg: '这是他人发送，单数。',
    msgT: 'This is sent by someone else, singular.',
  },
  {
    msg: '这是自己发送，双数。',
    msgT: 'This is sent by myself, even numbers.',
  },
  {
    msg: '你好啊，今天怎么样？',
    msgT: 'Hello, how are you today?',
  },
  {
    msg: '今天我在晚上写代码，还不错。',
    msgT: "Today I'm coding at night and it's not bad.",
  },
  {
    msg: '那太好了，你喜欢代码吗？',
    msgT: "That's great, do you like code?",
  },
  {
    msg: '对，我爱它^^',
    msgT: 'Yep, I love it^^',
  },
];

class Demo extends React.Component {
  // 翻译  如果要在收起的时候改变点击按钮的文字，需要设置id并设置innerText
  translateMsg = (index: number) => {
    // 获取翻译文本div
    // 在之前的项目中使用了Object.assign()
    const msgT: any = document.querySelector(`#messageTranslation${index}`);
    if (msgT) {
      if (msgT.style.display === 'none') {
        msgT.style.display = 'block';
      } else {
        msgT.style.display = 'none';
      }
      msgT.innerText = msgData[index].msgT;
    }
  };

  render() {
    return (
      <div className={styles.demo}>
        <div className={styles.title}>
          {/* <Tooltip title="点击跳转到简书教程">
              <a target="_blank" href="https://www.jianshu.com/p/92d5a778d964">
                <CodeOutlined style={{ marginLeft: '15px' }} />
              </a>
            </Tooltip> */}
        </div>
        <div className={styles.description}></div>
        <div
          className={styles.main}
          style={{
            height: '300px',
            flexDirection: 'column',
            overflowY: 'scroll',
          }}
        >
          {/*  */}
          {msgData.map((msg, index) => {
            return (
              <div className={style.msg} id={`message${index}`} key={index}>
                <div
                  className={index % 2 === 0 ? style.msgText : style.msgTextMe}
                >
                  {msg.msg}
                  <div
                    className={style.msgBtn}
                    onClick={() => this.translateMsg(index)}
                  >
                    翻译
                  </div>
                </div>
                <div
                  className={style.msgT}
                  id={`messageTranslation${index}`}
                  style={{ display: 'none' }}
                ></div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

class MessagesPage extends React.Component {
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
          消息流相关
          <Tooltip title="点击跳转到github">
            <CodeOutlined style={{ marginLeft: '15px' }} />
          </Tooltip>
        </Title>
        <Paragraph>
          <li>消息下方出现div——使用场景：消息转文字、消息翻译等</li>
          <li>
            字符串作为html渲染——使用场景：后台返回带有html的字符串，例如搜索聊天记录返回的结果将关键字高亮
          </li>
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

export default MessagesPage;
