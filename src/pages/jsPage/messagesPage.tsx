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
    msg: "今天我在晚上写<span style='color: #1F90E6 !important'>代码</span>，还不错。",
    msgT: "Today I'm coding at night and it's not bad.",
  },
  {
    msg: "那太好了，你喜欢<span style='color: #1F90E6 !important'>代码</span>吗？",
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
        <div className={styles.title}>消息流翻译+高亮文字</div>
        <div className={styles.description}>
          翻译思路：
          <br />
          <li>
            通过控制提前设置好的翻译div的display来达成，设置innerText属性而不是innerHTML，因为innerHTML会将给予的字符串强制转为小写。
          </li>
          高亮文字思路：
          <br />
          <li>dangerouslySetInnerHTML是React标签的一个属性</li>
          <Text code>{'dangerouslySetInnerHTML={{ __html: htmlStr }}'}</Text>
          <br />
          <Text code>
            {"// htmlStr: <span style='color: #1F90E6 !important'>A</span>78"}
          </Text>
          <li>
            需要注意的是，__html的值必须是确认净化的数据，否则可能遭受XXS攻击（在html页面注入恶意代码
          </li>
          <a
            target="_blank"
            href="https://blog.csdn.net/yefan2222/article/details/7091863"
          >
            XXS攻击
          </a>
        </div>
        <div
          className={styles.main}
          style={{
            flexDirection: 'column',
          }}
        >
          {/*  */}
          {msgData.map((msg, index) => {
            return (
              <div className={style.msg} id={`message${index}`} key={index}>
                <div
                  className={index % 2 === 0 ? style.msgText : style.msgTextMe}
                >
                  <span dangerouslySetInnerHTML={{ __html: msg.msg }}></span>
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
  render = () => {
    return (
      <div id="BackAlertPage">
        <Title>
          消息流相关
          <Tooltip title="点击跳转到github">
            <CodeOutlined style={{ marginLeft: '15px' }}>
              <a href=""></a>
            </CodeOutlined>
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
        <Title level={2}>BUG</Title>
        <Paragraph>
          在一个react项目中，无法直接 div.style.display='none';
          使用了Object.assign函数来进行样式的修改，不清楚原因。
        </Paragraph>
      </div>
    );
  };
}

export default MessagesPage;
