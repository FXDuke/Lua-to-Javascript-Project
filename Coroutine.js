// Run multiple while loops at once!
//
// How to use:
//
// const LTJ = require('lua-to-javascript')
// const Coroutine = LTJ.Coroutine
//
// let temp = 0
// new Coroutine(() => {
// temp++
// if (temp==10) {
//  return true
// }
//})

export class Table {
    __Data = []
    Size = 0
    pairs = function(newFunction) {
      let __Index = 0
      for (const data of this.__Data) {
        newFunction(__Index++,data)
      }
    }
    add = function(...data) {
      this.__Data.push(...data)
      this.Size = this.__Data.length
    }
    remove = function(index) {
      for (let newIndex = index+1;newIndex<this.__Data.length;newIndex++) {
        this.__Data[newIndex-1] = this.__Data[newIndex]
      }
      this.__Data.length -= 1
      this.Size = this.__Data.length
    }
    constructor(...data) {
      this.__Data.push(...data)
      this.Size = this.__Data.length
    }
}

const GLC = new Table // Global Looped Coroutines

export class Coroutine {
    constructor(f) {
        function* __Loop() {
            while (true) {
                if (f(yield)==true) {return true}
            }
        }
        GLC.add({f:__Loop(),i:-1})
    }
}
while (1==1) { // Main Loop
    GLC.pairs((i,v) => {
        if (v.f.next(v.i++).done==true) {
            GLC.remove(i)
        }
    })
    if (GLC.Size == 0) {break}
}
