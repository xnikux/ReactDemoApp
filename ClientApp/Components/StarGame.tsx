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
    let button;
    switch (props.answerIsCorrect) {
        case answerValues.Correct:
            button = <button className="btn btn-success">
                        <i className="fa fa-check"></i>
                    </button>
            break;
        case answerValues.InCorrect:
            button = <button className="btn btn-danger">
                        <i className="fa fa-times"></i>
                    </button>
            break;
        default:
            button = <button 
                        className="btn" 
                        onClick={props.checkAnswer}
                        disabled={props.selectedNumbers.length === 0}>
                        =
                    </button>
            break;
    }
    return (
        <div className='col-md-2'>
            {button}
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
const enum answerValues{
    Correct,
    InCorrect,
    NotSet
}
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
            randomNumberOfStars:1+Math.floor(Math.random()*9),
            answerIsCorrect: answerValues.NotSet,
        }
      
    selectNumber = (clickedNumber:number)=>{
        this.setState((prevState:any) => ({
            answerIsCorrect: answerValues.NotSet,
            selectedNumbers: prevState.selectedNumbers.concat(clickedNumber)
        }));
    };
    unSelectNumber = (clickedNumber:number) =>{
        this.setState((prevState:any)=> ({
            answerIsCorrect: answerValues.NotSet,
            selectedNumbers: prevState.selectedNumbers.filter(number=> number !== clickedNumber)
        }));
    }
    checkAnswer = () => {
        
        this.setState((prevState:any) => ({
            answerIsCorrect : prevState.randomNumberOfStars === prevState.selectedNumbers.reduce((acc,n)=> acc+n, 0) ? answerValues.Correct : answerValues.InCorrect
        }),
        function () {
            //alert(this.state.randomNumberOfStars + ", " + this.state.selectedNumbers.reduce((acc,n)=> acc+n, 0) + "," + this.state.answerIsCorrect);
        });
        
    }
    render() {
        const {selectedNumbers, randomNumberOfStars} = this.state;
        return (
            <div className='container'>
                <h3>Play nine</h3>
                <div className='row'>
                    <Stars numberOfStars={randomNumberOfStars}/>
                    <Button selectedNumbers={selectedNumbers} checkAnswer={this.checkAnswer} answerIsCorrect={this.state.answerIsCorrect}/>
                    <Answer selectedNumbers={selectedNumbers} unSelectNumber={this.unSelectNumber}/>
                </div>
                <br/>
                <Numbers selectedNumbers={selectedNumbers} selectNumber={this.selectNumber}/>
            </div>
        );
    }
}