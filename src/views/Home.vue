<template>
  <div class="home">
    <table border>
      <thead>
        <tr>
          <th>投票提案</th>
          <th>当前票数</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in proposals_" :key="index">
          <td>{{item.name}}</td>
          <td>{{item.voteCount}}</td>
          <td><button @click="vote(index)">投票</button></td>
        </tr>
      </tbody>
    </table>
    <div class="btn"><button @click="giveVote(2)">给一个人赋予投票权力</button></div>
    <div class="btn"><button @click="giveVote(3)">给另一个人赋予投票权力</button></div>
    <div class="btn"><button @click="giveVote(4)">再给另一个人赋予投票权力</button></div>
    <div class="btn">
      <button @click="result">结果</button>
      <p v-show="winName">最佳提案：{{winName}}</p>
    </div>
    
  </div>
</template>

<script>
import getWeb3 from '@/util/getWeb3'
import config from '@/util/config'
import { promises } from 'fs';
import { resolve } from 'path';
export default {
  data () {
    return {
      contract: {},
      proposals_: [], // 提案数据
      winName: ''
    }
  },
  created () {
    this.initWeb3()
  },
  methods: {
    /**
     * 初始化生成合约实例
     */
    initWeb3 () {
      const that = this
      getWeb3().then(res => {
        that.contract = window.web3.eth.contract(config.abi).at(config.addr)
        console.log(that.contract)
        this.getProposals()
      })
    },
    /**
     * 获取提案的数据
     */
    getProposals () {
      const proposalsArr = ["0", "1", "2", "3"]
      Promise.all(proposalsArr.map(item => {
        return new Promise((resolve, reject) => {
          this.contract.proposals(item, (err, res) => {
            if (!err) {
              resolve(res)
            } else {
              reject(err)
            }
          })
        })
      })).then(res => {
        this.proposals_ = res.map(item => {
          return {
            name: window.web3.toAscii(item[0].replace(/0+$/, '')),
            voteCount: Number(item[1])
          }
        })
        console.log(this.proposals_)
      })
    },
    /**
     * 投票
     */
    vote (index) {
      let data = {
        from: window.web3.eth.defaultAccount,
        value: 0,
        gas: 2100000
      }
      this.contract.vote.estimateGas(index.toString(), data, (err, res) => {
        debugger
        if (err) {
          console.log(err)
        }
        data.gas = res || 2100000
        this.contract.vote.sendTransaction(index.toString(), data, (err, res) => {
          if (!err) {
            this.getProposals()
          } else {
            console.log(err)
          }
        })
      })
    },
    /**
     * 获取结果
     */
    result () {
      this.contract.winnerName((err, res) => {
        if (!err) {
          this.winName = window.web3.toAscii(res.replace(/0+$/, ''))
        }
      })
    },
    giveVote (type) {
      let addr_ = ''
      // 这是另外3个账号，模拟不同的人
      if (type === 2) {
        addr_ = '0x6519d818745622012936c058919aa0077c25993b'
      } else if (type === 3) {
        addr_ = '0xa338ec2d52b19f4a48a00fcd76a36366b3529a3b'
      } else if (type === 4) {
        addr_ = '0x161ace7920b0f6053cb577b8c65fc8ea3b1cbfa2'
      }
      let data = {
        from: window.web3.eth.defaultAccount,
        value: 0,
        gas: 2100000
      }
      this.contract.giveRightToVote.estimateGas(addr_, data, (err, res) => {
        data.gas = res || 2100000
        this.contract.giveRightToVote.sendTransaction(addr_, data, (err, res) => {
          alert('赋予成功')
        })
      })
    }
  }
};
</script>
<style lang="scss" scoped>
td{
  padding: 0 10px;height: 50px;
}
button{
  height: 30px;padding: 0 10px;
}
.btn{
  margin-top: 30px;
}
</style>

