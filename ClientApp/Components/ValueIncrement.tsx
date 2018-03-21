import * as React from 'react';
import { RouteComponentProps } from 'react-router';

export class ValueIncrement extends React.Component<RouteComponentProps<{}>, {}> {
    public render() {
        return <div>
            <h1>FooBar</h1>
        <App/>
        </div>;
    }
}
const Result = (props: any) => {
    return (
        <div>{props.counter}</div>
    );
};

class Button extends React.Component{
    props: any;
    handleClick = () => {
        this.props.onClickFunction(this.props.incrementValue);
    };
    render() {
        //var onClickFunction = () => { };
        return (
            <button onClick={this.handleClick}>
                +{this.props.incrementValue}
            </button>
        );
    }
}

class App extends React.Component {
    state = { counter: 0 };
    incrementCounter = (incrementValue : number) => {
        this.setState((prevState : any) => ({
            counter: prevState.counter + incrementValue
        }));
    };
    render() {
        return (
            <div>
                <Button incrementValue={1} onClickFunction={this.incrementCounter} />
                <Button incrementValue={5} onClickFunction={this.incrementCounter} />
                <Button incrementValue={10} onClickFunction={this.incrementCounter} />
                <Button incrementValue={50} onClickFunction={this.incrementCounter} />
                <Button incrementValue={100} onClickFunction={this.incrementCounter} />
                <Result counter={this.state.counter} />
            </div>
        )
    };
}
