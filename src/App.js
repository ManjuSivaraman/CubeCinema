import './App.css';
import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import Logo from './assert/img.png';
import {questions} from './question';

class App extends Component {

  constructor(props){  
  super(props);  
  this.state = {
    step : 1,
    Result : 0,
    currentQuiz : 0,
    name : "",
    email : "",
    showModal : false,
    quiz : {
      section1 : {
        questions : questions
      }   
    }
  }

  this.eventHandler = this.eventHandler.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
  };

    componentDidMount(){
      if (!this.state.chooseResObj) {
        this.generateQuizDefaultResponse();
      }
    }

    eventHandler = (event) => {
     this.setState({
      [event.target.name] : event.target.value
     })
    }

    handleSubmit = (event) => {
      let {name , email} = this.state
      event.preventDefault();

      if(name != "" && email != ""){
        this.setState({
        step : 2
      })
         this.handleClose();
      }      
    }

    handleClick = () => {
      let{showModal} = this.state;
      this.setState({showModal : true})
    }

    handleQuiz = () => {
      this.setState({showQuiz : true , createdAcc : false , step : 3})
    }


    handleClose = () => {
       this.setState({showModal : false})
    }

    nextHandler = () => {
      let {currentQuiz} = this.state
      if(currentQuiz < this.state.quiz.section1.questions.length-1 ){
        this.setState({currentQuiz : currentQuiz + 1})
      }
    }

    previousHandler = () => {
      let {currentQuiz} = this.state
      if(currentQuiz > 0){
         this.setState({currentQuiz : currentQuiz - 1})
      }
     
    }

     handleQuizResults = (event) => {
      let {currentQuiz , Result , quiz , chooseResObj , step} = this.state;
      event.preventDefault();

      let obj = Object.keys(chooseResObj)
   
      obj.map((index)=>{
         if(chooseResObj[index] === quiz.section1.questions[index-1].answer){
         Result = Result + 1;
         this.setState({Result : Result , step : 4}) 
       }})

    }

     eventQuizResults = (event) => {
        let{chooseResObj, currentQuiz} = this.state;
        chooseResObj[currentQuiz + 1] = event.target.value;
        this.setState({
        chooseResObj: chooseResObj
        });
      }


    showQuiz = (num) => {
      console.log("num" , num)
      this.setState({currentQuiz : num})
    }

    generateQuizDefaultResponse = () => {
      let chooseResObj = {};
      questions.map((value, i) => {
        chooseResObj[i+1] = '';
      })
      this.setState((prevState) => {
        prevState['chooseResObj'] =  chooseResObj;
      })     
    }

  render() {

    let {name , email, showModal , showQuiz , step , currentQuiz , Result} = this.state;
   
    return (
 
        <div class="bg-color vh-100">

           {(step == 1) ? <div class="txt-white text-center container-block">
              <div>
                <h1 class="p-3">Aptitude Test Preparation</h1>
                <p>Practice with our online aptitude tests</p>
                <p>Pass your employee aptitude test or school entrance exam with ease.</p>
                <p>Here’s wishing you success in everything you do. Good luck!!</p>
                <div class="p-3">
                   <button variant="primary" class="button-style" onClick={this.handleClick}>
                     Get Started
                    </button>
                  
                   <Modal className="text-center d-flex align-items-center" show={showModal} onHide={this.handleClose}>
                    <Modal.Body>
                     <form id="#Caccount" onSubmit={e=>this.handleSubmit(e)} >
                        <div>
                         <img src={Logo} className="w-25" />
                         <h4 class="p-3 txt-black"> Create Your Account </h4>
                         <input type="text" name="name" value={name} onChange={e=>this.eventHandler(e)} class="in-style" placeholder="Your Name" />
                         <input type="text" name="email" value={email} onChange={e=>this.eventHandler(e)} class="in-style" placeholder="E-Mail" />
                         <button id="#Caccount"  type="submit" class="button-style m-3" >Create Account</button>
                        </div>
                     </form>
                    </Modal.Body>                
                  </Modal>

                </div>
              </div>
            </div> : null}

             
             { (step == 2) ? <div className="d-flex align-items-center h-100"> 
              <div class="backg-mr backg-white w-50 sm-wd mx-auto">
               <h4 class="p-2 mt-2  text-center"> Welcome {this.state.name} </h4>
               
               <div class="pl-5">
                  <h5>Instructions:</h5>
                   <div class="fz">        
                       <p class="p-0 m-0">Total number of questions : 30</p>
                       <p class="p-0 m-0">Each question carry 1 mark, no negative marks</p>
                       <p class="p-0">All the best :-)</p>
                   </div>
                   <div class="text-center"> <button type="button" onClick={this.handleQuiz} class="button-style mb-4">Start Test</button> </div>
               </div>
            </div>
            </div> :
            null}
           

           {(step == 3) ?
           <div class="quiz-container">
             <div class="quiz-body">
              <div class="quiz-header">
                <h4 class="text-center">Questions</h4>
              </div>
               <div class="quiz-body-left">
                <form id="#quizResult" onSubmit={e=>this.handleQuizResults(e)} class="backg-white">
                  {this.state.quiz.section1.questions.map((info , i) =>(
                    <div>{(i == currentQuiz)?
                      <div key={i}>
                      <h6 class="quiz_question">{currentQuiz + 1}. {info.question_text}</h6>
                        <div class="quiz_answer">
                            <div>{info.options.map((opt , j)=>(
                            <div key={j}><input type="radio" value={opt} checked={this.state.chooseResObj[currentQuiz + 1] === opt} name={currentQuiz} onChange={e=>this.eventQuizResults(e)} /> {opt}</div>))}</div>
                        </div>
                      </div>
                      : null}</div>
                    ))}
                     <div class="quiz-left-footer">
                      <div>
                      <button type="button" onClick={this.previousHandler} class="button-style mr-2 mb-2">Previous</button>
                      </div>
                      {currentQuiz ===  this.state.quiz.section1.questions.length - 1 ?   
                      <div>
                        <button id="#quizResult" type="submit" class="button-style">Submit</button>
                      </div> : 
                      <div>
                        <button type="button" onClick={this.nextHandler} class="button-style">Next</button>
                      </div>
                      }
                    </div>
                  </form> 
               </div>
               <div class="quiz-body-right">
               <div class="layout">
                <div class="questions">
                  {
                    this.state.quiz.section1.questions.map((info , i) =>(
                      <div className={`number${(currentQuiz === i) ? " active" : ""}`} key={i} onClick={() => this.showQuiz(i)}>
                        {i+1}
                      </div>
                    ))
                  }
                </div>
              </div>
               </div>
             </div>   
           </div>: null }

            {(step == 4) ? 
                  <div className="d-flex align-items-center h-100">
                    <div class="layout1 wt-bg">
                      <div class="scoreboard">
                        <div class="header">
                          <h3>Your Scores</h3>
                        </div>
                        <div class="body">
                          <div class="sections">
                            <h5 class="section-name">Total Questions</h5>
                            <span class="section-score">
                              <h5>15</h5>
                            </span>
                          </div>
                         
                          <div class="sections">
                            <h5 class="section-name">Correct Answer</h5>
                            <span class="section-score">
                              <h5>{Result}</h5>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div> 
                    </div> : null}


        </div>

      );
  }
}

export default App;


