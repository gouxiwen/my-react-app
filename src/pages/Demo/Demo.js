import React, {useEffect, useState} from 'react';
import myEvent from '../../utils/event';
import './Demo.scss'
// Hooks
// const Demo = () => {
//     const [count, SetCount] = useState(0);
//     const [name] = useState('');
//     useEffect(() => {
//         document.title = `${count}次`
//         console.log('本次组件更新')
//         return () => {
//             console.log('上一次清除或者卸载')
//         };
//     }, [count]);
//     useEffect(() => {
//         document.title = `${name}次`
//         console.log('组件更新')
//         return () => {
//             console.log('组件卸载')
//         };
//     }, [name]);
//     return (
//         <div>
//             <p>你点击了{count}次</p>
//             <button
//             onClick={() => {SetCount(count + 1)}}>点击</button>
//         </div>
//     );
// }
// 自定义Hooks
// eg:提取好友在线状态
function useFriendStatus(friendID) {
    const [isOnline, setIsOnline] = useState(null)
    useEffect(() => {
        function handleStatusChange(status) {
            setIsOnline(status.isOnline)
        }
        // ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange); // 添加监听
        myEvent.on(friendID, handleStatusChange); // 添加监听
        return () => {
            // ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange); // 移除监听
            myEvent.off(friendID, handleStatusChange); // 移除监听
        };
    });
    return isOnline;
}
// 在下面组件中运用
function FriendStatus(props) {
    const isOnline = useFriendStatus(props.friend.id);
    return (
        <li style={{color: isOnline ? 'green' : 'black'}}>
            {props.friend.name}
        </li>
    )
}
function FriendListItem(props) {
    const isOnline = useFriendStatus(props.friend.id);
    if (isOnline === null) {
        return 'Loading...'
    }
    return isOnline ? 'Online' : 'Offline'
}
const Demo = () => {
    const friends = [
        {
            id: '1',
            name: '张三',
            isOnline: false
        },
        {
            id: '2',
            name: '李四',
            isOnline: false
        },
    ]
    function changeStatus(item) {
        item.isOnline = !item.isOnline
        myEvent.emit(item.id, {isOnline: item.isOnline})
    }
    return (
        <div className="demo-wrap">
             {
                 friends.map(item => {
                    return (
                        <div key={item.id} className="friend-item">
                            <div className="status">
                                <FriendStatus friend={item}></FriendStatus>
                                <FriendListItem friend={item}></FriendListItem>
                            </div>
                            <button className="button" onClick={() => { changeStatus(item)}}>改变在线状态</button>
                        </div>

                    )
                 })
             }
        </div>
    )
}
export default Demo;
