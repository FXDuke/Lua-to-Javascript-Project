// Lines: 35
// Size: < 1 Kb
//
// How to use:
//
// var myTableName = new Table (or var myTableName = new Table(data)
//
// myTableName.add({x: 10,y: 20},{x: 20,y: 40})
//
// myTableName.pairs((i,v) => {
//  console.log("Index " + i.toString() + ":\tX: " + v.x.toString() + " | Y: " + v.y.toString() + ";"
//})

class Table {
    __Data = []
    Size = 0
    pairs = function(newFunction) {
      let __Index = 0
      for (const data of this.__Data) {
        newFunction(__Index,data)
        __Index++
      }
    }
    add = function(...data) {
      if (data!=null) {
        for (const _item of data) {
          this.__Data.push(_item)
        }
      }
      this.Size = this.__Data.length-1
    }
    remove = function(index) {
      this.__Data[index] = null
      for (let newIndex = index+1;newIndex<this.__Data.length;newIndex++) {
        this.__Data[newIndex-1] = this.__Data[newIndex]
      }
      this.__Data.length -= 1
      this.Size = this.__Data.length-1
    }
    constructor(...data) {
      if (data!=null) {
        for (const _item of data) {
          this.__Data.push(_item)
        }
        this.Size = this.__Data.length-1
      }
    }
}
