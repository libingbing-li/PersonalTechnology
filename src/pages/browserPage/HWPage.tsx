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

// class Demo extends React.Component {
//   // 翻译  如果要在收起的时候改变点击按钮的文字，需要设置id并设置innerText
//   translateMsg = (index: number) => {
//     // 获取翻译文本div
//     // 在之前的项目中使用了Object.assign()
//     const msgT: any = document.querySelector(`#messageTranslation${index}`);
//     if (msgT) {
//       if (msgT.style.display === 'none') {
//         msgT.style.display = 'block';
//       } else {
//         msgT.style.display = 'none';
//       }
//       msgT.innerText = msgData[index].msgT;
//     }
//   };

//   render() {
//     return (
//       <div className={styles.demo}>
//         <div className={styles.title}>
//           消息流翻译+高亮文字
//         </div>
//         <div className={styles.description}>
//           翻译思路：<br />
//           <li>通过控制提前设置好的翻译div的display来达成，设置innerText属性而不是innerHTML，因为innerHTML会将给予的字符串强制转为小写。</li>
//           高亮文字思路：<br />
//           <li>dangerouslySetInnerHTML是React标签的一个属性</li>
//           <Text code>{"dangerouslySetInnerHTML={{ __html: htmlStr }}"}</Text><br />
//           <Text code>{"// htmlStr: <span style='color: #1F90E6 !important'>A</span>78"}</Text>
//           <li>需要注意的是，__html的值必须是确认净化的数据，否则可能遭受XXS攻击（在html页面注入恶意代码</li>
//           <a target='_blank' href="https://blog.csdn.net/yefan2222/article/details/7091863">XXS攻击</a>
//         </div>
//         <div
//           className={styles.main}
//           style={{
//             flexDirection: 'column',
//           }}
//         >
//           {/*  */}
//           {msgData.map((msg, index) => {
//             return (
//               <div className={style.msg} id={`message${index}`} key={index}>
//                 <div
//                   className={index % 2 === 0 ? style.msgText : style.msgTextMe}
//                 >
//                   <span dangerouslySetInnerHTML={{ __html: msg.msg }}></span>
//                   <div
//                     className={style.msgBtn}
//                     onClick={() => this.translateMsg(index)}
//                   >
//                     翻译
//                   </div>
//                 </div>
//                 <div
//                   className={style.msgT}
//                   id={`messageTranslation${index}`}
//                   style={{ display: 'none' }}
//                 ></div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     );
//   }
// }

class HWPage extends React.Component {
  render = () => {
    return (
      <div id="BackAlertPage">
        <Title>
          浏览器宽高和滚动
          <Tooltip title="点击跳转到github">
            <CodeOutlined style={{ marginLeft: '15px' }} />
          </Tooltip>
        </Title>
        <Paragraph>111</Paragraph>
        <Title level={2}>演示</Title>
        {/* <Demo /> */}
      </div>
    );
  };
}

export default HWPage;
