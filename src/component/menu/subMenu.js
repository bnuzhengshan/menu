import React from 'react';
import './menu.css';

class SubMenu extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            show: true
        }
    }
    handleShow = () => {
        this.setState({
            show: !this.state.show
        })
    }
    handleUp = () => {
        const { index, parentId } = this.props
        if(parentId) {
            this.props.handleUpOrDown(parentId, index, 'up')
        } else {
            alert('顶级菜单，不能删除和移动')
        }
    }
    handleDown = () => {
        const { index, parentId } = this.props
        if(parentId) {
            this.props.handleUpOrDown(parentId, index, 'down')
        } else {
            alert('顶级菜单，不能删除和移动')
        }
    }
    handleAdd = () => {
        const { id } = this.props
        console.log(id)
        this.props.handleAdd(id)
    }
    handleDelete = () => {
        const { id, parentId } = this.props
        if(parentId) {
            this.props.handleDelete(parentId, id)
        } else {
            alert('顶级菜单，不能删除和移动')
        }
    }
    render() {
        const { name, level, hiddenUp, hiddenDown } = this.props;
        return (
            <li>
                <div className='navBar'>
                    <div className='navTitleContainer' onClick={this.handleShow}>
                        {this.state.show ? <i className="iconfont iconxiala"></i> : <i className="iconfont iconzhankai"></i>}
                        <span>{name}</span>
                    </div>
                    <div className='navActionContianer'>
                        {hiddenUp ? null: <button onClick={this.handleUp}>上移</button>}
                        {hiddenDown ? null: <button onClick={this.handleDown}>下移</button>}
                        {level < 2 ?<button onClick={level < 2 ? this.handleAdd : null}>添加下一级</button> : null}
                        {level === 0 ? null : <button onClick={this.handleDelete}>删除</button>}
                    </div>
                </div>
                {
                    this.state.show
                        ? <ul>
                            {this.props.children}
                        </ul>
                        : null
                }
            </li>
        )
    }
}

export default SubMenu