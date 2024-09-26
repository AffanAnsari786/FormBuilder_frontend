import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FormServiceService } from '../../services/form-service.service';
import { CommonModule } from '@angular/common';
import { Answer } from './../../shared/models/answer';
import { PreviewAllQuestion } from '../../shared/models/preview';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
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

  handleQuestionTypeChange(){
    if (this.selectedQuestionType) {
      this.isOptionsRequired = this.selectedQuestionType !== 'text';
      // console.log(this.isOptionsRequired);
      
    }
    this.questionText = ''
  }


  // saveForm() {
  //   console.log("saveform function we have reached")
  //   const form = {
  //     formName: 'Sample Form',
  //     questions: this.questions.map(q => ({
  //       questionType: q.questionType,
  //       questionText: q.question,
  //       answerOptions: q.answers.map(a => ({
  //         answerText: a.answer
  //       }))
  //     }))
  //   };
  //   console.log(this.questions);
  //   alert("Form saved successfully")
  //   this.router.navigate(['/home']);
  //   this.formDataService.saveForm(form).subscribe(
  //     response => console.log('Form saved successfully', response),
  //     error => console.error('Error saving form', error)
  //   );
  // }
  
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
