import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FormServiceService } from '../../services/form-service.service';
import { CommonModule } from '@angular/common';
import { PreviewAllQuestion } from '../../shared/models/preview';
import { MatMenuModule } from '@angular/material/menu';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule, MatMenuModule, MatIcon],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {
  selectedQuestionType: string = "text"
  questionText: string = '';
  modal: boolean = false;
  isOptionsRequired = false;
  questionOptions: string[] = [''];
  addedQuestions: PreviewAllQuestion[] = [];
  textTypeText: string =''

  questions: PreviewAllQuestion[] = [];
  currentQuestionNumber: number = 1;

  constructor(private formDataService: FormServiceService ,
    private router: Router){

      this.formDataService.questions$.subscribe(questions => {
        this.questions = questions;
      });
      
    }

    editQuestion(question: PreviewAllQuestion) {
      // Implement editing logic here
    }

    editForm(question: any, id: number){

      

    }

    copyForm(question: any, id: number){
      
      this.addedQuestions.push(question);
      this.currentQuestionNumber++;
      this.formDataService.setQuestions(this.addedQuestions)
      this.formDataService.updateQuestions(this.addedQuestions);

      this.questionText = '';
      this.textTypeText = ''
      this.questionOptions=[];
      this.questionOptions.push('')

    }
    

    previewQuestions() {
      // Navigate to preview component or handle preview logic
      this.router.navigate(['preview']);
    }

    goToSavedForms(){
      this.router.navigate(['/saved-forms']);
    }
   

  addQuestion() {
    // this.modal =true
    if (this.questionText) {

      const newQuestion = {
        questionNumber: this.currentQuestionNumber,
        questionType: this.selectedQuestionType,
        question: this.questionText,
        answers: this.questionOptions.length > 0 
          ? this.questionOptions.map((option, index) => ({
            answerId: index + 1,
            questionNumber: this.currentQuestionNumber,
            answerOptionNumber: index + 1,
            answer: option
            })) 
          : [],


          
        };
        console.log(newQuestion);
        
      
      this.addedQuestions.push(newQuestion);
      this.currentQuestionNumber++;
      this.formDataService.setQuestions(this.addedQuestions)
      this.formDataService.updateQuestions(this.addedQuestions);

      this.questionText = '';
      this.textTypeText = ''
      this.questionOptions=[];
      this.questionOptions.push('')

      // console.log(this.addedQuestions);
      }
      else{
        alert("Enter Question")
      }
}

deletequestion(index : number){
  this.addedQuestions.splice(index, 1)
}

  handleQuestionTypeChange(){
    if (this.selectedQuestionType) {
      this.isOptionsRequired = this.selectedQuestionType !== 'text';
      // console.log(this.isOptionsRequired);
      
    }
    this.questionText = ''
  }


  addOption() {
    this.questionOptions.push(''); // Add a new empty option
    // console.log(this.questionOptions.length);
    
  }
  removeOption(index: number) {
    this.questionOptions.splice(index, 1); // Remove the option at the specified index
  }
  trackByFn(index: number, item: string) {
    return index; // or return item if you want to use the value
  }


 
}
