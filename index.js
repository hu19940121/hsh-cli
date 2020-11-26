#! /usr/bin/env node
const program = require('commander')

const helpOptions = require('./lib/core/help')
//查看版本号
program.version(require('./package.json').version)

//帮助和可选信息
helpOptions()

//传参解析
program.parse(process.argv)
