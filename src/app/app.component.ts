import { Component, OnInit } from '@angular/core';

import Classifire from './files/classifier.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
    classifier : any = Classifire.Existing_entities;
    
    selectedEntity: any;
    Data: string="";
    result: string="";
    failed: string="";
    reg: string="";
    answer:boolean = false;
    countFalse:number=0;
    countTrue: number=0;
    failedData: string="";

    sampleRegex: string="";

    hidden: boolean = false;
    resultEntities:string[] = [];
 

    testRegex(){
      this.countFalse =0;
      this.countTrue =0;
      this.failedData="";
      var splittedData = this.Data.split(",");
      var regexp = new RegExp("^"+this.selectedEntity['regex'].toString()+"$");
      console.log(regexp);
      splittedData.forEach( (str) =>{
        var answer = regexp.test(str);  
        if(answer)
          this.countTrue = this.countTrue + 1;
        else{
          this.countFalse = this.countFalse + 1;
          this.failedData = this.failedData + str + "  ";
        }
      });
      this.result = this.countTrue +" Correct";
      this.reg= ""+regexp;
      this.failed =  this.countFalse + " Failures !";
      this.failedData = "Failed Data: "+this.failedData;
      this.hidden = true;
    }
    
  


    resultEntity(){
      this.resultEntities = [];
      console.log(this.sampleRegex);
      Classifire.Existing_entities.forEach((str: any) => {
      var regexp = new RegExp("^"+str['regex'].toString()+"$");
      if(regexp.exec(this.sampleRegex)){
           this.resultEntities.push(str['Entity']);
       }
     });
     console.log("results: "+this.resultEntities);
    }
   
}
