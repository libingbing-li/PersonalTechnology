import React from 'react';
import style from './styles/verify.less';

const defaultProps = {
  getCodeStr: (data: string[]) => console.log(...data), //用于外部获取当前验证码
};

interface IState {
  length: number; //随机字符的个数，3-5
  data: string[];
  rotate: number[];
  fz: number[];
  color: number[][];
}
class VCharacter extends React.Component<typeof defaultProps> {
  static defaultProps = defaultProps;
  state: IState = {
    ...this.initState(),
  };
  initState() {
    let length = Math.floor(Math.random() * 3 + 3); // 3-5
    // 获取length数量的颜色数组 rgb(0,0,0)
    let color: number[][] = [];
    for (let i = 0; i < length; i++) {
      color.push(this.getRandomArr(0, 200, 3));
    }
    return {
      length,
      data: this.getRandomCode(length), //ASCII码组成的字符  48-57: 0-9, 65-90: A-Z  97-122: a-z
      rotate: this.getRandomArr(-60, 60, length), //旋转角度
      // fz: this.getRandomArr(13, 20, length),//字体大小
      fz: this.getRandomArr(35, 50, length), //字体大小
      color, //字体颜色(每个字体的颜色有三个数值)
    };
  }

  componentDidMount = () => {
    this.canvas();
  };

  getRandomCode(length: number): string[] {
    //48-59: 0-9, 65-90: A-Z  97-122: a-z
    let arr: string[] = [];
    for (let i = 0; i < length; i++) {
      let choose = Math.floor(Math.random() * 3 + 1); // 1-3
      let ascii = 0;
      switch (choose) {
        case 1:
          ascii = Math.floor(Math.random() * 10 + 48);
        case 2:
          ascii = Math.floor(Math.random() * 26 + 65);
        case 3:
          ascii = Math.floor(Math.random() * 26 + 97);
      }
      arr.push(String.fromCharCode(ascii));
    }
    this.props.getCodeStr(arr);
    return arr;
  }

  //返回一个含有num个成员的,数值区间在min和max之间的数字数组
  getRandomArr(min: number, max: number, length: number): number[] {
    let arr: number[] = [];
    for (let i = 0; i < length; i++) {
      arr.push(Math.floor(Math.random() * (max - min + 1) + min));
    }
    return arr;
  }

  // canvas生成黑线
  canvas() {
    const getRandom = (min: number, max: number): number => {
      return Math.floor(Math.random() * (max - min + 1) + min);
    };
    const canvas: any = document.getElementById('bg');
    if (canvas) {
      canvas.height = canvas.height; //用于清空画布
      let ctx = canvas.getContext('2d'); //创建context对象
      // 预设为7条线
      for (let i = 0; i < 7; i++) {
        ctx.strokeStyle = `rgb(${this.getRandomArr(10, 100, 4).toString()})`; //线条颜色
        ctx.moveTo(getRandom(0, 200), getRandom(0, 100)); //开始坐标
        ctx.lineTo(getRandom(0, 200), getRandom(0, 100)); //结束坐标
        ctx.stroke();
      }
    }
  }

  render() {
    const { rotate, fz, color } = this.state;
    return (
      <div
        className={style.verifycode}
        onClick={() => {
          this.setState({ ...this.initState() });
          this.canvas();
        }}
      >
        {/* 生成黑线 */}
        <canvas id="bg" className={style.bg} width="200" height="100"></canvas>
        {/* 生成字符 */}
        {this.state.data.map((v, i) => (
          <div
            key={i}
            className="itemStr"
            style={{
              transform: `rotate(${rotate[i]}deg)`,
              fontSize: `${fz[i]}px`,
              color: `rgb(${color[i].toString()})`,
            }}
          >
            {/* String.fromCharCode:通过ascii码获取字符串 A-Z : 0-9 : a-z */}
            {v}
          </div>
        ))}
      </div>
    );
  }
}

export default VCharacter;

/*
随机显示四个不规律的字符, 正确输入字符即成功验证
*/
