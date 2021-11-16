/*
组件功能：
确认操作的弹出框+按钮+遮罩层
*/

import React from 'react';
import Confirm from './Confirm';
import style from './styles/Confirm.less';
import { months } from 'moment';

const defaultProps = {
  confirm: () => {
    console.log('confirm');
  },
  cancel: () => {
    console.log('cancel');
  },
  confirmStr: '确认',
  cancelStr: '取消',
  txt: '是否进行操作',
  closeIcon: false,
  close: () => {},
  btnStr: '点击显示选择框',
};
type IProps = {
  id: string;
  style?: any;
} & Partial<typeof defaultProps>; //等同于上述注释的部分

interface IState {
  back: string;
}

class ConfirmBtn extends React.Component<IProps & typeof defaultProps> {
  static defaultProps = defaultProps;
  state: IState = {
    back: 'none',
  };
  componentDidMount = () => {};

  confirmShow = () => {
    const con: any = document.querySelector(`#confirm-btn-${this.props.id}`);
    if (con) {
      if (con.style.display === 'none') {
        con.style.display = 'flex';
        this.setState({
          back: 'block',
        });
      } else {
        con.style.display = 'none';
        this.setState({
          back: 'none',
        });
      }
    }
  };

  confirm = () => {
    console.log('Btn-confirm');
    this.confirmShow();
  };
  cancel = () => {
    console.log('Btn-cancel');
    this.confirmShow();
  };

  render() {
    return (
      <div className={style.confirmBtn}>
        <Confirm
          id={`btn-${this.props.id}`}
          closeIcon={true}
          close={this.confirmShow}
          confirm={this.confirm}
          cancel={this.cancel}
          style={{
            display: 'none',
          }}
        />
        <div className={style.back} style={{ display: this.state.back }}></div>
        <button className={style.btn} onClick={this.confirmShow}>
          {this.props.btnStr}
        </button>
      </div>
    );
  }
}

export default ConfirmBtn;
