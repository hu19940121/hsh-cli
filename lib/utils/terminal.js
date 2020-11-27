//终端命令相关代码
const {  spawn } = require('child_process');

const commandSpawn = (...args) => {
  return new Promise((resolve,reject) => {
    const childProcess = spawn(...args) //开启一个子进程去执行命令
    // childProcess.stdout.pipe(process.stdout); //子进程的输出流写入到主进程的输出流  使当前窗口可以看到当前npm install的打印信息
    // childProcess.stdout.pipe(process.stderr); //子进程的输出流写入到主进程的输出流  使当前窗口可以看到当前npm install的错误信息
    childProcess.on('close', ()=>{
      resolve();
    })
  })

}
module.exports = {
  commandSpawn,
  
}