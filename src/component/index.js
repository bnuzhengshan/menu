import React from 'react';
import Menu from './menu/menu';
import SubMenu from './menu/subMenu';
import Modal from './modal'
import './index.css'
import { upArrayItem, downArrayItem } from './utils'

class Nav extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [{
                name: '导航一',
                id: '1',
                level: 0,
                children: []
            }],
            name: '',
            showAddModal: false,
            addId: undefined,
        }
    }
    // 上移或者下移
    handleUpOrDown = (parentId, index, action) => {
        const { data } = this.state;
        let mapArr = (arr) => {
            if (arr && arr.length) {
                return arr.map(item => {
                    if (item.id === parentId) {
                        if (action === 'up') {
                            item.children = upArrayItem(item.children, index)
                        } else if (action === 'down') {
                            item.children = downArrayItem(item.children, index)
                        }
                    } else if (item.children && item.children.length) {
                        item.children = mapArr(item.children)
                    }
                    return item
                })
            }
        }
        let newArr = mapArr(data)
        this.setState({
            data: newArr
        })
    }
    // 新增菜单
    handleAdd = () => {
        const { data, name, addId } = this.state;
        console.log(data, name, addId)
        let mapArr = (arr) => {
            if (arr && arr.length) {
                return arr.map(item => {
                    if (item.id === addId) {
                        if (item.children && item.children.length) {
                            item.children.push({
                                name: name,
                                id: Date.now().toString(36),
                                level: item.level + 1,
                                children: []
                            })
                        } else {
                            item.children = [{
                                name: name,
                                id: Date.now().toString(36),
                                level: item.level + 1,
                                children: []
                            }]
                        }
                    } else if (item.children && item.children.length) {
                        item.children = mapArr(item.children)
                    }
                    return item
                })
            }
        }
        if (name) {
            let newArr = mapArr(data)
            this.setState({
                data: newArr,
                showAddModal: false,
                name: ''
            })
        } else {
            alert('菜单名称不能为空')
        }
    }
    // 删除菜单
    handleDelete = (parentId, id) => {
        const { data } = this.state;
        let mapArr = (arr) => {
            if (arr && arr.length) {
                return arr.map(item => {
                    if (item.id === parentId) {
                        item.children = (item.children || []).filter(child => child.id !== id) 
                    } else if (item.children && item.children.length) {
                        item.children = mapArr(item.children)
                    }
                    return item
                })
            }
        }
        let newArr = mapArr(data)
        console.log(newArr)
        this.setState({
            data: newArr
        })
    }
    // 根据data生成菜单
    renderMenu = (arr = [], parentId) => {
        if (arr && arr.length) {
            return arr.map((item, index) => {
                if (item && item.children && item.children.length) {
                    return <SubMenu
                        name={item.name}
                        id={item.id}
                        level={item.level}
                        key={index}
                        index={index}
                        hiddenUp={index === 0}
                        hiddenDown={index === arr.length - 1}
                        parentId={parentId}
                        handleUpOrDown={this.handleUpOrDown}
                        handleDelete={this.handleDelete}
                        handleAdd={this.showAdd}
                    >
                        {this.renderMenu(item.children, item.id)}
                    </SubMenu>
                }
                return <SubMenu
                    name={item.name}
                    id={item.id}
                    level={item.level}
                    key={index}
                    index={index}
                    hiddenUp={index === 0}
                    hiddenDown={index === arr.length - 1}
                    parentId={parentId}
                    handleUpOrDown={this.handleUpOrDown}
                    handleDelete={this.handleDelete}
                    handleAdd={this.showAdd}
                />
            })
        }
        return null
    }
    // 编辑名称
    handleChangeName = (e) => {
        let value = e && e.target ? e.target.value : e;
        this.setState({
            name: value
        })
    }
    // 关闭弹窗
    onClose = () => {
        this.setState({
            showAddModal: false,
            name: '',
            addId: undefined,
        })
    }
    // 新增菜单打开弹窗
    showAdd = (id) => {
        console.log(id)
        this.setState({
            addId: id,
            showAddModal: true
        })
    }
    render() {
        const { data, name, showAddModal } = this.state;
        return (
            <div className='mainContainer'>
                <Menu>
                    {this.renderMenu(data)}
                </Menu>
                <Modal
                    title='编辑名称'
                    show={showAddModal}
                    onClose={this.onClose}
                    onOk={this.handleAdd}
                >
                    <input className='nameInput' type='text' value={name} onChange={this.handleChangeName} placeholder='请输入内容' />
                </Modal>
            </div>
        )
    }
}

export default Nav