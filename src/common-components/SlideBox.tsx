import React from 'react';

const defaultProps = {
  style: {},
  slideDistance: 50,
  slideLeft: (e?: any, payload?: any) => {
    console.log('slideLeft');
  },
  slideRight: (e?: any, payload?: any) => {
    console.log('slideRight');
  },
  slideTop: (e?: any, payload?: any) => {
    console.log('slideTop');
  },
  slideBottom: (e?: any, payload?: any) => {
    console.log('slideBottom');
  },
};
interface IProps {
  id: string;
  scrollBox?: any;
  // style: object;
  // slideLeft?: (e?: any, payload?: any) => void;
  // slideRight?: (e?: any, payload?: any) => void;
  // slideTop?: (e?: any, payload?: any) => void;
  // slideBottom?: (e?: any, payload?: any) => void;
  payload?: any; //传递过来的需要在slide函数中使用的参数
  // slideDistance: number; //滑动事件判定距离
}

// type IProps = {
//   id: string;
//   // style: object;
//   // slideLeft?: (e?: any, payload?: any) => void;
//   // slideRight?: (e?: any, payload?: any) => void;
//   // slideTop?: (e?: any, payload?: any) => void;
//   // slideBottom?: (e?: any, payload?: any) => void;
//   payload?: any; //传递过来的需要在slide函数中使用的参数
//   slideDistance: number; //滑动事件判定距离
// }& Partial<typeof defaultProps>;

class SlideBox extends React.Component<IProps & typeof defaultProps> {
  static defaultProps = defaultProps;
  componentDidMount = () => {
    // 获取到需要
    const index: any = document.querySelector(`#slideBox-${this.props.id}`);
    let indexX = 0;
    let indexY = 0;
    // pc端鼠标
    index?.addEventListener('mousedown', (e: any) => {
      indexX = e.clientX; //记录手指第一次触碰屏幕的坐标点
      indexY = e.clientY;

      if (this.props.scrollBox) {
        this.props.scrollBox.style.overflowY = 'hidden'; //针对本项目，在移动盒子的时候禁止容器滚动
      }
    });
    index?.addEventListener('mouseup', (e: any) => {
      if (
        e.clientX - indexX > this.props.slideDistance &&
        this.props.slideLeft
      ) {
        // 向左滑 从左到右
        if (this.props.payload) {
          this.props.slideLeft(e, this.props.payload);
          return;
        }
        this.props.slideLeft(e);
      } else if (
        indexX - e.clientX > this.props.slideDistance &&
        this.props.slideRight
      ) {
        // 向右滑 从右到左
        if (this.props.payload) {
          this.props.slideRight(e, this.props.payload);
          return;
        }
        this.props.slideRight(e);
      } else if (
        e.clientY - indexY > this.props.slideDistance &&
        this.props.slideBottom
      ) {
        // 下拉
        if (this.props.payload) {
          this.props.slideBottom(e, this.props.payload);
          return;
        }
        this.props.slideBottom(e);
      } else if (
        indexY - e.clientY > this.props.slideDistance &&
        this.props.slideTop
      ) {
        // 上拉
        if (this.props.payload) {
          this.props.slideTop(e, this.props.payload);
          return;
        }
        this.props.slideTop(e);
      }
      if (this.props.scrollBox) {
        this.props.scrollBox.style.overflowY = 'scroll'; //针对本项目，在移动盒子结束的时候恢复容器滚动
      }
    });

    // 移动端手指
    index?.addEventListener('touchstart', (e: any) => {
      indexX = e.changedTouches[0].clientX; //记录手指第一次触碰屏幕的坐标点
      indexY = e.changedTouches[0].clientY;

      if (this.props.scrollBox) {
        this.props.scrollBox.style.overflowY = 'hidden'; //针对本项目，在移动盒子的时候禁止容器滚动
      }
    });
    index?.addEventListener('touchend', (e: any) => {
      if (
        e.changedTouches[0].clientX - indexX > this.props.slideDistance &&
        this.props.slideLeft
      ) {
        // 向左滑 从左到右
        if (this.props.payload) {
          this.props.slideLeft(e, this.props.payload);
          return;
        }
        this.props.slideLeft(e);
      } else if (
        indexX - e.changedTouches[0].clientX > this.props.slideDistance &&
        this.props.slideRight
      ) {
        // 向右滑 从右到左
        if (this.props.payload) {
          this.props.slideRight(e, this.props.payload);
          return;
        }
        this.props.slideRight(e);
      } else if (
        e.changedTouches[0].clientY - indexY > this.props.slideDistance &&
        this.props.slideBottom
      ) {
        // 下拉
        if (this.props.payload) {
          this.props.slideBottom(e, this.props.payload);
          return;
        }
        this.props.slideBottom(e);
      } else if (
        indexY - e.changedTouches[0].clientY > this.props.slideDistance &&
        this.props.slideTop
      ) {
        // 上拉
        if (this.props.payload) {
          this.props.slideTop(e, this.props.payload);
          return;
        }
        this.props.slideTop(e);
      }
      if (this.props.scrollBox) {
        this.props.scrollBox.style.overflowY = 'scroll'; //针对本项目，在移动盒子结束的时候恢复容器滚动
      }
    });
  };

  render() {
    return (
      <div id={`slideBox-${this.props.id}`} style={{ ...this.props.style }}>
        {this.props.children}
      </div>
    );
  }
}

export default SlideBox;

/*
组件功能: 获取上下左右滑动事件并执行对应代码;
*/
