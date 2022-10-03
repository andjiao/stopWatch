//inspired from: https://www.youtube.com/watch?v=PIiMSMz7KzM
//this one allows us to import the class into
//index.js
export default class Timer{
    //this root is going to refer to oure div with a class of timer
    // onlye the div cinatiner remains in html
    //bc we need to use the div to pass it into the timer class as the root
    constructor(root){
        root.innerHTML=Timer.getHTML();

        //getting reference to each html element, so js can interact with them
        this.el ={
            //refering to the span containing minutes
            minutes:root.querySelector(".timer__part--minutes"),
            seconds:root.querySelector(".timer__part--seconds"),
            control:root.querySelector(".timer__btn--control"),
            reset:root.querySelector(".timer__btn--reset"),
        };

        this.interval =null;
        //saying here, this remaining seconds is oure current remaining seconds in the timer
        this.remaingSeconds=0;

        //eventlistener for the buttons

        this.el.control.addEventListener("click",()=>{
            //when user click on start or stop-btn
            //we need to check the current interval status
            if(this.interval === null){
                this.start();
            }else{
                this.stop();
            }

        })

        this.el.reset.addEventListener("click",()=>{
            const inputMinutes = prompt("Enter number of minutes");
            
            //if the input is less than 60 bc it can't contain more than one houre
            if(inputMinutes<60){
                this.stop();

                //this converts the minutes to seconds
                this.remaingSeconds = inputMinutes * 60;
                // this is going to displey the current remaining seconds in the minutes and seconds sections
                this.updateInterfaceTime();
            }

            
        })

    }


        //sepcifying instance variables for this class or for this object 
        //when the component first loads up, we are going to say
        updateInterfaceTime(){
            //calculating and making the seconds to minutes
            const minutes = Math.floor(this.remaingSeconds / 60);
            //this gives the remainder of the division
            const seconds = this.remaingSeconds % 60;

            //injecting the values inside the html
            //padding the beginning of the string to be zero if there is no value
            //aat leaast two characters put a zero, if there isen't two characters
            this.el.minutes.textContent = minutes.toString().padStart(2,"0");
            this.el.seconds.textContent = seconds.toString().padStart(2,"0");


        }

        //updating the buttons
        updateInterfaceControl(){
            //so if the timer is not running
            if(this.interval === null){
                //then display the start-button, and therefor the stop-btn should be removed
                this.el.control.innerHTML = `<span class=material-icons>play_arrow</span>`;
                this.el.control.classList.add("timer__btn--start");
                this.el.control.classList.remove("timer__btn--stop");
            } else{
                this.el.control.innerHTML = `<span class=material-icons>pause</span>`;
                this.el.control.classList.add("timer__btn--stop");
                this.el.control.classList.remove("timer__btn--start");

            }

        }

        // to start the timer we need to include adding on the interval to make it work
       start(){
          //checking if there are any remaining seconds to count down from 
          // so canceling out the current operation
          if(this.remaingSeconds === 0) return;

           //if there is seconds to count down from, we set the interval
          //setInterval allows to run code on a timer, so every x amount of milliseconds
          this.interval=setInterval(()=>{
              //reducing the remaining seconds by one
              this.remaingSeconds--;
              //updating the time with the new value
              this.updateInterfaceTime();

              //if we have reached zero seconds, we will stop the timer
              if(this.remaingSeconds ===0){
                  this.stop();
              }


          },1000); // running the code every seconds that goes by, so every 1000 milliseconds/seconds 
          // so after we have set the interval to say ye continue counting down
          //we will say, yes let's display the pause button, and swap the button
          //so when counting down, pause-btn is showed due to the fact that the interval has a
          //a value and is not null
          this.updateInterfaceControl();
       } 

       //this one is going to clear the interval
       stop(){
           //this is going to stope the code from line 74-90
           clearInterval(this.interval)

           //this clears out the interval and 
           this.interval = null;
           
           //when calling the updateinterfacecontrol it is going to see that 
           //the interval is now null therefore it is going to display start-btn
           this.updateInterfaceControl();

       }

    

    //this method update the interface time
    //so the minutes and seconds, based on the current remmaining seconds 
    //this one is going to return the html-string for the indsides of the timer
    static getHTML(){
        return `
        <span class="timer__part timer__part--minutes">00</span>
        <span class="timer__part">:</span>
        <span class="timer__part timer__part--seconds">00</span>
        <button type="button" class="timer__btn timer__btn--control timer__btn--start">
            <span class="material-icons">play_arrow</span>
        </button>
       
        
        <button type="button" class="timer__btn timer__btn--reset">
            <span class="material-icons">timer </span>
            </button> `
    };

    }
    new Timer(
        document.querySelector(".timer")
    );

