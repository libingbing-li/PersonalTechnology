import React from 'react';

const defaultProps = {
  onClick: () => {},
  cancel: false,
  style: {},
  fx: document.body.clientWidth,
  fy: document.body.clientHeight,
  top: '0px',
  left: '0px',
  bottom: 'auto',
  right: 'auto',
  isTop: false,
  isBottom: false,
  isLeft: false,
  isRight: false,
  minTop: 0,
  minBottom: 0,
  minLeft: 0,
  minRight: 0,
};

type IProps = {
  id: string;
  scrollBox: any;
} & Partial<typeof defaultProps>; //等同于上述注释的部分

class MoveBox extends React.Component<IProps & typeof defaultProps> {
  static defaultProps = defaultProps;

  componentDidMount = () => {
    // 移动元素的宽高
    const dw: any = document.querySelector(
      `#moveBox-${this.props.id}`,
    )?.clientWidth;
    const dh: any = document.querySelector(
      `#moveBox-${this.props.id}`,
    )?.clientHeight;

    // 获取手指第一次的坐标
    const index: any = document.querySelector(`#moveBox-${this.props.id}`);
    let indexX = 0;
    let indexY = 0;

    // 获取当前的left和top
    let left =
      index.style.left !== 'auto'
        ? Number(index.style.left.substring(0, index.style.left.length - 2))
        : this.props.fx -
          Number(index.style.right.substring(0, index.style.right.length - 2)) -
          dw;

    let top =
      index.style.top !== 'auto'
        ? Number(index.style.top.substring(0, index.style.top.length - 2))
        : this.props.fy -
          Number(
            index.style.bottom.substring(0, index.style.bottom.length - 2),
          ) -
          dh;

    console.log('left: ' + left + 'top: ' + top);
    index.addEventListener('touchstart', (e: any) => {
      indexX = e.changedTouches[0].clientX; //记录手指第一次触碰屏幕的坐标点
      indexY = e.changedTouches[0].clientY;
      if (this.props.scrollBox) {
        this.props.scrollBox.style.overflowY = 'hidden'; //针对本项目，在移动盒子的时候禁止容器滚动
      }
      console.log('MoveBox touchstart indexX: ' + indexX + 'indexY: ' + indexY);
    });
    index.addEventListener('touchmove', (e: any) => {
      // 记录移动的距离
      let x = e.changedTouches[0].clientX - indexX;
      let y = e.changedTouches[0].clientY - indexY;
      indexX = e.changedTouches[0].clientX;
      indexY = e.changedTouches[0].clientY;
      left = left + x;
      top = top + y;
      if (left < this.props.minLeft) {
        left = this.props.minLeft;
      } else if (this.props.fx - left - dw < this.props.minRight) {
        left = this.props.fx - dw - this.props.minRight;
      }
      if (top < this.props.minTop) {
        top = this.props.minTop;
      } else if (this.props.fy - top - dh < this.props.minBottom) {
        top = this.props.fy - dh - this.props.minBottom;
      }
      index.style.left = left + 'px';
      index.style.top = top + 'px';

      console.log(
        'MoveBox touchmove x:' +
          x +
          'y: ' +
          y +
          'left: ' +
          left +
          'top: ' +
          top,
      );
    });
    index.addEventListener('touchend', (e: any) => {
      let x = e.changedTouches[0].clientX - indexX;
      let y = e.changedTouches[0].clientY - indexY;
      left = left + x;
      top = top + y;
      // 没有贴边
      if (
        !this.props.isTop &&
        !this.props.isBottom &&
        !this.props.isLeft &&
        !this.props.isRight
      ) {
        if (left < this.props.minLeft) {
          left = this.props.minLeft;
        } else if (this.props.fx - left - dw < this.props.minRight) {
          left = this.props.fx - dw - this.props.minRight;
        }
        if (top < this.props.minTop) {
          top = this.props.minTop;
        } else if (this.props.fy - top - dh < this.props.minBottom) {
          top = this.props.fy - dh - this.props.minBottom;
        }
      } else {
        // 贴边
        // 左右判断
        if (this.props.isRight && this.props.isLeft) {
          // 左右就判断当前倾向哪边
          if (e.changedTouches[0].clientX < this.props.fx / 2) {
            left = this.props.minLeft;
          } else {
            left = this.props.fx - dw - this.props.minRight;
          }
        } else if (this.props.isLeft) {
          left = this.props.minLeft;
        } else if (this.props.isRight) {
          left = this.props.fx - dw - this.props.minRight;
        }
        // 上下判断
        if (this.props.isTop && this.props.isBottom) {
          // 上下就判断当前倾向哪边
          if (e.changedTouches[0].clientY < this.props.fy / 2) {
            top = this.props.minTop;
          } else {
            top = this.props.fy - dh - this.props.minBottom;
          }
        } else if (this.props.isTop) {
          top = this.props.minTop;
        } else if (this.props.isBottom) {
          top = this.props.fy - dh - this.props.minBottom;
        }
      }
      index.style.left = left + 'px';
      index.style.top = top + 'px';

      if (this.props.scrollBox) {
        this.props.scrollBox.style.overflowY = 'scroll'; //针对本项目，在移动盒子结束的时候恢复容器滚动
      }
      console.log('MoveBox touchend');
    });
  };

  cancel = () => {
    let move: any = document.querySelector(`#moveBox-${this.props.id}`);
    if (move) {
      move.style.display = 'none';
    }
  };

  render() {
    return (
      <div
        id={`moveBox-${this.props.id}`}
        onClick={this.props.onClick}
        style={{
          ...this.props.style,
          position: 'absolute',
          top: `${this.props.top}`,
          left: `${this.props.left}`,
          bottom: `${this.props.bottom}`,
          right: `${this.props.right}`,
        }}
      >
        <span
          style={{
            display: this.props.cancel ? 'block' : 'none',
            position: 'absolute',
            width: '5px',
            height: '5px',
            borderRadius: '2.5px',
            background: '#ccc',
            fontSize: '10px',
          }}
          onClick={this.cancel}
        >
          x
        </span>
        {this.props.children}
      </div>
    );
  }
}

export default MoveBox;

/* 
组件功能: 移动这个元素并可以进行上下左右(选择其一)的贴边或不贴边(默认)
*/