import React, { Component } from "react";

const data = [
    {
      name: 'Data 3',  pv: 800, 
    },
    {
      name: 'Page B',  pv: 967, 
    },
    {
      name: 'Page C',  pv: 1098,
    }
  ];

  let result = [];


class wordCount extends Component {

    
  
    wordCount = (text, words) => {

        let counter = 0;
        let textArray = text.split(" ");
        let searchTerms = words.split(" ");
        
    
        for(let k=0;k<searchTerms.length;k++){ 
            for(let i=0; i<textArray.length; i++){
                if(textArray[i]==searchTerms[k]){
                    counter++;
                }
            }
            result[k]=counter;
            counter = 0;
        }
        
        return result;
        
    }

    
    
    //Use this to read from file :
    // fs.readFile("temp.txt", "utf-8", function(err, buf) {
    //     let text = buf.toString();
    //     console.log("Text File Contents: ", text);
    //     console.log("Search Results: ", wordCount(text, "test car computer"));
    //   });

    render() {
        
        let words = this.props.words.toString()
        words.split(" ");
        //console.log('Input to word count function:', words);
        this.wordCount("this is a text bunch of test text is text", words)
        
        

        return (
        <span>
            This is wordCount's result: 
            {this.props.updateResults(result)}
        </span>
        );
    }
}

export default wordCount;