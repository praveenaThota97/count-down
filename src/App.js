import React, {Component}  from 'react';
import "./App.css";
import "./assets/countdown.css";
import logo from './assets/img/loading.png';
class App extends Component{
	constructor(props){
		super(props);
		this.contentEditable = React.createRef()
		this.state={
            DataisLoaded: false,
			count:0,
			counter:0
		}
	}
	componentDidMount() {
        fetch(
			"https://interview-8e4c5-default-rtdb.firebaseio.com/front-end/counter1.json")
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    count: json,
                    DataisLoaded: true
                });
            })
    }
	// componentDidMount() {
	// 	fetch('https://interview-8e4c5-default-rtdb.firebaseio.com/front-end.json', {
	// 		method: 'PUT',
	// 		body: JSON.stringify({
	// 			counter1: 1000
	// 		}),
	// 		headers: {
	// 		  "Content-type": "application/json; charset=UTF-8"
	// 		}
	// 	}).then(response => {
	// 					return response.json()
	// 	}).then(json => {
	// 		console.log(json)
	// 		this.setState({
	// 			count:json
	// 		});
	// 	})
	// }
	increment=()=>{
		if(this.state.count<1000){
			this.setState({count:this.state.count +1})
		}
		
	}
	decrement=()=>{
		this.setState({count:this.state.count -1})
	}
	
	render(){
		const { DataisLoaded, count } = this.state;
        if (!DataisLoaded) return <div>
            <h1> Pleses wait some time.... </h1> </div> ;
		return(
			<div className='App'>
				<div className="container">
					{(()=>{
						if (DataisLoaded) {
							return <div>
								<img src={logo} alt='loading' id="loadingimage"></img>
						<span id="savingData">Saving counter  value</span></div>
						} 
					})()}
					<div id="counter">
					<div className='column1'>
						<button onClick={this.decrement} className='counter1'>-</button>
					</div>
					
					<div className='column2' contentEditable={true} suppressContentEditableWarning={true}
					onInput={(e) =>{console.log(e.currentTarget.textContent);let num=parseInt(e.currentTarget.textContent);this.setState({count:num})}} >
						
						{(()=>{
							console.log(this.state.count);
							if(count==null){
								return <div>
									{this.state.count +1}
								</div>
							}else{
								return <div>
									{this.state.count}
								</div>
								
							}
						})()}	
					</div>
					<div className='column3'>
						<button onClick={this.increment} className='counter2'>+</button>
					</div>
					</div>
					
					<div className='countDisplay'>
						<p>Counter value:
						{(()=>{
							//console.log(this.state.count);
							if(count==null){
								return <span>
									{this.state.count +1}
								</span>
							}else{
								return <span>
									{this.state.count}
								</span>
							}
						})()}
						</p>
					</div>
				</div>
			
			</div>
			
		);
	}
}
export default App;