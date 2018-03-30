import * as React from 'react';
import { RouteComponentProps } from 'react-router';


const Stars = (props) => {
    const numberOfStars=1+Math.floor(Math.random()*9);
    let stars = [];
    for (let i=0; i<numberOfStars; i++)
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
            <span className="spanClass" >5</span>
        </div>
    );
}
const arrayOfNumbers = [1,2,3,4,5,6,7,8,9,10];
const Numbers =(props)=>{
    return (
        <div className="card text-center">
            <div>
                {arrayOfNumbers.map((number, i) =>
                    <span className="spanClass" key={i}>{number}</span>
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
    render() {
        return (
            <div className='container'>
                <h3>Play nine</h3>
                <div className='row'>
                    <Stars />
                    <Button />
                    <Answer />
                </div>
                <br/>
                <Numbers/>
            </div>
        );
    }
}