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
  render = () => {
    return (
      <div id="QRLinkPage">
        <Title>
          二维码展示+链接跳转
          <Tooltip title="点击跳转到github">
            <CodeOutlined style={{ marginLeft: '15px' }} />
          </Tooltip>
        </Title>
        <Paragraph>
          <ul>
            <li>
              全连接跳转：window.location.href =
              'https://你的url'（在移动端跳转到默认浏览器打开页面）
            </li>
            <li>iframe标签，参数为需要跳转的链接。</li>
            <li>二维码展示</li>
          </ul>
        </Paragraph>
        <Title level={2}>演示</Title>
        <Demo />
      </div>
    );
  };
}

export default QRLinkPage;
