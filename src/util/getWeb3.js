import Vue from 'vue'
import config from './config'
let Web3 = require('web3')
let web3
// 创建web3对象
const getWeb3 = () => {
  return new Promise(async (resolve, reject) => {
    if (typeof web3 !== 'undefined') {
      if (!web3.currentProvider) {
        web3.setProvider(new web3.providers.HttpProvider(config.httpProvider))
      } else {
        web3 = new Web3(web3.currentProvider)
      }
      Vue.prototype._web3 = web3
      Vue.prototype._eth = web3.eth
      resolve(web3)
    } else {
      web3 = new Web3(new Web3.providers.HttpProvider(config.httpProvider))
      // 设置全局变量_web3和_eth
      Vue.prototype._web3 = web3
      Vue.prototype._eth = web3.eth
      // window.web3 = web3
      resolve(web3)
    }
  })
}

export default getWeb3
