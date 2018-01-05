/**
 *  function* 这种声明方式(function关键字后跟一个星号）会定义一个生成器函数 (generator function)，它返回一个  Generator  对象。
     GeneratorFunction不支持new，所以也就不支持 class * a  {} 的声明方式。
 * syntax: 
    1.[rv] = yield [expression];
    	expression: 定义通过迭代器协议从生成器函数返回的值。如果省略，则返回undefined。 
 	    rv: 返回传递给生成器的next()方法的可选值，以恢复其执行。
 	    评价： rv = yield expression太具有直观欺骗性，给人直接的感觉时间将 expression 的执行结果赋值给rv, 
 	          但是实际情况是通过外部调用下一个generator.next(result)来赋值的，即 result->rv, 而不是yield expression -> rv

	2. yield* [[expression]];
	  expression: 返回一个可迭代对象的表达式 . 可以使Iteractor的任何形态（如Array,Map,Generator,String, ...）


	评价该方案：
	  1. 控制了执行顺序，没有控制子任务间的依存调用关系； 依存调度关系需要 Coder 依据执行结果自行控制。
	  
	
 */
const Doer = function* () {
	yield "Doer";
}
const Toer = function* () {
	yield "Toer1";
	yield "Toer2";
	yield "Toer3";
}
const Moer = function* () {	
	yield "Moer1";
	yield "Moer2";	
	return "This is Moer"
}

const Handler = function* () {
	yield new Promise((resovle)=>{
       setTimeout(()=>{
         resovle(123);
       }, 2000)
     });
	yield "Great!";

	yield* "ABC";
    yield* [123, 456];
    yield* Doer(); 
	yield* Toer();    

	let well =  yield "WELL";
    console.warn(`well:${well}`); //> well:undefined
	let doer =  yield* Doer();
    console.warn(`doer:${doer}`);  //> doer:undefined
    let moer =  yield* Moer();
    console.warn(`moer:${moer}`); //> moer:This is Moer
    yield "Done!";
}

const handler = Handler();
for ( it of handler) {
	console.log(it)
}



/**
 * yeild 赋值问题。
 * rv = yield expression太具有直观欺骗性，给人直接的感觉时间将 expression 的执行结果赋值给rv, 
 * 但是实际情况是通过外部调用下一个generator.next(result)来赋值的，即 result->rv, 而不是yield expression -> rv
 */
 const add = function * (num) {
 	var x = yield num + 1 ;
 	console.log(`x:${x}`); // > x:undefined
 }
const addGen = add(1);
console.info(addGen.next());
console.info(addGen.next());

const add2 = function * (num) {
	var x = yield num + 1 ;
	console.log(`x:${x}`); // > x:bingo
}
const addGen2 = add2(1);
console.info(addGen2.next());
console.info(addGen2.next("bingo"));




/**
 * 处理异步任务
 */
const Handler = function * () {
	yield asyncTask1();
    yield asyncTask2();
}
const asyncTask1 = ()=>{
	return new Promise((resovle, reject)=>{
		// todo async task
		resovle();
	})
}
const asyncTask2 = ()=>{
	return new Promise((resovle, reject)=>{
		// todo async task
		resovle();
	})
}
const handler = Handler();
handler.next().value.then(()=>{
	handler.next();
})