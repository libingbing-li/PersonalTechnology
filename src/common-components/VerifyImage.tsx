import React from 'react'; //react下
import { RightOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import style from './styles/verify.less';

const STATUS_LOADING = 0; // 还没有图片
const STATUS_READY = 1; // 图片渲染完成,可以开始滑动
const STATUS_MATCH = 2; // 图片位置匹配成功
const STATUS_ERROR = 3; // 图片位置匹配失败

// 随机绘制拼图块
function createClipPath(ctx: any, size = 100, styleIndex = 0) {
  // 0 1 决定 canvas.arc 顺逆时针绘图 0=false=顺 1=true=逆
  const styles = [
    [0, 0, 0, 0],
    [0, 0, 0, 1],
    [0, 0, 1, 0],
    [0, 0, 1, 1],
    [0, 1, 0, 0],
    [0, 1, 0, 1],
    [0, 1, 1, 0],
    [0, 1, 1, 1],
    [1, 0, 0, 0],
    [1, 0, 0, 1],
    [1, 0, 1, 0],
    [1, 0, 1, 1],
    [1, 1, 0, 0],
    [1, 1, 0, 1],
    [1, 1, 1, 0],
    [1, 1, 1, 1],
  ];
  const style = styles[styleIndex];

  const r = 0.1 * size; //拼图上圆片的半径
  ctx.save(); //保存此时的画布状态
  ctx.beginPath(); //开始绘图
  ctx.moveTo(r, r); //画笔达到坐标点(r, r)

  //left
  ctx.lineTo(r, 0.5 * size - r);
  // canvas.arc(x, y, r, sAngle, eAngle, counterclockwise)画竖着的半圆,顺/逆时针(根据style[0])
  ctx.arc(r, 0.5 * size - r, r, 1.5 * Math.PI, 0.5 * Math.PI, style[0]);
  ctx.lineTo(r, size - r);

  // bottom
  ctx.lineTo(0.5 * size - r, size - r);
  ctx.arc(0.5 * size, size - r, r, Math.PI, 0, style[1]);
  ctx.lineTo(size - r, size - r);

  // right
  ctx.lineTo(size - r, 0.5 * size + r);
  ctx.arc(size - r, 0.5 * size, r, 0.5 * Math.PI, 1.5 * Math.PI, style[2]);
  ctx.lineTo(size - r, r);

  // top
  ctx.lineTo(0.5 * size + r, r);
  ctx.arc(0.5 * size, r, r, 0, Math.PI, style[3]);
  ctx.lineTo(r, r);

  ctx.clip(); //canvas剪裁
  ctx.closePath(); //结束绘制路径
}

const defaultProps = {
  show: true, //是否展示
  imageUrl: '../assets/verifyImage.jpg', //拼图图片链接
  imageWidth: 250, //宽
  imageHeight: 150, //长
  fragmentSize: 40, //一个拼图块的大小
  onClose: () => {
    console.log('close');
  }, //关闭
  onReload: () => {
    console.log('reload');
  }, //重新加载一个新的拼图,用父组件给的方法
  onMatch: () => {
    console.log('match');
  }, //成功的回调
  onError: () => {
    console.log('error');
  }, //拼错的回调
};

interface IState {
  imageUrl: string;
  status: number; //图片当前的状态: 加载中,渲染完成,位置匹配成功/失败
  offsetX: number; //图片截取的x
  offsetY: number; //图片截取的y
  startX: number; //开始滑动的x  (左右滑动拼图)
  oldX: number; //固定坐标
  currX: number; //滑块当前的x
  showTips: boolean;
  isMoveable: boolean;
  tipsIndex: number;
}
class ImgVerify extends React.Component<typeof defaultProps> {
  // 默认props
  static defaultProps = defaultProps;
  state: IState = {
    imageUrl:
      'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=185932774,961636353&fm=26&gp=0.jpg',
    status: STATUS_LOADING, //图片当前的状态: 加载中,渲染完成,位置匹配成功/失败
    offsetX: 0, //图片截取的x
    offsetY: 0, //图片截取的y
    startX: 0, //开始滑动的x  (左右滑动拼图)
    oldX: 0, // 固定坐标
    currX: 0, //滑块当前的x
    showTips: false,
    isMoveable: false,
    tipsIndex: 0,
  };
  refs: any;

  componentWillMount = () => {
    this.renderImage();
  };

  componentWillReceiveProps = () => {
    this.onReload();
  };

  // 渲染
  renderImage = () => {
    // 初始化
    this.setState({ status: STATUS_LOADING });
    // 创建一个图片对象,用于canvas.context.drawImage()
    const objImage = new Image();
    // objImage.src = this.props.imageUrl;
    objImage.src = this.state.imageUrl;

    objImage.addEventListener('load', () => {
      const { imageWidth, imageHeight, fragmentSize } = this.props;
      // 获取对应canvas的ctx画笔
      const ctxShadow = this.refs.shadowCanvas.getContext('2d');
      const ctxFragment = this.refs.fragmentCanvas.getContext('2d');

      // 两个ctx都拥有同样的剪裁路径,也就是一样的拼图模块
      const styleIndex = Math.floor(Math.random() * 16); //16: 随机路径中16个选择
      createClipPath(ctxFragment, fragmentSize, styleIndex);
      createClipPath(ctxShadow, fragmentSize, styleIndex);

      // 随机生成剪裁图片的开始坐标
      // x轴有两个片段, y轴有一个片段
      const clipX = Math.floor(
        fragmentSize + (imageWidth - 2 * fragmentSize) * Math.random(),
      ); // 1-70
      const clipY = Math.floor((imageHeight - fragmentSize) * Math.random());

      // fragmentCanvas绘制 被剪裁 的部分
      //drawImage objImage: 用来截图的图像,clipXY: obj上截取的坐标, 要剪裁的宽高, 在画布上放置剪裁好的图形的位置, 要使用的宽高(伸展缩小图像)
      ctxFragment.drawImage(
        objImage,
        clipX * (objImage.width / 250),
        clipY * (objImage.height / 150),
        fragmentSize * (objImage.width / 250),
        fragmentSize * (objImage.height / 150),
        0,
        0,
        fragmentSize,
        fragmentSize,
      );

      // 让阴影canvas带上阴影效果
      ctxShadow.fillStyle = 'rgba(0,0,0,0.6)';
      ctxShadow.fill(); //给canvas填充颜色

      ctxFragment.strokeStyle = '#eee';
      ctxFragment.lineWidth = 5;
      ctxFragment.stroke();

      //恢复画布状态
      ctxFragment.restore();
      ctxShadow.restore();

      // 设置剪裁小块的位置和修改图片加载状态
      this.setState({
        offsetX: clipX,
        offsetY: clipY,
        status: STATUS_READY,
      });
    });
  };

  // 刷新验证
  onReload = () => {
    if (
      this.state.status !== STATUS_READY &&
      this.state.status !== STATUS_MATCH
    ) {
      return;
    }
    const ctxShadow = this.refs.shadowCanvas.getContext('2d');
    const ctxFragment = this.refs.fragmentCanvas.getContext('2d');

    // 清空画布
    ctxShadow.clearRect(0, 0, this.props.fragmentSize, this.props.fragmentSize);
    ctxFragment.clearRect(
      0,
      0,
      this.props.fragmentSize,
      this.props.fragmentSize,
    );

    // setState(updater, [callback]);
    this.setState(
      {
        isMoveable: false,
        offsetX: 0, //图片截取的x
        offsetY: 0, //图片截取的y
        startX: 0, // 开始滑动的 x
        oldX: 0, //固定坐标
        currX: 0, // 滑块当前 x,
        status: STATUS_LOADING,
      },
      this.renderImage,
    );
  };

  // 记录最开始滑动(按住按钮的时候)的x
  onMoveStart = (e: any) => {
    if (this.state.status !== STATUS_READY) {
      return;
    }
    console.log(e);
    // 记录滑动开始的绝对坐标
    this.setState({ isMoveable: true, startX: e.changedTouches[0].clientX });
  };

  // 只要鼠标(手指)仍然在元素上,就随时更新当前的x坐标
  onMoving = (e: any) => {
    // 图片未加载完成/当前不允许滑动
    if (this.state.status !== STATUS_READY || !this.state.isMoveable) {
      return;
    }

    const distance = e.changedTouches[0].clientX - this.state.startX; //clientX: 鼠标相对于当前窗口的x坐标
    let currX = this.state.oldX + distance;

    const minX = 0;
    const maxX = this.props.imageWidth - this.props.fragmentSize;
    currX = currX < minX ? 0 : currX > maxX ? maxX : currX;
    this.setState({ currX });
  };

  onMoveEnd = () => {
    if (this.state.status !== STATUS_READY || !this.state.isMoveable) {
      return;
    }
    // 将旧的固定坐标更新
    this.setState((state: any) => {
      return {
        isMoveable: false,
        oldX: state.currX,
      };
    });

    // 判断拼图是否成功 abs: 返回数的绝对值
    const isMatch = Math.abs(this.state.currX - this.state.offsetX) < 5;
    if (isMatch) {
      this.setState((state: any) => {
        return {
          status: STATUS_MATCH,
          currX: state.offsetX,
        };
      });
      setTimeout(this.props.onMatch, 1000);
    } else {
      this.setState((state: any) => {
        return {
          status: STATUS_ERROR,
        };
      }, this.onReset);
      // this.props.onError();
    }
  };

  // 重来
  onReset = () => {
    const timer = setTimeout(() => {
      this.setState({
        oldX: 0,
        currX: 0,
        status: STATUS_READY,
      });
      clearTimeout(timer);
      this.onReload();
    }, 500);
  };

  render() {
    const { fragmentSize, show } = this.props;
    const { imageUrl, offsetX, offsetY, currX, status } = this.state;

    return (
      <div
        className={style.imageCode}
        style={{ display: show ? 'flex' : 'none' }}
      >
        <div className={style.imageCover} onClick={this.props.onClose}></div>
        <div className={style.imageModal}>
          {/* 图片打底 */}
          <div
            className={style.imageContainer}
            style={{
              backgroundImage: `url("${imageUrl}")`,
              backgroundSize: '250px 150px',
            }}
          >
            {/* 拼图底部的阴影 */}
            <canvas
              ref="shadowCanvas"
              className={style.canvas}
              width={fragmentSize}
              height={fragmentSize}
              style={{
                left: offsetX + 'px',
                top: offsetY + 'px',
              }}
            ></canvas>
            {/* 用于移动的拼图 */}
            <canvas
              ref="fragmentCanvas"
              className={style.canvas}
              width={fragmentSize}
              height={fragmentSize}
              style={{
                left: currX + 'px',
                top: offsetY + 'px',
              }}
            ></canvas>
          </div>
          {/* 拉动条 */}
          <div
            className={
              status == STATUS_MATCH
                ? `${style.sliderWrpper} ${style.sliderWrpperSuccess}`
                : `${style.sliderWrpper}`
            }
            onTouchMove={this.onMoving} //移动到元素上触发
            // onTouchEnd={this.onMoveEnd} //移出元素时触发
          >
            <div className={style.sliderBar}>
              <CheckOutlined
                style={{
                  display: status == STATUS_MATCH ? 'inline' : 'none',
                  color: '#00d4b2',
                  fontWeight: 700,
                  marginRight: '10px',
                }}
              />
              {status == STATUS_MATCH
                ? '验证成功,发送验证码'
                : '完成拼图,发送验证码'}
            </div>
            <div
              className={style.sliderButtonBox}
              style={{
                display: status == STATUS_MATCH ? 'none' : 'flex',
                width: currX + 5 + 'px',
                background: status == STATUS_ERROR ? '#ffdfdf' : '#cce6ff',
                border:
                  status == STATUS_ERROR
                    ? 'solid 1px #ff686d'
                    : 'solid 1px #0092fc',
              }}
            >
              <div
                className={style.sliderButton}
                onTouchStart={this.onMoveStart} //按下鼠标触发
                onTouchEnd={this.onMoveEnd} //松开鼠标触发
                style={{
                  left: currX - 2 + 'px',
                  background: status == STATUS_ERROR ? '#ff8186' : '#fff',
                }}
              >
                <RightOutlined
                  style={{
                    fontSize: '20px',
                    fontWeight: 700,
                    display: status == STATUS_ERROR ? 'none' : 'inline',
                  }}
                />
                <CloseOutlined
                  style={{
                    color: '#ff4f56',
                    fontSize: '20px',
                    fontWeight: 700,
                    display: status == STATUS_ERROR ? 'inline' : 'none',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ImgVerify;

// 使用
/* 
<ImgVerify
  show={this.state.verifyShow}  //是否显示
  onClose={this.verifyClose} //关闭
  onMatch={this.verifySuccess} //拼图成功后的回调函数
></ImgVerify>

*/
