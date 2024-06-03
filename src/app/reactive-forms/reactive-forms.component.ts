import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive-forms',
  templateUrl: './reactive-forms.component.html',
  styleUrl: './reactive-forms.component.css'
})
export class ReactiveFormsComponent {
  reactiveForm:FormGroup

  ngOnInit(){
    this.reactiveForm=new FormGroup({
      firstname:new FormControl(null,[Validators.required,this.noSpaceAllowed]),
      lastname:new FormControl(null,[Validators.required,this.noSpaceAllowed]),
      email:new FormControl(null,[Validators.required,Validators.email]),
      country:new FormControl('india'),
      gender:new FormControl(null),
      hobbies:new FormControl(null)

    });
  }

  onSubmit(){
    console.log(this.reactiveForm)
  }

  noSpaceAllowed(control:FormControl){
    if(control.value!=null && control.value.indexOf(' ')!= -1){
      return{noSpaceAllowed:true}
    }
    return null;
  }
}
