
import React from 'react'

var Typo = require('typo-js')
var dictionary = new Typo('en_US', false, false, { dictionaryPath: './assets/dict' })
let arr = []
class Main extends React.Component{
  constructor(){
    super()
    this.state = {
      data: {},
      error: '',
      size: 10,
      click: false,
      selected: [],
      score: 0,
      selectedKey: [],
      played: [],
      time: 0,
      playing: false

    }
    this.componentDidMount = this.componentDidMount.bind(this)
    this.mouseDown = this.mouseDown.bind(this)
    this.mouseUp = this.mouseUp.bind(this)
    this.mouseOver = this.mouseOver.bind(this)
    this.select = this.select.bind(this)
    this.reset = this.reset.bind(this)






  }


  componentDidMount(){

    this.create()



  }

  componentDidUpdate(){



  }

  mouseDown(e){

    this.setState({click: true})
    if(e.target.innerText.length===1 && this.state.playing){
      this.setState({selected: [e.target.innerText], selectedKey: [e.target.id]})
      e.target.classList.add('selected')

    }


  }

  mouseUp(){
    if(this.state.playing){
    this.setState({click: false, selectedKey: []})
    const els = document.querySelectorAll('.letter')
    for (let i = 0; i < els.length; i++) {
      els[i].classList.remove('selected')

    }

    if(dictionary.check(this.state.selected.join('').toLowerCase()) && this.state.selected.join('').toLowerCase().length >=2 && !this.state.played.includes(this.state.selected.join('').toLowerCase()) && this.state.playing){
      this.setState({score: [parseInt(this.state.score)+this.state.selected.join('').length], played: [...this.state.played, this.state.selected.join('').toLowerCase()]})
      // console.log('score')
    }
  }

  }

  mouseOver(e){

    if(this.state.click && this.state.selectedKey.length>0 &&  this.state.playing){
      const lastR = parseInt(this.state.selectedKey[this.state.selectedKey.length-1].split(':')[0])
      const lastC = parseInt(this.state.selectedKey[this.state.selectedKey.length-1].split(':')[1])
      const thisR = parseInt(e.target.id.split(':')[0])
      const thisC = parseInt(e.target.id.split(':')[1])

      console.log(lastC)
      console.log(thisC)
      if(!e.target.classList.contains('selected') && this.state.playing && (lastR === thisR || lastR === thisR-1 || lastR === thisR+1) && (lastC === thisC || lastC === thisC-1 || lastC === thisC+1 )){

        this.setState({selected: [...this.state.selected,e.target.innerText], selectedKey: [e.target.id]})
        e.target.classList.add('selected')

        // console.log(this.state.selectedKey)
      }
    }

  }

  create(){
    arr = []
    for(let i=0; i<this.state.size;i++){
      arr.push([])
      for(let j=0; j<this.state.size;j++){
        arr[i].push(String.fromCharCode(97+Math.floor(Math.random() * 26)))
      }
    }
    this.setState({array: arr })
  }

  select(e){
    e.persist()
    // console.log(e.target.innerText)
  }
  reset(){
    this.create()
    this.setState({score: 0, time: 60, playing: true, played: [] })

    setTimeout(() => {
      this.timer(), 10000
    })

  }
  timer() {
    this.setState({time: this.state.time-1})
    setTimeout(() => {
      if(this.state.time>0){
        this.timer()
      }
      if(this.state.time===0){
        this.setState({playing: false})
      }
    }, 1000)
  }



  render() {


    // console.log(this.state)
    return (

      <div onMouseDown={this.mouseDown} onMouseUp={this.mouseUp} className="body">
        <div className='score'>Score: {this.state.score}</div>
        {!this.state.playing && <div className='reset' onClick={this.reset}> RESET</div>}
        {this.state.playing && <div className='timer'> {this.state.time}</div>}
        <div className='game'>
          <div className='board'>

            {arr.map((x, row)=>{
              return(
                x.map((y, index)=>{
                  return(
                    <div key={row+index}
                      id={row+':'+index} className={'letter' + (this.state.selectedKey.includes(this.id) ? 'selected' : '')} onMouseEnter={this.mouseOver}>{y}</div>
                  )
                }))
            })}
          </div>
          <ul>
            {this.state.played && this.state.played.map((x, index)=> {
              return(
                <li key={index}>{x}</li>
              )
            })}
          </ul>

        </div>
      </div>




    )
  }
}
export default Main
