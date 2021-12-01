import React from 'react';

const defaultProps = {
  style: {},
  scrollBox: null,
  fw: document.body.clientWidth,
  fh: document.body.clientHeight,
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
  scrollBox?: any;
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
        : this.props.fw -
          Number(index.style.right.substring(0, index.style.right.length - 2)) -
          dw;

    let top =
      index.style.top !== 'auto'
        ? Number(index.style.top.substring(0, index.style.top.length - 2))
        : this.props.fh -
          Number(
            index.style.bottom.substring(0, index.style.bottom.length - 2),
          ) -
          dh;

    // console.log('left: ' + left + 'top: ' + top);

    // pc端鼠标滑动
    index.addEventListener('mousedown', (e: any) => {
      indexX = e.clientX; //记录手指第一次触碰屏幕的坐标点
      indexY = e.clientY;
      if (this.props.scrollBox) {
        this.props.scrollBox.style.overflowY = 'hidden'; //针对本项目，在移动盒子的时候禁止容器滚动
      }
      // console.log('MoveBox mousedown indexX: ' + indexX + 'indexY: ' + indexY);
      const mousemoveFun = (e: any) => {
        // 记录移动的距离
        let x = e.clientX - indexX;
        let y = e.clientY - indexY;
        indexX = e.clientX;
        indexY = e.clientY;
        left = left + x;
        top = top + y;
        if (left < this.props.minLeft) {
          left = this.props.minLeft;
        } else if (this.props.fw - left - dw < this.props.minRight) {
          left = this.props.fw - dw - this.props.minRight;
        }
        if (top < this.props.minTop) {
          top = this.props.minTop;
        } else if (this.props.fh - top - dh < this.props.minBottom) {
          top = this.props.fh - dh - this.props.minBottom;
        }
        index.style.left = left + 'px';
        index.style.top = top + 'px';

        // console.log(
        //   'MoveBox touchmove x:' +
        //     x +
        //     'y: ' +
        //     y +
        //     'left: ' +
        //     left +
        //     'top: ' +
        //     top,
        // );
      };
      const body = document.querySelector('body');
      body?.addEventListener('mousemove', mousemoveFun);
      const mouseupFun = (e: any) => {
        let x = e.clientX - indexX;
        let y = e.clientY - indexY;
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
          } else if (this.props.fw - left - dw < this.props.minRight) {
            left = this.props.fw - dw - this.props.minRight;
          }
          if (top < this.props.minTop) {
            top = this.props.minTop;
          } else if (this.props.fh - top - dh < this.props.minBottom) {
            top = this.props.fh - dh - this.props.minBottom;
          }
        } else {
          // 贴边
          // 左右判断
          if (this.props.isRight && this.props.isLeft) {
            // 左右就判断当前倾向哪边
            if (e.changedTouches[0].clientX < this.props.fw / 2) {
              left = this.props.minLeft;
            } else {
              left = this.props.fw - dw - this.props.minRight;
            }
          } else if (this.props.isLeft) {
            left = this.props.minLeft;
          } else if (this.props.isRight) {
            left = this.props.fw - dw - this.props.minRight;
          }
          // 上下判断
          if (this.props.isTop && this.props.isBottom) {
            // 上下就判断当前倾向哪边
            if (e.changedTouches[0].clientY < this.props.fh / 2) {
              top = this.props.minTop;
            } else {
              top = this.props.fh - dh - this.props.minBottom;
            }
          } else if (this.props.isTop) {
            top = this.props.minTop;
          } else if (this.props.isBottom) {
            top = this.props.fh - dh - this.props.minBottom;
          }
        }
        index.style.left = left + 'px';
        index.style.top = top + 'px';

        if (this.props.scrollBox) {
          this.props.scrollBox.style.overflowY = 'scroll'; //针对本项目，在移动盒子结束的时候恢复容器滚动
        }
        // console.log('MoveBox mouseup');
        // 清除事件
        body?.removeEventListener('mousemove', mousemoveFun);
        body?.removeEventListener('mouseu', mouseupFun);
      };
      body?.addEventListener('mouseup', mouseupFun);
    });

    // 移动端手指滑动
    index.addEventListener('touchstart', (e: any) => {
      indexX = e.changedTouches[0].clientX; //记录手指第一次触碰屏幕的坐标点
      indexY = e.changedTouches[0].clientY;
      if (this.props.scrollBox) {
        this.props.scrollBox.style.overflowY = 'hidden'; //针对本项目，在移动盒子的时候禁止容器滚动
      }
      // console.log('MoveBox touchstart indexX: ' + indexX + 'indexY: ' + indexY);
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
      } else if (this.props.fw - left - dw < this.props.minRight) {
        left = this.props.fw - dw - this.props.minRight;
      }
      if (top < this.props.minTop) {
        top = this.props.minTop;
      } else if (this.props.fh - top - dh < this.props.minBottom) {
        top = this.props.fh - dh - this.props.minBottom;
      }
      index.style.left = left + 'px';
      index.style.top = top + 'px';

      // console.log(
      //   'MoveBox touchmove x:' +
      //     x +
      //     'y: ' +
      //     y +
      //     'left: ' +
      //     left +
      //     'top: ' +
      //     top,
      // );
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
        } else if (this.props.fw - left - dw < this.props.minRight) {
          left = this.props.fw - dw - this.props.minRight;
        }
        if (top < this.props.minTop) {
          top = this.props.minTop;
        } else if (this.props.fh - top - dh < this.props.minBottom) {
          top = this.props.fh - dh - this.props.minBottom;
        }
      } else {
        // 贴边
        // 左右判断
        if (this.props.isRight && this.props.isLeft) {
          // 左右就判断当前倾向哪边
          if (e.changedTouches[0].clientX < this.props.fw / 2) {
            left = this.props.minLeft;
          } else {
            left = this.props.fw - dw - this.props.minRight;
          }
        } else if (this.props.isLeft) {
          left = this.props.minLeft;
        } else if (this.props.isRight) {
          left = this.props.fw - dw - this.props.minRight;
        }
        // 上下判断
        if (this.props.isTop && this.props.isBottom) {
          // 上下就判断当前倾向哪边
          if (e.changedTouches[0].clientY < this.props.fh / 2) {
            top = this.props.minTop;
          } else {
            top = this.props.fh - dh - this.props.minBottom;
          }
        } else if (this.props.isTop) {
          top = this.props.minTop;
        } else if (this.props.isBottom) {
          top = this.props.fh - dh - this.props.minBottom;
        }
      }
      index.style.left = left + 'px';
      index.style.top = top + 'px';

      if (this.props.scrollBox) {
        this.props.scrollBox.style.overflowY = 'scroll'; //针对本项目，在移动盒子结束的时候恢复容器滚动
      }
      // console.log('MoveBox touchend');
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
        style={{
          ...this.props.style,
          position: 'absolute',
          top: `${this.props.top}`,
          left: `${this.props.left}`,
          bottom: `${this.props.bottom}`,
          right: `${this.props.right}`,
        }}
      >
        {this.props.children}
      </div>
    );
  }
}

export default MoveBox;

/* 
组件功能: 移动这个元素并可以进行上下左右(选择其一)的贴边或不贴边(默认)
*/
