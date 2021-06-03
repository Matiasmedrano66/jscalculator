import React from 'react';
import Display from './Display.jsx';

class Calculator extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      result: '0',
      displayArr: [],
      tempArr: [],
      numbersArr: [],
      operatorsArr: []
    }

    this.handleClick = this.handleClick.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleEquals = this.handleEquals.bind(this);
  }

  handleClick(e){
    let element = document.getElementById(e.target.id);
    let displayArr = this.state.displayArr.slice();
    let tempArr= this.state.tempArr.slice();
    let numbersArr = this.state.numbersArr.slice();
    let operatorsArr = this.state.operatorsArr.slice();
    let foundDecimal = -1;
    let symbolRegex = /[+*-/]/

    if (tempArr.length > 0){
        let str = tempArr.join();
        foundDecimal = str.search(/\./);
    }

    if (foundDecimal > -1 && element.innerText === '.'){
      console.log('error');
    } else {

          if (displayArr.length === 0 && e.target.id === 'zero'){
            console.log('error');
          }
          else {
              //if input is number
                if (!symbolRegex.test(element.innerText) || element.innerText === '.') {
                  //if prev input is symbol
                    if(symbolRegex.test(displayArr[displayArr.length - 1])){
                      //if prev prev input is symbol and prev is equal to '-'
                        if(symbolRegex.test(displayArr[displayArr.length - 2]) === true && displayArr[displayArr.length - 1] === '-'){
                          //add '-' to tempArr
                            tempArr.push(displayArr[displayArr.length - 1])
                            operatorsArr.push(displayArr[displayArr.length - 2])
                        }
                        // if prev prev value is number
                        if(symbolRegex.test(displayArr[displayArr.length - 2]) === false && displayArr[displayArr.length - 1] !== '.'){
                          //add operator to operatorsArr
                            operatorsArr.push(displayArr[displayArr.length - 1])
                        }
                        //if prev prev input is symbol and prev is not equal to '-'
                          if(symbolRegex.test(displayArr[displayArr.length - 2]) === true && displayArr[displayArr.length - 1] !== '-'){
                            //add operator to operatorsArr
                              operatorsArr.push(displayArr[displayArr.length - 1])
                          }
                    }
                    //add input to display
                    displayArr.push(element.innerText);
                    //add input to tempArr
                    tempArr.push(element.innerText);
                }
                //if input is not number
                else {
                  //extract full number from tempArr
                  let number = tempArr.join('');
                  if(number){
                    number = parseFloat(number);
                    //put number in nubersArr
                    numbersArr.push(number);
                    //free tempArr
                    tempArr.length = 0;
                  }
                  //convert string to float number

                  //add input to display
                  displayArr.push(element.innerText);
                }

                this.setState({
                  tempArr: tempArr,
                  displayArr: displayArr,
                  result: displayArr.join(''),
                  numbersArr: numbersArr,
                  operatorsArr: operatorsArr
                });

      }
  }
}


  handleClear(){
    this.setState({
      result: '0',
      numbersArr: [],
      tempArr: [],
      displayArr: [],
      operatorsArr: []
    })
  }

  handleEquals(){
    let numbersArr = this.state.numbersArr.slice();
    let tempArr = this.state.tempArr.slice();
    let operatorsArr = this.state.operatorsArr.slice();
    let number = tempArr.join('');
    number = parseFloat(number);
    numbersArr.push(number);

    let result = numbersArr[0];

    console.log(numbersArr);
    for(let i = 0; i < operatorsArr.length; i++){

      switch(operatorsArr[i]){
        case '+':
          result = result + numbersArr[i + 1];
          break;
        case '-':
          result = result - numbersArr[i + 1];
          break;
        case '*':
          result = result * numbersArr[i + 1];
          break;
        case '/':
          result = result / numbersArr[i + 1];
          break;
        default:
          break;
      }
    }
    result = parseFloat(result);
    let resultArr = [];
    resultArr.push(result);

      this.setState({
        result: result,
        numbersArr: [],
        tempArr: resultArr,
        displayArr: resultArr,
        operatorsArr: []
      })


    console.log(result);

}
  render(){
    return (
      <div className="col-6 container-fluid calc">
        <div className='row'>
          <Display numbers={this.state.result}/>
        </div>

        <div className='row'>
          <button id='clear' className='btn col-6 btn-danger' onClick={this.handleClear}>AC</button>
          <button id='divide' className='btn col-3 btn-secondary' onClick={this.handleClick}>/</button>
          <button id='multiply' className='btn col-3 btn-secondary' onClick={this.handleClick}>*</button>
        </div>

        <div className='row'>
          <button id='seven' className='btn col-3 btn-dark' onClick={this.handleClick}>7</button>
          <button id='eight' className='btn col-3 btn-dark' onClick={this.handleClick}>8</button>
          <button id='nine' className='btn col-3 btn-dark' onClick={this.handleClick}>9</button>
          <button id='subtract' className='btn col-3 btn-secondary' onClick={this.handleClick}>-</button>
        </div>

        <div className='row'>
          <button id='four' className='btn col-3 btn-dark' onClick={this.handleClick}>4</button>
          <button id='five' className='btn col-3 btn-dark' onClick={this.handleClick}>5</button>
          <button id='six' className='btn col-3 btn-dark' onClick={this.handleClick}>6</button>
          <button id='add' className='btn col-3 btn-secondary' onClick={this.handleClick}>+</button>
        </div>

        <div className='row'>

          <button id='one' className='btn col-3 btn-dark' onClick={this.handleClick}>1</button>
          <button id='two' className='btn col-3 btn-dark' onClick={this.handleClick}>2</button>
          <button id='three' className='btn col-3 btn-dark' onClick={this.handleClick}>3</button>
          <button id='equals' className='btn col-3 btn-success' onClick={this.handleEquals}>=</button>
          <button id='zero' className='btn col-6 btn-dark' onClick={this.handleClick}>0</button>
          <button id='decimal' className='btn col-3 btn-dark' onClick={this.handleClick}>.</button>
        </div>
      </div>

    )
  }


}
export default Calculator;
