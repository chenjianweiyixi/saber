
/**
 * async: 声明一个系列操作行为函数
     asyncFunc 执行的返回结果是Promise object

 * syntax: await promiseObject. 
         1. 返回promise对象正常resolve的结果，若是reject场景，则报错。
         2. 前一个await执行完毕(promise resolve了)，才会执行接下来的操作

	评价该方案：
	  1. 控制了执行顺序，也控制子任务间的依存调用关系。 让coder不需要关注task间的依存调度关系。
 */
class Handler {
  async exex() {
    return 1 + await this.action1() + await this.action2();
  }

  action1() {
     return new Promise((resovle)=>{
       setTimeout(()=>{
         console.info(`Action1 Done!`)
         resovle(1);
       }, 3000)
     });
  }

  action2() { 
     return new Promise((resovle)=>{
       setTimeout(()=>{
         console.info(`Action2 Done!`)
         resovle(2);
       }, 1000)
     });
  }
}

const handler = new Handler();
handler.exex().then( v => {
	console.log(v)
});