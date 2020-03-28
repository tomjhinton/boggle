
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
      selected: []

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
    if(e.target.innerText){
      this.setState({selected: [e.target.innerText]})
    }


  }

  mouseUp(){
    this.setState({click: false})

  }

  mouseOver(e){
    if(this.state.click){
      console.log(e.target.innerText)
      this.setState({selected: [...this.state.selected,e.target.innerText]})
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

        <div className='board'>
          {arr.map(x=>{
            return(
              x.map(y=>{
                return(
                  <div key={new Date().getTime()*Math.random()} className='letter' onMouseEnter={this.mouseOver}>{y}</div>
                )
              }))
          })}
        </div>

      </div>




    )
  }
}
export default Main
