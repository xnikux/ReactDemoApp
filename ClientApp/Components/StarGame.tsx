import * as React from 'react';
import { RouteComponentProps } from 'react-router';

const Stars = (props) => {
    
    let stars = [];
    for (let i=0; i<props.numberOfStars; i++)
    {
        stars.push(<i key={i} className="fa fa-star"></i>);
    }
    return (
        <div className='col-md-5'>
            {stars}
        </div>
    );
}
const Button = (props: any) => {
    return (
        <div className='col-md-2'>
            <button>=</button>
        </div>
    );
}
const Answer = (props: any) => {
    return (
        <div className='col-md-5'>
        {props.selectedNumbers.map((number,i)=>
            <span className="spanClass" key={i} onClick={()=>props.unSelectNumber(number)} >{number}</span>
        )}
        </div>
    );
}
const arrayOfNumbers = [1,2,3,4,5,6,7,8,9,10];
const Numbers = (props)=>{
    const numberClassName=(number)=> {
        if (props.selectedNumbers.indexOf(number) >= 0){
            return 'selected spanClass';
        }else{
            return 'spanClass';
        }
    }
    return (
        <div className="card text-center">
            <div>
                {arrayOfNumbers.map((number, i) =>
                    <span className={numberClassName(number)} key={i} onClick={() =>props.selectNumber(number)}>
                        {number}
                    </span>
                )}
            </div>
        </div>
    )
}
export class StarGame extends React.Component<RouteComponentProps<{}>, {}> {
    public render() {
        return <div>
            <h1>StarGame</h1>
            <Game />
        </div>;
    }
}
class Game extends React.Component {
     state = {
            selectedNumbers:[],
            randomNumberOfStars:1+Math.floor(Math.random()*9)
        }
      
    selectNumber = (clickedNumber:number)=>{
        this.setState((prevState:any) => ({
            selectedNumbers: prevState.selectedNumbers.concat(clickedNumber)
        }));
    };
    unSelectNunber = (clickedNumber:number) =>{
        this.setState((prevState:any)=> ({
            selectedNumbers: prevState.selectedNumbers.filter(number=> number !== clickedNumber)
        }));
    }

    render() {
        return (
            <div className='container'>
                <h3>Play nine</h3>
                <div className='row'>
                    <Stars numberOfStars={this.state.randomNumberOfStars}/>
                    <Button />
                    <Answer selectedNumbers={this.state.selectedNumbers} unSelectNumber={this.unSelectNunber}/>
                </div>
                <br/>
                <Numbers selectedNumbers={this.state.selectedNumbers} selectNumber={this.selectNumber}/>
            </div>
        );
    }
}