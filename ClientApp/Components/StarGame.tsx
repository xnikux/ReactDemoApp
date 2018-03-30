import * as React from 'react';
import { RouteComponentProps } from 'react-router';
const arrayOfNumbers = [1,2,3,4,5,6,7,8,9];
const enum answerValues{
    Correct,
    InCorrect,
    NotSet
}
//https://gist.github.com/samerbuna/aa1f011a6e42d6deba46
var possibleCombinationSum = function(arr, n) {
    if (arr.indexOf(n) >= 0) { return true; }
    if (arr[0] > n) { return false; }
    if (arr[arr.length - 1] > n) {
      arr.pop();
      return possibleCombinationSum(arr, n);
    }
    var listSize = arr.length, combinationsCount = (1 << listSize)
    for (var i = 1; i < combinationsCount ; i++ ) {
      var combinationSum = 0;
      for (var j=0 ; j < listSize ; j++) {
        if (i & (1 << j)) { combinationSum += arr[j]; }
      }
      if (n === combinationSum) { return true; }
    }
    return false;
  };
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
            button = <button className="btn btn-success" onClick={props.acceptAnswer}>
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
        <div className='col-md-2 text-center'>
            {button}
            <br/>
            <br/>
            <button className="btn btn-warning btn-sm" disabled={props.redrawCount>=5} onClick={props.redraw}>
                <i className="fa fa-refresh"></i> {5-props.redrawCount}
            </button>
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
const Numbers = (props)=>{
    const numberClassName=(number)=> {
        if (props.usedNumbers.indexOf(number)>=0){
            return 'used spanClass';
        }
        else if(props.selectedNumbers.indexOf(number) >= 0){
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
const DoneFrame = (props) =>
{
    return(
        <div className="text-center">
            <h2>{props.doneStatus}</h2>
            <button className="btn btn-secondary" onClick={props.resetGame}>Play Again</button>
        </div>
    );
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
    static randomNumber = () => 1+Math.floor(Math.random()*9);
    static initialState = () => ({
        selectedNumbers:[],
        randomNumberOfStars:Game.randomNumber(),
        answerIsCorrect: answerValues.NotSet,
        usedNumbers: [],
        redrawCount:0,
        doneStatus: null
    });
    state = Game.initialState();
    resetGame= () => this.setState(Game.initialState());
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
    acceptAnswer = () => {
        this.setState((prevState:any) => ({
           usedNumbers: prevState.usedNumbers.concat(prevState.selectedNumbers),
           selectedNumbers:[],
           answerIsCorrect: answerValues.NotSet,
           randomNumberOfStars:Game.randomNumber()
        }),this.updateDoneStatus)
    }
    redraw = () =>{
        this.setState((prevState:any) => ({
            selectedNumbers:[],
            answerIsCorrect: answerValues.NotSet,
            randomNumberOfStars:Game.randomNumber(),
            redrawCount:prevState.redrawCount+1
         }),this.updateDoneStatus);
    }
    possibleSolutions = ({randomNumberOfStars, usedNumbers}) => {
        const possibleNumbers = arrayOfNumbers.filter(number => usedNumbers.indexOf(number)===-1); 
        return possibleCombinationSum(possibleNumbers, randomNumberOfStars);
    };
    updateDoneStatus = () => {
        this.setState((prevState :any)=> {
            if (prevState.usedNumbers.length === 9)
            {
                return {doneStatus: "Done. Nice!"}
            }
            if (prevState.redrawCount === 5 && !this.possibleSolutions(prevState))
            {
                return {doneStatus : "Game Over!"};
            }

        });
    }
    render() {
        const {
            selectedNumbers, 
            randomNumberOfStars,
            answerIsCorrect,
            usedNumbers,
            redrawCount,
            doneStatus
            } = this.state;
        return (
            <div className='container'>
                <h3>Play nine</h3>
                <div className='row'>
                    <Stars numberOfStars={randomNumberOfStars}/>
                    <Button 
                        selectedNumbers={selectedNumbers} 
                        checkAnswer={this.checkAnswer} 
                        answerIsCorrect={answerIsCorrect}
                        acceptAnswer={this.acceptAnswer}
                        redraw={this.redraw}
                        redrawCount={redrawCount}
                        />
                    <Answer selectedNumbers={selectedNumbers} unSelectNumber={this.unSelectNumber}/>
                
                </div>
                <br/>
                {doneStatus ?
                <DoneFrame doneStatus={doneStatus} resetGame={this.resetGame}/>:
                <Numbers 
                    selectedNumbers={selectedNumbers} 
                    selectNumber={this.selectNumber}
                    usedNumbers={usedNumbers}/>
                    
                
                }
            </div>
        );
    }
}