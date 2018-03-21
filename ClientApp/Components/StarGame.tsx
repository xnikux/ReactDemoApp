import * as React from 'react';
import { RouteComponentProps } from 'react-router';


const Stars = (props: any) => {
    return (
        <div className='col-md-5'>
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
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
            ...asdasd
        </div>
    );
}
const Numbers =(props)=>{
    return (
        <div className="card text-center">
            <div>
                <span className="spanClass">1</span>
                <span className="spanClass selected">2</span>
                <span className="spanClass used">3</span>
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