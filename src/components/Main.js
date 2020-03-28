
import React from 'react'



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
      selectedKey: []

    }
    this.componentDidMount = this.componentDidMount.bind(this)
    this.mouseDown = this.mouseDown.bind(this)
    this.mouseUp = this.mouseUp.bind(this)
    this.mouseOver = this.mouseOver.bind(this)
    this.select = this.select.bind(this)






  }


  componentDidMount(){
    console.log(process.env.DB_HOST)
    this.create()
    console.log(arr)


  }

  componentDidUpdate(){



  }

  mouseDown(e){

    this.setState({click: true})
    if(e.target.innerText.length===1){
      this.setState({selected: [e.target.innerText], selectedKey: [e.target.id]})
      e.target.classList.add('selected')
      console.log(this.state)
    }


  }

  mouseUp(){
    this.setState({click: false, selectedKey: []})
    const els = document.querySelectorAll(".letter")
    for (let i = 0; i < els.length; i++) {
    els[i].classList.remove('selected')
  }
  }

  mouseOver(e){
    if(this.state.click){
      if(!e.target.classList.contains('selected')){
      this.setState({selected: [...this.state.selected,e.target.innerText], selectedKey: [e.target.id]})
      e.target.classList.add('selected')

      console.log(this.state.selectedKey)
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
    console.log(e.target.innerText)
  }

  render() {


    console.log(this.state)
    return (

      <div onMouseDown={this.mouseDown} onMouseUp={this.mouseUp} className="body">
        <div className='score'>Score: {this.state.score}</div>
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

      </div>




    )
  }
}
export default Main
