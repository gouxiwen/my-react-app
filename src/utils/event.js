class Event {
    constructor() {
        // 创建一个事件对象
          this.events = Object.create(null);
        // events: {
		//	hehe: [(func)fn1,(func)fn2,...],
		//	haha: [(func)fn1,(func)fn2,...],
		//	....
		//	....
		//	}  
      }
      // 绑定事件
      on(name, fn) {
        // 没有该事件? 初始化处理函数数组为空
        if (!this.events[name]) {
            this.events[name] = []
          }
          // 否则push一个事件,
          this.events[name].push(fn);
          // return 自身方便链式调用
          return this;
      }
      // 通知事件
      emit(name, ...args) {
      //没有该事件?不执行
        if (!this.events[name]) {
            return this;
        }
        const fns = this.events[name]
        //执行该事件对应的函数数组, 并传入参数
        fns.forEach(fn => fn.call(this, ...args))
        return this;
      }
      // 解绑事件
      off(name,fn) {
        if (!this.events[name]) {
            return this;
        }
        // 没有指定解绑事件? 解绑所有
        if (!fn) {
           this.events[name] = null
           return this
        }
        // 否则找到该事件,解绑
        const index = this.events[name].indexOf(fn);
        this.events[name].splice(index, 1);
        return this;
      }
      // 单次绑定事件,执行完后解绑
      once(name,fn) {
        const only = () => {
          fn.apply(this, arguments);
          this.off(name, only);
        };
        this.on(name, only);
        return this;
      }
  }

export default new Event()