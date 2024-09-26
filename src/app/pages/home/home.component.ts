import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormServiceService } from '../../services/form-service.service';
import { Forms } from '../../shared/models/form';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  savedForms: Forms[] = [];

  constructor(
    private formServiceService: FormServiceService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.getForms();
  }

  getForms(){
    this.formServiceService.getForms().subscribe((forms) => {
      // console.log(forms);
      this.savedForms = forms;
      // console.log(forms[0]["questions"][0]["answers"][0]["answerText"])
    });
  }

  previewForm(form: Forms) {

    setTimeout(()=>{
      this.formServiceService.setFormData(form);
      this.router.navigate(['/previewsaved'], { state: { form: form } });

    }, 400)
  }

  delete(id: number){
    console.log(id);
    
    alert("Do u really want to delete it?")
    this.formServiceService.deleteForm(id).subscribe((res)=>{
      console.log("Form Deleted Successfully");
      alert("Form Deleted");
      this.getForms()
      
    },
    (err)=>{
      console.log("Error Occured while deleting form");
      
    }
  )

  }

  navigateToCreateForm() {
    this.formServiceService.clearQuestions();
    this.router.navigate(['/form']);
  }

}
