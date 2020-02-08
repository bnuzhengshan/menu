import React from 'react';
import './modal.css'
/**
 * 弹出窗口组件
 */
class Modal extends React.Component {
    render() {
        const { title } = this.props;
        return (
            <div className={this.props.show ? 'modal ' : 'modal hidden'}>
                <div className='modal-mask'></div>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <span className='modal-title'>{title}</span>
                        <div className='modal-close'>
                            <i onClick={this.props.onClose} className="iconfont iconguanbi"></i>
                        </div>
                    </div>
                    <div className='modal-body'>
                        {this.props.children}
                    </div>
                    <div className='modal-footer'>
                        <button onClick={this.props.onClose} className='button'>
                            <span>取消</span>
                        </button>
                        <button onClick={this.props.onOk} className='button button-primary'>
                            <span>确定</span>
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}
export default Modal