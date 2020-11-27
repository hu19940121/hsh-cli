

const { promisify } = require('util');
const symbols = require('log-symbols');
const chalk = require('chalk');

// var colors = require('colors');

const download = promisify(require('download-git-repo'))
// const { open } = require('open')

const { vueRepo } = require('../config/repo-config')
const { commandSpawn } = require('../utils/terminal')
const { copyDir,dirIsExist } = require('../utils')
const { confirmInquirer } = require('./inquirer')
const path = require('path')
const fs = require('fs')

const createProjectAction = async (project) => {
  //1. clone 项目
  console.log(symbols.info, chalk.yellow('下载模板文件中，请稍后'))

  await download(vueRepo, project, { clone: true })
  console.log(symbols.success, chalk.green('模板下载完成'))

  //2. 执行npm install
  const command = process.platform === 'win32' ? 'cnpm.cmd' : 'cnpm' // windows上边用npm npm.cmd
  console.log(symbols.info, chalk.yellow('安装依赖中'))

  await commandSpawn(command, ['install'], { cwd:`./${project}`,stdio: 'inherit' })
  console.log(symbols.success, chalk.green('依赖安装完成'))
  //3. 运行npm run serve
  await commandSpawn(command, ['run', 'dev'], { cwd:`./${project}`,stdio: 'inherit' })
}
// 添加一个page页面
const addPageAction = async (name) => {
  const isInProject = await dirIsExist('template', path.resolve('./'))
  if (!isInProject) {
    console.log(symbols.error, chalk.red('当前目录下没有template文件夹,请检查是否处于项目根目录！'))
    return 
  }

  const isExist = await dirIsExist(name, path.resolve('pages') )
  // console.log('isExist',isExist);
  if (isExist) {
    console.log(symbols.info, chalk.yellow(`页面 ${name} 已经存在！`))

    const isCover = await confirmInquirer('page名称重复 是否覆盖已存在的page？')
    // console.log('isCover',isCover);
    if (isCover) {
      const srcDir = path.resolve('template')
      const targetDir = path.resolve('pages',name)
      copyDir(srcDir,targetDir)
      console.log(symbols.success, chalk.green('已覆盖对应page,重新或启动服务后查看效果！'))

    }
  } else {
    const pagesPath = path.resolve('pages.json')
    const srcDir = path.resolve('template')
    const targetDir = path.resolve('pages',name)
    copyDir(srcDir,targetDir)
    fs.readFile(pagesPath, { encoding:'utf-8' } , (err,data)=>{
      let pagesJson = JSON.parse(data)
      pagesJson.pages.unshift({
        name,
        author: 'auto'
      })
      fs.writeFile(pagesPath,JSON.stringify(pagesJson), async (err)=>{
        if (err) {
          throw err
        }
        console.log(symbols.success, chalk.green('已新增对应page,重新启动服务后查看效果！'))
      })
    })
  }
}


module.exports = {
  createProjectAction,
  addPageAction
}